import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;

const S3 = new S3Client({
    region: "auto",
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: R2_ACCESS_KEY_ID || "",
        secretAccessKey: R2_SECRET_ACCESS_KEY || "",
    },
});

async function listRecentObjects() {
    try {
        const command: ListObjectsV2Command = new ListObjectsV2Command({
            Bucket: R2_BUCKET_NAME,
            MaxKeys: 1000,
        });
        const response = await S3.send(command);

        if (!response.Contents) {
            console.log("No objects found.");
            return;
        }

        const sorted = response.Contents.sort((a, b) => {
            return (b.LastModified?.getTime() || 0) - (a.LastModified?.getTime() || 0);
        });

        console.log("Most recent 20 files:");
        sorted.slice(0, 20).forEach((c) => {
            console.log(`${c.LastModified?.toISOString()} - ${c.Key}`);
        });

    } catch (error) {
        console.error("Error:", error);
    }
}

listRecentObjects();
