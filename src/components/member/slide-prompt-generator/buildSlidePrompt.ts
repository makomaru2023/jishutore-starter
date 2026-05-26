import {
  PURPOSE_GUIDELINES,
  type Audience,
  type ExtraOption,
  type Goal,
  type Purpose,
  type SlideCount,
  type Tone,
} from "./constants";
import { getVisualStylePreset } from "./visualStylePresets";

export type SlidePromptInput = {
  purpose: Purpose | null;
  slideCount: SlideCount | null;
  theme: string;
  audience?: Audience | null;
  goal?: Goal | null;
  tone?: Tone | null;
  visualStyleId: string;
  extras: ExtraOption[];
};

function valueOrDefault(value: string | null | undefined): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : "指定なし";
}

export function buildSlidePrompt(input: SlidePromptInput): string {
  const selectedStyle = getVisualStylePreset(input.visualStyleId);
  const purpose = input.purpose ?? "指定なし";
  const slideCount = input.slideCount ?? "指定なし";
  const theme = valueOrDefault(input.theme);
  const audience = input.audience ?? "指定なし";
  const goal = input.goal ?? "指定なし";
  const tone = input.tone ?? "指定なし";
  const extras =
    input.extras.length > 0
      ? input.extras.map((extra) => `- ${extra}`).join("\n")
      : "- 指定なし";
  const purposeGuidelines =
    input.purpose && PURPOSE_GUIDELINES[input.purpose]
      ? PURPOSE_GUIDELINES[input.purpose].map((item) => `- ${item}`).join("\n")
      : "- 指定なし";

  return `あなたは、医療・介護・リハビリ領域に強いプロのスライドデザイナーです。

以下の条件に沿って、リハビリ職がそのまま使えるPowerPoint資料を作成してください。

【出力形式】
- 最終出力はPowerPoint形式（.pptx）
- スライド比率：16:9 横長
- 全スライドを1つの.pptxファイルとして作成
- 各スライドは編集可能なテキスト、図形、表、アイコン、レイアウト要素で構成
- スライド全体を1枚画像として貼り付ける形式は禁止
- 文字、図形、表、見出し、補足テキストは後からPowerPoint上で編集できる状態にする
- 表紙、本文、まとめまで同じビジュアルスタイルで統一する

【資料条件】
- 使用用途：${purpose}
- スライド枚数：${slideCount}
- テーマ：${theme}
- 対象者：${audience}
- 資料のゴール：${goal}
- トーン：${tone}

【コンセプト】
投影でも読みやすい大きな見出しと十分な余白を使い、1スライド1テーマで簡潔に伝える資料にしてください。

【ビジュアルスタイル】
${selectedStyle.name}

【ビジュアルスタイル共通ルール】
選択されたビジュアルスタイルは、単なる色味の違いではなく、スライド全体の配色、余白、見出し、本文量、図解の使い方、装飾の強さ、言葉づかいに一貫して反映してください。

表紙だけでなく、全ての本文スライド・まとめスライドにも同じビジュアルルールを適用してください。

各スライドは単独で見ても意味が伝わるように、タイトル・要点・図解・余白のバランスを整えてください。

【ビジュアルスタイルの指示】
${selectedStyle.promptBlock}

【用途別の作成方針】
${purposeGuidelines}

【追加オプション】
${extras}

【共通デザインルール】
- 全スライドは「同じ1人のデザイナーが連続して作った」ように、配色・書体・余白・装飾密度を統一する
- 1スライドにつき伝えるメッセージは1つに絞る
- 箇条書きは最大3項目まで
- 文字量よりも、パッと見て理解できることを優先する
- 画面の上下左右に十分な安全余白を取る
- 余白率は30%以上を目安にする
- 見出しは大きく、本文は短く、補足は控えめにする
- 医療・介護資料として清潔感と信頼感のある見た目にする
- 対象者に合わせて専門用語の量を調整する
- 必要に応じて、図解、表、チェックリスト、OK/NG比較、手順図を使用する
- ページ番号は入れない

【避けること】
- 文字を詰め込みすぎること
- 1枚のスライドに複数テーマを入れること
- すべてのスライドを同じ構図にすること
- 横並びの角丸カードだけを多用するAIテンプレ風デザイン
- スライド全体を画像として作ること
- PowerPoint上で編集できない要素だけで構成すること

【スライド種別ごとのレイアウト】

■ 表紙
- 左側にメインタイトル、サブタイトル、対象者、必要に応じて日付や作成者
- 右側にテーマを象徴するシンプルな図解またはイラスト領域
- これから始まる資料の入口として、内容が一目で分かる構成にする

■ イントロ
- 上部に主役見出しとリード文
- 下部に、この資料で伝える流れを3〜5項目で整理
- 目次のように分かりやすく、ただし文字を詰め込みすぎない

■ 本編
- 上部に大きな見出しと短い説明
- 下部に図解、表、チェックリスト、比較、手順図などを配置
- スライドごとに内容に合った見せ方を変え、同じ構図の繰り返しを避ける

■ まとめ／次行動
- 左側にここまでの振り返りメッセージ
- 右側に次に行うこと、確認すること、注意することを3項目以内で整理
- 読み手が「次に何をすればよいか」分かる形で締める

【スライド構成】
指定された枚数に合わせて、以下の流れで構成してください。

1枚目：表紙
2枚目：イントロ
3枚目以降：本編
最終枚：まとめ／次行動

各スライドには以下を含めてください。
- スライドタイトル
- スライド本文
- レイアウト
- 使用する図形・表・アイコン・図解の内容
- デザイン上の注意点

最後に、PowerPointファイル（.pptx）として出力してください。`;
}
