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
function aboutScene() {
    runScene('about', () => {
        const chips = gsap.utils.toArray<HTMLElement>('.about-chip');
        if (chips.length) {
            gsap.from(chips, {
                opacity: 0,
                y: 10,
                scale: 0.98,
                duration: 0.5,
                ease: 'power3.out',
                stagger: 0.025,
                scrollTrigger: { trigger: '.about-chips', start: 'top 88%' },
            });
        }
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
                        const active = i === index && self.isActive;
                        item.classList.toggle('is-active', active);
                        item.setAttribute('aria-current', active ? 'step' : 'false');
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
    const footer = document.querySelector<HTMLElement>('.lab-footer');

    if (navShell) {
        gsap.from(navShell, { y: -18, opacity: 0, duration: 0.6, ease: 'power2.out' });
    }
    if (dock) {
        gsap.from(dock, { y: 18, opacity: 0, duration: 0.55, ease: 'power2.out' });
    }
    if (footer) {
        // immediateRender: false — footer görünür kalır, scroll'da fade-in oynar
        gsap.from(footer, {
            opacity: 0,
            y: 16,
            duration: 0.55,
            ease: 'power2.out',
            immediateRender: false,
            scrollTrigger: {
                trigger: footer,
                start: 'top bottom-=32',
                once: true,
            },
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
    gsap.set('.lab-footer, .lab-footer-shell, .chrome-nav-shell, #mobile-dock', {
        clearProps: 'opacity,transform,y',
    });
}

export function initAnimations() {
    clearScenes();

    if (prefersReducedMotion()) {
        document
            .querySelectorAll<HTMLElement>(
                '[data-reveal], .about-chip, .slab, [data-bubble], .lab-footer, .lab-footer-shell',
            )
            .forEach((el) => {
                el.style.opacity = '1';
                el.style.transform = 'none';
            });
        return;
    }

    heroSafeScene();
    revealScene();
    aboutScene();
    processSlabScene();
    contactChatScene();
    chromeScene();
    interactionScene();
    requestAnimationFrame(() => ScrollTrigger.refresh());
}

initAnimations();
document.addEventListener('astro:before-swap', clearScenes);
document.addEventListener('astro:page-load', initAnimations);
