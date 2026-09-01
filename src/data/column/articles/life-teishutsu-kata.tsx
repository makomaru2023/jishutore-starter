/**
 * コラム記事：LIFEへの提出は加算が変わっても型が同じ
 *
 * ★企画書§3-9の「型で括る図解」の2本目。relatedFeeItems を10件（新しい上限いっぱい）持たせ、
 *   1枚の図を10項目の fee-check ページから呼ぶ設計の検証も兼ねる。
 *
 * 出典は `src/data/fee-items/` 全8分野の requirements / units ＝無料公開しているフィールドのみ。
 * 「148項目のうち19項目」は、このリポジトリの fee-items を数えた結果（記事内でもそう書いている）。
 * ★制度全体でLIFE対象の加算が19という意味ではないので、書きぶりを弱めないこと。
 *
 * ★records / auditPoints / pitfalls はPlus限定なので本文にも図にも書かない。
 *   提出する情報の種類（ADL・栄養・口腔・認知症の状況）は requirements に書かれているので触れてよいが、
 *   「何を記録として残すか」は records なので書かない（§3-9 危険1）。
 *
 * ★狙う検索語を fee-check とずらす（同§3-9 危険2）。
 *   fee-check：「科学的介護推進体制加算 算定要件」等／この記事：「LIFE 提出」「いつ出す」「翌月10日」「型」
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
                LIFE（科学的介護情報システム）が出てくる加算は、いまかなりの数になりました。
                この報酬チェックに載せている148項目を数えたところ、19項目が提出に触れています。
            </P>
            <P>
                数が多いので身構えてしまいますが、要件の書き方はほとんど同じでした。
                1回だけ型をつかんでおけば、あとは加算ごとの差分を見るだけで済みます。
            </P>

            <H2>評価する、提出する、活用する</H2>
            <Figure
                src="/column/life-teishutsu-kata-flow.svg"
                alt="LIFEへの提出が要る加算に共通する3段階を示した図。1、評価する（ADL・栄養・口腔・認知症の状況など）。2、LIFEに提出する（厚生労働省へ情報を出す）。3、活用する（返ってきた情報を見て計画を見直す）。3から1へ点線の矢印が戻っており、見直した内容でまた評価すると書かれている。下部に、要件は「提出し、活用すること」で3番目まで書かれていると注記がある。"
                caption="矢印は3で止まりません。見直した内容で、また評価に戻ります。"
                width={800}
                height={356}
            />
            <P>
                いちばん見落とされやすいのが3番目だと思っています。
                要件の文は、たいてい「提出し、活用していること」という形で書かれているからです。
            </P>
            <Ul>
                <Li>褥瘡マネジメント加算：情報を提出し、褥瘡管理に当たって当該情報その他必要な情報を活用していること</Li>
                <Li>排せつ支援加算：情報を提出し、排せつ支援に当たって当該情報その他必要な情報を活用していること</Li>
                <Li>栄養マネジメント強化加算：情報を提出し、継続的な栄養管理の実施に当たって活用していること</Li>
            </Ul>
            <P>
                並べると、同じ骨格に加算の名前を差し替えただけだと分かります。
                提出はゴールではなく、計画を見直すための材料を取りにいく作業という位置づけです。
            </P>
            <Note title="リハビリテーション系は「計画の見直し」と直接つながっています">
                短期集中リハビリテーション実施加算(Ⅰ)は「評価結果等の情報を厚生労働省に提出し、
                必要に応じてリハビリテーション計画を見直していること」。
                リハビリテーションマネジメント計画書情報加算も、計画の見直し等に活用していることが要件です。
                老健の同加算については
                <Link
                    href="/column/roken-rehamane-keikakusho-joho/"
                    className="mx-1 font-bold text-blue-700 hover:underline"
                >
                    (Ⅰ)と(Ⅱ)の分かれ目の記事
                </Link>
                で図解しました。
            </Note>

            <H2>出す時期も、要件のほうに書かれています</H2>
            <Figure
                src="/column/life-teishutsu-timing.svg"
                alt="通所リハビリテーションを例に、LIFEへ提出する時期を並べた図。科学的介護推進体制加算は、算定を開始した月、新しく利用が始まった月、少なくとも3月ごと、サービスの利用が終わった月。リハビリテーションマネジメント加算(ロ)(ハ)は、計画を作成した月、計画を変更した月、少なくとも3月に1回。どちらも原則として翌月10日までに提出する。"
                caption="「3月ごと」が基本形で、そこに開始・変更・終了のタイミングが足されます。"
                width={800}
                height={360}
            />
            <P>
                通所リハビリテーションの科学的介護推進体制加算は、算定開始月・新規利用者の利用開始月・
                少なくとも3月ごと・サービス利用終了月について提出することとされています。
            </P>
            <P>
                リハビリテーションマネジメント加算(ロ)(ハ)なら、計画作成月・計画変更月・少なくとも3月に1回。
                どちらも原則として翌月10日までです。
            </P>
            <Note tone="caution" title="期限が減算の分かれ目になることもあります">
                介護予防訪問リハビリテーションの12月超減算は、リハビリテーション会議の実施とLIFEでのデータ提出を
                満たせば減算されません。当初から減算を避けるには、減算適用が開始される月にリハビリテーション会議を行い、
                かつLIFEデータをその翌月10日までに提出する必要があります（Q&A vol.2 問12）。
            </Note>

            <H2>同じ仕組みが、分野をまたいで乗っています</H2>
            <P>
                19項目の内訳を見ると、特定の分野に固まってはいませんでした。
                老健・入所リハが8、通所介護が5、通所リハが4、訪問リハが2という配り方です。
            </P>
            <P>
                中身も、リハビリテーション計画だけではありません。
                褥瘡、排せつ、自立支援、栄養、口腔、ADL。加算の主題が変わっても、乗っている仕組みは同じでした。
            </P>
            <P>
                だから「LIFEの型」を一度おさえてしまうと、新しい加算に出会ったときの読む量がかなり減ります。
                確かめるのは、提出する情報の種類と、提出の時期と、活用の書きぶりの3点だけになるからです。
            </P>
            <P>
                加算ごとの正確な文言と根拠になる告示へのリンクは報酬チェックにあります。
                <Link
                    href="/fee-check/tsusho-kaigo/tsusho-kaigo-kagakuteki-kaigo/"
                    className="mx-1 font-bold text-blue-700 hover:underline"
                >
                    科学的介護推進体制加算（通所介護）
                </Link>
                、
                <Link
                    href="/fee-check/tsusho-riha/tsusho-riha-rehamane/"
                    className="mx-1 font-bold text-blue-700 hover:underline"
                >
                    リハビリテーションマネジメント加算（通所リハ）
                </Link>
                のページから見てみてください。
            </P>

            <H2>おわりに</H2>
            <P>
                LIFEは、加算ごとにばらばらの仕組みが並んでいるように見えます。
                実際には同じ骨格が19か所に置かれているだけでした。
            </P>
            <P>
                評価して、出して、返ってきたものを使う。この3つが要件で、3つ目まで書いてある。
                そこだけ握っておけば、加算が増えても読み方は変わりません。
            </P>
        </>
    );
}

export const article: ColumnArticle = {
    slug: "life-teishutsu-kata",
    title: "LIFEへの提出、加算が変わっても型は同じです",
    description:
        "LIFEへの提出が要る加算は、評価する・提出する・返ってきた情報を活用する、の3段階でできています。この報酬チェックの148項目を数えると19項目がこの仕組みに触れていました。要件は「活用すること」まで書かれています。提出の時期とあわせて図解にしました。",
    category: "fee-practice",
    publishedAt: "2026-08-16",
    updatedAt: "2026-08-16",
    takeaways: [
        "LIFEへの提出は、評価する・提出する・活用する、の3段階です",
        "要件は「活用すること」まで書かれています。出して終わりではありません",
        "提出の時期も要件に書かれています。通所リハの例では原則として翌月10日までです",
        "148項目のうち19項目に、分野をまたいで同じ仕組みが乗っています",
    ],
    relatedFeeItems: [
        { domain: "tsusho-kaigo", id: "tsusho-kaigo-kagakuteki-kaigo" },
        { domain: "tsusho-riha", id: "tsusho-riha-rehamane" },
        { domain: "roken-nyusho", id: "roken-nyusho-kagakuteki-kaigo" },
        { domain: "tsusho-kaigo", id: "tsusho-kaigo-kobetsu-kinou" },
        { domain: "roken-nyusho", id: "roken-nyusho-jiritsu-shien-sokushin" },
        { domain: "tsusho-kaigo", id: "tsusho-kaigo-adl-iji" },
        { domain: "homon-riha", id: "homon-riha-rehamane" },
        { domain: "roken-nyusho", id: "roken-nyusho-haisetsu-shien" },
        { domain: "tsusho-riha", id: "tsusho-riha-kagakuteki-kaigo" },
        { domain: "roken-nyusho", id: "roken-nyusho-jokuso-management" },
    ],
    cta: "plus",
    Body,
};
