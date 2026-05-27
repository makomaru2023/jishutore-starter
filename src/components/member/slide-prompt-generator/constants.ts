export const PURPOSES = [
  "家族説明用",
  "利用者説明用",
  "介護職向け勉強会",
  "リハ職向け勉強会",
  "新人教育用",
  "症例発表用",
  "カンファレンス用",
  "サービス担当者会議用",
  "退院前指導用",
  "施設内プレゼン用",
] as const;
export type Purpose = (typeof PURPOSES)[number];

export const SLIDE_COUNTS = ["3枚", "5枚", "7枚", "10枚"] as const;
export type SlideCount = (typeof SLIDE_COUNTS)[number];

export const AUDIENCES = [
  "利用者本人",
  "家族",
  "介護職",
  "看護師",
  "リハ職",
  "新人スタッフ",
  "管理者",
  "ケアマネジャー",
  "多職種チーム",
  "一般の方向け",
] as const;
export type Audience = (typeof AUDIENCES)[number];

export const GOALS = [
  "理解してもらう",
  "行動を変えてもらう",
  "注意点を共有する",
  "自主トレを継続してもらう",
  "介助方法を統一する",
  "症例の経過を伝える",
  "退院後の生活をイメージしてもらう",
  "多職種で方針をそろえる",
] as const;
export type Goal = (typeof GOALS)[number];

export const DESIGN_POLICIES = [
  "医療・介護向けのシンプル資料",
  "やさしい家族説明資料",
  "研修資料っぽい落ち着いたデザイン",
  "症例発表向けの学会風デザイン",
  "図解多めの分かりやすい資料",
  "文字少なめ・ビジュアル重視",
  "A4配布資料にも転用しやすい構成",
  "自主トレ素材庫のイラストを使う前提",
] as const;
export type DesignPolicy = (typeof DESIGN_POLICIES)[number];

export const EXTRA_OPTIONS = [
  "図解を多めにする",
  "自主トレ素材庫のイラストテイストに寄せる",
  "家族向けに専門用語を減らす",
  "注意点・禁忌を入れる",
  "まとめスライドを入れる",
  "最後に行動提案を入れる",
  "表紙スライドをしっかり作る",
  "文字を大きく見やすくする",
] as const;
export type ExtraOption = (typeof EXTRA_OPTIONS)[number];

export const SLIDE_KINDS = ["表紙", "導入", "本文", "図解", "まとめ"] as const;
export type SlideKind = (typeof SLIDE_KINDS)[number];

export interface SlideConfig {
  kind: SlideKind;
  title: string;
  message: string;
  note: string;
}

export const PURPOSE_GUIDELINES: Record<Purpose, string[]> = {
  家族説明用: [
    "専門用語をできるだけ避ける",
    "不安をあおらない",
    "生活場面に置き換えて説明する",
    "家族がやること、やらなくてよいことを分ける",
    "過介助にならない関わり方を入れる",
    "安全面を入れる",
  ],
  利用者説明用: [
    "本人が理解しやすい短い言葉にする",
    "行動に移しやすい説明にする",
    "注意点を具体的にする",
    "不安を強める表現は避ける",
  ],
  介護職向け勉強会: [
    "現場の困りごとから導入する",
    "OK例とNG例を入れる",
    "明日からできる実践ポイントを入れる",
    "介助場面に結びつける",
    "専門用語は必要最小限にする",
  ],
  リハ職向け勉強会: [
    "評価、介入、生活場面への汎化を整理する",
    "臨床推論が伝わる構成にする",
    "ICFや活動・参加の視点も入れる",
    "実践に使える視点を入れる",
  ],
  新人教育用: [
    "基礎から段階的に説明する",
    "現場でつまずきやすい点を入れる",
    "用語の簡単な説明を入れる",
    "具体例を多めにする",
  ],
  症例発表用: [
    "個人情報を入れない",
    "文字量は控えめにする",
    "背景、評価、問題点、介入、経過、考察を簡潔に整理する",
    "事実と考察を分ける",
    "細かい表や長文は避ける",
  ],
  カンファレンス用: [
    "多職種が理解できる言葉にする",
    "現状、課題、方針を簡潔に整理する",
    "決めたいことを明確にする",
    "役割分担が分かるようにする",
  ],
  サービス担当者会議用: [
    "生活上の課題を中心に整理する",
    "本人・家族の希望を入れる",
    "支援内容と役割分担を明確にする",
    "ケアマネジャーにも伝わる表現にする",
  ],
  退院前指導用: [
    "自宅生活を前提にする",
    "移動、トイレ、入浴、更衣、家事など生活場面に落とし込む",
    "転倒リスクと環境調整を入れる",
    "家族の見守りポイントを入れる",
    "相談が必要な場面を入れる",
  ],
  施設内プレゼン用: [
    "課題、提案、期待される効果を明確にする",
    "管理者や多職種にも伝わる言葉にする",
    "現場で実行しやすい形にする",
  ],
};

export interface Preset {
  id: string;
  label: string;
  summary: string;
  purpose: Purpose;
  slideCount: SlideCount;
  theme: string;
  audience: Audience;
  goal: Goal;
  designPolicy: DesignPolicy;
  slides: SlideConfig[];
}

export const PRESETS: Preset[] = [
  {
    id: "fall-prevention",
    label: "転倒予防の勉強会",
    summary: "介護職向けの導入、原因整理、OK/NG比較まで入った勉強会の型です。",
    purpose: "介護職向け勉強会",
    slideCount: "5枚",
    theme: "転倒予防について、介護職が明日から注意できるポイントを伝えたい",
    audience: "介護職",
    goal: "注意点を共有する",
    designPolicy: "図解多めの分かりやすい資料",
    slides: [
      { kind: "表紙", title: "転倒予防", message: "勉強会のテーマを明確に伝える", note: "" },
      { kind: "導入", title: "なぜ転倒予防が必要か", message: "転倒が利用者の生活や安全に与える影響を伝える", note: "" },
      { kind: "本文", title: "転倒の主な原因", message: "環境面・身体面・介助面から原因を整理する", note: "" },
      { kind: "図解", title: "OK例とNG例", message: "介助時に気をつけるポイントを比較して見せる", note: "" },
      { kind: "まとめ", title: "明日からできること", message: "現場で実践できるポイントを簡潔にまとめる", note: "" },
    ],
  },
  {
    id: "self-training-need",
    label: "自主トレの必要性",
    summary: "家族に自主トレの意味と見守り方をやさしく伝える説明資料の型です。",
    purpose: "家族説明用",
    slideCount: "5枚",
    theme: "退院後も自主トレを継続する必要性を家族に分かりやすく伝えたい",
    audience: "家族",
    goal: "自主トレを継続してもらう",
    designPolicy: "やさしい家族説明資料",
    slides: [
      { kind: "表紙", title: "自主トレの大切さ", message: "家族向け説明のテーマをやさしく伝える", note: "" },
      { kind: "導入", title: "なぜ自主トレが必要か", message: "退院後の生活で自主トレが役立つ理由を伝える", note: "" },
      { kind: "本文", title: "続けることで得られること", message: "継続による生活面のメリットを伝える", note: "" },
      { kind: "図解", title: "家族の関わり方", message: "過介助にならない見守り方を示す", note: "" },
      { kind: "まとめ", title: "無理なく続ける工夫", message: "家で続けやすくする工夫をまとめる", note: "" },
    ],
  },
  {
    id: "pre-discharge",
    label: "退院前指導",
    summary: "自宅生活の安全確認、環境調整、家族の見守りを整理する指導資料の型です。",
    purpose: "退院前指導用",
    slideCount: "7枚",
    theme: "退院後の生活で安全に過ごすための環境調整、動作方法、家族の見守りポイントを伝えたい",
    audience: "家族",
    goal: "退院後の生活をイメージしてもらう",
    designPolicy: "A4配布資料にも転用しやすい構成",
    slides: [
      { kind: "表紙", title: "退院後の安全な暮らし", message: "退院前指導の全体テーマを伝える", note: "" },
      { kind: "導入", title: "自宅生活で大切な視点", message: "病院と自宅で環境が変わることを伝える", note: "" },
      { kind: "本文", title: "移動と転倒予防", message: "歩行や移乗で注意したい場面を整理する", note: "" },
      { kind: "本文", title: "トイレ・入浴の注意点", message: "生活場面ごとの安全確認ポイントを伝える", note: "" },
      { kind: "図解", title: "環境調整のポイント", message: "手すり、段差、動線、照明などを図解で示す", note: "" },
      { kind: "本文", title: "家族の見守り方", message: "やりすぎない支援と相談が必要な場面を伝える", note: "" },
      { kind: "まとめ", title: "退院後に確認すること", message: "安全に過ごすための確認項目を簡潔にまとめる", note: "" },
    ],
  },
];

export function slideCountToNumber(slideCount: SlideCount | null): number {
  if (!slideCount) return 0;
  return Number.parseInt(slideCount.replace("枚", ""), 10);
}
