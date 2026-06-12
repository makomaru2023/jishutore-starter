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
