"use client";

import { useCallback, useMemo, useState } from "react";
import { OptionCard } from "./OptionCard";
import { PromptPreview } from "./PromptPreview";
import { SlideConfigEditor } from "./SlideConfigEditor";
import { buildPrompt } from "./buildPrompt";
import {
  AUDIENCES,
  DESIGN_POLICIES,
  EXTRA_OPTIONS,
  GOALS,
  PRESETS,
  PURPOSES,
  SLIDE_COUNTS,
  slideCountToNumber,
  type Audience,
  type DesignPolicy,
  type ExtraOption,
  type Goal,
  type Preset,
  type Purpose,
  type SlideConfig,
  type SlideCount,
} from "./constants";

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
      <div className="mb-4 flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-950 text-xs font-black text-white">
          {step}
        </span>
        <div>
          <h3 className="flex flex-wrap items-center gap-2 text-base font-black text-slate-900">
            {title}
            <span
              className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                required ? "bg-rose-50 text-rose-500" : "bg-slate-100 text-slate-400"
              }`}
            >
              {required ? "必須" : "任意"}
            </span>
          </h3>
          {description && (
            <p className="mt-1 text-xs font-medium leading-relaxed text-slate-500">
              {description}
            </p>
          )}
        </div>
      </div>
      {children}
    </section>
  );
}

function createDefaultSlides(count: number): SlideConfig[] {
  return Array.from({ length: count }).map((_, index) => ({
    kind: index === 0 ? "表紙" : index === count - 1 ? "まとめ" : index === 1 ? "導入" : "本文",
    title: index === 0 ? "タイトル" : index === count - 1 ? "まとめ" : "",
    message: "",
    note: "",
  }));
}

function adjustSlides(slides: SlideConfig[], count: number): SlideConfig[] {
  const defaults = createDefaultSlides(count);
  return defaults.map((defaultSlide, index) => slides[index] ?? defaultSlide);
}

export function SlidePromptGenerator() {
  const [purpose, setPurpose] = useState<Purpose | null>(null);
  const [slideCount, setSlideCount] = useState<SlideCount | null>(null);
  const [theme, setTheme] = useState("");
  const [audience, setAudience] = useState<Audience | null>(null);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [designPolicy, setDesignPolicy] = useState<DesignPolicy | null>(null);
  const [extras, setExtras] = useState<ExtraOption[]>([]);
  const [slides, setSlides] = useState<SlideConfig[]>(createDefaultSlides(5));
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);

  const toggleExtra = useCallback((value: ExtraOption) => {
    setExtras((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  }, []);

  const handleSlideCount = useCallback(
    (value: SlideCount) => {
      setSlideCount(value);
      setSlides((prev) => adjustSlides(prev, slideCountToNumber(value)));
    },
    []
  );

  const applyPreset = useCallback((preset: Preset) => {
    setSelectedPresetId(preset.id);
    setPurpose(preset.purpose);
    setSlideCount(preset.slideCount);
    setTheme(preset.theme);
    setAudience(preset.audience);
    setGoal(preset.goal);
    setDesignPolicy(preset.designPolicy);
    setExtras([]);
    setSlides(preset.slides);
  }, []);

  const handleReset = useCallback(() => {
    setPurpose(null);
    setSlideCount(null);
    setTheme("");
    setAudience(null);
    setGoal(null);
    setDesignPolicy(null);
    setExtras([]);
    setSlides(createDefaultSlides(5));
    setSelectedPresetId(null);
  }, []);

  const updateSlide = useCallback((index: number, patch: Partial<SlideConfig>) => {
    setSlides((prev) =>
      prev.map((slide, slideIndex) =>
        slideIndex === index ? { ...slide, ...patch } : slide
      )
    );
  }, []);

  const output = useMemo(
    () =>
      buildPrompt({
        purpose,
        slideCount,
        theme,
        audience,
        goal,
        designPolicy,
        extras,
        slides,
      }),
    [purpose, slideCount, theme, audience, goal, designPolicy, extras, slides]
  );

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60 sm:p-6">
        <div className="mb-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-600">
            TEMPLATE
          </p>
          <h3 className="mt-1 text-lg font-black text-slate-900">
            テンプレートの選択
          </h3>
          <p className="mt-1 text-sm font-medium leading-relaxed text-slate-500">
            クリックすると、テーマや各スライドのたたき台をまとめて入力します。読み込んだあとに、下の項目は自由に変更できます。
          </p>
        </div>
        <div className="grid gap-2 sm:grid-cols-3">
          {PRESETS.map((preset) => {
            const selected = selectedPresetId === preset.id;
            return (
            <button
              key={preset.id}
              type="button"
              onClick={() => applyPreset(preset)}
              aria-pressed={selected}
              className={`rounded-2xl border p-4 text-left transition-all duration-200 ${
                selected
                  ? "border-sky-500 bg-sky-50 shadow-sm ring-2 ring-sky-100"
                  : "border-slate-200 bg-slate-50 hover:border-sky-300 hover:bg-sky-50"
              }`}
            >
              <span className="flex items-start justify-between gap-3">
                <span className="block text-sm font-black text-slate-900">
                  {preset.label}
                </span>
                <span
                  className={`mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border ${
                    selected
                      ? "border-sky-600 bg-sky-600 text-white"
                      : "border-slate-300 bg-white text-transparent"
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
              </span>
              <span className="mt-2 block text-xs font-medium leading-relaxed text-slate-500">
                {preset.summary}
              </span>
            </button>
            );
          })}
        </div>
      </section>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(380px,0.95fr)]">
        <div className="space-y-6">
          <Section
            step={1}
            title="使用用途"
            required
            description="誰に、どんな場面で見せる資料かを選びます。ここで選んだ内容に合わせて、プロンプト内の作成方針が切り替わります。"
          >
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {PURPOSES.map((item) => (
                <OptionCard
                  key={item}
                  label={item}
                  selected={purpose === item}
                  onClick={() => setPurpose(purpose === item ? null : item)}
                />
              ))}
            </div>
          </Section>

          <Section step={2} title="スライド枚数" required>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {SLIDE_COUNTS.map((item) => (
                <OptionCard
                  key={item}
                  label={item}
                  selected={slideCount === item}
                  onClick={() => handleSlideCount(item)}
                />
              ))}
            </div>
          </Section>

          <Section
            step={3}
            title="テーマ"
            required
            description="資料全体で扱うテーマを入力してください。"
          >
            <textarea
              value={theme}
              onChange={(event) => setTheme(event.target.value)}
              rows={4}
              placeholder="例：転倒予防について、介護職が明日から注意できるポイントを伝えたい"
              className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium leading-relaxed text-slate-800 placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-100"
            />
          </Section>

          <Section step={4} title="対象者">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {AUDIENCES.map((item) => (
                <OptionCard
                  key={item}
                  label={item}
                  selected={audience === item}
                  onClick={() => setAudience(audience === item ? null : item)}
                />
              ))}
            </div>
          </Section>

          <Section step={5} title="資料のゴール">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {GOALS.map((item) => (
                <OptionCard
                  key={item}
                  label={item}
                  selected={goal === item}
                  onClick={() => setGoal(goal === item ? null : item)}
                />
              ))}
            </div>
          </Section>

          <Section step={6} title="デザイン方針">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {DESIGN_POLICIES.map((item) => (
                <OptionCard
                  key={item}
                  label={item}
                  selected={designPolicy === item}
                  onClick={() => setDesignPolicy(designPolicy === item ? null : item)}
                />
              ))}
            </div>
          </Section>

          <Section step={7} title="追加オプション">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {EXTRA_OPTIONS.map((item) => (
                <OptionCard
                  key={item}
                  label={item}
                  multi
                  compact
                  selected={extras.includes(item)}
                  onClick={() => toggleExtra(item)}
                />
              ))}
            </div>
          </Section>

          <Section
            step={8}
            title="各スライド設定"
            required
            description="選択した枚数分だけ、各スライドで伝えたいことを編集できます。"
          >
            <SlideConfigEditor slides={slides} onChange={updateSlide} />
          </Section>
        </div>

        <div className="lg:sticky lg:top-24">
          <PromptPreview output={output} onReset={handleReset} />
        </div>
      </div>
    </div>
  );
}
