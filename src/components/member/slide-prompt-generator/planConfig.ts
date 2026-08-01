import type { SlideCount, VisualStyleId } from "./constants";

/**
 * プロンプト工房のプラン定義。
 * - "free": LINE特典として配布する無料版（機能制限あり）
 * - "full": 有料版（980円買い切り・全機能）
 */
export type Plan = "free" | "full";

export interface PlanConfig {
    /** 利用可能なプリセットID。null は全プリセット利用可 */
    allowedPresetIds: string[] | null;
    /** 利用可能なビジュアルスタイルID。null は全スタイル利用可 */
    allowedStyleIds: VisualStyleId[] | null;
    /** 利用可能なスライド枚数。null は全枚数利用可 */
    allowedSlideCounts: SlideCount[] | null;
}

export const PLAN_CONFIGS: Record<Plan, PlanConfig> = {
    free: {
        allowedPresetIds: ["self-training-guidance", "in-hospital-study"],
        allowedStyleIds: ["simple-medical-care", "gentle-pastel", "jishutore-style"],
        allowedSlideCounts: ["3枚"],
    },
    full: {
        allowedPresetIds: null,
        allowedStyleIds: null,
        allowedSlideCounts: null,
    },
};

/**
 * 無料版からPlusへのアップグレード遷移先。
 */
export const UPGRADE_URL = "/products/jishutore-plus/";

/** ロック項目クリック時にスクロールするアップセルバナーの id */
export const UPGRADE_BANNER_ID = "upgrade-banner";
