/**
 * PSYCHOLOGY ATLAS — AI PSIXOLOGIYA USTOZ MODULI (SECTION 11)
 *
 * 5 ta akademik rejim (Ustoz, Tahlilchi, Test tuzuvchi, Konspektchi, Lug'atchi),
 * 8 ta tezkor ilmiy amal, manbaga asoslangan javoblar (fakt vs taxmin ajratilishi)
 * va xavfsiz backend arxitekturasi.
 */
(function (window) {
    'use strict';

    const AI_MODES = [
        { id: 'ustoz', label: '1. Ustoz', desc: 'Mavzuni sodda va tizimli o‘rgatadi', icon: 'fa-chalkboard-user', color: '#D6B56D' },
        { id: 'tahlilchi', label: '2. Tahlilchi', desc: 'Nazariya va qarashlarni taqqoslaydi', icon: 'fa-scale-balanced', color: '#38bdf8' },
        { id: 'test-tuzuvchi', label: '3. Test tuzuvchi', desc: 'Bilimni tekshiruvchi savollar tuzadi', icon: 'fa-list-check', color: '#10b981' },
        { id: 'konspektchi', label: '4. Konspektchi', desc: 'Tartibli akademik konspekt tayyorlaydi', icon: 'fa-file-lines', color: '#a855f7' },
        { id: 'lugatchi', label: '5. Lug‘atchi', desc: 'Atamalarni etimologik izohlaydi', icon: 'fa-spell-check', color: '#f43f5e' }
    ];

    const QUICK_ACTIONS = [
        { id: 'simplify', label: 'Sodda tushuntirish', icon: 'fa-wand-magic-sparkles' },
        { id: 'scientific', label: 'Ilmiy izoh', icon: 'fa-microscope' },
        { id: 'example', label: 'Hayotiy misol', icon: 'fa-lightbulb' },
        { id: 'compare', label: 'Taqqoslash', icon: 'fa-code-compare' },
        { id: 'summary', label: 'Konspekt tayyorlash', icon: 'fa-book-open' },
        { id: 'quiz', label: 'Test tuzish', icon: 'fa-circle-question' },
        { id: 'terms', label: 'Atamalarni izohlash', icon: 'fa-language' },
        { id: 'connect', label: 'Mavzular aloqasi', icon: 'fa-circle-nodes' }
    ];

    let activeMode = 'ustoz';
    let selectedTopicId = 'psyuxe';
    let chatMessages = [
        {
            id: 'msg-welcome',
            role: 'assistant',
            mode: 'ustoz',
            title: 'Assalomu alaykum! Men PSYCHOLOGY ATLAS ilmiy yordamchisiman.',
            contentHtml:
                '<p class="mb-2">Men javoblarni birinchi navbatda Atlasning <b>13 ta tasdiqlangan mavzusi</b>, <b>36 ta akademik lug‘at atamasi</b> va birlamchi ilmiy manbalar (E.G‘. G‘oziyev, S.L. Rubinshteyn, A.N. Leontyev, I.P. Pavlov, D. Goleman, V.S. Merlin) asosida shakllantiraman.</p>' +
                '<p class="text-xs opacity-85">Yuqoridan <b>5 ta rejimdan</b> birini va mavzuni tanlang, tezkor tugmalarni bosing yoki o‘z savolingizni yozing.</p>',
            factVsHypothesis: 'Ilmiy ishonchlilik qoidasi: Har bir javobda tasdiqlangan ilmiy fakt va pedagogik talqin farqlanadi hamda aniq manba ko‘rsatiladi.',
            sources: ['PSYCHOLOGY ATLAS Tasdiqlangan Ilmiy Korpusi (13 mavzu · 8 akademik manba)']
        }
    ];

    function renderAiTutor() {
        const container = document.getElementById('aiViewport');
        if (!container) return;

        const topics = window.PsychAtlasData.TOPICS || [];
        const status = window.PsychAtlasApi.getBackendStatus();
        if (!status.checked) {
            window.PsychAtlasApi.checkBackendStatus().then(function () {
                renderAiTutor();
            });
        }
        const esc = window.PsychAtlasUtils.escapeHtml;

        const statusBadge = (status.backendReachable && status.aiConfigured && navigator.onLine)
            ? '<span class="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/35"><i class="fa-solid fa-cloud-bolt mr-1.5"></i>Backend AI ulangan (' + esc(status.provider) + ')</span>'
            : '<span class="px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30" title="Tashqi AI API kaliti backendda sozlanmagan. Atlasning tasdiqlangan mahalliy ilmiy bazasi ishlamoqda."><i class="fa-solid fa-shield-halved mr-1.5"></i>Tasdiqlangan Atlas Bazasi Rejimi (Tashqi AI kaliti sozlanmagan)</span>';

        container.innerHTML =
            '<div class="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 h-full flex flex-col gap-4">' +
                '<!-- Yuqori Panel: Rejimlar va Holat -->' +
                '<div class="atlas-card p-5 space-y-4 shrink-0">' +
                    '<div class="flex flex-col lg:flex-row lg:items-center justify-between gap-3">' +
                        '<div>' +
                            '<div class="flex flex-wrap items-center gap-2">' +
                                '<span class="text-xs font-extrabold uppercase tracking-wider text-rose-400"><i class="fa-solid fa-robot mr-1.5"></i>AI PSIXOLOGIYA USTOZ</span>' +
                                statusBadge +
                            '</div>' +
                            '<h2 class="serif text-xl sm:text-2xl font-bold mt-1">Ilmiy manbaga asoslangan akademik suhbat va tahlil</h2>' +
                        '</div>' +
                        '<div class="flex items-center gap-2">' +
                            '<label class="text-xs font-bold shrink-0">Fokus mavzu:</label>' +
                            '<select id="aiTopicSelect" class="px-3 py-2 rounded-xl text-xs atlas-surface font-semibold">' +
                                topics.map(function (t) {
                                    return '<option value="' + t.id + '"' + (selectedTopicId === t.id ? ' selected' : '') + '>' + t.no + '-mavzu: ' + esc(t.title) + '</option>';
                                }).join('') +
                            '</select>' +
                        '</div>' +
                    '</div>' +

                    '<!-- 5 ta AI Rejimi -->' +
                    '<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">' +
                        AI_MODES.map(function (m) {
                            const isSel = m.id === activeMode;
                            return '<button data-ai-mode="' + m.id + '" class="p-2.5 rounded-xl text-left transition border ' +
                                (isSel ? 'bg-white/10 border-amber-400' : 'atlas-surface hover:border-white/25') + '">' +
                                '<div class="flex items-center gap-2 text-xs font-bold" style="color:' + m.color + '">' +
                                    '<i class="fa-solid ' + m.icon + '"></i>' +
                                    '<span>' + esc(m.label) + '</span>' +
                                '</div>' +
                                '<div class="text-[10.5px] mt-0.5 line-clamp-1" style="color:var(--text-secondary)">' + esc(m.desc) + '</div>' +
                            '</button>';
                        }).join('') +
                    '</div>' +

                    '<!-- 8 ta Tezkor Ilmiy Amal -->' +
                    '<div class="flex flex-wrap items-center gap-1.5 pt-1">' +
                        '<span class="text-[10px] font-bold uppercase mr-1" style="color:var(--text-secondary)">Tezkor amallar:</span>' +
                        QUICK_ACTIONS.map(function (act) {
                            return '<button data-ai-action="' + act.id + '" class="px-2.5 py-1.5 rounded-lg text-[11px] font-semibold atlas-surface hover:border-amber-400/60 transition flex items-center gap-1.5">' +
                                '<i class="fa-solid ' + act.icon + ' text-amber-400"></i>' +
                                '<span>' + esc(act.label) + '</span>' +
                            '</button>';
                        }).join('') +
                    '</div>' +
                '</div>' +

                '<!-- Chat Oynasi -->' +
                '<div id="aiChatScroll" class="flex-1 atlas-card p-4 sm:p-6 overflow-y-auto space-y-4 min-h-[260px]">' +
                    chatMessages.map(function (msg, mIdx) {
                        if (msg.role === 'user') {
                            return '<div class="flex justify-end">' +
                                '<div class="max-w-xl p-3.5 rounded-2xl text-xs sm:text-sm font-medium text-white shadow" style="background:linear-gradient(135deg,#5C9DFF,#8B7CFF)">' +
                                    esc(msg.text) +
                                '</div>' +
                            '</div>';
                        }
                        const modeObj = AI_MODES.find(function (m) { return m.id === msg.mode; }) || AI_MODES[0];
                        return '<div class="flex justify-start">' +
                            '<div class="w-full max-w-3xl p-4 sm:p-5 rounded-2xl atlas-surface space-y-3">' +
                                '<div class="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-white/10">' +
                                    '<div class="flex items-center gap-2">' +
                                        '<span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase" style="background:' + modeObj.color + '22;color:' + modeObj.color + '">' +
                                            '<i class="fa-solid ' + modeObj.icon + ' mr-1"></i>' + esc(modeObj.label) +
                                        '</span>' +
                                        '<span class="font-bold text-xs sm:text-sm">' + esc(msg.title) + '</span>' +
                                    '</div>' +
                                    '<button data-save-ai-note="' + mIdx + '" class="px-2.5 py-1 rounded-lg text-[10.5px] font-bold atlas-card hover:border-amber-400 transition" title="Shaxsiy daftarga saqlash">' +
                                        '<i class="fa-solid fa-bookmark mr-1 text-amber-400"></i>Daftarga saqlash' +
                                    '</button>' +
                                '</div>' +
                                '<div class="text-xs sm:text-sm leading-relaxed">' + msg.contentHtml + '</div>' +
                                (msg.factVsHypothesis ? (
                                    '<div class="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/25 text-[11px] text-sky-200">' +
                                        '<i class="fa-solid fa-scale-balanced mr-1.5 text-sky-400"></i>' + esc(msg.factVsHypothesis) +
                                    '</div>'
                                ) : '') +
                                (msg.sources && msg.sources.length ? (
                                    '<div class="pt-2 border-t border-white/10 text-[11px]" style="color:var(--text-secondary)">' +
                                        '<b style="color:var(--gold-accent)"><i class="fa-solid fa-book-bookmark mr-1"></i>Tasdiqlangan manba:</b> ' +
                                        msg.sources.map(esc).join(' | ') +
                                    '</div>'
                                ) : '') +
                            '</div>' +
                        '</div>';
                    }).join('') +
                '</div>' +

                '<!-- Savol Yuborish Formasi -->' +
                '<form id="aiChatForm" class="atlas-card p-3 flex items-center gap-2.5 shrink-0">' +
                    '<input id="aiQueryInput" type="text" placeholder="Psixologik savol yoki atamani yozing (masalan: Ixtiyoriydan so‘nggi diqqat nima? Xolerik va Sangvinik farqi...)" class="flex-1 px-4 py-2.5 rounded-xl text-xs sm:text-sm atlas-surface">' +
                    '<button type="submit" class="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-slate-950 shrink-0" style="background:var(--gold-accent)">' +
                        '<i class="fa-solid fa-paper-plane mr-1.5"></i>Yuborish' +
                    '</button>' +
                '</form>' +
            '</div>';

        const chatScroll = container.querySelector('#aiChatScroll');
        if (chatScroll) {
            chatScroll.scrollTop = chatScroll.scrollHeight;
        }

        // Hodisalar
        container.querySelector('#aiTopicSelect').addEventListener('change', function (e) {
            selectedTopicId = e.target.value;
        });

        container.querySelectorAll('[data-ai-mode]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                activeMode = btn.getAttribute('data-ai-mode');
                renderAiTutor();
            });
        });

        container.querySelectorAll('[data-ai-action]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                const actId = btn.getAttribute('data-ai-action');
                const actObj = QUICK_ACTIONS.find(function (a) { return a.id === actId; });
                const topicObj = topics.find(function (t) { return t.id === selectedTopicId; }) || topics[0];
                handleSendQuery(
                    '«' + topicObj.title + '» mavzusi bo‘yicha: ' + (actObj ? actObj.label : actId),
                    actId
                );
            });
        });

        container.querySelectorAll('[data-save-ai-note]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                const mIdx = Number(btn.getAttribute('data-save-ai-note'));
                const msg = chatMessages[mIdx];
                if (!msg) return;
                const tmpDiv = document.createElement('div');
                tmpDiv.innerHTML = msg.contentHtml;
                window.PsychAtlasStorage.saveNote({
                    title: msg.title,
                    topicId: selectedTopicId,
                    content: tmpDiv.textContent || tmpDiv.innerText || '',
                    quote: (msg.sources || []).join('; '),
                    isFavorite: false
                });
                if (window.PsychAtlasApp) {
                    window.PsychAtlasApp.showToast('AI Ustoz javobi Shaxsiy daftarga saqlandi (+15 XP)!', 'success');
                }
            });
        });

        const form = container.querySelector('#aiChatForm');
        if (form) {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                const inp = container.querySelector('#aiQueryInput');
                const q = inp ? inp.value.trim() : '';
                if (!q) return;
                inp.value = '';
                handleSendQuery(q, 'free');
            });
        }
    }

    async function handleSendQuery(queryText, actionType) {
        chatMessages.push({
            id: 'msg-u-' + Date.now(),
            role: 'user',
            text: queryText
        });
        renderAiTutor();

        const response = await window.PsychAtlasApi.askAiTutor({
            query: queryText,
            mode: activeMode,
            topicId: selectedTopicId,
            actionType: actionType || 'free'
        });

        chatMessages.push({
            id: 'msg-a-' + Date.now(),
            role: 'assistant',
            mode: response.mode || activeMode,
            title: response.title,
            contentHtml: response.contentHtml,
            factVsHypothesis: response.factVsHypothesis,
            sources: response.sources || []
        });

        window.PsychAtlasStorage.logActivity('ai_tutor', 'AI Ustoz bilan ilmiy tahlil', queryText.slice(0, 60), 5);
        renderAiTutor();
    }

    function askPreset(topicId, questionText) {
        selectedTopicId = topicId || 'psyuxe';
        activeMode = 'ustoz';
        handleSendQuery(questionText, 'simplify');
    }

    window.PsychAtlasAiTutor = {
        render: renderAiTutor,
        askPreset: askPreset
    };
})(window);
