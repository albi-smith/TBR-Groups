const fs = require('fs');
const https = require('https');

async function checkUrl(url) {
    return new Promise((resolve) => {
        if (!url || typeof url !== 'string') return resolve(true);
        if (!url.startsWith('http')) return resolve(true);
        
        // Some sites block HEAD requests or return 403, but we care about 404
        const req = https.request(url, { method: 'GET', headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            resolve(res.statusCode < 400 && res.statusCode !== 404);
        });
        
        req.on('error', () => resolve(false));
        req.end();
    });
}

async function main() {
    const content = fs.readFileSync('src/data/servicesData.js', 'utf8');
    const subServiceRegex = /\{ name: '([^']+)', desc: '([^']*)', icon: '[^']+', image: '([^']+)' \}/g;
    let match;
    while ((match = subServiceRegex.exec(content)) !== null) {
        const name = match[1];
        const url = match[3];
        
        if (url.includes('pexels.com')) continue;
        
        const ok = await checkUrl(url);
        if (!ok) {
            console.log(`[Broken] ${name}: ${url}`);
        } else {
            // console.log(`[OK] ${name}`);
        }
    }
}

main();
