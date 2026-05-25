"use client";

import { SlideThumbnail } from "./SlideThumbnail";
import type { SlideDesign } from "./slideDesigns";

interface DesignCardProps {
  design: SlideDesign;
  selected: boolean;
  onSelect: () => void;
}

export function DesignCard({ design, selected, onSelect }: DesignCardProps) {
  const coverSlide = design.slides[0];
  const p = design.palette;

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={`group w-full overflow-hidden rounded-2xl border bg-white text-left transition-all duration-200 ${
        selected
          ? "border-slate-950 shadow-lg shadow-slate-300/60 ring-2 ring-slate-900"
          : "border-slate-200 hover:border-slate-400 hover:shadow-md hover:shadow-slate-200/80"
      }`}
    >
      <div className="relative border-b border-slate-200 bg-slate-50 p-3">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <SlideThumbnail design={design} slide={coverSlide} />
        </div>

        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-slate-900/35 px-2 py-1 backdrop-blur-sm">
          {design.slides.map((_, index) => (
            <span
              key={index}
              className={`h-1.5 rounded-full bg-white ${
                index === 0 ? "w-4 opacity-95" : "w-1.5 opacity-60"
              }`}
            />
          ))}
        </div>

        {selected ? (
          <span className="absolute right-5 top-5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-white shadow-md">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              className="h-4 w-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </span>
        ) : null}
      </div>

      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h4 className="text-lg font-black leading-snug tracking-tight text-slate-950">
              {design.name}
            </h4>
            <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">
              {design.description}
            </p>
          </div>
          <div className="flex flex-shrink-0 items-center gap-1 pt-1">
            {[p.accent, p.accent2, p.surface].map((color) => (
              <span
                key={color}
                className="h-3.5 w-3.5 rounded-full border border-white shadow-sm ring-1 ring-slate-200"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {design.tags.map((tag) => (
            <span
              key={tag}
              className={`rounded-md px-2.5 py-1 text-xs font-bold ${
                selected ? "bg-sky-50 text-sky-700" : "bg-slate-100 text-slate-500"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}
