import { SignJWT, jwtVerify } from 'jose';

/**
 * Secret used to sign short-lived download tokens.
 * In production, set DOWNLOAD_TOKEN_SECRET to a long random string (e.g. `openssl rand -hex 32`).
 * Falls back to STRIPE_SECRET_KEY for backwards compatibility, and a dev placeholder otherwise.
 */
function getSecret(): Uint8Array {
    const secret =
        process.env.DOWNLOAD_TOKEN_SECRET ||
        process.env.STRIPE_SECRET_KEY ||
        'default_secret_key_for_dev';
    return new TextEncoder().encode(secret);
}

export interface DownloadTokenPayload extends Record<string, unknown> {
    sessionId: string;
    productId: string;
}

/**
 * Issue a short-lived (15 min) JWT that authorizes one download.
 */
export async function signDownloadToken(payload: DownloadTokenPayload): Promise<string> {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('15m')
        .sign(getSecret());
}

/**
 * Verify a download token. Returns the payload if valid, otherwise null.
 */
export async function verifyDownloadToken(token: string): Promise<DownloadTokenPayload | null> {
    try {
        const { payload } = await jwtVerify(token, getSecret());
        if (typeof payload.sessionId === 'string' && typeof payload.productId === 'string') {
            return { sessionId: payload.sessionId, productId: payload.productId };
        }
        return null;
    } catch {
        return null;
    }
}
