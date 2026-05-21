const sectionIds = ['hero', 'about', 'process', 'contact'] as const;

function setActive(id: string) {
    document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]').forEach((link) => {
        link.dataset.active = link.dataset.navLink === `#${id}` ? 'true' : 'false';
    });
    document.querySelectorAll<HTMLAnchorElement>('[data-dock-link]').forEach((link) => {
        link.dataset.active = link.dataset.dockLink === id ? 'true' : 'false';
    });
}

function initNavSpy() {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
        (entries) => {
            const visible = entries
                .filter((e) => e.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
            if (visible?.target.id) setActive(visible.target.id);
        },
        { rootMargin: '-40% 0px -45% 0px', threshold: [0, 0.25, 0.5, 0.75] },
    );

    sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
    });
}

initNavSpy();
document.addEventListener('astro:page-load', initNavSpy);
