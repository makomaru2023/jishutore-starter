import { SignJWT, jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(process.env.STRIPE_SECRET_KEY || 'default_secret_key_for_dev');

export async function signDownloadToken(payload: { plan: string; sessionId: string }) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h') // Token valid for 24 hours
        .sign(SECRET_KEY);
}

export async function verifyDownloadToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, SECRET_KEY);
        return payload as { plan: string; sessionId: string };
    } catch (error) {
        return null;
    }
}
