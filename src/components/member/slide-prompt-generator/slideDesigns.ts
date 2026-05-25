/* ビジュアルスタイル（スライドデザイン）定義
   画像ファイルは使わず、配色とレイアウトをSVGでその場描画してプレビューする。
   デザインを増やす場合は SLIDE_DESIGNS に1件追加するだけでよい。 */

export type SlideLayout =
  | "leftBar"
  | "topBand"
  | "sidebar"
  | "centered"
  | "split"
  | "framed";

export type MotifKind = "bars" | "line" | "donut" | "icons" | "steps" | "photo";

export interface Palette {
  bg: string;
  surface: string;
  ink: string;
  sub: string;
  accent: string;
  accent2: string;
  border: string;
  /** アクセント面に乗せる文字色（省略時は白） */
  onAccent?: string;
}

export interface SampleSlide {
  kind: "cover" | "content" | "summary";
  eyebrow: string;
  title: string;
  subtitle?: string;
  bullets?: string[];
  motif: MotifKind;
}

export interface SlideDesign {
  id: string;
  name: string;
  description: string;
  tags: string[];
  layout: SlideLayout;
  palette: Palette;
  slides: SampleSlide[];
}

/* ──────────── パレット ──────────── */

const PALETTES = {
  clean: { bg: "#ffffff", surface: "#f1f5f9", ink: "#0f172a", sub: "#64748b", accent: "#2563eb", accent2: "#60a5fa", border: "#e2e8f0" },
  navy: { bg: "#ffffff", surface: "#eef2f7", ink: "#0f1f3d", sub: "#475569", accent: "#1e3a8a", accent2: "#64748b", border: "#dbe2ec" },
  blueVivid: { bg: "#ffffff", surface: "#eff6ff", ink: "#0b1f3a", sub: "#475569", accent: "#1d4ed8", accent2: "#38bdf8", border: "#dbeafe" },
  sky: { bg: "#f5fbff", surface: "#e0f2fe", ink: "#0c4a6e", sub: "#0369a1", accent: "#0ea5e9", accent2: "#7dd3fc", border: "#cfeafe" },
  medical: { bg: "#ffffff", surface: "#eef6ff", ink: "#103a5a", sub: "#4b6b86", accent: "#0d6efd", accent2: "#5eb3f6", border: "#dde9f5" },
  slate: { bg: "#ffffff", surface: "#f1f5f9", ink: "#1e293b", sub: "#64748b", accent: "#334155", accent2: "#94a3b8", border: "#e2e8f0" },
  coral: { bg: "#fff8f6", surface: "#ffe9e3", ink: "#5b1f12", sub: "#9a5a48", accent: "#f4623a", accent2: "#fb9d83", border: "#fad9cf" },
  indigo: { bg: "#ffffff", surface: "#eef0ff", ink: "#1e1b4b", sub: "#555a8a", accent: "#4f46e5", accent2: "#a5b4fc", border: "#e0e2fb" },
  dark: { bg: "#0f172a", surface: "#1e293b", ink: "#f8fafc", sub: "#94a3b8", accent: "#38bdf8", accent2: "#818cf8", border: "#334155", onAccent: "#0f172a" },
  amber: { bg: "#fffdf5", surface: "#fef3c7", ink: "#5b3d0a", sub: "#9a7b3a", accent: "#f59e0b", accent2: "#fbbf24", border: "#fae9c0", onAccent: "#3b2a06" },
  mono: { bg: "#ffffff", surface: "#f4f4f5", ink: "#18181b", sub: "#71717a", accent: "#27272a", accent2: "#a1a1aa", border: "#e4e4e7" },
  rose: { bg: "#fff7fa", surface: "#ffe4ee", ink: "#5b1733", sub: "#9a5072", accent: "#e11d6b", accent2: "#fb7faf", border: "#fad3e1" },
  red: { bg: "#ffffff", surface: "#fff1f1", ink: "#4c0a0a", sub: "#7f4444", accent: "#dc2626", accent2: "#f87171", border: "#fbd5d5" },
  purple: { bg: "#fdfbff", surface: "#f3e8ff", ink: "#3b0764", sub: "#7a5a9a", accent: "#7c3aed", accent2: "#c4b5fd", border: "#eaddff" },
} satisfies Record<string, Palette>;

/* ──────────── サンプルスライド（3枚セット） ──────────── */

const SETS: Record<string, SampleSlide[]> = {
  present: [
    { kind: "cover", eyebrow: "PROPOSAL / 2026", title: "機能訓練プログラム改善案", subtitle: "現場で続けられる仕組みづくり", motif: "bars" },
    { kind: "content", eyebrow: "EXPECTED EFFECT", title: "期待される効果", bullets: ["離床時間の増加", "転倒の減少", "満足度の向上"], motif: "line" },
    { kind: "summary", eyebrow: "ROADMAP", title: "導入ステップ", bullets: ["試行する", "効果を評価", "全体へ展開"], motif: "steps" },
  ],
  case: [
    { kind: "cover", eyebrow: "CASE REPORT", title: "症例から学ぶ生活期リハ", subtitle: "評価から考察までの流れ", motif: "photo" },
    { kind: "content", eyebrow: "DATA", title: "経過の可視化", bullets: ["FIMの推移", "歩行自立度", "在宅復帰率"], motif: "bars" },
    { kind: "summary", eyebrow: "DISCUSSION", title: "考察と今後の課題", bullets: ["介入の効果", "残された課題", "多職種連携"], motif: "line" },
  ],
  home: [
    { kind: "cover", eyebrow: "HOME EXERCISE", title: "自主トレを続けるコツ", subtitle: "退院後も無理なく続けるために", motif: "line" },
    { kind: "content", eyebrow: "WHY", title: "続かない理由と対策", bullets: ["目的が曖昧", "負荷が合わない", "記録が続かない"], motif: "donut" },
    { kind: "summary", eyebrow: "FOR FAMILY", title: "ご家族へのお願い", bullets: ["やりすぎない", "できたら褒める", "困ったら相談"], motif: "icons" },
  ],
  edu: [
    { kind: "cover", eyebrow: "TRAINING", title: "新人向け 生活期リハとは", subtitle: "機能訓練で終わらせない関わり", motif: "steps" },
    { kind: "content", eyebrow: "BASIC", title: "おさえる3つの視点", bullets: ["心身機能", "活動", "参加"], motif: "icons" },
    { kind: "summary", eyebrow: "CHECK", title: "現場での確認ポイント", bullets: ["目標の共有", "生活への般化", "記録を残す"], motif: "donut" },
  ],
  fall: [
    { kind: "cover", eyebrow: "FALL PREVENTION", title: "転倒予防の基本", subtitle: "明日から実践できる視点", motif: "icons" },
    { kind: "content", eyebrow: "POINT", title: "転びやすい3つの場面", bullets: ["移乗・立ち上がり", "夜間のトイレ", "履物と床の環境"], motif: "bars" },
    { kind: "summary", eyebrow: "SUMMARY", title: "今日からできること", bullets: ["環境を整える", "声かけを統一", "チームで共有"], motif: "steps" },
  ],
};

interface DesignSeed {
  id: string;
  name: string;
  description: string;
  tags: string[];
  layout: SlideLayout;
  palette: keyof typeof PALETTES;
  set: keyof typeof SETS;
}

const SEEDS: DesignSeed[] = [
  { id: "corporate-clean", name: "コーポレート・クリーン", description: "白基調・余白多めの正統派スライド", tags: ["信頼感", "白基調", "余白"], layout: "leftBar", palette: "clean", set: "present" },
  { id: "strategy-navy", name: "戦略コンサル", description: "ネイビー基調・図表で論理性を演出", tags: ["コンサル", "戦略", "論理的"], layout: "framed", palette: "navy", set: "case" },
  { id: "vivid-blue", name: "ビビッドブルー・フラット", description: "ビビッドブルーを効かせた現代的フラット", tags: ["フラット", "現代的", "知的"], layout: "topBand", palette: "blueVivid", set: "present" },
  { id: "soft-sky", name: "やさしいスカイ", description: "淡い水色でやわらかい家族説明向け", tags: ["やさしい", "家族向け", "安心"], layout: "centered", palette: "sky", set: "home" },
  { id: "medical-clean", name: "メディカル・クリーン", description: "医療現場になじむ清潔感のある白×青", tags: ["医療", "清潔感", "シンプル"], layout: "leftBar", palette: "medical", set: "fall" },
  { id: "training-slate", name: "研修スレート", description: "落ち着いたグレー基調の研修資料", tags: ["研修", "落ち着き", "中立"], layout: "topBand", palette: "slate", set: "edu" },
  { id: "academic-navy", name: "学会ポスター風", description: "学会発表向けの端正な学術デザイン", tags: ["学会", "症例", "端正"], layout: "framed", palette: "navy", set: "case" },
  { id: "warm-care", name: "あたたかケア", description: "温かみのあるコーラルで介護向け", tags: ["あたたかい", "介護", "親しみ"], layout: "sidebar", palette: "coral", set: "home" },
  { id: "indigo-modern", name: "インディゴ・モダン", description: "インディゴの効いた今っぽいデザイン", tags: ["モダン", "知的", "洗練"], layout: "split", palette: "indigo", set: "present" },
  { id: "dark-impact", name: "ダーク・インパクト", description: "濃紺背景で要点が映えるプレゼン向け", tags: ["プレゼン", "映える", "力強い"], layout: "centered", palette: "dark", set: "present" },
  { id: "handout-a4", name: "A4配布フレンドリー", description: "印刷・配布しやすい情報整理型", tags: ["配布", "印刷", "整理"], layout: "leftBar", palette: "clean", set: "edu" },
  { id: "infographic-blue", name: "インフォグラフィック", description: "図解・アイコン中心で直感的に伝える", tags: ["図解", "アイコン", "直感的"], layout: "split", palette: "blueVivid", set: "fall" },
  { id: "amber-friendly", name: "フレンドリー・アンバー", description: "親しみやすい黄系アクセントで前向きに", tags: ["親しみ", "明るい", "前向き"], layout: "topBand", palette: "amber", set: "home" },
  { id: "sky-sidebar", name: "スカイ・サイドバー", description: "左帯デザインで見出しが映える", tags: ["見出し", "整然", "水色"], layout: "sidebar", palette: "sky", set: "edu" },
  { id: "mono-minimal", name: "モノ・ミニマル", description: "白黒基調の超ミニマルデザイン", tags: ["ミニマル", "白黒", "洗練"], layout: "centered", palette: "mono", set: "case" },
  { id: "rose-gentle", name: "ローズ・やさしい", description: "やわらかいローズで家族説明に", tags: ["やさしい", "家族", "やわらか"], layout: "centered", palette: "rose", set: "home" },
  { id: "navy-split", name: "ネイビー・スプリット", description: "左右分割で図と文章を両立", tags: ["分割", "図解", "論理的"], layout: "split", palette: "navy", set: "present" },
  { id: "vivid-red", name: "ビビッド・レッド", description: "攻めの赤アクセント。注意喚起にも", tags: ["注意喚起", "力強い", "赤"], layout: "topBand", palette: "red", set: "fall" },
  { id: "purple-creative", name: "パープル・クリエイティブ", description: "個性的な紫で新規提案向け", tags: ["個性的", "提案", "クリエイティブ"], layout: "split", palette: "purple", set: "present" },
  { id: "clinical-grid", name: "クリニカル・グリッド", description: "整然としたグリッドで臨床向け", tags: ["臨床", "整然", "データ"], layout: "leftBar", palette: "medical", set: "case" },
  { id: "sky-centered", name: "スカイ・センター", description: "中央寄せで一枚に一メッセージ", tags: ["シンプル", "中央", "明快"], layout: "centered", palette: "sky", set: "fall" },
  { id: "slate-frame", name: "スレート・フレーム", description: "枠付きで引き締まった研修向け", tags: ["研修", "枠", "端正"], layout: "framed", palette: "slate", set: "edu" },
  { id: "blue-steps", name: "ブルー・ステップ", description: "手順・流れを示すのが得意", tags: ["手順", "流れ", "プロセス"], layout: "leftBar", palette: "clean", set: "edu" },
  { id: "coral-poster", name: "コーラル・ポスター", description: "掲示・ポスター映えする明るさ", tags: ["ポスター", "掲示", "明るい"], layout: "centered", palette: "coral", set: "fall" },
];

export const SLIDE_DESIGNS: SlideDesign[] = SEEDS.map((s) => ({
  id: s.id,
  name: s.name,
  description: s.description,
  tags: s.tags,
  layout: s.layout,
  palette: PALETTES[s.palette],
  slides: SETS[s.set],
}));

export function getDesignById(id: string): SlideDesign | undefined {
  return SLIDE_DESIGNS.find((d) => d.id === id);
}

/** 選択されたデザインをプロンプトに差し込む文章にする */
export function buildDesignDescriptor(design: SlideDesign): string {
  return `${design.name}（${design.description}／キーワード：${design.tags.join("・")}）`;
}
