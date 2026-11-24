/**
 * PSYCHOLOGY ATLAS — VIRTUAL PSIXOLOGIYA LABORATORIYASI (7 TA INTERAKTIV TAJRIBA)
 *
 * Muhim etik qoida:
 * Barcha tajriba natijalari faqat o'quv-ilmiy namoyish maqsadida talqin qilinadi.
 * Hech qanday tajriba klinik tashxis, IQ bahosi yoki shaxsga oid qat'iy xulosa emas.
 */
(function (window) {
    'use strict';

    const EXPERIMENTS = [
        {
            id: 'exp-stroop',
            no: 1,
            title: 'Stroop effekti (Kognitiv interferensiya)',
            icon: 'fa-palette',
            color: '#f43f5e',
            topicId: 'diqqat',
            process: 'Ixtiyoriy diqqat, tanlovchanlik va avtomatik reaksiyani tormozlash',
            purpose: 'So‘zning leksik ma’nosi bilan u yozilgan harflar rangi mos kelmaganda (inkongruent holat) diqqat va reaksiya vaqti qanday o‘zgarishini tajribada aniqlash.',
            scientificBasis: '1935-yilda J.R. Strup (John Ridley Stroop) tomonidan kashf etilgan. O‘qish ko‘nikmasi yuqori darajada avtomatlashgani sababli, miya so‘zni rangidan oldin o‘qiydi. Harf rangini to‘g‘ri topish uchun prefrontal po‘stloq ixtiyoriy diqqat yordamida avtomatik o‘qish impulsini bostirishi kerak.',
            instructions: 'Ekranda rang nomlari («QIZIL», «KO‘K», «YASHIL», «SARIQ») turli rangdagi harflarda chiqadi. So‘zning ma’nosiga EMAS, balki u yozilgan HARF RANGIGA mos tugmani imkon qadar tez bosing (8 ta sinov).'
        },
        {
            id: 'exp-attention',
            no: 2,
            title: 'Vizual diqqat sinovi (Shulte jadvali)',
            icon: 'fa-table-cells',
            color: '#38bdf8',
            topicId: 'diqqat',
            process: 'Diqqatning taqsimlanishi, ko‘lami va ko‘chish tezligi',
            purpose: 'Vizual qidiruv jarayonida diqqatning bir obyektdan ikkinchisiga ko‘chish tezligi va periferik ko‘rish ko‘lamini o‘lchash.',
            scientificBasis: 'Nemis psixiatri va psixologi Valter Shulte (W. Schulte) tomonidan diqqatning barqarorligi va dinamik ko‘chish tezligini o‘rganish uchun ishlab chiqilgan klassik eksperimental metodika.',
            instructions: '4×4 katakda 1 dan 16 gacha bo‘lgan sonlar tasodifiy joylashgan. Ularni 1 dan boshlab 16 gacha o‘sish tartibida (1 → 2 → 3 ... → 16) xatosiz va tez bosing.'
        },
        {
            id: 'exp-stm',
            no: 3,
            title: 'Qisqa muddatli xotira mashqi (Miller 7±2 qonuni)',
            icon: 'fa-memory',
            color: '#10b981',
            topicId: 'xotira',
            process: 'Qisqa muddatli (operativ) xotira hajmi va esda olib qolish',
            purpose: 'Bir marta qisqa vaqt ko‘rsatilgan elementlar (sonlar va tushunchalar) dan nechtasini xotirada darhol tiklay olish hajmini sinash.',
            scientificBasis: '1956-yilda kognitiv psixolog Jorj Miller (George A. Miller) insonning qisqa muddatli xotirasi o‘rtacha 7 ± 2 (5 tadan 9 tagacha) alohida birlikni bir vaqtda ushlab tura olishini isbotlagan.',
            instructions: 'Ekranda 7 ta ikki xonali son 4 soniya davomida ko‘rsatiladi. Ular yashiringach, eslab qolgan sonlaringizni bo‘sh joy yoki vergul bilan ajratib kiriting (tartibi ixtiyoriy).'
        },
        {
            id: 'exp-sequence',
            no: 4,
            title: 'Ketma-ketlikni eslab qolish (Fazoviy-vizual xotira)',
            icon: 'fa-grip',
            color: '#a855f7',
            topicId: 'xotira',
            process: 'Obrazli va harakat xotirasi, ketma-ketlikni kodlash',
            purpose: 'Fazoviy joylashuv va vaqt ketma-ketligida yonib-o‘chgan bloklar tartibini xotirada saqlash hamda qayta tiklash aniqligini o‘rganish.',
            scientificBasis: '1972-yilda Filip Korsi (Philip M. Corsi) tomonidan ishlab chiqilgan «Corsi block-tapping» tajribasiga asoslanadi va ishchi xotiraning vizual-fazoviy matritsasini (Baddeley & Hitch modeli) baholaydi.',
            instructions: '3×3 maydondagi kataklar navbatma-navbat oltin rangda yonib-o‘chadi. Namoyish tugagach, kataklarni aynan o‘sha ketma-ketlikda bosing (3 bosqich: 4, 5 va 6 talik zanjir).'
        },
        {
            id: 'exp-reaction',
            no: 5,
            title: 'Reaksiya vaqti sinovi (Sensomotor tezlik)',
            icon: 'fa-bolt-lightning',
            color: '#f59e0b',
            topicId: 'temperament-xususiyatlari',
            process: 'Asab jarayonlari harakatchanligi, reaktivlik va sensomotor javob',
            purpose: 'Ko‘rish retseptoriga kelgan signalning bosh miya po‘stlog‘ida qayta ishlanib, qo‘l mushaklariga harakat buyrug‘i yetib borguncha ketadigan vaqtni (millisekundda) o‘lchash.',
            scientificBasis: 'Eksperimental psixologiyada F. Donders (1868) va V. Vundt (1879) tomonidan qo‘llanilgan xronometrik metod bo‘lib, oliy nerv faoliyatining qo‘zg‘alish tezligi va diqqat tayyorligini ko‘rsatadi.',
            instructions: '«Sinovni boshlash» tugmasini bosing. Maydon qizil/sariq bo‘lib turganda kuting va u YASHIL rangga o‘zgarishi bilan darhol ustiga bosing (3 marta o‘lchanib, o‘rtacha qiymat hisoblanadi).'
        },
        {
            id: 'exp-illusion',
            no: 6,
            title: 'Idrok va optik illuziyalar (Myuller-Layer tajribasi)',
            icon: 'fa-eye',
            color: '#6366f1',
            topicId: 'idrok',
            process: 'Idrokning yaxlitligi, konstantligi va kontekstual xatoliklar',
            purpose: 'Atrofdagi fon va qo‘shimcha belgilar (strelka uchlari) bizning uzunlik va kattalikni yaxlit idrok etishimizga qanday ta’sir qilishini o‘lchash.',
            scientificBasis: '1889-yilda Frans Myuller-Layer (Franz Carl Müller-Lyer) tomonidan taqdim etilgan optik illuziya. Geshtalt psixologiyaga ko‘ra, ko‘zimiz kesmani alohida emas, balki uning uchidagi burchaklar bilan yaxlit shakl sifatida idrok etadi.',
            instructions: 'Yuqoridagi etalon chiziq uzunligiga qarab, pastdagi (qarama-qarshi qanotli) chiziqni slayder yordamida ko‘z chamasi bilan tenglashtiring va «Tekshirish» tugmasini bosing.'
        },
        {
            id: 'exp-thinking',
            no: 7,
            title: 'Tafakkur va mantiqiy fikrlash mashqlari',
            icon: 'fa-Lightbulb',
            color: '#D6B56D',
            topicId: 'tafakkur',
            process: 'Induksiya, deduksiya, tushuncha va mantiqiy xulosa chiqarish',
            purpose: 'Deduktiv sillogizmlar, induktiv qonuniyatni topish va shartli hukmlarni tekshirishda tafakkur operatsiyalari aniqligini sinash.',
            scientificBasis: 'Arastu sillogistikasi hamda kognitiv psixolog Piter Ueysonning (Peter Wason, 1966) mantiqiy xulosa chiqarish tadqiqotlariga asoslanadi.',
            instructions: '4 ta ketma-ket mantiqiy-kognitiv topshiriqni (deduksiya, induksiya, tushunchalar tasnifi va mantiqiy xatoni topish) tahlil qilib yeching.'
        }
    ];

    let activeExpId = 'exp-stroop';
    let cleanupTimer = null;

    function clearLabTimers() {
        if (cleanupTimer) {
            clearTimeout(cleanupTimer);
            clearInterval(cleanupTimer);
            cleanupTimer = null;
        }
    }

    function renderLaboratory() {
        clearLabTimers();
        const container = document.getElementById('labViewport');
        if (!container) return;

        const state = window.PsychAtlasStorage.getState();
        const esc = window.PsychAtlasUtils.escapeHtml;
        const activeExp = EXPERIMENTS.find(function (e) { return e.id === activeExpId; }) || EXPERIMENTS[0];
        const prevResult = state.labResults[activeExp.id] || null;

        container.innerHTML =
            '<div class="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">' +
                '<!-- Laboratoriya Header va Etik Eslatma -->' +
                '<div class="atlas-card p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">' +
                    '<div>' +
                        '<span class="text-xs font-bold uppercase tracking-wider text-sky-400"><i class="fa-solid fa-flask-vial mr-1.5"></i>VIRTUAL PSIXOLOGIYA LABORATORIYASI (V. VUNDT MEROSI)</span>' +
                        '<h2 class="serif text-2xl sm:text-3xl font-bold mt-1">7 ta interaktiv kognitiv va psixofiziologik tajriba</h2>' +
                        '<p class="text-xs sm:text-sm mt-1" style="color:var(--text-secondary)">Nazariy bilimlarni o‘z tajribangizda sinab ko‘ring: diqqat, xotira, idrok, reaksiya tezligi va mantiqiy tafakkur.</p>' +
                    '</div>' +
                    '<div class="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-[11px] max-w-md">' +
                        '<b class="text-amber-300"><i class="fa-solid fa-shield-heart mr-1"></i>Akademik eslatma:</b> Natijalar faqat o‘quv maqsadida psixologik jarayonlarni tushunish uchun talqin qilinadi va klinik tashxis yoki IQ bahosi hisoblanmaydi.' +
                    '</div>' +
                '</div>' +

                '<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">' +
                    '<!-- Chap: 7 Tajriba Tanlovi -->' +
                    '<div class="lg:col-span-4 space-y-2.5">' +
                        EXPERIMENTS.map(function (exp) {
                            const isSel = exp.id === activeExp.id;
                            const done = !!state.labResults[exp.id];
                            return '<button data-select-exp="' + exp.id + '" class="w-full text-left p-4 rounded-2xl transition border flex items-start gap-3.5 ' +
                                (isSel ? 'atlas-card border-amber-400/60' : 'atlas-surface hover:border-white/25') + '">' +
                                '<span class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-base" style="background:' + exp.color + '22;color:' + exp.color + '">' +
                                    '<i class="fa-solid ' + exp.icon + '"></i>' +
                                '</span>' +
                                '<div class="min-w-0 flex-1">' +
                                    '<div class="flex items-center justify-between gap-2">' +
                                        '<span class="text-[10px] font-extrabold uppercase tracking-wider" style="color:' + exp.color + '">' + exp.no + '-TAJRIBA</span>' +
                                        (done ? '<span class="text-[10px] font-bold text-emerald-400"><i class="fa-solid fa-circle-check mr-1"></i>Bajarilgan</span>' : '') +
                                    '</div>' +
                                    '<h3 class="font-bold text-sm mt-0.5 leading-snug">' + esc(exp.title) + '</h3>' +
                                    '<p class="text-[11px] line-clamp-1 mt-0.5" style="color:var(--text-secondary)">' + esc(exp.process) + '</p>' +
                                '</div>' +
                            '</button>';
                        }).join('') +
                    '</div>' +

                    '<!-- O‘ng: Tanlangan Tajriba Maydoni -->' +
                    '<div class="lg:col-span-8 atlas-card p-6 sm:p-8 flex flex-col justify-between space-y-6">' +
                        '<div class="space-y-4">' +
                            '<div class="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/10">' +
                                '<div>' +
                                    '<span class="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase" style="background:' + activeExp.color + '22;color:' + activeExp.color + '">' +
                                        activeExp.no + '-tajriba · ' + esc(activeExp.process) +
                                    '</span>' +
                                    '<h3 class="serif text-xl sm:text-2xl font-bold mt-2">' + esc(activeExp.title) + '</h3>' +
                                '</div>' +
                                '<button data-exp-open-topic="' + activeExp.topicId + '" class="px-3 py-1.5 rounded-xl text-xs font-bold atlas-surface hover:border-white/30">' +
                                    '<i class="fa-solid fa-diagram-project mr-1.5"></i>Tegishli mavzu xaritasi' +
                                '</button>' +
                            '</div>' +

                            '<div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">' +
                                '<div class="p-3.5 rounded-xl atlas-surface">' +
                                    '<div class="font-bold uppercase text-[10px] tracking-wider mb-1" style="color:var(--gold-accent)"><i class="fa-solid fa-bullseye mr-1"></i>Tajriba maqsadi</div>' +
                                    '<p class="leading-relaxed" style="color:var(--text-secondary)">' + esc(activeExp.purpose) + '</p>' +
                                '</div>' +
                                '<div class="p-3.5 rounded-xl atlas-surface">' +
                                    '<div class="font-bold uppercase text-[10px] tracking-wider mb-1 text-purple-400"><i class="fa-solid fa-microscope mr-1"></i>Ilmiy asos</div>' +
                                    '<p class="leading-relaxed" style="color:var(--text-secondary)">' + esc(activeExp.scientificBasis) + '</p>' +
                                '</div>' +
                            '</div>' +

                            '<div class="p-3.5 rounded-xl bg-sky-500/10 border border-sky-500/25 text-xs">' +
                                '<b class="text-sky-300"><i class="fa-solid fa-circle-info mr-1.5"></i>Yo‘riqnoma:</b> ' + esc(activeExp.instructions) +
                            '</div>' +

                            (prevResult ? (
                                '<div class="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-xs flex flex-wrap items-center justify-between gap-2">' +
                                    '<span><i class="fa-solid fa-award text-emerald-400 mr-1.5"></i><b>So‘nggi natijangiz:</b> ' + esc(prevResult.lastResult) + '</span>' +
                                    '<span class="opacity-75">Urinishlar: ' + prevResult.attempts + ' marta</span>' +
                                '</div>'
                            ) : '') +
                        '</div>' +

                        '<!-- INTERAKTIV TAJRIBA SAHNASI -->' +
                        '<div id="labInteractiveStage" class="p-6 rounded-2xl atlas-surface min-h-[290px] flex flex-col items-center justify-center text-center">' +
                            '<div class="max-w-md space-y-4">' +
                                '<div class="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center text-2xl" style="background:' + activeExp.color + '22;color:' + activeExp.color + '">' +
                                    '<i class="fa-solid ' + activeExp.icon + '"></i>' +
                                '</div>' +
                                '<h4 class="font-bold text-base">Tajribani boshlashga tayyormisiz?</h4>' +
                                '<p class="text-xs" style="color:var(--text-secondary)">Yo‘riqnoma bilan tanishib chiqqach, quyidagi tugmani bosib interaktiv sinovni boshlang.</p>' +
                                '<button id="btnStartLabExp" class="px-6 py-3 rounded-xl font-bold text-sm text-slate-950 shadow-lg transition hover:scale-105" style="background:linear-gradient(135deg, #D6B56D 0%, #F59E0B 100%);">' +
                                    '<i class="fa-solid fa-play mr-1.5"></i>Tajribani boshlash' +
                                '</button>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>';

        container.querySelectorAll('[data-select-exp]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                activeExpId = btn.getAttribute('data-select-exp');
                renderLaboratory();
            });
        });

        container.querySelectorAll('[data-exp-open-topic]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var tid = btn.getAttribute('data-exp-open-topic');
                if (window.PsychAtlasApp) window.PsychAtlasApp.openTopicInAtlas(tid, 'map');
            });
        });

        var startBtn = container.querySelector('#btnStartLabExp');
        if (startBtn) {
            startBtn.addEventListener('click', function () {
                launchExperiment(activeExp);
            });
        }
    }

    function showExperimentCompletion(exp, resultSummary, metricValue, detailedExplanationHtml) {
        clearLabTimers();
        window.PsychAtlasStorage.saveLabResult(exp.id, exp.title, resultSummary, metricValue);
        const stage = document.getElementById('labInteractiveStage');
        if (!stage) return;

        stage.innerHTML =
            '<div class="w-full max-w-xl mx-auto text-left space-y-4">' +
                '<div class="flex items-center justify-between gap-3 p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/35">' +
                    '<div>' +
                        '<div class="text-xs font-extrabold uppercase text-emerald-400">TAJRIBA YAKUNLANDI (+30 XP)</div>' +
                        '<div class="text-base sm:text-lg font-bold mt-0.5">' + window.PsychAtlasUtils.escapeHtml(resultSummary) + '</div>' +
                    '</div>' +
                    '<i class="fa-solid fa-circle-check text-3xl text-emerald-400"></i>' +
                '</div>' +
                '<div class="p-4 rounded-2xl bg-black/25 space-y-2 text-xs leading-relaxed">' +
                    '<div class="font-bold text-amber-300"><i class="fa-solid fa-lightbulb mr-1.5"></i>Natijaning ilmiy-psixologik tahlili:</div>' +
                    '<div>' + detailedExplanationHtml + '</div>' +
                    '<div class="pt-2 border-t border-white/10 text-[11px]" style="color:var(--text-secondary)">' +
                        '<b>O‘rganilgan jarayon:</b> ' + window.PsychAtlasUtils.escapeHtml(exp.process) +
                    '</div>' +
                '</div>' +
                '<div class="flex flex-wrap items-center justify-between gap-3">' +
                    '<button id="btnRetryLabExp" class="px-5 py-2.5 rounded-xl font-bold text-xs text-slate-950 transition" style="background:var(--gold-accent)">' +
                        '<i class="fa-solid fa-rotate-right mr-1.5"></i>Qayta bajarish' +
                    '</button>' +
                    '<button id="btnLabGotoTopic" class="px-4 py-2.5 rounded-xl font-bold text-xs atlas-surface hover:border-white/30">' +
                        '<i class="fa-solid fa-diagram-project mr-1.5"></i>Mavzuni Atlasda mustahkamlash' +
                    '</button>' +
                '</div>' +
            '</div>';

        stage.querySelector('#btnRetryLabExp').addEventListener('click', function () {
            launchExperiment(exp);
        });
        stage.querySelector('#btnLabGotoTopic').addEventListener('click', function () {
            if (window.PsychAtlasApp) window.PsychAtlasApp.openTopicInAtlas(exp.topicId, 'map');
        });
    }

    function launchExperiment(exp) {
        clearLabTimers();
        const stage = document.getElementById('labInteractiveStage');
        if (!stage) return;

        if (exp.id === 'exp-stroop') runStroopExp(exp, stage);
        else if (exp.id === 'exp-attention') runSchulteExp(exp, stage);
        else if (exp.id === 'exp-stm') runStmExp(exp, stage);
        else if (exp.id === 'exp-sequence') runSequenceExp(exp, stage);
        else if (exp.id === 'exp-reaction') runReactionExp(exp, stage);
        else if (exp.id === 'exp-illusion') runIllusionExp(exp, stage);
        else if (exp.id === 'exp-thinking') runThinkingExp(exp, stage);
    }

    /* 1. STROOP EFFEKTI */
    function runStroopExp(exp, stage) {
        const COLORS = [
            { id: 'red', label: 'QIZIL', hex: '#ef4444' },
            { id: 'blue', label: 'KO‘K', hex: '#3b82f6' },
            { id: 'green', label: 'YASHIL', hex: '#10b981' },
            { id: 'yellow', label: 'SARIQ', hex: '#eab308' }
        ];
        const trials = [
            { wordIdx: 0, inkIdx: 0, congruent: true },
            { wordIdx: 1, inkIdx: 1, congruent: true },
            { wordIdx: 2, inkIdx: 0, congruent: false },
            { wordIdx: 0, inkIdx: 3, congruent: false },
            { wordIdx: 3, inkIdx: 3, congruent: true },
            { wordIdx: 1, inkIdx: 2, congruent: false },
            { wordIdx: 3, inkIdx: 1, congruent: false },
            { wordIdx: 2, inkIdx: 2, congruent: true }
        ];
        let idx = 0;
        let correct = 0;
        let congTimes = [];
        let incongTimes = [];
        let stepStart = 0;

        function renderStep() {
            if (idx >= trials.length) {
                const avgCong = congTimes.length ? Math.round(congTimes.reduce(function (a, b) { return a + b; }, 0) / congTimes.length) : 0;
                const avgIncong = incongTimes.length ? Math.round(incongTimes.reduce(function (a, b) { return a + b; }, 0) / incongTimes.length) : 0;
                const diff = Math.max(0, avgIncong - avgCong);
                const summary = 'Aniqlik: ' + correct + '/8 · Interferensiya farqi: +' + diff + ' ms (Mos: ' + avgCong + ' ms, Zid: ' + avgIncong + ' ms)';
                const expl = 'Mos keluvchi (kongruent) so‘zlarda o‘rtacha reaksiyangiz <b>' + avgCong + ' ms</b>, so‘z ma’nosi va harf rangi zid (inkongruent) holatda esa <b>' + avgIncong + ' ms</b> bo‘ldi. Bu farq (<b>+' + diff + ' ms</b>) «Strup interferensiyasi» deyiladi va ixtiyoriy diqqatning avtomatik o‘qish ko‘nikmasini tormozlash uchun sarflagan vaqtini ifodalaydi.';
                showExperimentCompletion(exp, summary, diff, expl);
                return;
            }
            const t = trials[idx];
            const word = COLORS[t.wordIdx].label;
            const ink = COLORS[t.inkIdx];
            stepStart = performance.now();

            stage.innerHTML =
                '<div class="w-full max-w-md space-y-5">' +
                    '<div class="flex items-center justify-between text-xs" style="color:var(--text-secondary)">' +
                        '<span>Sinov: <b>' + (idx + 1) + ' / ' + trials.length + '</b></span>' +
                        '<span>So‘zni o‘qimang — <b>HARF RANGINI</b> tanlang!</span>' +
                    '</div>' +
                    '<div class="py-8 rounded-2xl bg-black/35 border border-white/10 text-4xl sm:text-5xl font-black tracking-wider select-none" style="color:' + ink.hex + '">' +
                        word +
                    '</div>' +
                    '<div class="grid grid-cols-2 gap-3">' +
                        COLORS.map(function (c) {
                            return '<button data-stroop-ans="' + c.id + '" class="py-3 px-4 rounded-xl font-bold text-xs sm:text-sm atlas-card hover:border-white/40 transition flex items-center justify-center gap-2">' +
                                '<span class="w-3.5 h-3.5 rounded-full" style="background:' + c.hex + '"></span>' +
                                '<span>' + c.label + '</span>' +
                            '</button>';
                        }).join('') +
                    '</div>' +
                '</div>';

            stage.querySelectorAll('[data-stroop-ans]').forEach(function (btn) {
                btn.addEventListener('click', function () {
                    const elapsed = Math.round(performance.now() - stepStart);
                    const ans = btn.getAttribute('data-stroop-ans');
                    if (ans === ink.id) correct++;
                    if (t.congruent) congTimes.push(elapsed);
                    else incongTimes.push(elapsed);
                    idx++;
                    renderStep();
                });
            });
        }
        renderStep();
    }

    /* 2. VIZUAL DIQQAT (SHULTE 4x4) */
    function runSchulteExp(exp, stage) {
        const nums = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
        for (let i = nums.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const tmp = nums[i]; nums[i] = nums[j]; nums[j] = tmp;
        }
        let target = 1;
        let mistakes = 0;
        const startTime = performance.now();

        function drawGrid() {
            stage.innerHTML =
                '<div class="w-full max-w-sm space-y-4">' +
                    '<div class="flex items-center justify-between text-xs">' +
                        '<span>Navbatdagi son: <b class="text-base text-amber-400">' + target + '</b> / 16</span>' +
                        '<span>Xatolar: <b>' + mistakes + '</b></span>' +
                    '</div>' +
                    '<div class="grid grid-cols-4 gap-2.5">' +
                        nums.map(function (n) {
                            const found = n < target;
                            return '<button data-schulte="' + n + '" ' + (found ? 'disabled' : '') + ' class="h-14 rounded-xl font-extrabold text-base transition ' +
                                (found ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 opacity-50' : 'atlas-card hover:border-amber-400') + '">' +
                                n +
                            '</button>';
                        }).join('') +
                    '</div>' +
                '</div>';

            stage.querySelectorAll('[data-schulte]').forEach(function (btn) {
                btn.addEventListener('click', function () {
                    const val = Number(btn.getAttribute('data-schulte'));
                    if (val === target) {
                        target++;
                        if (target > 16) {
                            const totalSec = ((performance.now() - startTime) / 1000).toFixed(1);
                            const summary = 'Vaqt: ' + totalSec + ' soniya · Xatolar: ' + mistakes + ' ta';
                            const expl = 'Siz 16 ta sonni o‘sish tartibida <b>' + totalSec + ' soniyada</b> topdingiz. Shulte jadvalida har bir sonni qidirish diqqatning bir nuqtadan ikkinchisiga ixtiyoriy ko‘chishi hamda ko‘rish maydonining taqsimlanishiga tayanadi.';
                            showExperimentCompletion(exp, summary, Number(totalSec), expl);
                        } else {
                            drawGrid();
                        }
                    } else {
                        mistakes++;
                        btn.classList.add('border-rose-500');
                        drawGrid();
                    }
                });
            });
        }
        drawGrid();
    }

    /* 3. QISQA MUDDATLI XOTIRA (MILLER 7±2) */
    function runStmExp(exp, stage) {
        const pool = ['14', '27', '39', '46', '53', '68', '72', '85', '91'];
        const chosen = pool.sort(function () { return 0.5 - Math.random(); }).slice(0, 7);
        let countdown = 4;

        function renderMemorize() {
            stage.innerHTML =
                '<div class="space-y-4 max-w-md">' +
                    '<div class="text-xs font-bold text-amber-300">Quyidagi 7 ta sonni eslab qoling (' + countdown + ' soniya qoldi):</div>' +
                    '<div class="flex flex-wrap items-center justify-center gap-2.5 py-4">' +
                        chosen.map(function (num) {
                            return '<span class="px-4 py-3 rounded-xl font-black text-xl atlas-card border border-amber-400/40">' + num + '</span>';
                        }).join('') +
                    '</div>' +
                '</div>';
        }
        renderMemorize();

        cleanupTimer = setInterval(function () {
            countdown--;
            if (countdown > 0) {
                renderMemorize();
            } else {
                clearLabTimers();
                stage.innerHTML =
                    '<div class="w-full max-w-md space-y-4">' +
                        '<div class="text-xs font-bold">Eslab qolgan sonlaringizni bo‘sh joy bilan ajratib yozing:</div>' +
                        '<input id="stmInput" type="text" placeholder="Masalan: 14 39 72..." class="w-full px-4 py-3 rounded-xl text-sm atlas-card text-center font-bold">' +
                        '<button id="btnCheckStm" class="px-6 py-2.5 rounded-xl font-bold text-xs text-slate-950" style="background:var(--gold-accent)">Natijani tekshirish</button>' +
                    '</div>';
                const inp = stage.querySelector('#stmInput');
                if (inp) inp.focus();
                stage.querySelector('#btnCheckStm').addEventListener('click', function () {
                    const raw = (inp.value || '').trim();
                    const entered = raw.split(/[\s,;]+/).filter(Boolean);
                    let hits = 0;
                    chosen.forEach(function (c) {
                        if (entered.indexOf(c) !== -1) hits++;
                    });
                    const summary = 'Eslab qolindi: ' + hits + ' / 7 ta element (' + Math.round((hits / 7) * 100) + '%)';
                    const expl = 'Ko‘rsatilgan 7 ta sondan (' + chosen.join(', ') + ') siz <b>' + hits + ' tasini</b> to‘g‘ri qayta esga tushirdingiz. J. Millerning «7 ± 2» qonuniga ko‘ra, qisqa muddatli xotira 5 tadan 9 tagacha axborot birligini bir vaqtda saqlaydi. Elementlarni ma’noli guruhlash (chunking) bu hajmni oshiradi.';
                    showExperimentCompletion(exp, summary, hits, expl);
                });
            }
        }, 1000);
    }

    /* 4. KETMA-KETLIKNI ESLAB QOLISH (CORSI BLOCKS) */
    function runSequenceExp(exp, stage) {
        let levelLen = 4; // 4 -> 5 -> 6
        let totalCorrectLevels = 0;

        function startRound() {
            const seq = [];
            while (seq.length < levelLen) {
                const r = Math.floor(Math.random() * 9);
                if (seq.indexOf(r) === -1) seq.push(r);
            }
            let userSeq = [];
            let showing = true;

            function renderBoard(activeCell, statusMsg) {
                stage.innerHTML =
                    '<div class="space-y-4">' +
                        '<div class="text-xs font-bold">' + statusMsg + ' (Zanjir uzunligi: ' + levelLen + ')</div>' +
                        '<div class="grid grid-cols-3 gap-3 w-56 mx-auto">' +
                            [0,1,2,3,4,5,6,7,8].map(function (idx) {
                                const isLit = activeCell === idx;
                                const isPicked = !showing && userSeq.indexOf(idx) !== -1;
                                return '<button data-corsi="' + idx + '" ' + (showing ? 'disabled' : '') + ' class="h-16 rounded-2xl transition border ' +
                                    (isLit ? 'bg-amber-400 border-white scale-105 shadow-lg' :
                                    (isPicked ? 'bg-emerald-500/30 border-emerald-400' : 'atlas-card hover:border-white/40')) + '"></button>';
                            }).join('') +
                        '</div>' +
                    '</div>';

                if (!showing) {
                    stage.querySelectorAll('[data-corsi]').forEach(function (btn) {
                        btn.addEventListener('click', function () {
                            const cell = Number(btn.getAttribute('data-corsi'));
                            userSeq.push(cell);
                            const stepIdx = userSeq.length - 1;
                            if (userSeq[stepIdx] !== seq[stepIdx]) {
                                const summary = 'Fazoviy xotira zanjiri: ' + (levelLen - 1) + ' ta ketma-ket blok muvaffaqiyatli eslab qolindi';
                                const expl = 'Fazoviy-ketma-ketlik sinovida siz <b>' + totalCorrectLevels + ' bosqichni</b> xatosiz bajardingiz. Ushbu mashq obrazli va harakat xotirasining fazoviy tartibni kodlash mexanizmini namoyish etadi.';
                                showExperimentCompletion(exp, summary, totalCorrectLevels, expl);
                                return;
                            }
                            if (userSeq.length === seq.length) {
                                totalCorrectLevels++;
                                if (levelLen >= 6) {
                                    const summary = 'Maksimal natija: 6 talik fazoviy ketma-ketlik 100% xatosiz tiklandi!';
                                    const expl = 'Siz barcha 3 bosqichni (4, 5 va 6 elementli fazoviy ketma-ketlikni) bexato eslab qoldingiz. Bu vizual-fazoviy operativ xotira va diqqat konsentratsiyasining yuqori uyg‘unligini ko‘rsatadi.';
                                    showExperimentCompletion(exp, summary, 6, expl);
                                } else {
                                    levelLen++;
                                    startRound();
                                }
                            } else {
                                renderBoard(-1, 'Endi aynan shu tartibda bosing: ' + userSeq.length + '/' + seq.length);
                            }
                        });
                    });
                }
            }

            let i = 0;
            renderBoard(-1, 'Diqqat bilan kuzating...');
            cleanupTimer = setInterval(function () {
                if (i < seq.length) {
                    renderBoard(seq[i], 'Yonayotgan kataklar tartibini eslab qoling...');
                    i++;
                } else {
                    clearLabTimers();
                    showing = false;
                    renderBoard(-1, 'Endi kataklarni aynan o‘sha tartibda bosing!');
                }
            }, 750);
        }
        startRound();
    }

    /* 5. REAKSIYA VAQTI SINOVI */
    function runReactionExp(exp, stage) {
        let times = [];
        let round = 1;

        function nextTrial() {
            let stateMode = 'waiting'; // 'waiting' | 'go'
            let goTimestamp = 0;

            stage.innerHTML =
                '<button id="reactionBox" class="w-full max-w-md h-48 rounded-2xl bg-amber-500/20 border-2 border-amber-400/60 flex flex-col items-center justify-center gap-2 transition">' +
                    '<i class="fa-solid fa-hourglass-half text-2xl text-amber-300"></i>' +
                    '<span class="font-bold text-base">Kuting... Yashil rang yonishini poylang (' + round + '/3)</span>' +
                    '<span class="text-xs opacity-75">Erta bosmang!</span>' +
                '</button>';

            const box = stage.querySelector('#reactionBox');
            const delay = 1400 + Math.floor(Math.random() * 2000);

            cleanupTimer = setTimeout(function () {
                stateMode = 'go';
                goTimestamp = performance.now();
                box.className = 'w-full max-w-md h-48 rounded-2xl bg-emerald-500 text-slate-950 border-2 border-white flex flex-col items-center justify-center gap-2 shadow-2xl';
                box.innerHTML =
                    '<i class="fa-solid fa-bolt text-3xl"></i>' +
                    '<span class="font-black text-2xl">HOZIR BOSING!</span>';
            }, delay);

            box.addEventListener('click', function () {
                if (stateMode === 'waiting') {
                    clearLabTimers();
                    box.innerHTML = '<span class="font-bold text-rose-300">Juda erta bosdingiz! Qaytadan boshlanmoqda...</span>';
                    cleanupTimer = setTimeout(nextTrial, 1000);
                } else if (stateMode === 'go') {
                    const rt = Math.round(performance.now() - goTimestamp);
                    times.push(rt);
                    if (round < 3) {
                        round++;
                        nextTrial();
                    } else {
                        const avg = Math.round(times.reduce(function (a, b) { return a + b; }, 0) / times.length);
                        const summary = 'O‘rtacha sensomotor reaksiya vaqti: ' + avg + ' ms (Urinishlar: ' + times.join(' ms, ') + ' ms)';
                        const expl = 'Vizual signalga o‘rtacha javob tezligingiz <b>' + avg + ' millisekund</b> bo‘ldi (inson uchun odatiy ko‘rsatkich 180–300 ms oralig‘ida). Bu vaqt ko‘z to‘r pardasidan bosh miya ko‘rish markaziga va undan harakat po‘stlog‘i orqali barmoq mushaklarigacha impuls o‘tish tezligini bildiradi.';
                        showExperimentCompletion(exp, summary, avg, expl);
                    }
                }
            });
        }
        nextTrial();
    }

    /* 6. IDROK VA OPTIK ILLUZIYALAR (MYULLER-LAYER) */
    function runIllusionExp(exp, stage) {
        const targetLength = 180;
        let userLength = 140;

        function renderIllusion() {
            stage.innerHTML =
                '<div class="w-full max-w-lg space-y-4">' +
                    '<div class="text-xs font-bold">Pastdagi qizil chiziq uzunligini yuqoridagi ko‘k chiziq bilan bir xil qilib sozlang:</div>' +
                    '<div class="p-4 rounded-2xl bg-black/35 border border-white/10">' +
                        '<svg viewBox="0 0 420 150" class="w-full h-36">' +
                            '<!-- Yuqoridagi chiziq (tashqariga qaragan qanotlar) -->' +
                            '<g transform="translate(210, 45)">' +
                                '<line x1="' + (-targetLength/2) + '" y1="0" x2="' + (targetLength/2) + '" y2="0" stroke="#38bdf8" stroke-width="4"/>' +
                                '<polyline points="' + (-targetLength/2 - 18) + ',-14 ' + (-targetLength/2) + ',0 ' + (-targetLength/2 - 18) + ',14" fill="none" stroke="#38bdf8" stroke-width="3"/>' +
                                '<polyline points="' + (targetLength/2 + 18) + ',-14 ' + (targetLength/2) + ',0 ' + (targetLength/2 + 18) + ',14" fill="none" stroke="#38bdf8" stroke-width="3"/>' +
                            '</g>' +
                            '<!-- Pastdagi boshqariladigan chiziq (ichkariga qaragan qanotlar) -->' +
                            '<g transform="translate(210, 105)">' +
                                '<line id="userIllusionLine" x1="' + (-userLength/2) + '" y1="0" x2="' + (userLength/2) + '" y2="0" stroke="#f43f5e" stroke-width="4"/>' +
                                '<polyline id="userLeftWing" points="' + (-userLength/2 + 18) + ',-14 ' + (-userLength/2) + ',0 ' + (-userLength/2 + 18) + ',14" fill="none" stroke="#f43f5e" stroke-width="3"/>' +
                                '<polyline id="userRightWing" points="' + (userLength/2 - 18) + ',-14 ' + (userLength/2) + ',0 ' + (userLength/2 - 18) + ',14" fill="none" stroke="#f43f5e" stroke-width="3"/>' +
                            '</g>' +
                        '</svg>' +
                    '</div>' +
                    '<div class="flex items-center gap-3">' +
                        '<span class="text-xs">Qisqaroq</span>' +
                        '<input id="illusionSlider" type="range" min="110" max="250" value="' + userLength + '" class="flex-1 accent-amber-400">' +
                        '<span class="text-xs">Uzunroq</span>' +
                    '</div>' +
                    '<button id="btnCheckIllusion" class="px-6 py-2.5 rounded-xl font-bold text-xs text-slate-950" style="background:var(--gold-accent)">Haqiqiy o‘lchamni tekshirish</button>' +
                '</div>';

            const slider = stage.querySelector('#illusionSlider');
            slider.addEventListener('input', function () {
                userLength = Number(slider.value);
                const line = stage.querySelector('#userIllusionLine');
                const lw = stage.querySelector('#userLeftWing');
                const rw = stage.querySelector('#userRightWing');
                line.setAttribute('x1', -userLength / 2);
                line.setAttribute('x2', userLength / 2);
                lw.setAttribute('points', (-userLength/2 + 18) + ',-14 ' + (-userLength/2) + ',0 ' + (-userLength/2 + 18) + ',14');
                rw.setAttribute('points', (userLength/2 - 18) + ',-14 ' + (userLength/2) + ',0 ' + (userLength/2 - 18) + ',14');
            });

            stage.querySelector('#btnCheckIllusion').addEventListener('click', function () {
                const diffPx = Math.abs(userLength - targetLength);
                const errorPct = Math.round((diffPx / targetLength) * 100);
                const accuracyPct = Math.max(0, 100 - errorPct);
                const summary = 'Vizual aniqlik: ' + accuracyPct + '% · Farq: ' + diffPx + ' piksel (Etalon: 180 px, Tanlovingiz: ' + userLength + ' px)';
                const expl = 'Myuller-Layer illuziyasida tashqariga qaragan strelkalar chiziqni vizual ravishda uzunroq ko‘rsatadi. Shu sababli ko‘pchilik ikki chiziqni tenglashtirishda pastdagi chiziqni haqiqiy 180 pikseldan uzunroq qilib qo‘yadi. Bu <b>idrokning yaxlitlik</b> xususiyati (qismlarning butun kontekstga bo‘ysunishi) qanday ishlashini isbotlaydi.';
                showExperimentCompletion(exp, summary, accuracyPct, expl);
            });
        }
        renderIllusion();
    }

    /* 7. TAFAKKUR VA MANTIQIY FIKRLASH MASHQLARI */
    function runThinkingExp(exp, stage) {
        const tasks = [
            {
                type: 'Deduktiv sillogizm',
                q: '1-hukm: Barcha psixik jarayonlar bosh miya faoliyati bilan bog‘liq.\n2-hukm: Xotira — psixik jarayon.\nQaysi xulosa mantiqan zaruriy kelib chiqadi?',
                opts: [
                    'Demak, xotira bosh miya faoliyati bilan bog‘liq',
                    'Bosh miyaning barcha faoliyati faqat xotiradan iborat',
                    'Xotira ixtiyorsiz diqqatdan ustun turadi'
                ],
                ans: 0
            },
            {
                type: 'Induktiv qonuniyat',
                q: 'Ketma-ketlik qonuniyatini toping (Faoliyat zanjiri): Ehtiyoj → Motiv → Maqsad → ?',
                opts: [
                    'Harakat va operatsiya',
                    'Proprioreseptiv sezgi',
                    'Gumoral suyuqlik'
                ],
                ans: 0
            },
            {
                type: 'Tushunchalarni umumlashtirish',
                q: 'Quyidagi to‘rt tushunchadan qaysi biri mantiqiy hajmi bo‘yicha qolgan uchtasini o‘z ichiga oluvchi UMUMIY tushuncha hisoblanadi?',
                opts: [
                    'Bilish jarayonlari',
                    'Idrok',
                    'Tafakkur',
                    'Xotira'
                ],
                ans: 0
            },
            {
                type: 'Shartli mantiqiy hukm (Ueyson vazifasi)',
                q: 'Qoida: «Agar inson Xolerik temperamentli bo‘lsa, unda qo‘zg‘alish tormozlanishdan ustun bo‘ladi». Agar tekshiriluvchida qo‘zg‘alish va tormozlanish o‘zaro muvozanatli ekani aniqlansa, qanday xulosa chiqadi?',
                opts: [
                    'U Xolerik temperament tipiga mansub emas (masalan, Sangvinik yoki Flegmatik)',
                    'U albatta Melanxolik tipga mansub',
                    'Unda xarakter shakllanmagan'
                ],
                ans: 0
            }
        ];

        let step = 0;
        let score = 0;

        function renderTask() {
            if (step >= tasks.length) {
                const pct = Math.round((score / tasks.length) * 100);
                const summary = 'Mantiqiy tafakkur natijasi: ' + score + ' / ' + tasks.length + ' (' + pct + '%)';
                const expl = 'Siz deduktiv sillogizm, induktiv ketma-ketlik, tushunchalar ierarxiyasi va shartli hukм tahlilidan iborat 4 ta topshiriqdan <b>' + score + ' tasini</b> to‘g‘ri yechdingiz. Tafakkur bevosita idrok etib bo‘lmaydigan ichki mantiqiy bog‘lanishlarni tushuncha, hukm va xulosa orqali ochib beradi.';
                showExperimentCompletion(exp, summary, pct, expl);
                return;
            }
            const t = tasks[step];
            stage.innerHTML =
                '<div class="w-full max-w-lg text-left space-y-4">' +
                    '<div class="flex items-center justify-between text-xs">' +
                        '<span class="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold">' + t.type + '</span>' +
                        '<span>Topshiriq: <b>' + (step + 1) + ' / ' + tasks.length + '</b></span>' +
                    '</div>' +
                    '<p class="font-bold text-sm leading-relaxed whitespace-pre-line">' + window.PsychAtlasUtils.escapeHtml(t.q) + '</p>' +
                    '<div class="space-y-2">' +
                        t.opts.map(function (o, i) {
                            return '<button data-think-opt="' + i + '" class="w-full text-left p-3 rounded-xl text-xs sm:text-sm atlas-card hover:border-amber-400 transition">' +
                                window.PsychAtlasUtils.escapeHtml(o) +
                            '</button>';
                        }).join('') +
                    '</div>' +
                '</div>';

            stage.querySelectorAll('[data-think-opt]').forEach(function (btn) {
                btn.addEventListener('click', function () {
                    if (Number(btn.getAttribute('data-think-opt')) === t.ans) score++;
                    step++;
                    renderTask();
                });
            });
        }
        renderTask();
    }

    window.PsychAtlasLaboratory = {
        render: renderLaboratory
    };
})(window);
