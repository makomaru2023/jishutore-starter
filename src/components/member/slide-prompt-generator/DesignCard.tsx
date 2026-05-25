"use client";

import { useEffect, useRef, useState } from "react";
import { SlideThumbnail } from "./SlideThumbnail";
import type { SlideDesign } from "./slideDesigns";

interface DesignCardProps {
  design: SlideDesign;
  selected: boolean;
  onSelect: () => void;
}

export function DesignCard({ design, selected, onSelect }: DesignCardProps) {
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = design.slides.length;

  useEffect(() => {
    if (hovering && total > 1) {
      timer.current = setInterval(() => {
        setIndex((i) => (i + 1) % total);
      }, 900);
    }
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [hovering, total]);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className={`group relative cursor-pointer overflow-hidden rounded-3xl border bg-white text-left transition-all duration-200 ${
        selected
          ? "border-sky-600 shadow-md shadow-sky-500/15 ring-2 ring-sky-100"
          : "border-slate-200 hover:border-sky-300 hover:shadow-md hover:shadow-slate-200/70"
      }`}
    >
      {/* スライド見本 */}
      <div
        className="relative border-b border-slate-100"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => {
          setHovering(false);
          setIndex(0);
        }}
      >
        <div className="aspect-video w-full">
          <SlideThumbnail design={design} slide={design.slides[index]} />
        </div>

        {/* フッター（ドット＋カウンタ） */}
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-slate-200/70 bg-white/90 px-3 py-1.5 backdrop-blur-sm">
          <div className="flex items-center gap-1.5">
            {design.slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`見本 ${i + 1} を表示`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex(i);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-4 bg-sky-600" : "w-1.5 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
          <span className="font-mono text-[10px] font-bold text-slate-400">
            {index + 1}/{total}
          </span>
        </div>

        {selected && (
          <span className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-sky-600 text-white shadow-sm">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className="h-3.5 w-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </span>
        )}
      </div>

      {/* メタ情報 */}
      <div className="p-4">
        <h4 className="text-sm font-black text-slate-900">{design.name}</h4>
        <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{design.description}</p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {design.tags.map((t) => (
            <span
              key={t}
              className={`rounded-md px-2 py-0.5 text-[11px] font-bold ${
                selected ? "bg-sky-50 text-sky-700" : "bg-slate-100 text-slate-500"
              }`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
