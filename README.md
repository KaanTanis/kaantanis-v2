# kaantanis.com

Minimal kişisel site — Astro 6, Tailwind CSS 4, Node adapter (PM2).

## Geliştirme

```bash
npm install
cp .env.example .env
npm run dev
```

## Production build & PM2

```bash
npm run build
mkdir -p logs
pm2 start ecosystem.config.cjs
pm2 save
```

Nginx örneği: `proxy_pass http://127.0.0.1:3000;`

## Telegram form bildirimleri

1. [@BotFather](https://t.me/BotFather) ile bot oluşturun.
2. `TELEGRAM_BOT_TOKEN` değerini `.env` dosyasına ekleyin.
3. Chat ID için bota bir mesaj atın, ardından `https://api.telegram.org/bot<TOKEN>/getUpdates` ile `chat.id` alın.
4. `TELEGRAM_CHAT_ID` değerini `.env` ve PM2 `env` bloğuna ekleyin.

Yapılandırma yoksa form yine başarı döner; gönderim sunucu loglarına yazılır.

## SEO

- Başlık ve açıklama eski siteyle aynı (`site.ts`)
- `robots.txt`, `sitemap.xml`, JSON-LD, Google doğrulama meta
- `/hakkimda`, `/projeler`, `/bloglar` → 301 ana sayfa / `#about`
