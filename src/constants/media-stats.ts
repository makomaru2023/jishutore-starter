/**
 * 媒体データ（広告・スポンサー・求人掲載の営業ページが共通で見る数字）。
 * ================================================================
 * ★2026-09-05 新設。/jobs/posting/ と /sponsor/ が別々の数字を持っていて、
 *   求人LPは8月実績（2,926人）、スポンサーLPは期間の分からない
 *   「直近3か月 検索クリック235回／表示2,084回」を出していた。
 *   同じ媒体を2つの数字で説明している状態だったので、ここ1本にまとめた。
 *
 * 【このファイルに書いてよい数字の条件】
 *   1. 出典（どのツールの、どの指標か）が言える
 *   2. 計測期間（何月ぶんか）が言える
 *   3. 実際に確認した値である
 *   ★3つのどれかが言えない指標は、ここに書かずに公開ページから外すこと。
 *     職業安定法第5条の4は、募集情報等提供事業者に対しても
 *     「虚偽の表示又は誤解を生じさせる表示」を禁じている。
 *     広告の側でも、根拠を示せない数字は景品表示法上の問題になりうる。
 *
 * ⚠ アクティブユーザーは「サイト全体の利用者数」。
 *   全員がPT・OT・ST、転職希望者、広告を見た人、のいずれでもない。
 *   ページの文言でもそう書かないこと（そのための注記が MONTHLY_USERS.caution）。
 */

/**
 * 月間ユーザー数。
 * ★更新するのはここだけ。求人LPもスポンサーLPも同じ値を見る。
 *   次は9月が確定したら value と month を差し替える。
 */
export const MONTHLY_USERS = {
    /** GA4のアクティブユーザー（月間） */
    value: 2926,
    /** 上の値の計測月 */
    month: "2026年8月",
    /** 指標名。ページ上の表記もこの言い方に揃える */
    metric: "アクティブユーザー（月間）",
    /** 出典 */
    source: "Google Analytics 4",
    /**
     * 表示のしかた。
     * "floor" … 100人単位で切り下げて「2,900人以上」（実数が動いても表記が揺れない）
     * "exact" … 「2,926人」と実数で出す
     */
    displayMode: "floor" as "floor" | "exact",
    /** 誤解を防ぐための注記。数字を出すページには必ず添える */
    caution:
        "サイト全体の利用者数です。職種の内訳は確認できていないため、全員がリハビリ職とは限りません。",
} as const;

/** 「月間 2,900人以上」のような表記を組み立てる。 */
export function formatMonthlyActiveUsers(): string {
    const { value, displayMode } = MONTHLY_USERS;
    if (displayMode === "exact") {
        return `月間 ${value.toLocaleString("ja-JP")}人`;
    }
    const floored = Math.floor(value / 100) * 100;
    return `月間 ${floored.toLocaleString("ja-JP")}人以上`;
}

/** 「（2026年8月実績・Google Analytics 4）」のような注記。 */
export function formatMeasurementNote(): string {
    return `${MONTHLY_USERS.month}実績・${MONTHLY_USERS.source}`;
}

/** 媒体の運営開始月。 */
export const MEDIA_LAUNCH = "2026年3月";

/**
 * 過去の参考資料として残しているグラフ。
 * ★現在の実績と誤認させないため、必ず「いつの図か」を画面に出す。
 *   数字そのものを本文に書き写さない（期間が古いまま独り歩きするため）。
 */
export const MEDIA_LEGACY_CHART = {
    src: "/images/sponsor-performance-2026-spring.png",
    alt: "自主トレ素材庫 2026年3月から5月までの3ヶ月間の推移",
    width: 1672,
    height: 941,
    period: "2026年3月〜5月",
} as const;
