/**
 * コラム記事：居宅訪問が要る通所の加算は「型」が同じ
 *
 * ★これは企画書§3-9の「型で括る図解」の1本目。個別の加算ではなく、
 *   複数の項目に共通する進み方を1枚の図にして、5項目の fee-check ページから呼ぶ。
 *
 * 出典は `src/data/fee-items/` の以下（いずれも verificationLevel: genpon）の
 * units / requirements ＝無料公開しているフィールドのみ。
 *   tsusho-kaigo-nyuyoku-kaijo / tsusho-kaigo-kobetsu-kinou
 *   tsusho-riha-nyuyoku-kaijo / tsusho-riha-seikatsu-koui-kojo / tsusho-riha-eiyo-kaizen
 *
 * ★records / auditPoints / pitfalls はPlus限定なので本文にも図にも書かない。
 *   図に描いてよいのは箱の名前（訪問→計画→実施→再訪問）まで。
 *   訪問時に何を記録に残すかは箱の中身なので描かない（§3-9 危険1）。
 *
 * ★狙う検索語を fee-check とずらす（同§3-9 危険2）。
 *   fee-check：「入浴介助加算 算定要件」等／この記事：「居宅訪問」「訪問の頻度」「型」「図解」
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
                通所の加算を読んでいると、「利用者の居宅を訪問し」という一文に何度もぶつかります。
                入浴介助加算(Ⅱ)にも、個別機能訓練加算にも、生活行為向上リハビリテーション実施加算にも出てきます。
            </P>
            <P>
                加算ごとに要件を読み直していると、毎回はじめから読む感じになってしまう。
                でも並べてみると、進み方はほとんど同じでした。
            </P>

            <H2>4つの加算に、同じ4段階が入っています</H2>
            <Figure
                src="/column/kyotaku-homon-kata-flow.svg"
                alt="居宅を訪問する加算に共通する4段階を示した図。1、訪問して見る（動作・環境・生活の様子）。2、計画を作る（多職種で共同して）。3、計画に沿って行う（通所での提供が中心）。4、また訪問する（進み具合を見て見直す）。下部に、4番目をどのくらいの間隔でやるかが加算によって違うと書かれている。"
                caption="訪問して見る、計画を作る、行う、また訪問する。骨格はどれも同じです。"
                width={800}
                height={300}
            />
            <P>
                最初の訪問で見るものは、加算によって少しずつ違います。
                入浴介助加算(Ⅱ)なら浴室での動作と浴室環境、個別機能訓練加算なら居宅での生活状況です。
            </P>
            <P>
                ただ「通所の事業所にいるだけでは分からないことを、家に行って確かめる」という点は共通しています。
                そのうえで多職種が共同して計画を作り、計画に沿って提供する。ここまでが前半です。
            </P>
            <Note title="計画は独立した書類でなくてもよい場合があります">
                入浴介助加算(Ⅱ)の個別の入浴計画は、通所介護計画や通所リハビリテーション計画に
                相当する内容を記載することで代えられます。書類を1枚増やすかどうかは、要件の側では決めていません。
            </Note>

            <H2>違うのは、また訪問するまでの間隔です</H2>
            <Figure
                src="/column/kyotaku-homon-kankaku.svg"
                alt="居宅を訪問する加算ごとの訪問の間隔を比べた図。生活行為向上リハビリテーション実施加算（通所リハ）はおおむね1月に1回以上。個別機能訓練加算（通所介護）は3月ごとに1回以上。栄養改善加算（通所リハ）は必要に応じて。入浴介助加算(Ⅱ)（通所介護・通所リハ）ははじめの評価で訪問。"
                caption="間隔がいちばん短いのは生活行為向上リハ、いちばん長いのが個別機能訓練加算です。"
                width={800}
                height={396}
            />
            <P>
                生活行為向上リハビリテーション実施加算は、おおむね1月に1回以上です。
                事業所の医師、または医師の指示を受けた理学療法士・作業療法士・言語聴覚士が居宅を訪問し、
                生活行為に関する評価を行います。
            </P>
            <P>
                個別機能訓練加算は3月ごとに1回以上。訪問して進捗を評価し、計画を見直すところまでが要件です。
                栄養改善加算は「必要に応じて」なので、間隔そのものは決められていません。
            </P>
            <Ul>
                <Li>
                    <strong className="font-black text-slate-900">おおむね1月に1回以上</strong>
                    ：生活行為向上リハビリテーション実施加算（通所リハ）
                </Li>
                <Li>
                    <strong className="font-black text-slate-900">3月ごとに1回以上</strong>
                    ：個別機能訓練加算（通所介護）
                </Li>
                <Li>
                    <strong className="font-black text-slate-900">必要に応じて</strong>
                    ：栄養改善加算（通所リハ）
                </Li>
            </Ul>
            <P>
                この差は、そのまま人の配りやすさに直結します。
                同じ「居宅訪問」でも、月1回と3月に1回では回し方がまるで別物になるからです。
            </P>

            <H2>訪問が難しいときのやり方も決まっています</H2>
            <P>
                入浴介助加算(Ⅱ)には、医師等による居宅訪問が困難な場合の取り扱いが要件に書かれています。
                医師等の指示の下で介護職員が居宅を訪問し、情報通信機器等を活用して医師等が評価と助言を行う形です。
            </P>
            <P>
                この場合、利用者等の同意が必要になります。
                「行けないから省略する」ではなく「行き方を変える」という書き方になっているところが、この加算の特徴でしょう。
            </P>
            <Note tone="caution" title="浴室環境そのものへの助言も要件に入っています">
                居宅の浴室が、利用者自身や家族等の介助では入浴が難しい環境にある場合は、
                訪問した医師等が介護支援専門員または福祉用具専門相談員と連携し、
                福祉用具の貸与・購入や住宅改修などの浴室環境整備について助言することとされています（通所リハ）。
            </Note>
            <P>
                加算ごとの単位数と要件の原文、根拠になる告示へのリンクは報酬チェックにあります。
                <Link
                    href="/fee-check/tsusho-kaigo/tsusho-kaigo-kobetsu-kinou/"
                    className="mx-1 font-bold text-blue-700 hover:underline"
                >
                    個別機能訓練加算
                </Link>
                、
                <Link
                    href="/fee-check/tsusho-kaigo/tsusho-kaigo-nyuyoku-kaijo/"
                    className="mx-1 font-bold text-blue-700 hover:underline"
                >
                    入浴介助加算（通所介護）
                </Link>
                、
                <Link
                    href="/fee-check/tsusho-riha/tsusho-riha-seikatsu-koui-kojo/"
                    className="mx-1 font-bold text-blue-700 hover:underline"
                >
                    生活行為向上リハビリテーション実施加算
                </Link>
                のページです。
            </P>

            <H2>おわりに</H2>
            <P>
                加算を1本ずつ覚えようとすると、数が多すぎて手に負えません。
                でも型で括ってしまえば、覚えるのは「4段階の骨格」と「加算ごとに違うところ」の2つだけになります。
            </P>
            <P>
                今回の型でいえば、違うのは訪問の間隔と、最初の訪問で何を見るか。
                そこだけ表にして手元に置いておけば、要件を毎回はじめから読み直さずに済むはずです。
            </P>
        </>
    );
}

export const article: ColumnArticle = {
    slug: "kyotaku-homon-kasan-kata",
    title: "居宅訪問が要る通所の加算、流れは同じで間隔だけ違います",
    description:
        "通所の加算には「利用者の居宅を訪問し」が何度も出てきます。入浴介助加算(Ⅱ)、個別機能訓練加算、生活行為向上リハビリテーション実施加算、栄養改善加算。訪問して見る、計画を作る、行う、また訪問する。流れは同じで、違うのは訪問の間隔でした。図解にしています。",
    category: "fee-practice",
    publishedAt: "2026-08-16",
    updatedAt: "2026-08-16",
    takeaways: [
        "居宅訪問が要る通所の加算は、4段階の同じ流れでできています",
        "違うのは「また訪問する」間隔です。1月に1回、3月に1回、必要に応じてと分かれます",
        "入浴介助加算(Ⅱ)には、医師等の訪問が難しいときの代わりのやり方も書かれています",
    ],
    relatedFeeItems: [
        { domain: "tsusho-kaigo", id: "tsusho-kaigo-kobetsu-kinou" },
        { domain: "tsusho-kaigo", id: "tsusho-kaigo-nyuyoku-kaijo" },
        { domain: "tsusho-riha", id: "tsusho-riha-seikatsu-koui-kojo" },
        { domain: "tsusho-riha", id: "tsusho-riha-nyuyoku-kaijo" },
        { domain: "tsusho-riha", id: "tsusho-riha-eiyo-kaizen" },
    ],
    cta: "plus",
    Body,
};
