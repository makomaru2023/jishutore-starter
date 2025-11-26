import fs from 'fs';
import path from 'path';

interface Item {
    id: string;
    tier: string;
    category: string;
    title: string;
    titleJa?: string;
    fileName: string;
}

const ITEMS_PATH = path.join(process.cwd(), 'data/items.json');
const OUTPUT_PATH = path.join(process.cwd(), 'items_for_translation.csv');

function exportItems() {
    const itemsRaw = fs.readFileSync(ITEMS_PATH, 'utf-8');
    const items: Item[] = JSON.parse(itemsRaw);

    // Create CSV header
    const header = 'tier,category,fileName,current_title_ja,new_title_ja\n';

    // Create CSV rows
    const rows = items.map(item => {
        // Escape quotes in fields if necessary, though filenames usually don't have them
        return `${item.tier},${item.category},${item.fileName},${item.titleJa || ''},`;
    });

    const content = header + rows.join('\n');

    fs.writeFileSync(OUTPUT_PATH, content);
    console.log(`Exported ${items.length} items to ${OUTPUT_PATH}`);
}

exportItems();
