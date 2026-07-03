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
