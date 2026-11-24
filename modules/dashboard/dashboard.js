/**
 * PSYCHOLOGY ATLAS — BOSH SAHIFA (ATLAS DASHBOARD VA GAMIFIKATSIYA MODULI)
 */
(function (window) {
    'use strict';

    function getDailyTerm() {
        const terms = window.PsychAtlasEducation.GLOSSARY_TERMS || [];
        if (!terms.length) return null;
        const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
        return terms[dayIndex % terms.length];
    }

    function getDailyQuestion() {
        const singleQs = (window.PsychAtlasEducation.QUESTIONS || []).filter(function (q) {
            return q.type === 'single' || q.type === 'situational' || q.type === 'boolean';
        });
        if (!singleQs.length) return null;
        const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
        return singleQs[dayIndex % singleQs.length];
    }

    function buildBrainNeuralSvg() {
        return (
            '<svg viewBox="0 0 420 280" class="w-full h-56 sm:h-64 select-none" aria-label="Miya va neyron tarmog‘i vizualizatsiyasi">' +
                '<defs>' +
                    '<radialGradient id="brainGlow" cx="50%" cy="50%" r="50%">' +
                        '<stop offset="0%" stop-color="#8B7CFF" stop-opacity="0.32"/>' +
                        '<stop offset="55%" stop-color="#5C9DFF" stop-opacity="0.12"/>' +
                        '<stop offset="100%" stop-color="#0B1020" stop-opacity="0"/>' +
                    '</radialGradient>' +
                    '<linearGradient id="synapseGrad" x1="0%" y1="0%" x2="100%" y2="100%">' +
                        '<stop offset="0%" stop-color="#D6B56D" stop-opacity="0.8"/>' +
                        '<stop offset="50%" stop-color="#8B7CFF" stop-opacity="0.75"/>' +
                        '<stop offset="100%" stop-color="#5C9DFF" stop-opacity="0.8"/>' +
                    '</linearGradient>' +
                '</defs>' +
                '<circle cx="210" cy="140" r="130" fill="url(#brainGlow)" class="neural-pulse"/>' +
                '<!-- Miya konturi -->' +
                '<path d="M125,185 C85,185 68,150 82,118 C75,85 102,54 138,56 C158,34 205,32 228,50 C258,34 302,48 315,80 C346,94 352,138 328,164 C330,192 296,212 265,204 C245,222 195,222 175,202 C158,204 136,198 125,185 Z" ' +
                    'fill="rgba(23,35,58,0.55)" stroke="url(#synapseGrad)" stroke-width="2" stroke-dasharray="5 3"/>' +
                '<!-- Neyron aloqalari -->' +
                '<g stroke="url(#synapseGrad)" stroke-width="1.6" stroke-opacity="0.65">' +
                    '<line x1="135" y1="95" x2="205" y2="75"/>' +
                    '<line x1="205" y1="75" x2="280" y2="95"/>' +
                    '<line x1="135" y1="95" x2="165" y2="145"/>' +
                    '<line x1="205" y1="75" x2="215" y2="135"/>' +
                    '<line x1="280" y1="95" x2="255" y2="150"/>' +
                    '<line x1="165" y1="145" x2="215" y2="135"/>' +
                    '<line x1="215" y1="135" x2="255" y2="150"/>' +
                    '<line x1="165" y1="145" x2="130" y2="165"/>' +
                    '<line x1="165" y1="145" x2="205" y2="190"/>' +
                    '<line x1="255" y1="150" x2="205" y2="190"/>' +
                    '<line x1="255" y1="150" x2="305" y2="155"/>' +
                '</g>' +
                '<!-- Interaktiv Neyron Tugunlari -->' +
                '<g class="cursor-pointer" data-dash-topic="psyuxe">' +
                    '<circle cx="215" cy="135" r="14" fill="#8B7CFF" fill-opacity="0.28" class="neural-pulse"/>' +
                    '<circle cx="215" cy="135" r="7" fill="#D6B56D" stroke="#fff" stroke-width="1.5"/>' +
                    '<text x="215" y="118" text-anchor="middle" fill="#F1F5F9" font-size="10" font-weight="700">Psyuxe</text>' +
                '</g>' +
                '<g class="cursor-pointer" data-dash-topic="diqqat">' +
                    '<circle cx="135" cy="95" r="6" fill="#5C9DFF"/>' +
                    '<text x="135" y="81" text-anchor="middle" fill="#94A3B8" font-size="9.5" font-weight="600">Diqqat</text>' +
                '</g>' +
                '<g class="cursor-pointer" data-dash-topic="xotira">' +
                    '<circle cx="205" cy="75" r="6" fill="#10b981"/>' +
                    '<text x="205" y="61" text-anchor="middle" fill="#94A3B8" font-size="9.5" font-weight="600">Xotira</text>' +
                '</g>' +
                '<g class="cursor-pointer" data-dash-topic="tafakkur">' +
                    '<circle cx="280" cy="95" r="6" fill="#8B7CFF"/>' +
                    '<text x="280" y="81" text-anchor="middle" fill="#94A3B8" font-size="9.5" font-weight="600">Tafakkur</text>' +
                '</g>' +
                '<g class="cursor-pointer" data-dash-topic="idrok">' +
                    '<circle cx="165" cy="145" r="5.5" fill="#38bdf8"/>' +
                    '<text x="165" y="163" text-anchor="middle" fill="#94A3B8" font-size="9.5" font-weight="600">Idrok</text>' +
                '</g>' +
                '<g class="cursor-pointer" data-dash-topic="eq">' +
                    '<circle cx="255" cy="150" r="5.5" fill="#f43f5e"/>' +
                    '<text x="255" y="168" text-anchor="middle" fill="#94A3B8" font-size="9.5" font-weight="600">EQ</text>' +
                '</g>' +
                '<g class="cursor-pointer" data-dash-topic="temperament-turlari">' +
                    '<circle cx="205" cy="190" r="6" fill="#D6B56D"/>' +
                    '<text x="205" y="209" text-anchor="middle" fill="#94A3B8" font-size="9.5" font-weight="600">Temperament</text>' +
                '</g>' +
                '<g class="cursor-pointer" data-dash-topic="muloqot">' +
                    '<circle cx="130" cy="165" r="5" fill="#10b981"/>' +
                    '<text x="104" y="169" text-anchor="end" fill="#94A3B8" font-size="9" font-weight="600">Muloqot</text>' +
                '</g>' +
                '<g class="cursor-pointer" data-dash-topic="shaxs">' +
                    '<circle cx="305" cy="155" r="5" fill="#f59e0b"/>' +
                    '<text x="315" y="159" text-anchor="start" fill="#94A3B8" font-size="9" font-weight="600">Shaxs</text>' +
                '</g>' +
            '</svg>'
        );
    }

    function renderDashboard() {
        const container = document.getElementById('dashboardViewport');
        if (!container) return;

        const state = window.PsychAtlasStorage.getState();
        const stats = window.PsychAtlasStorage.getComputedStats();
        const topics = window.PsychAtlasData.TOPICS || [];
        const badges = window.PsychAtlasEducation.BADGES || [];
        const esc = window.PsychAtlasUtils.escapeHtml;

        // Oxirgi ochilgan mavzu
        const lastTopic = state.lastOpenedTopicId
            ? topics.find(function (t) { return t.id === state.lastOpenedTopicId; })
            : null;
        const lastProg = lastTopic && state.topicProgress[lastTopic.id]
            ? state.topicProgress[lastTopic.id]
            : null;

        // Tavsiya etilgan 3 ta mavzu (avval boshlanmagan yoki chala qolganlari)
        const recommended = topics.slice().sort(function (a, b) {
            const pa = (state.topicProgress[a.id] && state.topicProgress[a.id].completion) || 0;
            const pb = (state.topicProgress[b.id] && state.topicProgress[b.id].completion) || 0;
            if (pa > 0 && pa < 100 && (pb === 0 || pb === 100)) return -1;
            if (pb > 0 && pb < 100 && (pa === 0 || pa === 100)) return 1;
            return pa - pb;
        }).slice(0, 3);

        const dailyTerm = getDailyTerm();
        const dailyQ = getDailyQuestion();
        const todayKey = window.PsychAtlasStorage.getTodayDateString();
        const dailyAns = state.dailyQuestionAnswered[todayKey] || null;
        const goalPct = Math.min(100, Math.round((stats.todayStudyMinutes / stats.dailyGoalMinutes) * 100));

        container.innerHTML =
            '<div class="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">' +

                /* ===================== 1. HERO SECTION ===================== */
                '<div class="atlas-card relative overflow-hidden p-6 sm:p-8 lg:p-10 border border-white/10" style="background: radial-gradient(circle at 80% 35%, rgba(139,124,255,0.20), rgba(17,26,46,0.96) 65%);">' +
                    '<div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">' +
                        '<div class="lg:col-span-7 space-y-4">' +
                            '<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style="background:rgba(214,181,109,0.15);color:var(--gold-accent);border:1px solid rgba(214,181,109,0.3);">' +
                                '<i class="fa-solid fa-compass-drafting"></i>' +
                                '<span>PSYCHOLOGY ATLAS · ILMIY-TA’LIMIY PLATFORMA</span>' +
                            '</div>' +
                            '<h2 class="serif text-2xl sm:text-4xl font-bold leading-tight">Psixologiya olamini kashf eting</h2>' +
                            '<p class="text-sm sm:text-base leading-relaxed" style="color:var(--text-secondary)">' +
                                '«Psixologiyani yodlamang — uni anglang, bog‘lang va kashf eting.» Interaktiv tipologik xaritalar, Bilimlar Galaktikasi, virtual psixologiya laboratoriyasi, adaptiv testlar va AI ustoz yagona akademik tizimda.' +
                            '</p>' +
                            '<div class="flex flex-wrap items-center gap-3 pt-2">' +
                                '<button data-goto-module="atlas" class="px-5 py-3 rounded-xl font-bold text-sm text-slate-950 shadow-lg flex items-center gap-2 transition hover:scale-[1.02]" style="background:linear-gradient(135deg, #D6B56D 0%, #F59E0B 100%);">' +
                                    '<i class="fa-solid fa-diagram-project"></i>' +
                                    '<span>Interaktiv Atlasga kirish</span>' +
                                '</button>' +
                                '<button data-goto-galaxy class="px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-2 atlas-surface hover:border-purple-400/50 transition">' +
                                    '<i class="fa-solid fa-circle-nodes text-purple-400"></i>' +
                                    '<span>Knowledge Galaxy</span>' +
                                '</button>' +
                                '<button data-goto-module="laboratory" class="px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-2 atlas-surface hover:border-sky-400/50 transition">' +
                                    '<i class="fa-solid fa-flask-vial text-sky-400"></i>' +
                                    '<span>Virtual Laboratoriya</span>' +
                                '</button>' +
                            '</div>' +
                        '</div>' +
                        '<div class="lg:col-span-5 flex flex-col items-center justify-center">' +
                            buildBrainNeuralSvg() +
                            '<span class="text-[11px] opacity-70 mt-1" style="color:var(--text-secondary)"><i class="fa-solid fa-hand-pointer mr-1"></i>Neyron tugunini bosib tegishli mavzuga o‘ting</span>' +
                        '</div>' +
                    '</div>' +
                '</div>' +

                /* ===================== 3. SHAXSIY STATISTIKA (REAL DATA) ===================== */
                '<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">' +
                    '<div class="atlas-card p-4 sm:p-5">' +
                        '<div class="flex items-center justify-between text-xs font-bold uppercase tracking-wider mb-2" style="color:var(--text-secondary)">' +
                            '<span>O‘rganilgan mavzular</span>' +
                            '<i class="fa-solid fa-book-open text-sky-400 text-sm"></i>' +
                        '</div>' +
                        '<div class="text-2xl sm:text-3xl font-extrabold">' + stats.studiedTopicsCount + ' <span class="text-sm font-semibold opacity-60">/ ' + stats.totalTopics + '</span></div>' +
                        '<p class="text-[11px] mt-1" style="color:var(--text-secondary)">' + stats.completedTopicsCount + ' tasi 100% yakunlangan</p>' +
                    '</div>' +
                    '<div class="atlas-card p-4 sm:p-5">' +
                        '<div class="flex items-center justify-between text-xs font-bold uppercase tracking-wider mb-2" style="color:var(--text-secondary)">' +
                            '<span>Tugallangan testlar</span>' +
                            '<i class="fa-solid fa-clipboard-check text-emerald-400 text-sm"></i>' +
                        '</div>' +
                        '<div class="text-2xl sm:text-3xl font-extrabold">' + stats.completedQuizzesCount + '</div>' +
                        '<p class="text-[11px] mt-1" style="color:var(--text-secondary)">O‘rtacha ball: ' + stats.avgQuizScore + '%</p>' +
                    '</div>' +
                    '<div class="atlas-card p-4 sm:p-5">' +
                        '<div class="flex items-center justify-between text-xs font-bold uppercase tracking-wider mb-2" style="color:var(--text-secondary)">' +
                            '<span>O‘zlashtirish foizi</span>' +
                            '<i class="fa-solid fa-chart-pie text-purple-400 text-sm"></i>' +
                        '</div>' +
                        '<div class="text-2xl sm:text-3xl font-extrabold" style="color:var(--gold-accent)">' + stats.overallMastery + '%</div>' +
                        '<p class="text-[11px] mt-1" style="color:var(--text-secondary)">Real progress ko‘rsatkichi</p>' +
                    '</div>' +
                    '<div class="atlas-card p-4 sm:p-5">' +
                        '<div class="flex items-center justify-between text-xs font-bold uppercase tracking-wider mb-2" style="color:var(--text-secondary)">' +
                            '<span>O‘qish davomiyligi</span>' +
                            '<i class="fa-solid fa-clock text-amber-400 text-sm"></i>' +
                        '</div>' +
                        '<div class="text-xl sm:text-2xl font-extrabold">' + window.PsychAtlasUtils.formatDurationUz(stats.studySeconds) + '</div>' +
                        '<p class="text-[11px] mt-1" style="color:var(--text-secondary)">Bugun: ' + stats.todayStudyMinutes + ' / ' + stats.dailyGoalMinutes + ' daqiqa</p>' +
                    '</div>' +
                    '<div class="atlas-card p-4 sm:p-5 col-span-2 sm:col-span-1">' +
                        '<div class="flex items-center justify-between text-xs font-bold uppercase tracking-wider mb-2" style="color:var(--text-secondary)">' +
                            '<span>Ketma-ket kunlar</span>' +
                            '<i class="fa-solid fa-fire text-rose-400 text-sm"></i>' +
                        '</div>' +
                        '<div class="text-2xl sm:text-3xl font-extrabold">' + stats.streakDays + ' <span class="text-sm font-semibold opacity-60">kun</span></div>' +
                        '<p class="text-[11px] mt-1" style="color:var(--text-secondary)">' + stats.xp + ' XP · ' + stats.level + '-daraja</p>' +
                    '</div>' +
                '</div>' +

                /* ===================== 2. O'QISHNI DAVOM ETTIRISH + 8. TEZKOR KIRISH ===================== */
                '<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">' +
                    '<div class="lg:col-span-7 atlas-card p-6 flex flex-col justify-between gap-4">' +
                        '<div>' +
                            '<div class="flex items-center justify-between gap-2 mb-3">' +
                                '<span class="text-xs font-bold uppercase tracking-wider" style="color:var(--gold-accent)"><i class="fa-solid fa-bookmark mr-1.5"></i>O‘qishni davom ettirish</span>' +
                                (lastTopic ? '<span class="text-xs px-2.5 py-0.5 rounded-full atlas-surface">' + (lastProg ? lastProg.completion : 0) + '% o‘zlashtirilgan</span>' : '') +
                            '</div>' +
                            (lastTopic ? (
                                '<h3 class="serif text-xl sm:text-2xl font-bold">' + lastTopic.no + '-mavzu: ' + esc(lastTopic.title) + '</h3>' +
                                '<p class="text-xs sm:text-sm mt-1.5" style="color:var(--text-secondary)">' + esc(lastTopic.summary) + '</p>' +
                                '<div class="mt-3 p-3 rounded-xl atlas-surface text-xs flex flex-wrap items-center justify-between gap-2">' +
                                    '<span><i class="fa-solid fa-location-dot text-sky-400 mr-1.5"></i>Oxirgi o‘qilgan joy: <b>' + esc(state.lastOpenedNodeTitle || lastTopic.root.title) + '</b></span>' +
                                    '<span style="color:var(--text-secondary)">' + window.PsychAtlasUtils.formatDateUz(state.lastVisitedAt) + '</span>' +
                                '</div>'
                            ) : (
                                '<h3 class="serif text-xl font-bold">Hali o‘qish faoliyati boshlanmagan</h3>' +
                                '<p class="text-sm mt-1.5" style="color:var(--text-secondary)">1-mavzu («Psixologiya va Psyuxe») dan boshlab psixika qatlamlari va bilish jarayonlarini interaktiv xarita orqali kashf eting.</p>'
                            )) +
                        '</div>' +
                        '<div class="flex flex-wrap items-center gap-3 pt-2">' +
                            '<button data-continue-topic="' + (lastTopic ? lastTopic.id : 'psyuxe') + '" class="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white shadow flex items-center gap-2 transition" style="background:linear-gradient(135deg, #5C9DFF 0%, #8B7CFF 100%);">' +
                                '<i class="fa-solid fa-play"></i>' +
                                '<span>' + (lastTopic ? 'O‘qishni davom ettirish' : '1-mavzudan boshlash') + '</span>' +
                            '</button>' +
                            '<button data-goto-module="library" class="px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm atlas-surface hover:border-white/30 transition">' +
                                '<i class="fa-solid fa-books mr-1.5"></i>Mavzular kutubxonasi' +
                            '</button>' +
                        '</div>' +
                    '</div>' +

                    '<!-- 8. TEZKOR KIRISH -->' +
                    '<div class="lg:col-span-5 atlas-card p-6">' +
                        '<h3 class="text-xs font-bold uppercase tracking-wider mb-4" style="color:var(--text-secondary)"><i class="fa-solid fa-bolt text-amber-400 mr-1.5"></i>Tezkor kirish modullari</h3>' +
                        '<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2.5">' +
                            '<button data-goto-module="atlas" class="p-3 rounded-xl atlas-surface hover:border-amber-400/50 text-left transition flex items-center gap-3">' +
                                '<span class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style="background:rgba(214,181,109,0.16);color:var(--gold-accent)"><i class="fa-solid fa-diagram-project"></i></span>' +
                                '<div><div class="text-xs font-bold">Atlas</div><div class="text-[10px]" style="color:var(--text-secondary)">13 xarita + Galaxy</div></div>' +
                            '</button>' +
                            '<button data-goto-module="tests" class="p-3 rounded-xl atlas-surface hover:border-emerald-400/50 text-left transition flex items-center gap-3">' +
                                '<span class="w-9 h-9 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0"><i class="fa-solid fa-list-check"></i></span>' +
                                '<div><div class="text-xs font-bold">Testlar</div><div class="text-[10px]" style="color:var(--text-secondary)">6 xil test turi</div></div>' +
                            '</button>' +
                            '<button data-goto-module="laboratory" class="p-3 rounded-xl atlas-surface hover:border-sky-400/50 text-left transition flex items-center gap-3">' +
                                '<span class="w-9 h-9 rounded-lg bg-sky-500/15 text-sky-400 flex items-center justify-center shrink-0"><i class="fa-solid fa-flask-vial"></i></span>' +
                                '<div><div class="text-xs font-bold">Laboratoriya</div><div class="text-[10px]" style="color:var(--text-secondary)">7 ta tajriba</div></div>' +
                            '</button>' +
                            '<button data-goto-module="flashcards" class="p-3 rounded-xl atlas-surface hover:border-purple-400/50 text-left transition flex items-center gap-3">' +
                                '<span class="w-9 h-9 rounded-lg bg-purple-500/15 text-purple-400 flex items-center justify-center shrink-0"><i class="fa-solid fa-clone"></i></span>' +
                                '<div><div class="text-xs font-bold">Flashcards</div><div class="text-[10px]" style="color:var(--text-secondary)">' + stats.dueFlashcardsCount + ' ta navbatda</div></div>' +
                            '</button>' +
                            '<button data-goto-module="ai-tutor" class="p-3 rounded-xl atlas-surface hover:border-rose-400/50 text-left transition flex items-center gap-3 col-span-2">' +
                                '<span class="w-9 h-9 rounded-lg bg-rose-500/15 text-rose-400 flex items-center justify-center shrink-0"><i class="fa-solid fa-robot"></i></span>' +
                                '<div><div class="text-xs font-bold">AI Psixologiya Ustoz</div><div class="text-[10px]" style="color:var(--text-secondary)">5 ta akademik rejim · Manbaga asoslangan tahlil</div></div>' +
                            '</button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +

                /* ===================== 5. BUGUNGI ATAMA + 6. KUN SAVOLI ===================== */
                '<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">' +
                    '<!-- 5. BUGUNGI PSIXOLOGIK ATAMA -->' +
                    '<div class="lg:col-span-5 atlas-card p-6 flex flex-col justify-between">' +
                        (dailyTerm ? (
                            '<div>' +
                                '<div class="flex items-center justify-between gap-2 mb-3">' +
                                    '<span class="text-xs font-bold uppercase tracking-wider text-purple-400"><i class="fa-solid fa-spell-check mr-1.5"></i>Bugungi psixologik atama</span>' +
                                    '<button data-goto-module="glossary" class="text-xs font-semibold hover:underline" style="color:var(--blue-accent)">Lug‘atga o‘tish →</button>' +
                                '</div>' +
                                '<h3 class="serif text-xl font-bold">' + esc(dailyTerm.termUz) + '</h3>' +
                                '<p class="text-xs italic mt-0.5 mb-3" style="color:var(--gold-accent)">' + esc(dailyTerm.termIntl) + '</p>' +
                                '<p class="text-xs sm:text-sm leading-relaxed mb-3" style="color:var(--text-secondary)">' + esc(dailyTerm.extendedDef) + '</p>' +
                                '<div class="p-3 rounded-xl atlas-surface text-xs">' +
                                    '<b class="text-amber-400"><i class="fa-solid fa-lightbulb mr-1"></i>Hayotiy misol:</b> ' + esc(dailyTerm.example) +
                                '</div>' +
                            '</div>' +
                            '<div class="text-[11px] mt-4 pt-3 border-t border-white/10" style="color:var(--text-secondary)">' +
                                'Manba: ' + esc(dailyTerm.source) +
                            '</div>'
                        ) : '') +
                    '</div>' +

                    '<!-- 6. KUN SAVOLI -->' +
                    '<div class="lg:col-span-7 atlas-card p-6 flex flex-col justify-between">' +
                        (dailyQ ? (
                            '<div>' +
                                '<div class="flex items-center justify-between gap-2 mb-3">' +
                                    '<span class="text-xs font-bold uppercase tracking-wider text-emerald-400"><i class="fa-solid fa-circle-question mr-1.5"></i>Kun savoli (+15 XP)</span>' +
                                    '<span class="text-[11px] px-2.5 py-0.5 rounded-full atlas-surface">' + esc(dailyQ.difficulty) + ' daraja</span>' +
                                '</div>' +
                                '<h3 class="font-bold text-sm sm:text-base leading-snug mb-4">' + esc(dailyQ.question) + '</h3>' +
                                '<div id="dailyQuestionOptions" class="space-y-2">' +
                                    (dailyQ.options || []).map(function (opt, idx) {
                                        let btnStyle = 'atlas-surface hover:border-sky-400/50';
                                        let iconHtml = '<span class="w-6 h-6 rounded-lg bg-white/10 text-xs font-bold flex items-center justify-center shrink-0">' + String.fromCharCode(65 + idx) + '</span>';
                                        if (dailyAns) {
                                            if (idx === dailyQ.correctAnswer) {
                                                btnStyle = 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-300';
                                                iconHtml = '<i class="fa-solid fa-circle-check text-emerald-400"></i>';
                                            } else if (idx === dailyAns.selectedIndex && !dailyAns.isCorrect) {
                                                btnStyle = 'bg-rose-500/20 border border-rose-500/50 text-rose-300';
                                                iconHtml = '<i class="fa-solid fa-circle-xmark text-rose-400"></i>';
                                            }
                                        }
                                        return '<button data-daily-opt="' + idx + '" ' + (dailyAns ? 'disabled' : '') + ' class="w-full text-left p-3 rounded-xl text-xs sm:text-sm font-medium transition flex items-center gap-3 ' + btnStyle + '">' +
                                            iconHtml +
                                            '<span>' + esc(opt) + '</span>' +
                                        '</button>';
                                    }).join('') +
                                '</div>' +
                                (dailyAns ? (
                                    '<div class="mt-3 p-3 rounded-xl text-xs ' + (dailyAns.isCorrect ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-200' : 'bg-amber-500/15 border border-amber-500/30 text-amber-200') + '">' +
                                        '<b>' + (dailyAns.isCorrect ? 'To‘g‘ri javob!' : 'Ilmiy izoh:') + '</b> ' + esc(dailyQ.explanation) +
                                    '</div>'
                                ) : '') +
                            '</div>'
                        ) : '') +
                    '</div>' +
                '</div>' +

                /* ===================== 4. TAVSIYA ETILGAN MAVZULAR ===================== */
                '<div class="atlas-card p-6">' +
                    '<div class="flex items-center justify-between gap-2 mb-4">' +
                        '<div>' +
                            '<h3 class="text-sm sm:text-base font-bold"><i class="fa-solid fa-wand-magic-sparkles text-amber-400 mr-2"></i>Tavsiya etilgan mavzular</h3>' +
                            '<p class="text-xs" style="color:var(--text-secondary)">O‘quv progressingiz asosida keyingi o‘rganish uchun tavsiyalar</p>' +
                        '</div>' +
                        '<button data-goto-module="library" class="text-xs font-bold hover:underline" style="color:var(--gold-accent)">Barcha 13 mavzu →</button>' +
                    '</div>' +
                    '<div class="grid grid-cols-1 md:grid-cols-3 gap-4">' +
                        recommended.map(function (t) {
                            const prog = state.topicProgress[t.id] || { completion: 0 };
                            const th = window.PsychAtlasData.THEMES[t.theme] || window.PsychAtlasData.THEMES.indigo;
                            return '<div class="p-4 rounded-2xl atlas-surface flex flex-col justify-between gap-3 hover:border-white/25 transition">' +
                                '<div>' +
                                    '<div class="flex items-center justify-between gap-2 mb-2">' +
                                        '<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase" style="background:' + th.tint + ';color:' + th.line + '">' +
                                            t.no + '-mavzu · ' + t.difficulty +
                                        '</span>' +
                                        '<span class="text-xs font-bold" style="color:' + th.line + '">' + prog.completion + '%</span>' +
                                    '</div>' +
                                    '<h4 class="font-bold text-base mb-1">' + esc(t.title) + '</h4>' +
                                    '<p class="text-xs line-clamp-2" style="color:var(--text-secondary)">' + esc(t.summary) + '</p>' +
                                '</div>' +
                                '<div class="flex items-center justify-between pt-2 border-t border-white/10">' +
                                    '<span class="text-[11px]" style="color:var(--text-secondary)"><i class="fa-regular fa-clock mr-1"></i>' + esc(t.duration) + '</span>' +
                                    '<button data-open-topic-map="' + t.id + '" class="text-xs font-bold hover:underline" style="color:var(--gold-accent)">Xaritada ochish <i class="fa-solid fa-arrow-right ml-0.5"></i></button>' +
                                '</div>' +
                            '</div>';
                        }).join('') +
                    '</div>' +
                '</div>' +

                /* ===================== 15. GAMIFIKATSIYA, SHAXSIY RIVOJLANISH XARITASI VA 7. SO'NGGI FAOLIYAT ===================== */
                '<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">' +
                    '<!-- GAMIFIKATSIYA VA HAFTALIK STATISTIKA -->' +
                    '<div class="lg:col-span-7 atlas-card p-6 space-y-5">' +
                        '<div class="flex flex-wrap items-center justify-between gap-2">' +
                            '<div>' +
                                '<h3 class="text-sm sm:text-base font-bold"><i class="fa-solid fa-trophy text-amber-400 mr-2"></i>Shaxsiy rivojlanish xaritasi va Yutuqlar</h3>' +
                                '<p class="text-xs" style="color:var(--text-secondary)">13 mavzu bo‘yicha o‘zlashtirish darajasi, kunlik maqsad va nishonlar</p>' +
                            '</div>' +
                            '<span class="px-3 py-1 rounded-full text-xs font-bold" style="background:rgba(214,181,109,0.16);color:var(--gold-accent)">' +
                                stats.level + '-daraja · ' + stats.xp + ' XP' +
                            '</span>' +
                        '</div>' +

                        '<!-- Kunlik maqsad va Haftalik faollik -->' +
                        '<div class="p-4 rounded-2xl atlas-surface space-y-3">' +
                            '<div class="flex items-center justify-between text-xs">' +
                                '<span class="font-bold">Kunlik o‘quv maqsadi (' + stats.dailyGoalMinutes + ' daqiqa)</span>' +
                                '<span class="font-bold" style="color:var(--gold-accent)">' + stats.todayStudyMinutes + ' daq (' + goalPct + '%)</span>' +
                            '</div>' +
                            '<div class="w-full h-2.5 rounded-full bg-black/30 overflow-hidden">' +
                                '<div class="h-full rounded-full transition-all duration-300" style="width:' + goalPct + '%;background:linear-gradient(90deg, #5C9DFF, #D6B56D)"></div>' +
                            '</div>' +
                            '<div class="grid grid-cols-7 gap-2 pt-2">' +
                                stats.weeklyData.map(function (day) {
                                    return '<div class="text-center p-2 rounded-xl ' + (day.active ? 'bg-emerald-500/15 border border-emerald-500/30' : 'bg-black/20') + '">' +
                                        '<div class="text-[10px] font-bold" style="color:var(--text-secondary)">' + day.label + '</div>' +
                                        '<div class="text-xs font-extrabold mt-0.5 ' + (day.active ? 'text-emerald-400' : 'opacity-40') + '">' + day.minutes + 'd</div>' +
                                    '</div>';
                                }).join('') +
                            '</div>' +
                        '</div>' +

                        '<!-- 13 Mavzu Rivojlanish Xaritasi -->' +
                        '<div>' +
                            '<div class="text-xs font-bold uppercase tracking-wider mb-2.5" style="color:var(--text-secondary)">13 mavzu o‘zlashtirish xaritasi</div>' +
                            '<div class="grid grid-cols-2 sm:grid-cols-3 gap-2">' +
                                topics.map(function (t) {
                                    const pct = (state.topicProgress[t.id] && state.topicProgress[t.id].completion) || 0;
                                    return '<button data-open-topic-map="' + t.id + '" class="p-2.5 rounded-xl atlas-surface text-left hover:border-white/30 transition">' +
                                        '<div class="flex items-center justify-between text-[11px] font-bold mb-1">' +
                                            '<span class="truncate">' + t.no + '. ' + esc(t.title) + '</span>' +
                                            '<span style="color:var(--gold-accent)">' + pct + '%</span>' +
                                        '</div>' +
                                        '<div class="w-full h-1.5 rounded-full bg-black/30 overflow-hidden">' +
                                            '<div class="h-full rounded-full bg-sky-400" style="width:' + pct + '%"></div>' +
                                        '</div>' +
                                    '</button>';
                                }).join('') +
                            '</div>' +
                        '</div>' +

                        '<!-- Nishonlar (Badges) -->' +
                        '<div>' +
                            '<div class="text-xs font-bold uppercase tracking-wider mb-2.5" style="color:var(--text-secondary)">Nishonlar (' + stats.earnedBadgesCount + ' / ' + badges.length + ')</div>' +
                            '<div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5">' +
                                badges.map(function (b) {
                                    const earned = state.earnedBadges.indexOf(b.id) !== -1;
                                    return '<div class="p-3 rounded-xl border transition ' + (earned ? 'bg-amber-500/10 border-amber-400/40' : 'atlas-surface opacity-55') + '">' +
                                        '<div class="flex items-center gap-2 mb-1">' +
                                            '<i class="fa-solid ' + b.icon + '" style="color:' + (earned ? b.color : '#64748b') + '"></i>' +
                                            '<span class="text-xs font-bold">' + esc(b.title) + '</span>' +
                                        '</div>' +
                                        '<p class="text-[10.5px] leading-snug" style="color:var(--text-secondary)">' + esc(b.desc) + '</p>' +
                                    '</div>';
                                }).join('') +
                            '</div>' +
                        '</div>' +
                    '</div>' +

                    '<!-- 7. SO‘NGGI FAOLIYAT -->' +
                    '<div class="lg:col-span-5 atlas-card p-6 flex flex-col justify-between">' +
                        '<div>' +
                            '<div class="flex items-center justify-between gap-2 mb-4">' +
                                '<h3 class="text-sm sm:text-base font-bold"><i class="fa-solid fa-clock-rotate-left text-sky-400 mr-2"></i>So‘nggi faoliyat</h3>' +
                                '<span class="text-xs" style="color:var(--text-secondary)">' + state.activities.length + ' ta qayd</span>' +
                            '</div>' +
                            (state.activities.length > 0 ? (
                                '<div class="space-y-2.5 max-h-[430px] overflow-y-auto pr-1">' +
                                    state.activities.slice(0, 12).map(function (act) {
                                        return '<div class="p-3 rounded-xl atlas-surface flex items-start justify-between gap-3">' +
                                            '<div class="min-w-0">' +
                                                '<div class="text-xs font-bold truncate">' + esc(act.title) + '</div>' +
                                                '<div class="text-[11px] mt-0.5" style="color:var(--text-secondary)">' + esc(act.detail) + '</div>' +
                                                '<div class="text-[10px] opacity-60 mt-1">' + window.PsychAtlasUtils.formatDateUz(act.timestamp) + '</div>' +
                                            '</div>' +
                                            (act.xpEarned > 0 ? '<span class="px-2 py-0.5 rounded-md text-[10px] font-extrabold shrink-0" style="background:rgba(214,181,109,0.16);color:var(--gold-accent)">+' + act.xpEarned + ' XP</span>' : '') +
                                        '</div>';
                                    }).join('') +
                                '</div>'
                            ) : (
                                '<div class="p-8 rounded-2xl atlas-surface text-center my-4">' +
                                    '<i class="fa-solid fa-seedling text-2xl text-emerald-400 mb-2"></i>' +
                                    '<p class="text-xs font-bold mb-1">Hozircha faoliyat qayd etilmagan</p>' +
                                    '<p class="text-[11px]" style="color:var(--text-secondary)">Barcha statistikalar faqat real faoliyatingizdan hisoblanadi. Xarita tugunlarini oching, test ishlang yoki tajriba o‘tkazing.</p>' +
                                '</div>'
                            )) +
                        '</div>' +
                        '<div class="pt-4 mt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">' +
                            '<button id="btnExportBackupDash" class="px-3 py-2 rounded-xl atlas-surface hover:border-white/30 font-semibold"><i class="fa-solid fa-download mr-1.5"></i>Progressni zahiralash (JSON)</button>' +
                            '<label class="px-3 py-2 rounded-xl atlas-surface hover:border-white/30 font-semibold cursor-pointer">' +
                                '<i class="fa-solid fa-upload mr-1.5"></i>Tiklash' +
                                '<input type="file" id="inputImportBackupDash" accept=".json" class="hidden">' +
                            '</label>' +
                        '</div>' +
                    '</div>' +
                '</div>' +

            '</div>';

        bindDashboardEvents(container, dailyQ, todayKey);
    }

    function bindDashboardEvents(container, dailyQ, todayKey) {
        // Modulga o'tish tugmalari
        container.querySelectorAll('[data-goto-module]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                if (window.PsychAtlasApp) {
                    window.PsychAtlasApp.navigateTo(btn.getAttribute('data-goto-module'));
                }
            });
        });

        // Knowledge Galaxy tugmasi
        const galaxyBtn = container.querySelector('[data-goto-galaxy]');
        if (galaxyBtn) {
            galaxyBtn.addEventListener('click', function () {
                if (window.PsychAtlasApp) {
                    window.PsychAtlasApp.navigateTo('atlas');
                    if (window.PsychAtlasModule) {
                        window.PsychAtlasModule.setView('galaxy');
                    }
                }
            });
        }

        // Neyron tugunlari yoki tavsiya etilgan mavzularni ochish
        container.querySelectorAll('[data-dash-topic], [data-open-topic-map], [data-continue-topic]').forEach(function (el) {
            el.addEventListener('click', function () {
                const topicId = el.getAttribute('data-dash-topic') ||
                                el.getAttribute('data-open-topic-map') ||
                                el.getAttribute('data-continue-topic');
                if (window.PsychAtlasApp && topicId) {
                    window.PsychAtlasApp.openTopicInAtlas(topicId);
                }
            });
        });

        // Kun savoli javobini tekshirish
        container.querySelectorAll('[data-daily-opt]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                if (!dailyQ) return;
                const idx = Number(btn.getAttribute('data-daily-opt'));
                const isCorrect = idx === dailyQ.correctAnswer;
                const st = window.PsychAtlasStorage.getState();
                st.dailyQuestionAnswered[todayKey] = {
                    questionId: dailyQ.id,
                    selectedIndex: idx,
                    isCorrect: isCorrect
                };
                window.PsychAtlasStorage.logActivity(
                    'daily_question',
                    'Kun savoliga javob berildi',
                    isCorrect ? 'To‘g‘ri javob topildi!' : 'Javob va ilmiy izoh ko‘rib chiqildi',
                    isCorrect ? 15 : 5
                );
                renderDashboard();
            });
        });

        // Backup Eksport / Import
        const expBtn = container.querySelector('#btnExportBackupDash');
        if (expBtn) {
            expBtn.addEventListener('click', function () {
                window.PsychAtlasStorage.exportBackupJSON();
            });
        }
        const impInput = container.querySelector('#inputImportBackupDash');
        if (impInput) {
            impInput.addEventListener('change', function (e) {
                const file = e.target.files && e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = function (ev) {
                    try {
                        window.PsychAtlasStorage.importBackupJSON(ev.target.result);
                        renderDashboard();
                        if (window.PsychAtlasApp) window.PsychAtlasApp.showToast('Zahira nusxa muvaffaqiyatli tiklandi!', 'success');
                    } catch (err) {
                        if (window.PsychAtlasApp) window.PsychAtlasApp.showToast('Faylni o‘qishda xatolik: ' + err.message, 'error');
                    }
                };
                reader.readAsText(file);
            });
        }
    }

    window.PsychAtlasDashboard = {
        render: renderDashboard
    };
})(window);
