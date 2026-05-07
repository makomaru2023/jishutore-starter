import { PremiumItem } from "../../data/premiumItems";

type Props = {
    item: PremiumItem;
    /** 表示バリエーション。default はフルカード、compact は小型版（一覧バナー等で使用）。 */
    variant?: "default" | "compact";
};

export function PremiumItemCard({ item, variant = "default" }: Props) {
    const isComingSoon = item.status === "coming-soon";

    if (variant === "compact") {
        return (
            <a
                href={isComingSoon ? undefined : item.href}
                target={isComingSoon ? undefined : "_blank"}
                rel={isComingSoon ? undefined : "noopener noreferrer"}
                aria-disabled={isComingSoon}
                className={`group flex items-start gap-4 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm transition-all ${
                    isComingSoon
                        ? "cursor-default opacity-80"
                        : "hover:shadow-lg hover:-translate-y-0.5 hover:border-teal-300"
                }`}
            >
                <div className="shrink-0 w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-teal-600 tracking-wide mb-1">
                        {isComingSoon ? "近日公開" : "PowerPoint資料"}
                    </p>
                    <h3 className="text-sm font-black text-slate-900 leading-snug group-hover:text-teal-600 transition-colors">
                        {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{item.subtitle}</p>
                </div>
                <div className="shrink-0 self-center">
                    <span className={`inline-flex items-center gap-1 text-xs font-black ${isComingSoon ? "text-slate-400" : "text-slate-900 group-hover:text-teal-600"} whitespace-nowrap`}>
                        {isComingSoon ? "準備中" : "詳しく見る"}
                        {!isComingSoon && (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        )}
                    </span>
                </div>
            </a>
        );
    }

    // default variant
    return (
        <article className="flex flex-col h-full bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all">
            {/* Cover */}
            <div className="relative bg-gradient-to-br from-teal-500 to-teal-700 px-6 py-10 text-white">
                <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                    {isComingSoon ? (
                        <span className="px-3 py-1 rounded-full bg-white/95 text-slate-700 text-xs font-black shadow">
                            COMING SOON
                        </span>
                    ) : (
                        <span className="px-3 py-1 rounded-full bg-yellow-300 text-slate-900 text-xs font-black shadow">
                            販売中
                        </span>
                    )}
                </div>
                <p className="text-xs font-bold tracking-widest text-teal-100 mb-2">
                    {item.tags[0] ?? "PowerPoint資料"}
                </p>
                <h2 className="text-2xl sm:text-3xl font-black leading-tight">{item.title}</h2>
                <p className="text-sm font-bold text-teal-50 mt-3 leading-snug">
                    {item.subtitle}
                </p>
            </div>

            {/* Body */}
            <div className="flex flex-col flex-1 p-6 gap-5">
                <p className="text-sm text-slate-700 leading-relaxed">{item.description}</p>

                {/* Contents list */}
                <div>
                    <h3 className="text-xs font-black text-slate-500 tracking-widest mb-3">
                        収録内容
                    </h3>
                    <ul className="grid grid-cols-1 gap-1.5 text-sm text-slate-700">
                        {item.contents.map((content) => (
                            <li key={content} className="flex items-start gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-teal-500 mt-0.5 shrink-0">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                </svg>
                                <span>{content}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Footer with price + CTA */}
                <div className="mt-auto pt-5 border-t border-slate-100 flex items-end justify-between gap-3">
                    <div>
                        <p className="text-xs text-slate-500 font-bold">価格</p>
                        <p className="text-2xl font-black text-slate-900 whitespace-nowrap">
                            {item.price}
                            <span className="text-xs text-slate-500 font-bold ml-1">（買い切り）</span>
                        </p>
                    </div>
                    {isComingSoon ? (
                        <span className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full bg-slate-200 text-slate-500 font-black text-sm whitespace-nowrap shrink-0 cursor-not-allowed">
                            近日公開
                        </span>
                    ) : (
                        <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full bg-teal-500 hover:bg-teal-400 text-white font-black text-sm shadow-lg shadow-teal-500/30 transition-all whitespace-nowrap shrink-0"
                        >
                            noteで購入する
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
}
