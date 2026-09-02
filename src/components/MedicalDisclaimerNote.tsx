/**
 * 自主トレ素材を使うときの注意書き。
 * ================================================================
 * ★素材の説明文（items.json）は、運動の目的・一般的な使われ方として書いている。
 *   効果を約束するものではないこと、適応は個別に違うことを、
 *   説明文と同じ画面の中で示すためのブロック。
 *
 * ★掲げている4点は、どの運動素材にも共通して必要な注意にしぼってある。
 *   素材ごとの禁忌は items.json の exercisePoint / targetCondition に書く。
 *
 * variant:
 *   "full"    … 素材詳細ページ。運動のポイント・対象疾患の直下に置く
 *   "compact" … 一覧・カテゴリページ。1段落だけの短い版
 */

export function MedicalDisclaimerNote({
    variant = "full",
    className = "",
}: {
    variant?: "full" | "compact";
    className?: string;
}) {
    if (variant === "compact") {
        return (
            <p
                className={`rounded-xl border border-slate-200 bg-white p-4 text-xs leading-6 text-slate-500 ${className}`}
            >
                掲載している素材は、リハビリテーション専門職・介護職の方が指導や説明の補助として使うことを想定したものです。運動の適応は、疾患、術式、経過、身体機能によって異なります。主治医・担当の専門職の指示がある場合はその指示を優先し、対象者の状態に合わせてご使用ください。
            </p>
        );
    }

    return (
        <section
            className={`rounded-2xl border border-amber-200 bg-amber-50/60 p-5 md:p-6 ${className}`}
            aria-label="ご使用にあたっての注意"
        >
            <h2 className="text-sm font-bold text-amber-800">ご使用にあたっての注意</h2>
            <p className="mt-2 text-sm leading-7 text-slate-700">
                この素材は、リハビリテーション専門職・介護職の方が、指導や説明の補助として使うことを想定して作成しています。診断や治療そのものではなく、個別の医学的判断に代わるものではありません。記載している内容は、この運動が一般にどのような目的で用いられるかを示すもので、効果を保証するものではありません。
            </p>
            <ul className="mt-3 space-y-1.5 text-sm leading-7 text-slate-700">
                <li className="flex gap-2">
                    <span aria-hidden="true" className="text-amber-600">・</span>
                    <span className="min-w-0">運動の適応・禁忌は、疾患、術式、経過、合併症、身体機能によって異なります。</span>
                </li>
                <li className="flex gap-2">
                    <span aria-hidden="true" className="text-amber-600">・</span>
                    <span className="min-w-0">主治医・担当のリハビリテーション専門職の指示がある場合は、その指示を優先してください。</span>
                </li>
                <li className="flex gap-2">
                    <span aria-hidden="true" className="text-amber-600">・</span>
                    <span className="min-w-0">回数・負荷・頻度は、対象者の状態に合わせて調整してください。記載の回数はめやすです。</span>
                </li>
                <li className="flex gap-2">
                    <span aria-hidden="true" className="text-amber-600">・</span>
                    <span className="min-w-0">実施中や実施後に、痛み、しびれ、めまい、動悸、息切れ、強い疲労が現れた場合は中止し、医療機関にご相談ください。</span>
                </li>
            </ul>
        </section>
    );
}
