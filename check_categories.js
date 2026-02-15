
const fs = require('fs');
const path = require('path');

const itemsPath = path.join(__dirname, 'data', 'items.json');
try {
    const itemsData = JSON.parse(fs.readFileSync(itemsPath, 'utf8'));
    const categories = [...new Set(itemsData.map(i => i.category))];
    console.log('Categories found:', categories);
} catch (e) {
    console.error('Error reading items:', e);
}
