/**
 * コラム記事：栄養・口腔の情報連携の型（渡す相手と回数が違う）
 *
 * ★企画書§3-9の「型で括る図解」。介護と医科にまたがる6項目を1本で拾う。
 * ★導線カバー率0%だった地域包括ケア病棟に、この記事で初めて導線が入る。
 *
 * 出典は `src/data/fee-items/` の以下（いずれも verificationLevel: genpon）の
 * units / requirements ＝無料公開しているフィールドのみ。
 *   roken-nyusho-taisho-eiyo-joho-renkei / roken-nyusho-sainyusho-eiyo-renkei
 *   homon-riha-koku-renkei / homon-kango-riha-kokuu-renkei-kyoka
 *   kaifukuki-riha-eiyo-shido-renkei / chiiki-hokatsu-care-reha-eiyo-kokuu-renkei
 *
 * ★records / auditPoints / pitfalls はPlus限定なので本文にも図にも書かない。
 *   「渡す相手」「回数」は requirements / units に書かれているので図にしてよい。
 *   渡す文書に何を書くかは records 側なので触れない（§3-9 危険1）。
 *
 * ★狙う検索語を fee-check とずらす（§3-9 危険2）。
 *   fee-check：「退所時栄養情報連携加算 算定要件」等
 *   この記事：「情報連携 加算 違い」「渡す相手」「1月に1回」「図解」
 * ★口腔・栄養スクリーニングの記事（kokueiyo-screening-nagare）とは、
 *   あちらが「自分の事業所で確認する」、こちらが「外へ渡す」で問いが別。相互リンクしてある。
 */

import Link from "next/link";
import { Figure, H2, Li, Note, P, Ul } from "@/components/column/ColumnProse";
import type { ColumnArticle } from "@/lib/column";

function Body() {
    return (
        <>
            <P>
                栄養や口腔の情報を次の場所へ渡す加算は、介護にも医科にも散らばっています。
                名前もばらばらなので、別々の制度に見えます。
            </P>
            <P>
                でも要件を並べると、やっていることはほぼ同じでした。
                違うのは、誰に渡すかと、何回まで数えられるかのほうです。
            </P>

            <H2>評価する、同意を得る、決まった相手へ渡す</H2>
            <Figure
                src="/column/joho-renkei-3-dan.svg"
                alt="情報連携の加算に共通する3段を示した図。1、評価する（口腔の健康状態、栄養の状態）。2、同意を得る（どの加算にも入っています）。3、決まった相手へ渡す（相手は加算ごとに決まっている）。下部に、評価しただけ、渡しただけでは要件を満たさないと書かれている。"
                caption="真ん中の「同意を得る」が、どの加算にも入っています。"
                width={800}
                height={340}
            />
            <P>
                口腔連携強化加算なら、事業所の従業者が口腔の健康状態の評価を行います。
                そのうえで利用者の同意を得て、歯科医療機関と介護支援専門員へ評価結果の情報提供を行う。
                この3段です。
            </P>
            <P>
                退所時栄養情報連携加算も同じ形をしています。
                対象は特別食を必要とする入所者か、低栄養状態にあると医師が判断した入所者。
                情報提供は入所者の同意を得て、管理栄養士が行うことになっています。
            </P>
            <Note title="評価する人と、渡す人が指定されていることがあります">
                退所時栄養情報連携加算では、情報提供を行うのは
                <strong className="font-black text-slate-900">管理栄養士</strong>
                と決められています。口腔連携強化加算のほうは事業所の従業者が評価しますが、
                歯科医師または歯科衛生士に相談できる体制を文書等で取り決めておくことが施設基準です。
            </Note>

            <H2>渡す相手と、数える単位が違います</H2>
            <Figure
                src="/column/joho-renkei-aite-kaisu.svg"
                alt="情報連携の加算ごとに渡す相手と回数を比べた表。口腔連携強化加算（訪問リハ・訪問看護 各50単位）は歯科医療機関とケアマネへ、1月に1回。退所時栄養情報連携加算（老健70単位/月）は行き先で変わり、1月に1回。再入所時栄養連携加算（老健200単位）は病院の管理栄養士と一緒に作る形で、1人につき1回。栄養情報連携料（回復期リハ入院料1・70点）は他の医療機関等の医師・管理栄養士へ、入院中1回。下部に、1月に1回・入院中1回・1人につき1回と、数える単位そのものが違うと書かれている。"
                caption="「1月に1回」「入院中1回」「1人につき1回」。単位そのものが違います。"
                width={800}
                height={400}
            />
            <P>
                いちばん気をつけたいのが、退所時栄養情報連携加算です。
                渡す相手が
                <strong className="font-black text-slate-900">退所の行き先で変わります</strong>
                。
            </P>
            <Ul>
                <Li>
                    <strong className="font-black text-slate-900">居宅へ退所</strong>
                    ：主治の医師の属する病院・診療所と、介護支援専門員へ
                </Li>
                <Li>
                    <strong className="font-black text-slate-900">病院・診療所・他の介護保険施設へ</strong>
                    ：その医療機関等へ
                </Li>
            </Ul>
            <P>
                回数の数え方もそろっていません。口腔連携強化加算と退所時栄養情報連携加算は1月に1回。
                栄養情報連携料は入院中1回。そして再入所時栄養連携加算は、入所者1人につき1回です。
            </P>
            <Note tone="caution" title="併算定できない組み合わせがあります">
                退所時栄養情報連携加算は、栄養マネジメント強化加算を算定している場合は算定しません。
                訪問看護の口腔連携強化加算では、他の介護サービス事業所が算定した口腔・栄養スクリーニング加算（(Ⅱ)は除きます）、
                歯科医師・歯科衛生士による居宅療養管理指導費（初回月は除きます）、他事業所の口腔連携強化加算のいずれも
                算定されていないことが施設基準に入っています。
            </Note>
            <P>
                自分の事業所の中で口腔と栄養を確認するほうの加算は
                <Link
                    href="/column/kokueiyo-screening-nagare/"
                    className="mx-1 font-bold text-blue-700 hover:underline"
                >
                    口腔・栄養スクリーニング加算の記事
                </Link>
                にまとめています。あちらは「確認して担当ケアマネへ伝える」、こちらは「外へ渡す」です。
            </P>

            <H2>1つだけ、性格が違うものがあります</H2>
            <P>
                再入所時栄養連携加算だけは、情報を渡す加算ではありませんでした。
                老健を退所して病院に入院し、退院してまた同じ老健へ戻ってくる。その往復が前提になります。
            </P>
            <P>
                そして戻ってきたときにやることは、老健の管理栄養士が
                <strong className="font-black text-slate-900">病院の管理栄養士と連携して栄養ケア計画を策定する</strong>
                こと。渡すのではなく、一緒に作る形です。単位数が200単位と高めなのも、そこだと思います。
            </P>
            <Note title="地域包括ケア病棟のものは、連携というより体制の加算です">
                リハビリテーション・栄養・口腔連携加算（30点/日）は、計画を作成した日から14日を限度に算定します。
                施設基準が重く、専任の常勤管理栄養士1名以上、リハビリテーション医療に3年以上の経験があり
                所定の研修を修了した常勤医師1名以上の勤務が求められます。
                入棟後3日までにリハを実施した患者の割合など、実績の基準も別にあります。
            </Note>
            <P>
                各加算の単位数と要件の原文、根拠になる告示へのリンクは
                <Link
                    href="/fee-check/roken-nyusho/roken-nyusho-taisho-eiyo-joho-renkei/"
                    className="mx-1 font-bold text-blue-700 hover:underline"
                >
                    退所時栄養情報連携加算
                </Link>
                、
                <Link
                    href="/fee-check/homon-riha/homon-riha-koku-renkei/"
                    className="mx-1 font-bold text-blue-700 hover:underline"
                >
                    口腔連携強化加算（訪問リハ）
                </Link>
                のページにあります。
            </P>

            <H2>おわりに</H2>
            <P>
                情報連携の加算は、名前を覚えようとすると増える一方です。
                やることは3段で共通なので、覚えるのは「誰に」と「何回まで」の2つで足ります。
            </P>
            <P>
                そのうえで、再入所時栄養連携加算だけは一緒に作る加算。
                この例外を1つ持っておけば、残りは同じ読み方でいけます。
            </P>
        </>
    );
}

export const article: ColumnArticle = {
    slug: "joho-renkei-kata",
    title: "栄養・口腔の情報連携の加算は、渡す相手が決まっています",
    description:
        "退所時栄養情報連携加算、口腔連携強化加算、栄養情報連携料。分野は違っても、評価して同意を得て決まった相手へ渡す、の3段で共通でした。渡す相手と回数が加算ごとに違い、再入所時栄養連携加算だけは渡すのではなく一緒に作る形です。図解にしています。",
    category: "fee-practice",
    publishedAt: "2026-08-15",
    updatedAt: "2026-08-15",
    takeaways: [
        "情報連携の加算は「評価する → 同意を得る → 決まった相手へ渡す」の3段です",
        "渡す相手が加算ごとに決まっています。退所時栄養情報連携は退所の行き先で変わります",
        "回数の単位が違います。1月に1回、入院中1回、1人につき1回まであります",
        "再入所時栄養連携加算だけは渡す加算ではなく、病院の管理栄養士と一緒に計画を作ります",
    ],
    relatedFeeItems: [
        { domain: "roken-nyusho", id: "roken-nyusho-taisho-eiyo-joho-renkei" },
        { domain: "homon-riha", id: "homon-riha-koku-renkei" },
        { domain: "roken-nyusho", id: "roken-nyusho-sainyusho-eiyo-renkei" },
        { domain: "homon-kango-riha", id: "homon-kango-riha-kokuu-renkei-kyoka" },
        { domain: "kaifukuki-riha", id: "kaifukuki-riha-eiyo-shido-renkei" },
        { domain: "chiiki-hokatsu-care", id: "chiiki-hokatsu-care-reha-eiyo-kokuu-renkei" },
    ],
    cta: "plus",
    Body,
};
