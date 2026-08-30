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

/**
 * 計測を許可するホスト名。
 * --------------------------------------------------------------
 * ★ここに無いホストからは GA4 へ一切送らない。
 *   localhost / 127.0.0.1 / *.vercel.app（プレビュー・本番デプロイの別名URL）が対象外になる。
 *   2026-08以前に localhost のアクセスが本番GA4へ混ざり、Plus LP到達数のような
 *   母数の小さい指標が読めなくなった事故があったため、二重に塞いでいる。
 *   （1枚目の防御は layout.tsx：本番デプロイ以外ではGAタグ自体を読み込まない＋
 *     読み込んでもホストが違えば ga-disable で止める）
 *
 * ⚠ 独自ドメインを増やしたときは、ここに追加しないと計測が止まる。
 */
const MEASURABLE_HOSTS = ["jishutore-sozaiko.online", "www.jishutore-sozaiko.online"];

/** いま計測してよい環境か（本番ホストのみ true） */
function isMeasurableHost(): boolean {
    try {
        if (typeof window === "undefined") return false;
        return MEASURABLE_HOSTS.includes(window.location.hostname);
    } catch {
        return false;
    }
}

/** 任意の GA4 イベントを安全に送信する */
export function trackEvent(name: string, params: EventParams = {}): void {
    try {
        if (typeof window === "undefined" || typeof window.gtag !== "function") return;
        if (!isMeasurableHost()) return;
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

/** 施設・法人利用相談の導線クリック。placement で設置場所を区別する */
export function trackB2bContactClick(placement: string): void {
    trackEvent("b2b_contact_click", { placement });
}

/** Plus LPの申込導線クリック。actionで決済開始と料金欄への移動を分ける。 */
export function trackPlusCtaClick(
    placement: string,
    action: "checkout" | "scroll_to_pricing" = "checkout",
): void {
    trackEvent("plus_cta_click", { placement, action });
}

/** Plus LPから無料で試せる資料・機能を開いた操作。 */
export function trackPlusResourceClick(resource: string, placement: string): void {
    trackEvent("plus_resource_click", { resource, placement });
}

/** サイト共通のPlus会員ページ導線クリック。 */
export function trackPlusMemberLinkClick(placement: "header" | "footer"): void {
    trackEvent("plus_member_link_click", { placement });
}

/** Plus会員版の報酬チェックハブ表示。 */
export function trackPlusFeeHubView(
    initialTab: "items" | "combo",
    domainCount: number,
    itemCount: number,
): void {
    trackEvent("plus_fee_hub_view", {
        initial_tab: initialTab,
        domain_count: domainCount,
        item_count: itemCount,
    });
}

/** Plus会員版の報酬チェックハブ内タブ切り替え。 */
export function trackPlusFeeHubTabChange(
    tab: "items" | "combo",
    previousTab: "items" | "combo",
): void {
    trackEvent("plus_fee_hub_tab_change", { tab, previous_tab: previousTab });
}

/** 資料庫の「完成デッキ＆会員ツール」カードクリック。 */
export function trackPlusToolCardClick(toolId: string): void {
    trackEvent("plus_tool_card_click", {
        tool_id: toolId,
        placement: "plus_library_tools",
    });
}

/** 無料報酬チェック画面から会員版ハブへ戻る導線。 */
export function trackPlusFeeHubBannerClick(placement: string): void {
    trackEvent("plus_fee_hub_banner_click", { placement });
}

/** 会員向け購入者アンケートの導線クリック。 */
export function trackPlusSurveyClick(placement: string): void {
    trackEvent("plus_survey_click", { placement });
}

/**
 * 利用者アンケート（Googleフォーム）の導線が画面に出たとき。
 * placement: material_download / fee_check / engagement_banner
 * ※フッターリンクは常時ページ内にあるため impression は送らない（分母が全PVになり意味を持たないため）。
 */
export function trackSurveyImpression(placement: string): void {
    trackEvent("survey_impression", { placement });
}

/**
 * 利用者アンケートの回答リンククリック。
 * placement: material_download / fee_check / footer / engagement_banner
 * 回答完了はGoogleフォーム側（外部ドメイン）なのでGA4では取れない。
 * ここまでの表示数・クリック数・placement別CTRで施策を評価する。
 */
export function trackSurveyClick(placement: string): void {
    trackEvent("survey_click", { placement });
}

/**
 * 利用者アンケートの案内を「閉じる」で消したとき。
 * placement: material_download / engagement_banner
 * 閉じるUIが無い場所（fee_check のカード・フッターリンク）では送らない。
 */
export function trackSurveyDismiss(placement: string): void {
    trackEvent("survey_dismiss", { placement });
}

/**
 * ダウンロード直後のLINEトーストが表示されたとき。
 * クリックは既存の line_click（placement: post_download_toast）が担当しているので
 * 新設せず、表示側だけを足して「表示→クリック」を比較できるようにする。
 */
export function trackLineToastImpression(placement: string): void {
    trackEvent("line_toast_impression", { placement });
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

// ---------------------------------------------------------------
// 求人掲載（/jobs/）
// ---------------------------------------------------------------
// 施設へ「掲載期間中に何回表示され、何人が詳細を見て、何人が公式採用ページへ進んだか」を
// 報告できるようにするためのイベント群。求人ID単位で集計できる形にそろえてある。
//
// ★GA4プロパティ・測定IDは既存のものをそのまま使う（新規作成しない）。
// ★placement は line_click / survey_click などと同じ既存のカスタムディメンション。
//   重複したディメンションを作らずに再利用する。

/**
 * 求人イベントに共通で載せる情報。
 * Job 型そのものを要求しないので、クライアントコンポーネントが
 * 求人データを import せずに済む（構造的に一致していれば渡せる）。
 */
export interface JobEventSource {
    id: string;
    slug: string;
    facilityName: string;
    /** 複数職種の求人があるため配列。GA4へは "PT,OT" のように連結して送る */
    profession: readonly string[];
}

function jobParams(job: JobEventSource): EventParams {
    return {
        job_id: job.id,
        job_slug: job.slug,
        facility_name: job.facilityName,
        profession: job.profession.join(","),
    };
}

/**
 * 求人カードが画面に入ったとき（表示回数）。
 * placement で「求人一覧」「素材ページ」など設置場所ごとに集計する。
 */
export function trackJobImpression(job: JobEventSource, placement: string): void {
    trackEvent("job_impression", { ...jobParams(job), placement });
}

/** 求人カードのクリック（＝求人詳細ページへの遷移）。 */
export function trackJobClick(job: JobEventSource, placement: string): void {
    trackEvent("job_click", { ...jobParams(job), placement });
}

/** 求人詳細ページの表示。 */
export function trackJobDetailView(job: JobEventSource): void {
    trackEvent("job_detail_view", jobParams(job));
}

/**
 * 施設・法人の公式採用ページへのクリック。
 * ⚠ 名前は job_apply_click だが、自主トレ素材庫上で応募が完了したことは意味しない。
 *   「公式採用ページへ遷移したクリック」として扱うこと。
 *   本サイトでは応募の受付・仲介を一切行っていない。
 */
export function trackJobApplyClick(job: JobEventSource): void {
    trackEvent("job_apply_click", jobParams(job));
}
