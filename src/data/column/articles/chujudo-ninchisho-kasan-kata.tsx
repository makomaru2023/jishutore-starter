/**
 * コラム記事：中重度者ケア体制加算と認知症加算の型（割合＋追加配置＋専従1名）
 *
 * ★企画書§3-9の「型で括る図解」。通所介護・通所リハにまたがる3項目。
 *
 * 出典は `src/data/fee-items/` の以下（いずれも verificationLevel: genpon）の
 * units / requirements ＝無料公開しているフィールドのみ。
 *   tsusho-kaigo-chujudisha-care / tsusho-kaigo-ninchisho / tsusho-riha-chujudisha-care
 *
 * ★records / auditPoints / pitfalls はPlus限定なので本文にも図にも書かない。
 *
 * ★狙う検索語を fee-check とずらす（§3-9 危険2）。
 *   fee-check：「中重度者ケア体制加算 算定要件」
 *   この記事：「通所介護と通所リハの違い」「常勤換算」「割合」「図解」
 */

import Link from "next/link";
import { Figure, H2, Li, Note, P, Ul } from "@/components/column/ColumnProse";
import type { ColumnArticle } from "@/lib/column";

function Body() {
    return (
        <>
            <P>
                中重度者ケア体制加算と認知症加算は、どちらも「どんな方を受けているか」で決まる加算です。
                そこに人の配置が組み合わさります。
            </P>
            <P>
                並べてみると、そろえるものは3つで共通していました。
                違うのは割合の中身と、上乗せする人数のほうです。
            </P>

            <H2>そろえるのは、割合・上乗せ・専従の3つ</H2>
            <Figure
                src="/column/chujudo-3-set.svg"
                alt="中重度者ケア体制加算と認知症加算で共通する3つを示した図。1、利用者の割合（前年度、または算定月の前3月間で見る）。2、人を上乗せする（基準の員数に加えて常勤換算で確保する）。3、専従を1名置く（提供時間帯を通じて専らその業務に当たる）。下部に、2の「加えて」がポイントで基準の人数に含めて数えることはできないこと、共生型通所介護費を算定している場合はどちらの加算も算定しないことが書かれている。"
                caption="割合・上乗せ・専従。この3点セットはどちらの加算でも同じです。"
                width={800}
                height={320}
            />
            <P>
                割合は、前年度または算定日が属する月の前3月間で見ます。
                どちらで見るかを選べる形なので、事業所の状況に合わせて計算することになります。
            </P>
            <P>
                人の配置は、基準上の員数に
                <strong className="font-black text-slate-900">加えて</strong>
                確保することが要件です。もともと置いている人数に含めて数えることはできません。
            </P>
            <P>
                そのうえで、サービスを行う時間帯を通じて専らその業務に当たる人を1名以上。
                中重度者ケア体制加算なら看護職員、認知症加算なら研修を修了した者です。
            </P>
            <Note tone="caution" title="共生型通所介護費を算定していると、どちらも算定しません">
                通所介護の中重度者ケア体制加算・認知症加算はいずれも、
                共生型通所介護費（注7）を算定している場合は算定しないこととされています。
            </Note>

            <H2>割合の中身と、上乗せの人数が違います</H2>
            <Figure
                src="/column/chujudo-ninchisho-hikaku.svg"
                alt="中重度者ケア体制加算と認知症加算を比べた表。中重度者ケア体制加算の通所介護は要介護3〜5が30%以上、常勤換算2以上に加えて専従の看護職員1名で45単位。中重度者ケア体制加算の通所リハは要介護3〜5が30%以上、常勤換算1以上に加えて専従の看護職員1名で20単位。認知症加算の通所介護は認知症の方が15%以上、常勤換算2以上に加えて専従の研修修了者1名で60単位。下部に、単位は1日につきで、同じ中重度者ケア体制でも通所リハは追加配置が1以上で済むと書かれている。"
                caption="同じ「中重度者ケア体制加算」でも、通所リハは上乗せが1以上で済みます。"
                width={800}
                height={380}
            />
            <P>
                中重度者ケア体制加算の割合は、どちらも要介護3・4・5の方が30%以上です。ここは共通しています。
                違うのは上乗せする人数で、通所介護が常勤換算2以上、通所リハが1以上でした。
            </P>
            <P>
                単位数も45単位/日と20単位/日で差があります。
                求められる配置が軽いぶん、単位も低いという並びですね。
            </P>
            <Ul>
                <Li>
                    <strong className="font-black text-slate-900">認知症加算の割合は15%以上</strong>
                    ：日常生活に支障を来すおそれのある症状や行動があり、介護を必要とする認知症の方が対象です（留意事項通知では日常生活自立度Ⅲ・Ⅳ・M該当者とされています）
                </Li>
                <Li>
                    <strong className="font-black text-slate-900">認知症加算には会議もあります</strong>
                    ：従業者に対する認知症ケアの事例検討や技術的指導に係る会議を、定期的に開催することが要件です
                </Li>
            </Ul>
            <P>
                単位数と要件の原文は
                <Link
                    href="/fee-check/tsusho-kaigo/tsusho-kaigo-chujudisha-care/"
                    className="mx-1 font-bold text-blue-700 hover:underline"
                >
                    通所介護の中重度者ケア体制加算
                </Link>
                、
                <Link
                    href="/fee-check/tsusho-kaigo/tsusho-kaigo-ninchisho/"
                    className="mx-1 font-bold text-blue-700 hover:underline"
                >
                    認知症加算
                </Link>
                のページで確認できます。
            </P>

            <H2>おわりに</H2>
            <P>
                この2つは、加算を取りにいって体制を作るというより、
                いま受けている方の構成がそのまま出る加算だと思っています。
            </P>
            <P>
                だから確認の順番は、割合が先です。
                そこが届いていれば、上乗せと専従の2つを詰めればよい。逆にすると、人だけ置いて届かない形になります。
            </P>
        </>
    );
}

export const article: ColumnArticle = {
    slug: "chujudo-ninchisho-kasan-kata",
    title: "中重度者ケア体制加算と認知症加算、割合と人数の条件",
    description:
        "中重度者ケア体制加算と認知症加算は、割合・人の上乗せ・専従1名の3点セットで共通しています。違うのは割合の中身と人数で、中重度者は要介護3〜5が30%以上、認知症は15%以上。通所介護は常勤換算2以上、通所リハは1以上です。図解にしました。",
    category: "fee-practice",
    publishedAt: "2026-08-16",
    updatedAt: "2026-08-16",
    takeaways: [
        "どちらも「割合・人の上乗せ・専従1名」の3点セットです",
        "中重度者ケア体制加算は要介護3〜5が30%以上、認知症加算は認知症の方が15%以上です",
        "同じ中重度者ケア体制加算でも、上乗せは通所介護が常勤換算2以上、通所リハは1以上です",
        "人は基準の員数に「加えて」確保します。もともとの人数に含めて数えることはできません",
    ],
    relatedFeeItems: [
        { domain: "tsusho-kaigo", id: "tsusho-kaigo-chujudisha-care" },
        { domain: "tsusho-kaigo", id: "tsusho-kaigo-ninchisho" },
        { domain: "tsusho-riha", id: "tsusho-riha-chujudisha-care" },
    ],
    cta: "plus",
    Body,
};
