/**
 * PSYCHOLOGY ATLAS — XAVFSIZ BACKEND SERVER (Zero-Dependency Node.js HTTP + AI Proxy)
 *
 * Vazifasi:
 * 1. .env faylidan API kalitini faqat backend xotirasiga xavfsiz yuklash (frontendga hech qachon chiqarilmaydi).
 * 2. Statik frontend modullarini xizmat ko'rsatish (.env va yashirin fayllarga kirishni 403 bilan taqiqlash).
 * 3. /api/ai/status va /api/ai/chat orqali AI Ustoz so'rovlarini xavfsiz bajarish.
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;

/**
 * .env faylini tashqi kutubxonasiz xavfsiz o'qish
 */
function loadDotEnv() {
    const envPath = path.join(ROOT_DIR, '.env');
    if (!fs.existsSync(envPath)) return;
    try {
        const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
        lines.forEach(function (line) {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('#')) return;
            const eqIdx = trimmed.indexOf('=');
            if (eqIdx === -1) return;
            const key = trimmed.slice(0, eqIdx).trim();
            const val = trimmed.slice(eqIdx + 1).trim().replace(/^['"]|['"]$/g, '');
            if (key && !process.env[key]) {
                process.env[key] = val;
            }
        });
    } catch (err) {
        console.warn('.env faylini o‘qishda xatolik:', err.message);
    }
}

loadDotEnv();

const PORT = Number(process.env.PORT) || 3000;

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.ico': 'image/x-icon'
};

function sendJson(res, statusCode, payload) {
    res.writeHead(statusCode, {
        'Content-Type': 'application/json; charset=utf-8',
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': 'no-store'
    });
    res.end(JSON.stringify(payload));
}

function readJsonBody(req) {
    return new Promise(function (resolve, reject) {
        let raw = '';
        req.on('data', function (chunk) {
            raw += chunk;
            if (raw.length > 256 * 1024) {
                reject(new Error('So‘rov hajmi haddan tashqari katta'));
            }
        });
        req.on('end', function () {
            try {
                resolve(raw ? JSON.parse(raw) : {});
            } catch (e) {
                reject(new Error('Noto‘g‘ri JSON formati'));
            }
        });
        req.on('error', reject);
    });
}

function callGeminiApi(apiKey, systemInstruction, userPrompt) {
    return new Promise(function (resolve, reject) {
        const postData = JSON.stringify({
            system_instruction: { parts: [{ text: systemInstruction }] },
            contents: [{ role: 'user', parts: [{ text: userPrompt }] }]
        });

        const headers = {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        };

        let requestPath = '/v1beta/models/gemini-2.5-flash:generateContent?key=' + encodeURIComponent(apiKey);
        if (apiKey.startsWith('ya29.')) {
            requestPath = '/v1beta/models/gemini-2.5-flash:generateContent';
            headers['Authorization'] = 'Bearer ' + apiKey;
        }

        const req = https.request({
            hostname: 'generativelanguage.googleapis.com',
            path: requestPath,
            method: 'POST',
            headers: headers,
            timeout: 12000
        }, function (res) {
            let body = '';
            res.on('data', function (d) { body += d; });
            res.on('end', function () {
                try {
                    const parsed = JSON.parse(body);
                    const text = parsed &&
                        parsed.candidates &&
                        parsed.candidates[0] &&
                        parsed.candidates[0].content &&
                        parsed.candidates[0].content.parts &&
                        parsed.candidates[0].content.parts[0] &&
                        parsed.candidates[0].content.parts[0].text;
                    if (text) {
                        resolve(text);
                    } else {
                        const apiErr = (parsed && parsed.error && parsed.error.message)
                            ? parsed.error.message
                            : 'Tashqi AI javobi qaytmadi';
                        reject(new Error(apiErr));
                    }
                } catch (err) {
                    reject(err);
                }
            });
        });
        req.on('timeout', function () {
            req.destroy(new Error('AI server kutish vaqti tugadi'));
        });
        req.on('error', reject);
        req.write(postData);
        req.end();
    });
}

const server = http.createServer(async function (req, res) {
    const parsedUrl = new URL(req.url, 'http://localhost:' + PORT);
    const pathname = decodeURIComponent(parsedUrl.pathname);

    // 1. /api/ai/status
    if (pathname === '/api/ai/status' && req.method === 'GET') {
        const geminiKey = process.env.GEMINI_API_KEY || '';
        const openaiKey = process.env.OPENAI_API_KEY || '';
        const configured = Boolean(geminiKey || openaiKey);
        return sendJson(res, 200, {
            ok: true,
            aiConfigured: configured,
            provider: geminiKey ? 'Google Gemini API (Backend)' : (openaiKey ? 'OpenAI API (Backend)' : 'local-atlas-engine')
        });
    }

    // 2. /api/ai/chat
    if (pathname === '/api/ai/chat' && req.method === 'POST') {
        try {
            const body = await readJsonBody(req);
            const geminiKey = process.env.GEMINI_API_KEY || '';
            if (!geminiKey) {
                return sendJson(res, 200, {
                    ok: false,
                    aiConfigured: false,
                    fallbackToGrounded: true,
                    message: 'GEMINI_API_KEY sozlanmagan. Mahalliy tasdiqlangan Atlas bazasi ishlatiladi.'
                });
            }
            const sysPrompt =
                'Sen PSYCHOLOGY ATLAS platformasining ilmiy-akademik AI Psixologiya Ustozisan. ' +
                'Faqat o‘zbek tilida (lotin yozuvida) javob ber. ' +
                'Birinchi navbatda quyidagi tasdiqlangan Atlas kontekstiga tayan, manbani ko‘rsat, fakt va taxminni ajrat, mavjud bo‘lmagan manbani to‘qib chiqarma.';
            const promptText =
                'Rejim: ' + (body.mode || 'ustoz') + '\n' +
                'Tasdiqlangan Atlas konteksti: ' + (body.verifiedContext || '') + '\n' +
                'Manbalar: ' + ((body.sources || []).join('; ')) + '\n' +
                'Foydalanuvchi savoli: ' + (body.query || '');

            try {
                const replyText = await callGeminiApi(geminiKey, sysPrompt, promptText);
                return sendJson(res, 200, {
                    ok: true,
                    isExternalAi: true,
                    title: 'AI Psixologiya Ustoz (' + (body.mode || 'ustoz') + ' rejimi)',
                    reply: replyText
                });
            } catch (aiErr) {
                // Tashqi API xatolik qaytarsa, saytni to'xtatmasdan tasdiqlangan bazaga xavfsiz fallback qilamiz
                return sendJson(res, 200, {
                    ok: false,
                    fallbackToGrounded: true,
                    providerNotice: aiErr.message
                });
            }
        } catch (err) {
            return sendJson(res, 200, {
                ok: false,
                fallbackToGrounded: true,
                error: err.message
            });
        }
    }

    // 3. Statik fayllar xizmati (.env va yashirin fayllarni qat'iy bloklash)
    let safeRelPath = pathname === '/' ? '/index.html' : pathname;
    const baseName = path.basename(safeRelPath);
    if (baseName.startsWith('.') || safeRelPath.indexOf('/.') !== -1) {
        res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end('403 — Maxfiy faylga ruxsat yo‘q');
    }

    const filePath = path.normalize(path.join(ROOT_DIR, safeRelPath));
    if (!filePath.startsWith(ROOT_DIR)) {
        res.writeHead(403);
        return res.end('Forbidden');
    }

    fs.stat(filePath, function (err, stat) {
        if (err || !stat.isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            return res.end('404 — Fayl topilmadi');
        }
        const ext = path.extname(filePath).toLowerCase();
        const mime = MIME_TYPES[ext] || 'application/octet-stream';
        res.writeHead(200, {
            'Content-Type': mime,
            'X-Content-Type-Options': 'nosniff'
        });
        fs.createReadStream(filePath).pipe(res);
    });
});

server.listen(PORT, function () {
    console.log('============================================================');
    console.log(' PSYCHOLOGY ATLAS — PREMIUM INTERACTIVE KNOWLEDGE PLATFORM');
    console.log(' Server manzili: http://localhost:' + PORT);
    console.log(' AI API holati : ' + (process.env.GEMINI_API_KEY ? 'GEMINI_API_KEY (.env orqali backendga yuklandi)' : 'Mahalliy Tasdiqlangan Atlas Bazasi rejimi'));
    console.log('============================================================');
});
