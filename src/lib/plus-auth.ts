import { SignJWT, jwtVerify } from "jose";

/**
 * 自主トレ素材庫Plus の会員認証（DB不要・署名トークン方式）。
 *
 * - マジックリンク: メールに埋め込む短命(15分)トークン。クリックでログイン。
 * - セッション:      ログイン状態を保持する Cookie 用トークン(30日)。
 *
 * どちらも jose で HMAC 署名した JWT。検証は署名＋有効期限のみ（ステートレス）。
 * 「本当に有効な契約か」は Stripe 側で別途確認する（plus-subscription.ts）。
 */

const MAGIC_PURPOSE = "plus-magic";
const SESSION_PURPOSE = "plus-session";

export const PLUS_SESSION_COOKIE = "plus_session";
export const PLUS_SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30日

function getSecret(): Uint8Array {
    const secret =
        process.env.PLUS_SESSION_SECRET ||
        process.env.DOWNLOAD_TOKEN_SECRET ||
        process.env.STRIPE_SECRET_KEY ||
        "default_secret_key_for_dev";
    return new TextEncoder().encode(secret);
}

/** メールアドレスを正規化（小文字・前後空白除去）。 */
export function normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
}

// --- マジックリンク ---

/** ログイン用の短命(15分)トークンを発行する。 */
export async function signMagicToken(email: string): Promise<string> {
    return await new SignJWT({ email: normalizeEmail(email), purpose: MAGIC_PURPOSE })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("15m")
        .sign(getSecret());
}

/** マジックリンクのトークンを検証。有効なら email を返す。 */
export async function verifyMagicToken(token: string): Promise<{ email: string } | null> {
    try {
        const { payload } = await jwtVerify(token, getSecret());
        if (payload.purpose === MAGIC_PURPOSE && typeof payload.email === "string") {
            return { email: payload.email };
        }
        return null;
    } catch {
        return null;
    }
}

// --- セッション ---

export interface PlusSession extends Record<string, unknown> {
    email: string;
    /** Stripe Customer ID（ポータル遷移などに使用） */
    cid: string;
}

/** ログイン状態を表すセッショントークン(30日)を発行する。 */
export async function signSessionToken(session: PlusSession): Promise<string> {
    return await new SignJWT({ ...session, purpose: SESSION_PURPOSE })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(`${PLUS_SESSION_MAX_AGE}s`)
        .sign(getSecret());
}

/** セッショントークンを検証。有効なら payload を返す。 */
export async function verifySessionToken(token: string): Promise<PlusSession | null> {
    try {
        const { payload } = await jwtVerify(token, getSecret());
        if (
            payload.purpose === SESSION_PURPOSE &&
            typeof payload.email === "string" &&
            typeof payload.cid === "string"
        ) {
            return { email: payload.email, cid: payload.cid };
        }
        return null;
    } catch {
        return null;
    }
}
