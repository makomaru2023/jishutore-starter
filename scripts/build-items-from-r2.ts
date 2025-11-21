import fs from "fs/promises";
import path from "path";

type CsvRow = {
  tier: string;
  category: string;
  title: string;
  url: string;
};

type Item = {
  id: string;
  tier: string;
  category: string;
  title: string;
  previewSrc: string;
  fileHref: string;
  fileName: string;
};

const INPUTS = [
  "data/items_basic_plain_text_40_absolute.csv"
];

const OUT_JSON = "data/items.json";

function parseCsv(text: string): CsvRow[] {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !l.startsWith("#"));
  if (lines.length === 0) return [];
  const header = lines[0].split(",").map((h) => h.trim());
  const idx = {
    tier: header.indexOf("tier"),
    category: header.indexOf("category"),
    title: header.indexOf("title"),
    url: header.indexOf("url")
  };
  if (Object.values(idx).some((i) => i === -1)) throw new Error("CSV header must include tier,category,title,url");
  const rows: CsvRow[] = [];
  for (const line of lines.slice(1)) {
    const cols = line.split(",");
    if (cols.length < header.length) continue;
    rows.push({
      tier: cols[idx.tier].trim(),
      category: cols[idx.category].trim(),
      title: cols[idx.title].trim(),
      url: cols[idx.url].trim()
    });
  }
  return rows;
}

function slugFromUrl(u: string): { fileName: string; id: string } {
  const last = u.split("?")[0].split("#")[0].split("/").pop() || "";
  const fileName = last;
  const id = last.replace(/\.[a-zA-Z0-9]+$/, "");
  return { fileName, id };
}

async function main() {
  const allRows: CsvRow[] = [];
  for (const rel of INPUTS) {
    const abs = path.resolve(rel);
    try {
      const text = await fs.readFile(abs, "utf8");
      allRows.push(...parseCsv(text));
    } catch {}
  }
  if (allRows.length === 0) {
    console.error("No CSV loaded. Check INPUTS paths.");
    process.exit(1);
  }
  const items: Item[] = allRows.map((r) => {
    const { fileName, id } = slugFromUrl(r.url);
    const url = r.url;
    return { id, tier: r.tier, category: r.category, title: r.title, previewSrc: url, fileHref: url, fileName };
  });
  await fs.mkdir(path.dirname(OUT_JSON), { recursive: true });
  await fs.writeFile(OUT_JSON, JSON.stringify(items, null, 2), "utf8");
  console.log(`Wrote ${items.length} items to ${OUT_JSON}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
