/**
 * コラム記事：立ち上がりと歩行の自主トレ（イラスト層）
 *
 * ★受け皿は `/items/walking-exercises/` と `/items/bed-mobility-exercises/`。
 *   カテゴリページが「イラストが欲しい」を担当しているので、
 *   この記事は「どの段でつまずいているかで渡すものが決まる」を担当する。
 *
 * 素材の内容は `data/items.json` の titleJa / exercisePoint から。
 */

import Link from "next/link";
import { Figure, H2, Li, Note, P, Ul } from "@/components/column/ColumnProse";
import type { ColumnArticle } from "@/lib/column";

function Body() {
    return (
        <>
            <P>
                「歩けるようになりたい」と言われたとき、歩行練習の紙を渡したくなります。
                でも歩けない理由が歩行そのものにあるとは限りません。
            </P>
            <P>
                起き上がりで力を使い切っていると、歩く練習まで届かない。
                だから先に、どの段で止まっているかを見ます。
            </P>

            <H2>歩く前に、段が4つあります</H2>
            <Figure
                src="/column/tachiagari-hoko-dan.svg"
                alt="歩くまでの4つの段を示した図。起き上がる（側臥位から端座位へ、寝返りの手順）、座って保つ（ベッド端座位、座位足踏み）、立ち上がる（ベッド端から・車椅子から、イスからの立ち座り）、歩く（平行棒内・歩行器、杖歩行）。下部に、どの段で止まっているかが決まれば渡すものは自然に決まること、歩けない理由が歩行にあるとは限らず起き上がりで力を使い切っていると歩く練習まで届かないことが書かれている。"
                caption="起き上がる・座って保つ・立ち上がる・歩く。順に並べています。"
                width={800}
                height={340}
            />
            <P>
                4つの段のうち、どこで止まっているか。
                そこが決まれば、渡す紙は自然に決まります。
            </P>
            <Ul>
                <Li>
                    <strong className="font-black text-slate-900">起き上がる</strong>
                    ：寝返りの手順、側臥位から端座位への起き上がり
                </Li>
                <Li>
                    <strong className="font-black text-slate-900">座って保つ</strong>
                    ：ベッド端座位、座位足踏み。ここが不安定だと次に進めません
                </Li>
                <Li>
                    <strong className="font-black text-slate-900">立ち上がる</strong>
                    ：ベッド端座位から、車椅子から、イスからの立ち座り。出発する場所で紙が変わります
                </Li>
                <Li>
                    <strong className="font-black text-slate-900">歩く</strong>
                    ：平行棒内、歩行器、杖。支持の量で段がもうひとつあります
                </Li>
            </Ul>
            <Note title="立ち上がりは「どこから」で紙が変わります">
                ベッド端からと車椅子からでは、足の位置も手の使い方も違います。
                実際に困っている場所の紙を渡したほうが、そのまま使えます。
            </Note>

            <H2>歩行は、支持の量でもう1段あります</H2>
            <P>
                歩くところまで来ても、いきなり杖歩行にはなりません。
                平行棒内、固定型歩行器、杖と、支持の量が段になっています。
            </P>
            <P>
                自宅で1人でやってもらうなら、この段のどこまでを渡すかは慎重に決めます。
                練習の場面と、日常の移動の場面を混ぜないほうが安全です。
            </P>
            <Note tone="caution" title="自宅用と練習用は分けます">
                平行棒内歩行やトレッドミル歩行は、設備のある場所での練習です。
                自宅に渡す紙には、その方が普段使っている移動手段に合ったものだけを入れます。
            </Note>

            <H2>座位足踏みは、どの段でも使えます</H2>
            <P>
                ひとつだけ、段をまたいで使えるものがあります。座位足踏みです。
                座って保つ段の練習にもなりますし、立ち上がりや歩行の準備としても置けます。
            </P>
            <P>
                自宅の自主トレで最初に渡すものとしても扱いやすいと思っています。
                イスさえあればできて、転ぶ心配も少ないからです。
            </P>
            <P>
                イラストは
                <Link
                    href="/items/walking-exercises/"
                    className="mx-1 font-bold text-blue-700 hover:underline"
                >
                    歩行のカテゴリ
                </Link>
                と
                <Link
                    href="/items/bed-mobility-exercises/"
                    className="mx-1 font-bold text-blue-700 hover:underline"
                >
                    起き上がり・寝返りのカテゴリ
                </Link>
                にあります。
            </P>

            <H2>おわりに</H2>
            <P>
                歩行の相談を受けたとき、いきなり歩行の紙に手が伸びます。
                でも一段手前を見ると、そこが本当の課題だったということがよくありました。
            </P>
            <P>
                起き上がる、座って保つ、立ち上がる、歩く。
                この4段を頭に置いておくと、渡す紙の精度が変わります。
            </P>
        </>
    );
}

export const article: ColumnArticle = {
    slug: "tachiagari-hoko-jishutore",
    title: "立ち上がりと歩行の自主トレ、どの段で止まっているか",
    description:
        "歩けない理由が歩行そのものにあるとは限りません。起き上がる、座って保つ、立ち上がる、歩く。4つの段のどこで止まっているかが決まれば、渡す紙は自然に決まります。立ち上がりは出発する場所で変わること、自宅用と練習用の分け方も無料イラストつきでまとめました。",
    category: "shiryo",
    publishedAt: "2026-08-16",
    updatedAt: "2026-08-16",
    takeaways: [
        "歩く前に「起き上がる・座って保つ・立ち上がる・歩く」の4段があります",
        "立ち上がりはベッド端からと車椅子からで紙が変わります",
        "平行棒内やトレッドミルは設備のある場所の練習。自宅用とは分けます",
    ],
    relatedItems: [
        "side-lying-to-bed-edge-sitting-premium",
        "bed-edge-sitting-premium",
        "seated-march-premium",
        "bed-edge-sit-to-stand-premium",
        "wheelchair-sit-to-stand-premium",
        "sit-to-stand-using-chair-premium",
        "fixed-walker-walking-premium",
        "cane-walking-premium",
    ],
    cta: "free-items",
    Body,
};
