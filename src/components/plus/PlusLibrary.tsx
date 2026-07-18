"use client";

import Image from "next/image";
import { useCallback, useMemo, useRef, useState } from "react";
import {
    PLUS_ITEMS,
    PLUS_CATEGORIES,
    CATEGORY_META,
    MAX_SELECTION,
    type PlusItem,
} from "@/data/plus-items";

/* ───────── アイコン（線画・絵文字不使用） ───────── */
const ic = "h-5 w-5";
const SearchIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={ic} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.3-4.3M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z" />
    </svg>
);
const FilterIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h18M6 12h12M10 19h4" />
    </svg>
);
const CheckIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className={className} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
    </svg>
);
const CloseIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className={className} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
);
const DownloadIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className={ic} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </svg>
);
const TrashIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0-.6 12a2 2 0 0 1-2 1.9H8.6a2 2 0 0 1-2-1.9L6 7" />
    </svg>
);
const GuideIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 17h.01M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2.5-3 4M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
    </svg>
);
const InfoIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 flex-shrink-0" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 11v5m0-8h.01M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
    </svg>
);
const Logo = () => (
    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 4h7l5 5v11a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 4v5h5M9 13h6M9 16.5h4" />
        </svg>
    </span>
);

const EyeIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 12S6 5 12 5s9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z" />
        <circle cx="12" cy="12" r="2.5" />
    </svg>
);

const GUIDE_STEPS = [
    "必要な自主トレ資料を探す（カテゴリ・キーワードで絞り込み）",
    "患者さん・利用者さんに合わせて、最大10件まで選ぶ",
    "「PowerPointでダウンロード」で1つのファイルにまとめて受け取る",
    "PowerPointを開いて、回数や運動のポイントを編集する",
    "印刷して、患者さん・利用者さんに配布する",
];

const ALL = "すべて" as const;

export function PlusLibrary() {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [activeCategory, setActiveCategory] = useState<string>(ALL);
    const [query, setQuery] = useState("");
    const [showFilter, setShowFilter] = useState(false);
    const [showSelectedOnly, setShowSelectedOnly] = useState(false);
    const [guideOpen, setGuideOpen] = useState(false);
    const [sheetOpen, setSheetOpen] = useState(false);
    const [previewItem, setPreviewItem] = useState<PlusItem | null>(null);
    const [zipping, setZipping] = useState(false);
    const [capFlash, setCapFlash] = useState(false);
    const [dlError, setDlError] = useState(false);
    const capTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const count = selectedIds.length;
    const remaining = MAX_SELECTION - count;
    const atCap = count >= MAX_SELECTION;

    const byId = useMemo(() => new Map(PLUS_ITEMS.map((i) => [i.id, i])), []);
    const selectedItems = useMemo(
        () => selectedIds.map((id) => byId.get(id)).filter(Boolean) as PlusItem[],
        [selectedIds, byId]
    );

    const flashCap = useCallback(() => {
        setCapFlash(true);
        if (capTimer.current) clearTimeout(capTimer.current);
        capTimer.current = setTimeout(() => setCapFlash(false), 2400);
    }, []);

    const toggle = useCallback(
        (id: string) => {
            setSelectedIds((prev) => {
                if (prev.includes(id)) return prev.filter((x) => x !== id);
                if (prev.length >= MAX_SELECTION) {
                    flashCap();
                    return prev;
                }
                return [...prev, id];
            });
        },
        [flashCap]
    );

    const clearAll = () => setSelectedIds([]);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return PLUS_ITEMS.filter((it) => {
            if (activeCategory !== ALL && it.category !== activeCategory) return false;
            if (showSelectedOnly && !selectedIds.includes(it.id)) return false;
            if (q) {
                const hay = `${it.title} ${it.category}`.toLowerCase();
                if (!hay.includes(q)) return false;
            }
            return true;
        });
    }, [activeCategory, query, showSelectedOnly, selectedIds]);

    const handleDownload = useCallback(async () => {
        if (selectedItems.length === 0 || zipping) return;
        setZipping(true);
        setDlError(false);
        try {
            const res = await fetch("/api/plus/download/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ids: selectedItems.map((it) => it.id) }),
            });
            if (res.status === 401 || res.status === 403) {
                // 未ログイン / 契約切れ → ログイン画面へ
                window.location.href = "/plus/login";
                return;
            }
            if (!res.ok) throw new Error(`status ${res.status}`);
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "自主トレ素材庫Plus_資料.pptx";
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        } catch {
            setDlError(true);
            setTimeout(() => setDlError(false), 3500);
        } finally {
            setZipping(false);
        }
    }, [selectedItems, zipping]);

    // Stripe カスタマーポータル（プラン管理・解約）へ遷移する。
    const [portalLoading, setPortalLoading] = useState(false);
    const handlePortal = useCallback(async () => {
        if (portalLoading) return;
        setPortalLoading(true);
        try {
            const res = await fetch("/api/plus/portal/", { method: "POST" });
            if (res.status === 401) {
                window.location.href = "/plus/login";
                return;
            }
            const data = await res.json().catch(() => ({}));
            if (data?.url) {
                window.location.href = data.url;
                return;
            }
        } catch {
            // 失敗時は何もしない（ボタンを戻す）
        } finally {
            setPortalLoading(false);
        }
    }, [portalLoading]);

    const chips = [ALL, ...PLUS_CATEGORIES];

    /* ───────── 右パネルの中身（PCサイドバー / モバイルシート共通） ───────── */
    const panelInner = (
        <div className="flex h-full flex-col">
            <div className="flex items-baseline justify-between">
                <p className="text-sm font-bold text-slate-500">選択中</p>
                <p className="font-black text-slate-900">
                    <span className="text-2xl text-blue-600">{count}</span>
                    <span className="text-base text-slate-400"> / {MAX_SELECTION}</span>
                </p>
            </div>
            <p className={`mt-1 text-xs font-bold ${atCap ? "text-blue-700" : "text-slate-500"}`}>
                {atCap ? "上限に達しました" : `あと${remaining}件選択できます`}
            </p>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                    className="h-full rounded-full bg-blue-600 transition-all duration-300"
                    style={{ width: `${(count / MAX_SELECTION) * 100}%` }}
                />
            </div>
            <p className="mt-2.5 text-[11px] leading-relaxed text-slate-400 jp-text">
                ※ 1回のダウンロードで最大{MAX_SELECTION}件まで選択できます
            </p>

            <div className="mt-4 flex items-start gap-2 rounded-xl border border-blue-100 bg-blue-50/70 p-3">
                <span className="mt-0.5 text-blue-500">
                    <InfoIcon />
                </span>
                <div>
                    <p className="text-xs font-black text-blue-800">必要な資料だけを選びましょう</p>
                    <p className="mt-1 text-[11px] leading-relaxed text-blue-900/70 jp-text">
                        配布資料が多すぎると、利用者さんの取り組みが続きにくくなることがあります。目的や状態に合わせて、必要な資料を厳選してお使いください。
                    </p>
                </div>
            </div>

            <div className="mt-4 space-y-2">
                <button
                    type="button"
                    onClick={handleDownload}
                    disabled={count === 0 || zipping}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-black text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
                >
                    <DownloadIcon />
                    {zipping ? "資料を作成中…" : "PowerPointでダウンロード"}
                </button>
                <button
                    type="button"
                    onClick={clearAll}
                    disabled={count === 0}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-300"
                >
                    <TrashIcon />
                    選択をクリア
                </button>
            </div>

            <div className="mt-5 flex min-h-0 flex-1 flex-col">
                <p className="mb-2 text-xs font-black tracking-wide text-slate-500">
                    選択中の資料一覧（{count}件）
                </p>
                {count === 0 ? (
                    <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-slate-200 px-4 py-8 text-center">
                        <p className="text-xs leading-relaxed text-slate-400 jp-text">
                            左の一覧から資料を選ぶと、ここに表示されます。
                        </p>
                    </div>
                ) : (
                    <ul className="space-y-1.5 overflow-y-auto pr-0.5 lg:max-h-[34vh]">
                        {selectedItems.map((it) => (
                            <li
                                key={it.id}
                                className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50/70 py-1.5 pl-2.5 pr-1.5"
                            >
                                <span
                                    className="h-2 w-2 flex-shrink-0 rounded-full"
                                    style={{ backgroundColor: CATEGORY_META[it.category].accent }}
                                />
                                <span className="min-w-0 flex-1 truncate text-xs font-bold text-slate-700">
                                    {it.title}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => toggle(it.id)}
                                    aria-label={`${it.title} の選択を解除`}
                                    className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-200 hover:text-slate-600"
                                >
                                    <CloseIcon className="h-3.5 w-3.5" />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );

    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            {/* ───────── ヘッダー ───────── */}
            <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
                <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
                    <Logo />
                    <div className="min-w-0">
                        <p className="text-base font-black leading-tight text-slate-900 sm:text-lg">
                            自主トレ素材庫<span className="text-blue-600">Plus</span>
                        </p>
                        <p className="hidden truncate text-xs text-slate-500 sm:block">
                            完成済みPowerPoint資料を選んで、1つにまとめてダウンロード
                        </p>
                    </div>
                    <div className="ml-auto flex flex-shrink-0 items-center gap-2">
                        <a
                            href="/plus/fee-check/"
                            className="hidden items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 transition hover:border-blue-300 hover:bg-blue-100 sm:flex"
                        >
                            報酬チェック
                        </a>
                        <button
                            type="button"
                            onClick={() => setGuideOpen(true)}
                            className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 transition hover:border-blue-300 hover:text-blue-700"
                        >
                            <GuideIcon />
                            <span className="hidden sm:inline">使い方ガイド</span>
                            <span className="sm:hidden">ガイド</span>
                        </button>
                        <button
                            type="button"
                            onClick={handlePortal}
                            disabled={portalLoading}
                            className="hidden items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 transition hover:border-blue-300 hover:text-blue-700 disabled:opacity-60 sm:flex"
                        >
                            {portalLoading ? "…" : "プラン管理"}
                        </button>
                        <form action="/api/plus/auth/logout/" method="post">
                            <button
                                type="submit"
                                className="flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                            >
                                ログアウト
                            </button>
                        </form>
                    </div>
                </div>
                <nav className="border-t border-slate-100 px-4 py-2 sm:hidden" aria-label="Plus内メニュー">
                    <div className="mx-auto flex max-w-7xl gap-2">
                        <a
                            href="/plus/library/"
                            aria-current="page"
                            className="flex flex-1 items-center justify-center rounded-full bg-blue-600 px-3 py-2 text-xs font-black text-white"
                        >
                            資料庫
                        </a>
                        <a
                            href="/plus/fee-check/"
                            className="flex flex-1 items-center justify-center rounded-full border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-black text-blue-700 transition hover:border-blue-300 hover:bg-blue-100"
                        >
                            報酬チェック
                        </a>
                    </div>
                </nav>
            </header>

            <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-28 pt-6 sm:px-6 lg:pb-10">
                <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-6">
                    {/* ───────── 左：フィルタ＋カード一覧 ───────── */}
                    <div className="min-w-0">
                        {/* カテゴリチップ＋検索 */}
                        <div className="mb-4 space-y-3">
                            <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
                                {chips.map((c) => {
                                    const active = activeCategory === c;
                                    return (
                                        <button
                                            key={c}
                                            type="button"
                                            onClick={() => setActiveCategory(c)}
                                            className={`flex-shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition ${
                                                active
                                                    ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                                                    : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-700"
                                            }`}
                                        >
                                            {c}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="flex gap-2">
                                <div className="relative min-w-0 flex-1">
                                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                        <SearchIcon />
                                    </span>
                                    <input
                                        type="text"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="キーワードで検索"
                                        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>
                                <div className="relative flex-shrink-0">
                                    <button
                                        type="button"
                                        onClick={() => setShowFilter((v) => !v)}
                                        aria-expanded={showFilter}
                                        className={`flex h-full items-center gap-1.5 rounded-xl border px-3.5 text-sm font-bold transition ${
                                            showSelectedOnly
                                                ? "border-blue-300 bg-blue-50 text-blue-700"
                                                : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-700"
                                        }`}
                                    >
                                        <FilterIcon />
                                        <span className="hidden sm:inline">絞り込み</span>
                                    </button>
                                    {showFilter && (
                                        <>
                                            <button
                                                type="button"
                                                aria-label="絞り込みを閉じる"
                                                onClick={() => setShowFilter(false)}
                                                className="fixed inset-0 z-30 cursor-default"
                                            />
                                            <div className="absolute right-0 z-40 mt-2 w-60 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
                                                <p className="px-1 pb-2 text-xs font-black text-slate-500">カテゴリ</p>
                                                <div className="space-y-0.5">
                                                    {chips.map((c) => (
                                                        <button
                                                            key={c}
                                                            type="button"
                                                            onClick={() => {
                                                                setActiveCategory(c);
                                                                setShowFilter(false);
                                                            }}
                                                            className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-sm font-bold transition ${
                                                                activeCategory === c
                                                                    ? "bg-blue-50 text-blue-700"
                                                                    : "text-slate-600 hover:bg-slate-50"
                                                            }`}
                                                        >
                                                            {c}
                                                            {activeCategory === c && <CheckIcon className="h-4 w-4" />}
                                                        </button>
                                                    ))}
                                                </div>
                                                <label className="mt-2 flex cursor-pointer items-center gap-2 border-t border-slate-100 px-2.5 pt-3 text-sm font-bold text-slate-600">
                                                    <input
                                                        type="checkbox"
                                                        checked={showSelectedOnly}
                                                        onChange={(e) => setShowSelectedOnly(e.target.checked)}
                                                        className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-400"
                                                    />
                                                    選択中の資料のみ表示
                                                </label>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* 件数表示 */}
                        <div className="mb-3 flex items-center justify-between">
                            <p className="text-sm font-bold text-slate-500">
                                全{filtered.length}件
                                {(activeCategory !== ALL || query || showSelectedOnly) && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setActiveCategory(ALL);
                                            setQuery("");
                                            setShowSelectedOnly(false);
                                        }}
                                        className="ml-3 text-xs font-bold text-blue-600 hover:underline"
                                    >
                                        絞り込みを解除
                                    </button>
                                )}
                            </p>
                        </div>

                        {/* カードグリッド */}
                        {filtered.length === 0 ? (
                            <div className="flex items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                                <p className="text-sm font-bold text-slate-400 jp-text">
                                    条件に合う資料が見つかりませんでした。
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                {filtered.map((it) => {
                                    const selected = selectedIds.includes(it.id);
                                    const meta = CATEGORY_META[it.category];
                                    const locked = atCap && !selected;
                                    return (
                                        <article
                                            key={it.id}
                                            className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-white text-left transition-all ${
                                                selected
                                                    ? "border-blue-500 shadow-md ring-1 ring-blue-500"
                                                    : "border-slate-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                                            } ${locked ? "opacity-60" : ""}`}
                                        >
                                            <button
                                                type="button"
                                                onClick={() => toggle(it.id)}
                                                aria-pressed={selected}
                                                aria-label={`${it.title}を${selected ? "選択解除" : "選択"}`}
                                                className="flex flex-1 cursor-pointer flex-col text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-400"
                                            >
                                                <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-slate-100 bg-white">
                                                    <Image
                                                        src={`/plus/previews/${it.id}.webp`}
                                                        alt={`${it.title} の完成スライド`}
                                                        fill
                                                        sizes="(min-width: 1280px) 300px, (min-width: 1024px) 32vw, (min-width: 640px) 50vw, 100vw"
                                                        className="object-contain"
                                                    />
                                                </div>
                                                <div className="flex flex-1 flex-col p-3.5">
                                                    <div className="flex items-start gap-2">
                                                        <h3 className="line-clamp-2 min-w-0 flex-1 text-sm font-bold leading-snug text-slate-900 jp-heading">
                                                            {it.title}
                                                        </h3>
                                                        <span
                                                            aria-hidden="true"
                                                            className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border-2 transition ${
                                                                selected
                                                                    ? "border-blue-600 bg-blue-600 text-white"
                                                                    : "border-slate-300 bg-white text-transparent"
                                                            }`}
                                                        >
                                                            <CheckIcon className="h-4 w-4" />
                                                        </span>
                                                    </div>
                                                    <div className="mt-auto pr-28 pt-2">
                                                        <span
                                                            className="inline-block w-fit rounded-full px-2 py-0.5 text-[11px] font-bold"
                                                            style={{ backgroundColor: meta.chipBg, color: meta.chipText }}
                                                        >
                                                            {it.category}
                                                        </span>
                                                    </div>
                                                </div>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setPreviewItem(it)}
                                                aria-label={`${it.title} の完成スライドを拡大表示`}
                                                className="absolute bottom-3 right-3 z-10 flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[11px] font-bold text-slate-500 transition hover:bg-slate-100 hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                                            >
                                                <EyeIcon />
                                                拡大して見る
                                            </button>
                                        </article>
                                    );
                                })}
                            </div>
                        )}

                        <p className="mt-8 flex items-center gap-2 text-xs text-slate-400 jp-text">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 flex-shrink-0" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            医療・介護の現場で安心してご利用いただける高品質な資料を提供しています。
                        </p>
                    </div>

                    {/* ───────── 右：固定パネル（PC） ───────── */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-[84px] rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            {panelInner}
                        </div>
                    </aside>
                </div>
            </main>

            {/* ───────── モバイル固定ボトムバー ───────── */}
            <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
                <div className="mx-auto flex max-w-7xl items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setSheetOpen(true)}
                        className="flex flex-shrink-0 flex-col items-start"
                    >
                        <span className="text-[11px] font-bold text-slate-500">選択中</span>
                        <span className="font-black leading-none text-slate-900">
                            <span className="text-lg text-blue-600">{count}</span>
                            <span className="text-sm text-slate-400"> / {MAX_SELECTION}</span>
                        </span>
                    </button>
                    <div className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-slate-100">
                        <div
                            className="h-full rounded-full bg-blue-600 transition-all"
                            style={{ width: `${(count / MAX_SELECTION) * 100}%` }}
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleDownload}
                        disabled={count === 0 || zipping}
                        className="flex flex-shrink-0 items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-black text-white transition disabled:bg-slate-200 disabled:text-slate-400"
                    >
                        <DownloadIcon />
                        {zipping ? "作成中…" : "ダウンロード"}
                    </button>
                </div>
            </div>

            {/* ───────── モバイル：選択シート ───────── */}
            {sheetOpen && (
                <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true" aria-label="選択中の資料">
                    <button
                        type="button"
                        aria-label="閉じる"
                        onClick={() => setSheetOpen(false)}
                        className="absolute inset-0 cursor-default bg-slate-950/40"
                    />
                    <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-5 shadow-2xl">
                        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-slate-200" />
                        <div className="flex items-center justify-between pb-2">
                            <p className="text-sm font-black text-slate-700">資料の選択状況</p>
                            <button
                                type="button"
                                onClick={() => setSheetOpen(false)}
                                aria-label="閉じる"
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500"
                            >
                                <CloseIcon />
                            </button>
                        </div>
                        {panelInner}
                    </div>
                </div>
            )}

            {/* ───────── 中身プレビュー モーダル ───────── */}
            {previewItem && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${previewItem.title} の中身`}
                    onClick={() => setPreviewItem(null)}
                    className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
                    >
                        <div className="sticky top-0 flex items-center justify-between gap-3 border-b border-slate-100 bg-white/95 px-5 py-3 backdrop-blur">
                            <h2 className="min-w-0 truncate text-base font-black text-slate-900">{previewItem.title}</h2>
                            <button
                                type="button"
                                onClick={() => setPreviewItem(null)}
                                aria-label="閉じる"
                                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200"
                            >
                                <CloseIcon />
                            </button>
                        </div>

                        <div className="px-5 py-4">
                            <div className="relative mb-3 aspect-[16/9] w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                                <Image
                                    src={`/plus/previews/${previewItem.id}.webp`}
                                    alt={`${previewItem.title} の完成スライド`}
                                    fill
                                    sizes="(min-width: 640px) 512px, 100vw"
                                    className="object-contain"
                                />
                            </div>

                            <p className="rounded-lg bg-slate-50 px-3 py-2 text-[11px] leading-relaxed text-slate-500 jp-text">
                                ※ これがダウンロードされる完成スライドです。PowerPointで回数や運動のポイントを編集して印刷できます。
                            </p>

                            <div className="mt-4 flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => toggle(previewItem.id)}
                                    disabled={!selectedIds.includes(previewItem.id) && atCap}
                                    className={`flex-1 rounded-xl px-4 py-3 text-sm font-black transition disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 ${
                                        selectedIds.includes(previewItem.id)
                                            ? "border border-blue-200 bg-blue-50 text-blue-700"
                                            : "bg-blue-600 text-white hover:bg-blue-700"
                                    }`}
                                >
                                    {selectedIds.includes(previewItem.id) ? "選択中（クリックで解除）" : "この資料を選ぶ"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPreviewItem(null)}
                                    className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                                >
                                    閉じる
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ───────── 使い方ガイド モーダル ───────── */}
            {guideOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-label="使い方ガイド"
                    onClick={() => setGuideOpen(false)}
                >
                    <div
                        className="w-full max-w-md rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mb-4 flex items-center justify-between">
                            <p className="text-base font-black text-slate-900">使い方ガイド</p>
                            <button
                                type="button"
                                onClick={() => setGuideOpen(false)}
                                aria-label="閉じる"
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500"
                            >
                                <CloseIcon />
                            </button>
                        </div>
                        <ol className="space-y-3">
                            {GUIDE_STEPS.map((step, i) => (
                                <li key={i} className="flex gap-3">
                                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-black text-white">
                                        {i + 1}
                                    </span>
                                    <p className="pt-0.5 text-sm leading-relaxed text-slate-700 jp-text">{step}</p>
                                </li>
                            ))}
                        </ol>
                        <button
                            type="button"
                            onClick={() => setGuideOpen(false)}
                            className="mt-6 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-black text-white transition hover:bg-slate-800"
                        >
                            とじる
                        </button>
                    </div>
                </div>
            )}

            {/* ───────── 上限トースト ───────── */}
            {capFlash && (
                <div className="fixed inset-x-0 bottom-24 z-50 flex justify-center px-4 lg:bottom-8">
                    <p className="rounded-full bg-slate-900 px-4 py-2.5 text-xs font-bold text-white shadow-lg">
                        1回の選択は{MAX_SELECTION}件までです。必要な資料を厳選してお使いください。
                    </p>
                </div>
            )}

            {/* ───────── ダウンロード失敗トースト ───────── */}
            {dlError && (
                <div className="fixed inset-x-0 bottom-24 z-50 flex justify-center px-4 lg:bottom-8">
                    <p className="rounded-full bg-red-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg">
                        資料の作成に失敗しました。時間をおいて、もう一度お試しください。
                    </p>
                </div>
            )}
        </div>
    );
}
