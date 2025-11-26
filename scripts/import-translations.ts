import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

interface Item {
    id: string;
    tier: string;
    category: string;
    title: string;
    titleJa?: string;
    fileName: string;
}

interface CsvRow {
    tier: string;
    category: string;
    fileName: string;
    current_title_ja: string;
    new_title_ja: string;
}

const ITEMS_PATH = path.join(process.cwd(), 'data/items.json');
const CSV_PATH = path.join(process.cwd(), 'items_for_translation.csv');

function importTranslations() {
    if (!fs.existsSync(CSV_PATH)) {
        console.error('CSV file not found');
        return;
    }

    const itemsRaw = fs.readFileSync(ITEMS_PATH, 'utf-8');
    const items: Item[] = JSON.parse(itemsRaw);

    const csvRaw = fs.readFileSync(CSV_PATH, 'utf-8');
    const records: CsvRow[] = parse(csvRaw, {
        columns: true,
        skip_empty_lines: true
    });

    let updatedCount = 0;

    records.forEach(record => {
        const newTitle = record.new_title_ja?.trim() || record.current_title_ja?.trim();

        if (!newTitle) {
            return;
        }

        const match = items.find(item => item.fileName === record.fileName);
        if (match) {
            if (match.titleJa !== newTitle) {
                match.titleJa = newTitle;
                updatedCount++;
                // console.log(`Updated: ${match.fileName} -> ${newTitle}`);
            }
        }
    });

    fs.writeFileSync(ITEMS_PATH, JSON.stringify(items, null, 2));
    console.log(`Total items updated: ${updatedCount}`);
}

importTranslations();
