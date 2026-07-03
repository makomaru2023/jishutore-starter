import path from "node:path";
import os from "node:os";
import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import { Automizer } from "pptx-automizer";
import JSZip from "jszip";

// 元デッキ（サーバー専用）と、スライド0枚の空ルート
const DECKS_DIR = path.join(process.cwd(), "plus-source");
const ROOT = "_root.pptx";

export type PlusSelection = { deck: string; slide: number }; // slide は 0 始まり

/** "ppt/slides/" + "../media/x.png" → "ppt/media/x.png" */
function resolveTarget(fromDir: string, target: string): string {
    const parts = (fromDir + target).split("/");
    const out: string[] = [];
    for (const p of parts) {
        if (p === "..") out.pop();
        else if (p !== ".") out.push(p);
    }
    return out.join("/");
}

/**
 * 選択された運動スライドを1つの PowerPoint に合体して返す（Node ネイティブ）。
 * pptx-automizer で空ルートに各スライドを取り込み、取り込み時に残る
 * 「存在しないメディア/ノートを指す不要な relationship」を除去してから返す
 * （残すと PowerPoint が「修復」を求めるため）。
 */
export async function mergePlusSlides(selection: PlusSelection[]): Promise<Buffer> {
    const automizer = new Automizer({ templateDir: DECKS_DIR, outputDir: os.tmpdir() });
    let pres = automizer.loadRoot(ROOT);

    const nameByDeck: Record<string, string> = {};
    for (const { deck } of selection) {
        if (!nameByDeck[deck]) {
            nameByDeck[deck] = `d${Object.keys(nameByDeck).length}`;
            pres = pres.load(deck, nameByDeck[deck]);
        }
    }
    for (const { deck, slide } of selection) {
        pres.addSlide(nameByDeck[deck], slide + 1); // automizer は 1 始まり
    }

    const outName = `plus_${randomUUID()}.pptx`;
    await pres.write(outName);
    const outPath = path.join(os.tmpdir(), outName);

    // --- 残骸 relationship のクリーンアップ ---
    const zip = await JSZip.loadAsync(await fs.readFile(outPath));
    for (const rf of Object.keys(zip.files).filter((f) => /_rels\/.*\.rels$/.test(f))) {
        const dir = rf.replace(/_rels\/[^/]+$/, "");
        const original = await zip.file(rf)!.async("string");
        const cleaned = original.replace(/<Relationship\b[^>]*\/>/g, (rel) => {
            if (/TargetMode="External"/.test(rel)) return rel;
            const m = rel.match(/Target="([^"]+)"/);
            if (!m) return rel;
            return zip.file(resolveTarget(dir, m[1])) ? rel : "";
        });
        if (cleaned !== original) zip.file(rf, cleaned);
    }

    const buf = await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
    fs.unlink(outPath).catch(() => {});
    return buf;
}
