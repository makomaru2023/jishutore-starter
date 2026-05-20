import { NextRequest, NextResponse } from "next/server";
import { verifyDownloadToken } from "@/lib/auth";
import { getOrder, isOrderActive } from "@/lib/orders";
import { getR2Object } from "@/lib/r2";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    const token = req.nextUrl.searchParams.get("token");
    if (!token) {
        return NextResponse.json({ error: "Token is missing" }, { status: 400 });
    }

    const payload = await verifyDownloadToken(token);
    if (!payload) {
        return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }

    const order = await getOrder(payload.sessionId);
    if (!order) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.productId !== payload.productId) {
        return NextResponse.json({ error: "Token does not match order" }, { status: 403 });
    }

    if (!isOrderActive(order)) {
        return NextResponse.json({ error: "Re-download window has expired" }, { status: 403 });
    }

    try {
        const obj = await getR2Object(order.zipKey);
        const filename = order.zipKey.split("/").pop() || "download.zip";

        return new NextResponse(obj.body, {
            headers: {
                "Content-Type": obj.contentType || "application/zip",
                "Content-Disposition": `attachment; filename="${filename}"`,
                ...(obj.contentLength ? { "Content-Length": String(obj.contentLength) } : {}),
                "Cache-Control": "private, no-store",
            },
        });
    } catch (err) {
        console.error(`Failed to stream R2 object ${order.zipKey}:`, err);
        return NextResponse.json({ error: "Failed to fetch file" }, { status: 500 });
    }
}
