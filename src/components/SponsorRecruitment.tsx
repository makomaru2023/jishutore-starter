import Link from "next/link";

type SponsorRecruitmentProps = {
    variant?: "default" | "compact";
    className?: string;
};

export function SponsorRecruitment({
    variant = "default",
    className = "",
}: SponsorRecruitmentProps) {
    if (variant === "compact") {
        return (
            <section className={`w-full ${className}`}>
                <div className="rounded-2xl border border-blue-100 bg-blue-50/40 px-5 py-5 sm:px-6 sm:py-6">
                    <h3 className="text-sm sm:text-base font-bold text-slate-800 mb-2 leading-snug">
                        無料素材の継続を応援してくださる方へ
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                        自主トレ素材庫では、リハビリ・介護現場で使える素材を無料で配布しています。
                        この活動を応援してくださるスポンサーさまを募集しています。
                    </p>
                    <div className="flex justify-end">
                        <Link
                            href="/sponsor"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-blue-200 text-blue-600 hover:bg-blue-50 text-xs sm:text-sm font-bold transition-colors"
                        >
                            スポンサー募集を見る
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
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={`w-full ${className}`}>
            <div className="rounded-3xl border border-blue-100 bg-white px-6 py-8 sm:px-10 sm:py-10">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-lg sm:text-xl font-black text-slate-900 mb-4 leading-snug break-keep">
                        自主トレ素材庫を応援してくださる
                        <br className="sm:hidden" />
                        スポンサーを募集しています
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed break-keep mb-3">
                        リハビリ・介護現場で使える素材を無料で配布しています。
                    </p>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed break-keep mb-3">
                        この活動を継続するため、応援してくださるスポンサーさまを募集しています。
                    </p>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed break-keep mb-6">
                        リハビリ・介護・医療福祉領域の事業者さまと、現場に役立つ形でつながれたら嬉しいです。
                    </p>
                    <Link
                        href="/sponsor"
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white text-sm font-bold transition-all"
                    >
                        スポンサー募集について見る
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
                    </Link>
                </div>
            </div>
        </section>
    );
}
