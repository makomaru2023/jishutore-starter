import Link from "next/link";

type Props = {
    /** 表示テイスト。default はライト、subtle はより控えめ。 */
    variant?: "default" | "subtle";
};

export function PremiumPromoBanner({ variant = "default" }: Props) {
    if (variant === "subtle") {
        return (
            <Link
                href="/products/jishutore-plus/"
                className="group flex items-center gap-4 px-5 py-4 bg-white border border-slate-200 rounded-2xl hover:border-teal-300 hover:shadow-md transition-all"
            >
                <div className="shrink-0 w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.875 21h6.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125Z"
                        />
                    </svg>
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-teal-600 tracking-wide mb-0.5">
                        自主トレ素材庫Plus
                    </p>
                    <p className="text-sm font-black text-slate-900 leading-snug group-hover:text-teal-600 transition-colors">
                        編集できる資料と報酬チェックが全部入り
                    </p>
                </div>
                <span className="shrink-0 inline-flex items-center gap-1 text-xs font-black text-slate-700 group-hover:text-teal-600 whitespace-nowrap">
                    見る
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="w-3.5 h-3.5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                        />
                    </svg>
                </span>
            </Link>
        );
    }

    return (
        <Link
            href="/products/jishutore-plus/"
            className="group block bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-teal-400/50 transition-all"
        >
            <div className="relative px-6 py-6 sm:px-10 sm:py-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl" />

                <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-7 h-7"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.875 21h6.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125Z"
                        />
                    </svg>
                </div>

                <div className="flex-1 relative z-10">
                    <p className="text-xs font-bold text-teal-300 tracking-widest mb-1">
                        自主トレ素材庫Plus
                    </p>
                    <h3 className="text-lg sm:text-xl font-black text-white leading-tight mb-1">
                        資料づくりも、算定確認も、Plusひとつで。
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                        編集できる運動スライド、会員ツール、報酬チェックを同じ月額で利用できます。
                    </p>
                </div>

                <span className="relative z-10 shrink-0 inline-flex items-center gap-1.5 px-5 py-3 rounded-full bg-teal-500 group-hover:bg-teal-400 text-white font-black text-sm whitespace-nowrap shadow-lg shadow-teal-500/30 transition-all">
                    Plusを見る
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                        />
                    </svg>
                </span>
            </div>
        </Link>
    );
}
