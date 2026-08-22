import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { PLUS_SESSION_COOKIE, verifySessionToken } from "@/lib/plus-auth";
import { PlusLoginForm } from "./PlusLoginForm";
import { PLUS_SIGNUP_PAUSED } from "@/constants/plus-availability";

export const metadata: Metadata = {
    title: "ログイン｜自主トレ素材庫Plus",
    robots: { index: false, follow: false },
};

export default async function PlusLoginPage({
    searchParams,
}: {
    searchParams: Promise<{ error?: string }>;
}) {
    const { error } = await searchParams;

    // 資料庫から契約切れとして戻された場合は再転送せず、案内を表示する。
    // それ以外は有効な30日セッションがあればメール入力を省略する。
    if (!error) {
        const cookieStore = await cookies();
        const token = cookieStore.get(PLUS_SESSION_COOKIE)?.value;
        if (token && (await verifySessionToken(token))) {
            redirect("/plus/library/");
        }
    }

    return (
        <main className="mx-auto max-w-md px-6 py-14">
            <div className="mb-8 text-center">
                <h1 className="text-2xl font-bold text-gray-900">自主トレ素材庫Plus ログイン</h1>
                <p className="mt-2 text-sm text-gray-600">
                    ご契約中の方は、メールアドレスを入力してください。
                </p>
            </div>
            <Suspense fallback={null}>
                <PlusLoginForm />
            </Suspense>
            <p className="mt-8 text-center text-sm text-gray-500">
                {PLUS_SIGNUP_PAUSED ? (
                    "現在、新規のお申し込みは停止しています。"
                ) : (
                    <>
                        まだご登録でない方は{" "}
                        <a href="/products/jishutore-plus" className="font-semibold text-blue-600 hover:underline">
                            Plusのご案内
                        </a>
                        {" "}へ
                    </>
                )}
            </p>
        </main>
    );
}
