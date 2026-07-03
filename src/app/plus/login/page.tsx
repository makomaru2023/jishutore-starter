import type { Metadata } from "next";
import { Suspense } from "react";
import { PlusLoginForm } from "./PlusLoginForm";

export const metadata: Metadata = {
    title: "ログイン｜自主トレ素材庫Plus",
    robots: { index: false, follow: false },
};

export default function PlusLoginPage() {
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
                まだご登録でない方は{" "}
                <a href="/products/jishutore-plus" className="font-semibold text-blue-600 hover:underline">
                    Plusのご案内
                </a>
                {" "}へ
            </p>
        </main>
    );
}
