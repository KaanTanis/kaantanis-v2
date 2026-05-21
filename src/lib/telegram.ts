export type ContactPayload = {
    name: string;
    email: string;
    phone: string;
    services: string[];
    budget: string;
    message: string;
};

function env(name: string): string | undefined {
    return process.env[name] ?? import.meta.env[name];
}

export function isTelegramConfigured(): boolean {
    return Boolean(env('TELEGRAM_BOT_TOKEN') && env('TELEGRAM_CHAT_ID'));
}

function escapeHtml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

export function formatContactMessage(payload: ContactPayload): string {
    const services = payload.services.length ? payload.services.join(', ') : '—';

    return [
        '<b>📩 Yeni teklif formu</b>',
        '',
        `<b>Ad:</b> ${escapeHtml(payload.name)}`,
        `<b>E-posta:</b> ${escapeHtml(payload.email)}`,
        `<b>Telefon:</b> ${escapeHtml(payload.phone)}`,
        `<b>Hizmetler:</b> ${escapeHtml(services)}`,
        `<b>Bütçe:</b> ${escapeHtml(payload.budget)}`,
        '',
        `<b>Mesaj:</b>`,
        escapeHtml(payload.message),
    ].join('\n');
}

export async function sendTelegramMessage(html: string): Promise<{ ok: boolean; error?: string }> {
    const token = env('TELEGRAM_BOT_TOKEN');
    const chatId = env('TELEGRAM_CHAT_ID');

    if (!token || !chatId) {
        return { ok: false, error: 'Telegram yapılandırılmamış' };
    }

    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            text: html,
            parse_mode: 'HTML',
            disable_web_page_preview: true,
        }),
    });

    const data = (await response.json()) as { ok?: boolean; description?: string };

    if (!response.ok || !data.ok) {
        return { ok: false, error: data.description ?? 'Telegram API hatası' };
    }

    return { ok: true };
}
