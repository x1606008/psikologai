/**
 * PSYCHOLOGY ATLAS — PSIXOLOGIK ATAMALAR LUG'ATI MODULI (SECTION 13)
 */
(function (window) {
    'use strict';

    let glossFilter = {
        query: '',
        letter: 'all',
        topicId: 'all',
        onlyFavorites: false
    };

    function renderGlossary() {
        const container = document.getElementById('glossaryViewport');
        if (!container) return;

        const terms = (window.PsychAtlasEducation.GLOSSARY_TERMS || []).slice();
        const topics = window.PsychAtlasData.TOPICS || [];
        const state = window.PsychAtlasStorage.getState();
        const esc = window.PsychAtlasUtils.escapeHtml;

        // Alifbo bo'yicha saralash
        terms.sort(function (a, b) {
            return a.termUz.localeCompare(b.termUz);
        });

        // Mavjud bosh harflar
        const letters = [];
        terms.forEach(function (t) {
            const first = t.termUz.charAt(0).toUpperCase();
            if (letters.indexOf(first) === -1) letters.push(first);
        });
        letters.sort();

        // Filtrlash
        const filtered = terms.filter(function (t) {
            if (glossFilter.onlyFavorites && state.favoriteTerms.indexOf(t.id) === -1) return false;
            if (glossFilter.topicId !== 'all' && t.topicId !== glossFilter.topicId) return false;
            if (glossFilter.letter !== 'all' && t.termUz.charAt(0).toUpperCase() !== glossFilter.letter) return false;
            if (glossFilter.query) {
                const hay = (t.termUz + ' ' + t.termIntl + ' ' + t.shortDef + ' ' + t.extendedDef).toLowerCase();
                if (hay.indexOf(glossFilter.query.toLowerCase()) === -1) return false;
            }
            return true;
        });

        container.innerHTML =
            '<div class="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">' +
                '<!-- Yuqori qidiruv va alifbo paneli -->' +
                '<div class="atlas-card p-6 space-y-4">' +
                    '<div class="flex flex-col md:flex-row md:items-center justify-between gap-4">' +
                        '<div>' +
                            '<span class="text-xs font-extrabold uppercase tracking-wider text-purple-400"><i class="fa-solid fa-spell-check mr-1.5"></i>PSIXOLOGIK ATAMALAR LUG‘ATI</span>' +
                            '<h2 class="serif text-2xl sm:text-3xl font-bold mt-1">' + terms.length + ' ta fundamental ilmiy termin va etimologik izoh</h2>' +
                            '<p class="text-xs sm:text-sm mt-1" style="color:var(--text-secondary)">Har bir atama uchun o‘zbekcha va xalqaro nomi, qisqa hamda kengaytirilgan ta’rifi, hayotiy misoli va tasdiqlangan manbasi.</p>' +
                        '</div>' +
                        '<button id="btnGlossFavToggle" class="px-4 py-2 rounded-xl text-xs font-bold transition self-start md:self-center flex items-center gap-1.5 ' +
                            (glossFilter.onlyFavorites ? 'bg-amber-500/20 border border-amber-400 text-amber-300' : 'atlas-surface') + '">' +
                            '<i class="fa-solid fa-star text-amber-400"></i>' +
                            '<span>Sevimlilar (' + state.favoriteTerms.length + ')</span>' +
                        '</button>' +
                    '</div>' +

                    '<div class="grid grid-cols-1 md:grid-cols-12 gap-3">' +
                        '<div class="md:col-span-7 relative">' +
                            '<i class="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-xs opacity-60"></i>' +
                            '<input id="glossSearchInput" type="text" value="' + esc(glossFilter.query) + '" placeholder="Atamani o‘zbekcha yoki xalqaro nomidan izlang (masalan: empatiya, dominanta, sangvinik)..." class="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs sm:text-sm atlas-surface">' +
                        '</div>' +
                        '<div class="md:col-span-5">' +
                            '<select id="glossTopicSelect" class="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm atlas-surface">' +
                                '<option value="all"' + (glossFilter.topicId === 'all' ? ' selected' : '') + '>Barcha mavzular bo‘yicha</option>' +
                                topics.map(function (t) {
                                    return '<option value="' + t.id + '"' + (glossFilter.topicId === t.id ? ' selected' : '') + '>' + t.no + '-mavzu: ' + esc(t.title) + '</option>';
                                }).join('') +
                            '</select>' +
                        '</div>' +
                    '</div>' +

                    '<!-- Alifbo filtri -->' +
                    '<div class="flex flex-wrap items-center gap-1.5 pt-1">' +
                        '<button data-gloss-letter="all" class="px-2.5 py-1 rounded-lg text-xs font-bold transition ' +
                            (glossFilter.letter === 'all' ? 'text-slate-950' : 'atlas-surface hover:border-white/30') + '" ' +
                            (glossFilter.letter === 'all' ? 'style="background:var(--gold-accent)"' : '') + '>Barchasi</button>' +
                        letters.map(function (ltr) {
                            const isSel = glossFilter.letter === ltr;
                            return '<button data-gloss-letter="' + esc(ltr) + '" class="w-8 h-8 rounded-lg text-xs font-bold transition ' +
                                (isSel ? 'text-slate-950' : 'atlas-surface hover:border-white/30') + '" ' +
                                (isSel ? 'style="background:var(--gold-accent)"' : '') + '>' + esc(ltr) + '</button>';
                        }).join('') +
                    '</div>' +
                '</div>' +

                '<!-- Atamalar Ro‘yxati -->' +
                (filtered.length > 0 ? (
                    '<div class="grid grid-cols-1 md:grid-cols-2 gap-5">' +
                        filtered.map(function (term) {
                            const isFav = state.favoriteTerms.indexOf(term.id) !== -1;
                            const topicObj = topics.find(function (t) { return t.id === term.topicId; });
                            return '<div class="atlas-card p-6 flex flex-col justify-between gap-4">' +
                                '<div class="space-y-3">' +
                                    '<div class="flex items-start justify-between gap-3">' +
                                        '<div>' +
                                            '<h3 class="serif text-xl font-bold">' + esc(term.termUz) + '</h3>' +
                                            '<p class="text-xs italic mt-0.5" style="color:var(--gold-accent)">' + esc(term.termIntl) + '</p>' +
                                        '</div>' +
                                        '<button data-gloss-fav="' + esc(term.id) + '" class="w-8 h-8 rounded-lg atlas-surface flex items-center justify-center hover:border-amber-400 shrink-0" title="Sevimlilarga qo‘shish">' +
                                            '<i class="' + (isFav ? 'fa-solid text-amber-400' : 'fa-regular') + ' fa-star text-xs"></i>' +
                                        '</button>' +
                                    '</div>' +

                                    '<div class="p-3 rounded-xl atlas-surface text-xs font-semibold">' +
                                        '<span class="text-sky-400 uppercase text-[10px] block mb-0.5">Qisqa ta’rifi:</span>' +
                                        esc(term.shortDef) +
                                    '</div>' +

                                    '<div class="text-xs leading-relaxed" style="color:var(--text-secondary)">' +
                                        '<b style="color:var(--text-main)">Kengaytirilgan izohi:</b> ' + esc(term.extendedDef) +
                                    '</div>' +

                                    '<div class="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs">' +
                                        '<b class="text-amber-300"><i class="fa-solid fa-lightbulb mr-1"></i>Hayotiy misol:</b> ' + esc(term.example) +
                                    '</div>' +
                                '</div>' +

                                '<div class="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px]">' +
                                    (topicObj ? (
                                        '<button data-gloss-open-topic="' + esc(topicObj.id) + '" class="px-2.5 py-1 rounded-lg atlas-surface hover:border-amber-400 font-bold">' +
                                            '<i class="fa-solid fa-diagram-project mr-1 text-amber-400"></i>' + esc(topicObj.title) +
                                        '</button>'
                                    ) : '<span></span>') +
                                    '<span style="color:var(--text-secondary)"><b>Manba:</b> ' + esc(term.source) + '</span>' +
                                '</div>' +
                            '</div>';
                        }).join('') +
                    '</div>'
                ) : (
                    '<div class="atlas-card p-12 text-center">' +
                        '<i class="fa-solid fa-spell-check text-3xl opacity-40 mb-2"></i>' +
                        '<h3 class="font-bold text-base">Atama topilmadi</h3>' +
                        '<p class="text-xs mt-1" style="color:var(--text-secondary)">Qidiruv so‘zini yoki harf filtrini o‘zgartiring.</p>' +
                    '</div>'
                )) +
            '</div>';

        const inp = container.querySelector('#glossSearchInput');
        if (inp) {
            inp.addEventListener('input', function () {
                glossFilter.query = inp.value;
                renderGlossary();
                const ni = container.querySelector('#glossSearchInput');
                if (ni) {
                    ni.focus();
                    ni.setSelectionRange(ni.value.length, ni.value.length);
                }
            });
        }

        container.querySelector('#glossTopicSelect').addEventListener('change', function (e) {
            glossFilter.topicId = e.target.value;
            renderGlossary();
        });

        container.querySelector('#btnGlossFavToggle').addEventListener('click', function () {
            glossFilter.onlyFavorites = !glossFilter.onlyFavorites;
            renderGlossary();
        });

        container.querySelectorAll('[data-gloss-letter]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                glossFilter.letter = btn.getAttribute('data-gloss-letter');
                renderGlossary();
            });
        });

        container.querySelectorAll('[data-gloss-fav]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                window.PsychAtlasStorage.toggleFavoriteTerm(btn.getAttribute('data-gloss-fav'));
                renderGlossary();
            });
        });

        container.querySelectorAll('[data-gloss-open-topic]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                const tid = btn.getAttribute('data-gloss-open-topic');
                if (window.PsychAtlasApp) window.PsychAtlasApp.openTopicInAtlas(tid, 'map');
            });
        });
    }

    window.PsychAtlasGlossary = {
        render: renderGlossary
    };
})(window);
