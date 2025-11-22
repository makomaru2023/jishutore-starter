import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { S3Client, HeadBucketCommand, ListObjectsV2Command, ListObjectsV2CommandOutput } from "@aws-sdk/client-s3";

const accountId = process.env.R2_ACCOUNT_ID!;
const bucket = process.env.R2_BUCKET!;
const accessKeyId = process.env.R2_ACCESS_KEY_ID!;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY!;
const endpoint = (process.env.R2_ENDPOINT || `https://${accountId}.r2.cloudflarestorage.com`).replace(/\/+$/, "");

async function tryClient(label: string, client: S3Client) {
  try {
    await client.send(new HeadBucketCommand({ Bucket: bucket }));
    const out: ListObjectsV2CommandOutput = await client.send(new ListObjectsV2Command({ Bucket: bucket, MaxKeys: 3 }));
    console.log(`✅ ${label} OK`, (out.Contents ?? []).map(o => o?.Key));
    return true;
  } catch (e) {
    console.log(`❌ ${label} NG`, (e as any)?.$metadata ?? (e as any));
    return false;
  }
}

async function main() {
  const a = new S3Client({
    region: "auto",
    endpoint,
    credentials: { accessKeyId, secretAccessKey },
    forcePathStyle: true
  });

  const vhost = `${bucket}.${endpoint.replace(/^https?:\/\/([^/]+).*/, "$1")}`;
  const b = new S3Client({
    region: "auto",
    endpoint: `https://${vhost}`,
    credentials: { accessKeyId, secretAccessKey },
    forcePathStyle: false
  });

  console.log("Env:", {
    endpoint,
    bucket,
    accessKeyIdLen: accessKeyId.length,
    secretKeyLen: secretAccessKey.length
  });

  const okA = await tryClient("PathStyle", a);
  if (okA) return;
  const okB = await tryClient("VirtualHost", b);
  if (!okB) process.exit(1);
}

main().catch((e) => { console.error(e); process.exit(1); });
