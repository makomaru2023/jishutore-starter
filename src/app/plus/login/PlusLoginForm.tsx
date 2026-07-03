"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

const ERROR_MESSAGES: Record<string, string> = {
    expired: "リンクの有効期限が切れています。もう一度ログインリンクをお送りします。",
    nosub: "有効なご契約が見つかりませんでした。ご登録時のメールアドレスをご確認ください。",
    server: "エラーが発生しました。時間をおいて再度お試しください。",
};

export function PlusLoginForm() {
    const searchParams = useSearchParams();
    const initialError = searchParams.get("error");

    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
    const [message, setMessage] = useState<string>(
        initialError ? ERROR_MESSAGES[initialError] ?? "" : "",
    );

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!email.trim()) return;
        setStatus("loading");
        setMessage("");
        try {
            const res = await fetch("/api/plus/auth/request/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                setStatus("error");
                setMessage(data?.error ?? "送信に失敗しました。");
                return;
            }
            setStatus("sent");
        } catch {
            setStatus("error");
            setMessage("送信に失敗しました。通信環境をご確認ください。");
        }
    }

    if (status === "sent") {
        return (
            <div className="rounded-xl border border-blue-100 bg-blue-50 p-6 text-center">
                <p className="text-lg font-bold text-blue-800">メールをお送りしました 📩</p>
                <p className="mt-3 text-sm leading-relaxed text-gray-700">
                    <span className="font-semibold">{email}</span> 宛にログイン用リンクをお送りしました。
                    <br />
                    メール内のボタンから資料庫にログインしてください（有効期限15分）。
                </p>
                <p className="mt-4 text-xs text-gray-500">
                    ※ 届かない場合は迷惑メールフォルダをご確認ください。<br />
                    ご契約中のメールアドレスにのみ送信されます。
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {message && (
                <p className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">{message}</p>
            )}
            <div>
                <label htmlFor="plus-email" className="mb-1 block text-sm font-medium text-gray-700">
                    ご登録のメールアドレス
                </label>
                <input
                    id="plus-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
            </div>
            <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-lg bg-blue-600 px-4 py-3 text-base font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {status === "loading" ? "送信中…" : "ログインリンクを送る"}
            </button>
            <p className="text-center text-xs text-gray-500">
                パスワードは不要です。メールのリンクからログインできます。
            </p>
        </form>
    );
}
