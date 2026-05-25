"use client";

interface OptionCardProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  /** チェックボックス型（複数選択）の見た目にする */
  multi?: boolean;
}

export function OptionCard({ label, selected, onClick, multi = false }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`group flex items-center gap-2.5 rounded-2xl border px-4 py-3 text-left text-sm font-bold transition-all duration-200 ${
        selected
          ? "border-blue-500/70 bg-gradient-to-br from-blue-50 to-sky-50 text-blue-700 shadow-md shadow-blue-500/10 ring-2 ring-blue-200/50"
          : "border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md hover:shadow-slate-200/60"
      }`}
    >
      <span
        className={`flex h-5 w-5 flex-shrink-0 items-center justify-center border transition-all duration-200 ${
          multi ? "rounded-md" : "rounded-full"
        } ${
          selected
            ? "border-blue-500 bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-sm shadow-blue-500/30"
            : "border-slate-300 bg-white text-transparent group-hover:border-blue-300"
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
