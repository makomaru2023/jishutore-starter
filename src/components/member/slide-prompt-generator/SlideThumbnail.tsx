import type { MotifKind, Palette, SampleSlide, SlideDesign } from "./slideDesigns";

/* スライド1枚分の見本を SVG で描画する（viewBox 320x180 = 16:9） */

function wrapTitle(title: string, perLine: number): string[] {
  if (title.length <= perLine) return [title];
  const first = title.slice(0, perLine);
  let rest = title.slice(perLine);
  if (rest.length > perLine) rest = rest.slice(0, perLine - 1) + "…";
  return [first, rest];
}

function Motif({
  kind,
  x,
  y,
  w,
  h,
  p,
}: {
  kind: MotifKind;
  x: number;
  y: number;
  w: number;
  h: number;
  p: Palette;
}) {
  const onAccent = p.onAccent ?? "#ffffff";

  if (kind === "bars") {
    const ratios = [0.45, 0.75, 0.6, 1];
    const gap = 6;
    const bw = (w - gap * (ratios.length - 1)) / ratios.length;
    const base = y + h;
    return (
      <g>
        {ratios.map((r, i) => {
          const bh = h * 0.85 * r;
          return (
            <rect
              key={i}
              x={x + i * (bw + gap)}
              y={base - bh}
              width={bw}
              height={bh}
              rx={2}
              fill={i === ratios.length - 1 ? p.accent2 : p.accent}
            />
          );
        })}
      </g>
    );
  }

  if (kind === "line") {
    const pts = [0.85, 0.55, 0.7, 0.3, 0.15];
    const step = w / (pts.length - 1);
    const coords = pts.map((r, i) => ({ px: x + i * step, py: y + h * r }));
    const d = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c.px} ${c.py}`).join(" ");
    return (
      <g>
        <line x1={x} y1={y + h} x2={x + w} y2={y + h} stroke={p.border} strokeWidth={1} />
        <path d={d} fill="none" stroke={p.accent} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
        {coords.map((c, i) => (
          <circle key={i} cx={c.px} cy={c.py} r={2.4} fill={p.accent2} />
        ))}
      </g>
    );
  }

  if (kind === "donut") {
    const cx = x + w / 2;
    const cy = y + h / 2;
    const r = Math.min(w, h) / 2 - 3;
    const c = 2 * Math.PI * r;
    return (
      <g>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={p.accent2} strokeWidth={7} opacity={0.45} />
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={p.accent}
          strokeWidth={7}
          strokeDasharray={`${c * 0.62} ${c}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}
        />
        <text x={cx} y={cy + 3.5} fontSize="10" fontWeight="800" fill={p.ink} textAnchor="middle">
          62%
        </text>
      </g>
    );
  }

  if (kind === "icons") {
    const n = 3;
    const gap = 7;
    const s = Math.min((w - gap * (n - 1)) / n, h);
    const top = y + (h - s) / 2;
    return (
      <g>
        {Array.from({ length: n }).map((_, i) => {
          const ix = x + i * (s + gap);
          return (
            <g key={i}>
              <rect x={ix} y={top} width={s} height={s} rx={5} fill={p.surface} stroke={p.accent} strokeWidth={1.2} />
              <circle cx={ix + s / 2} cy={top + s / 2 - 2} r={s * 0.16} fill={p.accent} />
              <rect x={ix + s * 0.28} y={top + s * 0.62} width={s * 0.44} height={2.4} rx={1.2} fill={p.accent2} />
            </g>
          );
        })}
      </g>
    );
  }

  if (kind === "steps") {
    const n = 3;
    const r = 9;
    const cy = y + h / 2;
    const span = w - r * 2;
    const onAcc = onAccent;
    return (
      <g>
        <line x1={x + r} y1={cy} x2={x + r + span} y2={cy} stroke={p.accent2} strokeWidth={2} />
        {Array.from({ length: n }).map((_, i) => {
          const cx = x + r + (span / (n - 1)) * i;
          return (
            <g key={i}>
              <circle cx={cx} cy={cy} r={r} fill={p.accent} />
              <text x={cx} y={cy + 3.5} fontSize="9" fontWeight="800" fill={onAcc} textAnchor="middle">
                {i + 1}
              </text>
            </g>
          );
        })}
      </g>
    );
  }

  // photo（画像プレースホルダー）
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={5} fill={p.surface} stroke={p.border} strokeWidth={1} />
      <circle cx={x + w * 0.72} cy={y + h * 0.32} r={h * 0.12} fill={p.accent2} />
      <path
        d={`M${x} ${y + h} L${x + w * 0.35} ${y + h * 0.5} L${x + w * 0.55} ${y + h * 0.72} L${x + w * 0.78} ${y + h * 0.42} L${x + w} ${y + h} Z`}
        fill={p.accent}
        opacity={0.85}
      />
    </g>
  );
}

function TextBlock({
  slide,
  x,
  width,
  topY,
  align,
  titleColor,
  eyebrowColor,
  bodyColor,
  accent,
}: {
  slide: SampleSlide;
  x: number;
  width: number;
  topY: number;
  align: "start" | "middle";
  titleColor: string;
  eyebrowColor: string;
  bodyColor: string;
  accent: string;
}) {
  const perLine = Math.max(8, Math.floor(width / 13));
  const titleLines = wrapTitle(slide.title, perLine);
  let y = topY;

  const eyebrow = (
    <text x={x} y={y} fontSize="6" fontWeight="700" letterSpacing="0.8" fill={eyebrowColor} textAnchor={align}>
      {slide.eyebrow}
    </text>
  );
  y += 15;

  const title = titleLines.map((ln, i) => (
    <text key={i} x={x} y={y + i * 16} fontSize="13.5" fontWeight="800" fill={titleColor} textAnchor={align}>
      {ln}
    </text>
  ));
  y += titleLines.length * 16 + 4;

  let body: React.ReactNode = null;

  if (slide.kind === "cover" && slide.subtitle) {
    body = (
      <text x={x} y={y + 2} fontSize="8" fontWeight="500" fill={bodyColor} textAnchor={align}>
        {slide.subtitle}
      </text>
    );
    if (align === "middle") {
      body = (
        <>
          <rect x={x - 16} y={y - 9} width={32} height={2.5} rx={1.25} fill={accent} />
          {body}
        </>
      );
    }
  } else if (slide.bullets) {
    body = (
      <g>
        {slide.bullets.map((b, i) => {
          const by = y + i * 15;
          const marker =
            slide.kind === "summary" ? (
              <path
                d={`M${x} ${by - 2.5} l1.6 1.8 l3-3.6`}
                fill="none"
                stroke={accent}
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <rect x={x} y={by - 4} width={4} height={4} rx={1} fill={accent} />
            );
          return (
            <g key={i}>
              {marker}
              <text x={x + 9} y={by} fontSize="8" fontWeight="600" fill={bodyColor}>
                {b}
              </text>
            </g>
          );
        })}
      </g>
    );
  }

  return (
    <g>
      {eyebrow}
      {title}
      {body}
    </g>
  );
}

export function SlideThumbnail({ design, slide }: { design: SlideDesign; slide: SampleSlide }) {
  const p = design.palette;
  const layout = design.layout;
  const onAccent = p.onAccent ?? "#ffffff";

  // 既定の配置（leftBar / centered などのベース）
  let textX = 22;
  let textWidth = 175;
  let topY = 34;
  let align: "start" | "middle" = "start";
  let titleColor = p.ink;
  let eyebrowColor = p.accent;
  let bodyColor = p.sub;

  const isContent = slide.kind === "content";
  // モチーフ枠（種類・レイアウトで調整）
  let motifBox = isContent
    ? { x: 206, y: 52, w: 96, h: 104 }
    : { x: 222, y: 104, w: 80, h: 56 };

  const decorations: React.ReactNode[] = [];

  if (layout === "leftBar") {
    decorations.push(<rect key="bar" x={16} y={30} width={4} height={42} rx={2} fill={p.accent} />);
    textX = 28;
  } else if (layout === "topBand") {
    decorations.push(<rect key="band" x={0} y={0} width={320} height={30} fill={p.accent} />);
    decorations.push(
      <text key="be" x={16} y={19} fontSize="7" fontWeight="800" letterSpacing="1" fill={onAccent}>
        {slide.eyebrow}
      </text>
    );
    topY = 50;
    eyebrowColor = "transparent"; // バンド内に表示済み
  } else if (layout === "sidebar") {
    decorations.push(<rect key="side" x={0} y={0} width={112} height={180} fill={p.accent} />);
    // タイトルはサイドバー内（明色）
    textX = 14;
    textWidth = 90;
    titleColor = onAccent;
    eyebrowColor = onAccent;
    bodyColor = onAccent;
    motifBox = isContent ? { x: 130, y: 54, w: 172, h: 104 } : { x: 130, y: 96, w: 150, h: 60 };
  } else if (layout === "centered") {
    align = "middle";
    textX = 160;
    textWidth = 260;
    topY = isContent ? 34 : 56;
    motifBox = isContent ? { x: 96, y: 96, w: 128, h: 62 } : { x: 120, y: 132, w: 80, h: 30 };
  } else if (layout === "split") {
    decorations.push(<rect key="panel" x={170} y={0} width={150} height={180} fill={p.surface} />);
    textWidth = 140;
    motifBox = { x: 188, y: 52, w: 116, h: 104 };
  } else if (layout === "framed") {
    decorations.push(
      <rect key="frame" x={7} y={7} width={306} height={166} rx={6} fill="none" stroke={p.accent} strokeWidth={2.5} />
    );
    textX = 24;
    topY = 36;
  }

  // content スライドでサイドバー以外はテキスト幅を狭める（右にモチーフ）
  if (isContent && layout !== "sidebar" && layout !== "centered") {
    textWidth = Math.min(textWidth, motifBox.x - textX - 8);
  }

  return (
    <svg
      viewBox="0 0 320 180"
      width="100%"
      preserveAspectRatio="xMidYMid meet"
      style={{ fontFamily: "inherit", display: "block" }}
      role="img"
      aria-label={`${design.name}のスライド見本`}
    >
      <rect x={0} y={0} width={320} height={180} fill={p.bg} />
      {decorations}
      <TextBlock
        slide={slide}
        x={textX}
        width={textWidth}
        topY={topY}
        align={align}
        titleColor={titleColor}
        eyebrowColor={eyebrowColor}
        bodyColor={bodyColor}
        accent={layout === "sidebar" ? onAccent : p.accent}
      />
      <Motif kind={slide.motif} x={motifBox.x} y={motifBox.y} w={motifBox.w} h={motifBox.h} p={p} />
    </svg>
  );
}
