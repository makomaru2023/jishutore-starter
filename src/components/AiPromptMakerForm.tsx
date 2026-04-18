"use client";

import { useState, useCallback, useMemo, useEffect } from "react";

/* ──────────────────────────────────────────────
   Data
   ────────────────────────────────────────────── */

/** 合言葉（note購入者向け） — 変更はここだけでOK */
const PASSPHRASE = "jishutore2025";

const TARGETS = ["高齢者", "成人", "小児", "アスリート"] as const;
const STYLES = [
  "シンプルライン（線画）",
  "フラットデザイン",
  "やわらかいタッチ",
  "医学書風リアル",
  "ピクトグラム風",
] as const;

const BACKGROUNDS = ["白背景", "淡いグレー背景", "背景なし（透過）"] as const;
const ANGLES = ["正面", "側面", "斜め45度", "背面"] as const;
const PALETTES = ["モノクロ", "パステルカラー", "ビビッドカラー", "2色カラー"] as const;
const EXTRAS = [
  "矢印で動作方向を表示",
  "回数・秒数テキストを含む",
  "関節角度ガイド付き",
  "NG姿勢も並べて表示",
] as const;

const STORAGE_KEY = "ai-prompt-maker-unlocked";

/* ──────────────────────────────────────────────
   Lock Gate Component
   ────────────────────────────────────────────── */

function LockGate({ onUnlock }: { onUnlock: () => void }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (input.trim() === PASSPHRASE) {
      try {
        localStorage.setItem(STORAGE_KEY, "1");
      } catch { /* private browsing */ }
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="max-w-lg mx-auto text-center space-y-6">
      <div className="w-20 h-20 mx-auto rounded-full bg-slate-100 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-slate-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
      </div>

      <div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">購入者限定ツール</h2>
        <p className="text-slate-500 font-medium text-sm">
          このツールはnote購入者向けの特典です。
          <br />
          記事に記載されている合言葉を入力してください。
        </p>
      </div>

      <div className="space-y-3">
        <input
          type="text"
          className={`w-full px-4 py-3 rounded-xl border text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all text-center ${
            error
              ? "border-red-400 focus:ring-red-400 focus:border-red-400"
              : "border-slate-300 focus:ring-teal-500 focus:border-teal-500"
          }`}
          placeholder="合言葉を入力"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        {error && (
          <p className="text-red-500 text-sm font-bold">合言葉が違います。もう一度お試しください。</p>
        )}
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full px-6 py-3 rounded-xl bg-teal-500 text-white font-black text-base hover:bg-teal-400 transition-all shadow-md shadow-teal-500/20"
        >
          ロックを解除する
        </button>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Main Form Component
   ────────────────────────────────────────────── */

export function AiPromptMakerForm() {
  // Auth
  const [unlocked, setUnlocked] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") {
        setUnlocked(true);
      }
    } catch { /* private browsing */ }
    setHydrated(true);
  }, []);

  // Required
  const [action, setAction] = useState("");
  const [target, setTarget] = useState<string | null>(null);
  const [style, setStyle] = useState<string | null>(null);

  // Optional
  const [note, setNote] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [background, setBackground] = useState<string | null>(null);
  const [angle, setAngle] = useState<string | null>(null);
  const [palette, setPalette] = useState<string | null>(null);
  const [extras, setExtras] = useState<string[]>([]);

  // Output
  const [copiedSimple, setCopiedSimple] = useState(false);
  const [copiedDetailed, setCopiedDetailed] = useState(false);

  const isReady = action.trim() && target && style;

  const toggleExtra = useCallback((item: string) => {
    setExtras((prev) =>
      prev.includes(item) ? prev.filter((e) => e !== item) : [...prev, item]
    );
  }, []);

  /* ---- Prompt generation (日本語) ---- */

  const simplePrompt = useMemo(() => {
    if (!isReady) return "";
    const base = `${target}が「${action.trim()}」を行っているリハビリ指導用イラスト。スタイル：${style}。患者配布用の資料に適した、わかりやすく清潔感のあるイラスト。白背景。`;
    if (note.trim()) {
      return base + `\n補足：${note.trim()}`;
    }
    return base;
  }, [isReady, action, target, style, note]);

  const detailedPrompt = useMemo(() => {
    if (!isReady) return "";

    const bg = background ?? "白背景";
    const ang = angle ?? "正面";
    const pal = palette ?? "標準的な配色";

    const extraParts: string[] = [];
    if (extras.includes("矢印で動作方向を表示")) extraParts.push("動作の方向を示す矢印を含める");
    if (extras.includes("回数・秒数テキストを含む")) extraParts.push("回数や秒数を示すテキストラベルを含める");
    if (extras.includes("関節角度ガイド付き")) extraParts.push("関節角度のガイド（度数表記）を表示する");
    if (extras.includes("NG姿勢も並べて表示")) extraParts.push("誤った姿勢を×印付きで横に並べて表示する");

    let prompt = `リハビリ運動の指導用イラスト。明瞭でプロフェッショナルな仕上がりにすること。

対象者：${target}が「${action.trim()}」を実施している様子
画風：${style}
視点：${ang}
背景：${bg}
配色：${pal}

条件：
- 姿勢や関節の位置は解剖学的に正確であること
- A4の患者配布資料への印刷に適していること
- 余白を十分に取った、すっきりとした構図にすること
- 運動の動きが一目でわかるようにすること`;

    if (extraParts.length > 0) {
      prompt += "\n- " + extraParts.join("\n- ");
    }

    if (note.trim()) {
      prompt += `\n\n補足：${note.trim()}`;
    }

    prompt += "\n\n指定がない限りテキストは含めない。透かしは入れない。";

    return prompt;
  }, [isReady, action, target, style, note, background, angle, palette, extras]);

  const handleCopy = useCallback(async (text: string, type: "simple" | "detailed") => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    if (type === "simple") {
      setCopiedSimple(true);
      setTimeout(() => setCopiedSimple(false), 2000);
    } else {
      setCopiedDetailed(true);
      setTimeout(() => setCopiedDetailed(false), 2000);
    }
  }, []);

  /* ---- Render helpers ---- */

  const chipClass = (selected: boolean) =>
    `px-4 py-2 rounded-full text-sm font-bold border transition-all cursor-pointer select-none ${
      selected
        ? "bg-teal-500 text-white border-teal-500 shadow-md"
        : "bg-white text-slate-700 border-slate-300 hover:border-teal-400 hover:text-teal-600"
    }`;

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all";

  /* ---- Hydration guard ---- */
  if (!hydrated) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-400 font-bold">読み込み中...</p>
      </div>
    );
  }

  /* ---- Lock gate ---- */
  if (!unlocked) {
    return <LockGate onUnlock={() => setUnlocked(true)} />;
  }

  /* ---- Main form ---- */
  return (
    <div className="space-y-10">
      {/* ── 必須項目 ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-8">
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-teal-500 text-white text-xs font-black">1</span>
          必須項目を入力・選択
        </h2>

        {/* Action (free text) */}
        <div>
          <label htmlFor="action" className="block text-base font-bold text-slate-800 mb-2">
            動作 <span className="text-red-500 text-sm">*必須</span>
          </label>
          <input
            id="action"
            type="text"
            className={inputClass}
            placeholder="例：スクワット、肩関節屈曲、ブリッジ、ヒールレイズ など"
            value={action}
            onChange={(e) => setAction(e.target.value)}
          />
        </div>

        {/* Target */}
        <fieldset>
          <legend className="text-base font-bold text-slate-800 mb-3">
            対象者 <span className="text-red-500 text-sm">*必須</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {TARGETS.map((t) => (
              <button
                key={t}
                type="button"
                className={chipClass(target === t)}
                onClick={() => setTarget(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </fieldset>

        {/* Style */}
        <fieldset>
          <legend className="text-base font-bold text-slate-800 mb-3">
            イラストスタイル <span className="text-red-500 text-sm">*必須</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {STYLES.map((s) => (
              <button
                key={s}
                type="button"
                className={chipClass(style === s)}
                onClick={() => setStyle(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </fieldset>

        {/* Note (supplementary) */}
        <div>
          <label htmlFor="note" className="block text-base font-bold text-slate-800 mb-2">
            補足 <span className="text-slate-400 text-sm font-medium">（任意）</span>
          </label>
          <textarea
            id="note"
            className={`${inputClass} resize-none`}
            rows={3}
            placeholder="例：椅子に座った状態で、セラバンドを使用、両手を頭の後ろに当てる など"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
      </div>

      {/* ── 詳細設定 ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <button
          type="button"
          className="w-full flex items-center justify-between p-6 sm:p-8 text-left"
          onClick={() => setShowAdvanced((v) => !v)}
        >
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-300 text-slate-700 text-xs font-black">2</span>
            詳細設定（任意）
          </h2>
          <svg
            className={`w-6 h-6 text-slate-400 transition-transform ${showAdvanced ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showAdvanced && (
          <div className="px-6 sm:px-8 pb-6 sm:pb-8 space-y-6 border-t border-slate-100 pt-6">
            <fieldset>
              <legend className="text-sm font-bold text-slate-700 mb-2">背景</legend>
              <div className="flex flex-wrap gap-2">
                {BACKGROUNDS.map((b) => (
                  <button key={b} type="button" className={chipClass(background === b)} onClick={() => setBackground(background === b ? null : b)}>
                    {b}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-bold text-slate-700 mb-2">視点・アングル</legend>
              <div className="flex flex-wrap gap-2">
                {ANGLES.map((a) => (
                  <button key={a} type="button" className={chipClass(angle === a)} onClick={() => setAngle(angle === a ? null : a)}>
                    {a}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-bold text-slate-700 mb-2">色合い</legend>
              <div className="flex flex-wrap gap-2">
                {PALETTES.map((p) => (
                  <button key={p} type="button" className={chipClass(palette === p)} onClick={() => setPalette(palette === p ? null : p)}>
                    {p}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-bold text-slate-700 mb-2">追加オプション</legend>
              <div className="flex flex-wrap gap-2">
                {EXTRAS.map((e) => (
                  <button key={e} type="button" className={chipClass(extras.includes(e))} onClick={() => toggleExtra(e)}>
                    {e}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>
        )}
      </div>

      {/* ── 生成結果 ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-8">
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-teal-500 text-white text-xs font-black">3</span>
          生成されたプロンプト
        </h2>

        {!isReady && (
          <div className="text-center py-8">
            <p className="text-slate-400 font-bold">
              必須項目（動作・対象者・スタイル）をすべて入力・選択すると、
              <br className="hidden sm:block" />
              プロンプトが自動生成されます。
            </p>
          </div>
        )}

        {isReady && (
          <div className="space-y-8">
            {/* Simple */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-black text-slate-800">
                  <span className="inline-block px-2 py-0.5 rounded bg-teal-100 text-teal-700 text-xs font-bold mr-2">かんたん版</span>
                  ワンライナー
                </h3>
                <button
                  type="button"
                  onClick={() => handleCopy(simplePrompt, "simple")}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                    copiedSimple
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {copiedSimple ? "コピーしました!" : "コピー"}
                </button>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-700 leading-relaxed border border-slate-200 whitespace-pre-wrap break-all">
                {simplePrompt}
              </div>
            </div>

            {/* Detailed */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-black text-slate-800">
                  <span className="inline-block px-2 py-0.5 rounded bg-purple-100 text-purple-700 text-xs font-bold mr-2">こだわり版</span>
                  詳細プロンプト
                </h3>
                <button
                  type="button"
                  onClick={() => handleCopy(detailedPrompt, "detailed")}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                    copiedDetailed
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {copiedDetailed ? "コピーしました!" : "コピー"}
                </button>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-700 leading-relaxed border border-slate-200 whitespace-pre-wrap break-all">
                {detailedPrompt}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
