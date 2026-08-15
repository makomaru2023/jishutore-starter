/**
 * コラム記事：未実施減算の型（委員会・指針・研修・担当者）
 *
 * ★企画書§3-9の5つの型のうち最後の未着手だった「減算の型」。
 *
 * 出典は `src/data/fee-items/` の以下（いずれも verificationLevel: genpon）の
 * units / requirements ＝無料公開しているフィールドのみ。
 *   roken-nyusho-shintai-kosoku-gensan / roken-nyusho-anzen-kanri-taisei-gensan
 *   roken-nyusho-gyakutai-gensan / roken-nyusho-bcp-gensan / roken-nyusho-eiyo-kanri-gensan
 *   tsusho-kaigo / tsusho-riha / homon-riha の gyakutai-gensan・bcp-gensan
 *
 * ★records / auditPoints / pitfalls はPlus限定なので本文にも図にも書かない。
 *   委員会・指針・研修・担当者は requirements に並んでいる「箱の名前」なので図にしてよい。
 *   その委員会で何を記録に残すかは records なので触れない（§3-9 危険1）。
 *
 * ★狙う検索語を fee-check とずらす（同§3-9 危険2）。
 *   fee-check：「高齢者虐待防止措置未実施減算 算定要件」等
 *   この記事：「未実施減算」「委員会 指針 研修 担当者」「減算率 違い」「図解」
 *
 * ★既存の `bcp-misakutei-gensan` とは問いが違う（あちらはBCP単体、こちらは未実施減算というグループ）。
 *   本文から相互リンクしてある。
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
                高齢者虐待防止措置未実施減算、業務継続計画未策定減算、身体拘束廃止未実施減算。
                名前が長いうえに数もあるので、それぞれ別の話に見えます。
            </P>
            <P>
                ところが要件を並べてみると、求められているものはほとんど同じでした。
                違うのは、引かれる大きさのほうです。
            </P>

            <H2>そろえるのは、委員会・指針・研修・担当者</H2>
            <Figure
                src="/column/mijisshi-gensan-4-set.svg"
                alt="未実施減算でそろえるものを示した図。委員会（定期的に開いて結果を全員へ周知、身体拘束は3月に1回以上）、指針（整備しておく）、研修（定期的に実施する）、担当者（置いておく）の4つ。ただし業務継続計画（BCP）だけは形が違い、計画を策定する、従業者へ周知する、研修と訓練を定期的に行う、定期的に見直す、という流れになる。下部に、ひとつでも欠けていれば減算の対象になると書かれている。"
                caption="虐待防止も身体拘束廃止も安全管理体制も、骨格はこの4つです。"
                width={800}
                height={420}
            />
            <P>
                高齢者虐待防止措置なら、委員会を定期的に開いて結果を従業者へ周知し、指針を整備し、
                研修を定期的に実施し、担当者を置く。この4つが要件です。
            </P>
            <P>
                安全管理体制も同じ形をしています。事故発生の防止のための指針を整備し、委員会と研修を定期的に行い、
                担当者を置く。そこに、事故やその危険性がある事態を報告・分析して改善策を周知する体制が加わります。
            </P>
            <Note title="身体拘束の委員会だけ、回数が書かれています">
                身体的拘束等の適正化のための対策を検討する委員会は、
                <strong className="font-black text-slate-900">3月に1回以上</strong>
                開催することとされています。ほかの多くが「定期的に」なのに対して、ここだけ具体的です。
                あわせて、身体的拘束等を行う場合は態様・時間・心身の状況・緊急やむを得ない理由を記録することも要件になります。
            </Note>
            <P>
                いっぽう業務継続計画（BCP：感染症や災害のときにサービスを続けるための計画）は形が違います。
                計画を策定し、従業者へ周知し、研修と訓練を定期的に行い、定期的に見直す。委員会や担当者ではなく、
                計画そのものを回すという書き方です。
                <Link
                    href="/column/bcp-misakutei-gensan/"
                    className="mx-1 font-bold text-blue-700 hover:underline"
                >
                    BCP未策定減算だけを扱った記事
                </Link>
                もあります。
            </P>

            <H2>ひとつでも欠けていれば減算です</H2>
            <P>
                ここが「未実施減算」という名前のいちばん怖いところだと思っています。
                4つそろえてはじめて要件を満たすので、3つできていても評価は同じです。
            </P>
            <P>
                通所リハビリテーションの高齢者虐待防止措置未実施減算には、そのことがはっきり書かれています。
                虐待の発生または再発を防止するためのすべての措置のうち、一つでも講じられていなければ減算対象、という書き方です。
            </P>
            <Ul>
                <Li>委員会は開いたが、指針をまだ整備していない → 減算対象</Li>
                <Li>指針も研修もあるが、担当者を決めていない → 減算対象</Li>
                <Li>BCPは作ったが、研修と訓練をしていない → 減算対象</Li>
            </Ul>
            <P>
                書類を1枚作れば終わる話ではありません。
                委員会は開き続け、研修は定期的に回し続けることになります。
            </P>

            <H2>引かれる大きさは、そろっていません</H2>
            <Figure
                src="/column/mijisshi-gensan-ritsu.svg"
                alt="未実施減算ごとに引かれる大きさを比べた図。身体拘束廃止未実施減算（老健）は100分の10。業務継続計画未策定減算は老健だけ100分の3で、訪問リハ・通所介護・通所リハは100分の1。高齢者虐待防止措置未実施減算は4分野とも100分の1。安全管理体制未実施減算（老健）は5単位/日。栄養管理減算（老健）は14単位/日。下部に、率で引くものは基本報酬が大きいほど金額も大きくなると書かれている。"
                caption="いちばん重いのは身体拘束の100分の10。BCPは老健だけ100分の3です。"
                width={800}
                height={440}
            />
            <P>
                同じ「未実施減算」でも、身体拘束廃止は所定単位数の100分の10です。
                高齢者虐待防止措置は100分の1なので、10倍の開きがあります。
            </P>
            <P>
                そして見落としやすいのが業務継続計画です。訪問リハビリテーション・通所介護・通所リハビリテーションでは100分の1ですが、
                <strong className="font-black text-slate-900">老健だけ100分の3</strong>
                になっています。虐待防止と並べて「どちらも1パーセント」と覚えていると、老健で外します。
            </P>
            <P>
                安全管理体制未実施減算と栄養管理減算は、率ではなく単位で引く形です。
                それぞれ5単位/日と14単位/日です。率のものは基本報酬が大きいほど金額も大きくなるので、
                同じ「1パーセント」でも施設によって重さが変わります。
            </P>
            <Note tone="caution" title="施行時期に経過措置があるものもあります">
                訪問リハビリテーションのBCP未策定減算は、施行時期が令和7年4月とされています。
                ただし感染症の予防・まん延防止の指針の整備と、非常災害に関する具体的計画の策定を行っている場合は
                減算を適用しない経過措置があります。分野ごとに扱いが違うので、原文で確かめてください。
            </Note>
            <P>
                各減算の単位数と要件の原文、根拠になる告示へのリンクは報酬チェックにあります。
                <Link
                    href="/fee-check/roken-nyusho/roken-nyusho-shintai-kosoku-gensan/"
                    className="mx-1 font-bold text-blue-700 hover:underline"
                >
                    身体拘束廃止未実施減算
                </Link>
                、
                <Link
                    href="/fee-check/roken-nyusho/roken-nyusho-bcp-gensan/"
                    className="mx-1 font-bold text-blue-700 hover:underline"
                >
                    業務継続計画未策定減算（老健）
                </Link>
                のページです。
            </P>

            <H2>おわりに</H2>
            <P>
                未実施減算を1本ずつ覚えようとすると、名前が似ていて混ざります。
                でも「委員会・指針・研修・担当者の4点セット」と握ってしまえば、あとは分野ごとの差分だけです。
            </P>
            <P>
                そして差分の中身は、率と、BCPの形と、身体拘束の3月に1回。
                この3つだけ手元に控えておけば、要件を毎回はじめから読まずに済むはずです。
            </P>
        </>
    );
}

export const article: ColumnArticle = {
    slug: "mijisshi-gensan-kata",
    title: "未実施減算は委員会・指針・研修・担当者の4点セットで見ます",
    description:
        "高齢者虐待防止措置未実施減算、業務継続計画未策定減算、身体拘束廃止未実施減算。名前は違っても、求められているのは委員会・指針・研修・担当者でした。ひとつでも欠ければ減算です。ただし引かれる大きさは違い、BCPは老健だけ100分の3。図解にしました。",
    category: "fee-practice",
    publishedAt: "2026-08-15",
    updatedAt: "2026-08-15",
    takeaways: [
        "未実施減算は、委員会・指針・研修・担当者の4点セットで見ます",
        "ひとつでも欠ければ減算対象です。通所リハの虐待防止減算にはそう明記されています",
        "引かれる大きさは違います。虐待防止は100分の1、BCPは老健だけ100分の3、身体拘束は100分の10です",
    ],
    relatedFeeItems: [
        { domain: "roken-nyusho", id: "roken-nyusho-shintai-kosoku-gensan" },
        { domain: "roken-nyusho", id: "roken-nyusho-bcp-gensan" },
        { domain: "roken-nyusho", id: "roken-nyusho-gyakutai-gensan" },
        { domain: "roken-nyusho", id: "roken-nyusho-anzen-kanri-taisei-gensan" },
        { domain: "roken-nyusho", id: "roken-nyusho-eiyo-kanri-gensan" },
        { domain: "tsusho-kaigo", id: "tsusho-kaigo-gyakutai-gensan" },
        { domain: "tsusho-kaigo", id: "tsusho-kaigo-bcp-gensan" },
        { domain: "tsusho-riha", id: "tsusho-riha-gyakutai-gensan" },
        { domain: "tsusho-riha", id: "tsusho-riha-bcp-gensan" },
        { domain: "homon-riha", id: "homon-riha-gyakutai-gensan" },
    ],
    cta: "plus",
    Body,
};
