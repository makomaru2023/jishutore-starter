"use client";

interface OptionCardProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  /** チェックボックス型（複数選択）の見た目にする */
  multi?: boolean;
  compact?: boolean;
}

export function OptionCard({
  label,
  selected,
  onClick,
  multi = false,
  compact = false,
}: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`group flex min-h-11 items-center gap-2.5 rounded-2xl border text-left text-sm font-bold transition-all duration-200 ${
        compact ? "px-3 py-2.5" : "px-4 py-3"
      } ${
        selected
          ? "border-sky-500 bg-sky-50 text-sky-800 shadow-sm ring-2 ring-sky-100"
          : "border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:bg-slate-50"
      }`}
    >
      <span
        className={`flex h-5 w-5 flex-shrink-0 items-center justify-center border transition-all duration-200 ${
          multi ? "rounded-md" : "rounded-full"
        } ${
          selected
            ? "border-sky-600 bg-sky-600 text-white"
            : "border-slate-300 bg-white text-transparent group-hover:border-sky-400"
        }`}
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
          <path
            fillRule="evenodd"
            d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.2 7.3a1 1 0 0 1-1.42.005l-3.6-3.6a1 1 0 1 1 1.414-1.414l2.89 2.89 6.49-6.59a1 1 0 0 1 1.414-.005Z"
            clipRule="evenodd"
          />
        </svg>
      </span>
      <span className="leading-snug">{label}</span>
    </button>
  );
}
