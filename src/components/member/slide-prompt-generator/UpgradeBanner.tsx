import Link from "next/link";
import { UPGRADE_BANNER_ID, UPGRADE_URL } from "./planConfig";
import {
    PLUS_PROMO_CURRENT_PRICE_YEN,
    PLUS_PROMO_IS_ACTIVE,
    PLUS_PROMO_PRICE_NOTE,
} from "@/constants/plus-pricing";

/**
 * 無料版から自主トレ素材庫Plus（全部入り月額）への案内バナー。
 * 無料版ページ下部、およびロック項目クリック時のスクロール先として使う。
 */
export function UpgradeBanner() {
    const benefits = [
        "テンプレート8種すべて使える",
        "ビジュアルスタイル10種すべて使える",
        "スライド10枚まで作れる",
        "編集できるスライド素材・完成デッキ・報酬チェックも全部入り",
    ];

    return (
        <section
            id={UPGRADE_BANNER_ID}
            className="rounded-3xl border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-white p-6 shadow-sm shadow-sky-100/60 sm:p-8"
        >
            <div className="mx-auto max-w-2xl">
                <p className="mb-2 inline-block rounded-full bg-sky-100 px-3 py-1 text-[11px] font-black tracking-widest text-sky-700">
                    ★ アップグレード
                </p>
                <h2 className="mb-3 text-xl font-black leading-snug text-slate-900 sm:text-2xl break-keep">
                    すべてのテンプレートとスタイルを使うには
                </h2>
                <p className="mb-5 text-sm leading-relaxed text-slate-600 break-keep">
                    自主トレ素材庫Plusに登録すると、フル版のすべての機能を制限なくご利用いただけます。
                </p>

                <ul className="mb-6 space-y-2">
                    {benefits.map((b) => (
                        <li
                            key={b}
                            className="flex items-start gap-2.5 text-sm font-medium text-slate-700"
                        >
                            <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={3}
                                    stroke="currentColor"
                                    className="h-3 w-3"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m4.5 12.75 6 6 9-13.5"
                                    />
                                </svg>
                            </span>
                            <span className="leading-relaxed break-keep">{b}</span>
                        </li>
                    ))}
                </ul>

                <div className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="flex items-baseline gap-1">
                            <span className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                                月額¥{PLUS_PROMO_CURRENT_PRICE_YEN}
                            </span>
                            <span className="text-sm font-bold text-slate-500">（税込）</span>
                        </p>
                        <p className="mt-1 text-xs font-bold text-slate-500 break-keep">
                            {PLUS_PROMO_IS_ACTIVE ? PLUS_PROMO_PRICE_NOTE : "いつでも解約できます"}
                        </p>
                    </div>
                    <Link
                        href={UPGRADE_URL}
                        className="inline-flex w-full flex-shrink-0 items-center justify-center gap-2 rounded-full bg-sky-600 px-6 py-3 text-sm font-black text-white shadow-md shadow-sky-600/25 transition-colors hover:bg-sky-700 sm:w-auto"
                    >
                        Plusを見る
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2.5}
                            stroke="currentColor"
                            className="h-4 w-4 flex-shrink-0"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
