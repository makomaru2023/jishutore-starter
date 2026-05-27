import {
  PURPOSE_GUIDELINES,
  VISUAL_STYLES,
  slideCountToNumber,
  type Audience,
  type DesignPolicy,
  type ExtraOption,
  type Goal,
  type Purpose,
  type SlideConfig,
  type SlideCount,
  type VisualStyleId,
} from "./constants";

export interface PromptInput {
  purpose: Purpose | null;
  slideCount: SlideCount | null;
  theme: string;
  audience: Audience | null;
  goal: Goal | null;
  designPolicy: DesignPolicy | null;
  visualStyleId: VisualStyleId;
  extras: ExtraOption[];
  slides: SlideConfig[];
}

export interface PromptOutput {
  allPrompt: string;
  slidePrompts: string[];
  missingRequired: boolean;
  missingSlideMessages: boolean;
}

function valueOrDefault(value: string | null | undefined): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : "指定なし";
}

function listLines(items: string[]): string {
  return items.length > 0 ? items.map((item) => `- ${item}`).join("\n") : "- 指定なし";
}

function commonImageRules(): string {
  return `- あなたは医療・介護分野に強いプロのスライドデザイナーです
- プレゼン資料で使う16:9横長のスライド画像を作成してください
- 1回の生成で1枚の独立したスライド画像を作成してください
- 複数スライドを1枚にまとめた一覧画像、グリッド、コラージュは作らないでください
- 白背景を基調にする
- 薄い青とグレーを中心に使う
- 清潔感のある医療・介護向けデザインにする
- 余白を広く取る
- 文字量は少なめにする
- 1スライド1メッセージにする
- 読みやすい日本語にする
- 箇条書きは短くする
- 高齢者や家族にも見やすいデザインにする
- 図解や簡単なアイコンを必要に応じて使う
- 過度に派手にしない
- 不安や痛みを強くあおる表現は避ける
- 医学的に断定しすぎる表現は避ける
- 「必ず改善する」「これだけで十分」などの断定表現は避ける
- 個人情報は含めない`;
}

function getVisualStyle(visualStyleId: VisualStyleId) {
  return VISUAL_STYLES.find((style) => style.id === visualStyleId) ?? VISUAL_STYLES[0];
}

function slideSummary(slides: SlideConfig[]): string {
  return slides
    .map(
      (slide, index) =>
        `${index + 1}枚目：${slide.kind} / タイトル：${valueOrDefault(slide.title)} / 伝えたいこと：${valueOrDefault(slide.message)}${
          slide.note.trim() ? ` / 補足：${slide.note.trim()}` : ""
        }`
    )
    .join("\n");
}

export function buildSingleSlidePrompt(
  input: PromptInput,
  slide: SlideConfig,
  index: number
): string {
  const total = input.slides.length || slideCountToNumber(input.slideCount);
  const purposeGuidelines = input.purpose ? PURPOSE_GUIDELINES[input.purpose] : [];
  const visualStyle = getVisualStyle(input.visualStyleId);

  return `あなたは医療・介護分野に強いプロのスライドデザイナーです。

プレゼン資料で使う16:9横長のスライド画像を1枚だけ作成してください。
1回の生成で1枚の独立したスライド画像を作成してください。
複数枚をまとめた一覧画像、グリッド、コラージュは作らないでください。

【現在作るスライド】
- スライド番号：${index + 1}枚目
- 全体枚数：${total || "指定なし"}
- スライドの役割：${slide.kind}
- タイトル：${valueOrDefault(slide.title)}
- このスライドで伝えたいこと：${valueOrDefault(slide.message)}
- 補足内容：${valueOrDefault(slide.note)}

【資料全体の条件】
- 使用用途：${input.purpose ?? "指定なし"}
- テーマ：${valueOrDefault(input.theme)}
- 対象者：${input.audience ?? "指定なし"}
- 資料のゴール：${input.goal ?? "指定なし"}
- デザイン方針：${input.designPolicy ?? "指定なし"}
- ビジュアルスタイル：${visualStyle.name}
- 追加オプション：
${listLines([...input.extras])}

【ビジュアルスタイルの指示】
${visualStyle.promptBlock}

【使用用途ごとの指示】
${listLines(purposeGuidelines)}

【画像生成ルール】
${commonImageRules()}

【このスライドの見せ方】
- 文字量は少なめにする
- 1スライド1メッセージにする
- 箇条書きは短く、最大3項目までにする
- 白背景ベース、薄い青とグレー中心にする
- 医療・介護向けの清潔感を出す
- 必要に応じて図解、簡単なアイコン、人物シルエットを使う
- 高齢者や家族にも見やすい大きめの文字にする
- 過度に派手にしない
- 読みやすい日本語だけを使う

この条件で、1枚の独立したスライド画像として出力してください。`;
}

export function buildPrompt(input: PromptInput): PromptOutput {
  const missingRequired = !input.purpose || !input.slideCount || !input.theme.trim();
  const missingSlideMessages = input.slides.some((slide) => !slide.message.trim());
  const purposeGuidelines = input.purpose ? PURPOSE_GUIDELINES[input.purpose] : [];
  const visualStyle = getVisualStyle(input.visualStyleId);
  const total = input.slides.length || slideCountToNumber(input.slideCount);
  const slidePrompts = input.slides.map((slide, index) =>
    buildSingleSlidePrompt(input, slide, index)
  );

  const allPrompt = `あなたは医療・介護分野に強いプロのスライドデザイナーです。

以下の条件に沿って、プレゼン資料で使う16:9横長のスライド画像を作成するためのプロンプト案を整理してください。
画像生成は1回につき1枚のスライド画像です。
一覧コラージュや複数枚まとめ画像は作らないでください。

【資料全体】
- この資料は全${total || "指定なし"}枚構成です
- 使用用途：${input.purpose ?? "指定なし"}
- テーマ：${valueOrDefault(input.theme)}
- 対象者：${input.audience ?? "指定なし"}
- 資料のゴール：${input.goal ?? "指定なし"}
- デザイン方針：${input.designPolicy ?? "指定なし"}
- ビジュアルスタイル：${visualStyle.name}

【各スライドの役割】
${slideSummary(input.slides)}

【ビジュアルスタイルの指示】
${visualStyle.promptBlock}

【使用用途ごとの指示】
${listLines(purposeGuidelines)}

【追加オプション】
${listLines([...input.extras])}

【全体のデザインルール】
${commonImageRules()}

【作成方針】
- 各スライドは独立した1枚画像として生成する
- 1枚ずつ順番に生成できるよう、スライドごとの意図を明確にする
- 表紙、導入、本文、図解、まとめの役割に応じて見せ方を変える
- 文字を詰め込みすぎず、見出し・短い要点・図解で伝える
- 一覧やコラージュではなく、1枚ごとに完成した横長スライド画像にする

【個別生成時の注意】
各スライドを作るときは、下の「各スライドごとの個別プロンプト」を1つずつChatGPTに貼り付けてください。`;

  return {
    allPrompt,
    slidePrompts,
    missingRequired,
    missingSlideMessages,
  };
}
