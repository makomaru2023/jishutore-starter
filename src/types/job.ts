/**
 * 求人掲載（/jobs/）の型定義。
 * --------------------------------------------------------------
 * ★この型はデータを一切 import していないので、クライアントコンポーネントから
 *   `import type { Job } from "@/types/job"` しても安全（型は実行時に消える）。
 *   ラベル等の実体が要るときは @/constants/jobs から取ること。
 *
 * 【必須項目の考え方】
 * 職業安定法の「募集広告に明示すべき事項」を、TypeScript の必須プロパティとして
 * 縛っている。募集主・所在地・連絡先（公式採用窓口）・業務内容・就業場所・賃金が
 * 抜けたままではビルドが通らない。
 * 参考：職業安定法 第5条の3（労働条件等の明示）／第5条の4（求人等に関する情報の的確な表示）
 */

/** 掲載状態。published のみ /jobs/ の一覧に出る。 */
export type JobStatus = "draft" | "published" | "expired";

/** 募集職種。将来のフィルター（PT / OT / ST）の単位。 */
export type JobProfession = "PT" | "OT" | "ST" | "other";

/** 施設種別。将来のフィルター（病院 / 老健 / 訪問 / 通所）の単位。 */
export type JobFacilityType =
    | "acute-hospital"
    | "kaifukuki-hospital"
    | "chronic-hospital"
    | "clinic"
    | "roken"
    | "tokuyo"
    | "day-service"
    | "day-care"
    | "home-rehab"
    | "home-nursing"
    | "welfare"
    | "other";

/** 雇用形態。schema.org の employmentType へも変換する（@/constants/jobs）。 */
export type JobEmploymentType = "full-time" | "part-time" | "contract" | "temporary";

/** 都道府県。表記ゆれ（「香川」/「香川県」）を型で防ぐ。将来の絞り込みキー。 */
export type JobPrefecture =
    | "北海道" | "青森県" | "岩手県" | "宮城県" | "秋田県" | "山形県" | "福島県"
    | "茨城県" | "栃木県" | "群馬県" | "埼玉県" | "千葉県" | "東京都" | "神奈川県"
    | "新潟県" | "富山県" | "石川県" | "福井県" | "山梨県" | "長野県"
    | "岐阜県" | "静岡県" | "愛知県" | "三重県"
    | "滋賀県" | "京都府" | "大阪府" | "兵庫県" | "奈良県" | "和歌山県"
    | "鳥取県" | "島根県" | "岡山県" | "広島県" | "山口県"
    | "徳島県" | "香川県" | "愛媛県" | "高知県"
    | "福岡県" | "佐賀県" | "長崎県" | "熊本県" | "大分県" | "宮崎県" | "鹿児島県" | "沖縄県";

/**
 * リハ職が知りたい職場情報（すべて任意）。
 * すべての施設が答えられるとは限らないため、値が無い項目は詳細ページに出さない。
 * 「答えられる範囲だけ書けばよい」ことが分かるよう、まとめて1ブロックにしている。
 */
export interface JobWorkplaceInfo {
    /** 理学療法士の人数 */
    ptCount?: number;
    /** 作業療法士の人数 */
    otCount?: number;
    /** 言語聴覚士の人数 */
    stCount?: number;
    /** リハ職の平均経験年数（例：「7年」） */
    averageExperience?: string;
    /** 1日の担当患者・利用者数の目安（例：「1日 15〜18名」） */
    dailyPatientCount?: string;
    /** 1日の平均単位数（例：「1日 18単位前後」） */
    dailyUnits?: string;
    /** 残業の実態（例：「月平均5時間程度」） */
    overtime?: string;
    /** 教育・新人指導の体制 */
    educationSystem?: string;
    /** 症例検討・カンファレンスの頻度 */
    conferenceFrequency?: string;
    /** 学会・研修参加の支援 */
    trainingSupport?: string;
    /** 育児との両立支援（院内保育・時短勤務など） */
    childcareSupport?: string;
    /** 男性の育児休業の取得実績 */
    maleParentalLeave?: string;
    /** 主な機器・設備 */
    equipment?: string;
    /** リハビリ室の広さ・環境 */
    rehabRoom?: string;
    /** 1日の流れ */
    dailySchedule?: string;
}

/**
 * 将来のコンテキスト連動配信（素材ページ・報酬チェック等への出し分け）用。
 * ★今回は配信システムそのものは作らない。データ構造だけ用意しておく。
 */
export interface JobTargeting {
    /** この求人を見せたい職種 */
    targetProfessions?: JobProfession[];
    /** この求人を見せたい施設種別（利用者の関心領域） */
    targetFacilityTypes?: JobFacilityType[];
    /** この求人を見せたいトピック（例：["home-rehab", "adl"]） */
    targetTopics?: string[];
}

/**
 * 構造化データ（JobPosting の baseSalary）用の数値。
 * salary は表示用の自由文なので、機械可読な金額はここに別途持たせる（任意）。
 * 参考：https://developers.google.com/search/docs/appearance/structured-data/job-posting
 */
export interface JobBaseSalary {
    /** 期間の単位。schema.org の unitText に渡す */
    unitText: "HOUR" | "DAY" | "WEEK" | "MONTH" | "YEAR";
    /** 下限（幅がある場合） */
    minValue?: number;
    /** 上限（幅がある場合） */
    maxValue?: number;
    /** 単一額の場合 */
    value?: number;
}

export interface Job {
    // ---------- 識別・掲載管理 ----------
    /** 内部ID。GA4 の job_id になる。掲載終了後もレポートのために変えない */
    id: string;
    /** URL スラッグ。/jobs/<slug>/ になる */
    slug: string;
    /** 掲載状態。published のみ一覧に出る */
    status: JobStatus;
    /** 掲載開始日 YYYY-MM-DD */
    publishedAt: string;
    /** 掲載終了日 YYYY-MM-DD（β版は掲載開始から90日後） */
    expiresAt: string;
    /**
     * 掲載サンプル（架空求人）かどうか。
     * true のものは本番デプロイでは表示せず、sitemap にも構造化データにも出さない。
     * 実在の求人と誤認させないための安全弁。
     */
    isSample?: boolean;

    // ---------- 募集内容（職業安定法の明示事項）----------
    /** 求人の見出し（例：「作業療法士（正職員）」）。施設名は入れない */
    title: string;
    /** 募集職種。複数職種の募集に対応するため配列 */
    profession: JobProfession[];
    /** 施設名（募集主） */
    facilityName: string;
    /** 運営法人名。施設名と別のときに書く */
    corporationName?: string;
    /** 施設種別 */
    facilityType: JobFacilityType;
    /** 都道府県 */
    prefecture: JobPrefecture;
    /** 市区町村 */
    city: string;
    /** 就業の場所（所在地）。番地まで。職業安定法の明示事項 */
    address: string;
    /** 雇用形態 */
    employmentType: JobEmploymentType;
    /** 賃金。表示用の自由文（例：「月給 240,000円〜300,000円」） */
    salary: string;
    /** 賃金の補足（各種手当・賞与・昇給の有無など） */
    salaryNote?: string;
    /** 機械可読な賃金。構造化データに使う（任意） */
    baseSalary?: JobBaseSalary;
    /** 勤務時間（始業・終業時刻、休憩時間） */
    workHours: string;
    /** 休日・休暇 */
    holidays: string;
    /** 業務内容。職業安定法の明示事項 */
    jobDescription: string;
    /**
     * 従事すべき業務の変更の範囲。
     * 2024年4月1日施行の改正職業安定法施行規則で明示事項に追加された項目。
     */
    jobScopeOfChange?: string;
    /** 就業の場所の変更の範囲。同じく2024年4月1日から明示事項 */
    workplaceScopeOfChange?: string;
    /** 応募資格 */
    requirements: string;
    /** 福利厚生 */
    benefits?: string;
    /** 試用期間 */
    trialPeriod?: string;
    /** 労働契約の期間（無期の場合は「期間の定めなし」） */
    contractPeriod?: string;
    /**
     * 有期労働契約を更新する場合の基準。
     * 2024年4月1日から明示事項。有期契約のときは必ず書く
     */
    contractRenewal?: string;
    /** 加入保険（労災・雇用・健康・厚生年金） */
    insurance?: string;
    /** 就業場所における受動喫煙防止措置。職業安定法の明示事項 */
    smokingPolicy?: string;

    // ---------- 応募窓口 ----------
    /**
     * 施設・法人の公式採用ページURL。
     * ★自主トレ素材庫では応募を受け付けない。応募はすべてここへ送る
     */
    officialRecruitUrl: string;
    /** 公式の採用連絡先（電話番号・担当部署など）。職業安定法の明示事項 */
    contact?: string;

    // ---------- 任意 ----------
    /** リハ職が知りたい職場情報。答えられる範囲だけ書けばよい */
    workplace?: JobWorkplaceInfo;
    /** 将来のコンテキスト連動配信用 */
    targeting?: JobTargeting;
}
