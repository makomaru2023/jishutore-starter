export type AnnouncementKind = "material" | "feature" | "fix";

/** どの画面に出すか。無料サイトとPlus会員ページで出し分ける。 */
export type AnnouncementAudience = "public" | "plus";

export type Announcement = {
    /** ISO日付（"2026-07-18"）。表示側で整形する。 */
    date: string;
    kind: AnnouncementKind;
    title: string;
    body?: string;
    /** 詳細への内部リンク。省略するとリンクなしで表示する。 */
    href?: string;
    audience: readonly AnnouncementAudience[];
};

export const ANNOUNCEMENT_KIND_LABEL: Record<AnnouncementKind, string> = {
    material: "素材追加",
    feature: "新機能",
    fix: "改善",
};

/**
 * TODO（2026-08-19以降・無料サイトのトップページを次に改修するとき）:
 * **トップページにもTOPICSを追加するか検討する。**
 *
 * 現時点で入れていないのは、2026-07-26にトップ・素材一覧・カテゴリへ設置した
 * Plus実物導線（PlusRealPreviewBand）の効果を計測中で、同じページに要素を足すと
 * LP到達率の変化がどちらの効果なのか切り分けられなくなるため。計測の判定は8/9頃。
 *
 * 実装するときは、下の配列の `audience: "public"` のエントリを
 * PlusUpdateHistory と同じ見せ方で表示すればよい（データと getAnnouncements() は共用済み）。
 */

/**
 * サイトの更新履歴。**新しい順に、先頭へ足していく。**
 *
 * 素材データ（items.json）に追加日を持たせていないため、ここは手書きで運用する。
 * 素材の追加はR8.xバッチ単位（月1回・20〜25種）なので、バッチを公開したときに
 * 1エントリ足すだけでよい。
 *
 * 注意: 各エントリの数字は「その日時点のスナップショット」なので、あとから
 * 収録数が増えても書き換えないこと（public-counts.ts のハードコード禁止ルールは
 * 現在の収録数を示す表示が対象で、この更新履歴には適用しない）。
 */
export const ANNOUNCEMENTS: readonly Announcement[] = [
    {
        date: "2026-07-22",
        kind: "fix",
        title: "素材のタイトルと説明文を一括で見直しました",
        body: "イラストの内容と名称が食い違っていた素材を修正し、文字あり・文字なしのペアで名称を統一しました。",
        audience: ["public", "plus"],
    },
    {
        date: "2026-07-21",
        kind: "feature",
        title: "会員版「診療・介護報酬チェック」を新設しました",
        body: "算定要件の確認と、加算の組み合わせチェックを1ページにまとめました。",
        href: "/plus/fee-hub/",
        audience: ["plus"],
    },
    {
        date: "2026-07-21",
        kind: "feature",
        title: "会員ページへ戻るリンクをヘッダーとフッターに常設しました",
        body: "ブラウザを閉じたあとでも、サイトのどこからでも資料庫に戻れます。",
        audience: ["plus"],
    },
    {
        date: "2026-07-18",
        kind: "material",
        title: "Plusの収録スライドを187点に刷新しました",
        body: "無料イラストの文字ありバージョンを全点、そのまま編集できるPowerPoint形式にしました。",
        audience: ["plus"],
    },
    {
        date: "2026-07-12",
        kind: "feature",
        title: "加算の組み合わせチェックを追加しました",
        body: "同時に算定できる加算・できない加算を、選ぶだけで確認できます。",
        href: "/plus/fee-hub/?tab=combo",
        audience: ["plus"],
    },
    {
        date: "2026-07-01",
        kind: "material",
        title: "無料素材を25種（50点）追加しました",
        href: "/items/",
        audience: ["public"],
    },
];

/**
 * 指定した画面向けのお知らせを、新しい順で返す。
 * 手書き運用で並び順がずれても表示が崩れないよう、ここで日付ソートし直す。
 */
export function getAnnouncements(
    audience: AnnouncementAudience,
    limit?: number,
): readonly Announcement[] {
    const filtered = ANNOUNCEMENTS.filter((a) => a.audience.includes(audience)).sort(
        (a, b) => b.date.localeCompare(a.date),
    );
    return typeof limit === "number" ? filtered.slice(0, limit) : filtered;
}

/** "2026-07-18" → "2026/7/18" */
export function formatAnnouncementDate(date: string): string {
    const [year, month, day] = date.split("-");
    if (!year || !month || !day) return date;
    return `${year}/${Number(month)}/${Number(day)}`;
}
