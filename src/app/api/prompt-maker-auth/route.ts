import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { password } = await req.json();
        const expected = process.env.PROMPT_MAKER_PASSWORD || 'jishutore-ai-2026';

        if (typeof password !== 'string' || password.trim() !== expected) {
            return NextResponse.json({ ok: false }, { status: 401 });
        }

        return NextResponse.json({ ok: true });
    } catch {
        return NextResponse.json({ ok: false }, { status: 400 });
    }
}
