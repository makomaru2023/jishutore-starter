"use client";

import { useEffect, useMemo, useState } from "react";
import {
    categoryLabels,
    type FeeConflictSet,
    type FeeConflictPair,
    type FeeDomain,
    type FeeItem,
    type FeeRequiresRule,
} from "@/lib/fee-check-shared";

type ComboDomain = { domain: FeeDomain; conflicts: FeeConflictSet };

type TriggeredPair = FeeConflictPair & { aName: string; bName: string };
type TriggeredVariant = { id: string; name: string; note: string; sources: FeeConflictSet["variantChoices"][number]["sources"] };
type TriggeredRequire = FeeRequiresRule & { name: string; missingNames: string[] };

const STORAGE_KEY = "fee-combo-selection-v1";
const CATEGORY_ORDER: FeeItem["category"][] = ["kihon", "kasan", "gensan", "rule"];

function SourceLinks({ sources }: { sources: { label: string; url: string; page?: string }[] }) {
    return (
        <ul className="mt-2 space-y-1">
            {sources.map((s, i) => (
                <li key={i} className="text-xs leading-5">
                    <a href={s.url} target="_blank" rel="noreferrer" className="font-bold text-blue-700 hover:underline">
                        {s.label}
                    </a>
                    {s.page && <span className="text-slate-500">（{s.page}）</span>}
                </li>
            ))}
        </ul>
    );
}

export function FeeComboChecker({ domains }: { domains: ComboDomain[] }) {
    const [domainId, setDomainId] = useState(domains[0]?.domain.domain ?? "");
    const [selected, setSelected] = useState<Record<string, string[]>>({});
    const [loaded, setLoaded] = useState(false);

    // localStorage 復元。SSR中はlocalStorageが無く、初期化子で読むとハイドレーション不一致に
    // なるため、マウント後のeffectで読み込んで反映する（意図的な post-mount 反映）。
    useEffect(() => {
        let restored: Record<string, string[]> | null = null;
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) restored = JSON.parse(raw);
        } catch {
            /* 破損時は無視 */
        }
        // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorageからのマウント後復元
        if (restored) setSelected(restored);
        setLoaded(true);
    }, []);

    useEffect(() => {
        if (!loaded) return;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(selected));
        } catch {
            /* 保存失敗は無視 */
        }
    }, [selected, loaded]);

    const active = useMemo(() => domains.find((d) => d.domain.domain === domainId) ?? domains[0], [domains, domainId]);
    const selectedIds = useMemo(() => new Set(selected[domainId] ?? []), [selected, domainId]);

    const itemsByCategory = useMemo(() => {
        const map = new Map<FeeItem["category"], FeeItem[]>();
        for (const item of active?.domain.items ?? []) {
            const list = map.get(item.category) ?? [];
            list.push(item);
            map.set(item.category, list);
        }
        return map;
    }, [active]);

    const nameOf = useMemo(() => {
        const m = new Map<string, string>();
        for (const item of active?.domain.items ?? []) m.set(item.id, item.name);
        return m;
    }, [active]);

    const toggle = (id: string) => {
        setSelected((prev) => {
            const cur = new Set(prev[domainId] ?? []);
            if (cur.has(id)) cur.delete(id);
            else cur.add(id);
            return { ...prev, [domainId]: [...cur] };
        });
    };

    const clear = () => setSelected((prev) => ({ ...prev, [domainId]: [] }));

    // 衝突検知
    const { exclusive, conditional, variants, requires } = useMemo(() => {
        const ex: TriggeredPair[] = [];
        const cond: TriggeredPair[] = [];
        const vars: TriggeredVariant[] = [];
        const reqs: TriggeredRequire[] = [];
        if (!active) return { exclusive: ex, conditional: cond, variants: vars, requires: reqs };
        for (const pair of active.conflicts.pairs) {
            if (selectedIds.has(pair.a) && selectedIds.has(pair.b)) {
                const t: TriggeredPair = { ...pair, aName: nameOf.get(pair.a) ?? pair.a, bName: nameOf.get(pair.b) ?? pair.b };
                if (pair.type === "exclusive") ex.push(t);
                else cond.push(t);
            }
        }
        for (const v of active.conflicts.variantChoices) {
            if (selectedIds.has(v.id)) vars.push({ id: v.id, name: nameOf.get(v.id) ?? v.id, note: v.note, sources: v.sources });
        }
        // 前提加算：チェック済みの加算に前提があり、その前提が未選択なら警告
        for (const rule of active.conflicts.requires ?? []) {
            if (!selectedIds.has(rule.id)) continue;
            const anyOf = rule.requiresAnyOf ?? [];
            const allOf = rule.requiresAllOf ?? [];
            const anyMissing = anyOf.length > 0 && !anyOf.some((id) => selectedIds.has(id));
            const allMissing = allOf.filter((id) => !selectedIds.has(id));
            if (anyMissing || allMissing.length > 0) {
                const missing = anyMissing ? anyOf : allMissing;
                reqs.push({
                    ...rule,
                    name: nameOf.get(rule.id) ?? rule.id,
                    missingNames: missing.map((id) => nameOf.get(id) ?? id),
                });
            }
        }
        return { exclusive: ex, conditional: cond, variants: vars, requires: reqs };
    }, [active, selectedIds, nameOf]);

    const total = exclusive.length + conditional.length + variants.length + requires.length;
    const activeHasRules =
        active.conflicts.pairs.length > 0 ||
        active.conflicts.variantChoices.length > 0 ||
        (active.conflicts.requires?.length ?? 0) > 0;

    if (!active) return null;

    return (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            {/* 左：チェックリスト */}
            <div className="min-w-0">
                {domains.length > 1 && (
                    <div className="mb-4 flex flex-wrap gap-2">
                        {domains.map((d) => (
                            <button
                                key={d.domain.domain}
                                type="button"
                                onClick={() => setDomainId(d.domain.domain)}
                                className={`rounded-full border px-3 py-1.5 text-sm font-bold ${
                                    d.domain.domain === domainId
                                        ? "border-blue-600 bg-blue-600 text-white"
                                        : "border-slate-300 bg-white text-slate-700 hover:border-blue-300"
                                }`}
                            >
                                {d.domain.domainLabel}
                            </button>
                        ))}
                    </div>
                )}

                <div className="flex items-center justify-between">
                    <p className="text-sm font-black text-slate-900">
                        算定中（予定）の加算にチェック
                    </p>
                    {selectedIds.size > 0 && (
                        <button type="button" onClick={clear} className="text-xs font-bold text-slate-500 hover:text-blue-700 hover:underline print:hidden">
                            選択をクリア
                        </button>
                    )}
                </div>

                {!activeHasRules && active.conflicts.note && (
                    <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm leading-6 text-amber-950">
                        <p className="font-black">この分野の検出対象について</p>
                        <p className="mt-1">{active.conflicts.note}</p>
                    </div>
                )}

                <div className="mt-3 space-y-4">
                    {CATEGORY_ORDER.filter((c) => itemsByCategory.has(c)).map((cat) => (
                        <div key={cat}>
                            <p className="text-xs font-black tracking-widest text-blue-700">{categoryLabels[cat]}</p>
                            <ul className="mt-2 space-y-1.5">
                                {(itemsByCategory.get(cat) ?? []).map((item) => (
                                    <li key={item.id}>
                                        <label className="flex cursor-pointer items-start gap-2 rounded-md border border-slate-200 bg-white p-2.5 hover:border-blue-300">
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.has(item.id)}
                                                onChange={() => toggle(item.id)}
                                                className="mt-0.5 h-4 w-4 flex-shrink-0 accent-blue-600"
                                            />
                                            <span className="min-w-0">
                                                <span className="text-sm font-bold leading-5 text-slate-800">{item.name}</span>
                                                {item.units[0] && (
                                                    <span className="ml-2 text-xs font-black text-blue-800">{item.units[0].value}</span>
                                                )}
                                            </span>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* 右：結果パネル */}
            <div className="min-w-0">
                <div className="sticky top-20 rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-base font-black text-slate-900">検知された注意点：{total}件</h2>
                        <button
                            type="button"
                            onClick={() => window.print()}
                            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:border-blue-300 hover:text-blue-700 print:hidden"
                        >
                            印刷・保存
                        </button>
                    </div>

                    {selectedIds.size === 0 && (
                        <p className="mt-3 text-sm leading-6 text-slate-500">
                            左のリストで、算定している（予定の）加算にチェックを入れてください。組み合わせに含まれる併算定不可・条件付き・区分選択制・前提加算の規定を表示します。
                        </p>
                    )}

                    {selectedIds.size > 0 && total === 0 && (
                        <p className="mt-3 text-sm leading-6 text-slate-600">
                            チェックした組み合わせについて、収録している併算定不可・条件付き・区分選択制・前提加算の規定は見つかりませんでした。ただし、これは算定できることを保証するものではありません（下の注意書きをご確認ください）。
                        </p>
                    )}

                    <div className="mt-3 space-y-3">
                        {exclusive.map((p, i) => (
                            <div key={`ex-${i}`} className="rounded-md border border-red-300 bg-red-50 p-3">
                                <p className="text-xs font-black text-red-700">🔴 併算定不可</p>
                                <p className="mt-1 text-sm font-bold leading-6 text-slate-900">
                                    {p.aName} ✕ {p.bName}
                                </p>
                                <p className="mt-1 text-sm leading-6 text-slate-700">{p.note}</p>
                                <SourceLinks sources={p.sources} />
                            </div>
                        ))}
                        {requires.map((r, i) =>
                            r.severity === "required" ? (
                                <div key={`req-${i}`} className="rounded-md border border-red-300 bg-red-50 p-3">
                                    <p className="text-xs font-black text-red-700">🔴 前提の加算が未選択</p>
                                    <p className="mt-1 text-sm font-bold leading-6 text-slate-900">
                                        {r.name} には前提があります：{r.missingNames.join("・")} が未選択です
                                    </p>
                                    <p className="mt-1 text-sm leading-6 text-slate-700">{r.note}</p>
                                    <SourceLinks sources={r.sources} />
                                </div>
                            ) : (
                                <div key={`req-${i}`} className="rounded-md border border-amber-300 bg-amber-50 p-3">
                                    <p className="text-xs font-black text-amber-800">🟡 前提の確認（区分による）</p>
                                    <p className="mt-1 text-sm font-bold leading-6 text-slate-900">
                                        {r.name} の前提：{r.missingNames.join("・")} が未選択です
                                    </p>
                                    {r.condition && <p className="mt-1 text-sm leading-6 text-amber-900">対象：{r.condition}</p>}
                                    <p className="mt-1 text-sm leading-6 text-slate-700">{r.note}</p>
                                    <SourceLinks sources={r.sources} />
                                </div>
                            )
                        )}
                        {conditional.map((p, i) => (
                            <div key={`cond-${i}`} className="rounded-md border border-amber-300 bg-amber-50 p-3">
                                <p className="text-xs font-black text-amber-800">🟡 条件付き注意</p>
                                <p className="mt-1 text-sm font-bold leading-6 text-slate-900">
                                    {p.aName} ・ {p.bName}
                                </p>
                                {p.condition && <p className="mt-1 text-sm leading-6 text-amber-900">条件：{p.condition}</p>}
                                <p className="mt-1 text-sm leading-6 text-slate-700">{p.note}</p>
                                <SourceLinks sources={p.sources} />
                            </div>
                        ))}
                        {variants.map((v, i) => (
                            <div key={`var-${i}`} className="rounded-md border border-orange-300 bg-orange-50 p-3">
                                <p className="text-xs font-black text-orange-700">🟠 区分の選択制</p>
                                <p className="mt-1 text-sm font-bold leading-6 text-slate-900">{v.name}</p>
                                <p className="mt-1 text-sm leading-6 text-slate-700">{v.note}</p>
                                <SourceLinks sources={v.sources} />
                            </div>
                        ))}
                    </div>

                    {/* 免責文（常設） */}
                    <div className="mt-4 rounded-md border border-slate-200 bg-white p-3 text-xs leading-5 text-slate-500">
                        このチェックは、厚生労働省の告示・通知に明記された併算定不可・選択制・前提となる加算の規定だけを検出します。
                        <span className="font-bold text-slate-600">表示されない組み合わせが「算定できる」ことを保証するものではありません。</span>
                        施設基準・対象者の要件・算定期間などの条件は各項目のページで確認してください。
                        実際の算定・請求にあたっては必ず原本（告示・通知）を確認し、判断に迷う場合は保険者・地方厚生局にお問い合わせください。
                    </div>
                </div>
            </div>
        </div>
    );
}
