#!/usr/bin/env node
/**
 * Gilroy TTF → WOFF2 (Medium, Bold, ExtraBold)
 * Kullanım: npm run optimize:fonts
 * Gereksinim: woff2_compress (brew install woff2)
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const fontDir = path.join(process.cwd(), 'public', 'fonts', 'gilroy');

const weights = [
    { file: 'Gilroy-Medium', weight: 500 },
    { file: 'Gilroy-Bold', weight: 700 },
    { file: 'Gilroy-ExtraBold', weight: 800 },
];

function hasWoff2() {
    try {
        execSync('which woff2_compress', { stdio: 'ignore' });
        return true;
    } catch {
        return false;
    }
}

if (!hasWoff2()) {
    console.error('woff2_compress bulunamadı. Kurulum: brew install woff2');
    process.exit(1);
}

for (const { file } of weights) {
    const ttf = path.join(fontDir, `${file}.ttf`);
    if (!fs.existsSync(ttf)) {
        console.error(`Eksik: ${ttf}`);
        process.exit(1);
    }
    execSync(`woff2_compress "${ttf}"`, { stdio: 'inherit' });
    const woff2 = path.join(fontDir, `${file}.woff2`);
    const size = fs.statSync(woff2).size;
    console.log(`✓ ${file}.woff2 (${Math.round(size / 1024)} KB)`);
}

console.log('\n3 font WOFF2 hazır. fonts.css ve preload yollarını kontrol et.');
