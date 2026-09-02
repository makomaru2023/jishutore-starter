/**
 * 有償掲載であることを示すラベル。
 * ================================================================
 * ★対価を受けて載せているものには、必ずこれを付ける。
 *   一般の閲覧者が「サイトの記事・素材」と「広告」を見分けられない表示は、
 *   景品表示法の指定告示（いわゆるステルスマーケティング規制、2023年10月1日施行）で
 *   不当表示とされている。求人掲載も掲載料をいただいている以上、同じ扱いにする。
 *
 * ★「編集部おすすめ」「イチオシ」のような、当サイトが中立に選んだように見える
 *   言い回しと一緒に使わないこと。ラベルを付けても、周りの文言が誤認させたら意味がない。
 *
 * ★どの語を使うか
 *   variant="pr"        … 汎用。カード上の短いバッジ
 *   variant="ad"        … 純粋な広告枠
 *   variant="sponsor"   … スポンサー枠（継続的な支援の掲出）
 *   variant="job-ad"    … 求人広告。求人であることまで示したいとき
 *
 * サイズは、カードの他のバッジ（職種バッジ・雇用形態バッジ）と揃えてある。
 * 新しい配色は足していない（グレーの枠線＋白背景で、本文より弱く見せる）。
 */

export type AdLabelVariant = "pr" | "ad" | "sponsor" | "job-ad";

const LABELS: Record<AdLabelVariant, string> = {
    pr: "PR",
    ad: "広告",
    sponsor: "スポンサー",
    "job-ad": "求人広告",
};

export function AdLabel({
    variant = "pr",
    className = "",
}: {
    variant?: AdLabelVariant;
    className?: string;
}) {
    return (
        <span
            className={`inline-flex shrink-0 items-center rounded-md border border-slate-300 bg-white px-2 py-0.5 text-xs font-black tracking-wider text-slate-500 ${className}`}
        >
            {LABELS[variant]}
        </span>
    );
}

/**
 * 一覧ページの上部などに置く、有償掲載であることの説明文。
 * ラベルだけでは「何が有償なのか」が伝わらない場所で使う。
 */
export function AdDisclosureNote({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <p className={`jp-text text-xs leading-6 text-slate-500 ${className}`}>{children}</p>
    );
}
