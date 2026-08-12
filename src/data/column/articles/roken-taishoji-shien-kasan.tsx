/**
 * コラム記事：老健の退所支援、行き先で見るものが変わる
 *
 * 出典は `src/data/fee-items/roken-nyusho.json` の `roken-nyusho-taishoji-shien`
 * （verificationLevel: genpon）の units / requirements＝無料公開しているフィールドのみ。
 *
 * ★records / auditPoints / pitfalls はPlus限定なので本文に書かない。
 * ★単位数は本文に書かず、関連する報酬チェックのカードに任せる（6区分あり数字が多いため）。
 *
 * 記事「入所前後訪問指導加算」（入口）と対になる出口の記事。相互リンクしている。
 */

import Link from "next/link";
import { Figure, H2, H3, Li, Note, P, Ul } from "@/components/column/ColumnProse";
import type { ColumnArticle } from "@/lib/column";

function Body() {
    return (
        <>
            <P>
                老健の退所支援まわりの加算は、ひとつの名前の下に6つの区分がぶら下がっています。
                名前だけ見ても、自分のケースがどれに当たるのか分かりにくい作りです。
            </P>
            <P>
                整理のコツは、加算の名前から入らないことだと思っています。
                「その人がどこへ行くのか」「いつの場面か」から入ると、見るものが決まります。
            </P>

            <H2>行き先と場面で分かれます</H2>
            <Figure
                src="/column/roken-taisho-shien-by-destination.svg"
                alt="老健の退所支援まわりの加算を、退所の行き先と場面で整理した図。退所より前は居宅介護支援事業者と連携して退所後の利用方針を決めておく。退所するときは行き先で分かれ、居宅へ帰る場合は退所後の主治医へ情報を提供して紹介する（社会福祉施設等でも同じ）、医療機関へ入院する場合はその医療機関へ情報を提供して紹介する、まず試しに帰る場合は試行的な退所のときに療養上の指導を行い最初の月から3か月の間が対象になる。退所時に訪問看護が必要と医師が認めたら指示書の交付も別に見る。イ(4)・ロ(4)を算定している老健ではこの加算群は算定しない。"
                caption="退所の行き先と場面で、見る区分が決まります。"
                width={800}
                height={428}
            />

            <H3>退所より前にやっておくこと</H3>
            <P>
                入所予定日前30日以内、または入所後30日以内に、退所後に利用を希望する居宅介護支援事業者と連携し、
                本人の同意を得て退所後の利用方針を定めておく。これが前半にあたります。
            </P>
            <P>
                後半は、退所に先立って居宅介護支援事業者へ診療状況を示す文書を添えて情報を提供し、
                退所後のサービス利用の調整を行うことです。
                前半と後半の両方を満たすかどうかで、見る区分が変わります。
            </P>

            <H3>退所するとき、行き先で分かれる</H3>
            <Ul>
                <Li>
                    <strong className="font-black text-slate-900">居宅へ帰る</strong>
                    ：本人の同意を得て、退所後の主治医に診療状況・心身の状況・生活歴等を提供して紹介します。
                    居宅ではなく他の社会福祉施設等へ入所する場合も、同意を得て同じように情報を提供すれば扱いは同じです
                </Li>
                <Li>
                    <strong className="font-black text-slate-900">医療機関へ入院する</strong>
                    ：その医療機関へ心身の状況・生活歴等を提供して紹介します。居宅へ帰る場合とは別の区分です
                </Li>
                <Li>
                    <strong className="font-black text-slate-900">まず試しに帰ってみる</strong>
                    ：退所が見込まれる入所期間1月超の方を居宅で試行的に退所させ、本人と家族に退所後の療養上の指導を行います。
                    最初に試行的な退所を行った月から3か月の間が対象です
                </Li>
            </Ul>
            <P>
                そして退所時に、医師が診療にもとづいて訪問看護等が必要と認め、本人の同意を得て指示書等を交付した場合は、
                これも別に見ることになります。
            </P>
            <Note tone="caution" title="先に確認するのは基本報酬の区分です">
                イ(4)またはロ(4)を算定している老健では、この加算群は算定しません。
                入所前後訪問指導加算と同じで、自施設がどの区分で請求しているかが最初の分かれ道になります。
            </Note>

            <H2>入口の加算と、対になっています</H2>
            <P>
                老健の在宅復帰は、入所前に自宅を見に行くところから始まって、退所後の連携で終わります。
                入口にあたるのが
                <Link
                    href="/column/nyusho-zengo-homon-shido-jitsumu/"
                    className="mx-1 font-bold text-blue-700 hover:underline"
                >
                    入所前後訪問指導加算
                </Link>
                で、出口にあたるのがこの加算群です。
            </P>
            <P>
                どちらも「入所中に何をしたか」ではなく、「入所の前後で外とどうつないだか」を見ています。
                そう捉えると、記録に何を残すかも見えてきます。
            </P>
            <P>
                6つの区分それぞれの単位数と要件、根拠になる告示へのリンクは
                <Link
                    href="/fee-check/roken-nyusho/roken-nyusho-taishoji-shien/"
                    className="mx-1 font-bold text-blue-700 hover:underline"
                >
                    退所時等支援等加算のページ
                </Link>
                にまとめています。
            </P>

            <H2>おわりに</H2>
            <P>
                退所支援は、退所が決まってから動き出すと間に合わないことが多い場面です。
                入退所前連携が入所後30日以内から始まっているのも、そういう作りだからだと思います。
            </P>
            <P>
                入所したその月に、退所先の見込みを一度置いてみる。
                そこから逆算すると、どの区分を見ることになるかが早い段階で決まります。
            </P>
        </>
    );
}

export const article: ColumnArticle = {
    slug: "roken-taishoji-shien-kasan",
    title: "老健の退所支援、行き先と場面で見るものが変わります",
    description:
        "老健の退所時等支援等加算は6つの区分に分かれています。居宅へ帰るのか、医療機関へ入院するのか、まず試しに帰るのか。退所の行き先と場面から整理すると、自分のケースで見る区分が決まります。",
    category: "fee-practice",
    publishedAt: "2026-08-12",
    updatedAt: "2026-08-12",
    takeaways: [
        "加算の名前からではなく、退所の行き先と場面から見ると区分が決まります",
        "居宅へ帰る場合と医療機関へ入院する場合は別の区分です。試行的な退所もまた別です",
        "イ(4)・ロ(4)を算定している老健では、この加算群は算定しません",
    ],
    relatedFeeItems: [
        { domain: "roken-nyusho", id: "roken-nyusho-taishoji-shien" },
        { domain: "roken-nyusho", id: "roken-nyusho-shikoteki-taisho" },
        { domain: "roken-nyusho", id: "roken-nyusho-nyusho-zengo-homon-shido" },
    ],
    cta: "plus",
    Body,
};
