// 有料PowerPoint資料（プレミアム）の商品データ。
// 新しい商品を追加する場合は、配列に追記してください。
// status: 'available' = 販売中 / 'coming-soon' = 近日公開（CTAは非活性）

export type PremiumItem = {
    id: string;
    title: string;
    subtitle: string;
    price: string;
    description: string;
    contents: string[];
    tags: string[];
    href: string;
    status?: "available" | "coming-soon";
};

export const premiumItems: PremiumItem[] = [
    {
        id: "disease-specific-9set",
        title: "疾患別自主トレ資料9本セット",
        subtitle: "退院前指導・家族説明に使えるPowerPoint資料",
        price: "980円",
        description:
            "脳卒中、圧迫骨折、パーキンソン病、五十肩、腰痛、人工股関節術後、大腿骨骨折術後、膝OA・TKAなど、現場で説明する機会の多い疾患別自主トレ資料を9本まとめたセットです。",
        contents: [
            "パーキンソン病 自主トレメニュー",
            "圧迫骨折後 自主トレメニュー",
            "五十肩 自主トレメニュー",
            "腰痛 自主トレメニュー",
            "人工股関節 術後 自主トレメニュー",
            "大腿骨骨折 術後 自主トレメニュー",
            "脳卒中 下肢 自主トレメニュー",
            "脳卒中 上肢 自主トレメニュー",
            "膝OA・TKA 自主トレメニュー",
        ],
        tags: ["疾患別", "9本セット", "PowerPoint", "編集OK", "印刷配布OK"],
        href: "/products/self-training-materials",
        status: "available",
    },
    {
        id: "home-elderly-6set",
        title: "姿勢別 自主トレ指導資料セット",
        subtitle: "上肢・下肢・全身・座位・立位・臥位をまとめたPowerPoint資料",
        price: "980円",
        description:
            "自主トレ資料を、上肢・下肢・全身・座位・立位・臥位の6テーマでまとめたセットです。疾患を限定せず、退院後や訪問リハ、通所リハ、家族説明で使いやすい内容にしています。",
        contents: [
            "上肢の自主トレメニュー",
            "下肢の自主トレメニュー",
            "全身の自主トレメニュー",
            "座位の自主トレメニュー",
            "立位の自主トレメニュー",
            "臥位の自主トレメニュー",
        ],
        tags: ["姿勢別", "6点セット", "PowerPoint", "編集OK", "印刷配布OK"],
        href: "/products/home-elderly-self-training",
        status: "available",
    },
];
