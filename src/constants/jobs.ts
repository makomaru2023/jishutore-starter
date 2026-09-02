/**
 * 求人掲載（/jobs/）の設定とラベル。
 * --------------------------------------------------------------
 * ★このファイルは求人データ（@/data/jobs）を import しない。
 *   クライアントコンポーネント（JobCard 等）から読むため、
 *   データを巻き込むとバンドルが太る。fee-check.ts / fee-check-shared.ts と同じ理由。
 *
 * ★運用でよく直すのはこの3つ。他のファイルは触らなくてよい。
 *   1) JOB_POSTING_APPLICATION_URL … 申込先（Googleフォームができたらここだけ差し替え）
 *   2) JOB_MEDIA_STATS             … 月間ユーザー数と計測月
 *   3) JOB_MEDIA_SURVEY            … 利用者アンケートの集計値（回答が集まったら null をやめる）
 */

import type {
    Job,
    JobEmploymentType,
    JobFacilityType,
    JobProfession,
    JobWorkplaceInfo,
} from "@/types/job";

/** 求人掲載事業の運営名。サイト上で個人名は出さない。 */
export const JOB_OPERATOR_NAME = "SmartReha（スマートリハ）";

/**
 * 求人関連の問い合わせ先。
 * ★サイト全体の既存の問い合わせ先と同じアドレス（/contact/・/sponsor/ と共通）。
 *   business@... や recruit@... のような独自ドメインのアドレスは、
 *   実際に受信できるようになるまで公開しない。
 */
export const JOB_CONTACT_EMAIL = "smart.rehabili@gmail.com";

/**
 * 求人掲載の申込先URL。
 * --------------------------------------------------------------
 * ★TODO（申込フォームを用意したら）：
 *   Googleフォーム等のURLが決まったら、この定数を
 *     export const JOB_POSTING_APPLICATION_URL = "https://forms.gle/xxxxxxxx";
 *   に差し替えるだけでよい。/jobs/posting/ の3か所のCTAと、
 *   /jobs/ の空状態からの導線がまとめて切り替わる。
 *   （URLをページ側に直接書かないこと。ここ1か所に集約している）
 *
 * 現時点では、実際に受信できる既存の問い合わせ先へのメールにしている。
 * 件名・本文を用意しておくことで、こちらが確認すべき項目が最初のメールで揃う。
 */
const APPLICATION_MAIL_SUBJECT = "【求人掲載β版】申し込み";

/**
 * 申込メールの雛形。
 * ================================================================
 * ★項目の並びは、求人詳細ページのセクションと同じ順にしている
 *   （基本情報 → 勤務条件 → 給与・待遇 → 職場情報 → 応募）。
 *   ここで揃えておくと、返ってきたメールをそのまま data/jobs.ts に写せる。
 *
 * ★「勤務条件」の項目は、職業安定法第5条の3と、2024年4月1日施行の
 *   同法施行規則改正で募集時に明示すべきとされた事項に対応している。
 *   項目を減らすときは、その事項を別のどこで書けるかを確認すること。
 *
 * ★該当しない項目は空欄のままでよい旨を書いている。
 *   埋めさせるために「なし」と書かせると、制度が無いことを断定してしまう。
 */
const APPLICATION_MAIL_BODY = `自主トレ素材庫の求人掲載β版に申し込みます。

■ 申込者
・施設名／法人名：
・ご担当者名：
・ご連絡先（電話）：
・ご連絡先（メール）：

■ 基本情報
・施設種別（病院・老健・訪問・通所など）：
・募集職種（PT／OT／ST）：
・雇用形態（正職員・パート・契約など）：
・業務内容：
・業務内容の変更の範囲：
・就業場所（都道府県・市区町村・番地）：
・就業場所の変更の範囲：

■ 勤務条件
・契約期間（無期の場合は「期間の定めなし」）：
・（有期の場合）更新の有無・更新の基準：
・（更新上限がある場合）通算年数または更新回数の上限：
・試用期間：
・勤務時間（始業・終業時刻）：
・休憩時間：
・時間外労働の有無・見込み：
・休日・休暇：
・受動喫煙防止措置：

■ 給与・待遇
・賃金（月給・時給などの額または幅）：
・手当・賞与・昇給：
・（固定残業代がある場合）金額／含まれる時間数／超過分の取扱い：
・加入保険（労災・雇用・健康・厚生年金）：
・福利厚生：

■ 職場情報（答えられる範囲で構いません）
・リハビリ職員数（PT／OT／ST）：
・リハ職の平均経験年数：
・1日の担当人数・単位数：
・残業の実態：
・教育・新人指導の体制：
・カンファレンス・症例検討の頻度：
・学会・研修参加の支援：
・育児との両立支援：
・1日の流れ：
・職場の環境・設備：

■ 応募
・公式採用ページのURL：
・採用のご連絡先（電話番号・担当部署）：
・応募方法（応募フォーム・電話・郵送など）：

■ そのほか
・ご質問・ご要望：

※該当しない項目は空欄のままで構いません。
※内容を確認のうえ、掲載内容のご確認と請求のご案内をお送りします。
※お申し込みは求人掲載規約（https://jishutore-sozaiko.online/jobs/terms/）に同意のうえお願いします。`;

export const JOB_POSTING_APPLICATION_URL =
    `mailto:${JOB_CONTACT_EMAIL}` +
    `?subject=${encodeURIComponent(APPLICATION_MAIL_SUBJECT)}` +
    `&body=${encodeURIComponent(APPLICATION_MAIL_BODY)}`;

/** 申込先が外部サイト（Googleフォーム等）かどうか。別タブで開くかの判定に使う。 */
export const JOB_POSTING_APPLICATION_IS_EXTERNAL =
    JOB_POSTING_APPLICATION_URL.startsWith("http");

/**
 * 求人掲載β版の商品条件。
 * ★β版終了後に料金を変えるときは、ここの数字を直す。
 */
export const JOB_POSTING_BETA = {
    /** 税込価格 */
    priceYen: 5500,
    /** 掲載期間（日） */
    durationDays: 90,
    /** 先着枠 */
    slotLimit: 5,
    /** 掲載開始までの目安 */
    leadTime: "原稿・入金の確認後、原則3営業日以内",
} as const;

/** 金額表記（¥5,500）。既存の plus-pricing.ts の formatYen と同じ書式。 */
export function formatJobYen(value: number): string {
    return `¥${value.toLocaleString("ja-JP")}`;
}

/**
 * 求人掲載LP（/jobs/posting/）を検索エンジンに載せるか。
 * ==============================================================
 * ★2026-08-27：false で開始した。
 *   媒体データを8月実績に差し替えるまで、営業用のLPを検索結果に出さないため。
 *
 *   false の間の挙動：
 *     - noindex（follow は残すのでリンクはたどられる）
 *     - sitemap に載せない
 *     - ページ自体は普通に表示される
 *       → /jobs/ の「求人を掲載したい施設・法人の方へ」もフッターのリンクも切れない
 *       → 施設への営業でURLを直接送るのは今のうちからできる
 *
 *   公開に切り替える手順（2ステップだけ）：
 *     1. JOB_MEDIA_STATS を8月の数字に更新する
 *     2. この定数を true にして再デプロイする
 */
export const JOB_POSTING_LP_INDEXABLE = false;

/**
 * 媒体データ（月間ユーザー数）。
 * --------------------------------------------------------------
 * ★更新するのはこの1か所だけ。/jobs/posting/ の表示は全部ここを見ている。
 *
 * displayMode:
 *   "floor" … 100人単位で切り下げて「1,400人以上」と出す（実数が動いても表記が揺れない）
 *   "exact" … 「3,012人」と実数で出す
 *
 * ★2026-09-03 更新：2026年8月の月次実績が確定（アクティブユーザー 2,926人・前月比+106%）。
 *   前回値は2026年7月の1,418人。次は9月が確定したら同じ2つを差し替える。
 *   実数で見せたくなったら displayMode を "exact" にする。
 *
 * ⚠ 確認できていない数字を大きく見せないこと。
 *   職業安定法第5条の4は、募集情報等提供事業者に対しても
 *   「虚偽の表示又は誤解を生じさせる表示」を禁じている。
 */
export const JOB_MEDIA_STATS = {
    /** GA4のアクティブユーザー（月間） */
    monthlyActiveUsers: 2926,
    /** 上の数値の計測月 */
    measurementMonth: "2026年8月",
    /** 表示のしかた */
    displayMode: "floor" as "floor" | "exact",
} as const;

/** 「月間1,400人以上」のような表記を組み立てる。 */
export function formatMonthlyActiveUsers(): string {
    const { monthlyActiveUsers, displayMode } = JOB_MEDIA_STATS;
    if (displayMode === "exact") {
        return `月間 ${monthlyActiveUsers.toLocaleString("ja-JP")}人`;
    }
    const floored = Math.floor(monthlyActiveUsers / 100) * 100;
    return `月間 ${floored.toLocaleString("ja-JP")}人以上`;
}

/** 「（2026年7月実績・GA4）」のような注記。 */
export function formatMeasurementNote(): string {
    return `${JOB_MEDIA_STATS.measurementMonth}実績・Google Analytics 4`;
}

/** 媒体の運営開始月。 */
export const JOB_MEDIA_LAUNCH = "2026年3月";

/**
 * 利用者アンケートの集計値。
 * --------------------------------------------------------------
 * ★2026-08-26 時点：回答数がまだ少ないため null にしている。
 *   断定的な比率を出さないよう、null の間は /jobs/posting/ に何も表示されない。
 *
 * 回答が十分に集まったら、次のように書き換えるだけでセクションが出る。
 *   export const JOB_MEDIA_SURVEY: JobMediaSurvey = {
 *       rehabProfessionalPercent: 82,
 *       responseCount: 120,
 *       period: "2026年8月〜9月",
 *   };
 */
export interface JobMediaSurvey {
    /** 回答者のうちPT・OT・STが占める割合（%） */
    rehabProfessionalPercent: number;
    /** 回答数（n） */
    responseCount: number;
    /** 集計期間 */
    period: string;
}

export const JOB_MEDIA_SURVEY: JobMediaSurvey | null = null;

// ---------------------------------------------------------------
// 職場情報10項目（開示率）
// ---------------------------------------------------------------

/**
 * 「職場情報10項目」の定義。
 * ================================================================
 * この媒体の中心にある考え方：
 *   求人票では分からない職場情報を、施設に開示してもらうほど上位に出す。
 *   ＝ 求職者にとって「一覧の上ほど読む価値がある」状態を保つ。
 *
 * ★項目を選ぶときの条件：施設種別を問わず答えられること。
 *   「リハビリ室の広さ」のような病院前提の項目を10項目に入れると、
 *   訪問看護ST・小規模デイが構造的に満点を取れなくなる。
 *   紹介料を払えない小規模事業所こそ狙いたい層なので、そこを不利にしない。
 *
 * ★keys が複数あるものは「いずれか1つ埋まっていれば公開済み」。
 *   例）職員数は PT だけの事業所でも ptCount だけで成立する。
 *   例）10番目は病院ならリハビリ室、訪問なら使用機器で答えられる。
 *
 * ここに無い項目（男性の育児休業など）は、書けば詳細ページに出るが
 * 開示率には数えない（書かなくても不利にならない）。
 */
export interface JobWorkplaceDisclosureItem {
    /** 表示名 */
    label: string;
    /** いずれか1つでも埋まっていれば「公開済み」とみなす workplace のキー */
    keys: (keyof JobWorkplaceInfo)[];
    /** 施設種別ごとの書き方の例。掲載LPで採用担当者に示す */
    hint: string;
}

export const JOB_WORKPLACE_DISCLOSURE_ITEMS: JobWorkplaceDisclosureItem[] = [
    { label: "リハビリ職員数", keys: ["ptCount", "otCount", "stCount"], hint: "PT・OT・STの人数。1名でも構いません" },
    { label: "リハ職の平均経験年数", keys: ["averageExperience"], hint: "例：7年" },
    { label: "1日の担当人数・単位数", keys: ["dailyPatientCount", "dailyUnits"], hint: "訪問なら「1日5〜6件」でも構いません" },
    { label: "残業の実態", keys: ["overtime"], hint: "例：月平均5時間程度" },
    { label: "教育・新人指導の体制", keys: ["educationSystem"], hint: "プリセプター制度の有無など" },
    { label: "カンファレンス・症例検討の頻度", keys: ["conferenceFrequency"], hint: "例：症例検討会 月1回" },
    { label: "学会・研修参加の支援", keys: ["trainingSupport"], hint: "参加費補助・出張扱いの有無" },
    { label: "育児との両立支援", keys: ["childcareSupport"], hint: "時短勤務・保育所の有無" },
    { label: "1日の流れ", keys: ["dailySchedule"], hint: "始業から終業までの大まかな流れ" },
    { label: "職場の環境・設備", keys: ["equipment", "rehabRoom"], hint: "病院ならリハビリ室、訪問なら車両・使用機器" },
];

/** 開示率の分母。10項目。 */
export const JOB_WORKPLACE_DISCLOSURE_TOTAL = JOB_WORKPLACE_DISCLOSURE_ITEMS.length;

/** 値が実際に入っているか（空文字は未回答とみなす）。 */
function hasValue(value: unknown): boolean {
    if (value === undefined || value === null) return false;
    if (typeof value === "string") return value.trim() !== "";
    return true;
}

/** 10項目のうち何項目を公開しているか。 */
export function countWorkplaceDisclosure(job: Pick<Job, "workplace">): number {
    const workplace = job.workplace;
    if (!workplace) return 0;
    return JOB_WORKPLACE_DISCLOSURE_ITEMS.filter((item) =>
        item.keys.some((key) => hasValue(workplace[key])),
    ).length;
}

/**
 * 10項目すべてを公開しているか。
 * ★将来の有料「上位表示オプション」を購入できる条件になる。
 *   金を払えば上位に出せる形にすると、一覧の上に情報の薄い求人が並び、
 *   求職者が一覧を信用しなくなる（＝媒体の価値を自分で削る）。
 *   購入資格を開示量で縛ることで、課金と求職者価値が同じ方向を向く。
 */
export function isWorkplaceFullyDisclosed(job: Pick<Job, "workplace">): boolean {
    return countWorkplaceDisclosure(job) === JOB_WORKPLACE_DISCLOSURE_TOTAL;
}

// ---------------------------------------------------------------
// ラベル
// ---------------------------------------------------------------

export const jobProfessionLabels: Record<JobProfession, string> = {
    PT: "理学療法士（PT）",
    OT: "作業療法士（OT）",
    ST: "言語聴覚士（ST）",
    other: "その他リハビリ関連職",
};

/** カード上のバッジ用の短い表記。 */
export const jobProfessionShortLabels: Record<JobProfession, string> = {
    PT: "PT",
    OT: "OT",
    ST: "ST",
    other: "その他",
};

export const jobFacilityTypeLabels: Record<JobFacilityType, string> = {
    "acute-hospital": "急性期病院",
    "kaifukuki-hospital": "回復期リハビリテーション病院",
    "chronic-hospital": "療養型病院",
    clinic: "クリニック・診療所",
    roken: "介護老人保健施設",
    tokuyo: "特別養護老人ホーム",
    "day-service": "通所介護（デイサービス）",
    "day-care": "通所リハビリテーション（デイケア）",
    "home-rehab": "訪問リハビリテーション",
    "home-nursing": "訪問看護ステーション",
    welfare: "障害福祉・児童福祉",
    other: "その他",
};

export const jobEmploymentTypeLabels: Record<JobEmploymentType, string> = {
    "full-time": "正職員",
    "part-time": "パート・非常勤",
    contract: "契約職員",
    temporary: "有期・臨時職員",
};

/**
 * schema.org の JobPosting.employmentType に渡す値。
 * 参考：https://developers.google.com/search/docs/appearance/structured-data/job-posting
 */
export const jobEmploymentTypeSchemaValues: Record<JobEmploymentType, string> = {
    "full-time": "FULL_TIME",
    "part-time": "PART_TIME",
    contract: "CONTRACTOR",
    temporary: "TEMPORARY",
};

/**
 * 求人カードの設置場所。GA4 の placement パラメータに入る。
 * ★placement は既存のカスタムディメンション（line_click / survey_click 等と共通）。
 *   新しく作らずに再利用する。ここを増やすときはGA4側の見方も合わせる。
 */
export type JobPlacement =
    | "jobs_list"
    | "job_detail"
    | "items"
    | "item_detail"
    | "fee_check"
    | "column"
    | "home";

/** 「OT・ST」のような職種表記を作る。 */
export function formatProfessions(professions: readonly JobProfession[]): string {
    return professions.map((p) => jobProfessionShortLabels[p]).join("・");
}

/** 「香川県高松市」のような勤務地表記を作る。 */
export function formatJobLocation(job: Pick<Job, "prefecture" | "city">): string {
    return `${job.prefecture}${job.city}`;
}
