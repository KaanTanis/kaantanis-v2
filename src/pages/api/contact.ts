import type { APIRoute } from 'astro';
import { z } from 'zod';
import { contact } from '../../data/site';
import { isRateLimited } from '../../lib/rate-limit';
import {
    formatContactMessage,
    isTelegramConfigured,
    sendTelegramMessage,
    type ContactPayload,
} from '../../lib/telegram';

export const prerender = false;

const budgetLabels = Object.fromEntries(contact.budgets.map((b) => [String(b.value), b.label]));

const schema = z.object({
    name: z.string().trim().min(2).max(120),
    email: z.string().trim().email().max(255),
    phone: z.string().trim().min(5).max(40),
    services: z.array(z.string()).min(1),
    budget: z.coerce.number().refine((v) => [0, 25, 50, 75].includes(v)),
    message: z.string().trim().min(10).max(5000),
});

export const POST: APIRoute = async ({ request, clientAddress }) => {
    const ip = clientAddress ?? 'unknown';
    if (isRateLimited(ip)) {
        return json({ ok: false, message: 'Çok fazla istek. Lütfen bir dakika bekleyin.' }, 429);
    }

    let body: unknown;

    try {
        body = await request.json();
    } catch {
        return json({ ok: false, message: 'Geçersiz istek.' }, 400);
    }

    const parsed = schema.safeParse(body);

    if (!parsed.success) {
        return json({ ok: false, message: 'Lütfen tüm alanları kontrol edin.', errors: parsed.error.flatten() }, 422);
    }

    const payload: ContactPayload = {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        services: parsed.data.services,
        budget: budgetLabels[String(parsed.data.budget)] ?? String(parsed.data.budget),
        message: parsed.data.message,
    };

    if (!isTelegramConfigured()) {
        console.info('[contact] Telegram not configured. Submission:', {
            ...payload,
            ip: clientAddress,
        });

        return json({
            ok: true,
            message: 'Mesajınız alındı. (Telegram henüz yapılandırılmadı — sunucu loglarına yazıldı.)',
        });
    }

    const result = await sendTelegramMessage(formatContactMessage(payload));

    if (!result.ok) {
        console.error('[contact] Telegram error:', result.error);
        return json({ ok: false, message: 'Gönderim başarısız. Lütfen daha sonra tekrar deneyin.' }, 500);
    }

    return json({ ok: true, message: 'Mesajınız başarıyla gönderildi.' });
};

function json(data: object, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { 'Content-Type': 'application/json' },
    });
}
