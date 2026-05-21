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

function heroSafeScene() {
    runScene('hero', () => {
        const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
        tl.from('#hero_title_1', { opacity: 0, duration: 0.5, delay: 0.15 })
            .from('#hero_title_2', { opacity: 0, duration: 0.5 }, '-=0.2')
            .from('#designer', { x: -100, opacity: 0, duration: 1 }, 0)
            .from('#developer', { x: 100, opacity: 0, duration: 1 }, 0.1)
            .from('#designer_image', { y: -100, opacity: 0, duration: 1 }, 0)
            .from('#developer_image', { y: 100, opacity: 0, duration: 1 }, 0.1)
            .from('.hero-link', { opacity: 0, y: 16, duration: 0.6, stagger: 0.08 }, 0.45)
            .from('#hero_scroll_cue', { opacity: 0, duration: 0.35 }, 0.7);

        const cueTween = gsap.to('#hero_scroll_cue', {
            y: 6,
            duration: 1.15,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
        });
        sceneCleanups.push(() => cueTween.kill());
    });
}

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
            scrollTrigger: {
                trigger: el,
                start: 'top 88%',
            },
        });
    });
}

function aboutScene() {
    runScene('about', () => {
        const floatImages = gsap.utils.toArray<HTMLElement>('#about_image_1, #about_image_2, #about_image_3');
        floatImages.forEach((img, index) => {
            gsap.from(img, {
                opacity: 0,
                y: 30 + index * 8,
                rotate: index === 1 ? -6 : 6,
                duration: 0.9,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: img,
                    start: 'top 90%',
                },
            });

            gsap.to(img, {
                yPercent: index === 0 ? -4 : index === 1 ? 6 : -8,
                rotate: index === 1 ? -10 : 10,
                ease: 'none',
                scrollTrigger: {
                    trigger: '#about',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        });
    });
}

function processScene() {
    runScene('process', () => {
        const items = gsap.utils.toArray<HTMLElement>('.process-item');
        items.forEach((item, index) => {
            gsap.from(item, {
                opacity: 0,
                y: 48,
                x: index % 2 === 0 ? -24 : 24,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                },
            });

            gsap.to(item, {
                x: index % 2 === 0 ? 8 : -8,
                ease: 'none',
                scrollTrigger: {
                    trigger: item,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        });
    });
}

function contactScene() {
    runScene('contact', () => {
        gsap.from('#contactTitle', {
            opacity: 0,
            y: 28,
            duration: 0.9,
            ease: 'expo.out',
            scrollTrigger: {
                trigger: '#contactTitle',
                start: 'top 88%',
            },
        });

        gsap.from('#contact-form .input, #contact-form .chip, #contact-submit', {
            opacity: 0,
            y: 20,
            duration: 0.45,
            stagger: 0.05,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '#contact-form',
                start: 'top 86%',
            },
        });
    });
}

function interactionScene() {
    if (prefersReducedMotion()) return;
    const targets = document.querySelectorAll<HTMLElement>('.btn-primary');
    targets.forEach((btn) => {
        if (btn.dataset.magnetic) return;
        btn.dataset.magnetic = '1';
        const strength = 10;

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
        document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
        return;
    }

    heroSafeScene();
    revealScene();
    aboutScene();
    processScene();
    contactScene();
    interactionScene();
    requestAnimationFrame(() => ScrollTrigger.refresh());
}

initAnimations();
document.addEventListener('astro:before-swap', clearScenes);
document.addEventListener('astro:page-load', initAnimations);
