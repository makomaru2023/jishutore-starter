/**
 * コラム記事：退院時共同指導加算の型（3分野とも600単位でも中身が違う）
 *
 * ★企画書§3-9の「型で括る図解」。訪問看護・訪問リハ・通所リハの3分野に同名・同額である。
 *
 * 出典は `src/data/fee-items/` の以下（いずれも verificationLevel: genpon）の
 * units / requirements ＝無料公開しているフィールドのみ。
 *   homon-kango-riha-taiin-kyodo-shido / homon-riha-taiin-kyodo-shido / tsusho-riha-taiin-kyodo-shido
 *
 * ★records / auditPoints / pitfalls はPlus限定なので本文にも図にも書かない。
 *
 * ★狙う検索語を fee-check とずらす（§3-9 危険2）。
 *   fee-check：「退院時共同指導加算 算定要件」
 *   この記事：「訪問看護と訪問リハの違い」「初回加算 どっち」「併算定」「図解」
 */

import Link from "next/link";
import { Figure, H2, Li, Note, P, Ul } from "@/components/column/ColumnProse";
import type { ColumnArticle } from "@/lib/column";

function Body() {
    return (
        <>
            <P>
                退院時共同指導加算は、訪問看護・訪問リハ・通所リハの3分野にあります。
                しかも単位数はどれも600単位です。
            </P>
            <P>
                同じ名前で同じ点数なので、ひとまとめに覚えたくなります。
                でも要件を並べると、やることも回数も違っていました。
            </P>

            <H2>単位数は同じでも、やることが違います</H2>
            <Figure
                src="/column/taiin-kyodo-3-bunya.svg"
                alt="退院時共同指導加算を3分野で比べた表。訪問看護は600単位で、看護師等が退院時共同指導を行い退院後の初回訪問看護を行う。回数は1回、特別な管理を必要とする利用者は2回。訪問リハは600単位で、医師またはPT・OT・STが退院前カンファレンスに参加し、退院につき1回。通所リハは600単位で、同じくカンファレンスに参加し内容を通所リハ計画に反映し、退院につき1回。下部に、訪問看護だけ退院前カンファレンスへの参加ではなく退院時共同指導という書き方だと書かれている。"
                caption="訪問リハと通所リハは「カンファレンスに出る」、訪問看護は「共同指導を行う」です。"
                width={800}
                height={380}
            />
            <P>
                訪問リハと通所リハは、退院前カンファレンスへの参加が要件に書かれています。
                事業所の医師または理学療法士・作業療法士・言語聴覚士が出席し、病院側と情報を共有する形です。
            </P>
            <P>
                訪問看護のほうは書き方が違います。入院先の主治の医師その他の従業者と共同して、
                在宅での療養上必要な指導を行い、その内容を提供する。これを退院時共同指導と呼んでいます。
            </P>
            <Ul>
                <Li>
                    <strong className="font-black text-slate-900">回数も違います</strong>
                    ：訪問リハ・通所リハは退院につき1回。訪問看護は1回ですが、特別な管理を必要とする利用者は2回まで
                </Li>
                <Li>
                    <strong className="font-black text-slate-900">共通しているのは出口</strong>
                    ：3分野とも、退院後の初回のサービスを行ったところで算定します
                </Li>
            </Ul>
            <Note title="訪問看護でもリハ職が対象になります">
                訪問看護の「看護師等」は准看護師を除く保健師・看護師のほか、
                理学療法士・作業療法士・言語聴覚士も含みます。
                初回加算(Ⅰ)が「看護師」限定なのとは違い、リハ職が単独で共同指導と初回訪問を行っても対象になり得ます。
            </Note>

            <H2>分野ごとに、気をつけるところが1つずつ</H2>
            <Figure
                src="/column/taiin-kyodo-chuiten.svg"
                alt="退院時共同指導加算で分野ごとに気をつける点を3つ並べた図。訪問看護は初回加算とは選択制で、初回加算を算定するとこちらは算定しない。通所リハはテレビ電話装置等を使ってよく、本人・家族の同意とガイドライン遵守が前提。両方を使う人については各事業所で算定できるが、一体的に運営している場合は併算定できない。"
                caption="選択制・テレビ電話・一体運営。それぞれ別の論点です。"
                width={800}
                height={320}
            />
            <P>
                訪問看護でいちばん効くのが、初回加算との関係です。
                初回加算を算定する場合は、退院時共同指導加算を算定しません。どちらか一方になります。
            </P>
            <P>
                通所リハには、テレビ電話装置等を活用してよいという記載があります。
                ただし本人または家族の同意を得たうえで、個人情報保護と医療情報システム安全管理のガイドライン等を守ることが前提です。
            </P>
            <Note tone="caution" title="通所リハと訪問リハを両方使う方の扱い">
                同じ利用者が通所リハ事業所と訪問リハ事業所の両方を利用する場合、
                それぞれの事業所の医師等がカンファレンスに参加して共同指導を行えば、各事業所で算定できます。
                ただし通所リハと訪問リハが
                <strong className="font-black text-slate-900">一体的に運営されている場合は併算定できません</strong>
                。
            </Note>
            <P>
                各分野の単位数と要件の原文は
                <Link
                    href="/fee-check/homon-kango-riha/homon-kango-riha-taiin-kyodo-shido/"
                    className="mx-1 font-bold text-blue-700 hover:underline"
                >
                    訪問看護のページ
                </Link>
                、
                <Link
                    href="/fee-check/tsusho-riha/tsusho-riha-taiin-kyodo-shido/"
                    className="mx-1 font-bold text-blue-700 hover:underline"
                >
                    通所リハのページ
                </Link>
                で確認できます。
            </P>

            <H2>おわりに</H2>
            <P>
                600単位という数字が3つ並んでいると、同じものに見えてしまいます。
                実際には、出るべき場が違い、回数が違い、他の加算との関係も違いました。
            </P>
            <P>
                自分の事業所がどれなのかを先に決めて、その1行だけ覚える。
                そのほうが、3つ全部をぼんやり覚えるより確実だと思います。
            </P>
        </>
    );
}

export const article: ColumnArticle = {
    slug: "taiin-kyodo-shido-kata",
    title: "退院時共同指導加算、3分野とも600単位でも中身が違います",
    description:
        "退院時共同指導加算は訪問看護・訪問リハ・通所リハにあり、どれも600単位です。ただし訪問リハと通所リハは退院前カンファレンスへの参加、訪問看護は退院時共同指導という書き方で、回数も違います。初回加算との選択制や併算定の扱いまで図解にしました。",
    category: "fee-practice",
    publishedAt: "2026-08-16",
    updatedAt: "2026-08-16",
    takeaways: [
        "3分野とも600単位ですが、やることも回数も違います",
        "訪問リハ・通所リハは退院前カンファレンスへの参加、訪問看護は退院時共同指導という書き方です",
        "訪問看護では初回加算との選択制になります。どちらか一方です",
        "通所リハと訪問リハを両方使う方は各事業所で算定できますが、一体運営なら併算定できません",
    ],
    relatedFeeItems: [
        { domain: "homon-kango-riha", id: "homon-kango-riha-taiin-kyodo-shido" },
        { domain: "tsusho-riha", id: "tsusho-riha-taiin-kyodo-shido" },
        { domain: "homon-riha", id: "homon-riha-taiin-kyodo-shido" },
        { domain: "homon-kango-riha", id: "homon-kango-riha-shokai-kasan" },
    ],
    cta: "plus",
    Body,
};
