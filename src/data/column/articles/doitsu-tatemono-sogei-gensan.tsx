/**
 * コラム記事：同一建物減算の型（訪問は率・通所は定額／「同一建物」の範囲が違う）
 *
 * ★企画書§3-9の「型で括る図解」。減算の型のうち「移動していない分が引かれる」グループ。
 *
 * 出典は `src/data/fee-items/` の以下（いずれも verificationLevel: genpon）の
 * units / requirements ＝無料公開しているフィールドのみ。
 *   homon-riha-doitsu-tatemono-gensan / homon-kango-riha-doitsu-tatemono-gensan
 *   tsusho-kaigo-doitsu-tatemono-gensan / tsusho-riha-doitsu-tatemono-gensan
 *   tsusho-kaigo-sogei-gensan / tsusho-riha-sogei-gensan
 *
 * ★records / auditPoints / pitfalls はPlus限定なので本文にも図にも書かない。
 *
 * ★狙う検索語を fee-check とずらす（§3-9 危険2）。
 *   fee-check：「同一建物減算 算定要件」／この記事：「同一建物 範囲」「訪問 通所 違い」「送迎減算 併用」「図解」
 *
 * ★将来 partial にするときの切り場所：本文は全体が「知識」なのでそのまま無料側に残す。
 */

import Link from "next/link";
import { Figure, H2, Li, Note, P, Ul } from "@/components/column/ColumnProse";
import type { ColumnArticle } from "@/lib/column";

function Body() {
    return (
        <>
            <P>
                同一建物減算は、訪問系にも通所系にもあります。
                名前が同じなので、ひとつ覚えれば済むように見えてしまう。
            </P>
            <P>
                でも中身は二重に違っていました。引き方も違うし、「同一建物」が指す範囲も違います。
                そこを取り違えると、金額ではなく対象そのものを間違えます。
            </P>

            <H2>訪問系は率、通所系は定額です</H2>
            <Figure
                src="/column/doitsu-tatemono-hoshiki.svg"
                alt="同一建物減算の引き方の違いを示した図。訪問系（訪問リハビリテーション・訪問看護）は率で引き、同一敷地内建物等または同一建物に20人以上で100分の90、50人以上の建物なら100分の85。通所系（通所介護・通所リハビリテーション）は定額で引き、同一建物に居住する方または同一建物から通う方について94単位/日、送迎が必要と認められる方は対象外。下部に、通所系には送迎を行わない場合の減算（47単位/片道）も別にあると書かれている。"
                caption="訪問系はパーセント、通所系は単位。まず仕組みが違います。"
                width={800}
                height={380}
            />
            <P>
                訪問リハビリテーションと訪問看護は、所定単位数の100分の90です。
                対象は、事業所と同一敷地内建物等に居住する方か、同一建物に20人以上が居住している場合の利用者になります。
            </P>
            <P>
                さらにその上があって、同一敷地内建物等に50人以上が居住する建物なら100分の85です。
                住んでいる人数で減算率が段になっている、という作りですね。
            </P>
            <P>
                通所介護と通所リハビリテーションは94単位/日を引きます。率ではなく定額なので、
                要介護度が重い方でも軽い方でも引かれる単位は同じです。
            </P>
            <Note title="通所系には、送迎が必要と認められる方の例外があります">
                傷病その他やむを得ない事情により送迎が必要であると認められる利用者に対して送迎を行った場合は、
                同一建物減算を適用しないこととされています。
            </Note>

            <H2>「同一建物」の範囲が、訪問と通所で違います</H2>
            <Figure
                src="/column/doitsu-tatemono-hani.svg"
                alt="「同一建物」の範囲が訪問系と通所系で違うことを示した表。構造上・外形上、一体的な建物は訪問系も通所系も対象になる。同一敷地内の別棟は、訪問系は対象になりうるが通所系は該当しない。道路を挟んで隣接する建物も、訪問系は対象になりうるが通所系は該当しない。下部に、訪問系は位置関係だけで機械的に当てず、迂回が必要な場合などは適用すべきでないとされていると書かれている。"
                caption="同じ言葉でも指す範囲が違います。ここが取り違えやすいところです。"
                width={800}
                height={400}
            />
            <P>
                訪問系の「同一敷地内建物等」は、事業所と構造上・外形上一体的な建物に加えて、
                同一敷地内や隣接する敷地の建物も含みます。効率的なサービス提供が可能なもの、という条件つきです。
            </P>
            <P>
                いっぽう通所系の「同一建物」は、事業所と構造上または外形上、一体的な建築物だけを指します。
                <strong className="font-black text-slate-900">同一敷地内にある別棟や、道路を挟んで隣接する建物は該当しません</strong>
                。
            </P>
            <Ul>
                <Li>事業所の一階部分が事業所で、上の階が住居 → どちらも対象</Li>
                <Li>渡り廊下でつながっている → 一体的な建築物なので通所系でも対象</Li>
                <Li>同じ敷地の中の別の棟 → 訪問系は対象になりうる。通所系は該当しない</Li>
            </Ul>
            <Note tone="caution" title="訪問系は位置関係だけで機械的に当てません">
                広大な敷地に建物が点在している場合や、道路・河川で隔てられていて迂回が必要な場合など、
                効率的なサービス提供につながらないケースには適用すべきでないとされています。
                地図の上で近いかどうかだけでは決まりません。
            </Note>
            <P>
                なお通所系では、建物の管理・運営法人が事業者と違っていても、
                構造上または外形上の要件に当てはまれば同一建物として扱うことになります。
                法人が別だから対象外、とはなりません。
            </P>

            <H2>送迎減算とは重なりません</H2>
            <P>
                通所系にはもうひとつ、送迎を行わない場合の減算があります。片道につき47単位です。
                利用者が自分で通う場合や、家族等が送迎する場合が対象になります。
            </P>
            <P>
                この2つは重ならないことになっています。同一建物減算の対象になっている場合は、
                送迎減算のほうは適用しません。どちらも「移動していない分」を見ているので、二重には引かないという整理です。
            </P>
            <Note title="送迎減算には、適用しない扱いがいくつかあります">
                送迎業務を第三者へ委託し、受託事業者が居宅と事業所の間の送迎を行った場合は、送迎減算は適用されません。
                また利用者の居住実態がある場所で、事業所のサービス提供範囲内など運営上支障がなく、
                利用者と家族それぞれの同意が得られている場合は、その場所と事業所の間の送迎について減算を適用しない取扱いがあります（通所リハ）。
            </Note>
            <P>
                各減算の単位数と要件の原文、根拠になる告示へのリンクは報酬チェックにあります。
                <Link
                    href="/fee-check/homon-riha/homon-riha-doitsu-tatemono-gensan/"
                    className="mx-1 font-bold text-blue-700 hover:underline"
                >
                    訪問リハビリテーションの同一建物減算
                </Link>
                、
                <Link
                    href="/fee-check/tsusho-kaigo/tsusho-kaigo-doitsu-tatemono-gensan/"
                    className="mx-1 font-bold text-blue-700 hover:underline"
                >
                    通所介護の同一建物減算
                </Link>
                のページです。
            </P>

            <H2>おわりに</H2>
            <P>
                同一建物減算でつまずくのは、たいてい単位数のほうではありません。
                「うちのこの建物は対象なのか」という、範囲の判断のほうです。
            </P>
            <P>
                訪問なら敷地や隣接まで見る。通所なら一体的な建築物かどうかだけ見る。
                この一行を握っておけば、少なくとも対象を取り違えることはなくなります。
            </P>
        </>
    );
}

export const article: ColumnArticle = {
    slug: "doitsu-tatemono-sogei-gensan",
    title: "同一建物減算、訪問と通所で「同一建物」の範囲が違います",
    description:
        "同一建物減算は、訪問系が率で引き（100分の90、50人以上なら85）、通所系は定額で引きます（94単位/日）。しかも「同一建物」の指す範囲が違い、通所系は同一敷地内の別棟や道路を挟んだ隣接を含みません。送迎減算との関係もあわせて図解にしました。",
    category: "fee-practice",
    publishedAt: "2026-08-15",
    updatedAt: "2026-08-15",
    takeaways: [
        "訪問系は率で引き、通所系は定額で引きます。まず仕組みが違います",
        "「同一建物」の範囲が違います。通所系は同一敷地内の別棟や道路を挟んだ隣接を含みません",
        "同一建物減算の対象になっている場合、送迎減算は重ねてかかりません",
    ],
    relatedFeeItems: [
        { domain: "homon-riha", id: "homon-riha-doitsu-tatemono-gensan" },
        { domain: "tsusho-kaigo", id: "tsusho-kaigo-doitsu-tatemono-gensan" },
        { domain: "tsusho-riha", id: "tsusho-riha-doitsu-tatemono-gensan" },
        { domain: "tsusho-riha", id: "tsusho-riha-sogei-gensan" },
        { domain: "tsusho-kaigo", id: "tsusho-kaigo-sogei-gensan" },
        { domain: "homon-kango-riha", id: "homon-kango-riha-doitsu-tatemono-gensan" },
    ],
    cta: "plus",
    Body,
};
