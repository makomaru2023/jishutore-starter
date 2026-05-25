"use client";

import { useCallback, useMemo, useState } from "react";
import { OptionCard } from "./OptionCard";
import { PromptPreview } from "./PromptPreview";
import { DesignCard } from "./DesignCard";
import { buildPrompt } from "./buildPrompt";
import {
  AUDIENCES,
  EXTRA_OPTIONS,
  GOALS,
  PRESETS,
  PURPOSES,
  SLIDE_COUNTS,
  type Audience,
  type ExtraOption,
  type Goal,
  type Preset,
  type Purpose,
  type SlideCount,
} from "./constants";
import {
  SLIDE_DESIGNS,
  buildDesignDescriptor,
  getDesignById,
} from "./slideDesigns";

function Section({
  step,
  title,
  required,
  children,
}: {
  step: number;
  title: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/50 ring-1 ring-slate-100 transition-shadow hover:shadow-md hover:shadow-slate-200/60 sm:p-6">
      <h3 className="mb-4 flex items-center gap-2.5 text-base font-black text-slate-900">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-xs font-black text-white shadow-sm shadow-blue-500/30">
          {step}
        </span>
        {title}
        {required ? (
          <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[11px] font-bold text-rose-500">
            必須
          </span>
        ) : (
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-400">
            任意
          </span>
        )}
      </h3>
      {children}
    </section>
  );
}

export function SlidePromptGenerator() {
  const [purpose, setPurpose] = useState<Purpose | null>(null);
  const [slideCount, setSlideCount] = useState<SlideCount | null>(null);
  const [theme, setTheme] = useState("");
  const [audience, setAudience] = useState<Audience | null>(null);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [designId, setDesignId] = useState<string | null>(null);
  const [extras, setExtras] = useState<ExtraOption[]>([]);

  const toggleExtra = useCallback((value: ExtraOption) => {
    setExtras((prev) =>
      prev.includes(value) ? prev.filter((e) => e !== value) : [...prev, value]
    );
  }, []);

  const applyPreset = useCallback((preset: Preset) => {
    setPurpose(preset.purpose);
    setSlideCount(preset.slideCount);
    setTheme(preset.theme);
    setAudience(preset.audience);
    setGoal(preset.goal);
    setDesignId(preset.designId);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const handleReset = useCallback(() => {
    setPurpose(null);
    setSlideCount(null);
    setTheme("");
    setAudience(null);
    setGoal(null);
    setDesignId(null);
    setExtras([]);
  }, []);

  const prompt = useMemo(() => {
    const d = designId ? getDesignById(designId) : undefined;
    const design = d ? buildDesignDescriptor(d) : null;
    return buildPrompt({ purpose, slideCount, theme, audience, goal, design, extras });
  }, [purpose, slideCount, theme, audience, goal, designId, extras]);

  return (
    <div className="space-y-6">
      {/* プリセット */}
      <section className="rounded-3xl border border-blue-100 bg-gradient-to-br from-white to-blue-50/50 p-5 shadow-sm shadow-blue-100/50 sm:p-6">
        <h3 className="mb-1 flex items-center gap-2 text-base font-black text-slate-900">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-sky-500 text-white shadow-sm shadow-blue-500/30">
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path d="M10 1.5 12.5 7l5.5.5-4.2 3.7 1.3 5.4L10 13.8 4.9 16.6l1.3-5.4L2 7.5 7.5 7 10 1.5Z" />
            </svg>
          </span>
          プリセットから始める
        </h3>
        <p className="mb-4 text-xs font-medium text-slate-500">
          よくある資料の型をワンタップで読み込めます。読み込んだ後に自由に調整できます。
        </p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => applyPreset(preset)}
              className="rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-sm font-bold text-blue-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-sky-500 hover:text-white hover:shadow-md hover:shadow-blue-500/25"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </section>

      <div className="grid items-start gap-6 lg:grid-cols-2">
        {/* 左：入力フォーム */}
        <div className="space-y-6">
          <Section step={1} title="使用用途" required>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {PURPOSES.map((p) => (
                <OptionCard
                  key={p}
                  label={p}
                  selected={purpose === p}
                  onClick={() => setPurpose(purpose === p ? null : p)}
                />
              ))}
            </div>
          </Section>

          <Section step={2} title="スライド枚数" required>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {SLIDE_COUNTS.map((c) => (
                <OptionCard
                  key={c}
                  label={c}
                  selected={slideCount === c}
                  onClick={() => setSlideCount(slideCount === c ? null : c)}
                />
              ))}
            </div>
          </Section>

          <Section step={3} title="テーマ" required>
            <textarea
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              rows={3}
              placeholder="例：転倒予防について、介護職が明日から注意できるポイントを伝えたい"
              className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-medium text-slate-800 placeholder:text-slate-400 transition-all focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </Section>

          <Section step={4} title="対象者">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {AUDIENCES.map((a) => (
                <OptionCard
                  key={a}
                  label={a}
                  selected={audience === a}
                  onClick={() => setAudience(audience === a ? null : a)}
                />
              ))}
            </div>
          </Section>

          <Section step={5} title="資料のゴール">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {GOALS.map((g) => (
                <OptionCard
                  key={g}
                  label={g}
                  selected={goal === g}
                  onClick={() => setGoal(goal === g ? null : g)}
                />
              ))}
            </div>
          </Section>

          <Section step={6} title="ビジュアルスタイル">
            <p className="-mt-2 mb-3 text-xs font-medium text-slate-500">
              カードにカーソルを合わせるとスライド見本が切り替わります。選ぶとプロンプトに反映されます。
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {SLIDE_DESIGNS.map((d) => (
                <DesignCard
                  key={d.id}
                  design={d}
                  selected={designId === d.id}
                  onSelect={() => setDesignId(designId === d.id ? null : d.id)}
                />
              ))}
            </div>
          </Section>

          <Section step={7} title="追加オプション">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {EXTRA_OPTIONS.map((o) => (
                <OptionCard
                  key={o}
                  label={o}
                  multi
                  selected={extras.includes(o)}
                  onClick={() => toggleExtra(o)}
                />
              ))}
            </div>
          </Section>
        </div>

        {/* 右：生成プロンプト（PCではsticky） */}
        <div className="lg:sticky lg:top-24">
          <PromptPreview prompt={prompt} onReset={handleReset} />
        </div>
      </div>
    </div>
  );
}
