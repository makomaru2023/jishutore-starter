import fs from "fs/promises";
import path from "path";

type Row = { tier: string; category: string; title: string; url: string };
type Item = { id: string; tier: string; category: string; title: string; previewSrc: string; fileHref: string; fileName: string };

const INPUTS = ["data/items-basic-plain-text.csv"];
const OUT = "data/items.json";

function parse(csv: string): Row[] {
  const text = csv.replace(/^\uFEFF/, "");
  const lines = text.split(/\r?\n/).map(s => s.trim()).filter(s => s.length > 0 && !s.startsWith("#"));
  if (!lines.length) return [];
  const header = lines[0].split(",").map(s => s.trim());
  const idx = {
    t: header.indexOf("tier"),
    c: header.indexOf("category"),
    ti: header.indexOf("title"),
    u: header.indexOf("url")
  };
  if (idx.t < 0 || idx.c < 0 || idx.ti < 0 || idx.u < 0) return [];
  const out: Row[] = [];
  for (const line of lines.slice(1)) {
    const cols = line.split(",");
    if (cols.length < 4) continue;
    out.push({
      tier: cols[idx.t].trim(),
      category: cols[idx.c].trim(),
      title: cols[idx.ti].trim(),
      url: cols[idx.u].trim()
    });
  }
  return out;
}

function nameFromUrl(u: string) {
  const p = u.split("?")[0].split("#")[0];
  const f = p.slice(p.lastIndexOf("/") + 1);
  return { fileName: f, id: f.replace(/\.[^.]+$/, "") };
}

async function main() {
  const rows: Row[] = [];
  for (const rel of INPUTS) {
    const abs = path.resolve(rel);
    try {
      const txt = await fs.readFile(abs, "utf8");
      rows.push(...parse(txt));
    } catch (e: any) {
      console.error("READ_FAIL:", rel, e?.message || e);
    }
  }
  if (!rows.length) {
    console.error("No CSV loaded. Check file name, header 'tier,category,title,url', and encoding (UTF-8).");
    process.exit(1);
  }
  const items: Item[] = rows.map(r => {
    const { fileName, id } = nameFromUrl(r.url);

    // For 'text' category, ensure ID is unique by appending suffix if not already present in filename
    const uniqueId = (r.category === 'text' && !id.endsWith('-text')) ? `${id}-text` : id;

    // Convert full URL to relative path for previewSrc (to use with R2_DOMAIN in components)
    // The current CSV has full URLs like https://pub.../basic/plain/foo.png
    // We want to store just "basic/plain/foo.png" so the component can handle the domain switching if needed
    // checking logic inside ItemCard and others suggest they handle both, but let's stick to what was there before or ensure it works.
    // Actually, looking at previous items.json content:
    // "previewSrc": "basic/text/ankle-dorsiflexion-and-plantarflexion.png"
    // "fileHref": "/api/image?key=..."
    //
    // The previous `items.json` had relative paths. The new CSV has IS full URLs.
    // The script currently does: `previewSrc:r.url`.
    // If we keep full URL, ItemCard logic `if (!imageUrl.startsWith("https://"))` will skip adding R2_DOMAIN, which is fine.
    // BUT, we want to ensure consistency.

    // Let's just fix the ID issue first as requested.

    return { id: uniqueId, tier: r.tier, category: r.category, title: r.title, previewSrc: r.url, fileHref: r.url, fileName };
  });
  await fs.mkdir(path.dirname(OUT), { recursive: true });
  await fs.writeFile(OUT, JSON.stringify(items, null, 2));
  console.log(`Wrote ${items.length} items -> ${OUT}`);
}

main().catch(err => { console.error(err); process.exit(1); });
