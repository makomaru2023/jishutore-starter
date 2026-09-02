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
    /** 出典資料名（例：「令和8年度診療報酬改定 告示（別表第一）」） */
    label: string;
    /** 出典URL */
    url: string;
    /** 該当ページ・該当箇所（例：「p.412」「別紙様式21の6」） */
    page?: string;
};

/**
 * 最終確認日（YYYY-MM-DD）。
 * ================================================================
 * ★確認していない項目に日付を入れないこと。
 *   null は「まだ一次資料に当たっていない／確認できていない」を意味し、
 *   画面には「未確認」と出る（formatLastVerified）。
 *   実際に確認した日を入れれば、その日付が表示に切り替わる。
 *   埋めるために今日の日付を入れると、確認済みだと嘘をつくことになる。
 */
export type FeeLastVerified = string | null;

/** 画面に出す確認日。未確認のものに日付をでっち上げない。 */
export function formatLastVerified(value: FeeLastVerified): string {
    return value ?? "未確認";
}

/**
 * 制度の版（対象年度）。分野ページ・項目ページに表示する。
 * ================================================================
 * 介護保険と医療保険で改定の年がずれるため、保険別に持つ。
 * その分野で対象外の保険は null にする（「対象外」と表示される）。
 * 詳しい経緯（期中改定など）は FeeDomain.revision の文章のほうに書く。
 */
export type FeeAppliedYear = {
    care: string | null;
    medical: string | null;
};

/** 保険別の対象年度の表示。対象外の保険は出さない。 */
export function formatAppliedYears(applied: FeeAppliedYear | undefined): string | null {
    if (!applied) return null;
    const parts: string[] = [];
    if (applied.care) parts.push(`介護 ${applied.care}`);
    if (applied.medical) parts.push(`医療 ${applied.medical}`);
    // 区切りは「・」。外側（分野名や最終確認日との区切り）で「/」を使っているので、
    // 同じ記号を重ねると保険の切れ目がどこか分からなくなる。
    return parts.length > 0 ? parts.join("・") : null;
}

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
    lastVerified: FeeLastVerified;
    verificationLevel?: string;
};

export type FeeVariantChoice = {
    id: string;
    note: string;
    sources: FeeSource[];
    lastVerified: FeeLastVerified;
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
    lastVerified: FeeLastVerified;
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
    lastVerified: FeeLastVerified;
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
    /**
     * 制度の版（対象年度）。画面に「介護 令和8年度（2026年度）」のように出す。
     * 改定のたびにここを差し替える。分野で扱わない保険は null。
     */
    appliedYear: FeeAppliedYear;
    /** 版の詳しい説明（期中改定・次回改定の予定など）。文章のまま出す */
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

/**
 * 分野ごとの「主サンプル」。各分野1エントリだけ Plus 表示を無料で見せる。
 *
 * ★張り替えないこと。既存サンプルURLの公開内容が縮むのを避けるため、
 * 手厚い項目を見せたいときは additionalSampleFeeItems に足す（2026-08-11の方針）。
 */
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

/**
 * 追加の全文公開サンプル（2026-08-11・`plan/企画書_報酬チェック価値の見せ方3点.md` §1）。
 *
 * 狙い：主サンプルが薄い分野（訪問リハの短期集中＝スコア6）だと「記録に何を残すか」の
 * デモにならないため、記録・自己点検・つまずきが厚い項目を追加で開ける。
 *
 * ★全文公開は主8件＋追加5件＝13件／148項目（約9%）に収める。ここを増やすときは
 * `plan/仕様メモ_報酬チェック_フリーミアム公開.md` の公開範囲と突き合わせること。
 */
export const additionalSampleFeeItems: Record<string, string[]> = {
    "roken-nyusho": [
        "roken-nyusho-nyusho-zengo-homon-shido", // アクセス単独1位
        "roken-nyusho-kihon", // 老健は流入6割のため2件目を許容
    ],
    "kaifukuki-riha": ["kaifukuki-riha-keikakusho-kiroku"], // 「記録に何を残すか」の看板デモ
    "homon-riha": ["homon-riha-rehamane"], // 主サンプルが最も薄いため補強
    "homon-kango-riha": ["homon-kango-riha-kihon"], // 基本報酬で検索母数が大きい
};

export const normalizeFeeText = (value: string) => value.normalize("NFKC").toLowerCase();

export function getFeeItemUrl(domainId: string, itemId: string): string {
    return `/fee-check/${domainId}/${itemId}/`;
}

export function getDomainUrl(domainId: string): string {
    return `/fee-check/${domainId}/`;
}

/** 主サンプルか（LockedCta の「全文サンプルを見る」リンク先の判定に使う）。 */
export function isMainSampleFeeItem(domainId: string, itemId: string): boolean {
    return sampleFeeItems[domainId] === itemId;
}

/**
 * 全文公開サンプルか（主・追加の両方）。
 * ★この関数が true を返すページは isUnlocked 扱いになり、records / auditPoints /
 * pitfalls / relatedQA がそのまま公開される。追加はデータ採点のうえで慎重に。
 */
export function isSampleFeeItem(domainId: string, itemId: string): boolean {
    return isMainSampleFeeItem(domainId, itemId)
        || (additionalSampleFeeItems[domainId]?.includes(itemId) ?? false);
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
            item.lastVerified ?? "",
        ].join(" ")
    );
}

/**
 * 検索結果に出す用の、短い分野名。
 * ★正式名（domainLabel）はページ内の見出しとdescriptionで使う。ここは title 専用。
 */
const SHORT_DOMAIN_LABEL: Record<string, string> = {
    "chiiki-hokatsu-care": "地域包括ケア病棟",
    "homon-kango-riha": "訪問看護のリハ",
    "homon-riha": "訪問リハ",
    "kaifukuki-riha": "回復期リハ病棟",
    kyuseiki: "急性期一般病棟",
    "roken-nyusho": "老健・入所",
    "tsusho-kaigo": "通所介護",
    "tsusho-riha": "通所リハ",
};

/** 検索結果で切られない上限。日本語は全角なのでだいたい34字が限界（2026-08-22に実測して決めた）。 */
const FEE_TITLE_MAX = 34;
const FEE_TITLE_SUFFIX = "の算定要件・単位数";

const charLength = (s: string) => [...s].length;

/** 「（」と「）」の対応が取れているか。中略で括弧が開きっぱなしになるのを防ぐ。 */
function hasBalancedParens(s: string): boolean {
    let depth = 0;
    for (const c of s) {
        if (c === "（") depth++;
        if (c === "）") depth--;
        if (depth < 0) return false;
    }
    return depth === 0;
}

/** 閉じていない「（」があれば、その手前まで戻す。 */
function trimUnbalancedTail(s: string): string {
    let depth = 0;
    let lastOpen = -1;
    const cs = [...s];
    for (let i = 0; i < cs.length; i++) {
        if (cs[i] === "（") {
            if (depth === 0) lastOpen = i;
            depth++;
        } else if (cs[i] === "）") {
            depth = Math.max(0, depth - 1);
        }
    }
    return depth > 0 && lastOpen >= 0 ? cs.slice(0, lastOpen).join("").trim() : s;
}

/** 括弧の外にある「・」だけで分割する（括弧の中の列挙を壊さないため）。 */
function splitTopLevelNakaguro(s: string): string[] {
    const out: string[] = [];
    let buf = "";
    let depth = 0;
    for (const c of s) {
        if (c === "（") depth++;
        else if (c === "）") depth = Math.max(0, depth - 1);
        if (c === "・" && depth === 0) {
            out.push(buf);
            buf = "";
        } else {
            buf += c;
        }
    }
    out.push(buf);
    return out;
}

/**
 * 頭と末尾を残して中央を省く。
 * ★末尾を守るのは「〜に対する減算」のように、末尾に種別が来る項目名があるため。
 * 頭だけ残すと「減算の話」だと分からなくなる。
 */
function middleEllipsis(s: string, max: number): string {
    if (charLength(s) <= max) return s;
    const cs = [...s];
    for (const tail of [9, 8, 7, 6, 5, 4]) {
        const head = max - 1 - tail;
        if (head < 4) continue;
        const raw = cs.slice(0, head).join("") + "…" + cs.slice(cs.length - tail).join("");
        if (hasBalancedParens(raw)) return raw;
        const trimmed = trimUnbalancedTail(cs.slice(0, head).join("")) + "…" + cs.slice(cs.length - tail).join("");
        if (hasBalancedParens(trimmed) && charLength(trimmed) >= 10) return trimmed;
    }
    return trimUnbalancedTail(cs.slice(0, max - 1).join("")) + "…";
}

/**
 * 報酬チェック項目ページの <title>。
 *
 * ★2026-08-22に全面的に短くした。それまでは
 * 「{項目名}の算定要件・単位数（{正式な分野名}）【2026年度対応】｜自主トレ素材庫」で、
 * **148項目すべてが30字超**（中央値53字・最長98字）。検索結果では30字前後で切られるため、
 * 「算定要件・単位数」も「2026年度対応」も画面に出ておらず、分野名も2回繰り返していた。
 * GSCで「表示は多いのにクリック0」のページが並んでいたことへの対応（handover 2026-08-22）。
 *
 * ★落とした情報（正式な分野名・年度・サイト名）は description と og:siteName に残っている。
 * ★段階的に縮め、収まった時点で採用する。項目名は検索語そのものなので最後まで守る。
 */
export function getFeeItemTitle(item: FeeItem, domain: FeeDomain): string {
    const shortDomain = SHORT_DOMAIN_LABEL[domain.domain] ?? domain.domainLabel;
    const variants: string[] = [];
    const push = (candidate: string) => {
        const v = candidate.trim();
        if (v && !variants.includes(v)) variants.push(v);
    };

    push(item.name);
    // 「→ 2026年6月から対象」のような補足を落とす
    push(item.name.split("→")[0]);

    // 末尾の補足カッコ（条番号・区分の列挙）を、短くなりすぎない範囲で繰り返し落とす
    let stripped = variants[variants.length - 1];
    for (let i = 0; i < 3; i++) {
        const next = stripped.replace(/（[^（）]*）\s*$/u, "").trim();
        if (next === stripped || charLength(next) < 6) break;
        stripped = next;
        push(stripped);
    }

    // それでも長いときだけ略す（短い項目名の正式表記は崩さない）
    for (const base of [...variants]) push(base.replace(/リハビリテーション/g, "リハ"));

    // 「A・B・C加算」の列挙は先頭だけ残して「ほか」
    for (const base of [...variants]) {
        const parts = splitTopLevelNakaguro(base);
        if (parts.length <= 1) continue;
        let acc = parts[0];
        for (let i = 1; i < parts.length && charLength(`${acc}・${parts[i]}`) <= 16; i++) {
            acc = `${acc}・${parts[i]}`;
        }
        if (charLength(acc) < charLength(base)) push(`${trimUnbalancedTail(acc)}ほか`);
    }

    for (const v of variants) {
        const candidate = `${v}${FEE_TITLE_SUFFIX}｜${shortDomain}`;
        if (charLength(candidate) <= FEE_TITLE_MAX) return candidate;
    }
    // ★分野名は必ず付ける。落とすと別分野の同名項目とtitleが衝突するため
    //   （2026-08-22に「中山間地域等に居住する者へのサービス提供加算」が
    //     訪問リハと通所介護で完全に同じtitleになる事故を実測して分かった）。
    //   収まらないぶんは項目名を中略して吸収する。
    const nameBudget = FEE_TITLE_MAX - charLength(FEE_TITLE_SUFFIX) - 1 - charLength(shortDomain);
    const shortest = variants.reduce((a, b) => (charLength(b) < charLength(a) ? b : a));
    return `${middleEllipsis(shortest, nameBudget)}${FEE_TITLE_SUFFIX}｜${shortDomain}`;
}

export function getFeeDescription(item: FeeItem, domain: FeeDomain): string {
    const firstRequirement = item.requirements[0] ?? "";
    const firstUnit = item.units[0] ? `${item.units[0].condition}は${item.units[0].value}` : "";
    const sourceNote = "根拠となる厚労省告示・通知へのリンクつき。";
    const body = [firstUnit, firstRequirement].filter(Boolean).join("。");
    return truncateText(`${item.name}（${domain.domainLabel}）の算定要件・単位数を確認できます。${body}。${sourceNote}`, 150);
}
