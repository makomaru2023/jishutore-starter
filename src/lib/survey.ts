/**
 * アンケート導線の「出し過ぎない」制御。
 * --------------------------------------------------------------
 * 方針：
 * - 割り込み型の導線（DL後トースト／条件付きバナー）は、
 *   閉じた・クリックした人には30日間出さない。
 * - さらに1セッションにつき1回まで。ページを移動するたびに出るのを防ぐ。
 * - 常設の導線（フッターリンク・報酬チェック下部のカード）はこの制御の対象外。
 *   ページの一部として静かに置いてあるだけなので、消すとかえって不自然になる。
 * - storage が使えない環境（プライベートモード等）でもエラーにしない。
 */

/** 閉じた／クリックしたあと、再表示しない期間（日） */
export const SURVEY_SUPPRESS_DAYS = 30;

const SUPPRESS_MS = SURVEY_SUPPRESS_DAYS * 24 * 60 * 60 * 1000;

/** 「閉じた」の記録（localStorage・期限つき） */
const DISMISSED_KEY = "surveyDismissed";
/** 「回答リンクを押した」の記録（localStorage・期限つき） */
const CLICKED_KEY = "surveyClicked";
/** このセッションで割り込み型の導線を出したか（sessionStorage） */
const SESSION_KEY = "surveyPromptShownSession";

function isBefore(key: string): boolean {
    try {
        const until = window.localStorage.getItem(key);
        return Boolean(until) && Date.now() < Number(until);
    } catch {
        return false;
    }
}

function stamp(key: string): void {
    try {
        window.localStorage.setItem(key, String(Date.now() + SUPPRESS_MS));
    } catch {
        /* storage 不可でも操作は成立させる */
    }
}

/** 閉じた・回答した人かどうか（30日以内） */
export function isSurveySuppressed(): boolean {
    if (typeof window === "undefined") return true;
    return isBefore(DISMISSED_KEY) || isBefore(CLICKED_KEY);
}

/** 割り込み型の導線を出してよいか */
export function canShowSurveyPrompt(): boolean {
    if (typeof window === "undefined") return false;
    if (isSurveySuppressed()) return false;
    try {
        if (window.sessionStorage.getItem(SESSION_KEY)) return false;
    } catch {
        /* storage 不可なら表示は許可する */
    }
    return true;
}

/** 割り込み型の導線を出した記録（このセッション内はもう出さない） */
export function markSurveyPromptShown(): void {
    if (typeof window === "undefined") return;
    try {
        window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
        /* noop */
    }
}

/** 「閉じる」を押されたときの記録 */
export function markSurveyDismissed(): void {
    if (typeof window === "undefined") return;
    stamp(DISMISSED_KEY);
}

/** 回答リンクを押されたときの記録。常設の導線からも呼ぶ。 */
export function markSurveyClicked(): void {
    if (typeof window === "undefined") return;
    stamp(CLICKED_KEY);
}
