"use client";

import type { CSSProperties } from "react";
import type { SlideDesign } from "./slideDesigns";

interface DesignCardProps {
  design: SlideDesign;
  selected: boolean;
  onSelect: () => void;
}

function MiniSlide({ design }: { design: SlideDesign }) {
  const p = design.palette;
  const darkPreview = p.bg === "#0f172a";
  const previewStyle: CSSProperties = {
    backgroundColor: p.bg,
    color: p.ink,
    borderColor: p.border,
  };
  const surfaceStyle: CSSProperties = { backgroundColor: p.surface };
  const accentStyle: CSSProperties = { backgroundColor: p.accent };
  const accent2Style: CSSProperties = { backgroundColor: p.accent2 };
  const lineStyle: CSSProperties = {
    backgroundColor: darkPreview ? "rgba(248,250,252,0.78)" : p.ink,
  };
  const mutedLineStyle: CSSProperties = {
    backgroundColor: darkPreview ? "rgba(148,163,184,0.55)" : p.border,
  };

  return (
    <div
      className="relative aspect-[16/10] overflow-hidden rounded-2xl border shadow-inner"
      style={previewStyle}
    >
      {design.layout === "topBand" ? (
        <div className="absolute inset-x-0 top-0 h-8" style={accentStyle} />
      ) : null}
      {design.layout === "split" ? (
        <div className="absolute inset-y-0 right-0 w-[42%]" style={surfaceStyle} />
      ) : null}
      {design.layout === "framed" ? (
        <div
          className="absolute inset-3 rounded-xl border-2"
          style={{ borderColor: p.accent }}
        />
      ) : null}
      {design.layout === "centered" ? (
        <div className="absolute inset-x-10 top-8 h-1 rounded-full" style={accentStyle} />
      ) : (
        <div className="absolute left-5 top-7 h-10 w-1.5 rounded-full" style={accentStyle} />
      )}

      <div
        className={`absolute ${
          design.layout === "centered"
            ? "inset-x-8 top-12 text-center"
            : "left-9 right-24 top-8"
        }`}
      >
        <div
          className={`mb-3 h-2 rounded-full ${
            design.layout === "centered" ? "mx-auto w-16" : "w-14"
          }`}
          style={accent2Style}
        />
        <div
          className={`h-3 rounded-full ${
            design.layout === "centered" ? "mx-auto w-28" : "w-32"
          }`}
          style={lineStyle}
        />
        <div
          className={`mt-2 h-2 rounded-full ${
            design.layout === "centered" ? "mx-auto w-36" : "w-28"
          }`}
          style={mutedLineStyle}
        />
      </div>

      <div
        className={`absolute ${
          design.layout === "centered"
            ? "bottom-6 left-1/2 flex -translate-x-1/2 gap-2"
            : "bottom-5 right-5 grid grid-cols-2 gap-2"
        }`}
      >
        <div className="h-9 w-9 rounded-xl" style={surfaceStyle} />
        <div className="h-9 w-9 rounded-xl" style={accentStyle} />
        <div className="h-9 w-9 rounded-xl" style={accent2Style} />
        {design.layout !== "centered" ? (
          <div
            className="h-9 w-9 rounded-xl border"
            style={{ backgroundColor: p.bg, borderColor: p.border }}
          />
        ) : null}
      </div>
    </div>
  );
}

export function DesignCard({ design, selected, onSelect }: DesignCardProps) {
  const p = design.palette;

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={`group w-full rounded-3xl border bg-white p-3 text-left transition-all duration-200 ${
        selected
          ? "border-sky-600 shadow-lg shadow-sky-500/10 ring-2 ring-sky-100"
          : "border-slate-200 hover:border-slate-300 hover:shadow-md hover:shadow-slate-200/70"
      }`}
    >
      <MiniSlide design={design} />

      <div className="px-1 pb-1 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h4 className="text-sm font-black leading-snug text-slate-950">
              {design.name}
            </h4>
            <p className="mt-1.5 text-xs font-medium leading-relaxed text-slate-500">
              {design.description}
            </p>
          </div>
          <span
            className={`mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border ${
              selected
                ? "border-sky-600 bg-sky-600 text-white"
                : "border-slate-200 bg-slate-50 text-transparent group-hover:text-slate-300"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              className="h-3.5 w-3.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            {[p.accent, p.accent2, p.surface, p.ink].map((color) => (
              <span
                key={color}
                className="h-4 w-4 rounded-full border border-white shadow-sm ring-1 ring-slate-200"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <div className="flex flex-wrap justify-end gap-1.5">
            {design.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className={`rounded-full px-2 py-1 text-[10px] font-black ${
                  selected ? "bg-sky-50 text-sky-700" : "bg-slate-100 text-slate-500"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}
