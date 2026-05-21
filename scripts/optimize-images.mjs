#!/usr/bin/env node
/**
 * public/assets/img — WebP optimize + responsive variants
 * Kullanım: npm run optimize:images
 * Gereksinim: cwebp (brew install webp)
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const imgDir = path.join(process.cwd(), 'public', 'assets', 'img');

const heroVariants = [400, 800];
const processMaxWidth = 960;
const defaultMaxWidth = 1200;

function hasCwebp() {
    try {
        execSync('which cwebp', { stdio: 'ignore' });
        return true;
    } catch {
        return false;
    }
}

function toWebp(input, output, { quality, width = 0 }) {
    const resize = width > 0 ? `-resize ${width} 0` : '';
    execSync(`cwebp -q ${quality} -m 6 ${resize} "${input}" -o "${output}"`, {
        stdio: 'pipe',
    });
}

function findSource(baseName) {
    for (const ext of ['.webp', '.png', '.jpg', '.jpeg']) {
        const p = path.join(imgDir, `${baseName}${ext}`);
        if (fs.existsSync(p)) return p;
    }
    return null;
}

if (!hasCwebp()) {
    console.error('cwebp bulunamadı. Kurulum: brew install webp');
    process.exit(1);
}

const heroBases = ['designer', 'developer'];
const processBases = ['strateji', 'prototip', 'gelistirme'];

for (const base of heroBases) {
    const source = findSource(base);
    if (!source) {
        console.warn(`⚠ Kaynak bulunamadı: ${base}`);
        continue;
    }
    const mainOut = path.join(imgDir, `${base}.webp`);
    toWebp(source, mainOut, { quality: 75, width: defaultMaxWidth });
    console.log(`✓ ${base}.webp`);

    for (const w of heroVariants) {
        const variantOut = path.join(imgDir, `${base}-w${w}.webp`);
        toWebp(source, variantOut, { quality: 75, width: w });
        console.log(`  → ${base}-w${w}.webp`);
    }
}

for (const base of processBases) {
    const source = findSource(base);
    if (!source) continue;
    const out = path.join(imgDir, `${base}.webp`);
    toWebp(source, out, { quality: 72, width: processMaxWidth });
    console.log(`✓ ${base}.webp (${processMaxWidth}px)`);
}

const loose = fs.readdirSync(imgDir).filter((f) => /\.(jpe?g|png)$/i.test(f));
for (const file of loose) {
    const input = path.join(imgDir, file);
    const base = file.replace(/\.(jpe?g|png)$/i, '');
    if (heroBases.includes(base) || processBases.includes(base)) continue;
    const output = path.join(imgDir, `${base}.webp`);
    toWebp(input, output, { quality: 80, width: defaultMaxWidth });
    console.log(`✓ ${file} → ${base}.webp`);
}

console.log('\nTamamlandı.');
