import type { Metadata } from "next";
import { grantPlusAccess } from "./grant-plus-access";

export const metadata: Metadata = {
    title: "ご登録ありがとうございます｜自主トレ素材庫Plus",
    robots: { index: false, follow: false },
};

export default async function PlusWelcomePage({
    searchParams,
}: {
    searchParams: Promise<{ session_id?: string }>;
}) {
    const sp = await searchParams;
    const sessionId = typeof sp.session_id === "string" ? sp.session_id : "";

    // 検証に成功すれば /plus/library へ、失敗すれば LP へリダイレクトする。
    await grantPlusAccess(sessionId);

    // リダイレクトされるため通常は表示されない。
    return (
        <main className="mx-auto flex min-h-[50vh] max-w-md flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-gray-700">ログイン処理中です…</p>
        </main>
    );
}
