"use client";

import { useCallback, useState } from "react";

interface PromptPreviewProps {
  prompt: string | null;
  onReset: () => void;
  completedCount: number;
}

export function PromptPreview({ prompt, onReset, completedCount }: PromptPreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    if (!prompt) return;
    try {
      await navigator.clipboard.writeText(prompt);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = prompt;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [prompt]);

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
      <div className="border-b border-slate-200 bg-slate-950 px-5 py-4 text-white sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-sky-300">
              Prompt Output
            </p>
            <h2 className="mt-1 flex items-center gap-2.5 text-lg font-black">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-sky-500 text-white shadow-sm shadow-sky-500/30">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              </span>
              生成プロンプト
            </h2>
          </div>
          <button
            type="button"
            onClick={onReset}
            className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-bold text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
          >
            初期化
          </button>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-2xl bg-white/10 px-2 py-2">
            <p className="text-[10px] font-bold text-slate-300">必須入力</p>
            <p className="mt-0.5 text-sm font-black">{completedCount}/3</p>
          </div>
          <div className="rounded-2xl bg-white/10 px-2 py-2">
            <p className="text-[10px] font-bold text-slate-300">状態</p>
            <p className="mt-0.5 text-sm font-black">{prompt ? "完成" : "準備中"}</p>
          </div>
          <div className="rounded-2xl bg-white/10 px-2 py-2">
            <p className="text-[10px] font-bold text-slate-300">出力先</p>
            <p className="mt-0.5 text-sm font-black">ChatGPT</p>
          </div>
        </div>
      </div>
      <div className="p-5 sm:p-6">

        {!prompt && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <p className="flex items-start gap-2 text-sm font-bold leading-relaxed text-amber-800">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="mt-0.5 h-5 w-5 flex-shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m0 3.75h.008M10.34 3.94 1.91 18a1.5 1.5 0 0 0 1.3 2.25h17.58a1.5 1.5 0 0 0 1.3-2.25L13.66 3.94a1.5 1.5 0 0 0-2.6 0Z"
                />
              </svg>
              使用用途・スライド枚数・テーマを入力してください。
            </p>
          </div>
        )}

        {prompt && (
          <div className="space-y-4">
            <button
              type="button"
              onClick={handleCopy}
              className={`flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-base font-black transition-all ${
                copied
                  ? "bg-emerald-50 text-emerald-700 ring-2 ring-emerald-200"
                  : "bg-sky-600 text-white shadow-md shadow-sky-600/25 hover:bg-sky-700 hover:shadow-lg hover:shadow-sky-600/30"
              }`}
            >
              {copied ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                </svg>
              )}
              {copied ? "コピーしました" : "プロンプトをコピー"}
            </button>

            <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-100 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-sky-300" />
                <span className="ml-2 font-mono text-[11px] font-bold text-slate-400">
                  ChatGPT用プロンプト
                </span>
              </div>
              <pre className="max-h-[60vh] overflow-auto whitespace-pre-wrap break-words bg-slate-950 p-4 font-mono text-[13px] leading-relaxed text-slate-100">
                {prompt}
              </pre>
            </div>

            <p className="text-center text-xs font-medium text-slate-400">
              コピーしてChatGPTにそのまま貼り付けてください。
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
