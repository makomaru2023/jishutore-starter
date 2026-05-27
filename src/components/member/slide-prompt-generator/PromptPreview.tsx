"use client";

import { useCallback, useMemo, useState } from "react";
import type { PromptOutput } from "./buildPrompt";

interface PromptPreviewProps {
  output: PromptOutput;
  onReset: () => void;
}

export function PromptPreview({ output, onReset }: PromptPreviewProps) {
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<"all" | "single">("all");
  const [slideIndex, setSlideIndex] = useState(0);

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
    setTimeout(() => setCopied(false), 2000);
  }, [currentPrompt]);

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
          {copied ? "コピーしました" : "プロンプトをコピー"}
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
