import { site } from '../data/site';

declare global {
    interface Window {
        __gaLoaded?: boolean;
        dataLayer?: unknown[];
        gtag?: (...args: unknown[]) => void;
    }
}

export function loadAnalytics(): void {
    if (!import.meta.env.PROD || window.__gaLoaded) return;

    window.__gaLoaded = true;
    window.dataLayer = window.dataLayer || [];

    window.gtag = function gtag() {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer?.push(arguments);
    };

    window.gtag('js', new Date());
    window.gtag('config', site.gaId);

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${site.gaId}`;
    document.head.appendChild(script);
}

export function scheduleAnalytics(): void {
    if (!import.meta.env.PROD) return;

    const run = () => {
        try {
            if (localStorage.getItem('cookie-consent') === '1') {
                loadAnalytics();
            }
        } catch {
            /* ignore */
        }
    };

    if ('requestIdleCallback' in window) {
        requestIdleCallback(run, { timeout: 3000 });
    } else {
        window.addEventListener('load', () => setTimeout(run, 1500), { once: true });
    }
}
