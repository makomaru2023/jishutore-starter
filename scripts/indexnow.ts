// IndexNow で Bing / Yahoo に URL の追加・更新を通知する。デプロイが本番に反映された後に実行する。
// 使い方:
//   npm run indexnow -- /items/foo/ /items/bar/   パスまたは絶対URLを直接指定
//   npm run indexnow -- --items foo bar           素材IDを /items/<id>/ に展開して送信
//   npm run indexnow -- --all                     公開中の sitemap.xml の全URL（初回のみ）
//   npm run indexnow -- --all --dry-run           送信せず対象URLだけ表示
// IndexNow は「新規・更新したURL」を伝える仕組み。変更のないURLを繰り返し送るのは避ける。

import fs from "fs/promises";

const BASE_URL = "https://jishutore-sozaiko.online";
const HOST = "jishutore-sozaiko.online";
const KEY = "4b749f01a951b489c9762d287b64521d";
const KEY_FILE = `public/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";
const MAX_URLS_PER_REQUEST = 10000; // IndexNow の1リクエスト上限

// IndexNow の応答コードは意味が読み取りにくいので日本語に対応づける
const STATUS_MEANING: Record<number, string> = {
    200: "OK（受理された）",
    202: "受理。ただし鍵の検証が保留中",
    400: "不正なリクエスト（URLの形式を確認）",
    403: "鍵が無効。公開中の鍵ファイルと KEY が一致していない",
    422: "URLがホストと一致しない、または鍵が一致しない",
    429: "送信しすぎ。時間をおいて再実行",
};

// 鍵はローカルと本番の両方が一致していないと 403 になる。送信前に両方を確認する
async function assertKeyPublished(): Promise<void> {
    let local: string;
    try {
        local = (await fs.readFile(KEY_FILE, "utf-8")).trim();
    } catch {
        throw new Error(`鍵ファイルが無い: ${KEY_FILE}（中身は "${KEY}" の1行のみ）`);
    }
    if (local !== KEY) {
        throw new Error(`${KEY_FILE} の中身がスクリプトの KEY と一致しない`);
    }

    const res = await fetch(`${BASE_URL}/${KEY}.txt`);
    if (!res.ok) {
        throw new Error(`鍵ファイルが本番に無い: ${BASE_URL}/${KEY}.txt (HTTP ${res.status})。デプロイ済みか確認する`);
    }
    const published = (await res.text()).trim();
    if (published !== KEY) {
        throw new Error(`本番の鍵ファイルの中身が一致しない: "${published.slice(0, 50)}"`);
    }
}

async function collectFromSitemap(): Promise<string[]> {
    const res = await fetch(`${BASE_URL}/sitemap.xml`);
    if (!res.ok) throw new Error(`sitemap.xml の取得に失敗: HTTP ${res.status}`);
    const xml = await res.text();

    const locs: string[] = [];
    const re = /<loc>([^<]+)<\/loc>/g;
    let match: RegExpExecArray | null;
    while ((match = re.exec(xml)) !== null) {
        locs.push(match[1].trim());
    }
    return locs;
}

function toAbsolute(input: string): string {
    if (input.startsWith("http://") || input.startsWith("https://")) return input;
    return `${BASE_URL}${input.startsWith("/") ? "" : "/"}${input}`;
}

async function main() {
    const args = process.argv.slice(2);
    const dryRun = args.includes("--dry-run");
    const rest = args.filter((a) => a !== "--dry-run");

    let urls: string[];
    if (rest.includes("--all")) {
        urls = await collectFromSitemap();
    } else if (rest[0] === "--items") {
        urls = rest.slice(1).map((id) => `${BASE_URL}/items/${id}/`);
    } else {
        urls = rest.map(toAbsolute);
    }

    urls = Array.from(new Set(urls.filter((u) => u.length > 0)));
    if (urls.length === 0) {
        console.log("送信対象のURLがありません。使い方はこのファイル冒頭のコメントを参照。");
        process.exit(1);
    }

    const foreign = urls.filter((u) => !u.startsWith(BASE_URL));
    if (foreign.length > 0) {
        console.error(`❌ ホストが違うURLが混ざっています:\n   ${foreign.join("\n   ")}`);
        process.exit(1);
    }

    console.log(`送信対象: ${urls.length}件`);
    if (dryRun) {
        for (const u of urls) console.log(`   ${u}`);
        console.log("\n--dry-run のため送信していません。");
        return;
    }

    await assertKeyPublished();

    for (let i = 0; i < urls.length; i += MAX_URLS_PER_REQUEST) {
        const chunk = urls.slice(i, i + MAX_URLS_PER_REQUEST);
        const res = await fetch(ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify({
                host: HOST,
                key: KEY,
                keyLocation: `${BASE_URL}/${KEY}.txt`,
                urlList: chunk,
            }),
        });

        const meaning = STATUS_MEANING[res.status] ?? "想定外の応答";
        console.log(`HTTP ${res.status} — ${meaning}（${chunk.length}件）`);

        if (!res.ok) {
            const body = (await res.text()).trim();
            if (body) console.error(`   応答本文: ${body.slice(0, 300)}`);
            process.exit(1);
        }
    }

    console.log("\n✅ 送信完了。反映は Bing Webmaster Tools の URL Inspection で確認できる。");
}

main().catch((err) => {
    console.error("エラー:", err instanceof Error ? err.message : err);
    process.exit(1);
});
