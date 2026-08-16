/**
 * コラム記事：訪問看護からのリハビリと8単位減算
 *
 * ★導線カバー率が 2/12（17%）と最も薄かった訪問看護分野を、1本で8項目カバーする回。
 *
 * 出典は `src/data/fee-items/homon-kango-riha.json`（verificationLevel: genpon）の
 * units / requirements ＝無料公開しているフィールドのみ。
 *
 * ★records / auditPoints / pitfalls はPlus限定なので本文にも図にも書かない。
 *
 * ★狙う検索語を fee-check とずらす（§3-9 危険2）。
 *   fee-check：「理学療法士等による訪問看護の減算 算定要件」
 *   この記事：「訪問看護 リハビリ 8単位」「訪問回数 数え方」「294単位」「図解」
 *
 * ★リハ職向けサイトとして、この分野で最も刺さるのは「自分たちの訪問回数が
 *   そのまま事業所の減算に効く」という構造。そこを記事の軸にしている。
 */

import Link from "next/link";
import { Figure, H2, Li, Note, P, Ul } from "@/components/column/ColumnProse";
import type { ColumnArticle } from "@/lib/column";

function Body() {
    return (
        <>
            <P>
                訪問看護からの理学療法士等の訪問は、1回294単位です。
                時間の区分がなく、1回あたりの定額になっています。
            </P>
            <P>
                この分野で押さえておきたいのは単位数より、8単位の減算のほうだと思います。
                リハ職の動きがそのまま条件に入っているからです。
            </P>

            <H2>8単位減算になる条件は2つ</H2>
            <Figure
                src="/column/homon-kango-8tani-gensan.svg"
                alt="理学療法士等による訪問看護の8単位減算の条件を2つ並べた図。イは、前年度にリハ職の訪問回数が看護職員の訪問回数を超えていること。リハ職の動きがそのまま効く。ロは、緊急時訪問看護加算・特別管理加算・看護体制強化加算の3つをどれも算定していないこと。事業所の体制が効く。下部に、対象はリハ職の訪問だけで看護職員による訪問看護には適用されないと書かれている。"
                caption="イは訪問の内訳、ロは事業所の体制。性格の違う2つです。"
                width={800}
                height={380}
            />
            <P>
                イは訪問の内訳を見ます。前年度、リハ職による訪問回数が看護職員による訪問回数を超えていると対象です。
                つまり自分たちが何回入ったかが、そのまま事業所の減算に効いてきます。
            </P>
            <P>
                ロは体制のほうです。緊急時訪問看護加算・特別管理加算・看護体制強化加算のいずれも算定していないと対象になります。
                裏を返すと、この3つのどれかを取っていればロには当たりません。
            </P>
            <Note title="減るのはリハ職の訪問だけです">
                この減算の対象は理学療法士・作業療法士・言語聴覚士による訪問だけで、
                看護職員による訪問看護には適用されません。
            </Note>

            <H2>回数の数え方が独特です</H2>
            <Figure
                src="/column/homon-kango-riha-kazoekata.svg"
                alt="訪問看護からのリハビリで回数まわりに注意が要る3点を並べた図。リハ職が連続して2回訪問した場合は前年度の回数では1回と数える。連携型の定期巡回・随時対応型からの訪問は前年度の回数に含める。1日に2回を超えて訪問した場合、超えた回は100分の90。下部に、特別訪問看護指示書が出た日から14日間は訪問看護費を算定しないと書かれている。"
                caption="「前年度の回数」は減算の判定用で、算定回数とは別ものです。"
                width={800}
                height={380}
            />
            <P>
                ここが落とし穴になります。減算の判定に使う前年度の訪問回数は、算定した回数とイコールではありません。
            </P>
            <Ul>
                <Li>リハ職が連続して2回訪問した場合は、1回と数えます（改定Q&amp;A vol.1 問28）</Li>
                <Li>連携型の定期巡回・随時対応型訪問介護看護による訪問回数も、前年度の回数に含まれます（同 問30）</Li>
            </Ul>
            <P>
                レセプトの算定回数をそのまま持ってきて「看護のほうが多いから大丈夫」と判断すると、ずれます。
                数え直しが要る、という前提で見たほうが安全です。
            </P>
            <Note tone="caution" title="1日に2回を超えた分は100分の90になります">
                これは減算とは別の話です。理学療法士等が1日に2回を超えて訪問看護を行った場合、
                超えた回について所定単位数の100分の90を算定します。
            </Note>

            <H2>リハだけに偏らせない、という前提があります</H2>
            <P>
                計画書と報告書は、理学療法士等と看護職員が連携して作成することになっています。
                そのうえで、利用者の状態の変化等に応じて看護職員による定期的な訪問で評価を行う。
            </P>
            <P>
                報酬チェックの要件欄には、この仕組みの趣旨が
                <strong className="font-black text-slate-900">「訪問看護がリハビリテーションのみに偏らないようにするため」</strong>
                と書かれています。8単位減算のイと同じ方向を向いた作りですね。
            </P>
            <Note title="医療保険へ移る場面もあります">
                主治の医師が急性増悪等により一時的に頻回の訪問看護が必要と判断し、特別訪問看護指示書を出した場合、
                その日から14日間は訪問看護費を算定しません。別途、医療保険の訪問看護で対応することになります。
            </Note>
            <P>
                単位数と要件の原文は
                <Link
                    href="/fee-check/homon-kango-riha/homon-kango-riha-kihon/"
                    className="mx-1 font-bold text-blue-700 hover:underline"
                >
                    訪問看護費（理学療法士等による訪問）
                </Link>
                と
                <Link
                    href="/fee-check/homon-kango-riha/homon-kango-riha-riha-shokei-gensan/"
                    className="mx-1 font-bold text-blue-700 hover:underline"
                >
                    8単位減算のページ
                </Link>
                で確認できます。
            </P>

            <H2>おわりに</H2>
            <P>
                訪問看護からのリハビリは、単位数だけ見ると分かりやすい分野です。
                1回294単位の定額で、時間区分もありません。
            </P>
            <P>
                ただ、その裏に「看護とリハのバランス」を見る仕組みが2重に入っています。
                8単位減算のイと、計画書を看護職員と一緒に作るという要件。
                この2つがつながっていると分かると、日々の訪問の組み方も見え方が変わってきます。
            </P>
        </>
    );
}

export const article: ColumnArticle = {
    slug: "homon-kango-riha-8tani",
    title: "訪問看護からのリハ、8単位減算になる2つの条件",
    description:
        "訪問看護からの理学療法士等の訪問は1回294単位です。ただし前年度のリハ職の訪問回数が看護職員を超えている場合、または緊急時訪問看護加算・特別管理加算・看護体制強化加算のいずれも算定していない場合は8単位減算になります。回数の数え方まで図解しました。",
    category: "fee-practice",
    publishedAt: "2026-08-16",
    updatedAt: "2026-08-16",
    takeaways: [
        "リハ職の訪問は1回294単位。時間の区分がなく定額です",
        "8単位減算の条件は2つ。前年度の訪問回数が看護職員を超えている／3つの加算をどれも取っていない",
        "前年度の回数は算定回数と別ものです。連続して2回訪問した場合は1回と数えます",
        "1日に2回を超えた分は、所定単位数の100分の90になります",
    ],
    relatedFeeItems: [
        { domain: "homon-kango-riha", id: "homon-kango-riha-riha-shokei-gensan" },
        { domain: "homon-kango-riha", id: "homon-kango-riha-kihon" },
        { domain: "homon-kango-riha", id: "homon-kango-riha-taisei-kyoka-kasan" },
        { domain: "homon-kango-riha", id: "homon-kango-riha-kinkyuji-kasan" },
        { domain: "homon-kango-riha", id: "homon-kango-riha-tokubetsu-kanri-kasan" },
        { domain: "homon-kango-riha", id: "homon-kango-riha-shokai-kasan" },
        { domain: "homon-kango-riha", id: "homon-kango-riha-taiin-kyodo-shido" },
        { domain: "homon-kango-riha", id: "homon-kango-riha-kango-kaigo-renkei" },
    ],
    cta: "plus",
    Body,
};
