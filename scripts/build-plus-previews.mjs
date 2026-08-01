import { cpus, homedir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { mkdir, readdir } from "node:fs/promises";

import sharp from "sharp";
import { tsImport } from "tsx/esm/api";

const EXPECTED_ITEM_COUNT = 227;
const OUTPUT_WIDTH = 1200;
const OUTPUT_HEIGHT = 675;
const WEBP_QUALITY = 85;
const SOURCE_DIR =
    process.env.PLUS_PREVIEW_SOURCE_DIR ??
    path.join(homedir(), "Desktop", "自主トレサイト資料", "premium", "文字あり");

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");
const outputDir = path.join(repoRoot, "public", "plus", "previews");

function normalizeFileName(fileName) {
    return path
        .parse(fileName)
        .name.toLowerCase()
        .replace(/^premium[_-](?:text|plain)[_-]/, "")
        .replace(/[\s_]+/g, "-")
        .replace(/-?with-text$/, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function formatList(values) {
    return values.length > 0 ? `\n  - ${values.join("\n  - ")}` : " なし";
}

async function loadPlusItems() {
    const imported = await tsImport("../src/data/plus-items.ts", import.meta.url);
    const plusItems = (imported.default ?? imported).PLUS_ITEMS;

    if (!Array.isArray(plusItems)) {
        throw new Error("src/data/plus-items.ts から PLUS_ITEMS を読み込めませんでした。\n");
    }

    if (plusItems.length !== EXPECTED_ITEM_COUNT) {
        throw new Error(
            `PLUS_ITEMS は ${EXPECTED_ITEM_COUNT} 件である必要があります（実際: ${plusItems.length} 件）。`,
        );
    }

    const ids = plusItems.map((item) => item.id);
    const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
    if (duplicateIds.length > 0) {
        throw new Error(`PLUS_ITEMS に重複IDがあります:${formatList([...new Set(duplicateIds)])}`);
    }

    return plusItems;
}

async function resolveSourceImages(plusItems) {
    const entries = await readdir(SOURCE_DIR, { withFileTypes: true });
    const pngFiles = entries
        .filter((entry) => entry.isFile() && path.extname(entry.name).toLowerCase() === ".png")
        .map((entry) => entry.name)
        .sort((a, b) => a.localeCompare(b, "en"));

    const filesById = new Map();
    for (const fileName of pngFiles) {
        const id = normalizeFileName(fileName);
        const matchedFiles = filesById.get(id) ?? [];
        matchedFiles.push(fileName);
        filesById.set(id, matchedFiles);
    }

    const plusItemIds = new Set(plusItems.map((item) => item.id));
    const missingIds = plusItems.map((item) => item.id).filter((id) => !filesById.has(id));
    const duplicateSources = [...filesById.entries()]
        .filter(([, fileNames]) => fileNames.length > 1)
        .map(([id, fileNames]) => `${id}: ${fileNames.join(", ")}`);
    const extraSources = [...filesById.keys()].filter((id) => !plusItemIds.has(id));

    if (missingIds.length > 0 || duplicateSources.length > 0 || extraSources.length > 0) {
        throw new Error(
            [
                "PNGとPLUS_ITEMSの対応に不整合があります。",
                `欠損ID:${formatList(missingIds)}`,
                `正規化後の重複:${formatList(duplicateSources)}`,
                `PLUS_ITEMSにないPNG:${formatList(extraSources)}`,
            ].join("\n"),
        );
    }

    return plusItems.map((item) => ({
        id: item.id,
        sourcePath: path.join(SOURCE_DIR, filesById.get(item.id)[0]),
        outputPath: path.join(outputDir, `${item.id}.webp`),
    }));
}

async function validateSourceDimensions(images) {
    const invalidDimensions = [];

    for (const image of images) {
        const metadata = await sharp(image.sourcePath).metadata();
        if (metadata.width !== OUTPUT_WIDTH || metadata.height !== OUTPUT_HEIGHT) {
            invalidDimensions.push(
                `${path.basename(image.sourcePath)}: ${metadata.width ?? "?"}x${metadata.height ?? "?"}`,
            );
        }
    }

    if (invalidDimensions.length > 0) {
        throw new Error(
            `生成元PNGはすべて ${OUTPUT_WIDTH}x${OUTPUT_HEIGHT} である必要があります:${formatList(invalidDimensions)}`,
        );
    }
}

async function runWithConcurrency(items, worker) {
    let nextIndex = 0;
    const workerCount = Math.min(Math.max(1, cpus().length), 8, items.length);

    await Promise.all(
        Array.from({ length: workerCount }, async () => {
            while (nextIndex < items.length) {
                const item = items[nextIndex];
                nextIndex += 1;
                await worker(item);
            }
        }),
    );
}

async function buildPreviews(images) {
    await mkdir(outputDir, { recursive: true });
    await runWithConcurrency(images, async ({ sourcePath, outputPath }) => {
        await sharp(sourcePath)
            .resize(OUTPUT_WIDTH, OUTPUT_HEIGHT, { fit: "fill" })
            .webp({ quality: WEBP_QUALITY })
            .toFile(outputPath);
    });
}

async function validateOutputs(images) {
    const invalidOutputs = [];

    for (const image of images) {
        const metadata = await sharp(image.outputPath).metadata();
        if (
            metadata.format !== "webp" ||
            metadata.width !== OUTPUT_WIDTH ||
            metadata.height !== OUTPUT_HEIGHT
        ) {
            invalidOutputs.push(
                `${path.basename(image.outputPath)}: ${metadata.format ?? "?"} ${metadata.width ?? "?"}x${metadata.height ?? "?"}`,
            );
        }
    }

    if (invalidOutputs.length > 0) {
        throw new Error(`生成されたプレビューに不整合があります:${formatList(invalidOutputs)}`);
    }
}

async function main() {
    const plusItems = await loadPlusItems();
    const images = await resolveSourceImages(plusItems);

    await validateSourceDimensions(images);
    await buildPreviews(images);
    await validateOutputs(images);

    console.log(
        `Plusプレビュー生成完了: ${images.length}/${plusItems.length}件 (${OUTPUT_WIDTH}x${OUTPUT_HEIGHT}, WebP quality ${WEBP_QUALITY})`,
    );
}

main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
});
