import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import archiver from "archiver";
import { Readable } from "stream";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;

const ITEMS_PATH = path.join(process.cwd(), 'data/items.json');
const PUBLIC_FILES_DIR = path.join(process.cwd(), 'public/files');

// Ensure public/files exists
if (!fs.existsSync(PUBLIC_FILES_DIR)) {
    fs.mkdirSync(PUBLIC_FILES_DIR, { recursive: true });
}

const S3 = new S3Client({
    region: "auto",
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: R2_ACCESS_KEY_ID || "",
        secretAccessKey: R2_SECRET_ACCESS_KEY || "",
    },
});

interface Item {
    id: string;
    tier: string;
    category: string;
    title: string;
    titleJa?: string;
    previewSrc: string; // This is the R2 key
    fileName: string;
}

async function downloadAndZip(tierName: string, items: Item[]) {
    console.log(`Starting generation for ${tierName}.zip with ${items.length} items...`);

    const output = fs.createWriteStream(path.join(PUBLIC_FILES_DIR, `${tierName}.zip`));
    const archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
    });

    return new Promise<void>(async (resolve, reject) => {
        output.on('close', function () {
            console.log(`${tierName}.zip has been finalized and the output file descriptor has closed.`);
            console.log(archive.pointer() + ' total bytes');
            resolve();
        });

        archive.on('error', function (err) {
            reject(err);
        });

        archive.pipe(output);

        for (const item of items) {
            try {
                // Determine filename: use titleJa if available, otherwise fallback to fileName
                // Ensure extension is preserved
                const ext = path.extname(item.fileName);
                let filename = item.titleJa ? `${item.titleJa}${ext}` : item.fileName;

                // Sanitize filename (remove slashes, etc.)
                filename = filename.replace(/\//g, '_').replace(/\\/g, '_');

                // Download from R2
                const command = new GetObjectCommand({
                    Bucket: R2_BUCKET_NAME,
                    Key: item.previewSrc,
                });
                const response = await S3.send(command);

                if (response.Body) {
                    // Convert WebStream to Node Stream if necessary (AWS SDK v3 returns WebStream in some envs, but usually IncomingMessage in Node)
                    // archiver supports streams.
                    archive.append(response.Body as Readable, { name: filename });
                    // console.log(`Added: ${filename}`);
                } else {
                    console.warn(`Warning: Empty body for ${item.previewSrc}`);
                }
            } catch (error) {
                console.error(`Error processing ${item.fileName}:`, error);
            }
        }

        await archive.finalize();
    });
}

async function main() {
    const itemsRaw = fs.readFileSync(ITEMS_PATH, 'utf-8');
    const allItems: Item[] = JSON.parse(itemsRaw);

    // Filter items by tier
    // Note: Premium includes EVERYTHING (Basic + Pro + Premium specific)
    // Pro includes Basic + Pro specific
    // Basic includes Basic specific

    // Wait, usually tiered plans work like:
    // Basic = Basic items
    // Pro = Basic + Pro items
    // Premium = All items

    // Let's verify the user's intent. "basic.zip", "pro.zip", "premium.zip".
    // Usually a zip for a plan should contain ALL items accessible in that plan.

    const basicItems = allItems.filter(i => i.tier === 'basic');
    const proSpecificItems = allItems.filter(i => i.tier === 'pro');
    const basicZipItems = [...basicItems];
    const proZipItems = [...basicItems, ...proSpecificItems];
    const premiumZipItems = [...allItems]; // All items

    console.log(`Basic Items: ${basicZipItems.length}`);
    console.log(`Pro Items: ${proZipItems.length}`);
    console.log(`Premium Items: ${premiumZipItems.length}`);

    try {
        await downloadAndZip('basic', basicZipItems);
        await downloadAndZip('pro', proZipItems);
        await downloadAndZip('premium', premiumZipItems);
        console.log('All zip files generated successfully!');
    } catch (error) {
        console.error('Error generating zip files:', error);
    }
}

main();
