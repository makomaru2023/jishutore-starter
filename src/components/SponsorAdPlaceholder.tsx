import Link from 'next/link';

/**
 * バリアント設計：
 * - top:     /items の上部や、メインの誘導枠で使う「広告主に届きやすい」横長バナー
 * - inline:  素材グリッド内に col-span-full で挿入する「この枠に広告を掲載できます」型
 * - compact: トップページ下部・素材詳細下部・/products 下部などの控えめ枠
 *
 * すべて遷移先は /sponsor/。広告主が判断しやすい文言で統一する。
 */
export type SponsorAdVariant = 'top' | 'inline' | 'compact';

interface PresetConfig {
    label: string;
    title: string;
    description: string;
    buttonLabel: string;
}

const PRESETS: Record<SponsorAdVariant, PresetConfig> = {
    top: {
        label: 'スポンサー枠',
        title: 'リハビリ・介護職向けサービスを掲載できます',
        description:
            '自主トレ素材を探す医療・介護職へ、研修・採用・教材・福祉用具などを月額3,000円から紹介できます。',
        buttonLabel: '広告掲載について見る',
    },
    inline: {
        label: 'スポンサー枠',
        title: 'この枠に広告を掲載できます',
        description:
            '自主トレ素材を探しているリハビリ職・介護職へ、サービスや研修情報を届けませんか？',
        buttonLabel: 'スポンサー掲載を見る',
    },
    compact: {
        label: 'スポンサー枠',
        title: 'リハビリ・介護現場へ広告掲載できます',
        description:
            '370点以上の無料素材を探すリハビリ職・介護職に、サービスや取り組みを紹介できます。',
        buttonLabel: '掲載プランを見る',
    },
};

interface SponsorAdPlaceholderProps {
    variant?: SponsorAdVariant;
}

const SPONSOR_HREF = '/sponsor';

const ArrowIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6 21 12m0 0-7.5 6M21 12H3" />
    </svg>
);

const MegaphoneIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46" />
    </svg>
);

/**
 * 「ここに広告が掲載されます」が一目で伝わる、サンプル広告モックアップ付きの募集枠。
 * variant=inline のときは "この枠に広告を掲載できます" の文脈で実物大モックを表示。
 * top/compact は実装はバナー型でモックは省略する。
 */
export function SponsorAdPlaceholder({ variant = 'inline' }: SponsorAdPlaceholderProps) {
    const cfg = PRESETS[variant];

    if (variant === 'compact') {
        return (
            <section className="w-full">
                <div className="rounded-2xl border border-blue-100 bg-blue-50/40 px-5 py-5 sm:px-6 sm:py-6">
                    <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
                        <div className="min-w-0 flex-1">
                            <p className="mb-1 flex items-center gap-1.5 text-[11px] font-bold tracking-widest text-blue-600">
                                <MegaphoneIcon className="h-3.5 w-3.5" />
                                {cfg.label}
                            </p>
                            <p className="text-sm font-black leading-snug text-slate-900 sm:text-base break-keep">
                                {cfg.title}
                            </p>
                            <p className="mt-1 text-xs leading-relaxed text-slate-600 break-keep">
                                {cfg.description}
                            </p>
                        </div>
                        <Link
                            href={SPONSOR_HREF}
                            className="inline-flex w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-blue-500 bg-white px-4 py-2.5 text-xs font-bold text-blue-600 transition-colors hover:bg-blue-600 hover:text-white sm:w-auto"
                        >
                            {cfg.buttonLabel}
                            <ArrowIcon className="h-3 w-3 flex-shrink-0" />
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    if (variant === 'top') {
        return (
            <section className="w-full">
                <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50/70 via-white to-white px-5 py-6 shadow-sm sm:px-8 sm:py-8">
                    <div className="flex flex-col items-stretch gap-5 md:flex-row md:items-center md:gap-7">
                        <div className="min-w-0 flex-1">
                            <p className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-[11px] font-bold tracking-widest text-blue-700">
                                <MegaphoneIcon className="h-3.5 w-3.5" />
                                {cfg.label}
                            </p>
                            <h2 className="mb-2 text-base font-black leading-snug text-slate-900 sm:text-lg md:text-xl break-keep">
                                {cfg.title}
                            </h2>
                            <p className="text-sm font-medium leading-relaxed text-slate-600 break-keep">
                                {cfg.description}
                            </p>
                        </div>
                        <div className="md:flex-shrink-0">
                            <Link
                                href={SPONSOR_HREF}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-center text-sm font-bold text-white shadow-sm shadow-blue-600/20 transition-all hover:bg-blue-500 hover:shadow-md sm:w-auto"
                            >
                                {cfg.buttonLabel}
                                <ArrowIcon className="h-3.5 w-3.5 flex-shrink-0" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // variant === 'inline' — グリッド内に挿入される実物大モック型
    return (
        <section className="w-full">
            <div className="rounded-2xl border-2 border-dashed border-blue-300 bg-blue-50/40 p-4 sm:p-5">
                {/* 上段：プラン情報 + CTA */}
                <div className="mb-4 flex flex-col items-stretch gap-3 rounded-xl bg-white px-4 py-4 ring-1 ring-blue-100 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <div className="min-w-0">
                        <p className="text-[11px] font-bold tracking-widest text-blue-600">
                            {cfg.label}
                        </p>
                        <p className="mt-0.5 text-sm font-black text-slate-900 sm:text-base break-keep">
                            {cfg.title}
                        </p>
                        <p className="mt-0.5 text-xs font-medium text-slate-500 break-keep">
                            月額3,000円〜
                        </p>
                    </div>
                    <Link
                        href={SPONSOR_HREF}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-center text-sm font-bold text-white transition-colors hover:bg-blue-500 sm:w-auto sm:whitespace-nowrap"
                    >
                        {cfg.buttonLabel}
                        <ArrowIcon className="h-3.5 w-3.5 flex-shrink-0" />
                    </Link>
                </div>

                {/* 下段：掲載イメージ */}
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-blue-700">
                        <MegaphoneIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                        <p className="text-xs font-black tracking-wider sm:text-sm break-keep">
                            この位置に広告を掲載できます
                        </p>
                    </div>
                    <span className="rounded-full bg-white px-2.5 py-0.5 text-[10px] font-bold tracking-widest text-blue-600 ring-1 ring-blue-200">
                        SAMPLE
                    </span>
                </div>

                <SampleAdCard description={cfg.description} />

                <p className="mt-3 text-[11px] leading-relaxed text-slate-500 sm:text-xs">
                    ↑ 素材一覧や素材詳細ページに、この見た目で掲載されます（上はサンプル表示です）
                </p>
            </div>
        </section>
    );
}

function SampleAdCard({ description }: { description: string }) {
    return (
        <div className="max-w-full rounded-xl border border-slate-200 bg-white px-4 py-4 sm:px-5 sm:py-5" aria-hidden>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
                {/* ロゴプレースホルダー */}
                <div className="flex-shrink-0">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100 text-slate-400 ring-1 ring-slate-200 sm:h-16 sm:w-16">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 sm:h-7 sm:w-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                    </div>
                    <p className="mt-1 text-center text-[10px] font-bold text-slate-400">LOGO</p>
                </div>

                {/* 紹介文プレースホルダー */}
                <div className="min-w-0 flex-1">
                    <p className="mb-2 text-sm font-black leading-snug text-slate-400 sm:text-base break-keep break-words">
                        ［ここにサービス名・会社名が入ります］
                    </p>
                    <p className="text-xs leading-relaxed text-slate-400 sm:text-sm break-keep break-words">
                        ［ここに紹介文が入ります］{description}
                    </p>
                    <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-slate-400">
                        <span className="underline decoration-dotted underline-offset-2">公式サイトを見る</span>
                        <ArrowIcon className="h-3 w-3" />
                    </p>
                </div>

                {/* バナー画像プレースホルダー（PCのみ） */}
                <div className="hidden flex-shrink-0 sm:block sm:w-40">
                    <div className="flex aspect-[4/3] items-center justify-center rounded-lg bg-slate-100 text-slate-400 ring-1 ring-slate-200">
                        <div className="text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mx-auto h-5 w-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                            <p className="mt-1 text-[10px] font-bold">バナー画像</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
