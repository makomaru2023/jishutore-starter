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

// 配色やテイストは「ビジュアルスタイル」が決める。
// ここはどのスタイルでも共通で守る普遍的なルールだけを書く（色は固定しない）。
function commonImageRules(): string {
  return `- プレゼン資料で使う16:9横長のスライド画像を作成する
- 1回の生成で1枚の独立したスライド画像にする（一覧・グリッド・コラージュにはしない）
- 配色とテイストは上の「ビジュアルスタイル」に必ず従う
- 1スライド1メッセージとし、文字量は少なくする
- スライドに入れる日本語は、誤字脱字なく、はっきり読める大きさで表示する
- 高齢者や家族にも見やすい、十分に大きな文字サイズにする
- 余白を広く取り、要素を詰め込みすぎない
- 図解や簡単なアイコンは、ビジュアルスタイルのテイストに合わせて使う
- 不安や痛みを過度にあおる表現は使わない
- 「必ず治る」「これだけで十分」などの断定的な表現は使わない
- 実在の人物名・施設名・個人情報は一切含めない`;
}

// スライドに「文字として表示する内容」を、誤字なく正確に出させるための指示。
// 画像生成では日本語が崩れやすいので、表示する文言を明示し、それ以外を増やさせない。
function slideTextSpec(slide: SlideConfig): string {
  const lines = [`- タイトル：「${valueOrDefault(slide.title)}」`];
  if (slide.message.trim()) {
    lines.push(`- 要点：「${slide.message.trim()}」`);
  }
  if (slide.note.trim()) {
    lines.push(`- 補足：「${slide.note.trim()}」`);
  }
  return `${lines.join(
    "\n"
  )}\n上記の日本語を、誤字脱字なく、はっきり読める大きさでスライドに表示してください。ここに書かれていない長い文章は追加しないでください。`;
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
プレゼン資料で使う16:9横長のスライド画像を「1枚だけ」作成してください。一覧・グリッド・コラージュにはしないでください。

# ビジュアルスタイル（最優先：この見た目に必ず合わせる）
スタイル名：${visualStyle.name}
${visualStyle.promptBlock}
※このスタイルの配色・トーン・テイストを、スライド全体に一貫して適用してください。

# このスライドに表示する文字（この通りに正確に表示）
${slideTextSpec(slide)}

# このスライドの役割
- スライド番号：${index + 1}枚目 / 全${total || "指定なし"}枚
- 役割：${slide.kind}
- 見せ方：1スライド1メッセージ。箇条書きは短く、最大3項目まで。タイトルを大きく、要点を簡潔に。

# 資料全体の前提
- 使用用途：${input.purpose ?? "指定なし"}
- テーマ：${valueOrDefault(input.theme)}
- 対象者：${input.audience ?? "指定なし"}
- 資料のゴール：${input.goal ?? "指定なし"}
- デザイン方針：${input.designPolicy ?? "指定なし"}
- 追加オプション：
${listLines([...input.extras])}

# 使用用途ごとの方針
${listLines(purposeGuidelines)}

# 共通ルール
${commonImageRules()}

以上の条件で、選んだビジュアルスタイルに沿った、1枚の独立した16:9スライド画像として出力してください。`;
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
これから、16:9横長のスライド画像を全${total || "指定なし"}枚そろえます。まず全体の方針を共有します。画像生成は1回につき1枚のスライド画像とし、一覧・グリッド・コラージュは作らないでください。

# ビジュアルスタイル（最優先：全スライド共通の見た目）
スタイル名：${visualStyle.name}
${visualStyle.promptBlock}
※全スライドで、この配色・トーン・テイストを一貫して使ってください。

# 資料全体の前提
- 全体枚数：${total || "指定なし"}枚
- 使用用途：${input.purpose ?? "指定なし"}
- テーマ：${valueOrDefault(input.theme)}
- 対象者：${input.audience ?? "指定なし"}
- 資料のゴール：${input.goal ?? "指定なし"}
- デザイン方針：${input.designPolicy ?? "指定なし"}

# 各スライドの役割と表示文字
${slideSummary(input.slides)}

# 使用用途ごとの方針
${listLines(purposeGuidelines)}

# 追加オプション
${listLines([...input.extras])}

# 共通ルール
${commonImageRules()}

# 作成方針
- 各スライドは独立した1枚画像として生成する
- 表紙・導入・本文・図解・まとめの役割に応じて見せ方を変えつつ、ビジュアルスタイルは全枚数で統一する
- 各スライドの「タイトル」「要点」は、指定の日本語を誤字なく、はっきり読める大きさで表示する
- 文字を詰め込みすぎず、見出し・短い要点・図解で伝える

# 実際の生成手順
1枚ずつ作るときは、下の「各スライドごとの個別プロンプト」を1つずつChatGPTに貼り付けてください。`;

  return {
    allPrompt,
    slidePrompts,
    missingRequired,
    missingSlideMessages,
  };
}
