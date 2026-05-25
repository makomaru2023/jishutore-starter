import {
  PURPOSE_GUIDELINES,
  type Audience,
  type ExtraOption,
  type Goal,
  type Purpose,
  type SlideCount,
} from "./constants";

export interface PromptInput {
  purpose: Purpose | null;
  slideCount: SlideCount | null;
  theme: string;
  audience: Audience | null;
  goal: Goal | null;
  /** 選択されたビジュアルスタイルの説明文（slideDesigns の buildDesignDescriptor） */
  design: string | null;
  extras: ExtraOption[];
}

/** 必須項目（用途・枚数・テーマ）が揃っているか */
export function isPromptReady(input: PromptInput): boolean {
  return Boolean(input.purpose && input.slideCount && input.theme.trim());
}

/**
 * 入力内容からChatGPTに貼り付けるプロンプト文字列を生成する。
 * 必須項目が未入力の場合は null を返す。
 */
export function buildPrompt(input: PromptInput): string | null {
  if (!isPromptReady(input)) return null;

  const purpose = input.purpose as Purpose;
  const slideCount = input.slideCount as SlideCount;
  const theme = input.theme.trim();
  const audience = input.audience ?? "指定なし（用途に合わせて適切に設定してください）";
  const goal = input.goal ?? "指定なし";
  const design =
    input.design ?? "指定なし（医療・介護向けの清潔感あるデザイン）";

  const extras =
    input.extras.length > 0
      ? input.extras.map((e) => `- ${e}`).join("\n")
      : "- 特になし";

  const guidelines = PURPOSE_GUIDELINES[purpose]
    .map((g) => `- ${g}`)
    .join("\n");

  return `あなたは医療・介護分野に強いプロのスライド構成作家です。
以下の条件に沿って、${purpose}のスライド構成案を作成してください。

# 基本情報
- 使用用途：${purpose}
- スライド枚数：${slideCount}（表紙・まとめスライドを含む）
- テーマ：${theme}
- 対象者：${audience}
- 資料のゴール：${goal}
- デザイン方針：${design}

# 追加オプション
${extras}

# ${purpose}としての作成方針
${guidelines}

# 出力形式
各スライドについて、以下の項目を順番に出力してください。
1. スライド番号
2. スライドタイトル
3. メインメッセージ（そのスライドで一番伝えたいこと・1文）
4. 本文（箇条書き中心。実際に話す・載せる内容の要点）
5. 図解・イラスト案（どんな図やイメージが合うか）
6. 自主トレ素材庫のイラストを使う場合の挿入案（どの場面でどんなイラストを入れると良いか）
7. 発表者ノート（口頭で補足する内容）

PowerPointにそのまま貼り付けやすいよう、スライドごとに区切って整理して出力してください。

# 注意点
- 医学的に断定しすぎる表現は避けてください。
- 「必ず改善する」「これだけで十分」「全員に効果がある」などの表現は使わないでください。
- 実際の指導では、主治医や担当療法士の方針を優先する旨を添えてください。
- 個人情報は含めないでください。
- 症例発表の場合は、年齢・疾患・生活背景などが個人特定につながらないように匿名化してください。
- PowerPointに貼り付けやすいよう、スライドごとに整理してください。`;
}
