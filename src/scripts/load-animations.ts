function scheduleAnimations(): void {
    const run = () => import('./animations.ts').then((m) => m.initAnimations());

    if ('requestIdleCallback' in window) {
        requestIdleCallback(run, { timeout: 2000 });
    } else {
        setTimeout(run, 1);
    }
}

scheduleAnimations();
document.addEventListener('astro:page-load', scheduleAnimations);
