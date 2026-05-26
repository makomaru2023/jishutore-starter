"use client";

import { useCallback, useMemo, useState } from "react";
import { OptionCard } from "./OptionCard";
import { PromptPreview } from "./PromptPreview";
import { DesignCard } from "./DesignCard";
import { buildSlidePrompt } from "./buildSlidePrompt";
import {
  AUDIENCES,
  EXTRA_OPTIONS,
  GOALS,
  PRESETS,
  PURPOSES,
  SLIDE_COUNTS,
  TONES,
  type Audience,
  type ExtraOption,
  type Goal,
  type Preset,
  type Purpose,
  type SlideCount,
  type Tone,
} from "./constants";
import {
  defaultVisualStyleId,
  getVisualStylePreset,
  visualStylePresets,
  type VisualStyleId,
} from "./visualStylePresets";

function Section({
  step,
  title,
  required,
  description,
  children,
}: {
  step: number;
  title: string;
  required?: boolean;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60 sm:p-6">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-950 text-xs font-black text-white">
            {step}
          </span>
          <div>
            <h3 className="flex flex-wrap items-center gap-2 text-base font-black text-slate-900">
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
            {description ? (
              <p className="mt-1 text-xs font-medium leading-relaxed text-slate-500">
                {description}
              </p>
            ) : null}
          </div>
        </div>
      </div>
      {children}
    </section>
  );
}

function ProgressPill({
  label,
  done,
}: {
  label: string;
  done: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${
        done
          ? "border-sky-200 bg-sky-50 text-sky-700"
          : "border-slate-200 bg-white text-slate-400"
      }`}
    >
      <span
        className={`h-2 w-2 rounded-full ${done ? "bg-sky-500" : "bg-slate-300"}`}
      />
      {label}
    </span>
  );
}

export function SlidePromptGenerator() {
  const [purpose, setPurpose] = useState<Purpose | null>(null);
  const [slideCount, setSlideCount] = useState<SlideCount | null>(null);
  const [theme, setTheme] = useState("");
  const [audience, setAudience] = useState<Audience | null>(null);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [tone, setTone] = useState<Tone | null>(null);
  const [selectedVisualStyleId, setSelectedVisualStyleId] =
    useState<VisualStyleId>(defaultVisualStyleId);
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
    setTone(preset.tone);
    setSelectedVisualStyleId(preset.visualStyleId);
  }, []);

  const handleReset = useCallback(() => {
    setPurpose(null);
    setSlideCount(null);
    setTheme("");
    setAudience(null);
    setGoal(null);
    setTone(null);
    setSelectedVisualStyleId(defaultVisualStyleId);
    setExtras([]);
  }, []);

  const selectedVisualStyle = useMemo(
    () => getVisualStylePreset(selectedVisualStyleId),
    [selectedVisualStyleId]
  );

  const prompt = useMemo(() => {
    return buildSlidePrompt({
      purpose,
      slideCount,
      theme,
      audience,
      goal,
      tone,
      visualStyleId: selectedVisualStyleId,
      extras,
    });
  }, [purpose, slideCount, theme, audience, goal, tone, selectedVisualStyleId, extras]);

  const completedRequiredCount = [
    Boolean(purpose),
    Boolean(slideCount),
    Boolean(theme.trim()),
  ].filter(Boolean).length;

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-600">
              Quick Start
            </p>
            <h3 className="mt-1 text-lg font-black text-slate-900">
              プリセットから始める
            </h3>
            <p className="mt-1 text-sm font-medium leading-relaxed text-slate-500">
              よくある資料の型を読み込んで、テーマだけ微調整できます。
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <ProgressPill label="用途" done={Boolean(purpose)} />
            <ProgressPill label="枚数" done={Boolean(slideCount)} />
            <ProgressPill label="テーマ" done={Boolean(theme.trim())} />
          </div>
        </div>

        <div className="mt-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => applyPreset(preset)}
              className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left transition-colors hover:border-sky-300 hover:bg-sky-50"
            >
              <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white text-sky-600 ring-1 ring-slate-200 group-hover:ring-sky-200">
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path d="M10 1.5 12.5 7l5.5.5-4.2 3.7 1.3 5.4L10 13.8 4.9 16.6l1.3-5.4L2 7.5 7.5 7 10 1.5Z" />
            </svg>
              </span>
              <span className="block text-sm font-black leading-snug text-slate-900">
                {preset.label}
              </span>
              <span className="mt-2 block text-xs font-medium leading-relaxed text-slate-500">
                {preset.slideCount} / {preset.audience}
              </span>
            </button>
          ))}
        </div>
      </section>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(380px,0.95fr)]">
        <div className="space-y-6">
          <Section
            step={1}
            title="使用用途"
            required
            description="誰に、どの場面で使う資料かを選びます。"
          >
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

          <Section
            step={3}
            title="テーマ"
            required
            description="その資料で一番伝えたいことを、普段の言葉で入れてください。"
          >
            <textarea
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              rows={4}
              placeholder="例：転倒予防について、介護職が明日から注意できるポイントを伝えたい"
              className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium leading-relaxed text-slate-800 placeholder:text-slate-400 transition-all focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-100"
            />
          </Section>

          <Section step={4} title="対象者" description="任意ですが、入れると表現の粒度が安定します。">
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

          <Section step={6} title="トーン">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {TONES.map((t) => (
                <OptionCard
                  key={t}
                  label={t}
                  selected={tone === t}
                  onClick={() => setTone(tone === t ? null : t)}
                />
              ))}
            </div>
          </Section>

          <Section
            step={7}
            title="ビジュアルスタイル"
            required
            description="選んだスタイルは、右側の生成プロンプト本文にそのまま反映されます。"
          >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {visualStylePresets.map((style) => (
                <DesignCard
                  key={style.id}
                  style={style}
                  selected={selectedVisualStyleId === style.id}
                  onSelect={() => setSelectedVisualStyleId(style.id)}
                />
              ))}
            </div>
          </Section>

          <Section step={8} title="追加オプション">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {EXTRA_OPTIONS.map((o) => (
                <OptionCard
                  key={o}
                  label={o}
                  multi
                  compact
                  selected={extras.includes(o)}
                  onClick={() => toggleExtra(o)}
                />
              ))}
            </div>
          </Section>
        </div>

        <div className="lg:sticky lg:top-24">
          <PromptPreview
            prompt={prompt}
            onReset={handleReset}
            completedCount={completedRequiredCount}
            visualStyle={selectedVisualStyle}
          />
        </div>
      </div>
    </div>
  );
}
