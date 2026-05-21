#!/usr/bin/env node
/**
 * public/assets/img içindeki jpg/png dosyalarını webp'ye çevirir.
 * Kullanım: npm run optimize:images
 * Gereksinim: cwebp (brew install webp)
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const imgDir = path.join(process.cwd(), 'public', 'assets', 'img');
const quality = 82;
const maxWidth = 1600;

function hasCwebp() {
    try {
        execSync('which cwebp', { stdio: 'ignore' });
        return true;
    } catch {
        return false;
    }
}

if (!hasCwebp()) {
    console.error('cwebp bulunamadı. Kurulum: brew install webp');
    process.exit(1);
}

const files = fs.readdirSync(imgDir).filter((f) => /\.(jpe?g|png)$/i.test(f));

if (files.length === 0) {
    console.log('Dönüştürülecek jpg/png yok.');
    process.exit(0);
}

for (const file of files) {
    const input = path.join(imgDir, file);
    const base = file.replace(/\.(jpe?g|png)$/i, '');
    const output = path.join(imgDir, `${base}.webp`);
    execSync(`cwebp -q ${quality} -m 6 -resize ${maxWidth} 0 "${input}" -o "${output}"`, {
        stdio: 'inherit',
    });
    console.log(`✓ ${file} → ${base}.webp`);
}

console.log(`\n${files.length} dosya işlendi. site.ts yollarını .webp olarak güncellemeyi unutma.`);
