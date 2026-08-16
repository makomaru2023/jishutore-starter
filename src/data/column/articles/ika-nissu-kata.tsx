/**
 * コラム記事：医科の「入院からの日数」で変わる型
 *
 * ★企画書§3-9の「型で括る図解」。導線カバー率が薄かった医科3分野
 * （急性期20%・地域包括ケア17%・回復期50%）に同時に効く回。
 *
 * 出典は `src/data/fee-items/` の以下（いずれも verificationLevel: genpon）の
 * units / requirements ＝無料公開しているフィールドのみ。
 *   kyuseiki-nyuin-kikan-kasan / kyuseiki-chiiki-ippan-shoki-kasan / kyuseiki-ippan-nyuin-kihon
 *   chiiki-hokatsu-care-kihon / chiiki-hokatsu-care-shoki-kasan
 *   kaifukuki-riha-kihon
 *
 * ★records / auditPoints / pitfalls はPlus限定なので本文にも図にも書かない。
 *
 * ★狙う検索語を fee-check とずらす（§3-9 危険2）。
 *   fee-check：「入院期間に応じた加算 算定要件」等
 *   この記事：「入院日数 点数 変わる」「14日」「40日」「60日」「図解」
 *
 * ★回復期の算定日数上限は状態ごとに複数あり、記事では代表例（脳血管疾患等150日以内）だけを挙げ、
 *   「状態ごとに違う／別表第九を見る」と書くにとどめている。全部を列挙しない。
 */

import Link from "next/link";
import { Figure, H2, Li, Note, P, Ul } from "@/components/column/ColumnProse";
import type { ColumnArticle } from "@/lib/column";

function Body() {
    return (
        <>
            <P>
                医科は、入院してからの日数で点数が動きます。
                ただ「日数を過ぎるとどうなるか」の中身が、病棟によって別ものでした。
            </P>
            <P>
                減るのか、下がるのか、使えなくなるのか。
                ここを混ぜて覚えていると、月単位の見込みがずれます。
            </P>

            <H2>変わり方が3種類あります</H2>
            <Figure
                src="/column/ika-nissu-3-pattern.svg"
                alt="入院日数で変わる形を3種類に分けた図。1つ目は加算が減っていく形で、急性期（A100注3）は14日以内450点/日、15〜30日192点/日、31日目から対象外。入院料はそのままで上に乗る加算だけが動く。2つ目は入院料が下がる形で、地域包括ケア（A308-3）は40日以内2,955点、41日以上2,807点、60日が限度。土台のほうが下がる。3つ目は算定できなくなる形で、回復期リハ（A308）は状態ごとに上限日数があり、脳血管疾患等は150日以内など。超えたら別の算定へ。"
                caption="減る・下がる・使えなくなる。同じ「日数を過ぎる」でも中身が違います。"
                width={800}
                height={400}
            />
            <P>
                急性期の入院期間加算は、入院料の上に乗っている加算です。
                日数が進むと加算のほうだけが減っていき、31日目から対象外になります。入院料自体は動きません。
            </P>
            <P>
                地域包括ケアは逆で、入院料そのものに段があります。
                入院料1なら40日以内が2,955点で、41日以上は2,807点。土台が下がる形です。
            </P>
            <P>
                回復期リハは3つ目の形になります。状態ごとに算定日数の上限が決まっていて、
                そこを超えると当該入院料では算定できません。
            </P>
            <Note tone="caution" title="回復期の上限は「状態ごと」です">
                脳血管疾患・脊髄損傷・頭部外傷などは150日以内、といった具合に別表で定められています。
                状態によって日数が違うので、この記事の150日という数字を一般化しないでください。
                対象状態や日数に該当しなくなった場合の算定方法も、別に決まっています。
            </Note>

            <H2>「14日」が3か所に出てきます</H2>
            <Figure
                src="/column/ika-nissu-timeline.svg"
                alt="入院してから何日目に何が起きるかを並べた表。14日までは急性期の入院期間加算450点/日で初期加算も14日が限度。15〜30日は急性期の入院期間加算が192点/日に下がる。31日目からは急性期の入院期間加算が対象外になる。40日で地域包括ケアの入院料が下がり、入院料1は2,955から2,807点になる。60日で地域包括ケアは限度。状態ごとに回復期リハは上限日数があり、脳血管疾患等は150日以内など。下部に、14日は3か所に出てくると書かれている。"
                caption="14日・30日・40日・60日。区切りの日が病棟ごとに違います。"
                width={800}
                height={420}
            />
            <P>
                区切りの中でいちばん多く出てくるのが14日でした。
                急性期の入院期間加算のイが14日以内。急性期の救急・在宅等支援病床初期加算も14日が限度。
                地域包括ケアの初期加算も、転棟・転院・入院した日から14日を限度としています。
            </P>
            <Ul>
                <Li>
                    <strong className="font-black text-slate-900">急性期・救急・在宅等支援病床初期加算</strong>
                    ：地域一般入院基本料で150点/日。他院の一般病棟からの転院、老健や自宅からの入院などが対象です
                </Li>
                <Li>
                    <strong className="font-black text-slate-900">地域包括ケア・急性期患者支援病床初期加算</strong>
                    ：許可病床400床未満で他院の一般病棟から転棟した患者なら250点/日。400床以上なら150点/日です
                </Li>
                <Li>
                    <strong className="font-black text-slate-900">地域包括ケア・在宅患者支援病床初期加算</strong>
                    ：老健から緊急入院した患者は590点/日という区分もあります
                </Li>
            </Ul>
            <P>
                病床規模で点数が逆転しているのが面白いところです。
                急性期患者支援病床初期加算は、400床未満のほうが400床以上より高くなっています。
            </P>

            <H2>日数以外にも段はあります</H2>
            <P>
                急性期の入院期間加算には、もうひとつ軸があります。
                特別入院基本料等を算定している場合は、450点と192点ではなく300点と155点です。
            </P>
            <P>
                地域包括ケアにも似た仕組みがあって、病床が療養病床の場合は所定点数の100分の95。
                特定地域の届出病棟なら、60日を限度に特定地域の点数で算定します。
            </P>
            <P>
                入院料と加算の関係は
                <Link
                    href="/fee-check/kyuseiki/kyuseiki-nyuin-kikan-kasan/"
                    className="mx-1 font-bold text-blue-700 hover:underline"
                >
                    急性期の入院期間加算のページ
                </Link>
                と
                <Link
                    href="/fee-check/chiiki-hokatsu-care/chiiki-hokatsu-care-kihon/"
                    className="mx-1 font-bold text-blue-700 hover:underline"
                >
                    地域包括ケア病棟入院料のページ
                </Link>
                で確認できます。
            </P>

            <H2>おわりに</H2>
            <P>
                医科の日数の話は、数字だけ覚えようとすると混ざりやすいです。
                14日・30日・40日・60日と並べても、どれがどの病棟の話か分からなくなるからです。
            </P>
            <P>
                先に「変わり方が3種類ある」と押さえてしまう。
                加算が減るのか、入院料が下がるのか、算定できなくなるのか。
                そのうえで日数を当てはめると、迷いにくくなります。
            </P>
        </>
    );
}

export const article: ColumnArticle = {
    slug: "ika-nissu-kata",
    title: "入院日数で変わる医科の点数、3つのパターンがあります",
    description:
        "医科は入院からの日数で点数が動きます。急性期の入院期間加算は14日以内450点・15〜30日192点で31日目から対象外。地域包括ケアは入院料そのものが40日で下がり60日が限度。回復期は状態ごとの上限日数を超えると算定できなくなります。図解にしました。",
    category: "fee-practice",
    publishedAt: "2026-08-16",
    updatedAt: "2026-08-16",
    takeaways: [
        "日数で変わる形が3つあります。加算が減る／入院料が下がる／算定できなくなる",
        "「14日」は3か所に出てきます。急性期の入院期間加算と初期加算、地域包括ケアの初期加算です",
        "地域包括ケアは入院料そのものが40日で段になり、60日が限度です",
        "回復期の上限日数は状態ごとに違います。150日という数字を一般化しないでください",
    ],
    relatedFeeItems: [
        { domain: "kyuseiki", id: "kyuseiki-nyuin-kikan-kasan" },
        { domain: "chiiki-hokatsu-care", id: "chiiki-hokatsu-care-kihon" },
        { domain: "kaifukuki-riha", id: "kaifukuki-riha-kihon" },
        { domain: "chiiki-hokatsu-care", id: "chiiki-hokatsu-care-shoki-kasan" },
        { domain: "kyuseiki", id: "kyuseiki-chiiki-ippan-shoki-kasan" },
        { domain: "kyuseiki", id: "kyuseiki-ippan-nyuin-kihon" },
    ],
    cta: "plus",
    Body,
};
