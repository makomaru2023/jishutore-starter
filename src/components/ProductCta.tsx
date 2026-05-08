'use client';

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}

const NOTE_URL = "https://note.com/jisyutore/n/n8334f145dd2a";
const LABEL = "自主トレ説明資料980円";

export function ProductCta() {
    const handleClick = () => {
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            window.gtag('event', 'note_click', {
                location: 'product_cta',
                url: NOTE_URL,
                label: LABEL,
            });
        }
    };

    return (
        <section className="w-full">
            <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                {/* 装飾 */}
                <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-blue-50/70 pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-sky-50/60 pointer-events-none" />

                <div className="relative px-6 py-8 sm:px-10 sm:py-10 md:flex md:items-center md:gap-10">
                    {/* 左: バッジ + 価格 */}
                    <div className="flex md:flex-col md:items-start items-center gap-3 md:gap-2 md:w-48 md:flex-shrink-0 mb-5 md:mb-0">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold border border-blue-100">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                                <path fillRule="evenodd" d="M9.401 3.003c1.155-2.004 4.043-2.004 5.197 0l7.355 12.748c1.154 2.004-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.496-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                            </svg>
                            note公式
                        </span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">¥980</span>
                            <span className="text-xs font-bold text-slate-400">買い切り</span>
                        </div>
                    </div>

                    {/* 中央: テキスト */}
                    <div className="flex-1 text-center md:text-left">
                        <p className="text-xs sm:text-sm font-bold text-blue-600 mb-2 tracking-wide">
                            無料イラストだけでは、説明資料づくりに時間がかかる方へ
                        </p>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 leading-snug mb-3">
                            自主トレの説明文・構成・スライドデザインまで<br className="hidden sm:block" />整えた資料を <span className="text-blue-600">980円</span> で。
                        </h3>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed">
                            患者さんへの説明、家族指導、施設内資料づくりに使いやすい買い切りテンプレートです。
                        </p>
                    </div>

                    {/* 右: ボタン */}
                    <div className="mt-6 md:mt-0 md:w-auto md:flex-shrink-0">
                        <a
                            href={NOTE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleClick}
                            className="inline-flex w-full md:w-auto items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-base transition-all shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 hover:scale-[1.02] whitespace-nowrap"
                        >
                            中身を見てみる
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6 21 12m0 0-7.5 6M21 12H3" />
                            </svg>
                        </a>
                        <p className="text-[11px] text-slate-400 mt-2 text-center md:text-right font-medium">
                            ※ noteの商品ページが別タブで開きます
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
