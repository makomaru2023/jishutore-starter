import fs from "fs/promises";
import path from "path";

type CsvRow = { tier: string; category: string; title: string; url: string; };
type Item = { id: string; tier: string; category: string; title: string; previewSrc: string; fileHref: string; fileName: string; };

const INPUTS = ["data/items-basic-plain-text.csv"];
const OUT_JSON = "data/items.json";

function parseCsv(text: string): CsvRow[] {
  const lines = text.split(/\r?\n/).map(s=>s.trim()).filter(s=>s && !s.startsWith("#"));
  if (!lines.length) return [];
  const header = lines[0].split(",").map(s=>s.trim());
  const idx = { tier: header.indexOf("tier"), category: header.indexOf("category"), title: header.indexOf("title"), url: header.indexOf("url") };
  if (Object.values(idx).some(i=>i===-1)) throw new Error("CSV header must include tier,category,title,url");
  const out: CsvRow[] = [];
  for (const line of lines.slice(1)) {
    const cols = line.split(",");
    if (cols.length < header.length) continue;
    out.push({ tier: cols[idx.tier].trim(), category: cols[idx.category].trim(), title: cols[idx.title].trim(), url: cols[idx.url].trim() });
  }
  return out;
}

function nameFromUrl(u: string) {
  const last = u.split("?")[0].split("#")[0].split("/").pop() || "";
  return { fileName: last, id: last.replace(/\.[^.]+$/, "") };
}

async function main() {
  const rows: CsvRow[] = [];
  for (const rel of INPUTS) {
    const abs = path.resolve(rel);
    try { const t = await fs.readFile(abs, "utf8"); rows.push(...parseCsv(t)); } catch {}
  }
  if (!rows.length) { console.error("No CSV loaded. Check INPUTS path."); process.exit(1); }
  const items: Item[] = rows.map(r => {
    const { fileName, id } = nameFromUrl(r.url);
    return { id, tier: r.tier, category: r.category, title: r.title, previewSrc: r.url, fileHref: r.url, fileName };
  });
  await fs.mkdir(path.dirname(OUT_JSON), { recursive: true });
  await fs.writeFile(OUT_JSON, JSON.stringify(items, null, 2), "utf8");
  console.log(`Wrote ${items.length} items to ${OUT_JSON}`);
}

main().catch(e=>{ console.error(e); process.exit(1); });
