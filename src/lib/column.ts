/**
 * サイト内コラム（/column/）のレジストリと型。
 *
 * 方式：記事は1ファイル1記事の TSX モジュール（`src/data/column/articles/*.tsx`）。
 * MDX 等の追加依存を入れず、frontmatter 相当のメタデータを型で縛る。
 * 記事の追加はこのファイルの `articles` に1行足すだけ。
 *
 * ★このモジュールはクライアントコンポーネントから import しないこと。
 * 記事本体（JSX）と fee-check の全データを巻き込むため、バンドルが太る。
 * ラベルやリンク先が必要なときは、サーバー側から props で渡す。
 * （fee-check.ts / fee-check-shared.ts を分けているのと同じ理由）
 */

import type { ComponentType } from "react";
import { getFeeItem } from "@/lib/fee-check";
import { findItemById, getItems } from "@/lib/items";

import { article as anzenTaisakuTaiseiKasan } from "@/data/column/articles/anzen-taisaku-taisei-kasan";
import { article as ashikubiTsumazuki } from "@/data/column/articles/ashikubi-tsumazuki";
import { article as taikanJishutoreJunban } from "@/data/column/articles/taikan-jishutore-junban";
import { article as bcpMisakuteiGensan } from "@/data/column/articles/bcp-misakutei-gensan";
import { article as chiikiKasanKata } from "@/data/column/articles/chiiki-kasan-kata";
import { article as hizaItaiJishutore } from "@/data/column/articles/hiza-itai-jishutore";
import { article as heisantei4kata } from "@/data/column/articles/heisantei-4kata";
import { article as hokatsuToDemidaka } from "@/data/column/articles/hokatsu-to-demidaka";
import { article as hoshuCheck4shurui } from "@/data/column/articles/hoshu-check-4shurui";
import { article as hoshuCheckPageYomikata } from "@/data/column/articles/hoshu-check-page-yomikata";
import { article as isuKurumaisuSuwarikata } from "@/data/column/articles/isu-kurumaisu-suwarikata";
import { article as kaidanNoboriKudari } from "@/data/column/articles/kaidan-nobori-kudari";
import { article as kaifukukiBetsuNiToreru } from "@/data/column/articles/kaifukuki-betsu-ni-toreru";
import { article as kaifukukiShisetsuKijun } from "@/data/column/articles/kaifukuki-shisetsu-kijun";
import { article as kaifukukiDonichiRiha } from "@/data/column/articles/kaifukuki-donichi-riha";
import { article as kaifukukiFimNandoMoHakaru } from "@/data/column/articles/kaifukuki-fim-nando-mo-hakaru";
import { article as chiikiHokatsuDokoKaraKitaKa } from "@/data/column/articles/chiiki-hokatsu-doko-kara-kita-ka";
import { article as daycareRihaShokuGaIru } from "@/data/column/articles/daycare-riha-shoku-ga-iru";
import { article as chiikiHokatsuKangoKasan } from "@/data/column/articles/chiiki-hokatsu-kango-kasan";
import { article as kaifukukiToiletToHomon } from "@/data/column/articles/kaifukuki-toilet-to-homon";
import { article as kansenshoSaigaiKata } from "@/data/column/articles/kansensho-saigai-kata";
import { article as kijunWareGensanKata } from "@/data/column/articles/kijun-ware-gensan-kata";
import { article as koshiKinkiKaraKimeru } from "@/data/column/articles/koshi-kinki-kara-kimeru";
import { article as rokenKaeruTameNoShisetsu } from "@/data/column/articles/roken-kaeru-tame-no-shisetsu";
import { article as rokenIshiGaDetekuruRiyu } from "@/data/column/articles/roken-ishi-ga-detekuru-riyu";
import { article as rokenShokujiNiHitoGaAtsumaru } from "@/data/column/articles/roken-shokuji-ni-hito-ga-atsumaru";
import { article as rokenTaishoMaeGaIsogashii } from "@/data/column/articles/roken-taisho-mae-ga-isogashii";
import { article as rokenRihaShu3To3kagetsu } from "@/data/column/articles/roken-riha-shu3-3kagetsu";
import { article as rokenSaishoNo1kagetsu } from "@/data/column/articles/roken-saisho-no-1kagetsu";
import { article as rokenGaihakuJihi } from "@/data/column/articles/roken-gaihaku-jihi";
import { article as rokenHaisetsuShien3kubun } from "@/data/column/articles/roken-haisetsu-shien-3kubun";
import { article as rokenRehamaneKeikakushoJoho } from "@/data/column/articles/roken-rehamane-keikakusho-joho";
import { article as rokenRyoyoTaiseiIjiTokubetsu } from "@/data/column/articles/roken-ryoyo-taisei-iji-tokubetsu";
import { article as rokenHibiNoZogen } from "@/data/column/articles/roken-hibi-no-zogen";
import { article as rokenKaigoKikiFueta } from "@/data/column/articles/roken-kaigo-kiki-fueta";
import { article as tsushoEnchoKasan } from "@/data/column/articles/tsusho-encho-kasan";
import { article as nyuyokuDosaJishutore } from "@/data/column/articles/nyuyoku-dosa-jishutore";
import { article as ikigireJishutoreWatashikata } from "@/data/column/articles/ikigire-jishutore-watashikata";
import { article as ikouShienSotsugyoKata } from "@/data/column/articles/ikou-shien-sotsugyo-kata";
import { article as iryoKaigoDochira } from "@/data/column/articles/iryo-kaigo-dochira";
import { article as kataGaAgaranaiJishutore } from "@/data/column/articles/kata-ga-agaranai-jishutore";
import { article as kihonHoshuKata } from "@/data/column/articles/kihon-hoshu-kata";
import { article as kinouKunrenShidoin8shokushu } from "@/data/column/articles/kinou-kunren-shidoin-8shokushu";
import { article as kokuuEiyoKasanKata } from "@/data/column/articles/kokuu-eiyo-kasan-kata";
import { article as ninchishoKasanMap } from "@/data/column/articles/ninchisho-kasan-map";
import { article as shoguKaizenKata } from "@/data/column/articles/shogu-kaizen-kata";
import { article as teYubiJishutoreJunban } from "@/data/column/articles/te-yubi-jishutore-junban";
import { article as benkyokaiShiryoMaeNiKimeru } from "@/data/column/articles/benkyokai-shiryo-mae-ni-kimeru";
import { article as doitsuTatemonoSogeiGensan } from "@/data/column/articles/doitsu-tatemono-sogei-gensan";
import { article as hainyoJiritsuKaifukuki } from "@/data/column/articles/hainyo-jiritsu-kaifukuki";
import { article as homonRihaShinryoMijisshiGensan } from "@/data/column/articles/homon-riha-shinryo-mijisshi-gensan";
import { article as homonRihaKaisuDareGaKimeru } from "@/data/column/articles/homon-riha-kaisu-dare-ga-kimeru";
import { article as kaiteiJohoDokoWoMiru } from "@/data/column/articles/kaitei-joho-doko-wo-miru";
import { article as jishutoreTsuzukanaiWatashikata } from "@/data/column/articles/jishutore-tsuzukanai-watashikata";
import { article as homonKangoRiha8tani } from "@/data/column/articles/homon-kango-riha-8tani";
import { article as homonKangoRihaShokuGaKuru } from "@/data/column/articles/homon-kango-riha-shoku-ga-kuru";
import { article as ikaNissuKata } from "@/data/column/articles/ika-nissu-kata";
import { article as johoRenkeiKata } from "@/data/column/articles/joho-renkei-kata";
import { article as chujudoNinchishoKasanKata } from "@/data/column/articles/chujudo-ninchisho-kasan-kata";
import { article as kokujiChuNoYomikata } from "@/data/column/articles/kokuji-chu-no-yomikata";
import { article as kokujiKigouYomikata } from "@/data/column/articles/kokuji-kigou-yomikata";
import { article as taiinKyodoShidoKata } from "@/data/column/articles/taiin-kyodo-shido-kata";
import { article as henmahiJishutoreErabikata } from "@/data/column/articles/henmahi-jishutore-erabikata";
import { article as jishutoreCheckHyo } from "@/data/column/articles/jishutore-check-hyo";
import { article as tachiagariHokoJishutore } from "@/data/column/articles/tachiagari-hoko-jishutore";
import { article as tsueHokokiRenshu } from "@/data/column/articles/tsue-hokoki-renshu";
import { article as stretchItsuWatasu } from "@/data/column/articles/stretch-itsu-watasu";
import { article as tentoYoboTaisoKumikata } from "@/data/column/articles/tento-yobo-taiso-kumikata";
import { article as kaiteiWatch202608 } from "@/data/column/articles/kaitei-watch-2026-08";
import { article as kaiteiWatch202609 } from "@/data/column/articles/kaitei-watch-2026-09";
import { article as kanpoTeiseiToWa } from "@/data/column/articles/kanpo-teisei-to-wa";
import { article as keikoIjiKasanNagare } from "@/data/column/articles/keiko-iji-kasan-nagare";
import { article as kokueiyoScreeningNagare } from "@/data/column/articles/kokueiyo-screening-nagare";
import { article as kokujiTsuchiGigikaishakuChigai } from "@/data/column/articles/kokuji-tsuchi-gigikaishaku-chigai";
import { article as kokukuTaisoJunban } from "@/data/column/articles/kokuku-taiso-junban";
import { article as kyotakuHomonKasanKata } from "@/data/column/articles/kyotaku-homon-kasan-kata";
import { article as kyuseikiTaiinHayaiRiyu } from "@/data/column/articles/kyuseiki-taiin-hayai-riyu";
import { article as lifeTeishutsuKata } from "@/data/column/articles/life-teishutsu-kata";
import { article as mijisshiGensanKata } from "@/data/column/articles/mijisshi-gensan-kata";
import { article as ninchishoTankiShuchuRihaTsusho } from "@/data/column/articles/ninchisho-tanki-shuchu-riha-tsusho";
import { article as nyushoZengoHomonShidoJitsumu } from "@/data/column/articles/nyusho-zengo-homon-shido-jitsumu";
import { article as rihaKeikakushoSetsumeiTejun } from "@/data/column/articles/riha-keikakusho-setsumei-tejun";
import { article as rokenShokiKasanKubun } from "@/data/column/articles/roken-shoki-kasan-kubun";
import { article as rokenTaishojiShienKasan } from "@/data/column/articles/roken-taishoji-shien-kasan";
import { article as serviceTaiseiKyokaKata } from "@/data/column/articles/service-taisei-kyoka-kata";
import { article as santeiYoukenToShisetsuKijun } from "@/data/column/articles/santei-youken-to-shisetsu-kijun";
import { article as tankiShuchuRihaKata } from "@/data/column/articles/tanki-shuchu-riha-kata";
import { article as tanisuNoKakikata } from "@/data/column/articles/tanisu-no-kakikata";
import { article as zaitakuFukkiRyoyoShienKubun } from "@/data/column/articles/zaitaku-fukki-ryoyo-shien-kubun";

export type ColumnCategory = "fee-practice" | "kaitei-watch" | "seido-yomikata" | "shiryo";

/** 記事末尾のCTA。1記事につき1つだけ（詰め込まない・企画書§4）。 */
export type ColumnCtaId = "plus" | "free-items";

export type ColumnRelatedFeeItem = {
    /** fee-check の分野ID（例 "roken-nyusho"） */
    domain: string;
    /** fee-check の項目ID（例 "roken-nyusho-nyusho-zengo-homon-shido"） */
    id: string;
};

export type ColumnArticle = {
    /** URL になる。`/column/<slug>/` */
    slug: string;
    /** h1・metadata title のもと。先頭に検索語を置く（編集ガイド§3） */
    title: string;
    /** metadata description。120〜150字で記事の答えを先出しする */
    description: string;
    category: ColumnCategory;
    /** YYYY-MM-DD */
    publishedAt: string;
    /** YYYY-MM-DD。sitemap の lastModified と JSON-LD の dateModified に使う */
    updatedAt: string;
    /**
     * 記事冒頭のアイキャッチ画像（任意）。`public/column/` に置いた画像を指す。
     * ファイル名は kebab-case の ASCII。alt は「何が描かれているか」を書く。
     * ★場面イラスト用。数字や要件を伝える図解は本文の Figure（SVG）で扱うこと。
     */
    hero?: { src: string; alt: string; width: number; height: number };
    /** 「この記事でわかること」。3点が基本 */
    takeaways: string[];
    /** 関連する報酬チェック。3件まで。ビルド時に実在チェックする */
    relatedFeeItems?: ColumnRelatedFeeItem[];
    /** 関連する無料素材のID（items.json）。任意。ビルド時に実在チェックする */
    relatedItems?: string[];
    cta: ColumnCtaId;
    /** 本文。h2 は2〜4個（編集ガイド§3） */
    Body: ComponentType;
};

export const columnCategoryLabels: Record<ColumnCategory, string> = {
    "fee-practice": "加算と記録の実務",
    "kaitei-watch": "改定ウォッチ",
    // 個別の加算ではなく、制度の資料そのものの読み方を扱う回。
    // 「聞きにくいけれど誰も教えてくれない」ところを引き受ける枠。
    "seido-yomikata": "制度の読み方",
    shiryo: "資料づくりのコツ",
};

export const columnCategoryStyles: Record<ColumnCategory, string> = {
    "fee-practice": "border-blue-200 bg-blue-50 text-blue-800",
    "kaitei-watch": "border-amber-200 bg-amber-50 text-amber-800",
    "seido-yomikata": "border-violet-200 bg-violet-50 text-violet-800",
    shiryo: "border-emerald-200 bg-emerald-50 text-emerald-800",
};

/**
 * 記事の一覧。**この配列の順番が、公開日が同じ記事どうしの表示順になる**。
 * 見せたい順に並べること（先頭ほど上に出る）。
 */
const articles: ColumnArticle[] = [
    // ★イラスト層（来訪者の約半分）向けの回。素材ページが答えていない
    // 「何をどの順で」「渡したあと続かない」を担当する。`relatedItems` で素材へ返す。
    ikigireJishutoreWatashikata,
    teYubiJishutoreJunban,
    kataGaAgaranaiJishutore,
    hizaItaiJishutore,
    koshiKinkiKaraKimeru,
    kaidanNoboriKudari,
    nyuyokuDosaJishutore,
    isuKurumaisuSuwarikata,
    ashikubiTsumazuki,
    tsueHokokiRenshu,
    taikanJishutoreJunban,
    stretchItsuWatasu,
    kokukuTaisoJunban,
    jishutoreTsuzukanaiWatashikata,
    jishutoreCheckHyo,
    tentoYoboTaisoKumikata,
    henmahiJishutoreErabikata,
    tachiagariHokoJishutore,
    kaiteiWatch202609,
    kaiteiWatch202608,
    // ★入門層。加算を調べに来た人ではなく「加算に興味のない現場職員」向けの回。
    // 素朴な疑問（なぜ週3回・なぜ3か月・最初の1週間が慌ただしい理由）から入り、
    // 答えが制度にあると気づいてもらって fee-check へ送る。導線の向きが他の層と逆。
    // ★タイトルとdescriptionに加算名を入れないこと（既存の加算記事と食い合うため）。
    kyuseikiTaiinHayaiRiyu,
    rokenKaigoKikiFueta,
    homonKangoRihaShokuGaKuru,
    homonRihaKaisuDareGaKimeru,
    daycareRihaShokuGaIru,
    kinouKunrenShidoin8shokushu,
    chiikiHokatsuDokoKaraKitaKa,
    kaifukukiFimNandoMoHakaru,
    kaifukukiDonichiRiha,
    kaifukukiToiletToHomon,
    rokenShokujiNiHitoGaAtsumaru,
    rokenTaishoMaeGaIsogashii,
    rokenIshiGaDetekuruRiyu,
    rokenSaishoNo1kagetsu,
    rokenRihaShu3To3kagetsu,
    rokenKaeruTameNoShisetsu,
    // 図解つきの回。fee-check の項目ページから逆引きで呼ばれる（getColumnsByFeeItem）。
    // 表示が出ているのにクリックが取れていない項目を、別の検索語（流れ・図解・違い）で拾いにいく回。
    kokueiyoScreeningNagare,
    zaitakuFukkiRyoyoShienKubun,
    keikoIjiKasanNagare,
    hainyoJiritsuKaifukuki,
    // ★「型」で括った回（企画書_コラムの部分公開とPlus導線 §3-9）。個別の加算ではなく、
    // 複数項目に共通する進み方を1枚の図にしてある。1本で5〜10項目の導線を兼ねる。
    kaifukukiShisetsuKijun,
    kaifukukiBetsuNiToreru,
    kijunWareGensanKata,
    kansenshoSaigaiKata,
    rokenGaihakuJihi,
    rokenHaisetsuShien3kubun,
    rokenRehamaneKeikakushoJoho,
    rokenRyoyoTaiseiIjiTokubetsu,
    rokenHibiNoZogen,
    tsushoEnchoKasan,
    chiikiHokatsuKangoKasan,
    shoguKaizenKata,
    kihonHoshuKata,
    kokuuEiyoKasanKata,
    ninchishoKasanMap,
    chiikiKasanKata,
    ikouShienSotsugyoKata,
    iryoKaigoDochira,
    kyotakuHomonKasanKata,
    lifeTeishutsuKata,
    mijisshiGensanKata,
    doitsuTatemonoSogeiGensan,
    tankiShuchuRihaKata,
    johoRenkeiKata,
    serviceTaiseiKyokaKata,
    ikaNissuKata,
    homonKangoRiha8tani,
    taiinKyodoShidoKata,
    chujudoNinchishoKasanKata,
    // 「制度の読み方」は、加算の記事を読むための土台になる回。先頭近くに置く。
    hoshuCheck4shurui,
    heisantei4kata,
    kokujiKigouYomikata,
    hoshuCheckPageYomikata,
    hokatsuToDemidaka,
    kokujiChuNoYomikata,
    tanisuNoKakikata,
    kokujiTsuchiGigikaishakuChigai,
    santeiYoukenToShisetsuKijun,
    kanpoTeiseiToWa,
    kaiteiJohoDokoWoMiru,
    rokenShokiKasanKubun,
    homonRihaShinryoMijisshiGensan,
    nyushoZengoHomonShidoJitsumu,
    rokenTaishojiShienKasan,
    rihaKeikakushoSetsumeiTejun,
    ninchishoTankiShuchuRihaTsusho,
    bcpMisakuteiGensan,
    anzenTaisakuTaiseiKasan,
    benkyokaiShiryoMaeNiKimeru,
];

export function getColumnUrl(slug: string): string {
    return `/column/${slug}/`;
}

/**
 * 新着順（publishedAt の降順）。同じ公開日の記事は `articles` の並び順を保つ。
 * slug のアルファベット順にすると、まとめて公開した月の並びが意味を持たなくなるため。
 */
export function getColumnArticles(): ColumnArticle[] {
    return articles
        .map((article, index) => ({ article, index }))
        .sort((a, b) =>
            a.article.publishedAt === b.article.publishedAt
                ? a.index - b.index
                : b.article.publishedAt.localeCompare(a.article.publishedAt),
        )
        .map(({ article }) => article);
}

export function getColumnArticle(slug: string): ColumnArticle | undefined {
    return articles.find((article) => article.slug === slug);
}

/**
 * 最新の改定ウォッチ記事。fee-check 側の「今月の変更まとめ」導線が参照する。
 * 記事が1本も無い間は undefined を返し、導線側で出し分ける。
 */
export function getLatestKaiteiWatch(): ColumnArticle | undefined {
    return getColumnArticles().find((article) => article.category === "kaitei-watch");
}

/**
 * relatedFeeItems を fee-check の実データに解決する（表示用に項目名・単位数を取る）。
 *
 * ★記事末尾に出すのは先頭 DISPLAYED_RELATED_FEE_ITEMS 件だけ。
 * 「型」で書いた図解記事（居宅訪問型・LIFE型など）は5〜10項目に当てはまるので、
 * データとしては多く持たせ、記事側の見た目だけ絞る（企画書_コラムの部分公開とPlus導線 §3-9）。
 */
export function resolveColumnRelatedFeeItems(article: ColumnArticle) {
    return (article.relatedFeeItems ?? []).slice(0, DISPLAYED_RELATED_FEE_ITEMS).flatMap((ref) => {
        const found = getFeeItem(ref.domain, ref.id);
        return found ? [found] : [];
    });
}

/**
 * relatedItems を items.json の実データに解決する（記事末尾にサムネイル付きで出す）。
 *
 * イラスト層向けの記事（口腔体操の順番・自主トレの渡し方など）では、
 * 「記事で説明した動きの絵が、そのまま無料で取れる」ことが記事の値打ちになる。
 * 本文中のテキストリンクだけだと絵を探しに行く動作が要るので、末尾に並べて見せる。
 */
export function resolveColumnRelatedItems(article: ColumnArticle) {
    return (article.relatedItems ?? []).flatMap((id) => {
        const found = findItemById(id);
        return found ? [found] : [];
    });
}

/**
 * fee-check の項目から、その項目を扱っているコラム記事を逆引きする。
 *
 * 用途：報酬チェック項目ページの「算定要件」の直後に「図解で解説しています」を出す導線。
 * 文字の要件を読み終えた直後＝いちばんつまずいている瞬間に置くのが狙い（企画書§3-9）。
 *
 * ★新しいデータは持たない。記事側の relatedFeeItems をそのまま逆から引くだけ。
 * ビルド時に実在チェックが通っているので、ここで死リンクは生まれない。
 * 並び順は getColumnArticles()（新着順）に従う。
 */
export function getColumnsByFeeItem(domain: string, id: string): ColumnArticle[] {
    return getColumnArticles().filter((article) =>
        (article.relatedFeeItems ?? []).some((ref) => ref.domain === domain && ref.id === id),
    );
}

// --- ビルド時の検証（企画書§3の必須条件） ---
// typo で死リンクを作らないよう、ここで落とす。next build で気づける。

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
// データとして持てる上限。「型」で書いた記事は多くの項目に当てはまるので広めに取る。
const MAX_RELATED_FEE_ITEMS = 10;
// 記事末尾のカードに実際に出す件数。見た目が散らからないよう先頭3件に絞る。
const DISPLAYED_RELATED_FEE_ITEMS = 3;

function fail(slug: string, message: string): never {
    throw new Error(`[column] 記事 "${slug}": ${message}`);
}

const seenSlugs = new Set<string>();
const itemIds = new Set(getItems().map((item) => item.id));

for (const article of articles) {
    const { slug } = article;

    if (!/^[a-z0-9-]+$/.test(slug)) {
        fail(slug, "slug は英小文字・数字・ハイフンのみで書きます（URLになるため）。");
    }
    if (seenSlugs.has(slug)) {
        fail(slug, "slug が重複しています。");
    }
    seenSlugs.add(slug);

    if (!DATE_PATTERN.test(article.publishedAt)) {
        fail(slug, `publishedAt が YYYY-MM-DD 形式ではありません: "${article.publishedAt}"`);
    }
    if (!DATE_PATTERN.test(article.updatedAt)) {
        fail(slug, `updatedAt が YYYY-MM-DD 形式ではありません: "${article.updatedAt}"`);
    }
    if (article.updatedAt < article.publishedAt) {
        fail(slug, "updatedAt が publishedAt より前になっています。");
    }

    // description は検索結果に出る。長すぎると切られ、短すぎると答えを先出しできない。
    // ★下限は編集ガイド§6の120字。当初80字にしていたら14本中12本が100字前後で素通りし、
    // 検索語のバリエーションを載せる面積が取れていなかった（2026-08-12に全件を書き直した）。
    if (article.description.length < 120 || article.description.length > 160) {
        fail(slug, `description は120〜160字にします（現在 ${article.description.length}字）。`);
    }
    if (article.takeaways.length < 2 || article.takeaways.length > 4) {
        fail(slug, `「この記事でわかること」は2〜4点にします（現在 ${article.takeaways.length}点）。`);
    }

    const relatedFeeItems = article.relatedFeeItems ?? [];
    if (relatedFeeItems.length > MAX_RELATED_FEE_ITEMS) {
        fail(slug, `relatedFeeItems は${MAX_RELATED_FEE_ITEMS}件までです（現在 ${relatedFeeItems.length}件）。`);
    }
    for (const ref of relatedFeeItems) {
        if (!getFeeItem(ref.domain, ref.id)) {
            fail(slug, `relatedFeeItems に存在しない報酬チェック項目が指定されています: ${ref.domain} / ${ref.id}`);
        }
    }

    for (const itemId of article.relatedItems ?? []) {
        if (!itemIds.has(itemId)) {
            fail(slug, `relatedItems に存在しない素材IDが指定されています: ${itemId}`);
        }
    }

    if (article.hero) {
        if (!article.hero.src.startsWith("/column/")) {
            fail(slug, `hero.src は /column/ 配下にします（現在 "${article.hero.src}"）。`);
        }
        if (!/^\/column\/[a-z0-9-]+\.(svg|png|jpg|webp)$/.test(article.hero.src)) {
            fail(slug, `hero.src のファイル名は kebab-case の ASCII にします（現在 "${article.hero.src}"）。`);
        }
        if (article.hero.alt.length < 10) {
            fail(slug, "hero.alt は何が描かれているか分かる説明文にします。");
        }
    }
}
