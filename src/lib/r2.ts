import { S3Client, GetObjectCommand, PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;

if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME) {
    console.warn("R2 environment variables are missing. R2 operations will fail.");
}

export const r2Client = new S3Client({
    region: "auto",
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: R2_ACCESS_KEY_ID || "",
        secretAccessKey: R2_SECRET_ACCESS_KEY || "",
    },
});

export const R2_BUCKET = R2_BUCKET_NAME || "";

/**
 * Fetch an object from R2. Returns a web ReadableStream + content metadata.
 * Throws if not found.
 */
export async function getR2Object(key: string) {
    const res = await r2Client.send(new GetObjectCommand({ Bucket: R2_BUCKET, Key: key }));
    if (!res.Body) {
        throw new Error(`R2 object not found: ${key}`);
    }
    const body = (res.Body as unknown as { transformToWebStream: () => ReadableStream }).transformToWebStream();
    return {
        body,
        contentType: res.ContentType,
        contentLength: res.ContentLength,
    };
}

/**
 * Read an object from R2 fully as a string (for small JSON files).
 */
export async function getR2ObjectAsString(key: string): Promise<string | null> {
    try {
        const res = await r2Client.send(new GetObjectCommand({ Bucket: R2_BUCKET, Key: key }));
        if (!res.Body) return null;
        const body = res.Body as unknown as { transformToString: (enc?: string) => Promise<string> };
        return await body.transformToString("utf-8");
    } catch (err) {
        const e = err as { name?: string; $metadata?: { httpStatusCode?: number } };
        if (e.name === "NoSuchKey" || e.$metadata?.httpStatusCode === 404) {
            return null;
        }
        throw err;
    }
}

/**
 * Put a string/Buffer to R2 at the given key.
 */
export async function putR2Object(key: string, body: string | Buffer, contentType = "application/octet-stream") {
    await r2Client.send(new PutObjectCommand({
        Bucket: R2_BUCKET,
        Key: key,
        Body: body,
        ContentType: contentType,
    }));
}

/**
 * Check if an object exists in R2.
 */
export async function r2ObjectExists(key: string): Promise<boolean> {
    try {
        await r2Client.send(new HeadObjectCommand({ Bucket: R2_BUCKET, Key: key }));
        return true;
    } catch {
        return false;
    }
}
