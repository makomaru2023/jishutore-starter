/**
 * 報酬チェックの「型」と「データを持たない純粋な値・関数」だけを置くモジュール。
 *
 * ★クライアントコンポーネントは必ずこのモジュールから import すること。
 * `@/lib/fee-check` は冒頭で fee-items の JSON（全8分野・764KB）を import しているため、
 * ラベル1つでもあちらから import すると、JSONが丸ごとクライアントバンドルに乗る。
 * それは Plus 限定である records / auditPoints / pitfalls / relatedQA を
 * 非会員に配ることを意味する（2026-07-16に実際に発生していた。要確認リスト S章）。
 *
 * 判断基準：データ（feeDomains・conflicts）に触る関数はここに置かない＝ fee-check.ts に置く。
 */

export type FeeInsurance = "care" | "medical";
export type FeeCategory = "kihon" | "kasan" | "gensan" | "rule";

export type FeeUnit = {
    condition: string;
    value: string;
    note?: string;
};

export type FeeSource = {
    label: string;
    url: string;
    page?: string;
};

export type RelatedQA = {
    label: string;
    url: string;
};

// --- 加算の組み合わせチェック（併算定・条件付き・区分選択制） ---
export type FeeConflictType = "exclusive" | "conditional";

export type FeeConflictPair = {
    type: FeeConflictType;
    a: string;
    b: string;
    condition?: string;
    note: string;
    sources: FeeSource[];
    lastVerified: string;
    verificationLevel?: string;
};

export type FeeVariantChoice = {
    id: string;
    note: string;
    sources: FeeSource[];
    lastVerified: string;
    verificationLevel?: string;
};

// 前提加算（Aを算定するにはBの算定が必要）。requiresAnyOf＝いずれか1つでよい、
// requiresAllOf＝すべて必要。severity: required＝加算全体の要件（赤）、
// conditional＝特定の区分だけの要件（黄・condition に区分を明記）。
export type FeeRequiresRule = {
    id: string;
    requiresAnyOf?: string[];
    requiresAllOf?: string[];
    severity: "required" | "conditional";
    condition?: string;
    note: string;
    sources: FeeSource[];
    lastVerified: string;
    verificationLevel?: string;
};

export type FeeConflictSet = {
    schemaVersion: number;
    domain: string;
    domainLabel: string;
    note?: string;
    pairs: FeeConflictPair[];
    variantChoices: FeeVariantChoice[];
    requires?: FeeRequiresRule[];
};

export type FeeItem = {
    id: string;
    insurance: FeeInsurance;
    category: FeeCategory;
    name: string;
    units: FeeUnit[];
    requirements: string[];
    records: string[];
    auditPoints: string[];
    pitfalls?: string[];
    relatedQA?: RelatedQA[];
    sources: FeeSource[];
    lastVerified: string;
    changedInLastRevision?: boolean;
    changeSummary?: string;
    verificationLevel?: string;
    /** 告示上は存在するが現時点では算定できない項目（例：対象感染症が未指定の新興感染症等施設療養費）。赤バッジで警告する */
    currentlyNotClaimable?: boolean;
};

export type FeeDomain = {
    schemaVersion: number;
    domain: string;
    domainLabel: string;
    revision: {
        care: string;
        medical: string;
    };
    disclaimer: string;
    items: FeeItem[];
};

export const insuranceLabels: Record<FeeInsurance, string> = {
    care: "介護保険",
    medical: "医療保険",
};

export const categoryLabels: Record<FeeCategory, string> = {
    kihon: "基本報酬",
    kasan: "加算",
    gensan: "減算",
    rule: "ルール",
};

export const categoryStyles: Record<FeeCategory, string> = {
    kihon: "border-blue-200 bg-blue-50 text-blue-800",
    kasan: "border-amber-200 bg-amber-50 text-amber-800",
    gensan: "border-rose-200 bg-rose-50 text-rose-800",
    rule: "border-slate-200 bg-slate-100 text-slate-700",
};

/** 分野ごとの「全文公開サンプル」。1エントリだけ Plus 表示を無料で見せる。 */
export const sampleFeeItems: Record<string, string> = {
    "homon-riha": "homon-riha-tanki-shuchu",
    "tsusho-riha": "tsusho-riha-rehamane",
    "roken-nyusho": "roken-nyusho-tanki-shuchu-reha",
    "homon-kango-riha": "homon-kango-riha-riha-shokei-gensan",
    "kaifukuki-riha": "kaifukuki-riha-kihon",
    "chiiki-hokatsu-care": "chiiki-hokatsu-care-kihon",
    "kyuseiki": "kyuseiki-ippan-nyuin-kihon",
    "tsusho-kaigo": "tsusho-kaigo-kobetsu-kinou",
};

export const normalizeFeeText = (value: string) => value.normalize("NFKC").toLowerCase();

export function getFeeItemUrl(domainId: string, itemId: string): string {
    return `/fee-check/${domainId}/${itemId}/`;
}

export function getDomainUrl(domainId: string): string {
    return `/fee-check/${domainId}/`;
}

export function isSampleFeeItem(domainId: string, itemId: string): boolean {
    return sampleFeeItems[domainId] === itemId;
}

export function truncateText(value: string, maxLength: number): string {
    const normalized = value.replace(/\s+/g, " ").trim();
    if (normalized.length <= maxLength) return normalized;
    return `${normalized.slice(0, maxLength - 1)}…`;
}

/**
 * 無料の全分野検索に載せてよいテキスト。
 * ★Plus限定（records / auditPoints / pitfalls / relatedQA）は絶対に含めないこと。
 */
export function getPublicFeeSearchText(item: FeeItem): string {
    return normalizeFeeText(
        [
            item.name,
            insuranceLabels[item.insurance],
            categoryLabels[item.category],
            item.units.map((unit) => `${unit.condition} ${unit.value} ${unit.note || ""}`).join(" "),
            item.requirements.join(" "),
            item.sources.map((source) => source.label).join(" "),
            item.lastVerified,
        ].join(" ")
    );
}

export function getFeeDescription(item: FeeItem, domain: FeeDomain): string {
    const firstRequirement = item.requirements[0] ?? "";
    const firstUnit = item.units[0] ? `${item.units[0].condition}は${item.units[0].value}` : "";
    const sourceNote = "根拠となる厚労省告示・通知へのリンクつき。";
    const body = [firstUnit, firstRequirement].filter(Boolean).join("。");
    return truncateText(`${item.name}（${domain.domainLabel}）の算定要件・単位数を確認できます。${body}。${sourceNote}`, 150);
}
