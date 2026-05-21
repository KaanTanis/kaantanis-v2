# kaantanis.com

Minimal kişisel site — Astro 6, Tailwind CSS 4, Node adapter (PM2).

## Geliştirme

```bash
npm install
cp .env.example .env
npm run dev
```

Node **≥ 22.12** gerekir.

## Production build & PM2

```bash
cp .env.example .env
# .env içinde PORT, HOST ve isteğe bağlı Telegram değerlerini düzenle

npm run build
mkdir -p logs
pm2 start ecosystem.config.cjs
pm2 save
```

Nginx upstream portu `.env` içindeki `PORT` ile aynı olmalı, örn. `proxy_pass http://127.0.0.1:3000;`

### Canlıya alma kontrol listesi

- [ ] `.env` — `PORT`, `HOST`, `NODE_ENV` (+ isteğe bağlı `TELEGRAM_*`)
- [ ] `npm run build` hatasız
- [ ] `POST /api/contact` test (form + rate limit)
- [ ] Google Search Console — sitemap gönder, URL denetimi
- [ ] Eski URL 301: `/hakkimda`, `/projeler`, `/bloglar`
- [ ] `public/og-image.webp` paylaşım önizlemesinde görünüyor mu

## Performans

```bash
npm run optimize:fonts   # woff2: brew install woff2
npm run optimize:images  # cwebp: brew install webp
npm run build
npm run perf:lighthouse           # mobil rapor → lighthouse-mobile.html
npm run perf:lighthouse:desktop   # masaüstü rapor
```

Canlıda statik cache için Nginx snippet: [`deploy/nginx-static-cache.conf`](deploy/nginx-static-cache.conf) — `try_files` / `@proxy` adını kendi `kaantanis-v2.conf` upstream bloğuna göre düzenleyin.

Ana sayfa hibrit prerender (`index.astro`); `/api/contact` SSR kalır.

## Görseller (WebP)

Yeni jpg/png eklediğinde:

```bash
npm run optimize:images   # cwebp gerekir: brew install webp
```

Ardından `src/data/site.ts` içinde yolları `.webp` yap.

## Telegram form bildirimleri

1. [@BotFather](https://t.me/BotFather) ile bot oluşturun.
2. `TELEGRAM_BOT_TOKEN` değerini `.env` dosyasına ekleyin.
3. Chat ID için bota bir mesaj atın, ardından `https://api.telegram.org/bot<TOKEN>/getUpdates` ile `chat.id` alın.
4. `TELEGRAM_CHAT_ID` değerini `.env` dosyasına ekleyin; `pm2 restart kaantanis`

Yapılandırma yoksa form yine başarı döner; gönderim sunucu loglarına yazılır.

## SEO

- Başlık ve açıklama (`site.ts`)
- `robots.txt`, `sitemap.xml`, JSON-LD, Google doğrulama meta
- OG görsel: `/og-image.webp` (1200×630)
- `/hakkimda`, `/projeler`, `/bloglar` → 301 ana sayfa / `#about`
