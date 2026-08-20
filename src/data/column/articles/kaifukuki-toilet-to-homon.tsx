/**
 * コラム記事：回復期でトイレと家庭訪問が重視される理由（★入門層・回復期の2本目）
 *
 * ★「加算に興味のない現場職員」向け。タイトル・descriptionに加算名を入れない（編集ガイド§5-3）。
 *   狙う検索語：「回復期 排尿自立」「回復期 退院前訪問 なぜ」「回復期 トイレ 目標」
 *
 * ★題材の根拠＝2026-08-21に見たGSC（3か月・/fee-check/ で絞込）。
 *   排尿自立支援(437表示・16クリック)が全fee-checkページ中1位、
 *   退院前訪問指導(137表示)が3位、強化体制加算(305表示)が6位。
 *   ★この3つは「強化体制加算の条件」で1本につながる。
 *
 * 出典は `src/data/fee-items/kaifukuki-riha.json` の以下（genpon）の units / requirements。
 *   kaifukuki-riha-kyoka-taisei-kasan / kaifukuki-riha-hainyo-jiritsu
 *   kaifukuki-riha-taiinmae-homon-shido
 * ★records / auditPoints / pitfalls はPlus限定なので本文にも図にも書かない。
 *
 * ★既存記事とのすみ分け：
 *   `hainyo-jiritsu-kaifukuki` ＝排尿自立支援加算の2つの働き（調べに来た人向け）
 *   この記事                   ＝「なぜトイレと家庭訪問だけ特別扱いなのか」（知らない人向け）
 */

import Link from "next/link";
import { Figure, H2, Li, Note, P, Ul } from "@/components/column/ColumnProse";
import type { ColumnArticle } from "@/lib/column";

function Body() {
    return (
        <>
            <P>
                回復期の病棟にいると、2つのことが妙に重く扱われていると感じます。
                トイレの自立と、退院前の家庭訪問です。
            </P>
            <P>
                どちらも大事なのは分かります。
                ただ、なぜこの2つだけ会議で毎回名前が出るのかは、あまり説明されません。
            </P>
            <P>
                ★答えは、
                <strong className="font-black text-slate-900">この2つが病棟全体の上乗せの条件になっているから</strong>
                です。
            </P>

            <H2>上乗せの条件が、3つ並んでいます</H2>
            <Figure
                src="/column/kaifukuki-kyoka-3joken.svg"
                alt="回復期リハビリテーション強化体制加算の条件を3つ並べた図。この加算は入院料1を算定する病棟が対象で、1日につき80点。1つ目の条件はリハビリテーションの効果に係る実績指数が48以上であること。入院料1自体の基準である42以上より高い水準になっている。2つ目の条件は退院前訪問指導について十分な実績を有していること。3つ目の条件は排尿自立支援加算に係る届出を行っている保険医療機関であること。図の下に、届出は入院料1を届け出る病棟全体で行うと書かれている。"
                caption="実績指数・退院前訪問・排尿自立。3つそろって初めて上乗せになります。"
                width={800}
                height={498}
            />
            <P>
                回復期リハビリテーション強化体制加算という上乗せがあります。
                入院料1を算定する病棟が対象で、1日につき80点です。
            </P>
            <P>
                その条件を読むと、3つ並んでいます。
            </P>
            <Ul>
                <Li>
                    <strong className="font-black text-slate-900">実績指数が48以上</strong>
                    ：入院料1自体の基準は42以上なので、それより高い水準が求められます
                </Li>
                <Li>
                    <strong className="font-black text-slate-900">退院前訪問指導について、十分な実績</strong>
                    があること
                </Li>
                <Li>
                    <strong className="font-black text-slate-900">排尿自立支援加算に係る届出</strong>
                    を行っている医療機関であること
                </Li>
            </Ul>
            <P>
                ★つまり、トイレも家庭訪問も
                <strong className="font-black text-slate-900">個々の患者さんの話であると同時に、病棟の点数の話でもある</strong>
                わけです。
                会議で毎回名前が出るのは、そういう理由だと思います。
            </P>
            <Note title="届出は病棟単位です">
                この加算の届出は、医療機関内の入院料1を届け出る病棟全体で行います。
                ★自分の担当患者だけの話ではなく、
                <strong className="font-black text-slate-900">病棟としてどれだけできているか</strong>
                で見られます。
            </Note>

            <H2>数え方に、現場が知っておくといい癖があります</H2>
            <P>
                退院前訪問指導の実績は割合で見ます。
                その数え方に、少し変わったところがあります。
            </P>
            <P>
                1人の患者さんに入院後早期と退院前の2回訪問しても、
                ★<strong className="font-black text-slate-900">分子になる患者数は1人のまま</strong>
                です。
                回数ではなく人数で数えます。
            </P>
            <P>
                「自宅」の範囲にも決まりがあります。
                サービス付き高齢者向け住宅は含みますが、含めない施設もあり、
                そこへ退院する方は分子にも分母にも入りません。
            </P>
            <Note tone="caution" title="同じ病院の他病棟からの転棟も数えられます">
                同一医療機関内の他病棟で退院前訪問指導を行ったあと、回復期リハ病棟へ転棟して
                自宅退院した患者さんは、実施した患者として分子に含めて計算できます。
                ★転棟前の訪問も無駄になりません。
            </Note>

            <H2>訪問そのものにも点数が付きます</H2>
            <P>
                退院前訪問指導料は入院中1回で580点です。
                入院期間が1月を超えると見込まれる方が対象になります。
            </P>
            <P>
                ★入院後早期に必要があると認められる場合は、
                <strong className="font-black text-slate-900">2回算定できます</strong>
                。
                早めに一度見ておく、という動き方が想定されています。
            </P>
            <P>
                排尿自立支援のほうは週1回200点で、12週が限度です。
                包括的な排尿ケアを行った場合に算定します。
            </P>
            <P>
                排尿自立支援加算が回復期で持つ2つの働きは
                <Link
                    href="/column/hainyo-jiritsu-kaifukuki/"
                    className="mx-1 font-bold text-blue-700 hover:underline"
                >
                    こちらの記事
                </Link>
                で扱っています。
            </P>

            <H2>おわりに</H2>
            <P>
                トイレと家庭訪問が重く扱われるのには、理由がありました。
                この2つが、病棟の上乗せの条件に組み込まれているからです。
            </P>
            <P>
                そう分かると、記録の頼まれ方も違って見えてきます。
                ★自分の1件が、病棟全体の割合の一部になっているからです。
            </P>
            <P>
                実際の請求では、原本と地方厚生局への確認を優先してください。
                個別のケースで算定できるかどうかは、この記事では判断できません。
            </P>
        </>
    );
}

export const article: ColumnArticle = {
    slug: "kaifukuki-toilet-to-homon",
    title: "回復期で、トイレと家庭訪問が重く扱われる理由",
    description:
        "回復期リハ病棟でトイレの自立と退院前の家庭訪問だけ会議で毎回名前が出るのは、この2つが病棟全体の上乗せの条件になっているからです。実績指数48以上・退院前訪問の十分な実績・排尿自立支援の届出という3つがそろって初めて、1日80点が付きます。届出は病棟単位で行います。",
    category: "fee-practice",
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    takeaways: [
        "トイレの自立と退院前訪問は、病棟全体の上乗せ（1日80点）の条件に入っています",
        "条件は3つ。実績指数48以上・退院前訪問の実績・排尿自立支援の届出です",
        "退院前訪問の実績は回数ではなく人数で数えます。2回訪問しても分子は1人です",
        "届出は病棟単位。担当患者だけでなく、病棟としてどれだけできているかで見られます",
    ],
    relatedFeeItems: [
        { domain: "kaifukuki-riha", id: "kaifukuki-riha-kyoka-taisei-kasan" },
        { domain: "kaifukuki-riha", id: "kaifukuki-riha-hainyo-jiritsu" },
        { domain: "kaifukuki-riha", id: "kaifukuki-riha-taiinmae-homon-shido" },
    ],
    cta: "plus",
    Body,
};
