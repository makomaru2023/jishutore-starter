/**
 * コラム記事：回復期リハ病棟で土日もリハビリがある理由（★入門層・回復期の1本目）
 *
 * ★「加算に興味のない現場職員」向け。タイトル・descriptionに加算名を入れない（編集ガイド§5-3）。
 *   狙う検索語：「回復期 土日 リハビリ」「回復期リハ 週7日」「回復期 休みの日 リハ」
 *
 * ★題材の根拠＝2026-08-21に見たGSC（3か月・/fee-check/ で絞込）。
 *   Googleでは回復期リハが最大の分野で、休日リハの項目は257表示・CTR1.2%。
 *   表示はあるのにクリックが取れていない＝別の入口から拾いにいく回。
 *
 * 出典は `src/data/fee-items/kaifukuki-riha.json` の以下（genpon）の units / requirements。
 *   kaifukuki-riha-kyujitsu-kasan / kaifukuki-riha-shisetsu-kijun
 * ★records / auditPoints / pitfalls はPlus限定なので本文にも図にも書かない。
 *
 * ★既存記事とのすみ分け：
 *   `kaifukuki-shisetsu-kijun`   ＝6区分の分かれ目（調べに来た人向け）
 *   `kaifukuki-betsu-ni-toreru`  ＝入院料と別に取れるもの一覧（調べに来た人向け）
 *   この記事                      ＝「なぜ土日にリハがあるのか」（知らない人向け）
 */

import Link from "next/link";
import { Figure, H2, Li, Note, P, Ul } from "@/components/column/ColumnProse";
import type { ColumnArticle } from "@/lib/column";

function Body() {
    return (
        <>
            <P>
                回復期リハ病棟に配属されて、まず驚くのが土日です。
                前の職場では休みだったリハビリが、当たり前のように動いています。
            </P>
            <P>
                熱心な病院だから、ではありません。
                ★<strong className="font-black text-slate-900">週7日という数字が、施設基準に書かれています</strong>
                。
            </P>

            <H2>病棟によって、土日の意味が違います</H2>
            <Figure
                src="/column/kaifukuki-shu7ka-kasan.svg"
                alt="回復期リハビリテーション病棟で週7日リハビリを提供する体制が、病棟の区分によって扱いが変わることを示した図。上の段は入院料1から4で、週7日のリハビリ提供体制が施設基準そのものに入っている。やって当たり前なので上乗せは付かない。下の段は入院料5と回復期リハビリテーション入院医療管理料で、休日リハビリテーション提供体制加算として1日につき60点が付く。施設基準は休日を含め週7日間リハビリテーションを提供できる体制を有していること。図の下に、同じ土日のリハでも要件か上乗せかが分かれると書かれている。"
                caption="同じ土日のリハでも、要件になっている病棟と、上乗せが付く病棟があります。"
                width={800}
                height={450}
            />
            <P>
                回復期リハ病棟の入院料は6つの区分があります。
                このうち入院料1〜4では、
                <strong className="font-black text-slate-900">週7日のリハビリ提供体制が施設基準の中に入っています</strong>
                。
            </P>
            <P>
                やって当たり前、という扱いです。
                だから土日にリハをしても、そのぶんの上乗せは付きません。
            </P>
            <P>
                一方、入院料5と入院医療管理料では違います。
                休日リハビリテーション提供体制加算として、1日につき60点が付きます。
            </P>
            <Note title="加算の対象が限られている理由">
                ★<strong className="font-black text-slate-900">入院料1〜4は、すでに要件として週7日体制を求められています</strong>
                。
                すでに求めているものを、あらためて加算で評価はしません。
                だから対象は入院料5と入院医療管理料に限られます。
            </Note>

            <H2>土日にやるのは、日数を数えているからでもあります</H2>
            <P>
                回復期の患者さんには、入院できる日数の上限があります。
                その中でどれだけ良くなったかが、病棟の評価につながります。
            </P>
            <P>
                週5日と週7日では、同じ2か月でも回数が変わります。
                ★<strong className="font-black text-slate-900">限られた日数を使い切るために、土日を空けない</strong>
                という発想です。
            </P>
            <P>
                入院料1では1日あたり3単位以上のリハビリが求められます。
                入院料5と入院医療管理料では2単位以上です。
            </P>
            <Ul>
                <Li>
                    <strong className="font-black text-slate-900">入院料1〜4</strong>
                    ：週7日体制は施設基準。土日のリハは前提に含まれます
                </Li>
                <Li>
                    <strong className="font-black text-slate-900">入院料5・入院医療管理料</strong>
                    ：週7日体制を整えると、1日60点が加算されます
                </Li>
            </Ul>
            <P>
                区分ごとの細かい違いは
                <Link
                    href="/column/kaifukuki-shisetsu-kijun/"
                    className="mx-1 font-bold text-blue-700 hover:underline"
                >
                    施設基準の6区分の分かれ目
                </Link>
                で図解しています。
            </P>

            <H2>おわりに</H2>
            <P>
                土日にリハがあるのは、その病棟の方針というより制度の形でした。
                しかも病棟の区分によって、要件なのか上乗せなのかが変わります。
            </P>
            <P>
                自分の病棟がどちらなのかを知っておくと、シフトの意味も見えてくるはずです。
                ★どちらであっても、土日を空けないことが患者さんの回数に直結します。
            </P>
            <P>
                実際の請求では、原本と地方厚生局への確認を優先してください。
                個別のケースで算定できるかどうかは、この記事では判断できません。
            </P>
        </>
    );
}

export const article: ColumnArticle = {
    slug: "kaifukuki-donichi-riha",
    title: "回復期リハ病棟で、土日もリハビリがある理由",
    description:
        "回復期リハ病棟で土日もリハビリが動くのは、熱心な病院だからではありません。週7日という数字が施設基準に書かれているからです。しかも入院料1〜4ではやって当たり前の要件、入院料5と回復期リハビリテーション入院医療管理料では1日60点の上乗せと、病棟の区分によって扱いそのものが変わります。",
    category: "fee-practice",
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    takeaways: [
        "週7日のリハビリ提供体制は、入院料1〜4では施設基準そのものに入っています",
        "入院料5と入院医療管理料では、同じ体制が1日60点の上乗せとして評価されます",
        "すでに要件になっているものは加算にならない。だから対象が限られています",
    ],
    relatedFeeItems: [
        { domain: "kaifukuki-riha", id: "kaifukuki-riha-kyujitsu-kasan" },
        { domain: "kaifukuki-riha", id: "kaifukuki-riha-shisetsu-kijun" },
    ],
    cta: "plus",
    Body,
};
