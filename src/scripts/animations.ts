import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = (): boolean =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

type SceneRunner = () => void;

const sceneCleanups: Array<() => void> = [];

function runScene(sceneId: string, runner: SceneRunner) {
    const root = document.querySelector(`[id='${sceneId}']`);
    if (!root) return;
    runner();
}

// =====================================================
// HERO — original reference parity (LOCKED)
// =====================================================
function heroSafeScene() {
    runScene('hero', () => {
        const heroSection = document.querySelector('#hero');
        if (!heroSection) return;

        const playHeroAnimation = () => {
            gsap.from('#designer', { duration: 1, x: -100, opacity: 0, ease: 'back' });
            gsap.from('#developer', { duration: 1, x: 100, opacity: 0, ease: 'back' });
            gsap.from('#designer_image', { duration: 1, y: -100, opacity: 0, ease: 'back' });
            gsap.from('#developer_image', { duration: 1, y: 100, opacity: 0, ease: 'back' });
            gsap.from('#hero_title_1', { duration: 0.5, opacity: 0, delay: 0.2 });
            gsap.from('#hero_title_2', { duration: 0.5, opacity: 0, delay: 0.5 });
        };

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        playHeroAnimation();
                        observer.disconnect();
                    }
                });
            });
            observer.observe(heroSection);
            sceneCleanups.push(() => observer.disconnect());
        } else {
            playHeroAnimation();
        }
    });
}

// =====================================================
// REVEAL — generic [data-reveal] entrance
// =====================================================
function revealScene() {
    const items = gsap.utils.toArray<HTMLElement>('[data-reveal]');
    items.forEach((el) => {
        const delay = Number(el.dataset.revealDelay ?? 0);
        gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'expo.out',
            delay,
            scrollTrigger: { trigger: el, start: 'top 88%' },
        });
    });
}

// =====================================================
// ABOUT — Workspace OS scene
// =====================================================
function aboutOsScene() {
    runScene('about', () => {
        const windows = gsap.utils.toArray<HTMLElement>('.os-window');
        windows.forEach((win, i) => {
            gsap.from(win, {
                opacity: 0,
                y: 50,
                scale: 0.97,
                duration: 0.85,
                ease: 'power3.out',
                delay: i * 0.06,
                scrollTrigger: { trigger: win, start: 'top 88%' },
            });
        });

        // Animate skill bars when activity window enters
        const skillBars = gsap.utils.toArray<HTMLElement>('.os-skill-bar span');
        skillBars.forEach((bar) => {
            const targetWidth = (bar.style as CSSStyleDeclaration).getPropertyValue('--w') || '100%';
            gsap.fromTo(
                bar,
                { width: '0%' },
                {
                    width: targetWidth,
                    duration: 1.1,
                    ease: 'power2.out',
                    scrollTrigger: { trigger: bar, start: 'top 92%' },
                },
            );
        });

        // Subtle parallax to finder photos
        const photos = gsap.utils.toArray<HTMLElement>('.os-photo');
        photos.forEach((photo, i) => {
            gsap.to(photo, {
                y: i === 0 ? -8 : i === 1 ? 6 : -4,
                ease: 'none',
                scrollTrigger: {
                    trigger: '#about',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                },
            });
        });

        // Stickies tilt jitter on hover already in CSS; add entrance pop
        const notes = gsap.utils.toArray<HTMLElement>('.os-note');
        notes.forEach((note, i) => {
            gsap.from(note, {
                opacity: 0,
                y: 16,
                rotate: 0,
                duration: 0.6,
                delay: i * 0.06,
                ease: 'power3.out',
                scrollTrigger: { trigger: note, start: 'top 92%' },
            });
        });
    });
}

// =====================================================
// PROCESS — Slab stack scene (no pin, scroll-driven indicators)
// =====================================================
function processSlabScene() {
    runScene('process', () => {
        const section = document.querySelector<HTMLElement>('#process');
        const slabs = gsap.utils.toArray<HTMLElement>('.slab');
        const railItems = gsap.utils.toArray<HTMLElement>('.slab-rail-item');
        if (!section || slabs.length === 0) return;

        // Section enter: reveal rail
        ScrollTrigger.create({
            trigger: section,
            start: 'top 60%',
            end: 'bottom top+=100',
            onToggle: (self) => {
                section.dataset.railVisible = self.isActive ? 'true' : 'false';
            },
        });

        slabs.forEach((slab, index) => {
            const numeralWrap = slab.querySelector<HTMLElement>('[data-slab-numeral]');
            const frame = slab.querySelector<HTMLElement>('[data-slab-frame]');
            const title = slab.querySelector<HTMLElement>('.slab-title');
            const text = slab.querySelector<HTMLElement>('.slab-text');
            const tag = slab.querySelector<HTMLElement>('.slab-tag');

            // Slab entry
            if (numeralWrap) {
                gsap.from(numeralWrap, {
                    opacity: 0,
                    x: -60,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: slab, start: 'top 70%' },
                });
            }
            if (frame) {
                gsap.from(frame, {
                    opacity: 0,
                    y: 40,
                    scale: 0.96,
                    duration: 0.9,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: slab, start: 'top 70%' },
                });
            }
            if (title) {
                gsap.from(title, {
                    opacity: 0,
                    y: 28,
                    duration: 0.7,
                    delay: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: slab, start: 'top 70%' },
                });
            }
            if (text) {
                gsap.from(text, {
                    opacity: 0,
                    y: 20,
                    duration: 0.7,
                    delay: 0.18,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: slab, start: 'top 70%' },
                });
            }
            if (tag) {
                gsap.from(tag, {
                    opacity: 0,
                    y: 14,
                    duration: 0.6,
                    delay: 0.25,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: slab, start: 'top 70%' },
                });
            }

            // Numeral scrub parallax
            if (numeralWrap) {
                gsap.to(numeralWrap, {
                    yPercent: -10,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: slab,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1,
                    },
                });
            }

            // Active rail item while slab in viewport
            ScrollTrigger.create({
                trigger: slab,
                start: 'top 55%',
                end: 'bottom 45%',
                onToggle: (self) => {
                    railItems.forEach((item, i) => {
                        item.classList.toggle('is-active', i === index && self.isActive);
                    });
                },
            });
        });

        // Rail click to jump
        railItems.forEach((item, i) => {
            item.addEventListener('click', () => {
                const target = slabs[i];
                if (!target) return;
                const top = target.getBoundingClientRect().top + window.scrollY - 60;
                window.scrollTo({ top, behavior: 'smooth' });
            });
        });
    });
}

// =====================================================
// CONTACT — Chat conversation cascade
// =====================================================
function contactChatScene() {
    runScene('contact', () => {
        const stream = document.querySelector<HTMLElement>('[data-chat-stream]');
        if (!stream) return;

        const bubbles = stream.querySelectorAll<HTMLElement>('[data-bubble]');
        gsap.set(bubbles, { opacity: 0, y: 16, scale: 0.97 });

        ScrollTrigger.create({
            trigger: stream,
            start: 'top 80%',
            once: true,
            onEnter: () => {
                gsap.to(bubbles, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    ease: 'power3.out',
                    stagger: 0.08,
                });
            },
        });

        // Stats counters subtle pop
        const stats = gsap.utils.toArray<HTMLElement>('.chat-stat');
        stats.forEach((stat, i) => {
            gsap.from(stat, {
                opacity: 0,
                y: 18,
                duration: 0.55,
                delay: i * 0.08,
                ease: 'power3.out',
                scrollTrigger: { trigger: stat, start: 'top 92%' },
            });
        });
    });
}

// =====================================================
// CHROME — Nav / Dock / Footer entrance
// =====================================================
function chromeScene() {
    const navShell = document.querySelector<HTMLElement>('.chrome-nav-shell');
    const dock = document.getElementById('mobile-dock');
    const footer = document.querySelector('.lab-footer-shell');

    if (navShell) {
        gsap.from(navShell, { y: -18, opacity: 0, duration: 0.6, ease: 'power2.out' });
    }
    if (dock) {
        gsap.from(dock, { y: 18, opacity: 0, duration: 0.55, ease: 'power2.out' });
    }
    if (footer) {
        gsap.from(footer, {
            opacity: 0,
            y: 20,
            duration: 0.65,
            ease: 'power2.out',
            scrollTrigger: { trigger: footer, start: 'top 92%' },
        });
    }
}

// =====================================================
// MAGNETIC BUTTONS
// =====================================================
function interactionScene() {
    if (prefersReducedMotion()) return;
    const targets = document.querySelectorAll<HTMLElement>('.btn-primary, .chat-send');
    targets.forEach((btn) => {
        if (btn.dataset.magnetic) return;
        btn.dataset.magnetic = '1';
        const strength = 8;

        const onMove = (e: MouseEvent) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(btn, {
                x: (x / rect.width) * strength,
                y: (y / rect.height) * strength,
                duration: 0.25,
                ease: 'power3.out',
            });
        };
        const onLeave = () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.45, ease: 'elastic.out(1, 0.55)' });
        };

        btn.addEventListener('mousemove', onMove);
        btn.addEventListener('mouseleave', onLeave);
        sceneCleanups.push(() => {
            btn.removeEventListener('mousemove', onMove);
            btn.removeEventListener('mouseleave', onLeave);
        });
    });
}

function clearScenes() {
    sceneCleanups.splice(0).forEach((fn) => fn());
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}

export function initAnimations() {
    clearScenes();

    if (prefersReducedMotion()) {
        document
            .querySelectorAll<HTMLElement>('[data-reveal], .os-window, .slab, [data-bubble]')
            .forEach((el) => {
                el.style.opacity = '1';
                el.style.transform = 'none';
            });
        document
            .querySelectorAll<HTMLElement>('.os-skill-bar span')
            .forEach((bar) => {
                const w = (bar.style as CSSStyleDeclaration).getPropertyValue('--w') || '100%';
                bar.style.width = w;
            });
        return;
    }

    heroSafeScene();
    revealScene();
    aboutOsScene();
    processSlabScene();
    contactChatScene();
    chromeScene();
    interactionScene();
    requestAnimationFrame(() => ScrollTrigger.refresh());
}

initAnimations();
document.addEventListener('astro:before-swap', clearScenes);
document.addEventListener('astro:page-load', initAnimations);
