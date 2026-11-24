/**
 * PSYCHOLOGY ATLAS — BACKEND API VA AI USTOZ XIZMATI
 *
 * QAT'IY QOIDALAR:
 * 1. Hech qanday AI API kaliti frontend JavaScript kodida saqlanmaydi.
 * 2. Barcha tashqi AI so'rovlari faqat backend (/api/ai/chat) orqali yuboriladi.
 * 3. Agar backend yoki API kalit sozlanmagan bo'lsa (yoki offline rejimda bo'lsa),
 *    platforma xatoliksiz ishlashda davom etadi va Atlasning tasdiqlangan ilmiy bazasiga
 *    tayanuvchi Mahalliy Akademik Dvigatel (Grounded Knowledge Engine) javob qaytaradi.
 */
(function (window) {
    'use strict';

    let backendStatus = {
        checked: false,
        online: navigator.onLine,
        backendReachable: false,
        aiConfigured: false,
        provider: 'local-atlas-engine'
    };

    /**
     * Backend va AI API holatini tekshirish
     */
    async function checkBackendStatus() {
        backendStatus.online = navigator.onLine;
        if (window.location.protocol === 'file:' || !navigator.onLine) {
            backendStatus.checked = true;
            backendStatus.backendReachable = false;
            backendStatus.aiConfigured = false;
            return backendStatus;
        }
        try {
            const controller = new AbortController();
            const timer = setTimeout(function () { controller.abort(); }, 2200);
            const res = await fetch('/api/ai/status', { signal: controller.signal });
            clearTimeout(timer);
            if (res.ok) {
                const data = await res.json();
                backendStatus.checked = true;
                backendStatus.backendReachable = true;
                backendStatus.aiConfigured = !!data.aiConfigured;
                backendStatus.provider = data.provider || 'local-atlas-engine';
                return backendStatus;
            }
        } catch (_e) {
            // Backend ishga tushirilmagan yoki statik serverda
        }
        backendStatus.checked = true;
        backendStatus.backendReachable = false;
        backendStatus.aiConfigured = false;
        return backendStatus;
    }

    /**
     * Atlasning tasdiqlangan ma'lumotlar bazasidan qidiruv va manba ajratish
     */
    function retrieveVerifiedContext(query, topicId) {
        const data = window.PsychAtlasData;
        const edu = window.PsychAtlasEducation;
        const q = (query || '').toLowerCase().trim();
        const words = q.split(/\s+/).filter(function (w) { return w.length >= 3; });

        // 1. Tanlangan mavzu
        let primaryTopic = data.TOPICS.find(function (t) { return t.id === topicId; }) || null;

        // 2. So'rov bo'yicha eng mos mavzular va tugunlarni topish
        const matchedTopics = [];
        const matchedNodes = [];

        data.TOPICS.forEach(function (t) {
            let topicScore = (primaryTopic && t.id === primaryTopic.id) ? 3 : 0;
            const topicText = (t.title + ' ' + t.short + ' ' + t.summary).toLowerCase();
            words.forEach(function (w) {
                if (topicText.indexOf(w) !== -1) topicScore += 4;
            });
            if (topicScore > 0) matchedTopics.push({ topic: t, score: topicScore });

            (t._all || []).forEach(function (n) {
                let nodeScore = 0;
                const nodeText = (n.title + ' ' + (n.sub || '') + ' ' + (n.desc || '') + ' ' + (n.example || '')).toLowerCase();
                words.forEach(function (w) {
                    if (n.title.toLowerCase().indexOf(w) !== -1) nodeScore += 6;
                    else if (nodeText.indexOf(w) !== -1) nodeScore += 3;
                });
                if (nodeScore > 0) {
                    matchedNodes.push({ node: n, topic: t, score: nodeScore });
                }
            });
        });

        matchedTopics.sort(function (a, b) { return b.score - a.score; });
        matchedNodes.sort(function (a, b) { return b.score - a.score; });

        if (!primaryTopic && matchedTopics.length > 0) {
            primaryTopic = matchedTopics[0].topic;
        } else if (!primaryTopic && matchedNodes.length > 0) {
            primaryTopic = matchedNodes[0].topic;
        }

        // 3. Lug'atdan mos atamalarni topish
        const matchedTerms = (edu.GLOSSARY_TERMS || []).filter(function (term) {
            const hay = (term.termUz + ' ' + term.termIntl + ' ' + term.shortDef + ' ' + term.extendedDef).toLowerCase();
            return words.some(function (w) { return hay.indexOf(w) !== -1; });
        });

        // 4. Tarix va olimlardan moslarini topish
        const matchedScientists = (edu.SCIENTISTS || []).filter(function (sci) {
            const hay = (sci.name + ' ' + sci.coreTheory + ' ' + sci.contribution).toLowerCase();
            return words.some(function (w) { return hay.indexOf(w) !== -1; });
        });

        return {
            primaryTopic: primaryTopic || data.TOPICS[0],
            matchedTopics: matchedTopics.slice(0, 3).map(function (x) { return x.topic; }),
            matchedNodes: matchedNodes.slice(0, 5),
            matchedTerms: matchedTerms.slice(0, 3),
            matchedScientists: matchedScientists.slice(0, 2)
        };
    }

    /**
     * Tasdiqlangan Atlas materiallariga asoslangan Mahalliy Akademik Javob Generator
     * (5 ta AI rejimi va tezkor amallar uchun 100% ishonchli, manbali javob tuzadi)
     */
    function generateGroundedResponse(params) {
        const mode = params.mode || 'ustoz';
        const actionType = params.actionType || 'free';
        const query = (params.query || '').trim();
        const ctx = retrieveVerifiedContext(query, params.topicId);
        const topic = ctx.primaryTopic;
        const refs = (topic.references || []).map(function (r) {
            return r.author + '. «' + r.title + '» (' + r.publicationYear + ', ' + r.page + '-b.)';
        });
        const sourceText = refs.length ? refs.join('; ') : 'E.G‘. G‘oziyev. «Umumiy psixologiya» (2010)';

        // Agar foydalanuvchi aniq savol yozgan bo'lsa va hech qanday mos tugun/atama/olim topilmasa
        const hasSpecificQuery = query.length > 2 && actionType === 'free';
        const hasDirectMatch = ctx.matchedNodes.length > 0 || ctx.matchedTerms.length > 0 || ctx.matchedScientists.length > 0 || ctx.matchedTopics.length > 0;

        if (hasSpecificQuery && !hasDirectMatch) {
            return {
                mode: mode,
                isAiGenerated: false,
                foundInCorpus: false,
                title: 'Tasdiqlangan Atlas manbalarida to‘g‘ridan-to‘g‘ri ma’lumot topilmadi',
                contentHtml:
                    '<p class="mb-2"><b>Ochiq ilmiy eslatma:</b> Siz so‘ragan <em>«' + window.PsychAtlasUtils.escapeHtml(query) + '»</em> mavzusi bo‘yicha joriy tasdiqlangan Atlas bazasida (13 ta bazaviy mavzu va 36 ta lug‘at atamasi ichida) bevosita tasdiqlangan ma’lumot mavjud emas.</p>' +
                    '<p class="mb-2"><b>Ilmiy ishonchlilik qoidasi:</b> Platforma mavjud bo‘lmagan manbalarni to‘qib chiqarmaydi va taxminiy javobni tasdiqlangan ilmiy fakt sifatida taqdim etmaydi.</p>' +
                    '<p>Siz quyidagi eng yaqin tasdiqlangan mavzuni ko‘rib chiqishingiz mumkin: <b>' + topic.no + '-mavzu: ' + topic.title + '</b> — ' + topic.summary + '</p>',
                factVsHypothesis: 'Fakt: Javob faqat Atlasdagi tasdiqlangan akademik baza bilan chegaralandi. Taxmin kiritilmadi.',
                sources: [sourceText]
            };
        }

        const topNode = ctx.matchedNodes.length > 0 ? ctx.matchedNodes[0].node : topic._root;
        const secondNode = (topic._branches && topic._branches[0]) ? topic._branches[0].node : topNode;
        const thirdNode = (topic._branches && topic._branches[1]) ? topic._branches[1].node : secondNode;

        // Tezkor tugmalar (Action types) yoki Rejimlar bo'yicha javob
        if (actionType === 'simplify' || (mode === 'ustoz' && actionType !== 'compare' && actionType !== 'quiz' && actionType !== 'summary' && actionType !== 'terms' && actionType !== 'connect' && actionType !== 'scientific' && actionType !== 'example')) {
            const termInfo = ctx.matchedTerms[0];
            return {
                mode: 'ustoz',
                isAiGenerated: false,
                foundInCorpus: true,
                title: 'Ustoz rejimi: «' + (topNode.title || topic.title) + '» — sodda va tizimli tushuntirish',
                contentHtml:
                    '<p class="mb-2.5"><b>Asosiy mohiyat:</b> ' + (topNode.desc || topic.root.desc) + '</p>' +
                    (termInfo ? '<p class="mb-2.5"><b>Terminologik aniqlik (' + termInfo.termIntl + '):</b> ' + termInfo.extendedDef + '</p>' : '') +
                    '<div class="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 my-2.5">' +
                        '<b>Hayotiy misol:</b> ' + (topNode.example || topic.root.example || 'Kundalik faoliyatda ushbu psixik jarayon ongning muayyan vazifaga moslashishini ta’minlaydi.') +
                    '</div>' +
                    '<p class="text-xs opacity-85"><b>Tarkibiy shoxlar:</b> ' +
                        (topic._branches || []).map(function (b) { return b.node.title + ' (' + b.node.sub + ')'; }).join(' • ') +
                    '</p>',
                factVsHypothesis: 'Ilmiy fakt: Ta’rif va tasnif akademik o‘quv qo‘llanmalarida tasdiqlangan. Hayotiy misol esa tushunishni osonlashtiruvchi pedagogik namuna hisoblanadi.',
                sources: [sourceText]
            };
        }

        if (actionType === 'scientific') {
            const sci = ctx.matchedScientists[0];
            return {
                mode: mode,
                isAiGenerated: false,
                foundInCorpus: true,
                title: 'Ilmiy-akademik izoh: «' + topic.title + '»',
                contentHtml:
                    '<p class="mb-2"><b>Akademik ta’rif:</b> ' + topic.root.desc + '</p>' +
                    '<p class="mb-2"><b>Strukturaviy bo‘linishi:</b></p>' +
                    '<ul class="list-disc pl-5 space-y-1 mb-2.5">' +
                        (topic._branches || []).map(function (b) {
                            return '<li><b>' + b.node.title + ':</b> ' + (b.node.desc || b.node.sub) + '</li>';
                        }).join('') +
                    '</ul>' +
                    (sci ? '<p class="mb-2"><b>Tarixiy-ilmiy hissa (' + sci.name + ', ' + sci.lifespan + '):</b> ' + sci.contribution + '</p>' : '') +
                    (topic.auditFlags && topic.auditFlags.length ? '<p class="text-xs text-amber-300 mt-2"><b>Ilmiy audit izohi:</b> ' + topic.auditFlags[0].note + '</p>' : ''),
                factVsHypothesis: 'Ilmiy fakt: Nazariy qoidalar eksperimental va umumiy psixologiya darsliklaridan olingan.',
                sources: [sourceText]
            };
        }

        if (actionType === 'example') {
            const examplesList = (topic._all || []).filter(function (n) { return !!n.example; });
            return {
                mode: mode,
                isAiGenerated: false,
                foundInCorpus: true,
                title: '«' + topic.title + '» bo‘yicha tasdiqlangan hayotiy misollar',
                contentHtml:
                    '<ul class="space-y-2.5">' +
                        examplesList.map(function (n) {
                            return '<li class="p-2.5 rounded-xl bg-white/5 border border-white/10"><b>' + n.title + ':</b> ' + n.example + '</li>';
                        }).join('') +
                    '</ul>',
                factVsHypothesis: 'Amaliy kuzatuv: Misollar nazariy tushunchalarning kundalik xulq-atvordagi ifodasini ko‘rsatadi.',
                sources: [sourceText]
            };
        }

        if (actionType === 'compare' || mode === 'tahlilchi') {
            return {
                mode: 'tahlilchi',
                isAiGenerated: false,
                foundInCorpus: true,
                title: 'Tahlilchi rejimi: «' + secondNode.title + '» va «' + thirdNode.title + '» qiyosiy tahlili',
                contentHtml:
                    '<p class="mb-2.5"><b>«' + topic.title + '»</b> doirasida asosiy yo‘nalishlar va tushunchalar taqqoslanishi:</p>' +
                    '<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2">' +
                        '<div class="p-3 rounded-xl bg-sky-500/10 border border-sky-500/25">' +
                            '<div class="font-bold text-sky-300 mb-1">1. ' + secondNode.title + '</div>' +
                            '<div class="text-xs opacity-90">' + (secondNode.desc || secondNode.sub) + '</div>' +
                        '</div>' +
                        '<div class="p-3 rounded-xl bg-purple-500/10 border border-purple-500/25">' +
                            '<div class="font-bold text-purple-300 mb-1">2. ' + thirdNode.title + '</div>' +
                            '<div class="text-xs opacity-90">' + (thirdNode.desc || thirdNode.sub) + '</div>' +
                        '</div>' +
                    '</div>' +
                    '<p class="mt-2"><b>Umumiy bog‘liqlik:</b> Har ikki bo‘g‘in <em>' + topic.root.title + '</em> tizimining ajralmas qismi bo‘lib, inson psixik faoliyatida bir-birini to‘ldiradi.</p>',
                factVsHypothesis: 'Ilmiy fakt: Qiyosiy mezonlar klassik tipologik tasnifga asoslangan.',
                sources: [sourceText]
            };
        }

        if (actionType === 'connect') {
            const links = (window.PsychAtlasData.GALAXY_LINKS || []).filter(function (l) {
                return l.from === topic.id || l.to === topic.id;
            });
            return {
                mode: mode,
                isAiGenerated: false,
                foundInCorpus: true,
                title: 'Knowledge Galaxy: «' + topic.title + '» mavzusining boshqa jarayonlar bilan ilmiy aloqasi',
                contentHtml:
                    '<p class="mb-2">Atlasdagi fanlararo va jarayonlararo bog‘lanishlar:</p>' +
                    '<ul class="space-y-2">' +
                        links.map(function (l) {
                            const otherId = l.from === topic.id ? l.to : l.from;
                            const otherTopic = window.PsychAtlasData.TOPICS.find(function (t) { return t.id === otherId; });
                            return '<li class="p-2.5 rounded-xl bg-white/5 border border-white/10">' +
                                '<b>' + topic.title + ' ↔ ' + (otherTopic ? otherTopic.title : otherId) + ' (' + l.label + '):</b> ' +
                                l.scientificBasis +
                            '</li>';
                        }).join('') +
                    '</ul>',
                factVsHypothesis: 'Ilmiy fakt: Psixik jarayonlar alohida emas, balki yaxlit funksional tizim sifatida ishlaydi.',
                sources: [sourceText]
            };
        }

        if (actionType === 'quiz' || mode === 'test-tuzuvchi') {
            const topicQs = (window.PsychAtlasEducation.QUESTIONS || []).filter(function (qItem) {
                return qItem.topicId === topic.id;
            });
            return {
                mode: 'test-tuzuvchi',
                isAiGenerated: false,
                foundInCorpus: true,
                title: 'Test tuzuvchi rejimi: «' + topic.title + '» bo‘yicha nazorat savollari',
                contentHtml:
                    '<p class="mb-2">Ushbu mavzu bo‘yicha bilimingizni tekshirish uchun tasdiqlangan savollar:</p>' +
                    '<ol class="list-decimal pl-5 space-y-2.5">' +
                        topicQs.map(function (qItem) {
                            return '<li><b>' + qItem.question + '</b><br>' +
                                '<span class="text-xs text-emerald-300">Ilmiy izoh: ' + qItem.explanation + '</span></li>';
                        }).join('') +
                    '</ol>' +
                    '<p class="mt-3 text-xs opacity-80">To‘liq interaktiv test topshirish uchun chap menyudan <b>«Test tizimi»</b> bo‘limiga o‘ting.</p>',
                factVsHypothesis: 'Ilmiy fakt: Barcha savollar va javob kalitlari Atlasning tasdiqlangan o‘quv bazasidan olindi.',
                sources: [sourceText]
            };
        }

        if (actionType === 'summary' || mode === 'konspektchi') {
            return {
                mode: 'konspektchi',
                isAiGenerated: false,
                foundInCorpus: true,
                title: 'Konspektchi rejimi: «' + topic.title + '» — tizimli akademik konspekt',
                contentHtml:
                    '<div class="space-y-2.5">' +
                        '<p><b>1. Mavzu predmeti:</b> ' + topic.summary + '</p>' +
                        '<p><b>2. Markaziy ta’rif (' + topic.root.title + '):</b> ' + topic.root.desc + '</p>' +
                        '<div><b>3. Asosiy tipologik shoxlar:</b>' +
                            '<ul class="list-disc pl-5 mt-1 space-y-1">' +
                                (topic._branches || []).map(function (b) {
                                    const kids = (b.children || []).map(function (c) { return c.title; }).join(', ');
                                    return '<li><b>' + b.node.title + ':</b> ' + b.node.sub + (kids ? ' (<em>Tarkibi: ' + kids + '</em>)' : '') + '</li>';
                                }).join('') +
                            '</ul>' +
                        '</div>' +
                        '<p><b>4. Amaliy misol:</b> ' + (topic.root.example || '') + '</p>' +
                    '</div>',
                factVsHypothesis: 'Ilmiy fakt: Konspekt mavzuning original tipologik xaritasi asosida buzilmasdan shakllantirildi.',
                sources: [sourceText]
            };
        }

        // 'terms' yoki 'lugatchi' rejimi
        const terms = ctx.matchedTerms.length > 0
            ? ctx.matchedTerms
            : (window.PsychAtlasEducation.GLOSSARY_TERMS || []).filter(function (t) { return t.topicId === topic.id; });

        return {
            mode: 'lugatchi',
            isAiGenerated: false,
            foundInCorpus: true,
            title: 'Lug‘atchi rejimi: «' + topic.title + '» bo‘yicha ilmiy terminlar izohi',
            contentHtml:
                '<div class="space-y-2.5">' +
                    terms.map(function (term) {
                        return '<div class="p-3 rounded-xl bg-white/5 border border-white/10">' +
                            '<div class="font-bold text-amber-300">' + term.termUz + ' <span class="text-xs font-normal opacity-75">(' + term.termIntl + ')</span></div>' +
                            '<p class="text-xs mt-1">' + term.extendedDef + '</p>' +
                            '<p class="text-[11px] text-emerald-300 mt-1">Misol: ' + term.example + '</p>' +
                        '</div>';
                    }).join('') +
                '</div>',
            factVsHypothesis: 'Ilmiy fakt: Atamalar etimologiyasi va ta’riflari akademik psixologiya lug‘atlariga tayanadi.',
            sources: [sourceText]
        };
    }

    /**
     * AI Ustozga so'rov yuborish (Backend proxy -> Local Grounded Engine fallback)
     */
    async function askAiTutor(params) {
        const grounded = generateGroundedResponse(params);

        // Agar backend va tashqi AI API sozlangan bo'lsa, backendga xavfsiz so'rov yuboramiz
        if (backendStatus.backendReachable && backendStatus.aiConfigured && navigator.onLine) {
            try {
                const res = await fetch('/api/ai/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        query: params.query || '',
                        mode: params.mode || 'ustoz',
                        topicId: params.topicId || 'psyuxe',
                        actionType: params.actionType || 'free',
                        verifiedContext: grounded.contentHtml,
                        sources: grounded.sources
                    })
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.reply) {
                        return {
                            mode: params.mode || 'ustoz',
                            isAiGenerated: true,
                            foundInCorpus: grounded.foundInCorpus,
                            title: data.title || grounded.title,
                            contentHtml: '<p>' + window.PsychAtlasUtils.escapeHtml(data.reply).replace(/\n/g, '<br>') + '</p>',
                            factVsHypothesis: 'Eslatma: Ushbu javob AI yordamida Atlasning tasdiqlangan manbalari asosida shakllantirildi. AI yaratgan matn avtomatik ravishda mutlaq ilmiy fakt hisoblanmaydi — quyidagi pirlamchi manbaga qarang.',
                            sources: grounded.sources
                        };
                    }
                }
            } catch (_err) {
                // Backend xatosi yuz bersa, mahalliy tasdiqlangan dvigatel javobini qaytaramiz
            }
        }

        return grounded;
    }

    window.PsychAtlasApi = {
        checkBackendStatus: checkBackendStatus,
        getBackendStatus: function () { return backendStatus; },
        askAiTutor: askAiTutor,
        retrieveVerifiedContext: retrieveVerifiedContext
    };
})(window);
