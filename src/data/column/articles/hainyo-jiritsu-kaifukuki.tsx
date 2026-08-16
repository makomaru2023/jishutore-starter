/**
 * コラム記事：排尿自立支援加算の2つの働き（回復期リハ）
 *
 * 出典は `src/data/fee-items/kaifukuki-riha.json` の
 * `kaifukuki-riha-hainyo-jiritsu` / `kaifukuki-riha-kyoka-taisei-kasan` / `kaifukuki-riha-hokatsu-hani`
 * （いずれも verificationLevel: genpon）の units / requirements ＝無料公開しているフィールドのみ。
 *
 * ★records / auditPoints / pitfalls はPlus限定なので本文にも図にも書かない。
 * ★`relatedQA`（疑義解釈へのリンク）もPlus限定。疑義解釈その5 問6の**存在は requirements に書かれている**ので
 *   名前だけ触れ、URLは載せない。
 *
 * ★狙う検索語を fee-check とずらす（企画書_コラムの部分公開とPlus導線 §3-9 危険2）。
 *   fee-check：「排尿自立支援加算 算定要件」／この記事：「回復期リハ 強化体制加算 施設基準」「図解」
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
                排尿自立支援加算は、名前のとおり排尿の自立を支える加算です。
                ただ回復期リハビリテーション病棟では、それだけの話で終わりません。
            </P>
            <P>
                この加算の届出があるかどうかが、別の加算の施設基準にそのまま効いてきます。
                つまり病棟としては、点数の大小より先に「届け出ているか」を見ることになります。
            </P>

            <H2>加算としての顔は、週1回200点で12週まで</H2>
            <Figure
                src="/column/hainyo-jiritsu-two-faces.svg"
                alt="排尿自立支援加算が回復期リハで持つ2つの働きを示した図。加算としては週1回200点で12週が限度、A308は原則として包括だがこの加算は別に算定できる。施設基準としては回復期リハビリテーション強化体制加算（80点/日）の施設基準のひとつで、届出がないと強化体制加算そのものが取れない。下部に、対象は施設基準に適合する保険医療機関で算定できる入院料等を現に算定している患者と書かれている。"
                caption="点数としての顔と、施設基準としての顔。効き方がまったく違います。"
                width={800}
                height={400}
            />
            <P>
                施設基準に適合する保険医療機関に入院していて、排尿自立支援加算を算定できる入院料等を
                現に算定している患者が対象です。その患者に包括的な排尿ケアを行った場合に算定します。
            </P>
            <Ul>
                <Li>
                    <strong className="font-black text-slate-900">週1回・200点</strong>
                    ：12週が限度なので、最長でもおよそ3か月です
                </Li>
                <Li>
                    <strong className="font-black text-slate-900">A308では包括の外</strong>
                    ：回復期リハビリテーション病棟入院料は原則として包括ですが、この加算は別に算定できる側に並んでいます
                </Li>
            </Ul>
            <Note title="包括の外に並んでいるものは他にもあります">
                休日リハビリテーション提供体制加算、強化体制加算、退院前訪問指導料、二次性骨折予防継続管理料2、
                入退院支援加算1ロ、認知症ケア加算なども、A308の注3で別に算定できる項目として挙がっています。
            </Note>

            <H2>施設基準としての顔が、たぶん本題です</H2>
            <Figure
                src="/column/hainyo-jiritsu-kyoka-taisei.svg"
                alt="回復期リハビリテーション強化体制加算（80点/日）の施設基準4つを並べた図。1、回復期リハビリテーション病棟入院料1の施設基準を満たす。2、実績指数が48以上（入院料1自体は42以上）。3、退院前訪問指導の十分な実績。4、排尿自立支援加算に係る届出（この記事の話）。下部に、届出は入院料1を届け出る病棟全体で行うこと、対象は回復期リハビリテーション病棟入院料1を算定する病棟であることが書かれている。"
                caption="4つのうちのひとつが、排尿自立支援加算の届出です。"
                width={800}
                height={320}
            />
            <P>
                回復期リハビリテーション強化体制加算は、入院料1を算定する病棟が対象で80点/日です。
                その施設基準のひとつに「排尿自立支援加算に係る届出を行っている保険医療機関であること」が入っています。
            </P>
            <P>
                効き方がまるで違うのは、ここです。排尿自立支援加算そのものは週1回の点数ですが、
                強化体制加算は対象となる患者について1日ごとに付きます。届出がなければ、そちらがまるごと取れません。
            </P>
            <Note tone="caution" title="実績指数の水準も別に上がります">
                強化体制加算の施設基準では、リハビリテーションの効果に係る実績指数が48以上とされています。
                入院料1自体の基準は42以上なので、こちらのほうが高い水準です。
                退院前訪問指導についても、十分な実績を有していることが求められます。
            </Note>
            <P>
                届出は病棟ごとではなく、入院料1を届け出る病棟全体で行うことになっています。
                ひとつの病棟だけ体制を整えて済ませる、という形にはなりません。
            </P>

            <H2>研修の中身は、疑義解釈のほうに出ています</H2>
            <P>
                強化体制加算の施設基準として求められる排尿自立支援加算の研修について、
                どの研修が該当するかは令和8年度改定の疑義解釈その5 問6に示されています。
            </P>
            <P>
                届出の準備でつまずきやすいのは、たいていこの部分ではないでしょうか。
                「研修を受けた」と言えるかどうかは研修名と受講範囲で決まるので、告示だけ読んでいても答えが出ません。
            </P>
            <P>
                単位数と算定要件の原文、根拠資料へのリンクは報酬チェックにまとめてあります。
                <Link
                    href="/fee-check/kaifukuki-riha/kaifukuki-riha-hainyo-jiritsu/"
                    className="mx-1 font-bold text-blue-700 hover:underline"
                >
                    排尿自立支援加算
                </Link>
                と、
                <Link
                    href="/fee-check/kaifukuki-riha/kaifukuki-riha-kyoka-taisei-kasan/"
                    className="mx-1 font-bold text-blue-700 hover:underline"
                >
                    回復期リハビリテーション強化体制加算
                </Link>
                のページです。
            </P>

            <H2>おわりに</H2>
            <P>
                この加算を「週200点の加算」とだけ見ていると、届出の優先順位を読み違えます。
                回復期リハビリテーション病棟では、施設基準の部品としての働きのほうが大きく効いてくるからです。
            </P>
            <P>
                加算の一覧を点数順に眺めていると、こういう関係は見えてきません。
                どの加算がどの施設基準に組み込まれているか。そこも一度たどっておくと、届出の順番を決めやすくなります。
            </P>
        </>
    );
}

export const article: ColumnArticle = {
    slug: "hainyo-jiritsu-kaifukuki",
    title: "排尿自立支援加算、回復期リハでは2つの働きをします",
    description:
        "排尿自立支援加算は週1回200点・12週が限度の加算です。ただ回復期リハビリテーション病棟では、それだけではありません。強化体制加算（80点/日）の施設基準に、この加算の届出が入っています。加算としての顔と施設基準としての顔を、図解にして並べました。",
    category: "fee-practice",
    publishedAt: "2026-08-16",
    updatedAt: "2026-08-16",
    takeaways: [
        "排尿自立支援加算は週1回200点、12週が限度です",
        "回復期リハ強化体制加算（80点/日）の施設基準に、この加算の届出が入っています",
        "A308は原則として包括ですが、この加算は別に算定できる側に並んでいます",
    ],
    relatedFeeItems: [
        { domain: "kaifukuki-riha", id: "kaifukuki-riha-hainyo-jiritsu" },
        { domain: "kaifukuki-riha", id: "kaifukuki-riha-kyoka-taisei-kasan" },
        { domain: "kaifukuki-riha", id: "kaifukuki-riha-hokatsu-hani" },
        { domain: "kaifukuki-riha", id: "kaifukuki-riha-taiinmae-homon-shido" },
        { domain: "kaifukuki-riha", id: "kaifukuki-riha-jisseki-shisu" },
    ],
    cta: "plus",
    Body,
};
