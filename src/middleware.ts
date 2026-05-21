import { defineMiddleware } from 'astro:middleware';

const permanentRedirects: Record<string, string> = {
    '/hakkimda': '/#about',
    '/projeler': '/',
    '/bloglar': '/',
};

export const onRequest = defineMiddleware(async (context, next) => {
    const pathname = context.url.pathname.replace(/\/$/, '') || '/';

    if (pathname in permanentRedirects) {
        const target = permanentRedirects[pathname];
        return context.redirect(target, 301);
    }

    if (pathname.startsWith('/projeler/') || pathname.startsWith('/bloglar/')) {
        return context.redirect('/', 301);
    }

    return next();
});
