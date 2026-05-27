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

export type VisualStyleId =
  | "simple-medical-care"
  | "gentle-explanation"
  | "training-slide"
  | "diagram-rich"
  | "visual-focused"
  | "checklist"
  | "step-by-step"
  | "jishutore-style";

export interface VisualStyle {
  id: VisualStyleId;
  name: string;
  summary: string;
  tags: string[];
  promptBlock: string;
}

export const VISUAL_STYLES: VisualStyle[] = [
  {
    id: "simple-medical-care",
    name: "シンプル医療・介護スタイル",
    summary: "白背景と薄い青・グレーで、清潔感と読みやすさを優先する標準スタイル。",
    tags: ["標準", "清潔感", "万能"],
    promptBlock:
      "白背景を広く使い、薄い青とグレーをアクセントにした医療・介護向けのシンプルなスライドにしてください。見出し、本文、図解の階層を明確にし、余白をしっかり取ってください。装飾は控えめにし、信頼感と読みやすさを優先してください。",
  },
  {
    id: "gentle-explanation",
    name: "やさしい説明資料スタイル",
    summary: "家族や利用者に向けて、安心感のあるやわらかい見た目にするスタイル。",
    tags: ["家族向け", "安心", "やさしい"],
    promptBlock:
      "淡い水色、白、薄いグレーを基調に、やさしく安心感のある説明資料にしてください。角丸の図形、やわらかいアイコン、生活場面が伝わるイラストを使い、専門職以外にも不安なく読める雰囲気にしてください。言葉づかいは短く、やさしく、日常語を中心にしてください。",
  },
  {
    id: "training-slide",
    name: "研修スライドスタイル",
    summary: "院内研修や勉強会で使いやすい、落ち着いた職員向けスタイル。",
    tags: ["研修", "職員向け", "整理"],
    promptBlock:
      "院内研修や勉強会でそのまま使える、落ち着いた研修スライドにしてください。見出しを明確にし、要点、比較、注意点、現場での実践ポイントが整理されて見える構成にしてください。ネイビー、グレー、白を中心に、ポップすぎない専門職向けの印象にしてください。",
  },
  {
    id: "diagram-rich",
    name: "図解多めスタイル",
    summary: "矢印、比較、フロー、関係図で直感的に理解しやすくするスタイル。",
    tags: ["図解", "矢印", "理解しやすい"],
    promptBlock:
      "文章中心ではなく、図解を主役にしてください。矢印、フロー図、左右比較、3要素整理、原因と対応の関係図などを使い、見ただけで流れや関係性が分かるスライドにしてください。本文は短くし、図解と余白のバランスを優先してください。",
  },
  {
    id: "visual-focused",
    name: "文字少なめ・ビジュアル重視スタイル",
    summary: "大きな見出しとイラストで、パッと伝わる印象的なスタイル。",
    tags: ["文字少なめ", "ビジュアル", "印象的"],
    promptBlock:
      "文字量をかなり少なくし、大きな見出し、短いサブコピー、視覚的なイラストやアイコンで伝えるスライドにしてください。1枚の中に詰め込みすぎず、視線の流れが自然になるように余白を広く取ってください。投影しても一瞬で内容が伝わる構成にしてください。",
  },
  {
    id: "checklist",
    name: "チェックリストスタイル",
    summary: "確認項目、注意点、持ち帰りポイントを整理しやすいスタイル。",
    tags: ["確認", "注意点", "配布向き"],
    promptBlock:
      "チェックリスト形式を中心に、確認すべき項目が一目で分かるスライドにしてください。チェックボックス、短い項目名、補足の一言を使い、行動前・実施中・相談が必要な場面などを整理してください。印刷や配布にも使いやすい、整った余白と読みやすい文字サイズにしてください。",
  },
  {
    id: "step-by-step",
    name: "ステップ解説スタイル",
    summary: "手順、流れ、段階的な説明を1、2、3で伝えるスタイル。",
    tags: ["手順", "ステップ", "実践"],
    promptBlock:
      "内容をステップ形式で整理してください。1、2、3の番号、矢印、流れが分かる配置を使い、最初に何をして、次に何を確認し、最後にどう行動するかが分かるスライドにしてください。自主トレ、介助方法、環境調整、動作説明に使いやすい構成にしてください。",
  },
  {
    id: "jishutore-style",
    name: "自主トレ素材庫風スタイル",
    summary: "淡い青とやさしいイラストで、自主トレ素材庫らしさを出すスタイル。",
    tags: ["素材庫らしさ", "イラスト", "やさしい"],
    promptBlock:
      "自主トレ素材庫らしい、淡い青、白、やさしいグレーを基調にしたスライドにしてください。高齢者、家族、リハ職が見ても親しみやすい、やわらかい医療・介護系イラストを使ってください。大きなタイトル、短い説明、丸みのあるアイコン、清潔感のある余白で統一してください。",
  },
];

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
    id: "in-hospital-study",
    label: "院内勉強会",
    summary: "介護職や多職種に、現場で使う知識と実践ポイントを共有する型です。",
    purpose: "介護職向け勉強会",
    slideCount: "5枚",
    theme: "現場でよくある困りごとについて、明日から実践できるポイントを伝えたい",
    audience: "介護職",
    goal: "注意点を共有する",
    designPolicy: "図解多めの分かりやすい資料",
    slides: [
      { kind: "表紙", title: "院内勉強会", message: "勉強会のテーマと対象者を明確に伝える", note: "" },
      { kind: "導入", title: "現場で起きやすい困りごと", message: "参加者が自分ごととして捉えやすい場面から導入する", note: "" },
      { kind: "本文", title: "基本の考え方", message: "テーマの背景と押さえるべき考え方を簡潔に整理する", note: "" },
      { kind: "図解", title: "OK例とNG例", message: "よい対応と避けたい対応を比較して見せる", note: "" },
      { kind: "まとめ", title: "明日からできること", message: "現場で実践できるポイントを3つ以内でまとめる", note: "" },
    ],
  },
  {
    id: "community-exercise-class",
    label: "地域体操教室",
    summary: "地域の参加者に、運動の目的と安全に続けるコツを伝える型です。",
    purpose: "施設内プレゼン用",
    slideCount: "5枚",
    theme: "地域の体操教室で、参加者が安全に楽しく運動を続けるポイントを伝えたい",
    audience: "一般の方向け",
    goal: "行動を変えてもらう",
    designPolicy: "文字少なめ・ビジュアル重視",
    slides: [
      { kind: "表紙", title: "地域体操教室", message: "体操教室のテーマと目的を親しみやすく伝える", note: "" },
      { kind: "導入", title: "なぜ体を動かすのか", message: "生活の中で運動を続ける意味を分かりやすく伝える", note: "" },
      { kind: "本文", title: "安全に行うポイント", message: "無理をしない、痛みを我慢しない、休憩することを伝える", note: "" },
      { kind: "図解", title: "動きのポイント", message: "姿勢、呼吸、動きの大きさを図解で示す", note: "" },
      { kind: "まとめ", title: "続けるための工夫", message: "自宅でも続けやすい小さな行動をまとめる", note: "" },
    ],
  },
  {
    id: "self-training-guidance",
    label: "自主トレ指導",
    summary: "利用者さんや家族に、自主トレの目的・手順・見守り方を伝える型です。",
    purpose: "家族説明用",
    slideCount: "5枚",
    theme: "自宅で安全に自主トレを続けるための目的、やり方、注意点を分かりやすく伝えたい",
    audience: "家族",
    goal: "自主トレを継続してもらう",
    designPolicy: "やさしい家族説明資料",
    slides: [
      { kind: "表紙", title: "自宅で続ける自主トレ", message: "自主トレ指導のテーマをやさしく伝える", note: "" },
      { kind: "導入", title: "なぜ自主トレが必要か", message: "生活の中で自主トレが役立つ理由を伝える", note: "" },
      { kind: "本文", title: "始める前の確認", message: "体調、痛み、疲労、周囲の環境を確認する必要性を伝える", note: "" },
      { kind: "図解", title: "安全に行うコツ", message: "無理なく行う姿勢や動き方を図解で示す", note: "" },
      { kind: "まとめ", title: "続けるための工夫", message: "家で続けやすくする工夫と相談の目安をまとめる", note: "" },
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
  {
    id: "in-hospital-training",
    label: "院内研修",
    summary: "介助方法やケアの統一など、スタッフ向けに手順をそろえる研修の型です。",
    purpose: "介護職向け勉強会",
    slideCount: "7枚",
    theme: "スタッフ間で介助方法やケアの考え方をそろえるために、基本手順と注意点を伝えたい",
    audience: "介護職",
    goal: "介助方法を統一する",
    designPolicy: "研修資料っぽい落ち着いたデザイン",
    slides: [
      { kind: "表紙", title: "院内研修", message: "研修テーマと現場で使う目的を伝える", note: "" },
      { kind: "導入", title: "なぜ統一が必要か", message: "スタッフ間で対応をそろえる意味を伝える", note: "" },
      { kind: "本文", title: "基本の考え方", message: "研修テーマの基本原則を簡潔に整理する", note: "" },
      { kind: "図解", title: "手順の流れ", message: "実践時の流れをステップ形式で示す", note: "" },
      { kind: "本文", title: "よくあるNG例", message: "現場で起きやすい失敗や注意点を整理する", note: "" },
      { kind: "図解", title: "OK例と修正ポイント", message: "望ましい対応と修正のポイントを比較して示す", note: "" },
      { kind: "まとめ", title: "現場で確認すること", message: "日々のケアで確認したいポイントをまとめる", note: "" },
    ],
  },
  {
    id: "user-explanation",
    label: "利用者説明",
    summary: "本人に向けて、日常生活の注意点や行動のコツを短く伝える型です。",
    purpose: "利用者説明用",
    slideCount: "5枚",
    theme: "日常生活で安全に過ごすための注意点と、無理なく取り組める行動を説明したい",
    audience: "利用者本人",
    goal: "注意点を共有する",
    designPolicy: "医療・介護向けのシンプル資料",
    slides: [
      { kind: "表紙", title: "生活の注意点", message: "本人向けに説明するテーマを分かりやすく伝える", note: "" },
      { kind: "導入", title: "大切にしたい考え方", message: "無理をしすぎず、安全に行動する必要性を伝える", note: "" },
      { kind: "本文", title: "気をつけたい場面", message: "日常生活の中で注意したい場面を整理する", note: "" },
      { kind: "図解", title: "OK例と避けたい例", message: "安全な行動と避けたい行動を比較して示す", note: "" },
      { kind: "まとめ", title: "困った時は相談する", message: "痛みや不安がある時は自己判断しないことを伝える", note: "" },
    ],
  },
  {
    id: "new-staff-education",
    label: "新人教育",
    summary: "新人スタッフに、基礎知識と現場での見方を段階的に伝える型です。",
    purpose: "新人教育用",
    slideCount: "7枚",
    theme: "新人スタッフに、現場で必要な基礎知識と関わり方を段階的に伝えたい",
    audience: "新人スタッフ",
    goal: "理解してもらう",
    designPolicy: "研修資料っぽい落ち着いたデザイン",
    slides: [
      { kind: "表紙", title: "新人教育", message: "新人スタッフ向けに扱うテーマを明確に伝える", note: "" },
      { kind: "導入", title: "まず押さえること", message: "テーマを学ぶ目的と現場で役立つ場面を伝える", note: "" },
      { kind: "本文", title: "基本用語と考え方", message: "初めて学ぶ人にも分かるように基礎を整理する", note: "" },
      { kind: "図解", title: "実践までの流れ", message: "観察、判断、実践、振り返りの流れを図解で示す", note: "" },
      { kind: "本文", title: "つまずきやすい点", message: "新人が迷いやすい場面と注意点を伝える", note: "" },
      { kind: "本文", title: "先輩に確認すること", message: "自己判断せず相談したい場面を整理する", note: "" },
      { kind: "まとめ", title: "明日から意識すること", message: "現場で意識したいポイントを3つ以内でまとめる", note: "" },
    ],
  },
  {
    id: "case-presentation",
    label: "症例発表テンプレート",
    summary: "評価、問題点、介入、経過、考察を簡潔に整理する症例発表の型です。",
    purpose: "症例発表用",
    slideCount: "7枚",
    theme: "症例の評価、問題点、介入、経過、考察を分かりやすく整理したい",
    audience: "リハ職",
    goal: "症例の経過を伝える",
    designPolicy: "症例発表向けの学会風デザイン",
    slides: [
      { kind: "表紙", title: "症例発表", message: "症例テーマと発表の焦点を匿名化して伝える", note: "" },
      { kind: "導入", title: "発表の目的", message: "この症例から共有したい臨床上の問いを示す", note: "" },
      { kind: "本文", title: "背景と評価", message: "個人情報を避けながら、評価結果を簡潔に整理する", note: "" },
      { kind: "本文", title: "問題点と目標", message: "生活上の課題とリハ目標を整理する", note: "" },
      { kind: "本文", title: "介入内容", message: "実施した介入と狙いを簡潔に伝える", note: "" },
      { kind: "図解", title: "経過と変化", message: "介入前後の変化を表や簡単な図で示す", note: "" },
      { kind: "まとめ", title: "考察と今後の課題", message: "事実と考察を分けて、今後の課題をまとめる", note: "" },
    ],
  },
];

export function slideCountToNumber(slideCount: SlideCount | null): number {
  if (!slideCount) return 0;
  return Number.parseInt(slideCount.replace("枚", ""), 10);
}
