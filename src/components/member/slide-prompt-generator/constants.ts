/* スライド作成プロンプトメーカーの選択肢データ・プリセット */

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

export const SLIDE_COUNTS = ["5枚", "10枚", "15枚", "20枚"] as const;
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

/* ビジュアルスタイル（デザイン）は slideDesigns.ts に定義。
   プリセットからは designId で参照する。 */

export const EXTRA_OPTIONS = [
  "発表者ノートを入れる",
  "各スライドに図解案を入れる",
  "自主トレ素材庫のイラスト挿入案を入れる",
  "家族向けに専門用語を減らす",
  "注意点・禁忌を入れる",
  "まとめスライドを入れる",
  "最後に行動提案を入れる",
  "参考文献欄を入れる",
  "PowerPointに貼りやすい表で出力する",
] as const;
export type ExtraOption = (typeof EXTRA_OPTIONS)[number];

/** 使用用途ごとの作成方針（プロンプトに差し込む指示文） */
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
    "背景情報、評価、問題点、目標、介入、経過、考察を整理する",
    "ICFの視点で整理する",
    "事実と考察を分ける",
    "今後の課題を入れる",
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
    "必要に応じて導入手順を入れる",
  ],
};

export interface Preset {
  id: string;
  label: string;
  purpose: Purpose;
  slideCount: SlideCount;
  theme: string;
  audience: Audience;
  goal: Goal;
  /** slideDesigns.ts の SlideDesign.id を参照 */
  designId: string;
}

export const PRESETS: Preset[] = [
  {
    id: "fall-prevention",
    label: "転倒予防の勉強会",
    purpose: "介護職向け勉強会",
    slideCount: "10枚",
    theme: "転倒予防について、介護職が明日から注意できるポイントを伝えたい",
    audience: "介護職",
    goal: "注意点を共有する",
    designId: "infographic-blue",
  },
  {
    id: "positioning",
    label: "ポジショニング研修",
    purpose: "介護職向け勉強会",
    slideCount: "15枚",
    theme: "拘縮予防と安楽な姿勢づくりにつながるポジショニングの基本を伝えたい",
    audience: "介護職",
    goal: "介助方法を統一する",
    designId: "training-slate",
  },
  {
    id: "self-training-need",
    label: "自主トレの必要性",
    purpose: "家族説明用",
    slideCount: "10枚",
    theme: "退院後も自主トレを継続する必要性を家族に分かりやすく伝えたい",
    audience: "家族",
    goal: "自主トレを継続してもらう",
    designId: "rose-gentle",
  },
  {
    id: "stroke-hemiplegia",
    label: "脳卒中片麻痺の自主トレ",
    purpose: "家族説明用",
    slideCount: "15枚",
    theme:
      "脳卒中片麻痺の方が自宅で安全に自主トレを継続するためのポイントを説明したい",
    audience: "家族",
    goal: "退院後の生活をイメージしてもらう",
    designId: "soft-sky",
  },
  {
    id: "tka-precautions",
    label: "TKA術後の注意点",
    purpose: "利用者説明用",
    slideCount: "10枚",
    theme: "TKA術後の日常生活で膝に負担をかけすぎないための注意点を説明したい",
    audience: "利用者本人",
    goal: "注意点を共有する",
    designId: "medical-clean",
  },
  {
    id: "community-rehab",
    label: "生活期リハビリとは",
    purpose: "新人教育用",
    slideCount: "15枚",
    theme: "生活期リハビリの考え方と、機能訓練だけで終わらない関わり方を伝えたい",
    audience: "新人スタッフ",
    goal: "理解してもらう",
    designId: "training-slate",
  },
  {
    id: "case-presentation",
    label: "症例発表テンプレート",
    purpose: "症例発表用",
    slideCount: "15枚",
    theme: "症例の評価、問題点、介入、経過、考察を分かりやすく整理したい",
    audience: "リハ職",
    goal: "症例の経過を伝える",
    designId: "academic-navy",
  },
  {
    id: "pre-discharge",
    label: "退院前指導",
    purpose: "退院前指導用",
    slideCount: "20枚",
    theme:
      "退院後の生活で安全に過ごすための環境調整、動作方法、家族の見守りポイントを伝えたい",
    audience: "家族",
    goal: "退院後の生活をイメージしてもらう",
    designId: "handout-a4",
  },
];
