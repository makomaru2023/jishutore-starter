
import fs from "fs/promises";
import path from "path";

type Row = { tier: string; category: string; title: string; titleJa: string; url: string };
type Item = { id: string; tier: string; category: string; title: string; titleJa: string; previewSrc: string; fileHref: string; fileName: string };

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
    tja: header.indexOf("titleJa"),
    u: header.indexOf("url")
  };

  const hasJa = idx.tja >= 0;

  if (idx.t < 0 || idx.c < 0 || idx.ti < 0 || idx.u < 0) return [];

  const out: Row[] = [];
  for (const line of lines.slice(1)) {
    const cols = line.split(",");
    if (cols.length < 4) continue;

    out.push({
      tier: cols[idx.t].trim(),
      category: cols[idx.c].trim(),
      title: cols[idx.ti].trim(),
      titleJa: hasJa ? cols[idx.tja].trim() : "",
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
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      console.error("READ_FAIL:", rel, message);
    }
  }
  if (!rows.length) {
    console.error("No CSV loaded. Check file name, header 'tier,category,title,url', and encoding (UTF-8).");
    process.exit(1);
  }
  const items: Item[] = rows.map(r => {
    const { fileName, id } = nameFromUrl(r.url);

    let uniqueId = id;
    let suffix = '';

    if (r.tier !== 'basic') {
      suffix += `-${r.tier}`;
    }

    if (r.category === 'text') {
      suffix += '-text';
    }

    if (suffix && !uniqueId.endsWith(suffix)) {
      uniqueId = `${uniqueId}${suffix}`;
    }

    // Construct fileHref using /api/image route to proxy R2 access securely/consistently
    // The items.json needs this to map to the correct R2 object
    const fileHref = `/api/image?key=${encodeURIComponent(r.url)}`;

    return {
      id: uniqueId,
      tier: r.tier,
      category: r.category,
      title: r.title,
      titleJa: r.titleJa,
      previewSrc: r.url,
      fileHref,
      fileName
    };
  });
  await fs.mkdir(path.dirname(OUT), { recursive: true });
  await fs.writeFile(OUT, JSON.stringify(items, null, 2));
  console.log(`Wrote ${items.length} items -> ${OUT}`);
}

main().catch(err => { console.error(err); process.exit(1); });
