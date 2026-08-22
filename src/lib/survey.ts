/**
 * アンケート導線の「出し過ぎない」制御。
 * --------------------------------------------------------------
 * 判定ルール（2026-08-22 仕様）：
 *
 *   surveyClicked === "true"          → 今後ずっと表示しない（回答してくれた人には二度と聞かない）
 *   surveyDismissedAt が7日以内       → 表示しない
 *   surveyDismissedAt から7日以上経過 → 次のダウンロードで再表示してよい
 *   さらに、同一セッションでは何枚ダウンロードしても1回だけ
 *
 * 対象は割り込み型の導線（DL後トースト／条件付きバナー）のみ。
 * 常設の導線（フッターリンク・報酬チェック下部のカード）は対象外で、
 * ページの一部として静かに置いてある。ただしクリックされたら surveyClicked は立てる。
 *
 * storage が使えない環境（プライベートモード等）でもエラーにしない。
 */

/** 「閉じる」を押されたあと、再表示しない期間（日） */
export const SURVEY_DISMISS_DAYS = 7;

const DISMISS_MS = SURVEY_DISMISS_DAYS * 24 * 60 * 60 * 1000;

/** 回答リンクを押した記録（localStorage・期限なし） */
const CLICKED_KEY = "surveyClicked";
/** 「閉じる」を押した時刻（localStorage・7日で失効） */
const DISMISSED_AT_KEY = "surveyDismissedAt";
/**
 * セッション内で出したかの記録。
 * ★DL後トーストとバナーで枠を分けている。
 *   同じ枠にすると「トップ→コラムと2ページ見てバナーが出た人」は、
 *   そのあと素材をダウンロードしてもトーストが出なくなる。
 *   素材DL後がいちばん大事なタイミングなので、そこはバナーに潰させない。
 */
const TOAST_SESSION_KEY = "surveyToastShownSession";
const BANNER_SESSION_KEY = "surveyBannerShownSession";

/**
 * 旧仕様（30日一律・値は失効時刻）で書かれたキー。
 * 意味が変わったので読まずに消す。消しても最悪もう一度アンケートが出るだけ。
 */
const LEGACY_DISMISSED_KEY = "surveyDismissed";

function read(key: string): string | null {
    try {
        return window.localStorage.getItem(key);
    } catch {
        return null;
    }
}

function write(key: string, value: string): void {
    try {
        window.localStorage.setItem(key, value);
    } catch {
        /* storage 不可でも操作は成立させる */
    }
}

/** 回答リンクを押した人か（期限なし） */
export function hasClickedSurvey(): boolean {
    if (typeof window === "undefined") return true;
    return Boolean(read(CLICKED_KEY));
}

/** 「閉じる」から7日以内か */
export function isWithinDismissWindow(): boolean {
    if (typeof window === "undefined") return true;
    try {
        window.localStorage.removeItem(LEGACY_DISMISSED_KEY);
    } catch {
        /* noop */
    }
    const at = Number(read(DISMISSED_AT_KEY));
    if (!at) return false;
    return Date.now() - at < DISMISS_MS;
}

function sessionHas(key: string): boolean {
    try {
        return Boolean(window.sessionStorage.getItem(key));
    } catch {
        return false; // storage 不可なら表示は許可する
    }
}

/**
 * 割り込み型の導線を出してよいか。
 * scope: "toast"  = 素材ダウンロード後のトースト（最優先。バナーに邪魔させない）
 *        "banner" = 条件付きバナー（トーストが既に出ていたら遠慮する）
 */
export function canShowSurveyPrompt(scope: "toast" | "banner" = "toast"): boolean {
    if (typeof window === "undefined") return false;
    if (hasClickedSurvey()) return false;
    if (isWithinDismissWindow()) return false;
    if (scope === "toast") {
        return !sessionHas(TOAST_SESSION_KEY);
    }
    return !sessionHas(BANNER_SESSION_KEY) && !sessionHas(TOAST_SESSION_KEY);
}

/** 割り込み型の導線を出した記録（このセッション内はその枠をもう使わない） */
export function markSurveyPromptShown(scope: "toast" | "banner" = "toast"): void {
    if (typeof window === "undefined") return;
    try {
        window.sessionStorage.setItem(scope === "toast" ? TOAST_SESSION_KEY : BANNER_SESSION_KEY, "1");
    } catch {
        /* noop */
    }
}

/** 「閉じる」を押されたときの記録。7日後にまた出せるよう、時刻を残す。 */
export function markSurveyDismissed(): void {
    if (typeof window === "undefined") return;
    write(DISMISSED_AT_KEY, String(Date.now()));
}

/** 回答リンクを押されたときの記録。常設の導線からも呼ぶ。 */
export function markSurveyClicked(): void {
    if (typeof window === "undefined") return;
    write(CLICKED_KEY, "true");
}
