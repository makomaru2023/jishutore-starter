/**
 * GA4 イベント送信の共通ヘルパー
 * --------------------------------------------------------------
 * 方針：
 * - window.gtag が未定義でもエラーにしない（SSR・広告ブロック対策）
 * - 送信失敗してもアプリの本来の動作（ダウンロード・遷移）を止めない
 * - 既存実装（CheckoutButton 等）と同じ gtag 直呼びスタイルに合わせる
 */

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}

type EventParams = Record<string, unknown>;

/** 任意の GA4 イベントを安全に送信する */
export function trackEvent(name: string, params: EventParams = {}): void {
    try {
        if (typeof window === "undefined" || typeof window.gtag !== "function") return;
        window.gtag("event", name, params);
    } catch {
        /* 計測失敗で本来の操作を止めない */
    }
}

/** LINE 導線クリック。placement で設置場所を区別する */
export function trackLineClick(placement: string): void {
    trackEvent("line_click", { placement });
}

/** note 導線クリック。placement で設置場所を区別する */
export function trackNoteClick(placement: string): void {
    trackEvent("note_click", { placement });
}

export interface MaterialDownloadParams {
    /** 日本語の素材名 */
    materialName: string;
    /** URL スラッグ（素材ID） */
    materialSlug: string;
    /** 既存の区分（tier 等） */
    materialType: string;
}

/** 素材ダウンロードクリックの統一イベント */
export function trackMaterialDownload({
    materialName,
    materialSlug,
    materialType,
}: MaterialDownloadParams): void {
    trackEvent("material_download", {
        material_name: materialName,
        material_slug: materialSlug,
        material_type: materialType,
    });
}

export interface FeeCheckSearchParams {
    query: string;
    domain: string;
    insurance: string;
    category: string;
    resultCount: number;
    location: "global" | "domain";
}

/** 報酬チェック内の検索実行。結果件数と検索範囲を残す。 */
export function trackFeeCheckSearch({
    query,
    domain,
    insurance,
    category,
    resultCount,
    location,
}: FeeCheckSearchParams): void {
    trackEvent("fee_check_search", {
        search_term: query,
        fee_domain: domain,
        insurance,
        fee_category: category,
        result_count: resultCount,
        search_location: location,
    });
}

/** 報酬チェックの分野・項目ページ表示。 */
export function trackFeeCheckView(
    type: "domain" | "item",
    params: EventParams,
): void {
    trackEvent(type === "domain" ? "fee_check_domain_view" : "fee_check_item_view", params);
}

/** 検索結果から項目を開いた操作。 */
export function trackFeeCheckResultClick(params: EventParams): void {
    trackEvent("fee_check_result_click", params);
}

/** Plus登録導線のクリック。 */
export function trackFeeCheckPlusClick(params: EventParams): void {
    trackEvent("fee_check_plus_click", params);
}

/** 厚労省資料・関連Q&Aのクリック。 */
export function trackFeeCheckSourceClick(params: EventParams): void {
    trackEvent("fee_check_source_click", params);
}

/** 報酬チェックの印刷操作。 */
export function trackFeeCheckPrint(params: EventParams): void {
    trackEvent("fee_check_print", params);
}
