import { NextRequest, NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

// Initialize S3 Client
// NOTE: Account ID and Bucket Name need to be provided via environment variables
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

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const key = searchParams.get("key");

    if (!key) {
        return new NextResponse("Missing key parameter", { status: 400 });
    }

    if (!R2_ACCOUNT_ID || !R2_BUCKET_NAME || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
        console.error("Missing R2 environment variables");
        return new NextResponse("Server Configuration Error", { status: 500 });
    }

    try {
        const command = new GetObjectCommand({
            Bucket: R2_BUCKET_NAME,
            Key: key,
        });

        const response = await S3.send(command);

        if (!response.Body) {
            return new NextResponse("Image not found", { status: 404 });
        }

        // Convert the stream to a Response
        // @ts-ignore: Web streams are compatible
        return new NextResponse(response.Body.transformToWebStream(), {
            headers: {
                "Content-Type": response.ContentType || "image/png",
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        });
    } catch (error) {
        console.error("Error fetching image from R2:", error);
        return new NextResponse("Error fetching image", { status: 500 });
    }
}
