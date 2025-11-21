import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import path from "path";

// Load .env.local manually since we are running this script directly
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;

console.log("Config:", { R2_ACCOUNT_ID, R2_BUCKET_NAME });

const S3 = new S3Client({
    region: "auto",
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: R2_ACCESS_KEY_ID || "",
        secretAccessKey: R2_SECRET_ACCESS_KEY || "",
    },
});

async function listObjects() {
    try {
        const command = new ListObjectsV2Command({
            Bucket: R2_BUCKET_NAME,
            Prefix: "basic/plain/",
            MaxKeys: 100,
        });
        const response = await S3.send(command);
        console.log("Objects:");
        response.Contents?.forEach((c) => console.log(c.Key));
    } catch (error) {
        console.error("Error:", error);
    }
}

listObjects();
