"use client";

import { SLIDE_KINDS, type SlideConfig, type SlideKind } from "./constants";

interface SlideConfigEditorProps {
  slides: SlideConfig[];
  onChange: (index: number, patch: Partial<SlideConfig>) => void;
}

const messagePlaceholders = [
  "なぜ転倒予防が必要なのかを伝える",
  "転倒の主な原因を整理する",
  "介助時のNG例をわかりやすく示す",
  "家族が見守るときのポイントを伝える",
  "最後に明日からできることをまとめる",
];

export function SlideConfigEditor({ slides, onChange }: SlideConfigEditorProps) {
  return (
    <div className="space-y-3">
      {slides.map((slide, index) => (
        <div
          key={index}
          className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
        >
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black text-sky-600">
                スライド {index + 1}
              </p>
              <p className="text-sm font-bold text-slate-900">
                {slide.title || "タイトル未入力"}
              </p>
            </div>
            <select
              value={slide.kind}
              onChange={(event) =>
                onChange(index, { kind: event.target.value as SlideKind })
              }
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
            >
              {SLIDE_KINDS.map((kind) => (
                <option key={kind} value={kind}>
                  {kind}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-600">
                スライドタイトル
              </label>
              <input
                value={slide.title}
                onChange={(event) => onChange(index, { title: event.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
                placeholder="例：転倒の主な原因"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-600">
                このページで伝えたいこと
              </label>
              <textarea
                value={slide.message}
                onChange={(event) => onChange(index, { message: event.target.value })}
                rows={3}
                className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium leading-relaxed text-slate-800 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
                placeholder={messagePlaceholders[index % messagePlaceholders.length]}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-600">
                補足したい内容
              </label>
              <input
                value={slide.note}
                onChange={(event) => onChange(index, { note: event.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
                placeholder="例：夜間トイレの場面を入れる"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
