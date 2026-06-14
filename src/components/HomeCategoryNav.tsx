import Link from "next/link";
import type { ComponentType, SVGProps } from "react";

/**
 * トップページ用・カテゴリ別検索ナビ
 * 部位・用途別カードから素材一覧の検索結果へ直接ジャンプ
 */

type IconProps = SVGProps<SVGSVGElement>;

const baseIconProps: IconProps = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
};

const DumbbellIcon = (props: IconProps) => (
    <svg {...baseIconProps} {...props}>
        <path d="M14.4 14.4 9.6 9.6" />
        <path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z" />
        <path d="m21.5 21.5-1.4-1.4" />
        <path d="M3.9 3.9 2.5 2.5" />
        <path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z" />
    </svg>
);

const ActivityIcon = (props: IconProps) => (
    <svg {...baseIconProps} {...props}>
        <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.5.5 0 0 1-.96 0L9.68 2.18a.5.5 0 0 0-.96 0l-2.35 8.36A2 2 0 0 1 4.44 12H2" />
    </svg>
);

const PersonStandingIcon = (props: IconProps) => (
    <svg {...baseIconProps} {...props}>
        <circle cx="12" cy="5" r="1" />
        <path d="m9 20 3-6 3 6" />
        <path d="m6 8 6 2 6-2" />
        <path d="M12 10v4" />
    </svg>
);

const StretchHorizontalIcon = (props: IconProps) => (
    <svg {...baseIconProps} {...props}>
        <rect width="20" height="6" x="2" y="4" rx="2" />
        <rect width="20" height="6" x="2" y="14" rx="2" />
    </svg>
);

const FootprintsIcon = (props: IconProps) => (
    <svg {...baseIconProps} {...props}>
        <path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z" />
        <path d="M20 20v-2.35c0-2.13 1.04-3.13 1-5.65-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z" />
        <path d="M16 17h4" />
        <path d="M4 13h4" />
    </svg>
);

const ScaleIcon = (props: IconProps) => (
    <svg {...baseIconProps} {...props}>
        <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
        <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
        <path d="M7 21h10" />
        <path d="M12 3v18" />
        <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
    </svg>
);

const SmileIcon = (props: IconProps) => (
    <svg {...baseIconProps} {...props}>
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" x2="9.01" y1="9" y2="9" />
        <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
);

type Tone = "blue" | "emerald" | "cyan";

type Category = {
    title: string;
    description: string;
    query: string;
    Icon: ComponentType<IconProps>;
    tone: Tone;
};

const toneStyles: Record<Tone, { bg: string; text: string }> = {
    blue: { bg: "bg-blue-50", text: "text-blue-600" },
    emerald: { bg: "bg-emerald-50", text: "text-emerald-600" },
    cyan: { bg: "bg-cyan-50", text: "text-cyan-600" },
};

const categories: Category[] = [
    {
        title: "上肢の自主トレ素材",
        description: "肩・肘・手指の運動イラスト",
        query: "shoulder",
        Icon: DumbbellIcon,
        tone: "blue",
    },
    {
        title: "下肢の自主トレ素材",
        description: "股関節・膝・足関節の運動イラスト",
        query: "hip",
        Icon: ActivityIcon,
        tone: "emerald",
    },
    {
        title: "体幹トレーニング",
        description: "腹筋・背筋・姿勢保持の運動イラスト",
        query: "trunk",
        Icon: PersonStandingIcon,
        tone: "cyan",
    },
    {
        title: "ストレッチ素材",
        description: "柔軟性・可動域改善に使いやすいイラスト",
        query: "stretch",
        Icon: StretchHorizontalIcon,
        tone: "blue",
    },
    {
        title: "歩行訓練の自主トレ素材",
        description: "歩行能力の改善・維持に使いやすいイラスト",
        query: "walking",
        Icon: FootprintsIcon,
        tone: "emerald",
    },
    {
        title: "立ち上がり・バランス素材",
        description: "立位保持・転倒予防に使いやすいイラスト",
        query: "stand",
        Icon: ScaleIcon,
        tone: "cyan",
    },
    {
        title: "口腔・嚥下の自主トレ素材",
        description: "嚥下体操・舌・頬・口唇の運動イラスト",
        query: "oral",
        Icon: SmileIcon,
        tone: "blue",
    },
];

export function HomeCategoryNav() {
    return (
        <section className="py-16 sm:py-20 bg-white border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* セクションヘッダー */}
                <div className="text-center mb-10 sm:mb-12">
                    <p className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 font-black text-xs tracking-widest mb-4">
                        CATEGORY
                    </p>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 mb-3 tracking-tight break-keep">
                        部位・目的別の<span className="text-blue-600">自主トレイラスト</span>を探す
                    </h2>
                    <p className="text-slate-600 font-medium text-sm sm:text-base max-w-2xl mx-auto leading-relaxed break-keep">
                        上肢・下肢・歩行・バランスなど、患者さんへの説明に使いやすい自主トレイラストをカテゴリ別に探せます。
                    </p>
                </div>

                {/* カテゴリグリッド */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto">
                    {categories.map((cat) => {
                        const tone = toneStyles[cat.tone];
                        const Icon = cat.Icon;
                        return (
                            <Link
                                key={cat.query}
                                href={`/items?q=${encodeURIComponent(cat.query)}`}
                                className="group relative flex flex-col min-w-0 max-w-full p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 transition-all duration-200 hover:border-blue-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            >
                                <div className={`flex items-center justify-center w-11 h-11 rounded-xl ${tone.bg} ${tone.text} mb-4`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-2 leading-snug break-keep">
                                    {cat.title}
                                </h3>
                                <p className="text-sm text-slate-600 font-medium leading-relaxed break-keep mb-4">
                                    {cat.description}
                                </p>
                                <div className="mt-auto inline-flex items-center gap-1 text-sm font-bold text-blue-600 group-hover:text-blue-700 transition-colors">
                                    素材を見る
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                    </svg>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* キーワード検索の補足 */}
                <div className="text-center mt-10">
                    <p className="text-sm text-slate-500 font-medium break-keep">
                        探したい部位や運動名がある方は
                        <br className="sm:hidden" />
                        <Link href="/items" className="text-blue-600 font-black hover:text-blue-700 underline-offset-2 hover:underline sm:ml-1">
                            素材一覧でキーワード検索 →
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}
