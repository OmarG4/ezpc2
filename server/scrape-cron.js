import sql from './db.js';

async function scrapeAndStoreData() {
    try {
        const response = await fetch(`https://api.apify.com/v2/actor-tasks/og05~pcpartpicker-combined-parts/run-sync-get-dataset-items?token=${process.env.APIFY_TOKEN}`);
        const items = await response.json();
        
        await sql`DELETE FROM parts`; // Optional: clear old data first

        for (const item of items) {
          const [category] = Object.keys(item); // e.g. 'cpu'
          const partsArray = item[category];    // the array of parts
        
          if (!Array.isArray(partsArray)) {
            console.warn(`⚠️ Skipping invalid category: ${category}`);
            continue;
          }

          for (const part of partsArray) {
            let name = part.name?.trim();
            name = name.replace(/\s*\([^)]*\)$/, '');
            const price = extractPrice(part.price);
            const url = part.url;
        
            if (!name || !price || !url) continue;
        
            await sql`INSERT INTO parts (category, name, price, url) VALUES (${category}, ${name}, ${price}, ${url})`;
          }
        }

    } catch (error) {
        console.log("Error with scraping, error - ", error);
    }
}

// helper to clean price strings
function extractPrice(rawPrice) {
    const match = rawPrice?.match(/\$?([\d,.]+)/);
    return match ? parseFloat(match[1].replace(',', '')) : null;
}


// if (import.meta.url === `file://${process.argv[1]}`) {
//     scrapeAndStoreData();
// }


export default scrapeAndStoreData;