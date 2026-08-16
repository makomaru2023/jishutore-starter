/**
 * コラム記事：片麻痺の自主トレの選び方（イラスト層）
 *
 * ★受け皿は `/items/stroke-exercises/`。カテゴリページが「イラストが欲しい」を担当しているので、
 *   この記事は「イラスト」を狙わず「どれを渡すか・どう選ぶか」を担当する。
 *
 * 素材の内容は `data/items.json` の titleJa / exercisePoint から。
 * ★医療行為の代替と読めない書き方にする（CLAUDE.md 医療・介護コンテンツの注意）。
 */

import Link from "next/link";
import { Figure, H2, Li, Note, P, Ul } from "@/components/column/ColumnProse";
import type { ColumnArticle } from "@/lib/column";

function Body() {
    return (
        <>
            <P>
                片麻痺の方に渡す自主トレは、選ぶのが難しいところです。
                麻痺側をどう扱うかという話が先に来てしまって、決まらなくなります。
            </P>
            <P>
                僕は場面から選ぶようにしています。
                1日のどこで困っているか。そこから逆に引くと、渡すものが絞れます。
            </P>

            <H2>場面から引くと、渡すものが決まります</H2>
            <Figure
                src="/column/henmahi-bamen-de-erabu.svg"
                alt="片麻痺の自主トレを場面から選ぶことを示した図。寝ているときは麻痺側上肢のポジショニング。起きるときは寝返りの手順から側臥位で端座位へ。身じたくは麻痺側から袖を通す更衣。下部に、場面で選ぶと「いつやるか」も一緒に決まると書かれている。"
                caption="寝ているとき・起きるとき・身じたく。生活の順に並べています。"
                width={800}
                height={340}
            />
            <P>
                場面から選ぶ利点は、いつやるかが同時に決まることです。
                更衣の練習なら朝の着替えのときになりますし、寝返りなら起きるときになります。
            </P>
            <P>
                自主トレが続かない理由の多くは「いつやるか」が決まっていないことでした。
                場面で選ぶと、そこが最初から埋まります。
            </P>
            <Ul>
                <Li>
                    <strong className="font-black text-slate-900">寝ているとき</strong>
                    ：麻痺側上肢のポジショニング。動かす練習ではなく、置き方の共有です
                </Li>
                <Li>
                    <strong className="font-black text-slate-900">起きるとき</strong>
                    ：寝返りの手順、側臥位から端座位への起き上がり。手順そのものを絵で残せます
                </Li>
                <Li>
                    <strong className="font-black text-slate-900">身じたく</strong>
                    ：麻痺側から袖を通す更衣。順番が決まっている動作なので、絵と相性がいいです
                </Li>
            </Ul>

            <H2>「練習」ではなく「手順」を渡す場面があります</H2>
            <P>
                ポジショニングや更衣の順番は、回数をこなす種目ではありません。
                毎回そのやり方でやる、という共有です。
            </P>
            <P>
                この違いは家族に渡すときにはっきり出ます。
                練習の紙だと「やらせなきゃ」になりますが、手順の紙なら日々の介助の中に入るものです。
            </P>
            <Note title="回数を書かない紙があってよいです">
                手順を渡すときは、回数やセット数の欄を作らないほうが自然です。
                チェック表と一緒に渡す場合も、手順の紙は別紙にしておくと混ざりません。
            </Note>

            <H2>安全のところは、書き足しておきます</H2>
            <P>
                片麻痺の方の自主トレは、状態によって向き不向きがはっきり分かれます。
                同じ「寝返り」でも、してよい方向や介助の量は人によって別です。
            </P>
            <Note tone="caution" title="イラストは説明の道具で、判断の代わりにはなりません">
                どの動きをどこまで1人でやってよいかは、その方の状態を見ている専門職が決めることです。
                渡す紙には「痛みや違和感が出たら中止する」「分からないときは次回聞く」の2行を入れておくと、
                家族が困りにくくなります。
            </Note>
            <P>
                イラストは
                <Link
                    href="/items/stroke-exercises/"
                    className="mx-1 font-bold text-blue-700 hover:underline"
                >
                    脳卒中・片麻痺のカテゴリ
                </Link>
                にまとめてあります。この記事で出てきたものは下に並べました。
            </P>

            <H2>おわりに</H2>
            <P>
                片麻痺の自主トレは、種目を探すより場面を決めるほうが先だと思っています。
                場面が決まれば、渡すものも、いつやるかも、家族に伝える内容も一度に決まります。
            </P>
            <P>
                そのうえで、練習の紙と手順の紙を分ける。
                この2つだけで、だいぶ渡しやすくなりました。
            </P>
        </>
    );
}

export const article: ColumnArticle = {
    slug: "henmahi-jishutore-erabikata",
    title: "片麻痺の自主トレ、場面から選ぶと決まります",
    description:
        "片麻痺の方に渡す自主トレは、麻痺側をどう扱うかから考えると決まりません。寝ているとき、起きるとき、身じたく。1日の場面から引くと渡すものが絞れて、いつやるかも同時に決まります。練習の紙と手順の紙を分ける考え方も、無料で使えるイラストつきでまとめました。",
    category: "shiryo",
    publishedAt: "2026-08-16",
    updatedAt: "2026-08-16",
    takeaways: [
        "麻痺側をどうするかより先に、1日のどの場面かで選びます",
        "場面から選ぶと「いつやるか」も同時に決まります",
        "ポジショニングや更衣の順番は練習ではなく手順です。回数の欄は作らないほうが自然です",
    ],
    relatedItems: [
        "positioning-of-paralyzed-upper-limb-premium",
        "rolling-over-technique-premium",
        "supine-to-side-rolling-premium",
        "side-lying-to-bed-edge-sitting-premium",
        "shirt-dressing-affected-side-first-premium",
        "bed-edge-sit-to-stand-premium",
    ],
    cta: "free-items",
    Body,
};
