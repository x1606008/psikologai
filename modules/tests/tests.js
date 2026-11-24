/**
 * PSYCHOLOGY ATLAS — KOMPLEKS TEST TIZIMI MODULI (SECTION 9)
 *
 * Qo'llab-quvvatlanadigan 6 test turi:
 * 1. Bir javobli test (single)
 * 2. Ko'p javobli test (multi)
 * 3. To'g'ri/noto'g'ri (boolean)
 * 4. Moslashtirish (matching)
 * 5. Ketma-ketlikni tartiblash (sequence)
 * 6. Vaziyatli savollar (situational)
 */
(function (window) {
    'use strict';

    let quizConfig = {
        topicId: 'all',
        count: 10,          // 10 | 15 | 20
        difficulty: 'all',  // 'all' | 'Oson' | 'O‘rta' | 'Murakkab'
        timeLimitMin: 10,   // 0 (chegarasiz) | 5 | 10 | 15
        randomize: true,
        shuffleOrder: true,
        feedbackMode: 'instant' // 'instant' | 'end'
    };

    let activeQuiz = null;
    let quizTimer = null;

    function stopQuizTimer() {
        if (quizTimer) {
            clearInterval(quizTimer);
            quizTimer = null;
        }
    }

    /**
     * Agar foydalanuvchi bitta mavzudan 10/15/20 ta savol so'rasa,
     * mavjud savollar bankini o'sha mavzuning tasdiqlangan tugunlaridan
     * dinamik tuzilgan savollar bilan to'ldiramiz (100% ishonchli Atlas manbasi asosida).
     */
    function buildQuestionPool(cfg) {
        const baseQuestions = (window.PsychAtlasEducation.QUESTIONS || []).slice();
        const topics = window.PsychAtlasData.TOPICS || [];
        let pool = baseQuestions.filter(function (q) {
            if (cfg.topicId !== 'all' && q.topicId !== cfg.topicId) return false;
            if (cfg.difficulty !== 'all' && q.difficulty !== cfg.difficulty) return false;
            return true;
        });

        // Agar tanlangan mavzu/darajada savollar soni cfg.count dan kam bo'lsa,
        // tasdiqlangan Atlas tugunlaridan qo'shimcha savollar shakllantiramiz
        const targetTopics = cfg.topicId === 'all'
            ? topics
            : topics.filter(function (t) { return t.id === cfg.topicId; });

        const allNodeTitles = [];
        topics.forEach(function (t) {
            t._all.forEach(function (n) {
                allNodeTitles.push({ title: n.title, sub: n.sub || n.desc, topicId: t.id });
            });
        });

        let synthIdx = 1;
        targetTopics.forEach(function (t) {
            t._all.forEach(function (n) {
                if (pool.length >= cfg.count * 2) return;
                if (!n.desc) return;
                const distractors = allNodeTitles
                    .filter(function (x) { return x.title !== n.title; })
                    .sort(function () { return 0.5 - Math.random(); })
                    .slice(0, 3)
                    .map(function (x) { return x.title + ' (' + (x.sub || '').slice(0, 45) + ')'; });

                const correctLabel = n.title + ' (' + (n.sub || '').slice(0, 45) + ')';
                const opts = [correctLabel].concat(distractors);

                pool.push({
                    id: 'q-synth-' + t.id + '-' + (synthIdx++),
                    topicId: t.id,
                    type: n.example ? 'situational' : 'single',
                    difficulty: t.difficulty || 'O‘rta',
                    question: n.example
                        ? ('Hayotiy vaziyat va ta’rif tahlili: «' + n.example + '» — Ushbu misol «' + t.title + '» mavzusidagi qaysi tushunchaga tegishli?')
                        : ('«' + n.desc + '» — Ushbu ilmiy ta’rif qaysi psixologik tushunchani ifodalaydi?'),
                    options: opts,
                    correctAnswer: 0,
                    explanation: n.title + ': ' + n.desc,
                    sourceId: (t.referenceIds && t.referenceIds[0]) || 'ref-gziyev-2010'
                });
            });
        });

        if (cfg.randomize || cfg.shuffleOrder) {
            pool.sort(function () { return 0.5 - Math.random(); });
        }

        const selected = pool.slice(0, cfg.count).map(function (q) {
            const copy = JSON.parse(JSON.stringify(q));
            // Moslashtirish (matching) uchun o'ng ustun variantlarini aralashtiramiz
            if (copy.type === 'matching' && copy.pairs) {
                copy._rightOptions = copy.pairs.map(function (p) { return p.right; }).sort(function () { return 0.5 - Math.random(); });
                copy._userMatches = copy.pairs.map(function (_p, i) { return copy._rightOptions[i]; });
            }
            // Ketma-ketlik (sequence) uchun elementlarni aralashtiramiz
            if (copy.type === 'sequence' && copy.items) {
                copy._correctItems = copy.items.slice();
                copy._userSequence = copy.items.slice().sort(function () { return 0.5 - Math.random(); });
            }
            return copy;
        });

        return selected;
    }

    function getTypeBadge(type) {
        const map = {
            'single': { label: 'Bir javobli test', color: '#38bdf8' },
            'multi': { label: 'Ko‘p javobli test', color: '#a855f7' },
            'boolean': { label: 'To‘g‘ri / Noto‘g‘ri', color: '#10b981' },
            'matching': { label: 'Moslashtirish', color: '#f59e0b' },
            'sequence': { label: 'Ketma-ketlikni tartiblash', color: '#ec4899' },
            'situational': { label: 'Vaziyatli savol', color: '#D6B56D' }
        };
        return map[type] || map.single;
    }

    function getSourceCitation(sourceId) {
        const refs = window.PsychAtlasData.REFERENCES || [];
        const ref = refs.find(function (r) { return r.id === sourceId; });
        if (!ref) return 'E.G‘. G‘oziyev. Umumiy psixologiya (2010)';
        return ref.author + '. «' + ref.title + '» (' + ref.publicationYear + ', ' + ref.page + '-b.)';
    }

    function renderTests() {
        stopQuizTimer();
        const container = document.getElementById('testsViewport');
        if (!container) return;

        if (activeQuiz && activeQuiz.status === 'running') {
            renderRunningQuiz(container);
            return;
        }
        if (activeQuiz && activeQuiz.status === 'finished') {
            renderQuizResults(container);
            return;
        }
        renderQuizSetup(container);
    }

    function renderQuizSetup(container) {
        const topics = window.PsychAtlasData.TOPICS || [];
        const state = window.PsychAtlasStorage.getState();
        const esc = window.PsychAtlasUtils.escapeHtml;

        container.innerHTML =
            '<div class="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">' +
                '<div class="atlas-card p-6 sm:p-8 space-y-6">' +
                    '<div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">' +
                        '<div>' +
                            '<span class="text-xs font-bold uppercase tracking-wider text-emerald-400"><i class="fa-solid fa-clipboard-check mr-1.5"></i>ADAPTIV TEST VA BILIMNI TEKSHIRISH TIZIMI</span>' +
                            '<h2 class="serif text-2xl sm:text-3xl font-bold mt-1">Psixologik bilimlarni 6 xil formatda sinang</h2>' +
                            '<p class="text-xs sm:text-sm mt-1" style="color:var(--text-secondary)">Bir javobli, ko‘p javobli, to‘g‘ri/noto‘g‘ri, moslashtirish, ketma-ketlikni tartiblash va vaziyatli savollar.</p>' +
                        '</div>' +
                        '<div class="flex flex-wrap gap-1.5 text-[11px]">' +
                            '<span class="px-2.5 py-1 rounded-lg atlas-surface">Bir javobli</span>' +
                            '<span class="px-2.5 py-1 rounded-lg atlas-surface">Ko‘p javobli</span>' +
                            '<span class="px-2.5 py-1 rounded-lg atlas-surface">To‘g‘ri/Noto‘g‘ri</span>' +
                            '<span class="px-2.5 py-1 rounded-lg atlas-surface">Moslashtirish</span>' +
                            '<span class="px-2.5 py-1 rounded-lg atlas-surface">Ketma-ketlik</span>' +
                            '<span class="px-2.5 py-1 rounded-lg atlas-surface">Vaziyatli</span>' +
                        '</div>' +
                    '</div>' +

                    '<!-- Sozlamalar Formasi -->' +
                    '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">' +
                        '<div class="space-y-1.5">' +
                            '<label class="text-xs font-bold">1. Mavzuni tanlang</label>' +
                            '<select id="cfgQuizTopic" class="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm atlas-surface">' +
                                '<option value="all"' + (quizConfig.topicId === 'all' ? ' selected' : '') + '>Barcha 13 mavzu (Kompleks sinov)</option>' +
                                topics.map(function (t) {
                                    return '<option value="' + t.id + '"' + (quizConfig.topicId === t.id ? ' selected' : '') + '>' + t.no + '-mavzu: ' + esc(t.title) + '</option>';
                                }).join('') +
                            '</select>' +
                        '</div>' +

                        '<div class="space-y-1.5">' +
                            '<label class="text-xs font-bold">2. Savollar soni</label>' +
                            '<select id="cfgQuizCount" class="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm atlas-surface">' +
                                '<option value="10"' + (quizConfig.count === 10 ? ' selected' : '') + '>10 ta savol</option>' +
                                '<option value="15"' + (quizConfig.count === 15 ? ' selected' : '') + '>15 ta savol</option>' +
                                '<option value="20"' + (quizConfig.count === 20 ? ' selected' : '') + '>20 ta savol</option>' +
                            '</select>' +
                        '</div>' +

                        '<div class="space-y-1.5">' +
                            '<label class="text-xs font-bold">3. Murakkablik darajasi</label>' +
                            '<select id="cfgQuizDiff" class="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm atlas-surface">' +
                                '<option value="all"' + (quizConfig.difficulty === 'all' ? ' selected' : '') + '>Barcha darajalar (Oson, O‘rta, Murakkab)</option>' +
                                '<option value="Oson"' + (quizConfig.difficulty === 'Oson' ? ' selected' : '') + '>Oson daraja</option>' +
                                '<option value="O‘rta"' + (quizConfig.difficulty === 'O‘rta' ? ' selected' : '') + '>O‘rta daraja</option>' +
                                '<option value="Murakkab"' + (quizConfig.difficulty === 'Murakkab' ? ' selected' : '') + '>Murakkab daraja</option>' +
                            '</select>' +
                        '</div>' +

                        '<div class="space-y-1.5">' +
                            '<label class="text-xs font-bold">4. Vaqt chegarasi</label>' +
                            '<select id="cfgQuizTime" class="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm atlas-surface">' +
                                '<option value="10"' + (quizConfig.timeLimitMin === 10 ? ' selected' : '') + '>10 daqiqa</option>' +
                                '<option value="15"' + (quizConfig.timeLimitMin === 15 ? ' selected' : '') + '>15 daqiqa</option>' +
                                '<option value="5"' + (quizConfig.timeLimitMin === 5 ? ' selected' : '') + '>5 daqiqa (Blits)</option>' +
                                '<option value="0"' + (quizConfig.timeLimitMin === 0 ? ' selected' : '') + '>Vaqt chegarasisiz</option>' +
                            '</select>' +
                        '</div>' +

                        '<div class="space-y-1.5">' +
                            '<label class="text-xs font-bold">5. Tahlil va izoh rejimi</label>' +
                            '<select id="cfgQuizFeedback" class="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm atlas-surface">' +
                                '<option value="instant"' + (quizConfig.feedbackMode === 'instant' ? ' selected' : '') + '>Har bir javobdan keyin darhol ilmiy izoh</option>' +
                                '<option value="end"' + (quizConfig.feedbackMode === 'end' ? ' selected' : '') + '>Test yakunida umumiy tahlil (Imtihon rejimi)</option>' +
                            '</select>' +
                        '</div>' +

                        '<div class="space-y-2 pt-4">' +
                            '<label class="flex items-center gap-2 text-xs font-semibold cursor-pointer">' +
                                '<input id="cfgQuizRandom" type="checkbox" ' + (quizConfig.randomize ? 'checked' : '') + ' class="accent-amber-400">' +
                                '<span>Tasodifiy savollar tanlovi</span>' +
                            '</label>' +
                            '<label class="flex items-center gap-2 text-xs font-semibold cursor-pointer">' +
                                '<input id="cfgQuizShuffle" type="checkbox" ' + (quizConfig.shuffleOrder ? 'checked' : '') + ' class="accent-amber-400">' +
                                '<span>Savollar ketma-ketligini aralashtirish</span>' +
                            '</label>' +
                        '</div>' +
                    '</div>' +

                    '<div class="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">' +
                        '<div class="text-xs" style="color:var(--text-secondary)">' +
                            '<i class="fa-solid fa-book-medical text-emerald-400 mr-1.5"></i>Barcha savollar tasdiqlangan ilmiy adabiyotlar asosida tuzilgan.' +
                        '</div>' +
                        '<button id="btnStartQuiz" class="px-6 py-3 rounded-xl font-bold text-sm text-slate-950 shadow-lg transition hover:scale-[1.02]" style="background:linear-gradient(135deg, #D6B56D 0%, #F59E0B 100%);">' +
                            '<i class="fa-solid fa-play mr-1.5"></i>Testni boshlash' +
                        '</button>' +
                    '</div>' +
                '</div>' +

                '<!-- Oldingi test natijalari -->' +
                '<div class="atlas-card p-6">' +
                    '<h3 class="text-sm font-bold mb-3"><i class="fa-solid fa-clock-rotate-left text-sky-400 mr-2"></i>Topshirilgan testlar tarixi (' + state.quizHistory.length + ')</h3>' +
                    (state.quizHistory.length > 0 ? (
                        '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">' +
                            state.quizHistory.slice(0, 9).map(function (qh) {
                                return '<div class="p-3.5 rounded-xl atlas-surface flex items-center justify-between gap-3">' +
                                    '<div class="min-w-0">' +
                                        '<div class="text-xs font-bold truncate">' + esc(qh.topicTitle) + '</div>' +
                                        '<div class="text-[11px] mt-0.5" style="color:var(--text-secondary)">To‘g‘ri: ' + qh.score + '/' + qh.total + ' · Vaqt: ' + qh.timeSpentSec + 's</div>' +
                                        '<div class="text-[10px] opacity-60 mt-0.5">' + window.PsychAtlasUtils.formatDateUz(qh.createdAt) + '</div>' +
                                    '</div>' +
                                    '<span class="px-2.5 py-1 rounded-lg font-extrabold text-sm ' + (qh.percentage >= 80 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300') + '">' + qh.percentage + '%</span>' +
                                '</div>';
                            }).join('') +
                        '</div>'
                    ) : (
                        '<p class="text-xs" style="color:var(--text-secondary)">Hozircha hech qanday test yakunlanmagan. Yuqoridan sozlamalarni tanlab, ilk testni boshlang.</p>'
                    )) +
                '</div>' +
            '</div>';

        container.querySelector('#btnStartQuiz').addEventListener('click', function () {
            quizConfig.topicId = container.querySelector('#cfgQuizTopic').value;
            quizConfig.count = Number(container.querySelector('#cfgQuizCount').value) || 10;
            quizConfig.difficulty = container.querySelector('#cfgQuizDiff').value;
            quizConfig.timeLimitMin = Number(container.querySelector('#cfgQuizTime').value) || 0;
            quizConfig.feedbackMode = container.querySelector('#cfgQuizFeedback').value;
            quizConfig.randomize = container.querySelector('#cfgQuizRandom').checked;
            quizConfig.shuffleOrder = container.querySelector('#cfgQuizShuffle').checked;
            startNewQuiz();
        });
    }

    function startNewQuiz() {
        const questions = buildQuestionPool(quizConfig);
        const topics = window.PsychAtlasData.TOPICS || [];
        const tObj = topics.find(function (t) { return t.id === quizConfig.topicId; });

        activeQuiz = {
            status: 'running',
            topicId: quizConfig.topicId,
            topicTitle: tObj ? (tObj.no + '-mavzu: ' + tObj.title) : 'Barcha mavzular (Kompleks test)',
            questions: questions,
            currentIndex: 0,
            answers: {}, // { index: { submitted: bool, isCorrect: bool, userAnswer: any } }
            startedAt: Date.now(),
            elapsedSec: 0,
            maxSeconds: quizConfig.timeLimitMin > 0 ? quizConfig.timeLimitMin * 60 : 0
        };
        renderTests();
    }

    function evaluateQuestion(q, userAns) {
        if (q.type === 'single' || q.type === 'boolean' || q.type === 'situational') {
            return Number(userAns) === Number(q.correctAnswer);
        }
        if (q.type === 'multi') {
            const arr = Array.isArray(userAns) ? userAns.slice().sort() : [];
            const corr = (q.correctAnswer || []).slice().sort();
            if (arr.length !== corr.length) return false;
            return arr.every(function (v, i) { return Number(v) === Number(corr[i]); });
        }
        if (q.type === 'matching') {
            if (!Array.isArray(userAns) || !q.pairs) return false;
            return q.pairs.every(function (p, i) { return userAns[i] === p.right; });
        }
        if (q.type === 'sequence') {
            if (!Array.isArray(userAns) || !q._correctItems) return false;
            return q._correctItems.every(function (it, i) { return userAns[i] === it; });
        }
        return false;
    }

    function formatCorrectAnswerText(q) {
        if (q.type === 'single' || q.type === 'boolean' || q.type === 'situational') {
            return (q.options && q.options[q.correctAnswer]) || '';
        }
        if (q.type === 'multi') {
            return (q.correctAnswer || []).map(function (idx) { return q.options[idx]; }).join(' • ');
        }
        if (q.type === 'matching') {
            return (q.pairs || []).map(function (p) { return p.left + ' → ' + p.right; }).join(' | ');
        }
        if (q.type === 'sequence') {
            return (q._correctItems || q.items || []).join(' → ');
        }
        return '';
    }

    function renderRunningQuiz(container) {
        stopQuizTimer();
        const q = activeQuiz.questions[activeQuiz.currentIndex];
        const idx = activeQuiz.currentIndex;
        const total = activeQuiz.questions.length;
        const ansState = activeQuiz.answers[idx] || null;
        const isLocked = ansState && ansState.submitted && quizConfig.feedbackMode === 'instant';
        const typeBadge = getTypeBadge(q.type);
        const esc = window.PsychAtlasUtils.escapeHtml;

        let bodyHtml = '';

        if (q.type === 'single' || q.type === 'boolean' || q.type === 'situational') {
            const selectedVal = ansState ? ansState.userAnswer : null;
            bodyHtml = '<div class="space-y-2.5">' +
                (q.options || []).map(function (opt, oIdx) {
                    const isSel = selectedVal === oIdx;
                    let cls = isSel ? 'border-amber-400 bg-amber-500/15' : 'atlas-surface hover:border-white/30';
                    if (isLocked) {
                        if (oIdx === q.correctAnswer) cls = 'border-emerald-400 bg-emerald-500/20 text-emerald-200';
                        else if (isSel && !ansState.isCorrect) cls = 'border-rose-400 bg-rose-500/20 text-rose-200';
                    }
                    return '<button data-q-single="' + oIdx + '" ' + (isLocked ? 'disabled' : '') + ' class="w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition flex items-center gap-3 ' + cls + '">' +
                        '<span class="w-6 h-6 rounded-lg bg-white/10 text-xs font-bold flex items-center justify-center shrink-0">' + String.fromCharCode(65 + oIdx) + '</span>' +
                        '<span>' + esc(opt) + '</span>' +
                    '</button>';
                }).join('') +
            '</div>';
        } else if (q.type === 'multi') {
            const selectedArr = (ansState && Array.isArray(ansState.userAnswer)) ? ansState.userAnswer : [];
            bodyHtml = '<div class="text-xs mb-2 text-purple-300">Bir nechta to‘g‘ri variantni belgilang:</div>' +
                '<div class="space-y-2.5">' +
                (q.options || []).map(function (opt, oIdx) {
                    const isChecked = selectedArr.indexOf(oIdx) !== -1;
                    return '<button data-q-multi="' + oIdx + '" ' + (isLocked ? 'disabled' : '') + ' class="w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition flex items-center gap-3 ' +
                        (isChecked ? 'border-purple-400 bg-purple-500/15' : 'atlas-surface hover:border-white/30') + '">' +
                        '<i class="fa-regular ' + (isChecked ? 'fa-square-check text-purple-300' : 'fa-square opacity-60') + ' text-base"></i>' +
                        '<span>' + esc(opt) + '</span>' +
                    '</button>';
                }).join('') +
            '</div>';
        } else if (q.type === 'matching') {
            const currMatches = (ansState && ansState.userAnswer) ? ansState.userAnswer : q._userMatches;
            bodyHtml = '<div class="text-xs mb-2 text-amber-300">Chap ustundagi har bir tushunchaga mos ta’rifni tanlang:</div>' +
                '<div class="space-y-3">' +
                (q.pairs || []).map(function (pair, pIdx) {
                    return '<div class="p-3 rounded-xl atlas-surface grid grid-cols-1 md:grid-cols-12 gap-2 items-center">' +
                        '<div class="md:col-span-5 text-xs sm:text-sm font-bold">' + esc(pair.left) + '</div>' +
                        '<div class="md:col-span-7">' +
                            '<select data-q-match="' + pIdx + '" ' + (isLocked ? 'disabled' : '') + ' class="w-full px-3 py-2 rounded-lg text-xs atlas-card">' +
                                (q._rightOptions || []).map(function (ro) {
                                    return '<option value="' + esc(ro) + '"' + (currMatches[pIdx] === ro ? ' selected' : '') + '>' + esc(ro) + '</option>';
                                }).join('') +
                            '</select>' +
                        '</div>' +
                    '</div>';
                }).join('') +
            '</div>';
        } else if (q.type === 'sequence') {
            const currSeq = (ansState && ansState.userAnswer) ? ansState.userAnswer : q._userSequence;
            bodyHtml = '<div class="text-xs mb-2 text-pink-300">Yuqoriga / Pastga tugmalari yordamida bosqichlarni to‘g‘ri tartibda joylashtiring:</div>' +
                '<div class="space-y-2">' +
                currSeq.map(function (item, sIdx) {
                    return '<div class="p-3 rounded-xl atlas-surface flex items-center justify-between gap-3">' +
                        '<div class="flex items-center gap-3 text-xs sm:text-sm font-semibold">' +
                            '<span class="w-6 h-6 rounded-full bg-white/10 text-xs font-bold flex items-center justify-center">' + (sIdx + 1) + '</span>' +
                            '<span>' + esc(item) + '</span>' +
                        '</div>' +
                        (!isLocked ? (
                            '<div class="flex items-center gap-1">' +
                                '<button data-seq-up="' + sIdx + '" class="w-7 h-7 rounded-lg atlas-card hover:border-amber-400 text-xs"><i class="fa-solid fa-arrow-up"></i></button>' +
                                '<button data-seq-down="' + sIdx + '" class="w-7 h-7 rounded-lg atlas-card hover:border-amber-400 text-xs"><i class="fa-solid fa-arrow-down"></i></button>' +
                            '</div>'
                        ) : '') +
                    '</div>';
                }).join('') +
            '</div>';
        }

        container.innerHTML =
            '<div class="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-5">' +
                '<!-- Yuqori holat paneli -->' +
                '<div class="atlas-card p-4 flex flex-wrap items-center justify-between gap-3">' +
                    '<div>' +
                        '<div class="text-xs font-bold" style="color:var(--gold-accent)">' + esc(activeQuiz.topicTitle) + '</div>' +
                        '<div class="text-[11px]" style="color:var(--text-secondary)">Savol: <b>' + (idx + 1) + ' / ' + total + '</b></div>' +
                    '</div>' +
                    '<div class="flex items-center gap-3">' +
                        '<div class="px-3 py-1.5 rounded-xl atlas-surface text-xs font-bold flex items-center gap-1.5">' +
                            '<i class="fa-regular fa-clock text-amber-400"></i>' +
                            '<span id="quizTimerDisplay">--:--</span>' +
                        '</div>' +
                        '<button id="btnCancelQuiz" class="px-3 py-1.5 rounded-xl atlas-surface hover:border-rose-400/50 text-xs font-semibold text-rose-300">Chiqish</button>' +
                    '</div>' +
                '</div>' +

                '<!-- Savol kartochkasi -->' +
                '<div class="atlas-card p-6 sm:p-8 space-y-5">' +
                    '<div class="flex flex-wrap items-center justify-between gap-2">' +
                        '<span class="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase" style="background:' + typeBadge.color + '22;color:' + typeBadge.color + '">' +
                            esc(typeBadge.label) +
                        '</span>' +
                        '<span class="text-xs px-2.5 py-0.5 rounded-full atlas-surface">Daraja: ' + esc(q.difficulty || 'O‘rta') + '</span>' +
                    '</div>' +

                    '<h3 class="font-bold text-base sm:text-lg leading-relaxed">' + esc(q.question) + '</h3>' +

                    bodyHtml +

                    (isLocked ? (
                        '<div class="p-4 rounded-2xl text-xs space-y-1.5 ' + (ansState.isCorrect ? 'bg-emerald-500/15 border border-emerald-500/35 text-emerald-100' : 'bg-rose-500/15 border border-rose-500/35 text-rose-100') + '">' +
                            '<div class="font-extrabold text-sm">' +
                                (ansState.isCorrect ? '<i class="fa-solid fa-circle-check text-emerald-400 mr-1.5"></i>To‘g‘ri javob!' : '<i class="fa-solid fa-circle-xmark text-rose-400 mr-1.5"></i>Noto‘g‘ri javob') +
                            '</div>' +
                            (!ansState.isCorrect ? '<div><b>To‘g‘ri javob:</b> ' + esc(formatCorrectAnswerText(q)) + '</div>' : '') +
                            '<div><b>Ilmiy izoh:</b> ' + esc(q.explanation) + '</div>' +
                            '<div class="text-[11px] opacity-80"><b>Manba:</b> ' + esc(getSourceCitation(q.sourceId)) + '</div>' +
                        '</div>'
                    ) : '') +

                    '<div class="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">' +
                        '<button id="btnPrevQ" ' + (idx === 0 ? 'disabled' : '') + ' class="px-4 py-2.5 rounded-xl text-xs font-bold atlas-surface ' + (idx === 0 ? 'opacity-40' : 'hover:border-white/30') + '">' +
                            '<i class="fa-solid fa-arrow-left mr-1.5"></i>Oldingi' +
                        '</button>' +
                        '<div class="flex items-center gap-2.5">' +
                            (!isLocked ? (
                                '<button id="btnConfirmAnswer" class="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950" style="background:var(--gold-accent)">' +
                                    '<i class="fa-solid fa-check mr-1.5"></i>Javobni tasdiqlash' +
                                '</button>'
                            ) : '') +
                            (idx < total - 1 ? (
                                '<button id="btnNextQ" class="px-5 py-2.5 rounded-xl text-xs font-bold text-white" style="background:linear-gradient(135deg,#5C9DFF,#8B7CFF)">' +
                                    'Keyingi savol <i class="fa-solid fa-arrow-right ml-1.5"></i>' +
                                '</button>'
                            ) : (
                                '<button id="btnFinishQuiz" class="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950">' +
                                    '<i class="fa-solid fa-flag-checkered mr-1.5"></i>Testni yakunlash' +
                                '</button>'
                            )) +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>';

        // Taymerni ishga tushirish
        function updateTimerUi() {
            if (!activeQuiz || activeQuiz.status !== 'running') return;
            activeQuiz.elapsedSec = Math.floor((Date.now() - activeQuiz.startedAt) / 1000);
            const disp = document.getElementById('quizTimerDisplay');
            if (!disp) return;
            if (activeQuiz.maxSeconds > 0) {
                const rem = Math.max(0, activeQuiz.maxSeconds - activeQuiz.elapsedSec);
                const m = String(Math.floor(rem / 60)).padStart(2, '0');
                const s = String(rem % 60).padStart(2, '0');
                disp.textContent = m + ':' + s;
                if (rem <= 0) {
                    finalizeQuiz();
                }
            } else {
                const m = String(Math.floor(activeQuiz.elapsedSec / 60)).padStart(2, '0');
                const s = String(activeQuiz.elapsedSec % 60).padStart(2, '0');
                disp.textContent = m + ':' + s;
            }
        }
        updateTimerUi();
        quizTimer = setInterval(updateTimerUi, 1000);

        // Interaktiv javob hodisalari
        container.querySelectorAll('[data-q-single]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                const val = Number(btn.getAttribute('data-q-single'));
                activeQuiz.answers[idx] = {
                    submitted: quizConfig.feedbackMode === 'instant',
                    userAnswer: val,
                    isCorrect: evaluateQuestion(q, val)
                };
                renderRunningQuiz(container);
            });
        });

        container.querySelectorAll('[data-q-multi]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                const val = Number(btn.getAttribute('data-q-multi'));
                const curr = (activeQuiz.answers[idx] && Array.isArray(activeQuiz.answers[idx].userAnswer))
                    ? activeQuiz.answers[idx].userAnswer.slice()
                    : [];
                const pos = curr.indexOf(val);
                if (pos === -1) curr.push(val);
                else curr.splice(pos, 1);
                activeQuiz.answers[idx] = {
                    submitted: false,
                    userAnswer: curr,
                    isCorrect: evaluateQuestion(q, curr)
                };
                renderRunningQuiz(container);
            });
        });

        container.querySelectorAll('[data-q-match]').forEach(function (sel) {
            sel.addEventListener('change', function () {
                const pIdx = Number(sel.getAttribute('data-q-match'));
                const curr = (activeQuiz.answers[idx] && activeQuiz.answers[idx].userAnswer)
                    ? activeQuiz.answers[idx].userAnswer.slice()
                    : q._userMatches.slice();
                curr[pIdx] = sel.value;
                q._userMatches = curr;
                activeQuiz.answers[idx] = {
                    submitted: false,
                    userAnswer: curr,
                    isCorrect: evaluateQuestion(q, curr)
                };
            });
        });

        container.querySelectorAll('[data-seq-up], [data-seq-down]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                const isUp = btn.hasAttribute('data-seq-up');
                const sIdx = Number(btn.getAttribute(isUp ? 'data-seq-up' : 'data-seq-down'));
                const curr = (activeQuiz.answers[idx] && activeQuiz.answers[idx].userAnswer)
                    ? activeQuiz.answers[idx].userAnswer.slice()
                    : q._userSequence.slice();
                const targetIdx = isUp ? sIdx - 1 : sIdx + 1;
                if (targetIdx < 0 || targetIdx >= curr.length) return;
                const tmp = curr[sIdx]; curr[sIdx] = curr[targetIdx]; curr[targetIdx] = tmp;
                q._userSequence = curr;
                activeQuiz.answers[idx] = {
                    submitted: false,
                    userAnswer: curr,
                    isCorrect: evaluateQuestion(q, curr)
                };
                renderRunningQuiz(container);
            });
        });

        const confirmBtn = container.querySelector('#btnConfirmAnswer');
        if (confirmBtn) {
            confirmBtn.addEventListener('click', function () {
                let userAns = activeQuiz.answers[idx] ? activeQuiz.answers[idx].userAnswer : null;
                if (userAns === null) {
                    if (q.type === 'matching') userAns = q._userMatches.slice();
                    else if (q.type === 'sequence') userAns = q._userSequence.slice();
                    else return;
                }
                activeQuiz.answers[idx] = {
                    submitted: true,
                    userAnswer: userAns,
                    isCorrect: evaluateQuestion(q, userAns)
                };
                renderRunningQuiz(container);
            });
        }

        const prevBtn = container.querySelector('#btnPrevQ');
        if (prevBtn) {
            prevBtn.addEventListener('click', function () {
                if (activeQuiz.currentIndex > 0) {
                    activeQuiz.currentIndex--;
                    renderRunningQuiz(container);
                }
            });
        }
        const nextBtn = container.querySelector('#btnNextQ');
        if (nextBtn) {
            nextBtn.addEventListener('click', function () {
                if (activeQuiz.currentIndex < total - 1) {
                    activeQuiz.currentIndex++;
                    renderRunningQuiz(container);
                }
            });
        }
        const finishBtn = container.querySelector('#btnFinishQuiz');
        if (finishBtn) {
            finishBtn.addEventListener('click', finalizeQuiz);
        }
        const cancelBtn = container.querySelector('#btnCancelQuiz');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', function () {
                stopQuizTimer();
                activeQuiz = null;
                renderTests();
            });
        }
    }

    function finalizeQuiz() {
        stopQuizTimer();
        if (!activeQuiz) return;

        let correctCount = 0;
        const wrongList = [];

        activeQuiz.questions.forEach(function (q, i) {
            let ans = activeQuiz.answers[i];
            if (!ans) {
                const defaultAns = q.type === 'matching' ? q._userMatches : (q.type === 'sequence' ? q._userSequence : null);
                ans = {
                    submitted: true,
                    userAnswer: defaultAns,
                    isCorrect: defaultAns !== null ? evaluateQuestion(q, defaultAns) : false
                };
                activeQuiz.answers[i] = ans;
            }
            if (ans.isCorrect) {
                correctCount++;
            } else {
                wrongList.push({
                    question: q.question,
                    correctAnswerText: formatCorrectAnswerText(q),
                    explanation: q.explanation,
                    source: getSourceCitation(q.sourceId)
                });
            }
        });

        const total = activeQuiz.questions.length;
        const pct = total > 0 ? Math.round((correctCount / total) * 100) : 0;
        const elapsed = Math.max(1, Math.floor((Date.now() - activeQuiz.startedAt) / 1000));

        activeQuiz.status = 'finished';
        activeQuiz.score = correctCount;
        activeQuiz.total = total;
        activeQuiz.percentage = pct;
        activeQuiz.elapsedSec = elapsed;
        activeQuiz.wrongList = wrongList;

        window.PsychAtlasStorage.saveQuizResult({
            topicId: activeQuiz.topicId,
            topicTitle: activeQuiz.topicTitle,
            score: correctCount,
            total: total,
            percentage: pct,
            timeSpentSec: elapsed,
            difficulty: quizConfig.difficulty,
            wrongQuestions: wrongList
        });

        renderTests();
    }

    function renderQuizResults(container) {
        const qz = activeQuiz;
        const esc = window.PsychAtlasUtils.escapeHtml;
        const wrongCount = qz.total - qz.score;

        container.innerHTML =
            '<div class="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">' +
                '<div class="atlas-card p-6 sm:p-8 space-y-6">' +
                    '<div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">' +
                        '<div>' +
                            '<span class="text-xs font-extrabold uppercase tracking-wider text-emerald-400">TEST YAKUNLANDI</span>' +
                            '<h2 class="serif text-2xl sm:text-3xl font-bold mt-1">' + esc(qz.topicTitle) + '</h2>' +
                        '</div>' +
                        '<div class="flex flex-wrap gap-2.5">' +
                            '<button id="btnRetakeSameQuiz" class="px-5 py-2.5 rounded-xl font-bold text-xs text-slate-950" style="background:var(--gold-accent)">' +
                                '<i class="fa-solid fa-rotate-right mr-1.5"></i>Qayta test topshirish' +
                            '</button>' +
                            '<button id="btnNewQuizSetup" class="px-4 py-2.5 rounded-xl font-bold text-xs atlas-surface hover:border-white/30">' +
                                'Sozlamalarga qaytish' +
                            '</button>' +
                        '</div>' +
                    '</div>' +

                    '<!-- 4 Ko‘rsatkich -->' +
                    '<div class="grid grid-cols-2 sm:grid-cols-4 gap-4">' +
                        '<div class="p-4 rounded-2xl atlas-surface">' +
                            '<div class="text-xs opacity-75">To‘g‘ri javoblar</div>' +
                            '<div class="text-2xl font-extrabold text-emerald-400 mt-1">' + qz.score + ' <span class="text-sm opacity-70">/ ' + qz.total + '</span></div>' +
                        '</div>' +
                        '<div class="p-4 rounded-2xl atlas-surface">' +
                            '<div class="text-xs opacity-75">Noto‘g‘ri javoblar</div>' +
                            '<div class="text-2xl font-extrabold text-rose-400 mt-1">' + wrongCount + '</div>' +
                        '</div>' +
                        '<div class="p-4 rounded-2xl atlas-surface">' +
                            '<div class="text-xs opacity-75">O‘zlashtirish foizi</div>' +
                            '<div class="text-2xl font-extrabold mt-1" style="color:var(--gold-accent)">' + qz.percentage + '%</div>' +
                        '</div>' +
                        '<div class="p-4 rounded-2xl atlas-surface">' +
                            '<div class="text-xs opacity-75">Sarflangan vaqt</div>' +
                            '<div class="text-2xl font-extrabold text-sky-400 mt-1">' + qz.elapsedSec + ' s</div>' +
                        '</div>' +
                    '</div>' +

                    '<!-- Har bir savolning batafsil tahlili -->' +
                    '<div class="space-y-3">' +
                        '<h3 class="text-sm font-bold uppercase tracking-wider" style="color:var(--text-secondary)">Har bir savolning to‘g‘ri javobi va ilmiy izohi</h3>' +
                        qz.questions.map(function (q, i) {
                            const ans = qz.answers[i] || { isCorrect: false };
                            return '<div class="p-4 rounded-2xl border ' + (ans.isCorrect ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-rose-500/10 border-rose-500/30') + ' space-y-1.5 text-xs">' +
                                '<div class="flex items-start justify-between gap-2 font-bold text-sm">' +
                                    '<span>' + (i + 1) + '. ' + esc(q.question) + '</span>' +
                                    '<span class="shrink-0 ' + (ans.isCorrect ? 'text-emerald-400' : 'text-rose-400') + '">' +
                                        (ans.isCorrect ? '<i class="fa-solid fa-check mr-1"></i>To‘g‘ri' : '<i class="fa-solid fa-xmark mr-1"></i>Xato') +
                                    '</span>' +
                                '</div>' +
                                '<div><b>To‘g‘ri javob:</b> ' + esc(formatCorrectAnswerText(q)) + '</div>' +
                                '<div style="color:var(--text-secondary)"><b>Ilmiy izoh:</b> ' + esc(q.explanation) + '</div>' +
                                '<div class="text-[11px] opacity-75"><b>Tasdiqlangan manba:</b> ' + esc(getSourceCitation(q.sourceId)) + '</div>' +
                            '</div>';
                        }).join('') +
                    '</div>' +
                '</div>' +
            '</div>';

        container.querySelector('#btnRetakeSameQuiz').addEventListener('click', function () {
            startNewQuiz();
        });
        container.querySelector('#btnNewQuizSetup').addEventListener('click', function () {
            activeQuiz = null;
            renderTests();
        });
    }

    window.PsychAtlasTests = {
        render: renderTests
    };
})(window);
