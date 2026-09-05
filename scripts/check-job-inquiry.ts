/**
 * 求人の初回相談API（/api/jobs/inquiry）の検証スクリプト。
 * ================================================================
 * 実行：npx tsx scripts/check-job-inquiry.ts
 *
 * ★実際のメールは1通も送らない。
 *   Resend への fetch を差し替えて、送信内容だけを受け取って確かめる。
 *   （運営の受信箱にテストメールを溜めないため。外部の実宛先にも当然送らない）
 *
 * 見るところ：
 *   - 必須3項目（施設名・担当者名・メール）の検証
 *   - URLのスキーム制限（javascript: を受け取らない）
 *   - ハニーポットと「速すぎる送信」は、成功と同じ応答で送信しない
 *   - 同一IPからの連投はレート制限で止まる
 *   - RESEND_API_KEY 未設定なら、成功したように見せずエラーを返す
 *   - 送信内容に改行やHTMLを入れられない（ヘッダー混入・HTML崩れの防止）
 */

process.env.RESEND_API_KEY ??= "test-key-not-used";

type SentMail = {
    to: string;
    subject: string;
    html: string;
    text: string;
    reply_to?: string;
};

const sent: SentMail[] = [];
const realFetch = globalThis.fetch;

globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input.toString();
    if (url.startsWith("https://api.resend.com")) {
        sent.push(JSON.parse(String(init?.body ?? "{}")) as SentMail);
        return new Response(JSON.stringify({ id: "mocked" }), { status: 200 });
    }
    return realFetch(input as RequestInfo, init);
}) as typeof fetch;

async function main() {
    const { POST } = await import("../src/app/api/jobs/inquiry/route");


    const VALID = {
        facilityName: "検証リハビリテーション病院",
        contactName: "検証担当",
        email: "kensho@example.jp",
        recruitUrl: "example.jp/recruit/",
        message: "作業療法士を1名募集予定です。",
        elapsedMs: 20000,
        placement: "jobs_posting_form",
    };

    let ip = 0;
    function request(body: Record<string, unknown>, sameIp?: string): Request {
        const address = sameIp ?? `10.0.0.${(ip += 1)}`;
        return new Request("http://localhost/api/jobs/inquiry/", {
            method: "POST",
            headers: { "Content-Type": "application/json", "x-forwarded-for": address },
            body: JSON.stringify(body),
        });
    }

    let failed = 0;
    function check(label: string, ok: boolean, detail = "") {
        console.log(`${ok ? "  OK  " : " FAIL "} ${label}${detail ? `  … ${detail}` : ""}`);
        if (!ok) failed += 1;
    }

    // 1) 正常系
    {
        const before = sent.length;
        const res = await POST(request(VALID));
        const body = (await res.json()) as { ok?: boolean };
        const mail = sent[sent.length - 1];
        check("正しい入力 → 200・メール1通", res.status === 200 && body.ok === true && sent.length === before + 1);
        check("宛先は運営の受信アドレス1つだけ", mail?.to === "smart.rehabili@gmail.com", mail?.to);
        check("返信先に相談者のアドレスが入る", mail?.reply_to === VALID.email, mail?.reply_to);
        check("件名に施設名が入る", mail?.subject.includes(VALID.facilityName) === true, mail?.subject);
        check(
            "URLは https:// を補って保存する",
            mail?.text.includes("https://example.jp/recruit/") === true,
        );
    }

    // 2) 必須項目
    for (const field of ["facilityName", "contactName", "email"] as const) {
        const before = sent.length;
        const res = await POST(request({ ...VALID, [field]: "" }));
        const body = (await res.json()) as { errors?: Record<string, string> };
        check(
            `${field} が空 → 400・送信しない`,
            res.status === 400 && Boolean(body.errors?.[field]) && sent.length === before,
        );
    }

    // 3) メール形式
    {
        const before = sent.length;
        const res = await POST(request({ ...VALID, email: "not-an-email" }));
        check("メール形式が不正 → 400・送信しない", res.status === 400 && sent.length === before);
    }

    // 4) URLのスキーム制限
    {
        const before = sent.length;
        const res = await POST(request({ ...VALID, recruitUrl: "javascript:alert(1)" }));
        check("javascript: のURL → 400・送信しない", res.status === 400 && sent.length === before);
    }

    // 5) 採用ページURLは任意
    {
        const before = sent.length;
        const res = await POST(request({ ...VALID, recruitUrl: "" }));
        check(
            "採用ページURLが空でも送れる",
            res.status === 200 && sent.length === before + 1 &&
            sent[sent.length - 1].text.includes("（未記入）"),
        );
    }

    // 6) ハニーポット
    {
        const before = sent.length;
        const res = await POST(request({ ...VALID, company: "bot" }));
        const body = (await res.json()) as { ok?: boolean };
        check(
            "ハニーポットが埋まっている → 200を返すが送信しない",
            res.status === 200 && body.ok === true && sent.length === before,
        );
    }

    // 7) 速すぎる送信
    {
        const before = sent.length;
        const res = await POST(request({ ...VALID, elapsedMs: 300 }));
        check("開いてから300msで送信 → 送信しない", res.status === 200 && sent.length === before);
    }

    // 8) 連投（同一IP）
    {
        const address = "10.9.9.9";
        const codes: number[] = [];
        for (let i = 0; i < 4; i += 1) {
            const res = await POST(request({ ...VALID, facilityName: `連投${i}` }, address));
            codes.push(res.status);
        }
        check(
            "同一IPからの4回目は429で止まる",
            codes.slice(0, 3).every((c) => c === 200) && codes[3] === 429,
            codes.join(","),
        );
    }

    // 9) 改行・HTMLの混入
    {
        const before = sent.length;
        const res = await POST(
            request({
                ...VALID,
                facilityName: "改行\nBcc: attacker@example.com",
                message: "<script>alert(1)</script>",
            }),
        );
        const mail = sent[sent.length - 1];
        check("送信は成功する", res.status === 200 && sent.length === before + 1);
        check("件名に改行が残らない", !mail?.subject.includes("\n"), JSON.stringify(mail?.subject));
        check(
            "本文のHTMLはエスケープされる",
            mail?.html.includes("&lt;script&gt;") === true && !mail?.html.includes("<script>"),
        );
    }

    // 10) RESEND_API_KEY 未設定
    {
        const key = process.env.RESEND_API_KEY;
        delete process.env.RESEND_API_KEY;
        const before = sent.length;
        const res = await POST(request(VALID));
        const body = (await res.json()) as { error?: string };
        check(
            "APIキー未設定 → 503。成功したように見せない",
            res.status === 503 && sent.length === before && Boolean(body.error),
        );
        process.env.RESEND_API_KEY = key;
    }

    console.log(`\n送信をモックした通数：${sent.length}（実際のメール送信は0通）`);
    console.log(failed === 0 ? "全項目OK" : `${failed}件NG`);
    process.exit(failed === 0 ? 0 : 1);
}

main();
