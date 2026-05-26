"use client";

import type { CSSProperties } from "react";
import type { VisualStyleId, VisualStylePreset } from "./visualStylePresets";

interface DesignCardProps {
  style: VisualStylePreset;
  selected: boolean;
  onSelect: () => void;
}

const styleVisuals: Record<
  VisualStyleId,
  { accent: string; accent2: string; bg: string; ink: string; surface: string; motif: "clean" | "family" | "training" | "diagram" | "compare" | "case" }
> = {
  "medical-clean": {
    accent: "#2563eb",
    accent2: "#7dd3fc",
    bg: "#ffffff",
    ink: "#0f172a",
    surface: "#eff6ff",
    motif: "clean",
  },
  "gentle-family": {
    accent: "#0ea5e9",
    accent2: "#f9a8d4",
    bg: "#f8fcff",
    ink: "#0f3a54",
    surface: "#e0f2fe",
    motif: "family",
  },
  "training-slate": {
    accent: "#334155",
    accent2: "#94a3b8",
    bg: "#ffffff",
    ink: "#111827",
    surface: "#f1f5f9",
    motif: "training",
  },
  "diagram-blue": {
    accent: "#1d4ed8",
    accent2: "#38bdf8",
    bg: "#ffffff",
    ink: "#0b1f3a",
    surface: "#eff6ff",
    motif: "diagram",
  },
  "ok-ng-compare": {
    accent: "#16a34a",
    accent2: "#ef4444",
    bg: "#ffffff",
    ink: "#111827",
    surface: "#f8fafc",
    motif: "compare",
  },
  "case-conference": {
    accent: "#1e3a8a",
    accent2: "#64748b",
    bg: "#ffffff",
    ink: "#0f172a",
    surface: "#eef2f7",
    motif: "case",
  },
};

function MockPreview({ style }: { style: VisualStylePreset }) {
  const visual = styleVisuals[style.id];
  const previewStyle: CSSProperties = {
    backgroundColor: visual.bg,
    color: visual.ink,
  };

  return (
    <div
      className="relative aspect-[16/9] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
      style={previewStyle}
    >
      <div className="absolute left-7 top-7">
        <div
          className="mb-3 h-1 w-9 rounded-full"
          style={{ backgroundColor: visual.accent }}
        />
        <div className="h-3 w-28 rounded-full" style={{ backgroundColor: visual.ink }} />
        <div className="mt-2 h-2 w-40 rounded-full bg-slate-200" />
        <div className="mt-1.5 h-2 w-32 rounded-full bg-slate-100" />
      </div>

      {visual.motif === "compare" ? (
        <div className="absolute bottom-7 left-7 right-7 grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-red-100 bg-red-50 p-3">
            <div className="mb-2 h-2 w-10 rounded-full bg-red-400" />
            <div className="h-2 w-full rounded-full bg-red-100" />
          </div>
          <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-3">
            <div className="mb-2 h-2 w-10 rounded-full bg-emerald-500" />
            <div className="h-2 w-full rounded-full bg-emerald-100" />
          </div>
        </div>
      ) : (
        <div className="absolute bottom-7 right-7 flex items-end gap-2">
          <div className="h-10 w-10 rounded-xl" style={{ backgroundColor: visual.surface }} />
          <div className="h-14 w-10 rounded-xl" style={{ backgroundColor: visual.accent2 }} />
          <div className="h-20 w-10 rounded-xl" style={{ backgroundColor: visual.accent }} />
        </div>
      )}

      {visual.motif === "diagram" ? (
        <div className="absolute bottom-9 left-8 flex items-center gap-2">
          <span className="h-6 w-6 rounded-full" style={{ backgroundColor: visual.accent }} />
          <span className="h-0.5 w-8 bg-slate-300" />
          <span className="h-6 w-6 rounded-full" style={{ backgroundColor: visual.accent2 }} />
          <span className="h-0.5 w-8 bg-slate-300" />
          <span className="h-6 w-6 rounded-full bg-slate-200" />
        </div>
      ) : null}

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-slate-900/30 px-2 py-1">
        <span className="h-1.5 w-4 rounded-full bg-white" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/65" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/65" />
      </div>
    </div>
  );
}

export function DesignCard({ style, selected, onSelect }: DesignCardProps) {
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
      <div className="border-b border-slate-200 bg-slate-50 p-3">
        <MockPreview style={style} />
      </div>

      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h4 className="text-lg font-black leading-snug tracking-tight text-slate-950">
              {style.name}
            </h4>
            <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">
              {style.summary}
            </p>
          </div>
          <span
            className={`mt-1 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border ${
              selected
                ? "border-slate-950 bg-slate-950 text-white"
                : "border-slate-200 bg-white text-transparent group-hover:text-slate-300"
            }`}
          >
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
        </div>

        <div className="flex flex-wrap gap-2">
          {style.tags.map((tag) => (
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
