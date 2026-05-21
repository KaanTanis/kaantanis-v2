// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    site: 'https://kaantanis.com',
    output: 'server',
    adapter: node({ mode: 'standalone' }),
    vite: {
        plugins: [tailwindcss()],
    },
    server: {
        port: Number(process.env.PORT) || 3000,
        host: true,
    },
});
