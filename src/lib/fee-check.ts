import homonRihaData from "@/data/fee-items/homon-riha.json";
import tsushoRihaData from "@/data/fee-items/tsusho-riha.json";
import rokenNyushoData from "@/data/fee-items/roken-nyusho.json";
import homonKangoRihaData from "@/data/fee-items/homon-kango-riha.json";
import kaifukukiRihaData from "@/data/fee-items/kaifukuki-riha.json";
import chiikiHokatsuCareData from "@/data/fee-items/chiiki-hokatsu-care.json";
import kyuseikiData from "@/data/fee-items/kyuseiki.json";
import tsushoKaigoData from "@/data/fee-items/tsusho-kaigo.json";
import tsushoRihaConflictsData from "@/data/fee-items/tsusho-riha-conflicts.json";
import rokenNyushoConflictsData from "@/data/fee-items/roken-nyusho-conflicts.json";
import homonRihaConflictsData from "@/data/fee-items/homon-riha-conflicts.json";
import homonKangoRihaConflictsData from "@/data/fee-items/homon-kango-riha-conflicts.json";
import kaifukukiRihaConflictsData from "@/data/fee-items/kaifukuki-riha-conflicts.json";
import chiikiHokatsuCareConflictsData from "@/data/fee-items/chiiki-hokatsu-care-conflicts.json";
import kyuseikiConflictsData from "@/data/fee-items/kyuseiki-conflicts.json";
import tsushoKaigoConflictsData from "@/data/fee-items/tsusho-kaigo-conflicts.json";
import { FEE_CHECK_DOMAIN_COUNT, FEE_CHECK_ITEM_COUNT, assertPublicCount } from "@/constants/public-counts";

// 型・ラベル・純粋関数は fee-check-shared.ts に置く（クライアントから安全に import するため）。
// ここでは再エクスポートして、サーバー側の既存の import パスを維持する。
export * from "@/lib/fee-check-shared";
import {
    type FeeDomain,
    type FeeItem,
    type FeeConflictSet,
    additionalSampleFeeItems,
    getDomainUrl,
    sampleFeeItems,
} from "@/lib/fee-check-shared";

export const feeDomains = [
    homonRihaData,
    tsushoRihaData,
    rokenNyushoData,
    homonKangoRihaData,
    kaifukukiRihaData,
    chiikiHokatsuCareData,
    kyuseikiData,
    tsushoKaigoData,
] as FeeDomain[];

export type FeeDomainId = (typeof feeDomains)[number]["domain"];

export function getFeeDomain(domainId: string): FeeDomain | undefined {
    return feeDomains.find((domain) => domain.domain === domainId);
}

/**
 * 「他の分野」ナビに渡す一覧を作る（現在の分野は除く）。
 * ★2026-09-03：分野ページ同士に相互リンクが無かったため新設。
 */
export function getOtherFeeDomainNavEntries(currentDomainId: string) {
    return feeDomains
        .filter((domain) => domain.domain !== currentDomainId)
        .map((domain) => ({
            domain: domain.domain,
            label: domain.domainLabel,
            href: getDomainUrl(domain.domain),
            itemCount: domain.items.length,
        }));
}


export function getFeeItem(domainId: string, itemId: string): { domain: FeeDomain; item: FeeItem } | undefined {
    const domain = getFeeDomain(domainId);
    const item = domain?.items.find((entry) => entry.id === itemId);
    return domain && item ? { domain, item } : undefined;
}

export function getAllFeeItems(): Array<{ domain: FeeDomain; item: FeeItem }> {
    return feeDomains.flatMap((domain) => domain.items.map((item) => ({ domain, item })));
}

export function getFeeCheckTotalCount(): number {
    return feeDomains.reduce((total, domain) => total + domain.items.length, 0);
}

// 公開コピー（クライアント側は数値定数を参照する）が実データとズレたままにならないよう、
// ビルド時に検証する。ズレていればここでビルドが落ちる。
assertPublicCount("報酬チェックの分野数", feeDomains.length, FEE_CHECK_DOMAIN_COUNT);
assertPublicCount("報酬チェックの項目数", getFeeCheckTotalCount(), FEE_CHECK_ITEM_COUNT);

/**
 * 主サンプル（各分野1件）。★戻り値を変えないこと。
 * LockedCta / ContextualPlusGuide の「全文サンプルを見る」リンク先がこれを使っている。
 */
export function getSampleFeeItems(): Array<{ domain: FeeDomain; item: FeeItem }> {
    return feeDomains.flatMap((domain) => {
        const sampleId = sampleFeeItems[domain.domain];
        const item = domain.items.find((entry) => entry.id === sampleId);
        return item ? [{ domain, item }] : [];
    });
}

/** 追加の全文公開サンプル（ハブの一覧に主サンプルと並べて出す）。 */
export function getAdditionalSampleFeeItems(): Array<{ domain: FeeDomain; item: FeeItem }> {
    return feeDomains.flatMap((domain) => {
        const ids = additionalSampleFeeItems[domain.domain] ?? [];
        return ids.flatMap((id) => {
            const item = domain.items.find((entry) => entry.id === id);
            return item ? [{ domain, item }] : [];
        });
    });
}

// データ側のIDミスに早く気づくため、存在しないIDが指定されていたらビルドを落とす。
// （サンプル指定は手書きなので、項目IDのリネームで静かに壊れるのを防ぐ）
for (const [domainId, ids] of Object.entries(additionalSampleFeeItems)) {
    const domain = getFeeDomain(domainId);
    if (!domain) {
        throw new Error(`[fee-check] additionalSampleFeeItems に未知の分野 "${domainId}" が指定されています。`);
    }
    for (const id of ids) {
        if (!domain.items.some((item) => item.id === id)) {
            throw new Error(`[fee-check] additionalSampleFeeItems の "${domainId}" に未知の項目ID "${id}" が指定されています。`);
        }
    }
}

// --- 加算の組み合わせチェック ---
// conflicts ファイルを持つ分野のみを対象にする。
const feeConflictSets = [
    tsushoRihaConflictsData,
    rokenNyushoConflictsData,
    homonRihaConflictsData,
    homonKangoRihaConflictsData,
    kaifukukiRihaConflictsData,
    chiikiHokatsuCareConflictsData,
    kyuseikiConflictsData,
    tsushoKaigoConflictsData,
] as FeeConflictSet[];

export function getFeeConflictSet(domainId: string): FeeConflictSet | undefined {
    return feeConflictSets.find((set) => set.domain === domainId);
}

// 組み合わせチェックに対応している分野（conflicts があり、かつ本体データも存在する）。
export function getComboDomains(): Array<{ domain: FeeDomain; conflicts: FeeConflictSet }> {
    return feeConflictSets
        .map((conflicts) => {
            const domain = getFeeDomain(conflicts.domain);
            return domain ? { domain, conflicts } : null;
        })
        .filter((entry): entry is { domain: FeeDomain; conflicts: FeeConflictSet } => entry !== null);
}

export function hasComboCheck(domainId: string): boolean {
    return feeConflictSets.some((set) => set.domain === domainId);
}
