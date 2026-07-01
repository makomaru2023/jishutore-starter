export type SeoCategoryFaq = {
    question: string;
    answer: string;
};

export type SeoCategoryUseCase = {
    title: string;
    description: string;
};

export type SeoItemCategoryConfig = {
    slug: string;
    breadcrumb: string;
    eyebrow: string;
    title: string;
    accentTitle: string;
    metaTitle: string;
    metaDescription: string;
    intro: string;
    body: string[];
    keywords: string[];
    matchScope: "core" | "content" | "all";
    listTitle: string;
    listDescription: string;
    searchLabel: string;
    safetyNote: string;
    useCases: SeoCategoryUseCase[];
    faqs: SeoCategoryFaq[];
};

export const seatedExercisesCategory: SeoItemCategoryConfig = {
    slug: "seated-exercises",
    breadcrumb: "高齢者の座位体操",
    eyebrow: "高齢者・通所リハ・介護施設向け",
    title: "高齢者の座位体操・座ってできる",
    accentTitle: "自主トレイラスト",
    metaTitle: "高齢者の座位体操イラスト【無料】座ってできる自主トレ｜自主トレ素材庫",
    metaDescription:
        "高齢者が椅子に座ってできる座位体操・自主トレイラストを無料ダウンロード。通所リハ、デイサービス、介護予防、患者配布資料に使えます。",
    intro:
        "立位が不安定な方にも使いやすい、椅子に座ってできる体操や自主トレのイラストをまとめました。通所リハ、デイサービス、訪問リハでの説明資料に無料で使えます。",
    body: [
        "座位体操は、立った姿勢の保持が難しい方でも取り組みやすい運動方法です。椅子に座った姿勢をイラストで示すと、開始姿勢や手足の動きを共有しやすくなります。",
        "このページでは、座位で行う上肢運動、下肢運動、ストレッチ、口腔体操などをまとめています。対象者の体力やバランス能力に合わせて素材を選べます。",
    ],
    keywords: ["座位", "座って", "椅子", "イス", "seated", "sitting", "chair"],
    matchScope: "content",
    listTitle: "高齢者の座位体操・座ってできる無料イラスト",
    listDescription:
        "椅子に座って行う運動を中心に掲載しています。「肩」「膝」「口腔」などで、さらに絞り込めます。",
    searchLabel: "座位体操",
    safetyNote:
        "椅子の安定性、足底の接地、疲労や疼痛の有無を確認してください。対象者の状態に応じて、専門職の評価と方針を優先します。",
    useCases: [
        {
            title: "立位が不安定な方の運動",
            description: "椅子に座った状態から、安全に行いやすい運動を選べます。",
        },
        {
            title: "通所リハ・介護施設の体操",
            description: "個別指導や小集団での体操資料づくりに活用できます。",
        },
        {
            title: "自宅で見返す配布資料",
            description: "文字あり素材なら、運動名と動きを一緒に伝えられます。",
        },
    ],
    faqs: [
        {
            question: "座位体操のイラストは無料で使えますか？",
            answer:
                "はい。利用ガイドラインの範囲で、患者さんや利用者さんへの説明・配布資料に無料で使えます。",
        },
        {
            question: "立位が難しい高齢者にも使えますか？",
            answer:
                "座位で行う素材を中心にまとめています。ただし、姿勢保持や運動負荷は対象者ごとに確認してください。",
        },
        {
            question: "デイサービスの集団体操にも使えますか？",
            answer:
                "使えます。参加者の身体機能に合わせて、運動内容や回数を調整してください。",
        },
    ],
};

export const handRehabilitationCategory: SeoItemCategoryConfig = {
    slug: "hand-rehabilitation",
    breadcrumb: "手指リハビリ・巧緻動作",
    eyebrow: "OT・上肢機能訓練向け",
    title: "手指リハビリ・巧緻動作訓練の",
    accentTitle: "自主トレイラスト",
    metaTitle: "手指リハビリ・巧緻動作訓練のイラスト【無料】｜自主トレ素材庫",
    metaDescription:
        "手指リハビリ、巧緻動作訓練、つまみ動作に使える無料イラスト集。箸、ペグ、ボタン、洗濯ばさみなど、OTの自主トレ・患者配布資料に使えます。",
    intro:
        "箸、ペグ、ボタン、洗濯ばさみなどを使った、手指リハビリと巧緻動作訓練のイラストをまとめました。OTの個別訓練や自主トレ説明資料に無料で使えます。",
    body: [
        "巧緻動作は、指先で物をつまむ、持ち替える、操作するといった細かな動きです。動作課題をイラストで示すと、道具の持ち方や練習内容を共有しやすくなります。",
        "このページでは、箸操作、ペグ操作、書字、ボタン、洗濯ばさみ、ペットボトル操作など、生活動作につながる手指訓練を探せます。",
    ],
    keywords: [
        "手指",
        "巧緻",
        "箸",
        "ペグ",
        "ボタン",
        "洗濯ばさみ",
        "タオル絞り",
        "コイン",
        "書字",
        "つまみ",
        "finger",
        "chopstick",
        "peg",
        "buttoning",
        "clothespin",
        "towel-wringing",
        "bottle-cap",
        "writing",
    ],
    matchScope: "content",
    listTitle: "手指リハビリ・巧緻動作訓練の無料イラスト",
    listDescription:
        "生活動作に近い手指訓練を掲載しています。「箸」「ペグ」「つまみ」などで絞り込めます。",
    searchLabel: "手指リハビリ",
    safetyNote:
        "手指や手関節の痛み、腫れ、疲労に配慮してください。課題の難易度や道具の大きさは、対象者の機能に合わせて調整します。",
    useCases: [
        {
            title: "OTの個別訓練",
            description: "訓練課題と道具の使い方を視覚的に共有できます。",
        },
        {
            title: "自主トレ課題の説明",
            description: "自宅で行う手指練習の内容を、イラスト付きで伝えられます。",
        },
        {
            title: "生活動作へのつなぎ",
            description: "更衣、食事、整容などに関連する練習を選べます。",
        },
    ],
    faqs: [
        {
            question: "巧緻動作訓練とは何ですか？",
            answer:
                "物をつまむ、持ち替える、道具を操作するなど、手指の細かな動きを練習する訓練です。",
        },
        {
            question: "自主トレの説明資料に使えますか？",
            answer:
                "使えます。対象者に合う課題を選び、道具や回数などの説明を追加してください。",
        },
        {
            question: "文字なしのイラストもありますか？",
            answer:
                "文字あり・文字なしの素材を用意しています。資料の用途に合わせて選べます。",
        },
    ],
};

export const fallPreventionCategory: SeoItemCategoryConfig = {
    slug: "fall-prevention-exercises",
    breadcrumb: "転倒予防体操",
    eyebrow: "介護予防・通所リハ・地域体操向け",
    title: "高齢者の転倒予防体操・バランス訓練の",
    accentTitle: "自主トレイラスト",
    metaTitle: "高齢者の転倒予防体操・バランス訓練イラスト【無料】｜自主トレ素材庫",
    metaDescription:
        "高齢者の転倒予防体操、バランス訓練、下肢筋力訓練に使えるイラストを無料配布。デイサービス、通所リハ、介護予防教室の資料に使えます。",
    intro:
        "高齢者の転倒予防に使いやすい、バランス訓練、下肢筋力訓練、段差練習のイラストをまとめました。介護予防教室や通所リハの説明資料に無料で使えます。",
    body: [
        "転倒予防では、下肢筋力だけでなく、立位バランス、足の上げ方、段差や生活環境への注意も重要です。イラストを使うと、運動と注意点を具体的に共有できます。",
        "このページでは、片足立ち、ステップ運動、かかと上げ、つま先上げ、立ち座り、歩行練習などをまとめています。",
    ],
    keywords: [
        "転倒",
        "バランス",
        "片足",
        "段差",
        "つまず",
        "スリッパ",
        "コード",
        "かかと上げ",
        "つま先上げ",
        "立ち座り",
        "single leg",
        "single-leg",
        "balance",
        "side step",
        "side-step",
        "step exercise",
        "heel raise",
        "toe raise",
    ],
    matchScope: "content",
    listTitle: "転倒予防体操・バランス訓練の無料イラスト",
    listDescription:
        "立位バランス、下肢筋力、段差練習などを掲載しています。「片足」「段差」「立ち座り」で絞り込めます。",
    searchLabel: "転倒予防体操",
    safetyNote:
        "立位で行う運動は、手すりや安定した支持物を用意してください。ふらつき、疼痛、体調変化がある場合は中止し、専門職へ相談します。",
    useCases: [
        {
            title: "介護予防教室",
            description: "運動の開始姿勢と動きを大きなイラストで説明できます。",
        },
        {
            title: "通所リハの個別指導",
            description: "対象者のバランス能力に合わせて運動を選べます。",
        },
        {
            title: "自宅環境の注意喚起",
            description: "段差、コード、履物などの転倒要因も共有できます。",
        },
    ],
    faqs: [
        {
            question: "転倒予防体操にはどのような運動がありますか？",
            answer:
                "片足立ち、ステップ、立ち座り、かかと上げ、つま先上げなどを掲載しています。",
        },
        {
            question: "高齢者向けの配布資料に使えますか？",
            answer:
                "使えます。対象者のバランス能力に合わせ、安全上の注意を加えてください。",
        },
        {
            question: "地域の体操教室でも利用できますか？",
            answer:
                "利用できます。集団の体力差に配慮し、支持物や見守り体制を準備してください。",
        },
    ],
};

export const bedMobilityCategory: SeoItemCategoryConfig = {
    slug: "bed-mobility-exercises",
    breadcrumb: "寝返り・起き上がり",
    eyebrow: "基本動作・介助指導向け",
    title: "寝返り・起き上がり動作練習の",
    accentTitle: "リハビリイラスト",
    metaTitle: "寝返り・起き上がり動作のリハビリイラスト【無料】｜自主トレ素材庫",
    metaDescription:
        "寝返り、側臥位、ベッドからの起き上がり、端座位の動作指導に使える無料イラスト。リハビリ、家族指導、介助方法の説明資料に使えます。",
    intro:
        "寝返り、側臥位、ベッドからの起き上がり、端座位など、基本動作の練習に使えるイラストをまとめました。患者さんやご家族への動作説明に無料で使えます。",
    body: [
        "寝返りや起き上がりは、ベッド上の生活から離床へつながる基本動作です。動作の順序をイラストで示すと、手足の位置や重心移動を共有しやすくなります。",
        "このページでは、仰向けから横向きへの寝返り、肘立て、側臥位から端座位への起き上がり、ベッド端座位などをまとめています。",
    ],
    keywords: [
        "寝返り",
        "起き上がり",
        "側臥位",
        "端座位",
        "ベッド端",
        "肘立て",
        "rolling over",
        "rolling-over",
        "side lying to bed",
        "side-lying-to-bed",
        "bed edge",
        "bed-edge",
    ],
    matchScope: "content",
    listTitle: "寝返り・起き上がり動作の無料イラスト",
    listDescription:
        "ベッド上の基本動作を中心に掲載しています。「寝返り」「端座位」などで絞り込めます。",
    searchLabel: "寝返り・起き上がり",
    safetyNote:
        "ベッドの高さ、転落リスク、点滴やカテーテル類、疼痛を確認してください。介助量や動作方法は対象者の状態に合わせます。",
    useCases: [
        {
            title: "患者さんへの動作説明",
            description: "寝返りから起き上がりまでの順序を視覚的に伝えられます。",
        },
        {
            title: "家族への介助指導",
            description: "本人が動く部分と、見守る部分を整理する資料に使えます。",
        },
        {
            title: "離床練習",
            description: "側臥位、肘立て、端座位の段階を分けて説明できます。",
        },
    ],
    faqs: [
        {
            question: "寝返りや起き上がりの手順説明に使えますか？",
            answer:
                "使えます。動作の順序や手足の位置を説明する資料に活用できます。",
        },
        {
            question: "家族への介助指導にも利用できますか？",
            answer:
                "利用できます。対象者本人の能力と、必要な介助量を専門職が確認した上で使用してください。",
        },
        {
            question: "ベッド上動作の素材は文字ありもありますか？",
            answer:
                "文字あり・文字なしの素材を掲載しています。説明方法に合わせて選べます。",
        },
    ],
};

export const strokeExercisesCategory: SeoItemCategoryConfig = {
    slug: "stroke-exercises",
    breadcrumb: "脳卒中・片麻痺",
    eyebrow: "脳卒中リハ・患者配布資料向け",
    title: "脳卒中・片麻痺の自主トレに使える",
    accentTitle: "リハビリイラスト",
    metaTitle: "脳卒中・片麻痺の自主トレイラスト【無料】｜自主トレ素材庫",
    metaDescription:
        "脳卒中・片麻痺の上肢、手指、下肢、基本動作の自主トレに使える無料イラスト。PT・OTの患者指導、退院前指導、家族説明に使えます。",
    intro:
        "脳卒中・片麻痺の方への自主トレ説明に使いやすい、上肢、手指、下肢、基本動作のイラストをまとめました。退院前指導や家族説明の資料に無料で使えます。",
    body: [
        "脳卒中後の自主トレでは、麻痺の程度、感覚障害、筋緊張、バランス能力などに応じた個別調整が必要です。イラストは、姿勢や動きを共有する補助資料として活用できます。",
        "このページでは、上肢の自己介助運動、手指課題、体幹運動、寝返り・起き上がり、立ち上がり、歩行に関連する素材をまとめています。",
    ],
    keywords: ["脳卒中", "片麻痺", "stroke", "hemiplegia", "hemiparesis"],
    matchScope: "all",
    listTitle: "脳卒中・片麻痺の自主トレ無料イラスト",
    listDescription:
        "上肢、手指、下肢、基本動作に関連する素材を掲載しています。「上肢」「歩行」「寝返り」などで絞り込めます。",
    searchLabel: "脳卒中・片麻痺",
    safetyNote:
        "脳卒中後の症状や禁忌事項には個人差があります。主治医や担当療法士の評価・指導内容を優先し、無理な反復や転倒に注意してください。",
    useCases: [
        {
            title: "退院前の自主トレ指導",
            description: "自宅で行う運動を、本人と家族へ視覚的に共有できます。",
        },
        {
            title: "上肢・手指の課題",
            description: "自己介助運動や生活動作に近い手指課題を選べます。",
        },
        {
            title: "基本動作・歩行練習",
            description: "寝返り、立ち上がり、歩行に関連する素材を探せます。",
        },
    ],
    faqs: [
        {
            question: "脳卒中の自主トレ資料に使えますか？",
            answer:
                "使えます。ただし、運動内容は麻痺や感覚障害などの状態に合わせ、担当療法士が確認してください。",
        },
        {
            question: "片麻痺の上肢練習もありますか？",
            answer:
                "棒やタオルを使う運動、手指課題、生活動作に近い素材を掲載しています。",
        },
        {
            question: "家族説明用に印刷できますか？",
            answer:
                "印刷できます。介助方法や注意点は、対象者に合わせて追記してください。",
        },
    ],
};

export const seoItemCategories = [
    seatedExercisesCategory,
    handRehabilitationCategory,
    fallPreventionCategory,
    bedMobilityCategory,
    strokeExercisesCategory,
];
