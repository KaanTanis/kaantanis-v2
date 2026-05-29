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
    imageSrcset: '/assets/img/designer-w400.webp 400w, /assets/img/designer-w800.webp 800w, /assets/img/designer.webp 1200w',
    imageSizes: '(max-width: 640px) 46vw, 300px',
    image2: '/assets/img/developer.webp',
    image2Srcset: '/assets/img/developer-w400.webp 400w, /assets/img/developer-w800.webp 800w, /assets/img/developer.webp 1200w',
    image2Sizes: '(max-width: 640px) 46vw, 300px',
    github: 'KaanTanis',
    whatsapp: '+90 (544) 237 3323',
    whatsappLink: '905442373323',
    email: 'kt@kaantanis.com',
} as const;

export const about = {
    eyebrow: 'Hakkımda',
    title: 'Simple outside.<br/><em>Powerful</em> inside.',
    body: [
        'Modern teknolojilerle <strong>uçtan uca ürün geliştiren</strong>, sistemi kurup yöneten ve canlıya alma süreçlerini yürüten bir <strong>Full-Stack geliştiriciyim</strong>. Web sitesi ve mobil uygulama — ikisinde de aynı özeni taşırım.',
        'Size <strong>işlevsel ve performanslı</strong> projeler sunarım: kullanıcı ekranda rahat eder, siz arka planda sürprizlerle uğraşmazsınız. Görünüm sade, işleyiş net; karmaşıklık yerine <strong>anlaşılır bir deneyim</strong> önceliğimdir.',
        'Fikirden yayına kadar tek elden ilerleyebilirim; ekiple çalışırken de iletişimi kısa ve anlaşılır tutarım. Ölçüt her zaman aynı: işinize değer katan, uzun süre güvenle kullanabileceğiniz dijital ürünler.',
    ],
} as const;

export const techStack = {
    label: 'Meraklılar için',
    title: 'Kullandığım teknolojiler',
    preview: ['Laravel', 'React', 'Docker', 'Linux'],
    groups: [
        {
            label: 'Frontend',
            items: ['TypeScript', 'React', 'Next.js', 'Astro', 'Tailwind CSS', 'Figma'],
        },
        {
            label: 'Backend & API',
            items: ['Laravel', 'Livewire', 'Node.js', 'PHP', 'Go', 'REST API', 'WebSocket'],
        },
        {
            label: 'Veritabanı',
            items: ['MySQL', 'PostgreSQL', 'SQLite', 'Redis', 'Elasticsearch'],
        },
        {
            label: 'Altyapı & DevOps',
            items: ['Linux', 'Nginx', 'Docker', 'Supervisor', 'Bash', 'Git', 'CI/CD'],
        },
        {
            label: 'Operasyon & Güvenlik',
            items: [
                'Sunucu yönetimi',
                'Deployment süreçleri',
                'Performans optimizasyonu',
                'Socket sistemleri',
                'Sunucu güvenliği',
                'DDoS koruması',
                'Rate limiting',
            ],
        },
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
