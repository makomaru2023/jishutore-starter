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

    // Create a lookup map: tier -> category -> fileName -> title
    const translationMap: Record<string, Record<string, Record<string, string>>> = {};

    records.forEach(record => {
        const title = record.new_title_ja?.trim() || record.current_title_ja?.trim();
        if (!title) return;

        if (!translationMap[record.tier]) translationMap[record.tier] = {};
        if (!translationMap[record.tier][record.category]) translationMap[record.tier][record.category] = {};

        translationMap[record.tier][record.category][record.fileName] = title;
    });

    let updatedCount = 0;

    items.forEach(item => {
        let newTitle = translationMap[item.tier]?.[item.category]?.[item.fileName];

        // Fallback: If no direct match, try the opposite category in the same tier
        if (!newTitle) {
            const oppositeCategory = item.category === 'plain' ? 'text' : 'plain';
            const fallbackTitle = translationMap[item.tier]?.[oppositeCategory]?.[item.fileName];

            if (fallbackTitle) {
                if (item.category === 'text') {
                    // plain -> text: Add suffix if not present
                    newTitle = fallbackTitle.includes('【文字あり】') ? fallbackTitle : `${fallbackTitle}【文字あり】`;
                } else {
                    // text -> plain: Remove suffix
                    newTitle = fallbackTitle.replace(/【文字あり】$/, '');
                }
                // console.log(`Fallback used for ${item.tier}/${item.category}/${item.fileName}: ${fallbackTitle} -> ${newTitle}`);
            }
        }

        if (newTitle && item.titleJa !== newTitle) {
            item.titleJa = newTitle;
            updatedCount++;
        }
    });

    fs.writeFileSync(ITEMS_PATH, JSON.stringify(items, null, 2));
    console.log(`Total items updated: ${updatedCount}`);
}

importTranslations();
