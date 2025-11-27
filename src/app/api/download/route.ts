import { NextRequest, NextResponse } from 'next/server';
import { verifyDownloadToken } from '@/lib/auth';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const token = searchParams.get('token');

    if (!token) {
        return NextResponse.json({ error: 'Token is missing' }, { status: 400 });
    }

    const payload = await verifyDownloadToken(token);

    if (!payload) {
        return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    const { plan } = payload;
    const fileName = `${plan}.zip`; // e.g., basic.zip, pro.zip, premium.zip
    const filePath = path.join(process.cwd(), 'public', 'files', fileName);

    if (!fs.existsSync(filePath)) {
        // For MVP, if file doesn't exist, we might want to return a placeholder or error.
        // But to avoid breaking the flow if the user hasn't uploaded files yet, 
        // we can return a friendly error or a dummy file if we had one.
        console.error(`File not found: ${filePath}`);
        return NextResponse.json({ error: 'File not found on server' }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
        headers: {
            'Content-Type': 'application/zip',
            'Content-Disposition': `attachment; filename="jishutore-${fileName}"`,
        },
    });
}
