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

export const upperLimbExercisesCategory: SeoItemCategoryConfig = {
    slug: "upper-limb-exercises",
    breadcrumb: "上肢の自主トレ",
    eyebrow: "PT・OT・患者配布資料向け",
    title: "上肢・肩・肘・手指の自主トレに使える",
    accentTitle: "リハビリイラスト",
    metaTitle: "上肢の自主トレイラスト【無料】肩・肘・手指のリハビリ｜自主トレ素材庫",
    metaDescription:
        "上肢、肩、肘、手首、手指の自主トレ・リハビリに使える無料イラスト。PT・OTの患者指導、退院前指導、配布資料に使えます。",
    intro:
        "肩、肘、手首、手指の運動や生活動作練習に使える、上肢の自主トレイラストをまとめました。PT・OTの個別指導や患者さんへの配布資料に無料で使えます。",
    body: [
        "上肢の自主トレでは、関節の動き、筋力、痛み、日常生活での使い方に応じた運動選びが大切です。イラストを使うと、開始姿勢や手の向きを具体的に共有できます。",
        "このページでは、肩関節運動、肩甲骨運動、肘や手首の運動、手指課題、リーチ練習などをまとめています。目的に合う素材を選んで資料づくりに活用できます。",
    ],
    keywords: [
        "shoulder", "scapular", "elbow", "arm", "wrist", "hand", "finger",
        "chopstick", "peg", "reach", "grip", "beanbag", "azuki", "banzai",
        "pendulum", "wall slide", "wall-slide", "writing", "eating", "spoon",
        "肩", "肘", "腕", "上肢", "手指", "手のひら", "手首", "タオル握",
        "バンザイ", "箸", "お手玉", "ペグ", "ダンベル", "棒", "リーチ",
        "ピンキー", "母指", "対立", "振り子", "ウォールサイド", "書字", "食事", "スプーン",
    ],
    matchScope: "core",
    listTitle: "上肢・肩・肘・手指の自主トレ無料イラスト",
    listDescription:
        "肩から手指までの運動を掲載しています。「肩」「肘」「手首」「手指」などで、さらに絞り込めます。",
    searchLabel: "上肢の自主トレ",
    safetyNote:
        "疼痛、腫れ、しびれ、術後の運動制限を確認してください。可動範囲や負荷量は、主治医や担当療法士の方針を優先します。",
    useCases: [
        { title: "肩・肘の運動指導", description: "関節運動や筋力訓練の姿勢を視覚的に伝えられます。" },
        { title: "手指・巧緻動作練習", description: "物をつまむ、握る、操作する課題を選べます。" },
        { title: "退院後の自主トレ資料", description: "自宅で行う運動を選び、配布資料に活用できます。" },
    ],
    faqs: [
        { question: "上肢の自主トレイラストは無料で使えますか？", answer: "はい。利用ガイドラインの範囲で、患者さんへの説明や配布資料に無料で使えます。" },
        { question: "肩だけでなく手指の運動もありますか？", answer: "肩・肘・手首に加え、手指運動や巧緻動作に関する素材も掲載しています。" },
        { question: "OTの自主トレ資料に利用できますか？", answer: "利用できます。対象者の疼痛や運動制限を確認し、内容を個別に調整してください。" },
    ],
};

export const lowerLimbExercisesCategory: SeoItemCategoryConfig = {
    slug: "lower-limb-exercises",
    breadcrumb: "下肢の自主トレ",
    eyebrow: "PT・歩行練習・介護予防向け",
    title: "下肢・股関節・膝・足関節の自主トレに使える",
    accentTitle: "リハビリイラスト",
    metaTitle: "下肢の自主トレイラスト【無料】股関節・膝・足関節｜自主トレ素材庫",
    metaDescription:
        "下肢、股関節、膝、足関節の自主トレ・筋力訓練に使える無料イラスト。PTの患者指導、介護予防、配布資料に使えます。",
    intro:
        "股関節、膝、足関節の運動や下肢筋力訓練に使える、自主トレイラストをまとめました。歩行練習、介護予防、退院後の運動説明に無料で使えます。",
    body: [
        "下肢の自主トレは、立ち上がりや歩行などの生活動作につながります。運動姿勢や足の動かし方をイラストで示すと、自宅で見返しやすい資料になります。",
        "このページでは、股関節運動、膝伸展、足関節運動、スクワット、ブリッジ、かかと上げなどをまとめています。座位、臥位、立位から選べます。",
    ],
    keywords: [
        "hip", "knee", "leg", "thigh", "squat", "heel", "slr", "leg-raise",
        "quadriceps", "hamstring", "glute", "bridge", "clam", "lunge", "ankle",
        "foot", "toe", "calf", "kneeling", "aerobike", "air bike", "air-bike",
        "towel gather", "towel-gather", "膝", "股", "脚", "下肢", "足首", "足関節",
        "ヒール", "スライド", "SLR", "レッグレイズ", "スクワット", "ブリッジ", "太もも",
        "クラム", "四頭筋", "お尻", "臀", "ハム", "ヒンジ", "カーフ", "つま先",
        "かかと", "底背屈", "底屈", "背屈", "セッティング", "エアロバイク", "タオルギャザー", "ギャザー",
    ],
    matchScope: "core",
    listTitle: "下肢・股関節・膝・足関節の自主トレ無料イラスト",
    listDescription:
        "座位・臥位・立位で行う下肢運動を掲載しています。「膝」「股関節」「足首」などで絞り込めます。",
    searchLabel: "下肢の自主トレ",
    safetyNote:
        "疼痛、腫れ、転倒リスク、術後の荷重制限を確認してください。立位運動では安定した支持物と見守りを用意します。",
    useCases: [
        { title: "下肢筋力の自主トレ", description: "股関節、膝、足関節の運動を目的別に選べます。" },
        { title: "歩行につながる運動", description: "立ち上がりや歩行に必要な筋力練習の説明に使えます。" },
        { title: "介護予防・通所リハ", description: "個別指導や小集団の運動資料づくりに活用できます。" },
    ],
    faqs: [
        { question: "下肢の自主トレイラストは無料ですか？", answer: "はい。利用ガイドラインの範囲で、患者さんや利用者さんへの説明に無料で使えます。" },
        { question: "座ってできる下肢運動もありますか？", answer: "膝伸ばし、足踏み、足関節運動など、椅子に座って行う素材も掲載しています。" },
        { question: "人工関節術後の指導にも使えますか？", answer: "素材は使えますが、荷重や禁忌動作は術式や主治医の方針に合わせてください。" },
    ],
};

export const trunkExercisesCategory: SeoItemCategoryConfig = {
    slug: "trunk-exercises",
    breadcrumb: "体幹トレーニング",
    eyebrow: "姿勢保持・基本動作・自主トレ向け",
    title: "体幹トレーニング・腹筋・背筋に使える",
    accentTitle: "自主トレイラスト",
    metaTitle: "体幹トレーニングの自主トレイラスト【無料】｜自主トレ素材庫",
    metaDescription:
        "体幹、腹筋、背筋、骨盤運動、プランクなどの自主トレに使える無料イラスト。リハビリ指導、姿勢改善、患者配布資料に使えます。",
    intro:
        "体幹回旋、腹筋・背筋運動、骨盤運動、プランクなど、体幹トレーニングに使えるイラストをまとめました。姿勢保持や基本動作の説明資料に無料で使えます。",
    body: [
        "体幹は、座る、立つ、手足を動かすときの土台になります。開始姿勢と動く方向をイラストで示すと、代償動作に注意しながら説明しやすくなります。",
        "このページでは、臥位や座位での体幹運動、骨盤運動、ブリッジ、プランク、回旋運動などをまとめています。対象者の能力に合わせて選べます。",
    ],
    keywords: [
        "trunk", "core", "plank", "abdomen", "back", "pelvic", "pelvis", "draw-in",
        "cat-and-dog", "diagonal", "rotation", "side-bridge", "puppy", "spine", "体幹",
        "腹", "背筋", "骨盤", "ドローイン", "プランク", "ダイアゴナル", "回旋",
        "キャット", "腰", "サイドブリッジ", "パピーポジション", "腹筋", "脊椎",
    ],
    matchScope: "core",
    listTitle: "体幹トレーニング・腹筋・背筋の無料イラスト",
    listDescription:
        "臥位・座位・四つ這いなどの体幹運動を掲載しています。「骨盤」「回旋」「プランク」などで絞り込めます。",
    searchLabel: "体幹トレーニング",
    safetyNote:
        "腰痛、頚部痛、術後の制限、呼吸の止めすぎに注意してください。姿勢保持が難しい場合は負荷を下げ、専門職が確認します。",
    useCases: [
        { title: "姿勢保持の練習", description: "座位や立位の土台となる体幹運動を選べます。" },
        { title: "基本動作への応用", description: "寝返り、起き上がり、立ち上がりにつながる説明に使えます。" },
        { title: "腰部・骨盤の運動", description: "骨盤運動や体幹回旋などを視覚的に伝えられます。" },
    ],
    faqs: [
        { question: "体幹トレーニングのイラストは無料で使えますか？", answer: "はい。患者さんへの説明や配布資料に、利用ガイドラインの範囲で使えます。" },
        { question: "高齢者向けの体幹運動もありますか？", answer: "座位や臥位で行う素材もあります。姿勢保持能力に合わせて選んでください。" },
        { question: "腰痛がある方にも使えますか？", answer: "使えますが、症状や禁忌事項には個人差があります。痛みが増える運動は避け、専門職が確認してください。" },
    ],
};

export const stretchingExercisesCategory: SeoItemCategoryConfig = {
    slug: "stretching-exercises",
    breadcrumb: "ストレッチ",
    eyebrow: "柔軟性・関節可動域・自主トレ向け",
    title: "ストレッチ・柔軟体操に使える",
    accentTitle: "自主トレイラスト",
    metaTitle: "ストレッチの自主トレイラスト【無料】部位別に探せる｜自主トレ素材庫",
    metaDescription:
        "上肢、下肢、体幹のストレッチ・柔軟体操に使える無料イラスト。ハムストリングス、肩、前腕、下腿など部位別に探せます。",
    intro:
        "上肢、下肢、体幹のストレッチや柔軟体操に使えるイラストをまとめました。関節可動域の練習や、自宅で見返す自主トレ資料に無料で使えます。",
    body: [
        "ストレッチでは、伸ばす部位、開始姿勢、反動をつけないことなどを具体的に伝える必要があります。イラストを添えると、姿勢と動きを見返しやすくなります。",
        "このページでは、肩、前腕、体幹、股関節、大腿後面、下腿などのストレッチをまとめています。座位、立位、臥位から選べます。",
    ],
    keywords: [
        "stretch", "flexion-stretch", "extension-stretch", "opening", "doorway",
        "towel-side-bend", "trunk-extension", "trunk-flexion", "ストレッチ", "伸ばし",
        "柔軟", "ハムストリング", "胸開き", "ロッキング", "ドアウェイ",
    ],
    matchScope: "core",
    listTitle: "部位別ストレッチ・柔軟体操の無料イラスト",
    listDescription:
        "上肢・下肢・体幹のストレッチを掲載しています。部位名や姿勢で、さらに絞り込めます。",
    searchLabel: "ストレッチ",
    safetyNote:
        "反動をつけず、痛みやしびれが出ない範囲で行います。術後や急性期では、主治医や担当療法士の運動制限を優先してください。",
    useCases: [
        { title: "自主トレの配布資料", description: "伸ばす部位と姿勢をイラストで伝えられます。" },
        { title: "運動前後の体操", description: "上肢・下肢・体幹から目的に合う素材を選べます。" },
        { title: "介護予防・集団体操", description: "椅子に座って行うストレッチも探せます。" },
    ],
    faqs: [
        { question: "ストレッチのイラストは無料で利用できますか？", answer: "はい。利用ガイドラインの範囲で、患者さんへの説明や配布資料に無料で使えます。" },
        { question: "部位別にストレッチを探せますか？", answer: "肩、体幹、股関節、大腿、下腿など、キーワードでさらに絞り込めます。" },
        { question: "高齢者の体操資料にも使えますか？", answer: "使えます。姿勢保持能力や疼痛に合わせ、無理のない運動を選んでください。" },
    ],
};

export const walkingExercisesCategory: SeoItemCategoryConfig = {
    slug: "walking-exercises",
    breadcrumb: "歩行訓練",
    eyebrow: "PT・歩行指導・退院前指導向け",
    title: "歩行訓練・杖歩行・歩行器の説明に使える",
    accentTitle: "リハビリイラスト",
    metaTitle: "歩行訓練のリハビリイラスト【無料】杖・歩行器｜自主トレ素材庫",
    metaDescription:
        "歩行訓練、杖歩行、歩行器、平行棒、トレッドミルに使える無料イラスト。PTの患者指導、退院前指導、家族説明に使えます。",
    intro:
        "杖歩行、歩行器、平行棒、トレッドミルなど、歩行訓練の説明に使えるイラストをまとめました。患者さんやご家族への動作説明に無料で使えます。",
    body: [
        "歩行訓練では、補助具の使い方、足を出す順序、姿勢、安全確認を具体的に共有することが大切です。イラストは、口頭説明を補う資料として活用できます。",
        "このページでは、杖歩行、歩行器歩行、平行棒内歩行、トレッドミル、ノルディックウォーキングなどの素材をまとめています。",
    ],
    keywords: [
        "walking", "walk", "cane", "walker", "parallel-bar", "treadmill", "gait",
        "歩行", "歩", "杖", "歩行器", "平行棒", "トレッドミル", "ノルディック",
    ],
    matchScope: "core",
    listTitle: "歩行訓練・杖・歩行器の無料リハビリイラスト",
    listDescription:
        "補助具や歩行練習に関連する素材を掲載しています。「杖」「歩行器」「平行棒」などで絞り込めます。",
    searchLabel: "歩行訓練",
    safetyNote:
        "転倒リスク、補助具の高さ、荷重制限、周囲の環境を確認してください。歩行方法は担当療法士の評価と指導を優先します。",
    useCases: [
        { title: "杖・歩行器の使い方", description: "補助具を使う歩行場面を視覚的に伝えられます。" },
        { title: "退院前の歩行指導", description: "自宅や屋外での移動を説明する資料に使えます。" },
        { title: "家族・介護職への共有", description: "見守り位置や注意点を追記して共有できます。" },
    ],
    faqs: [
        { question: "歩行訓練のイラストは無料で使えますか？", answer: "はい。利用ガイドラインの範囲で、患者指導や家族説明の資料に使えます。" },
        { question: "杖や歩行器のイラストもありますか？", answer: "杖歩行、歩行器、平行棒、トレッドミルなどの素材を掲載しています。" },
        { question: "退院前指導に利用できますか？", answer: "利用できます。実際の補助具、荷重条件、見守り方法に合わせて説明を追加してください。" },
    ],
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
    upperLimbExercisesCategory,
    lowerLimbExercisesCategory,
    trunkExercisesCategory,
    stretchingExercisesCategory,
    walkingExercisesCategory,
    seatedExercisesCategory,
    handRehabilitationCategory,
    fallPreventionCategory,
    bedMobilityCategory,
    strokeExercisesCategory,
];
