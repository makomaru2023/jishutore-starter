import Link from 'next/link';

export type SponsorAdVariant = 'page' | 'detail' | 'category' | 'premium' | 'support';

interface PresetConfig {
    planLabel: string;
    price: string;
    href: string;
    detailButtonLabel: string;
    mockTitle: string;
    mockBody: string;
    showBanner: boolean;
    placementHint: string;
}

const PRESETS: Record<SponsorAdVariant, PresetConfig> = {
    page: {
        planLabel: 'ページスポンサー',
        price: '月額5,000円〜',
        href: '/sponsor/page-sponsor',
        detailButtonLabel: 'ページスポンサーの詳細を見る',
        mockTitle: '［ここにサービス名・会社名が入ります］',
        mockBody:
            '150文字程度の紹介文がこの位置に表示されます。リハビリ・介護現場の資料作成者に向けて、サービスや取り組みを掲載できます。バナー画像の掲載も可能です。',
        showBanner: true,
        placementHint: '無料素材一覧ページや素材詳細ページに、この見た目で掲載されます',
    },
    detail: {
        planLabel: 'ページスポンサー',
        price: '月額5,000円〜',
        href: '/sponsor/page-sponsor',
        detailButtonLabel: '掲載イメージを見る',
        mockTitle: '［ここにサービス名・会社名が入ります］',
        mockBody:
            '150文字程度の紹介文がこの位置に表示されます。個別素材を見ているユーザーに向けて、関連サービスを自然な形で紹介できます。',
        showBanner: true,
        placementHint: '素材詳細ページの本文・関連情報の下に、この見た目で掲載されます',
    },
    category: {
        planLabel: 'カテゴリスポンサー',
        price: '月額8,000円〜',
        href: '/sponsor/category-sponsor',
        detailButtonLabel: 'カテゴリスポンサーの詳細を見る',
        mockTitle: '［ここにサービス名・会社名が入ります］',
        mockBody:
            '150文字程度の紹介文がこの位置に表示されます。転倒予防・上肢・下肢など、特定テーマのページに集中して掲載できます。',
        showBanner: true,
        placementHint: '対象カテゴリページの下部に、この見た目で掲載されます',
    },
    premium: {
        planLabel: 'プレミアムスポンサー',
        price: '月額10,000円〜',
        href: '/sponsor/premium-sponsor',
        detailButtonLabel: 'プレミアムスポンサーの詳細を見る',
        mockTitle: '［ここにサービス名・会社名が入ります］',
        mockBody:
            '200文字程度の紹介文がこの位置に表示されます。資料作成や患者説明に関心が高いユーザーに向けて、研修・教材・採用情報などをしっかり訴求できます。noteやSNSでの紹介もご相談可能です。',
        showBanner: true,
        placementHint: '無料素材一覧ページの目立つ位置や資料セットページに、この見た目で掲載されます',
    },
    support: {
        planLabel: '応援スポンサー',
        price: '月額3,000円〜',
        href: '/sponsor/detail-sponsor',
        detailButtonLabel: '応援スポンサーの詳細を見る',
        mockTitle: '［ここにスポンサー名が入ります］',
        mockBody:
            '100文字程度の紹介文がこの位置に表示されます。サイトの活動を応援してくださるスポンサーさまをご紹介します。',
        showBanner: false,
        placementHint: 'トップページ下部や応援スポンサー欄に、この見た目で掲載されます',
    },
};

interface SponsorAdPlaceholderProps {
    variant?: SponsorAdVariant;
    /** モックを省略してミニ案内のみにする場合 */
    compact?: boolean;
}

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
 * グリッド内に挿入してそのまま掲載イメージとして使えます。
 */
export function SponsorAdPlaceholder({
    variant = 'page',
    compact = false,
}: SponsorAdPlaceholderProps) {
    const cfg = PRESETS[variant];

    if (compact) {
        return (
            <section className="w-full">
                <div className="rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/30 px-4 py-4 sm:px-5 sm:py-5">
                    <div className="mb-3 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                        <p className="text-xs font-bold text-slate-600">
                            <span className="text-blue-700">{cfg.planLabel}</span>
                            <span className="mx-1.5 text-slate-300">/</span>
                            <span>{cfg.price}</span>
                        </p>
                        <Link
                            href={cfg.href}
                            className="inline-flex w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-blue-500 bg-white px-4 py-2 text-xs font-bold text-blue-600 transition-colors hover:bg-blue-600 hover:text-white sm:w-auto"
                        >
                            {cfg.detailButtonLabel}
                            <ArrowIcon className="h-3 w-3" />
                        </Link>
                    </div>
                    <div className="mb-3 flex items-center gap-2 text-blue-700">
                        <MegaphoneIcon className="h-4 w-4" />
                        <p className="text-xs font-bold tracking-wider">
                            この位置にあなたの広告が掲載されます
                        </p>
                    </div>
                    <SampleAdCard cfg={cfg} compact />
                </div>
            </section>
        );
    }

    return (
        <section className="w-full">
            <div className="rounded-2xl border-2 border-dashed border-blue-300 bg-blue-50/40 p-4 sm:p-5">
                {/* 上段：プラン名 + 価格 + CTA */}
                <div className="mb-4 flex flex-col items-stretch gap-3 rounded-xl bg-white px-4 py-4 ring-1 ring-blue-100 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <div className="min-w-0">
                        <p className="text-[11px] font-bold tracking-widest text-blue-600">
                            SPONSOR
                        </p>
                        <p className="mt-0.5 text-sm font-black text-slate-900 sm:text-base">
                            {cfg.planLabel}募集中
                        </p>
                        <p className="mt-0.5 text-xs font-bold text-slate-500">
                            {cfg.price}
                        </p>
                    </div>
                    <Link
                        href={cfg.href}
                        className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-500 sm:w-auto"
                    >
                        {cfg.detailButtonLabel}
                        <ArrowIcon className="h-3.5 w-3.5" />
                    </Link>
                </div>

                {/* 下段：掲載イメージ */}
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-blue-700">
                        <MegaphoneIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                        <p className="text-xs font-black tracking-wider sm:text-sm">
                            この位置にあなたの広告が掲載されます
                        </p>
                    </div>
                    <span className="rounded-full bg-white px-2.5 py-0.5 text-[10px] font-bold tracking-widest text-blue-600 ring-1 ring-blue-200">
                        SAMPLE
                    </span>
                </div>

                <SampleAdCard cfg={cfg} />

                <p className="mt-3 text-[11px] leading-relaxed text-slate-500 sm:text-xs">
                    ↑ {cfg.placementHint}（上はサンプル表示です）
                </p>
            </div>
        </section>
    );
}

function SampleAdCard({ cfg, compact = false }: { cfg: PresetConfig; compact?: boolean }) {
    return (
        <div
            className="rounded-xl border border-slate-200 bg-white px-4 py-4 sm:px-5 sm:py-5"
            aria-hidden
        >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
                {/* ロゴプレースホルダー */}
                <div className="flex-shrink-0">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100 text-slate-400 ring-1 ring-slate-200 sm:h-16 sm:w-16">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 sm:h-7 sm:w-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                    </div>
                    <p className="mt-1 text-center text-[10px] font-bold text-slate-400">
                        LOGO
                    </p>
                </div>

                {/* 紹介文プレースホルダー */}
                <div className="min-w-0 flex-1">
                    <p className="mb-2 text-sm font-black leading-snug text-slate-400 sm:text-base">
                        {cfg.mockTitle}
                    </p>
                    <p className={`text-xs leading-relaxed text-slate-400 sm:text-sm ${compact ? 'line-clamp-2' : ''} break-keep`}>
                        {cfg.mockBody}
                    </p>
                    <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-slate-400">
                        <span className="underline decoration-dotted underline-offset-2">公式サイトを見る</span>
                        <ArrowIcon className="h-3 w-3" />
                    </p>
                </div>

                {/* バナー画像プレースホルダー（プランによる） */}
                {cfg.showBanner && !compact && (
                    <div className="flex-shrink-0 sm:w-40">
                        <div className="flex aspect-[4/3] items-center justify-center rounded-lg bg-slate-100 text-slate-400 ring-1 ring-slate-200">
                            <div className="text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mx-auto h-5 w-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>
                                <p className="mt-1 text-[10px] font-bold">バナー画像</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
