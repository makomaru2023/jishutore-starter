import Link from 'next/link';

export type SponsorAdVariant = 'page' | 'detail' | 'category' | 'premium' | 'support';

interface PresetConfig {
    title: string;
    description: string;
    price: string;
    href: string;
    buttonLabel: string;
}

const PRESETS: Record<SponsorAdVariant, PresetConfig> = {
    page: {
        title: 'ページスポンサー募集中',
        description:
            '無料素材を探しているリハビリ・介護職に向けて、サービスや取り組みを掲載できます。',
        price: '月額5,000円〜',
        href: '/sponsor/page-sponsor',
        buttonLabel: 'ページスポンサーの詳細を見る',
    },
    detail: {
        title: '素材詳細ページスポンサー募集中',
        description:
            '個別素材を見ているユーザーに向けて、リハビリ・介護関連サービスを自然に紹介できます。',
        price: '月額5,000円〜',
        href: '/sponsor/page-sponsor',
        buttonLabel: '掲載イメージを見る',
    },
    category: {
        title: 'カテゴリスポンサー募集中',
        description:
            '特定テーマに関連するページに集中して掲載できます。関心の近いユーザーに届けやすい枠です。',
        price: '月額8,000円〜',
        href: '/sponsor/category-sponsor',
        buttonLabel: 'カテゴリスポンサーの詳細を見る',
    },
    premium: {
        title: 'プレミアムスポンサー募集中',
        description:
            '資料作成や患者説明に関心が高いユーザーへ向けて、サービスや研修情報を掲載できます。',
        price: '月額10,000円〜',
        href: '/sponsor/premium-sponsor',
        buttonLabel: 'プレミアムスポンサーの詳細を見る',
    },
    support: {
        title: '応援スポンサー募集中',
        description:
            '自主トレ素材庫の無料素材配布を応援してくださるスポンサーさまを募集しています。',
        price: '月額3,000円〜',
        href: '/sponsor/detail-sponsor',
        buttonLabel: '応援スポンサーの詳細を見る',
    },
};

interface SponsorAdPlaceholderProps {
    variant?: SponsorAdVariant;
    title?: string;
    description?: string;
    price?: string;
    href?: string;
    buttonLabel?: string;
    compact?: boolean;
}

const ArrowIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6 21 12m0 0-7.5 6M21 12H3" />
    </svg>
);

export function SponsorAdPlaceholder({
    variant = 'page',
    title,
    description,
    price,
    href,
    buttonLabel,
    compact = false,
}: SponsorAdPlaceholderProps) {
    const preset = PRESETS[variant];
    const t = title ?? preset.title;
    const d = description ?? preset.description;
    const p = price ?? preset.price;
    const h = href ?? preset.href;
    const b = buttonLabel ?? preset.buttonLabel;

    if (compact) {
        return (
            <section className="w-full">
                <div className="rounded-2xl border border-dashed border-blue-200 bg-blue-50/50 px-5 py-4 sm:px-6 sm:py-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
                        <div className="min-w-0 flex-1">
                            <p className="mb-1 text-[11px] font-bold tracking-widest text-blue-600">
                                SPONSOR
                            </p>
                            <p className="text-sm font-black leading-snug text-slate-900">
                                {t}
                            </p>
                            <p className="mt-1 text-xs leading-relaxed text-slate-600 break-keep">
                                {d}
                            </p>
                        </div>
                        <Link
                            href={h}
                            className="inline-flex w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-blue-200 bg-white px-4 py-2 text-xs font-bold text-blue-600 transition-colors hover:bg-blue-600 hover:text-white sm:w-auto"
                        >
                            {b}
                            <ArrowIcon className="h-3 w-3" />
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full">
            <div className="rounded-2xl border border-dashed border-blue-200 bg-blue-50/40 px-5 py-6 sm:px-7 sm:py-7">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-7">
                    <div className="min-w-0 flex-1">
                        <div className="mb-2 flex items-center gap-2">
                            <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-[11px] font-bold tracking-wider text-blue-700">
                                SPONSOR
                            </span>
                            <span className="text-[11px] font-bold text-slate-500">
                                {p}
                            </span>
                        </div>
                        <h3 className="mb-2 text-base font-black leading-snug text-slate-900 sm:text-lg">
                            {t}
                        </h3>
                        <p className="text-sm font-medium leading-relaxed text-slate-600 break-keep">
                            {d}
                        </p>
                    </div>
                    <div className="md:flex-shrink-0">
                        <Link
                            href={h}
                            className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full border border-blue-500 bg-white px-6 py-3 text-sm font-bold text-blue-600 transition-all hover:bg-blue-600 hover:text-white sm:w-auto"
                        >
                            {b}
                            <ArrowIcon className="h-3.5 w-3.5" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
