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
        const heroSection = document.querySelector('#hero');
        if (!heroSection) return;

        const playHeroAnimation = () => {
            // Original site parity (speed + effect)
            gsap.from('#designer', {
                duration: 1,
                x: -100,
                opacity: 0,
                ease: 'back',
            });
            gsap.from('#developer', {
                duration: 1,
                x: 100,
                opacity: 0,
                ease: 'back',
            });
            gsap.from('#designer_image', {
                duration: 1,
                y: -100,
                opacity: 0,
                ease: 'back',
            });
            gsap.from('#developer_image', {
                duration: 1,
                y: 100,
                opacity: 0,
                ease: 'back',
            });
            gsap.from('#hero_title_1', {
                duration: 0.5,
                opacity: 0,
                delay: 0.2,
            });
            gsap.from('#hero_title_2', {
                duration: 0.5,
                opacity: 0,
                delay: 0.5,
            });
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
        const scenes = gsap.utils.toArray<HTMLElement>('.process-scene');
        const track = document.querySelector('.process-track');
        const stage = document.querySelector('.process-stage');
        const progressItems = gsap.utils.toArray<HTMLElement>('.process-progress-item');

        if (!track || !stage || scenes.length === 0) return;

        gsap.set(scenes, { autoAlpha: 0, y: 18, scale: 0.985 });
        gsap.set(scenes[0], { autoAlpha: 1, y: 0, scale: 1 });
        progressItems[0]?.classList.add('is-active');

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: track,
                start: 'top top+=84',
                end: 'bottom bottom',
                pin: stage,
                scrub: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    const idx = Math.min(scenes.length - 1, Math.floor(self.progress * scenes.length * 0.999));
                    progressItems.forEach((item, i) => {
                        item.classList.toggle('is-active', i <= idx);
                    });
                },
            },
        });

        for (let i = 1; i < scenes.length; i += 1) {
            tl.to(
                scenes[i - 1],
                {
                    autoAlpha: 0,
                    y: -16,
                    scale: 0.986,
                    duration: 0.55,
                    ease: 'power2.out',
                },
                i - 0.1,
            ).to(
                scenes[i],
                {
                    autoAlpha: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.55,
                    ease: 'power2.out',
                },
                i - 0.03,
            );
        }

        scenes.forEach((scene, index) => {
            const media = scene.querySelector<HTMLElement>('.scene-media img');
            const copy = scene.querySelector<HTMLElement>('.scene-copy');

            if (media) {
                gsap.fromTo(
                    media,
                    { scale: 1.08 },
                    {
                        scale: 1,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: track,
                            start: `${index * 33}% top`,
                            end: `${(index + 1) * 33}% top`,
                            scrub: true,
                        },
                    },
                );
            }

            if (copy) {
                gsap.from(copy, {
                    opacity: 0,
                    y: 18,
                    duration: 0.55,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: scene,
                        start: 'top 75%',
                    },
                });
            }
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
