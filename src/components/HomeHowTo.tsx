import Link from "next/link";
import { FREE_MATERIAL_COUNT } from "@/constants/content-counts";

/**
 * トップページ用・3ステップで使い方を説明するセクション
 * 「探す → ダウンロード → 使う」の流れを視覚化し、
 * 「会員登録なし・即DLできる」という心理的ハードルの低さを伝える
 */

type Step = {
    number: string;
    title: string;
    description: string;
    iconPath: string; // Heroicons stroke path
    accent: string; // border + ring color classes
};

const steps: Step[] = [
    {
        number: "01",
        title: "部位・目的から\n探す",
        description: `カテゴリやキーワードで検索。\n${FREE_MATERIAL_COUNT}点の素材から1枚がすぐ見つかります。`,
        iconPath: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z",
        accent: "from-rose-50 border-rose-200 text-rose-500",
    },
    {
        number: "02",
        title: "ワンクリックで\nダウンロード",
        description: "会員登録もメアド入力も不要。\nクリック1つでPNG画像をダウンロードできます。",
        iconPath: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3",
        accent: "from-teal-50 border-teal-200 text-teal-500",
    },
    {
        number: "03",
        title: "資料に貼って\n患者さんへ",
        description: "PowerPointやWordにそのまま貼って印刷。\n指導書としてもお使いいただけます。",
        iconPath: "M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z",
        accent: "from-amber-50 border-amber-200 text-amber-500",
    },
];

export function HomeHowTo() {
    return (
        <section className="py-16 sm:py-20 bg-gradient-to-b from-slate-50 to-white">
            <div className="container mx-auto px-4">
                {/* セクションヘッダー */}
                <div className="text-center mb-12 sm:mb-14">
                    <p className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 font-black text-xs tracking-widest mb-4">
                        HOW TO USE
                    </p>
                    <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mb-3 tracking-tight">
                        使い方は、<span className="text-teal-500">たったの3ステップ</span>
                    </h2>
                    <p className="text-slate-500 font-medium text-sm sm:text-base max-w-2xl mx-auto">
                        会員登録もメアド入力も一切なし。
                        <br className="sm:hidden" />
                        アクセスして、選んで、ダウンロードするだけ。
                    </p>
                </div>

                {/* ステップグリッド */}
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 lg:gap-8 relative">
                        {/* 接続ライン（PC/タブレットのみ） */}
                        <div className="hidden md:block absolute top-12 left-[16.66%] right-[16.66%] h-0.5 bg-gradient-to-r from-rose-200 via-teal-200 to-amber-200 -z-0"></div>

                        {steps.map((step) => (
                            <div
                                key={step.number}
                                className={`relative flex flex-col bg-white rounded-3xl border-2 ${step.accent.split(" ")[1]} p-6 sm:p-7 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 z-10`}
                            >
                                {/* 右上の装飾アイコン */}
                                <div className={`absolute top-5 right-5 ${step.accent.split(" ")[2]} opacity-30`}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-12 h-12"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d={step.iconPath} />
                                    </svg>
                                </div>

                                {/* ステップ番号バッジ + タイトル（横並び・常に2行分の高さを確保） */}
                                <div className="flex items-start gap-3 mb-4 pr-14 min-h-[4rem]">
                                    <div className={`flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br ${step.accent.split(" ")[0]} ${step.accent.split(" ")[1]} border-2 shadow-sm`}>
                                        <span className={`text-base font-black tracking-tight ${step.accent.split(" ")[2]}`}>
                                            {step.number}
                                        </span>
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight whitespace-pre-line pt-1">
                                        {step.title}
                                    </h3>
                                </div>

                                {/* 説明（カード下部にflex-1で揃える） */}
                                <p className="text-sm text-slate-500 font-medium leading-relaxed flex-1 whitespace-pre-line">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTAライン */}
                <div className="mt-12 text-center">
                    <Link
                        href="/items"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-teal-500 text-white font-black text-base sm:text-lg hover:bg-teal-400 hover:scale-105 transition-all shadow-lg shadow-teal-500/30"
                    >
                        さっそく素材を探す
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                    </Link>
                    <p className="text-xs text-slate-400 font-medium mt-3">
                        商用利用OK・クレジット表記不要
                        <br className="sm:hidden" />
                        <span className="sm:ml-0 sm:before:content-['・']">登録不要</span>
                    </p>
                </div>
            </div>
        </section>
    );
}
