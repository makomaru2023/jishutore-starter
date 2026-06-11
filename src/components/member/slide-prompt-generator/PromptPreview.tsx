"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { PromptOutput } from "./buildPrompt";

interface PromptPreviewProps {
  output: PromptOutput;
  onReset: () => void;
}

export function PromptPreview({ output, onReset }: PromptPreviewProps) {
  const [copied, setCopied] = useState(false);
  const [advancedTo, setAdvancedTo] = useState<number | null>(null);
  const [mode, setMode] = useState<"all" | "single">("all");
  const [slideIndex, setSlideIndex] = useState(0);

  // 枚数が変わって slideIndex が範囲外になったら 0 にリセット
  useEffect(() => {
    if (slideIndex >= output.slidePrompts.length) {
      setSlideIndex(0);
    }
  }, [output.slidePrompts.length, slideIndex]);

  const currentPrompt = useMemo(() => {
    if (mode === "all") return output.allPrompt;
    return output.slidePrompts[slideIndex] ?? output.slidePrompts[0] ?? "";
  }, [mode, output.allPrompt, output.slidePrompts, slideIndex]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(currentPrompt);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = currentPrompt;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);

    // 個別プロンプトでコピー成功時、2秒後に次のスライドへ自動進行（最終スライドでは進めない）
    let nextIndex: number | null = null;
    if (mode === "single" && slideIndex < output.slidePrompts.length - 1) {
      nextIndex = slideIndex + 1;
      setAdvancedTo(nextIndex + 1); // 表示は1始まり
      setTimeout(() => {
        setSlideIndex((current) => (current === slideIndex ? slideIndex + 1 : current));
      }, 2000);
    } else {
      setAdvancedTo(null);
    }

    setTimeout(() => {
      setCopied(false);
      setAdvancedTo(null);
    }, 2400);
  }, [currentPrompt, mode, slideIndex, output.slidePrompts.length]);

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
      <div className="border-b border-slate-200 bg-slate-950 px-5 py-4 text-white sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-sky-300">
              Image Prompt Output
            </p>
            <h2 className="mt-1 text-lg font-black">生成プロンプト</h2>
          </div>
          <button
            type="button"
            onClick={onReset}
            className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-bold text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
          >
            初期化
          </button>
        </div>
      </div>

      <div className="space-y-4 p-5 sm:p-6">
        {(output.missingRequired || output.missingSlideMessages) && (
          <div className="space-y-2 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-bold leading-relaxed text-amber-800">
            {output.missingRequired && (
              <p>使用用途・スライド枚数・テーマを入力してください。</p>
            )}
            {output.missingSlideMessages && (
              <p>各スライドの「伝えたいこと」を入力してください。</p>
            )}
          </div>
        )}

        {/* 使い方3ステップ（常時表示・モード切替の上） */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <p className="mb-1.5 text-[11px] font-black tracking-wider text-slate-500">
            使い方
          </p>
          <ol className="space-y-1 text-xs leading-relaxed text-slate-600">
            <li>
              <span className="font-bold text-slate-700">①</span> 「全体プロンプト」をChatGPTに貼る（画像はまだ作られません）
            </li>
            <li>
              <span className="font-bold text-slate-700">②</span> 「個別プロンプト」の1枚目を貼って生成
            </li>
            <li>
              <span className="font-bold text-slate-700">③</span> 2枚目からは、前のスライド画像を添付してから貼る
            </li>
          </ol>
        </div>

        <div className="grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => setMode("all")}
            className={`rounded-xl px-3 py-2 text-sm font-black transition-colors ${
              mode === "all" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500"
            }`}
          >
            全体プロンプト
          </button>
          <button
            type="button"
            onClick={() => setMode("single")}
            className={`rounded-xl px-3 py-2 text-sm font-black transition-colors ${
              mode === "single" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500"
            }`}
          >
            個別プロンプト
          </button>
        </div>

        {mode === "single" && output.slidePrompts.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {output.slidePrompts.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSlideIndex(index)}
                className={`rounded-full px-3 py-1.5 text-xs font-black ${
                  slideIndex === index
                    ? "bg-sky-600 text-white"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                {index + 1}枚目
              </button>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={handleCopy}
          className={`flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-base font-black transition-all ${
            copied
              ? "bg-emerald-50 text-emerald-700 ring-2 ring-emerald-200"
              : "bg-sky-600 text-white shadow-md shadow-sky-600/25 hover:bg-sky-700"
          }`}
        >
          {copied
            ? advancedTo
              ? `コピーしました → 次は${advancedTo}枚目`
              : "コピーしました"
            : "プロンプトをコピー"}
        </button>

        <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-100 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-sky-300" />
            <span className="ml-2 font-mono text-[11px] font-bold text-slate-400">
              ChatGPT用スライド画像プロンプト
            </span>
          </div>
          <pre className="max-h-[62vh] overflow-auto whitespace-pre-wrap break-words bg-slate-950 p-4 font-mono text-[13px] leading-relaxed text-slate-100">
            {currentPrompt}
          </pre>
        </div>
      </div>
    </div>
  );
}
