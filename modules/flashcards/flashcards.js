/**
 * PSYCHOLOGY ATLAS — SMART FLASHCARDS MODULI (SECTION 10)
 *
 * Interval asosidagi takrorlash algoritmi (Spaced Repetition),
 * 3D kartochka aylanishi va foydalanuvchi kartochkalarini yaratish/tahrirlash/o'chirish.
 */
(function (window) {
    'use strict';

    let fcFilter = {
        topicId: 'all',
        status: 'all' // 'all' | 'due' | 'known' | 'review' | 'unknown'
    };
    let currentCardIndex = 0;
    let isFlipped = false;
    let editingCard = null; // null yoki { id, topicId, term, definition, example }
    let showForm = false;

    function getFilteredCards() {
        const all = window.PsychAtlasStorage.getAllFlashcards();
        const now = new Date();
        return all.filter(function (c) {
            if (fcFilter.topicId !== 'all' && c.topicId !== fcFilter.topicId) return false;
            if (fcFilter.status === 'due') {
                if (c.reviewStatus === 'unreviewed' || c.reviewStatus === 'unknown') return true;
                if (!c.nextReviewAt) return true;
                return new Date(c.nextReviewAt) <= now;
            }
            if (fcFilter.status !== 'all' && c.reviewStatus !== fcFilter.status) return false;
            return true;
        });
    }

    function getStatusBadge(status) {
        if (status === 'known') {
            return '<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300"><i class="fa-solid fa-check mr-1"></i>Bilaman</span>';
        }
        if (status === 'review') {
            return '<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300"><i class="fa-solid fa-clock-rotate-left mr-1"></i>Takrorlash kerak</span>';
        }
        if (status === 'unknown') {
            return '<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300"><i class="fa-solid fa-circle-exclamation mr-1"></i>Bilmayman</span>';
        }
        return '<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold atlas-surface opacity-75">Yangi kartochka</span>';
    }

    function renderFlashcards() {
        const container = document.getElementById('flashcardsViewport');
        if (!container) return;

        const topics = window.PsychAtlasData.TOPICS || [];
        const allCards = window.PsychAtlasStorage.getAllFlashcards();
        const cards = getFilteredCards();
        const esc = window.PsychAtlasUtils.escapeHtml;

        if (currentCardIndex >= cards.length) currentCardIndex = 0;
        const activeCard = cards[currentCardIndex] || null;
        const activeTopicObj = activeCard
            ? topics.find(function (t) { return t.id === activeCard.topicId; })
            : null;

        const knownCount = allCards.filter(function (c) { return c.reviewStatus === 'known'; }).length;
        const reviewCount = allCards.filter(function (c) { return c.reviewStatus === 'review'; }).length;
        const unknownCount = allCards.filter(function (c) { return c.reviewStatus === 'unknown'; }).length;

        container.innerHTML =
            '<div class="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">' +
                '<!-- Yuqori boshqaruv va statistika -->' +
                '<div class="atlas-card p-6 space-y-4">' +
                    '<div class="flex flex-col md:flex-row md:items-center justify-between gap-4">' +
                        '<div>' +
                            '<span class="text-xs font-bold uppercase tracking-wider text-purple-400"><i class="fa-solid fa-clone mr-1.5"></i>SMART FLASHCARDS · SPACED REPETITION</span>' +
                            '<h2 class="serif text-2xl sm:text-3xl font-bold mt-1">Atama va tushunchalarni intervalli eslab qolish</h2>' +
                            '<p class="text-xs sm:text-sm mt-1" style="color:var(--text-secondary)">Kartochkani aylantiring va o‘zlashtirish darajangizni belgilang — algoritm keyingi takrorlash sanasini avtomatik hisoblaydi.</p>' +
                        '</div>' +
                        '<button id="btnOpenCreateCard" class="px-4 py-2.5 rounded-xl font-bold text-xs text-slate-950 self-start md:self-center shrink-0" style="background:var(--gold-accent)">' +
                            '<i class="fa-solid fa-plus mr-1.5"></i>Yangi kartochka yaratish' +
                        '</button>' +
                    '</div>' +

                    '<div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">' +
                        '<div class="p-3 rounded-xl atlas-surface flex items-center justify-between">' +
                            '<span class="text-xs" style="color:var(--text-secondary)">Jami kartochkalar</span>' +
                            '<span class="font-extrabold text-sm">' + allCards.length + '</span>' +
                        '</div>' +
                        '<div class="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-between">' +
                            '<span class="text-xs text-emerald-300">Bilaman</span>' +
                            '<span class="font-extrabold text-sm text-emerald-400">' + knownCount + '</span>' +
                        '</div>' +
                        '<div class="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-between">' +
                            '<span class="text-xs text-amber-300">Takrorlash kerak</span>' +
                            '<span class="font-extrabold text-sm text-amber-400">' + reviewCount + '</span>' +
                        '</div>' +
                        '<div class="p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 flex items-center justify-between">' +
                            '<span class="text-xs text-rose-300">Bilmayman</span>' +
                            '<span class="font-extrabold text-sm text-rose-400">' + unknownCount + '</span>' +
                        '</div>' +
                    '</div>' +

                    '<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">' +
                        '<select id="fcTopicFilter" class="px-3.5 py-2.5 rounded-xl text-xs atlas-surface">' +
                            '<option value="all"' + (fcFilter.topicId === 'all' ? ' selected' : '') + '>Barcha 13 mavzu kartochkalari</option>' +
                            topics.map(function (t) {
                                return '<option value="' + t.id + '"' + (fcFilter.topicId === t.id ? ' selected' : '') + '>' + t.no + '-mavzu: ' + esc(t.title) + '</option>';
                            }).join('') +
                        '</select>' +
                        '<select id="fcStatusFilter" class="px-3.5 py-2.5 rounded-xl text-xs atlas-surface">' +
                            '<option value="all"' + (fcFilter.status === 'all' ? ' selected' : '') + '>Holati: Barcha kartochkalar</option>' +
                            '<option value="due"' + (fcFilter.status === 'due' ? ' selected' : '') + '>Bugun takrorlash navbati kelganlar</option>' +
                            '<option value="known"' + (fcFilter.status === 'known' ? ' selected' : '') + '>Faqat «Bilaman» deb belgilanganlar</option>' +
                            '<option value="review"' + (fcFilter.status === 'review' ? ' selected' : '') + '>Faqat «Takrorlash kerak»</option>' +
                            '<option value="unknown"' + (fcFilter.status === 'unknown' ? ' selected' : '') + '>Faqat «Bilmayman»</option>' +
                        '</select>' +
                    '</div>' +
                '</div>' +

                /* Yaratish / Tahrirlash Formasi */
                (showForm ? (
                    '<div class="atlas-card p-6 border border-amber-400/50 space-y-4">' +
                        '<div class="flex items-center justify-between">' +
                            '<h3 class="font-bold text-base">' + (editingCard && editingCard.id ? 'Kartochkani tahrirlash' : 'Yangi Flashcard yaratish') + '</h3>' +
                            '<button id="btnCancelCardForm" class="text-xs opacity-70 hover:opacity-100"><i class="fa-solid fa-xmark mr-1"></i>Yopish</button>' +
                        '</div>' +
                        '<div class="grid grid-cols-1 md:grid-cols-2 gap-3">' +
                            '<div>' +
                                '<label class="text-xs font-bold block mb-1">Tegishli mavzu</label>' +
                                '<select id="fcFormTopic" class="w-full px-3 py-2 rounded-xl text-xs atlas-surface">' +
                                    topics.map(function (t) {
                                        var sel = editingCard && editingCard.topicId === t.id;
                                        return '<option value="' + t.id + '"' + (sel ? ' selected' : '') + '>' + t.no + '-mavzu: ' + esc(t.title) + '</option>';
                                    }).join('') +
                                '</select>' +
                            '</div>' +
                            '<div>' +
                                '<label class="text-xs font-bold block mb-1">Old tomon (Savol yoki psixologik termin) *</label>' +
                                '<input id="fcFormTerm" type="text" value="' + esc(editingCard ? editingCard.term : '') + '" placeholder="Masalan: Kognitiv qayta baholash nima?" class="w-full px-3 py-2 rounded-xl text-xs atlas-surface">' +
                            '</div>' +
                        '</div>' +
                        '<div>' +
                            '<label class="text-xs font-bold block mb-1">Orqa tomon (Ilmiy ta’rif va izoh) *</label>' +
                            '<textarea id="fcFormDef" rows="3" placeholder="Ilmiy ta’rifni kiriting..." class="w-full px-3 py-2 rounded-xl text-xs atlas-surface">' + esc(editingCard ? editingCard.definition : '') + '</textarea>' +
                        '</div>' +
                        '<div>' +
                            '<label class="text-xs font-bold block mb-1">Hayotiy misol</label>' +
                            '<input id="fcFormExample" type="text" value="' + esc(editingCard ? editingCard.example : '') + '" placeholder="Hayotiy misol kiriting..." class="w-full px-3 py-2 rounded-xl text-xs atlas-surface">' +
                        '</div>' +
                        '<div class="flex justify-end gap-2">' +
                            '<button id="btnSaveCardForm" class="px-5 py-2.5 rounded-xl font-bold text-xs text-slate-950" style="background:var(--gold-accent)">' +
                                '<i class="fa-solid fa-floppy-disk mr-1.5"></i>Saqlash' +
                            '</button>' +
                        '</div>' +
                    '</div>'
                ) : '') +

                /* Asosiy Interaktiv 3D Flashcard */
                (activeCard ? (
                    '<div class="max-w-3xl mx-auto space-y-5">' +
                        '<div class="flex items-center justify-between text-xs px-1">' +
                            '<span class="font-bold">Kartochka: <b>' + (currentCardIndex + 1) + ' / ' + cards.length + '</b></span>' +
                            '<div class="flex items-center gap-2">' +
                                getStatusBadge(activeCard.reviewStatus) +
                                (activeCard.nextReviewAt ? '<span class="text-[11px]" style="color:var(--text-secondary)">Keyingi takrorlash: ' + window.PsychAtlasUtils.formatShortDateUz(activeCard.nextReviewAt) + '</span>' : '') +
                            '</div>' +
                        '</div>' +

                        '<div class="flashcard-perspective">' +
                            '<div id="activeFlashcardInner" class="flashcard-inner cursor-pointer ' + (isFlipped ? 'is-flipped' : '') + '">' +
                                '<!-- OLD TOMON -->' +
                                '<div class="flashcard-face atlas-card border-2 border-purple-500/35">' +
                                    '<div class="flex items-center justify-between text-xs">' +
                                        '<span class="px-2.5 py-1 rounded-lg bg-purple-500/15 text-purple-300 font-bold uppercase text-[10px]">' +
                                            'OLD TOMON · ' + (activeTopicObj ? esc(activeTopicObj.title) : 'Mavzu') +
                                        '</span>' +
                                        '<div class="flex items-center gap-1.5">' +
                                            '<button data-edit-fc="' + esc(activeCard.id) + '" class="w-7 h-7 rounded-lg atlas-surface hover:border-amber-400 text-xs" title="Tahrirlash"><i class="fa-solid fa-pen"></i></button>' +
                                            '<button data-del-fc="' + esc(activeCard.id) + '" class="w-7 h-7 rounded-lg atlas-surface hover:border-rose-400 text-rose-300 text-xs" title="O‘chirish"><i class="fa-solid fa-trash"></i></button>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="my-auto py-6 text-center">' +
                                        '<h3 class="serif text-xl sm:text-2xl font-bold leading-snug">' + esc(activeCard.term) + '</h3>' +
                                    '</div>' +
                                    '<div class="text-center text-xs" style="color:var(--gold-accent)">' +
                                        '<i class="fa-solid fa-rotate mr-1.5"></i>Javob va hayotiy misolni ko‘rish uchun kartochkani bosing' +
                                    '</div>' +
                                '</div>' +

                                '<!-- ORQA TOMON -->' +
                                '<div class="flashcard-face flashcard-back atlas-card border-2 border-amber-400/50">' +
                                    '<div class="flex items-center justify-between text-xs">' +
                                        '<span class="px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-300 font-bold uppercase text-[10px]">ORQA TOMON · ILMIY IZOH VA MISOL</span>' +
                                        '<span class="text-[11px]" style="color:var(--text-secondary)">Old tomonga qaytish uchun bosing</span>' +
                                    '</div>' +
                                    '<div class="my-auto space-y-3">' +
                                        '<p class="text-sm sm:text-base leading-relaxed font-medium">' + esc(activeCard.definition) + '</p>' +
                                        (activeCard.example ? (
                                            '<div class="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs">' +
                                                '<b class="text-amber-300"><i class="fa-solid fa-lightbulb mr-1"></i>Hayotiy misol:</b> ' + esc(activeCard.example) +
                                            '</div>'
                                        ) : '') +
                                    '</div>' +
                                    '<div class="text-[11px] opacity-75">Quyidagi 3 tugmadan biri orqali bilimingizni baholang:</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +

                        '<!-- 3 Baholash Tugmasi + Navigatsiya -->' +
                        '<div class="grid grid-cols-1 sm:grid-cols-3 gap-3">' +
                            '<button data-rate-fc="unknown" class="p-3.5 rounded-2xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/40 text-rose-200 font-bold text-xs sm:text-sm transition flex flex-col items-center gap-1">' +
                                '<span><i class="fa-solid fa-circle-xmark mr-1.5 text-rose-400"></i>Bilmayman</span>' +
                                '<span class="text-[10px] opacity-75 font-normal">Bugun qayta takrorlash</span>' +
                            '</button>' +
                            '<button data-rate-fc="review" class="p-3.5 rounded-2xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-200 font-bold text-xs sm:text-sm transition flex flex-col items-center gap-1">' +
                                '<span><i class="fa-solid fa-rotate mr-1.5 text-amber-400"></i>Takrorlash kerak</span>' +
                                '<span class="text-[10px] opacity-75 font-normal">Interval: +1 kun</span>' +
                            '</button>' +
                            '<button data-rate-fc="known" class="p-3.5 rounded-2xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-200 font-bold text-xs sm:text-sm transition flex flex-col items-center gap-1">' +
                                '<span><i class="fa-solid fa-circle-check mr-1.5 text-emerald-400"></i>Bilaman (+10 XP)</span>' +
                                '<span class="text-[10px] opacity-75 font-normal">Interval: +' + (activeCard.intervalDays > 0 ? Math.round(activeCard.intervalDays * 2.5) : 3) + ' kun</span>' +
                            '</button>' +
                        '</div>' +

                        '<div class="flex items-center justify-between">' +
                            '<button id="btnPrevFc" class="px-4 py-2 rounded-xl text-xs font-bold atlas-surface hover:border-white/30"><i class="fa-solid fa-arrow-left mr-1.5"></i>Oldingi kartochka</button>' +
                            '<button id="btnFlipFc" class="px-4 py-2 rounded-xl text-xs font-bold atlas-surface hover:border-white/30"><i class="fa-solid fa-arrows-rotate mr-1.5"></i>Aylantirish</button>' +
                            '<button id="btnNextFc" class="px-4 py-2 rounded-xl text-xs font-bold atlas-surface hover:border-white/30">Keyingi kartochka<i class="fa-solid fa-arrow-right ml-1.5"></i></button>' +
                        '</div>' +
                    '</div>'
                ) : (
                    '<div class="atlas-card p-12 text-center space-y-3">' +
                        '<i class="fa-solid fa-check-double text-3xl text-emerald-400"></i>' +
                        '<h3 class="font-bold text-base">Ushbu filtr bo‘yicha kartochkalar topilmadi</h3>' +
                        '<p class="text-xs" style="color:var(--text-secondary)">Boshqa filtrni tanlang yoki yangi kartochka qo‘shing.</p>' +
                    '</div>'
                )) +
            '</div>';

        // Hodisalar
        container.querySelector('#fcTopicFilter').addEventListener('change', function (e) {
            fcFilter.topicId = e.target.value;
            currentCardIndex = 0;
            isFlipped = false;
            renderFlashcards();
        });
        container.querySelector('#fcStatusFilter').addEventListener('change', function (e) {
            fcFilter.status = e.target.value;
            currentCardIndex = 0;
            isFlipped = false;
            renderFlashcards();
        });

        container.querySelector('#btnOpenCreateCard').addEventListener('click', function () {
            editingCard = null;
            showForm = true;
            renderFlashcards();
        });

        const cancelBtn = container.querySelector('#btnCancelCardForm');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', function () {
                showForm = false;
                editingCard = null;
                renderFlashcards();
            });
        }

        const saveBtn = container.querySelector('#btnSaveCardForm');
        if (saveBtn) {
            saveBtn.addEventListener('click', function () {
                const term = container.querySelector('#fcFormTerm').value.trim();
                const def = container.querySelector('#fcFormDef').value.trim();
                const ex = container.querySelector('#fcFormExample').value.trim();
                const tid = container.querySelector('#fcFormTopic').value;
                if (!term || !def) {
                    if (window.PsychAtlasApp) window.PsychAtlasApp.showToast('Savol (termin) va izoh maydonlarini to‘ldiring!', 'error');
                    return;
                }
                window.PsychAtlasStorage.saveFlashcard({
                    id: editingCard ? editingCard.id : null,
                    topicId: tid,
                    term: term,
                    definition: def,
                    example: ex
                });
                showForm = false;
                editingCard = null;
                renderFlashcards();
                if (window.PsychAtlasApp) window.PsychAtlasApp.showToast('Flashcard muvaffaqiyatli saqlandi!', 'success');
            });
        }

        const cardInner = container.querySelector('#activeFlashcardInner');
        if (cardInner) {
            cardInner.addEventListener('click', function (e) {
                if (e.target.closest('button')) return;
                isFlipped = !isFlipped;
                cardInner.classList.toggle('is-flipped', isFlipped);
            });
        }

        const flipBtn = container.querySelector('#btnFlipFc');
        if (flipBtn && cardInner) {
            flipBtn.addEventListener('click', function () {
                isFlipped = !isFlipped;
                cardInner.classList.toggle('is-flipped', isFlipped);
            });
        }

        container.querySelectorAll('[data-edit-fc]').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                if (!activeCard) return;
                editingCard = Object.assign({}, activeCard);
                showForm = true;
                renderFlashcards();
            });
        });

        container.querySelectorAll('[data-del-fc]').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                const id = btn.getAttribute('data-del-fc');
                window.PsychAtlasStorage.deleteFlashcard(id);
                isFlipped = false;
                renderFlashcards();
                if (window.PsychAtlasApp) window.PsychAtlasApp.showToast('Kartochka o‘chirildi', 'info');
            });
        });

        container.querySelectorAll('[data-rate-fc]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                if (!activeCard) return;
                const status = btn.getAttribute('data-rate-fc');
                window.PsychAtlasStorage.reviewFlashcard(activeCard.id, status);
                isFlipped = false;
                if (currentCardIndex < cards.length - 1) currentCardIndex++;
                else currentCardIndex = 0;
                renderFlashcards();
            });
        });

        const prevBtn = container.querySelector('#btnPrevFc');
        if (prevBtn) {
            prevBtn.addEventListener('click', function () {
                isFlipped = false;
                currentCardIndex = (currentCardIndex - 1 + cards.length) % cards.length;
                renderFlashcards();
            });
        }
        const nextBtn = container.querySelector('#btnNextFc');
        if (nextBtn) {
            nextBtn.addEventListener('click', function () {
                isFlipped = false;
                currentCardIndex = (currentCardIndex + 1) % cards.length;
                renderFlashcards();
            });
        }
    }

    window.PsychAtlasFlashcards = {
        render: renderFlashcards
    };
})(window);
