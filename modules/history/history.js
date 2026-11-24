/**
 * PSYCHOLOGY ATLAS — PSIXOLOGIYA TARIXI MODULI (SECTION 12)
 *
 * 10 ta xronologik davr va buyuk psixolog olimlar merosi (manbalari bilan).
 */
(function (window) {
    'use strict';

    let selectedEraId = 'all';

    function renderHistory() {
        const container = document.getElementById('historyViewport');
        if (!container) return;

        const eras = window.PsychAtlasEducation.HISTORY_ERAS || [];
        const scientists = window.PsychAtlasEducation.SCIENTISTS || [];
        const topics = window.PsychAtlasData.TOPICS || [];
        const esc = window.PsychAtlasUtils.escapeHtml;

        const filteredEras = selectedEraId === 'all'
            ? eras
            : eras.filter(function (e) { return e.id === selectedEraId; });

        const filteredScientists = selectedEraId === 'all'
            ? scientists
            : scientists.filter(function (s) { return s.eraId === selectedEraId; });

        container.innerHTML =
            '<div class="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">' +
                '<!-- Sarlavha va Davrlar Filtri -->' +
                '<div class="atlas-card p-6 space-y-4">' +
                    '<div>' +
                        '<span class="text-xs font-extrabold uppercase tracking-wider" style="color:var(--gold-accent)"><i class="fa-solid fa-landmark mr-1.5"></i>PSIXOLOGIYA TARIXI VA EVOLYUTSIYASI</span>' +
                        '<h2 class="serif text-2xl sm:text-3xl font-bold mt-1">Qadimgi «Psyuxe»dan zamonaviy kognitiv neyropsixologiyagacha</h2>' +
                        '<p class="text-xs sm:text-sm mt-1" style="color:var(--text-secondary)">10 ta asosiy xronologik davr va psixologiya fanini shakllantirgan olimlarning tasdiqlangan ilmiy merosi.</p>' +
                    '</div>' +

                    '<div class="flex flex-wrap gap-1.5">' +
                        '<button data-era-filter="all" class="px-3 py-1.5 rounded-xl text-xs font-bold transition ' +
                            (selectedEraId === 'all' ? 'text-slate-950' : 'atlas-surface hover:border-white/30') + '" ' +
                            (selectedEraId === 'all' ? 'style="background:var(--gold-accent)"' : '') + '>' +
                            'Barcha 10 davr' +
                        '</button>' +
                        eras.map(function (era) {
                            const isSel = selectedEraId === era.id;
                            return '<button data-era-filter="' + era.id + '" class="px-3 py-1.5 rounded-xl text-xs font-semibold transition ' +
                                (isSel ? 'text-slate-950 font-bold' : 'atlas-surface hover:border-white/30') + '" ' +
                                (isSel ? 'style="background:var(--gold-accent)"' : '') + '>' +
                                era.order + '. ' + esc(era.title) +
                            '</button>';
                        }).join('') +
                    '</div>' +
                '</div>' +

                '<!-- Xronologik Davrlar Timeline -->' +
                '<div class="space-y-4">' +
                    '<h3 class="text-sm font-bold uppercase tracking-wider" style="color:var(--text-secondary)"><i class="fa-solid fa-timeline text-sky-400 mr-2"></i>Xronologik davrlar (' + filteredEras.length + ')</h3>' +
                    '<div class="space-y-4">' +
                        filteredEras.map(function (era) {
                            return '<div class="atlas-card p-6 relative overflow-hidden">' +
                                '<div class="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-3 border-b border-white/10">' +
                                    '<div class="flex items-center gap-3">' +
                                        '<span class="w-9 h-9 rounded-xl font-extrabold text-sm flex items-center justify-center shrink-0" style="background:rgba(214,181,109,0.18);color:var(--gold-accent)">' + era.order + '</span>' +
                                        '<div>' +
                                            '<h4 class="serif text-lg sm:text-xl font-bold">' + esc(era.title) + '</h4>' +
                                            '<p class="text-xs" style="color:var(--gold-accent)">' + esc(era.subtitle) + '</p>' +
                                        '</div>' +
                                    '</div>' +
                                    '<span class="px-3 py-1 rounded-full text-xs font-bold atlas-surface self-start md:self-center">' +
                                        '<i class="fa-regular fa-calendar mr-1.5 text-sky-400"></i>' + esc(era.period) +
                                    '</span>' +
                                '</div>' +
                                '<p class="text-xs sm:text-sm leading-relaxed mt-3" style="color:var(--text-main)">' + esc(era.summary) + '</p>' +
                                '<ul class="mt-3 space-y-1.5 text-xs" style="color:var(--text-secondary)">' +
                                    (era.keyIdeas || []).map(function (idea) {
                                        return '<li class="flex items-start gap-2"><span class="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"></span><span>' + esc(idea) + '</span></li>';
                                    }).join('') +
                                '</ul>' +
                                '<div class="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">' +
                                    '<div class="flex flex-wrap items-center gap-1.5">' +
                                        '<span class="font-bold opacity-75">Tegishli mavzular:</span>' +
                                        (era.relatedTopics || []).map(function (tid) {
                                            const tObj = topics.find(function (t) { return t.id === tid; });
                                            return '<button data-hist-topic="' + esc(tid) + '" class="px-2.5 py-1 rounded-lg atlas-surface hover:border-amber-400 font-semibold text-[11px]">' +
                                                (tObj ? esc(tObj.title) : esc(tid)) +
                                            '</button>';
                                        }).join('') +
                                    '</div>' +
                                    '<div class="text-[11px]" style="color:var(--text-secondary)"><b>Manba:</b> ' + esc(era.source) + '</div>' +
                                '</div>' +
                            '</div>';
                        }).join('') +
                    '</div>' +
                '</div>' +

                '<!-- Buyuk Psixolog Olimlar va Mutafakkirlar -->' +
                '<div class="space-y-4 pt-2">' +
                    '<h3 class="text-sm font-bold uppercase tracking-wider" style="color:var(--text-secondary)"><i class="fa-solid fa-user-graduate text-purple-400 mr-2"></i>Olimlar va mutafakkirlar ilmiy merosi (' + filteredScientists.length + ')</h3>' +
                    '<div class="grid grid-cols-1 md:grid-cols-2 gap-5">' +
                        filteredScientists.map(function (sci) {
                            return '<div class="atlas-card p-6 flex flex-col justify-between gap-4">' +
                                '<div class="space-y-3">' +
                                    '<div class="flex items-start justify-between gap-3">' +
                                        '<div>' +
                                            '<h4 class="serif text-lg font-bold">' + esc(sci.name) + '</h4>' +
                                            '<p class="text-xs font-semibold" style="color:var(--gold-accent)">' + esc(sci.lifespan) + '</p>' +
                                        '</div>' +
                                        '<span class="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-300 flex items-center justify-center shrink-0"><i class="fa-solid fa-feather-pointed"></i></span>' +
                                    '</div>' +

                                    '<div class="p-3 rounded-xl atlas-surface text-xs">' +
                                        '<div class="font-bold text-sky-300 mb-0.5">Asosiy nazariyasi:</div>' +
                                        '<div>' + esc(sci.coreTheory) + '</div>' +
                                    '</div>' +

                                    '<div class="text-xs leading-relaxed" style="color:var(--text-secondary)">' +
                                        '<b style="color:var(--text-main)">Ilmiy hissasi:</b> ' + esc(sci.contribution) +
                                    '</div>' +

                                    '<div class="text-xs">' +
                                        '<div class="font-bold mb-1">Muhim asarlari:</div>' +
                                        '<div class="flex flex-wrap gap-1.5">' +
                                            (sci.majorWorks || []).map(function (w) {
                                                return '<span class="px-2.5 py-1 rounded-lg atlas-surface text-[11px]">' + esc(w) + '</span>';
                                            }).join('') +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +

                                '<div class="pt-3 border-t border-white/10 space-y-2 text-[11px]">' +
                                    '<div class="flex flex-wrap items-center gap-1.5">' +
                                        '<span class="font-bold opacity-75">Tegishli mavzular:</span>' +
                                        (sci.relatedTopics || []).map(function (tid) {
                                            const tObj = topics.find(function (t) { return t.id === tid; });
                                            return '<button data-hist-topic="' + esc(tid) + '" class="px-2 py-0.5 rounded-md atlas-surface hover:border-amber-400 font-semibold">' +
                                                (tObj ? esc(tObj.title) : esc(tid)) +
                                            '</button>';
                                        }).join('') +
                                    '</div>' +
                                    '<div style="color:var(--text-secondary)"><b>Tasdiqlangan manba:</b> ' + esc(sci.references) + '</div>' +
                                '</div>' +
                            '</div>';
                        }).join('') +
                    '</div>' +
                '</div>' +
            '</div>';

        container.querySelectorAll('[data-era-filter]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                selectedEraId = btn.getAttribute('data-era-filter');
                renderHistory();
            });
        });

        container.querySelectorAll('[data-hist-topic]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                const tid = btn.getAttribute('data-hist-topic');
                if (window.PsychAtlasApp) window.PsychAtlasApp.openTopicInAtlas(tid, 'map');
            });
        });
    }

    window.PsychAtlasHistory = {
        render: renderHistory
    };
})(window);
