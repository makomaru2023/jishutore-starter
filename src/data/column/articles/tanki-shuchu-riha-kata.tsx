/**
 * コラム記事：短期集中リハの型（「3月以内」の起算日が違う）
 *
 * ★企画書§3-9の「型で括る図解」。訪問リハ・通所リハ・老健の6項目を1本で拾う。
 *
 * 出典は `src/data/fee-items/` の以下（いずれも verificationLevel: genpon）の
 * units / requirements ＝無料公開しているフィールドのみ。
 *   homon-riha-tanki-shuchu / homon-riha-ninchi-tanki-shuchu
 *   tsusho-riha-tanki-shuchu-kobetsu / tsusho-riha-ninchisho-tanki-shuchu
 *   roken-nyusho-tanki-shuchu-reha / roken-nyusho-ninchisho-tanki-shuchu-reha
 *
 * ★records / auditPoints / pitfalls はPlus限定なので本文にも図にも書かない。
 *
 * ★狙う検索語を fee-check とずらす（§3-9 危険2）。
 *   fee-check：「短期集中リハビリテーション実施加算 算定要件」
 *   この記事：「3月以内 いつから」「起算日」「違い」「図解」
 * ★既存の `ninchisho-tanki-shuchu-riha-tsusho`（通所リハの認知症短期集中・単体）とも問いが違う。
 *   あちらは1分野の算定条件、こちらは3分野横断の起算日。本文から相互リンクしてある。
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
                短期集中リハビリテーション実施加算は、訪問リハ・通所リハ・老健のどれにもあります。
                どれも期間は「3月以内」で共通です。
            </P>
            <P>
                ところが、その3月を
                <strong className="font-black text-slate-900">どこから数えるか</strong>
                が加算ごとに違いました。ここを取り違えると、期間そのものがずれます。
            </P>

            <H2>「3月以内」の起算日が4種類あります</H2>
            <Figure
                src="/column/tanki-shuchu-kisanbi.svg"
                alt="短期集中リハビリテーション実施加算と認知症短期集中リハビリテーション実施加算の起算日を、訪問リハ・通所リハ・老健の3分野で比べた表。訪問リハは短期集中が退院（所）日または認定日、認知症短期集中が退院（所）日または訪問開始日。通所リハは短期集中が退院（所）日または認定日、認知症短期集中が退院（所）日または通所開始日。老健はどちらも入所日。下部に、同じ分野の中でも短期集中と認知症短期集中で起算日が違うことがあると書かれている。"
                caption="退院（所）日・認定日・入所日・サービス開始日。数え始めが4種類あります。"
                width={800}
                height={410}
            />
            <P>
                訪問リハと通所リハの短期集中は、退院（所）日または認定日からです。
                認定日というのは、新たに要介護認定を受けた方について、その認定の効力が生じた日を指します。
            </P>
            <P>
                ところが同じ分野でも、認知症短期集中のほうは認定日ではありません。
                訪問リハなら訪問開始日、通所リハなら通所開始日です。
            </P>
            <Ul>
                <Li>
                    <strong className="font-black text-slate-900">老健</strong>
                    ：短期集中も認知症短期集中も、そろって入所日から
                </Li>
                <Li>
                    <strong className="font-black text-slate-900">訪問リハ・通所リハ</strong>
                    ：短期集中は認定日を見るが、認知症短期集中はサービスの開始日を見る
                </Li>
            </Ul>
            <P>
                老健がいちばん単純です。迷いやすいのは在宅系のほうで、
                同じ利用者について2つの加算を並べて考えるときに入れ替わりやすくなります。
            </P>
            <Note title="訪問リハの短期集中は「疾患の治療のために入院・入所した」ことが前提です">
                リハビリテーションを必要とする状態の原因となった疾患の治療のために入院・入所した
                病院・診療所・介護保険施設から退院（所）した日、という書き方になっています。
                退院（所）ならどれでもよいわけではありません。
            </Note>

            <H2>単位数がばらついているのは、認知症のほうではありません</H2>
            <Figure
                src="/column/tanki-shuchu-tanisu-hindo.svg"
                alt="短期集中リハビリテーション実施加算と認知症短期集中リハビリテーション実施加算の単位数と頻度を比べた図。短期集中は訪問リハが200単位/日、通所リハが110単位/日で名前だけ短期集中個別、老健が(Ⅰ)258・(Ⅱ)200単位/日。認知症短期集中は訪問リハが240単位/日で1週に2日まで、通所リハが(Ⅰ)240単位/日で1週に2日まで・(Ⅱ)1,920単位/月、老健が(Ⅰ)240・(Ⅱ)120単位/日で1週に3日まで。下部に、認知症の(Ⅰ)は3分野とも240単位/日でばらついているのは短期集中のほうであること、通所リハの(Ⅱ)だけは上限ではなく1月に4回以上の下限であることが書かれている。"
                caption="認知症の(Ⅰ)は3分野とも240単位。ばらついているのは短期集中のほうです。"
                width={800}
                height={440}
            />
            <P>
                名前の印象と逆で、そろっているのは認知症短期集中のほうでした。
                加算(Ⅰ)は訪問リハ・通所リハ・老健のいずれも240単位/日です。
            </P>
            <P>
                一方の短期集中は、訪問リハ200単位/日、通所リハ110単位/日、老健は(Ⅰ)258・(Ⅱ)200単位/日。
                通所リハだけは名前も違って「短期集中
                <strong className="font-black text-slate-900">個別</strong>
                リハビリテーション実施加算」です。
            </P>
            <Note tone="caution" title="通所リハの認知症(Ⅱ)だけ、回数の向きが逆です">
                週の上限は訪問リハが1週に2日、老健が1週に3日、通所リハの(Ⅰ)が1週に2日。
                ところが通所リハの(Ⅱ)は1,920単位/月で、
                <strong className="font-black text-slate-900">1月に4回以上</strong>
                の実施が要件です。ほかが上限なのに、ここだけ下限になります。
            </Note>
            <P>
                (Ⅱ)にはもうひとつ条件があって、リハビリテーションマネジメント加算の
                (イ)(ロ)(ハ)のいずれかを算定していることが要ります。
                実施頻度・実施場所・実施時間等を記載した通所リハビリテーション計画も必要です。
            </P>

            <H2>同時に取れない組み合わせがあります</H2>
            <P>
                3分野とも、短期集中と認知症短期集中の関係に制限がついています。
                中身は分野ごとに少しずつ違うので、そこだけ拾っておくのが早いです。
            </P>
            <Ul>
                <Li>
                    <strong className="font-black text-slate-900">訪問リハ</strong>
                    ：短期集中リハビリテーション実施加算を算定している場合、認知症短期集中は算定しません
                </Li>
                <Li>
                    <strong className="font-black text-slate-900">通所リハ</strong>
                    ：認知症短期集中または生活行為向上リハビリテーション実施加算を算定している場合、短期集中個別は算定しません
                </Li>
                <Li>
                    <strong className="font-black text-slate-900">老健</strong>
                    ：(Ⅰ)と(Ⅱ)はいずれか一方だけです（短期集中・認知症短期集中とも）
                </Li>
            </Ul>
            <P>
                訪問リハには回数の縛りもあります。認知症短期集中は、
                過去3月の間に同じ加算を算定していると算定できません。
            </P>
            <P>
                通所リハの認知症短期集中については
                <Link
                    href="/column/ninchisho-tanki-shuchu-riha-tsusho/"
                    className="mx-1 font-bold text-blue-700 hover:underline"
                >
                    その加算だけを扱った記事
                </Link>
                もあります。単位数と要件の原文は
                <Link
                    href="/fee-check/roken-nyusho/roken-nyusho-tanki-shuchu-reha/"
                    className="mx-1 font-bold text-blue-700 hover:underline"
                >
                    老健の短期集中リハビリテーション実施加算
                </Link>
                など、報酬チェックの各ページで確認できます。
            </P>

            <H2>おわりに</H2>
            <P>
                この加算群は、単位数を覚えるより先に「いつから3月か」を握るほうが実務では効くはずです。
                期間がずれると、金額ではなく算定そのものが崩れるからです。
            </P>
            <P>
                老健は入所日。在宅系は短期集中が認定日で、認知症短期集中がサービス開始日。
                この2行を手元に置いておけば、並べて考えるときにも入れ替わりません。
            </P>
        </>
    );
}

export const article: ColumnArticle = {
    slug: "tanki-shuchu-riha-kata",
    title: "短期集中リハの3月以内、どこから数えるかが違います",
    description:
        "短期集中リハビリテーション実施加算は訪問リハ・通所リハ・老健にあり、期間はどれも3月以内です。ただし起算日が退院（所）日・認定日・入所日・サービス開始日と分かれます。認知症短期集中は3分野とも240単位なのに、短期集中は200・110・258とばらつく点も図解にしました。",
    category: "fee-practice",
    publishedAt: "2026-08-16",
    updatedAt: "2026-08-16",
    takeaways: [
        "「3月以内」は共通ですが、どこから数えるかが加算ごとに違います",
        "老健は入所日から。在宅系は短期集中が認定日、認知症短期集中はサービス開始日です",
        "認知症短期集中の(Ⅰ)は3分野とも240単位/日。ばらついているのは短期集中のほうです",
        "通所リハの認知症(Ⅱ)だけ、週の上限ではなく「1月に4回以上」の下限になります",
    ],
    relatedFeeItems: [
        { domain: "roken-nyusho", id: "roken-nyusho-tanki-shuchu-reha" },
        { domain: "tsusho-riha", id: "tsusho-riha-tanki-shuchu-kobetsu" },
        { domain: "homon-riha", id: "homon-riha-tanki-shuchu" },
        { domain: "roken-nyusho", id: "roken-nyusho-ninchisho-tanki-shuchu-reha" },
        { domain: "tsusho-riha", id: "tsusho-riha-ninchisho-tanki-shuchu" },
        { domain: "homon-riha", id: "homon-riha-ninchi-tanki-shuchu" },
    ],
    cta: "plus",
    Body,
};
