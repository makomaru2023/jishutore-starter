/**
 * 求人台帳。/jobs/ と /jobs/<slug>/ はこの配列だけを見ている。
 * ================================================================
 * 【求人を1件追加する手順】
 *   1. この配列の末尾に Job を1つ足す（下のサンプルをコピーして書き換えるのが速い）
 *   2. npm run build  … 必須項目が抜けていればここで落ちる
 *   3. commit → git push origin main → Vercel が自動デプロイ
 *
 *   これだけで /jobs/ の一覧・/jobs/<slug>/ の詳細ページ・sitemap・構造化データが
 *   すべて自動で生成される。他のファイルを触る必要はない。
 *
 * 【書くときの注意】
 *   - status を "published" にするまで公開されない。原稿確認中は "draft" のままにする
 *   - expiresAt は掲載開始から90日後（β版の掲載期間）
 *   - id は掲載終了後も変えない（GA4のレポートが分断されるため）
 *   - 実態と違う条件・確認できない数字は書かない
 *     （職業安定法第5条の4：虚偽の表示・誤解を生じさせる表示の禁止）
 *   - 有期契約のときは contractPeriod と contractRenewal を必ず書く
 *   - 長い一文には読点（、）を入れる。日本語は読点・中黒でしか折り返さない設定
 *     （globals.css の .jp-wrap）なので、20字以上つながると単語の途中で割れる
 *   - workplace（リハ職が知りたい職場情報）は、施設が答えられた項目だけ書く。
 *     書かなかった項目は詳細ページに出ない
 */

import type { Job } from "@/types/job";

export const jobs: Job[] = [
    /**
     * ★掲載サンプル（架空の求人）。
     * isSample: true のものは本番デプロイでは表示されず、sitemap にも
     * 構造化データにも出ない（src/lib/jobs.ts の getVisibleJobs / buildJobPostingJsonLd）。
     * ローカルの npm run dev と Vercel のプレビュー環境でだけ確認できる。
     * 実在する病院・法人の名称は使っていない。
     */
    {
        id: "sample-001",
        slug: "sample-rehabilitation-hospital-ot",
        status: "published",
        publishedAt: "2026-09-01",
        expiresAt: "2026-11-30",
        isSample: true,

        title: "作業療法士（正職員）",
        profession: ["OT"],
        facilityName: "サンプルリハビリテーション病院",
        corporationName: "医療法人サンプル会",
        facilityType: "kaifukuki-hospital",
        prefecture: "香川県",
        city: "高松市",
        address: "香川県高松市サンプル町1-2-3",

        employmentType: "full-time",
        salary: "月給 240,000円〜300,000円",
        salaryNote:
            "経験・能力を考慮して決定します。基本給180,000円〜240,000円＋資格手当30,000円＋調整手当30,000円を含みます。昇給あり（年1回）／賞与あり（年2回・計3.5か月分／前年度実績）。時間外手当は全額支給します。",
        baseSalary: { unitText: "MONTH", minValue: 240000, maxValue: 300000 },
        workHours: "8:30〜17:30（休憩60分／所定労働時間8時間）　時間外労働あり",
        holidays: "年間休日120日／4週8休制／夏季休暇3日・年末年始休暇5日・有給休暇（初年度10日）",

        jobDescription:
            "回復期リハビリテーション病棟での、作業療法業務です。脳血管疾患・運動器疾患の患者さんを中心に、ADL訓練、上肢機能訓練、家屋調査、退院前訪問指導、家族指導を担当します。カンファレンス・リハビリテーション実施計画書の作成を含みます。",
        jobScopeOfChange: "変更なし（作業療法業務）",
        workplaceScopeOfChange: "変更なし（上記就業場所のみ）",

        requirements:
            "作業療法士免許（2027年3月取得見込みを含む）。臨床経験は問いません。新卒・第二新卒の方も歓迎します。",
        benefits:
            "各種社会保険完備／退職金制度（勤続3年以上）／院内保育所／制服貸与／職員食堂／学会・研修参加費補助（年間上限50,000円）／マイカー通勤可（駐車場あり）",
        trialPeriod: "3か月（試用期間中の労働条件の変更なし）",
        contractPeriod: "期間の定めなし",
        insurance: "労災保険・雇用保険・健康保険・厚生年金保険",
        smokingPolicy: "敷地内全面禁煙",

        officialRecruitUrl: "https://example.com/recruit/",
        contact: "サンプルリハビリテーション病院 人事課　TEL 087-000-0000",

        workplace: {
            ptCount: 18,
            otCount: 14,
            stCount: 5,
            averageExperience: "7年",
            dailyPatientCount: "1日 15〜18名",
            dailyUnits: "1日 18単位前後",
            overtime: "月平均5時間程度",
            educationSystem:
                "新人には1年間プリセプターが付きます。入職後3か月は評価・記録の書き方から一緒に確認します。",
            conferenceFrequency: "病棟カンファレンス 週1回／症例検討会 月1回",
            trainingSupport: "学会発表の際は出張扱い。参加費・交通費を補助します（年間上限50,000円）。",
            childcareSupport: "院内保育所あり（生後6か月〜）。時短勤務は小学校就学前まで利用できます。",
            maleParentalLeave: "直近3年で2名が取得（平均2か月）",
            equipment: "免荷式歩行器／上肢機能訓練装置／ADL訓練室（浴室・キッチン・和室）",
            rehabRoom: "リハビリ室 320㎡。屋外歩行練習ができる中庭に隣接しています。",
            dailySchedule:
                "8:30 申し送り → 9:00 個別訓練 → 12:00 昼休憩 → 13:00 個別訓練・家屋調査 → 16:30 記録・カンファレンス → 17:30 退勤",
        },

        targeting: {
            targetProfessions: ["OT"],
            targetFacilityTypes: ["kaifukuki-hospital"],
            targetTopics: ["adl", "stroke", "kaifukuki"],
        },
    },
];
