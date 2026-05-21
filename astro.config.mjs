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
        build: {
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (id.includes('node_modules/gsap')) {
                            return 'gsap';
                        }
                    },
                },
            },
        },
    },
    server: {
        port: Number(process.env.PORT) || 3000,
        host: true,
    },
});
