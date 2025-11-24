import fs from 'fs';
import path from 'path';

interface Item {
    id: string;
    tier: string;
    category: string;
    title: string;
    titleJa?: string;
    previewSrc: string;
    fileHref: string;
    fileName: string;
}

const ITEMS_PATH = path.join(process.cwd(), 'data/items.json');
const CSV_PATH = path.join(process.cwd(), 'data/items-basic-plain-text.csv');

function updateTitles() {
    const itemsRaw = fs.readFileSync(ITEMS_PATH, 'utf-8');
    const items: Item[] = JSON.parse(itemsRaw);

    const csvRaw = fs.readFileSync(CSV_PATH, 'utf-8');
    const lines = csvRaw.split('\n');

    // Skip header
    const dataLines = lines.slice(1).filter(line => line.trim() !== '');

    let updatedCount = 0;

    dataLines.forEach(line => {
        // Simple CSV parse: tier,category,title,url
        const parts = line.split(',');
        if (parts.length < 4) return;

        const tier = parts[0].trim();
        const category = parts[1].trim();
        const title = parts[2].trim();
        const url = parts[3].trim();

        // Extract keywords from CSV URL filename
        // e.g. ".../knee-extension-1.png" -> "knee-extension"
        const csvFileName = url.split('/').pop() || '';
        const csvBaseName = csvFileName.replace(/-\d+\.png$/, '').replace('.png', '');

        // Find matching item in JSON
        // We look for items where the fileName includes the csvBaseName
        const match = items.find(item =>
            item.tier === tier &&
            item.category === category &&
            (item.fileName.includes(csvBaseName) || csvBaseName.includes(item.fileName.replace('.png', '')))
        );

        if (match) {
            // Update if titleJa is missing or different
            if (match.titleJa !== title) {
                match.titleJa = title;
                updatedCount++;
                console.log(`Updated: ${match.fileName} -> ${title}`);
            }
        } else {
            console.log(`No match found for CSV item: ${csvFileName}`);
        }
    });

    fs.writeFileSync(ITEMS_PATH, JSON.stringify(items, null, 2));
    console.log(`Total items updated: ${updatedCount}`);
}

updateTitles();
