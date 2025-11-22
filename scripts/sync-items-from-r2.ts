import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;
const OUT = "data/items.json";

const S3 = new S3Client({
    region: "auto",
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: R2_ACCESS_KEY_ID || "",
        secretAccessKey: R2_SECRET_ACCESS_KEY || "",
    },
});

type Item = {
    id: string;
    tier: string;
    category: string;
    title: string;
    previewSrc: string;
    fileHref: string;
    fileName: string;
};

async function main() {
    const items: Item[] = [];
    let continuationToken: string | undefined = undefined;

    do {
        const command: ListObjectsV2Command = new ListObjectsV2Command({
            Bucket: R2_BUCKET_NAME,
            MaxKeys: 1000,
            ContinuationToken: continuationToken,
        });
        const response = await S3.send(command);

        for (const content of response.Contents || []) {
            const key = content.Key;
            if (!key || key.endsWith("/")) continue;
            if (!key.match(/\.(png|jpg|jpeg|pdf)$/i)) continue;

            // Expected structure: tier/category/filename
            const parts = key.split("/");
            if (parts.length < 3) continue;

            const tier = parts[0];
            const category = parts[1];
            const fileName = parts[parts.length - 1];
            const id = fileName.replace(/\.[^.]+$/, "");

            // Simple title generation from filename
            // e.g. knee-extension -> Knee Extension
            const title = id.split("-").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(" ");

            items.push({
                id,
                tier,
                category,
                title,
                previewSrc: key, // Store the key, ItemCard will handle the URL
                fileHref: `/api/image?key=${encodeURIComponent(key)}`, // Download link also via proxy
                fileName
            });
        }
        continuationToken = response.NextContinuationToken;
    } while (continuationToken);

    await fs.writeFile(OUT, JSON.stringify(items, null, 2));
    console.log(`Wrote ${items.length} items to ${OUT}`);
}

main().catch(console.error);
