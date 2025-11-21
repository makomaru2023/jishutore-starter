import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const accountId = process.env.R2_ACCOUNT_ID!;
const accessKeyId = process.env.R2_ACCESS_KEY_ID!;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY!;
const bucket = process.env.R2_BUCKET!;
const publicBase = (process.env.R2_PUBLIC_BASE_URL || "").replace(/\/$/, "");

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId, secretAccessKey }
});

type Tier = "free" | "basic" | "pro" | "premium";

type Item = {
  id: string;
  title: string;
  category: string;
  tags: string[];
  previewSrc: string;
  fileHref: string;
  cdnHref?: string;
  sizeBytes: number;
  tier: Tier;
};

function niceTitle(filename: string) {
  return filename.replace(/\.[a-z0-9]+$/i, "").replace(/[-_]+/g, " ");
}

function detectTierAndCategory(key: string) {
  const parts = key.split("/").filter(Boolean);
  let idx = 0;
  if (parts[0] === "files") idx = 1;
  const tier = (parts[idx] as Tier) ?? "free";
  const category = parts[idx + 1] ?? "misc";
  return { tier, category };
}

async function listAll(prefix: string) {
  const keys: { Key: string; Size: number }[] = [];
  let token: string | undefined = undefined;
  do {
    const out = await s3.send(new ListObjectsV2Command({ Bucket: bucket, Prefix: prefix, ContinuationToken: token }));
    for (const o of out.Contents ?? []) {
      if (!o.Key || o.Key.endsWith("/")) continue;
      keys.push({ Key: o.Key, Size: o.Size ?? 0 });
    }
    token = out.IsTruncated ? out.NextContinuationToken : undefined;
  } while (token);
  return keys;
}

async function main() {
  let objects = await listAll("files/");
  if (objects.length === 0) objects = await listAll("");

  const items: Item[] = [];
  for (const o of objects) {
    const key = o.Key;
    if (!/\.(png|jpe?g|webp|svg|pdf|zip|ai|psd)$/i.test(key)) continue;

    const { tier, category } = detectTierAndCategory(key);
    const filename = path.basename(key);
    const title = niceTitle(filename);
    const cdnHref = publicBase ? `${publicBase}/${key}` : "";
    const id = crypto.createHash("sha1").update(key).digest("hex").slice(0, 10);

    items.push({
      id,
      title,
      category,
      tags: [],
      previewSrc: cdnHref || `/${key}`,
      fileHref: cdnHref || `/${key}`,
      cdnHref: cdnHref || undefined,
      sizeBytes: o.Size,
      tier
    });
  }

  await fs.mkdir("data", { recursive: true });
  await fs.writeFile("data/items.json", JSON.stringify(items, null, 2));
  console.log(`Wrote ${items.length} items to data/items.json`);
}

main().catch((e) => { console.error(e); process.exit(1); });
