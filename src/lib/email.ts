/**
 * Resend でメールを送る最小ヘルパー（fetch のみ・追加パッケージ不要）。
 * RESEND_API_KEY が未設定なら送信せず false を返す（開発時に落ちないように）。
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";

function getFrom(): string {
    return process.env.EMAIL_FROM || "自主トレ素材庫Plus <no-reply@jishutore-sozaiko.online>";
}

export async function sendEmail(params: {
    to: string;
    subject: string;
    html: string;
    text?: string;
    /** 返信先。問い合わせの転送で「そのまま返信」できるようにするために使う。 */
    replyTo?: string;
}): Promise<boolean> {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        console.error("RESEND_API_KEY is not configured; skipping email send.");
        return false;
    }
    try {
        const res = await fetch(RESEND_ENDPOINT, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from: getFrom(),
                to: params.to,
                subject: params.subject,
                html: params.html,
                ...(params.text ? { text: params.text } : {}),
                ...(params.replyTo ? { reply_to: params.replyTo } : {}),
            }),
        });
        if (!res.ok) {
            console.error("Resend send failed:", res.status, await res.text().catch(() => ""));
            return false;
        }
        return true;
    } catch (err) {
        console.error("Resend send error:", err);
        return false;
    }
}

/** Plus 会員ログイン用マジックリンクのメール。 */
export async function sendPlusMagicLink(to: string, url: string): Promise<boolean> {
    const subject = "【自主トレ素材庫Plus】ログイン用リンク";
    const html = `
<div style="font-family:-apple-system,'Segoe UI',sans-serif;line-height:1.7;color:#1f2937;max-width:520px;margin:0 auto;padding:8px">
  <p>自主トレ素材庫Plus のログインリンクをお送りします。</p>
  <p>下のボタンを押すと、資料庫にログインできます（有効期限：15分）。</p>
  <p style="text-align:center;margin:28px 0">
    <a href="${url}" style="display:inline-block;background:#2563eb;color:#fff;text-decoration:none;padding:14px 28px;border-radius:10px;font-weight:bold">資料庫にログインする</a>
  </p>
  <p style="font-size:13px;color:#6b7280">ボタンが押せない場合は、次のURLをブラウザに貼り付けてください：<br>
    <span style="word-break:break-all">${url}</span>
  </p>
  <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0">
  <p style="font-size:12px;color:#9ca3af">このメールに心当たりがない場合は、破棄していただいて問題ありません。</p>
</div>`.trim();
    const text = `自主トレ素材庫Plus のログインリンク（有効期限15分）:\n${url}\n\n心当たりがない場合は破棄してください。`;
    return sendEmail({ to, subject, html, text });
}

/**
 * 求人掲載の初回相談（/jobs/posting/ のフォーム）を運営宛に転送するメール。
 * ================================================================
 * ★宛先は運営の受信できるアドレス1つだけ。送信者（施設）へは自動返信しない。
 *   自動返信を付けると、他人のアドレスを打ち込んだ第三者にメールが飛ぶ
 *   （フォームを踏み台にできてしまう）ため、今回は運営への転送だけにする。
 *   受付のご連絡は運営者が内容を見てから手で返す。
 *
 * ★reply_to に相談者のアドレスを入れておくと、受信メールから直接返信できる。
 */
export async function sendJobPostingInquiry(params: {
    to: string;
    facilityName: string;
    contactName: string;
    email: string;
    recruitUrl: string;
    message: string;
    /** どのCTAから開いたフォームか（jobs_posting_hero など）。運用の判断材料 */
    placement: string;
}): Promise<boolean> {
    const rows: [string, string][] = [
        ["施設名・法人名", params.facilityName],
        ["ご担当者名", params.contactName],
        ["メールアドレス", params.email],
        ["公式採用ページ", params.recruitUrl || "（未記入）"],
        ["流入元CTA", params.placement],
    ];

    const html = `
<div style="font-family:-apple-system,'Segoe UI',sans-serif;line-height:1.7;color:#1f2937;max-width:640px">
  <p><strong>求人掲載β版の初回相談が届きました。</strong></p>
  <table style="border-collapse:collapse;width:100%;margin:16px 0">
    ${rows
        .map(
            ([label, value]) => `<tr>
      <th style="text-align:left;padding:8px 12px;background:#f3f4f6;border:1px solid #e5e7eb;white-space:nowrap">${escapeHtml(label)}</th>
      <td style="padding:8px 12px;border:1px solid #e5e7eb">${escapeHtml(value)}</td>
    </tr>`,
        )
        .join("")}
  </table>
  <p style="margin-bottom:4px"><strong>ご相談内容</strong></p>
  <div style="white-space:pre-wrap;padding:12px;border:1px solid #e5e7eb;border-radius:8px;background:#f9fafb">${escapeHtml(params.message || "（未記入）")}</div>
  <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0">
  <p style="font-size:12px;color:#9ca3af">/jobs/posting/ の初回相談フォームからの自動転送です。返信するとご担当者に届きます。</p>
</div>`.trim();

    const text = [
        "求人掲載β版の初回相談が届きました。",
        "",
        ...rows.map(([label, value]) => `${label}：${value}`),
        "",
        "【ご相談内容】",
        params.message || "（未記入）",
    ].join("\n");

    return sendEmail({
        to: params.to,
        subject: `【求人掲載β版】初回相談：${params.facilityName}`,
        html,
        text,
        replyTo: params.email,
    });
}

/** メール本文に入れる前に、利用者が書いた文字列をエスケープする。 */
function escapeHtml(text: string): string {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}
