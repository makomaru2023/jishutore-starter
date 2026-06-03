import Link from 'next/link';
import { ReactNode } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SponsorAdPlaceholder, SponsorAdVariant } from '@/components/SponsorAdPlaceholder';

const CONTACT_MAILTO =
    'mailto:smart.rehabili@gmail.com?subject=' +
    encodeURIComponent('自主トレ素材庫 広告掲載について');

const ArrowIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6 21 12m0 0-7.5 6M21 12H3" />
    </svg>
);

const BackIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
);

const CheckIcon = ({ className = 'w-3 h-3' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
);

export interface SponsorDetailLayoutProps {
    planName: string;
    price: string;
    summary: string;
    placement: string[];
    features: string[];
    fitFor: string[];
    placeableItems: string[];
    notes: string[];
    /** 掲載イメージ用の SponsorAdPlaceholder variant */
    previewVariant: SponsorAdVariant;
    /** 掲載イメージのキャプション */
    previewCaption?: string;
    children?: ReactNode;
}

export function SponsorDetailLayout({
    planName,
    price,
    summary,
    placement,
    features,
    fitFor,
    placeableItems,
    notes,
    previewVariant,
    previewCaption,
    children,
}: SponsorDetailLayoutProps) {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Header />
            <main className="flex-1">
                <section className="bg-slate-900 pt-14 pb-20 relative overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 right-10 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl" />
                    </div>
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="mx-auto max-w-3xl">
                            <Link
                                href="/sponsor"
                                className="mb-6 inline-flex items-center gap-1.5 text-sm font-bold text-blue-300 transition-colors hover:text-blue-200"
                            >
                                <BackIcon className="h-3.5 w-3.5" />
                                スポンサー募集ページに戻る
                            </Link>
                            <p className="mb-3 inline-block rounded-full border border-slate-700 bg-slate-800 px-4 py-1.5 text-xs font-bold tracking-widest text-blue-300">
                                スポンサー枠 詳細
                            </p>
                            <h1 className="mb-4 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl">
                                {planName}
                            </h1>
                            <p className="mb-6 text-3xl font-black text-blue-300 sm:text-4xl">
                                {price}
                            </p>
                            <p className="text-base font-medium leading-relaxed text-slate-300 break-keep sm:text-lg">
                                {summary}
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-12 sm:py-16">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-3xl space-y-10">
                            <DetailBlock title="掲載場所">
                                <ul className="space-y-2">
                                    {placement.map((p) => (
                                        <li key={p} className="flex items-start gap-2.5 text-slate-700">
                                            <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                                            <span className="text-sm font-medium leading-relaxed sm:text-base break-keep min-w-0">{p}</span>
                                        </li>
                                    ))}
                                </ul>
                            </DetailBlock>

                            <DetailBlock title="この枠の特徴">
                                <ul className="space-y-2.5">
                                    {features.map((f) => (
                                        <li key={f} className="flex items-start gap-2.5 text-slate-700">
                                            <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                                <CheckIcon className="h-3 w-3" />
                                            </span>
                                            <span className="text-sm font-medium leading-relaxed sm:text-base break-keep min-w-0">{f}</span>
                                        </li>
                                    ))}
                                </ul>
                            </DetailBlock>

                            <DetailBlock title="掲載イメージ">
                                {previewCaption && (
                                    <p className="mb-4 text-sm font-medium leading-relaxed text-slate-500 break-keep">
                                        {previewCaption}
                                    </p>
                                )}
                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                                    <p className="mb-3 text-[11px] font-bold tracking-widest text-slate-400">
                                        掲載イメージ（プレビュー）
                                    </p>
                                    <SponsorAdPlaceholder variant={previewVariant} />
                                </div>
                            </DetailBlock>

                            <DetailBlock title="向いているサービス">
                                <div className="grid gap-2.5 sm:grid-cols-2">
                                    {fitFor.map((f) => (
                                        <div
                                            key={f}
                                            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700"
                                        >
                                            {f}
                                        </div>
                                    ))}
                                </div>
                            </DetailBlock>

                            <DetailBlock title="掲載できる内容">
                                <ul className="grid gap-2 sm:grid-cols-2">
                                    {placeableItems.map((it) => (
                                        <li key={it} className="flex items-center gap-2 text-slate-700">
                                            <span className="inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                                            <span className="text-sm font-medium leading-relaxed">{it}</span>
                                        </li>
                                    ))}
                                </ul>
                            </DetailBlock>

                            <DetailBlock title="申し込み前の注意点">
                                <ul className="space-y-2">
                                    {notes.map((n) => (
                                        <li key={n} className="flex items-start gap-2.5 text-slate-700">
                                            <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500" />
                                            <span className="text-sm leading-relaxed sm:text-base break-keep min-w-0">{n}</span>
                                        </li>
                                    ))}
                                </ul>
                            </DetailBlock>

                            {children}

                            <div className="rounded-3xl border border-blue-100 bg-white px-6 py-8 text-center shadow-sm sm:px-10 sm:py-10">
                                <h2 className="mb-3 text-lg font-black leading-snug text-slate-900 sm:text-xl">
                                    {planName}のお問い合わせ
                                </h2>
                                <p className="mx-auto mb-6 max-w-xl text-sm font-medium leading-relaxed text-slate-600 break-keep">
                                    掲載内容や開始時期について、まずはお気軽にご相談ください。お問い合わせは下記のメールから承ります。
                                </p>
                                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                                    <a
                                        href={CONTACT_MAILTO}
                                        className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-500 sm:w-auto"
                                    >
                                        掲載について問い合わせる
                                        <ArrowIcon className="h-3.5 w-3.5" />
                                    </a>
                                    <Link
                                        href="/sponsor"
                                        className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-600 transition-all hover:border-blue-200 hover:text-blue-600 sm:w-auto"
                                    >
                                        <BackIcon className="h-3.5 w-3.5" />
                                        他のプランを見る
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

function DetailBlock({ title, children }: { title: string; children: ReactNode }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-6 sm:px-7 sm:py-7">
            <h2 className="mb-4 text-base font-black text-slate-900 sm:text-lg">
                {title}
            </h2>
            {children}
        </div>
    );
}
