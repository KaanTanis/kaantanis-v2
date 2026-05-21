export const site = {
    url: 'https://kaantanis.com',
    name: 'Kaan Tanış',
    title: 'Kaan Tanış - Software Developer & UI Designer',
    description:
        'Kaan Tanış, Software Developer & UI Designer. Laravel, Livewire, Design, Frontend, Backend, Full Stack Web Developer.',
    locale: 'tr_TR',
    twitter: '@kaantns',
    googleSiteVerification: 'G32AJZkQfctiXnbRQc-8bnEF-aXefwOr1Glxlv0BTN0',
    gaId: 'G-8JHJYRX80F',
    ogImage: '/og-image.webp',
    sameAs: [
        'https://www.instagram.com/kaan.tns',
        'https://www.linkedin.com/in/kaan-tanış-4a317a250/',
        'https://twitter.com/kaantns',
        'https://github.com/KaanTanis',
    ],
} as const;

export const hero = {
    title: 'Designer',
    title2: 'Developer',
    image: '/assets/img/designer.webp',
    image2: '/assets/img/developer.webp',
    github: 'KaanTanis',
    whatsapp: '+90 (544) 237 3323',
    whatsappLink: '905442373323',
    email: 'kt@kaantanis.com',
} as const;

export const about = {
    eyebrow: 'Hakkımda',
    title: 'Simple outside.<br/><em>Powerful</em> inside.',
    lead: 'Full-stack geliştirici & arayüz tasarımcısı',
    pillars: [
        { n: '01', title: 'Ürün', desc: 'Strateji → tasarım → teslim' },
        { n: '02', title: 'Stack', desc: 'Laravel · Go · Next · RN' },
        { n: '03', title: 'Sistem', desc: 'Docker · K8s · Redis' },
    ],
    highlights: [
        'Laravel',
        'Livewire',
        'Go',
        'Astro',
        'Vue',
        'Tailwind',
        'React Native',
        'Expo',
        'Docker',
        'Nginx',
        'Redis',
        'Figma',
        'Filament',
        'Inertia',
        'GSAP',
        'Stripe',
    ],
    /** Açılır teknik detay — ana görünümde değil */
    skillsDetail: [
        {
            label: 'Backend',
            tags: ['Laravel', 'Livewire', 'Filament', 'Go', 'Inertia', 'REST', 'MySQL', 'PostgreSQL', 'Pest'],
        },
        {
            label: 'Frontend',
            tags: ['Vue', 'Svelte', 'Alpine', 'Tailwind', 'Astro', 'Vite', 'Blade', 'GSAP'],
        },
        { label: 'Mobil', tags: ['React Native', 'Expo', 'Firebase', 'Android', 'iOS'] },
        {
            label: 'DevOps',
            tags: ['Docker', 'Nginx', 'Redis', 'Linux', 'PM2', 'ElasticSearch', 'Deployment'],
        },
        { label: 'UI/UX', tags: ['Figma', 'Wireframe', 'Design systems', 'Shadcn'] },
        { label: 'Entegrasyon', tags: ['Stripe', 'Pusher', 'Socket.IO', 'Telegram', 'AWS'] },
    ],
} as const;

export const steps = [
    {
        n: '01',
        kicker: 'Keşif',
        title: 'Strateji & Yol Haritası',
        content:
            'İlk toplantıda <strong>hedefleriniz ve istekleriniz</strong> doğrultusunda detaylı bir analiz yapılır. Rakip analizi, pazar araştırması ve hedef kitlenin belirlenmesi bu aşamada tamamlanır. Projenin <strong>kapsamı ve stratejik yol haritası</strong> çıkarılır.',
        image: '/assets/img/strateji.webp',
    },
    {
        n: '02',
        kicker: 'Tasarım',
        title: 'Taslak & Prototip',
        content:
            'Proje için bir <strong>taslak veya wireframe</strong> hazırlanır ve sizinle paylaşılır. Görsel tasarım unsurları üzerinde geri bildirimler alınarak <strong>iterasyonlar</strong> yapılır. Nihai prototip onaylanmadan önce gerekli düzenlemeler tamamlanır.',
        image: '/assets/img/prototip.webp',
    },
    {
        n: '03',
        kicker: 'Lansman',
        title: 'Geliştirme & Teslim',
        content:
            'Onaylanan prototip üzerinden proje geliştirilir. Teknik gereksinimler ve işlevsellikler tamamlanır. Test aşaması gerçekleştirilir ve <strong>proje teslim edilir</strong>. Teslim sonrası <strong>destek ve bakım</strong> seçenekleri sunulur.',
        image: '/assets/img/gelistirme.webp',
    },
] as const;

export const contact = {
    eyebrow: 'İletişim',
    heading: 'Projenizi <em>birlikte</em> konuşalım',
    subheading: 'Hayalinizdeki dijital deneyimi birlikte tasarlayalım. 24 saat içinde dönüş yapıyorum.',
    services: [
        { id: 'ui-ux-design', label: 'UI/UX Design' },
        { id: 'backend-development', label: 'Backend Development' },
        { id: 'bug-fixing', label: 'Bug Fixing' },
        { id: 'other', label: 'Diğer / Bilmiyorum' },
    ],
    budgets: [
        { value: 0, label: '250$ – 600$' },
        { value: 25, label: '600$ – 1.200$' },
        { value: 50, label: '1.200$ – 2.500$' },
        { value: 75, label: '2.500$+' },
    ],
} as const;

export const navLinks = [
    { href: '#hero', label: 'Ana Sayfa' },
    { href: '#about', label: 'Hakkımda' },
    { href: '#process', label: 'Süreç' },
    { href: '#contact', label: 'İletişim' },
] as const;

export const dockLinks = [
    { href: '#hero', label: 'Ana Sayfa', id: 'hero' },
    { href: '#about', label: 'Hakkımda', id: 'about' },
    { href: '#process', label: 'Süreç', id: 'process' },
    { href: '#contact', label: 'İletişim', id: 'contact' },
] as const;

export const privacyPolicyHtml = `
<p>Bu site üzerinden paylaştığınız iletişim bilgileri yalnızca talebinize yanıt vermek amacıyla işlenir.</p>
<p>Çerezler, site deneyimini iyileştirmek ve anonim analitik için kullanılabilir.</p>
`.trim();

export const cookieNoticeHtml = `
<p>Çerezler; tercihlerinizi hatırlamak ve site performansını ölçmek için kullanılır.</p>
`.trim();
