/**
 * コラム記事：改定ウォッチ 2026年9月号
 *
 * 素材は 2026-09-02 に実施した月次改定確認（workspace の
 * `handover/2026-09-02-fee-check-monthly-update.md`）。
 *
 * ★この型の記事は毎月 `kaitei-watch-YYYY-MM` で積み上げる。過去号は上書きしない。
 * ★relatedFeeItems はあえて空にしている（8月号と同じ理由・編集ガイド§7）。
 */

import Link from "next/link";
import type { ReactNode } from "react";
import { Figure, H2, H3, Li, Note, P, Table, Ul } from "@/components/column/ColumnProse";
import type { ColumnArticle } from "@/lib/column";
import { getFeeCheckTotalCount } from "@/lib/fee-check";

/** 直した項目へのリンク（本文用）。 */
function FeeLink({ href, children }: { href: string; children: ReactNode }) {
    return (
        <Link href={href} className="font-bold text-blue-700 hover:underline">
            {children}
        </Link>
    );
}

function Body() {
    const totalCount = getFeeCheckTotalCount();

    return (
        <>
            <P>
                報酬チェックに載せている{totalCount}項目は、毎月ひととおり点検しています。
                厚生労働省のポータルを見て、前回の確認以降に出た資料を掲載内容と突き合わせる作業です。
            </P>
            <P>
                9月分が終わりました。結論から書くと、今月は制度側の新しい動きがゼロでした。
                そのぶん、出典そのものの正しさを見る作業に時間を使っています。
            </P>

            <H2>今月確認した資料</H2>
            <P>見たのは、先月と同じ3つのポータルです。前回の確認は8月11日でした。</P>
            <Table
                head={["確認したポータル", "8月11日以降に出た新しい資料", "掲載項目への該当"]}
                rows={[
                    ["令和6年度介護報酬改定", "なし（Q&A vol.18・7月14日が最新のまま）", "—"],
                    ["令和8年度介護報酬改定（期中改定）", "なし（処遇改善の様式差し替えのみ）", "—"],
                    ["令和8年度診療報酬改定", "なし（疑義解釈はその11・7月30日が最新）", "—"],
                ]}
            />
            <P>
                医科では8月12日にDPC電子点数表が更新されました。
                こちらはDPC対象病院の点数マスタの話なので、掲載しているリハビリ関連の項目には関わりません。
            </P>
            <Note title="官報訂正は5本のままでした">
                令和8年度診療報酬改定の官報訂正は、4月2日・5月1日・5月29日・6月19日・7月30日の5本です。
                8月に6本目は出ていません。本数は覚えずに、毎回ポータルで数え直しています。
            </Note>

            <H2>点検は3つの層に分けています</H2>
            <P>
                新しい資料が出ていない月でも、点検が終わるわけではありません。
                中身が正しくても、根拠にたどり着けなければ確認のしようがないからです。
            </P>
            <Figure
                src="/column/kaitei-watch-three-layers.svg"
                alt="月次点検で見ている3つの層を示した図。1 制度の新規発出（改定・疑義解釈・訂正）は3ポータルとも新しい資料なし。2 出典リンクの生死（PDFのURL切れ）は46本すべて生存、先月は1本切れていた。3 出典ページの位置（PDFの何ページか）は106か所を照合し9項目を直した。制度に動きがない月は、出典の精度を上げる月にしています。"
                caption="制度に動きがない月は、2層目と3層目に時間を使います。"
                width={800}
                height={300}
            />

            <H3>2層目：出典リンクは46本すべて生きていました</H3>
            <P>
                先月は、医科の実施上の留意事項通知のPDFが、訂正版の公開にともなって旧URLごと消えていました。
                同じことが起きていないか、掲載中の出典URLを全部たどっています。
                今月は46本すべてが生きていました。
            </P>

            <H3>3層目：出典ページの位置を全部当て直しました</H3>
            <P>
                報酬チェックの出典には「このPDFの何ページ」まで書いてあります。
                この指し先が本当にその条文のページかを、106か所ぶん照合しました。
                その結果、9項目でページ番号がずれていたので直しています。
            </P>
            <P>
                点数や要件が間違っていたわけではありません。
                飛んだ先が隣の区分番号のページだった、という種類のずれです。
            </P>
            <Ul>
                <Li>
                    <FeeLink href="/fee-check/chiiki-hokatsu-care/chiiki-hokatsu-care-kihon/">
                        地域包括ケア病棟入院料
                    </FeeLink>
                    ：告示の範囲が1ページ手前（回復期リハの側）から始まっていました
                </Li>
                <Li>
                    <FeeLink href="/fee-check/chiiki-hokatsu-care/chiiki-hokatsu-care-reha-eiyo-kokuu-renkei/">
                        リハビリテーション・栄養・口腔連携加算
                    </FeeLink>
                    ：注14の本文は次のページにありました
                </Li>
                <Li>
                    <FeeLink href="/fee-check/kyuseiki/kyuseiki-santei-kano-kasan-rule/">
                        急性期一般病棟で算定できる加算のルール
                    </FeeLink>
                    ：A100の注10・注11は、書いていたページの2つ先でした
                </Li>
                <Li>
                    <FeeLink href="/fee-check/kaifukuki-riha/kaifukuki-riha-keikakusho-kiroku/">
                        回復期リハの計画書・記録要件
                    </FeeLink>
                    ：説明と交付の根拠（第7部リハビリテーション通則）、別紙様式21、疑義解釈その1の問27の3か所
                </Li>
                <Li>
                    <FeeLink href="/fee-check/tsusho-riha/tsusho-riha-service-taisei-kyoka/">
                        通所リハビリテーションのサービス提供体制強化加算
                    </FeeLink>
                    ：留意事項通知の該当ページが1つ後ろでした
                </Li>
            </Ul>
            <Note tone="caution" title="点数と単位数も、出典本文に当て直しました">
                掲載中の{totalCount}項目に書いてある点数・単位数を、出典のPDFと告示の本文へ機械的に当てました。
                食い違いはありません。唯一ひっかかったのは、減算後の単位数を計算例として添えていた箇所でした。
            </Note>

            <H2>変更がなかった分野</H2>
            <P>
                老健・入所リハ、訪問リハ、訪問看護からのリハ、通所介護の4分野は、新しい資料に該当がありませんでした。
                回復期リハ、急性期一般病棟、地域包括ケア病棟の3分野も、内容そのものの変更はありません。
                今月ページ番号を直した9項目も、書いてある要件は先月と同じです。
            </P>

            <H2>次回の確認と、確認日の見方</H2>
            <P>
                次は10月上旬に、同じ3つのポータルを点検します。
                介護のQ&Aは不定期、医科の疑義解釈は月に1〜2本のペースで出ていました。
                7月30日を最後に1か月以上あいているので、10月には何か出ている可能性があります。
            </P>
            <P>
                出典を確かめ直した項目は、ページ上部の確認日を更新しました。
                <Link href="/fee-check/" className="mx-1 font-bold text-blue-700 hover:underline">
                    報酬チェック
                </Link>
                の各ページで、いつ時点の資料で見たものかを確認できます。
            </P>
            <P>
                何も出ていない月の記録は、書いていて地味です。
                それでも、あとから「この月は見て変わらなかった」とたどれることに値打ちがあるはずです。
            </P>
        </>
    );
}

export const article: ColumnArticle = {
    slug: "kaitei-watch-2026-09",
    title: "【2026年9月】リハ関連の報酬改定・疑義解釈ウォッチ",
    description:
        "2026年9月に行ったリハビリ関連の報酬改定・疑義解釈の点検結果です。8月11日以降、3つのポータルに新しい資料はなく、制度の変更はありませんでした。出典リンク46本の生存確認と、出典ページ番号106か所の照合を行い、9項目のページ表記を直しています。",
    category: "kaitei-watch",
    publishedAt: "2026-09-02",
    updatedAt: "2026-09-02",
    takeaways: [
        "8月11日以降、介護報酬・診療報酬とも新しい疑義解釈や訂正は出ていません。官報訂正も5本のままです",
        "出典PDFのURLは46本すべて生存を確認しました。先月は訂正版の公開で1本が消えていました",
        "出典ページ番号を106か所照合し、9項目のずれを修正しました。点数・単位数の食い違いはありません",
    ],
    cta: "plus",
    Body,
};
