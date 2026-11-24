/**
 * PSYCHOLOGY ATLAS — SHAXSIY DAFTAR VA KONSPEKT MODULI (SECTION 14)
 */
(function (window) {
    'use strict';

    let notesFilter = {
        query: '',
        topicId: 'all',
        onlyFavorites: false
    };
    let editingNote = null;

    function renderNotes() {
        const container = document.getElementById('notesViewport');
        if (!container) return;

        const state = window.PsychAtlasStorage.getState();
        const topics = window.PsychAtlasData.TOPICS || [];
        const esc = window.PsychAtlasUtils.escapeHtml;

        const filteredNotes = (state.notes || []).filter(function (n) {
            if (notesFilter.onlyFavorites && !n.isFavorite) return false;
            if (notesFilter.topicId !== 'all' && n.topicId !== notesFilter.topicId) return false;
            if (notesFilter.query) {
                const hay = ((n.title || '') + ' ' + (n.content || '') + ' ' + (n.quote || '')).toLowerCase();
                if (hay.indexOf(notesFilter.query.toLowerCase()) === -1) return false;
            }
            return true;
        });

        const bookmarkedTopicObjs = topics.filter(function (t) {
            return state.bookmarkedTopics.indexOf(t.id) !== -1;
        });

        container.innerHTML =
            '<div class="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">' +
                '<!-- Yuqori Boshqaruv va Eksport -->' +
                '<div class="atlas-card p-6 space-y-4">' +
                    '<div class="flex flex-col md:flex-row md:items-center justify-between gap-4">' +
                        '<div>' +
                            '<span class="text-xs font-extrabold uppercase tracking-wider text-amber-400"><i class="fa-solid fa-book-journal-whills mr-1.5"></i>SHAXSIY DAFTAR VA KONSPEKTLAR</span>' +
                            '<h2 class="serif text-2xl sm:text-3xl font-bold mt-1">Ilmiy qaydlar, muhim matnlar va sevimli mavzular</h2>' +
                            '<p class="text-xs sm:text-sm mt-1" style="color:var(--text-secondary)">Mavzularga qayd biriktiring, konspektlarni tahrirlang va PDF formatida eksport qiling.</p>' +
                        '</div>' +
                        '<div class="flex flex-wrap items-center gap-2 self-start md:self-center">' +
                            '<button id="btnExportNotesPdf" class="px-4 py-2.5 rounded-xl font-bold text-xs atlas-surface hover:border-amber-400 transition">' +
                                '<i class="fa-solid fa-file-pdf mr-1.5 text-rose-400"></i>PDF formatda eksport' +
                            '</button>' +
                            '<button id="btnNewNoteReset" class="px-4 py-2.5 rounded-xl font-bold text-xs text-slate-950" style="background:var(--gold-accent)">' +
                                '<i class="fa-solid fa-plus mr-1.5"></i>Yangi qayd' +
                            '</button>' +
                        '</div>' +
                    '</div>' +

                    '<!-- Sevimli mavzular (Xatcho‘plar) -->' +
                    '<div class="p-4 rounded-2xl atlas-surface space-y-2">' +
                        '<div class="text-xs font-bold flex items-center justify-between">' +
                            '<span><i class="fa-solid fa-bookmark text-amber-400 mr-1.5"></i>Sevimli (Xatcho‘pdagi) mavzular (' + bookmarkedTopicObjs.length + ')</span>' +
                        '</div>' +
                        (bookmarkedTopicObjs.length > 0 ? (
                            '<div class="flex flex-wrap gap-2">' +
                                bookmarkedTopicObjs.map(function (t) {
                                    return '<div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl atlas-card text-xs font-semibold">' +
                                        '<button data-note-open-topic="' + t.id + '" class="hover:underline">' + t.no + '. ' + esc(t.title) + '</button>' +
                                        '<button data-note-unbookmark="' + t.id + '" class="text-rose-400 hover:text-rose-300" title="Xatcho‘pdan olib tashlash"><i class="fa-solid fa-xmark"></i></button>' +
                                    '</div>';
                                }).join('') +
                            '</div>'
                        ) : (
                            '<p class="text-xs" style="color:var(--text-secondary)">Hozircha sevimli mavzular belgilanmagan. Kutubxona yoki Konspekt ko‘rinishida xatcho‘p tugmasini bosing.</p>'
                        )) +
                    '</div>' +
                '</div>' +

                '<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">' +
                    '<!-- Chap: Yangi Qayd / Tahrirlash Formasi -->' +
                    '<div class="lg:col-span-5 atlas-card p-6 space-y-4 self-start">' +
                        '<h3 class="font-bold text-base flex items-center justify-between">' +
                            '<span><i class="fa-solid fa-pen-nib text-amber-400 mr-2"></i>' + (editingNote ? 'Qaydni tahrirlash' : 'Yangi konspekt qaydi yaratish') + '</span>' +
                            (editingNote ? '<button id="btnCancelEditNote" class="text-xs text-rose-300 hover:underline">Bekor qilish</button>' : '') +
                        '</h3>' +

                        '<div class="space-y-3">' +
                            '<div>' +
                                '<label class="text-xs font-bold block mb-1">Sarlavha *</label>' +
                                '<input id="noteTitleInp" type="text" value="' + esc(editingNote ? editingNote.title : '') + '" placeholder="Masalan: Diqqat va Dominanta qonuni konspekti" class="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm atlas-surface">' +
                            '</div>' +

                            '<div>' +
                                '<label class="text-xs font-bold block mb-1">Biriktirilgan mavzu</label>' +
                                '<select id="noteTopicSel" class="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm atlas-surface">' +
                                    topics.map(function (t) {
                                        var sel = editingNote && editingNote.topicId === t.id;
                                        return '<option value="' + t.id + '"' + (sel ? ' selected' : '') + '>' + t.no + '-mavzu: ' + esc(t.title) + '</option>';
                                    }).join('') +
                                '</select>' +
                            '</div>' +

                            '<div>' +
                                '<label class="text-xs font-bold block mb-1">Saqlangan muhim matn / iqtibos (ixtiyoriy)</label>' +
                                '<input id="noteQuoteInp" type="text" value="' + esc(editingNote ? (editingNote.quote || '') : '') + '" placeholder="Muhim ilmiy iqtibos yoki misol..." class="w-full px-3.5 py-2.5 rounded-xl text-xs atlas-surface">' +
                            '</div>' +

                            '<div>' +
                                '<label class="text-xs font-bold block mb-1">Konspekt matni *</label>' +
                                '<textarea id="noteContentInp" rows="6" placeholder="Shaxsiy tahlil, xulosa va konspekt matnini kiriting..." class="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm atlas-surface">' + esc(editingNote ? editingNote.content : '') + '</textarea>' +
                            '</div>' +

                            '<label class="flex items-center gap-2 text-xs font-semibold cursor-pointer">' +
                                '<input id="noteFavChk" type="checkbox" ' + (editingNote && editingNote.isFavorite ? 'checked' : '') + ' class="accent-amber-400">' +
                                '<span>Muhim / Sevimli qayd sifatida belgilash</span>' +
                            '</label>' +

                            '<button id="btnSaveNoteSubmit" class="w-full py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-950 shadow-lg" style="background:linear-gradient(135deg,#D6B56D,#F59E0B)">' +
                                '<i class="fa-solid fa-floppy-disk mr-1.5"></i>' + (editingNote ? 'O‘zgarishlarni saqlash' : 'Daftarga saqlash (+15 XP)') +
                            '</button>' +
                        '</div>' +
                    '</div>' +

                    '<!-- O‘ng: Saqlangan Qaydlar Ro‘yxati va Qidiruv -->' +
                    '<div class="lg:col-span-7 space-y-4">' +
                        '<div class="atlas-card p-4 grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center">' +
                            '<div class="sm:col-span-6 relative">' +
                                '<i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-xs opacity-60"></i>' +
                                '<input id="notesSearchInp" type="text" value="' + esc(notesFilter.query) + '" placeholder="Qaydlardan izlash..." class="w-full pl-8 pr-3 py-2 rounded-xl text-xs atlas-surface">' +
                            '</div>' +
                            '<div class="sm:col-span-4">' +
                                '<select id="notesFilterTopic" class="w-full px-3 py-2 rounded-xl text-xs atlas-surface">' +
                                    '<option value="all"' + (notesFilter.topicId === 'all' ? ' selected' : '') + '>Barcha mavzular</option>' +
                                    topics.map(function (t) {
                                        return '<option value="' + t.id + '"' + (notesFilter.topicId === t.id ? ' selected' : '') + '>' + t.no + '. ' + esc(t.title) + '</option>';
                                    }).join('') +
                                '</select>' +
                            '</div>' +
                            '<div class="sm:col-span-2">' +
                                '<button id="btnNotesFavFilter" class="w-full py-2 rounded-xl text-xs font-bold transition ' +
                                    (notesFilter.onlyFavorites ? 'bg-amber-500/20 border border-amber-400 text-amber-300' : 'atlas-surface') + '">' +
                                    '<i class="fa-solid fa-star"></i>' +
                                '</button>' +
                            '</div>' +
                        '</div>' +

                        (filteredNotes.length > 0 ? (
                            '<div class="space-y-3.5">' +
                                filteredNotes.map(function (note) {
                                    const tObj = topics.find(function (t) { return t.id === note.topicId; });
                                    return '<div class="atlas-card p-5 space-y-3">' +
                                        '<div class="flex items-start justify-between gap-3">' +
                                            '<div>' +
                                                '<div class="flex flex-wrap items-center gap-2 mb-1">' +
                                                    (tObj ? '<button data-note-open-topic="' + tObj.id + '" class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/15 text-sky-300 hover:underline">' + tObj.no + '-mavzu: ' + esc(tObj.title) + '</button>' : '') +
                                                    '<span class="text-[10.5px]" style="color:var(--text-secondary)">' + window.PsychAtlasUtils.formatDateUz(note.updatedAt || note.createdAt) + '</span>' +
                                                '</div>' +
                                                '<h4 class="font-bold text-base">' +
                                                    (note.isFavorite ? '<i class="fa-solid fa-star text-amber-400 mr-1.5 text-xs"></i>' : '') +
                                                    esc(note.title) +
                                                '</h4>' +
                                            '</div>' +
                                            '<div class="flex items-center gap-1.5 shrink-0">' +
                                                '<button data-edit-note="' + esc(note.id) + '" class="w-8 h-8 rounded-lg atlas-surface hover:border-amber-400 text-xs" title="Tahrirlash"><i class="fa-solid fa-pen"></i></button>' +
                                                '<button data-del-note="' + esc(note.id) + '" class="w-8 h-8 rounded-lg atlas-surface hover:border-rose-400 text-rose-300 text-xs" title="O‘chirish"><i class="fa-solid fa-trash"></i></button>' +
                                            '</div>' +
                                        '</div>' +
                                        (note.quote ? (
                                            '<div class="p-3 rounded-xl bg-amber-500/10 border-l-2 border-amber-400 text-xs italic">' +
                                                '«' + esc(note.quote) + '»' +
                                            '</div>'
                                        ) : '') +
                                        '<p class="text-xs sm:text-sm leading-relaxed whitespace-pre-line" style="color:var(--text-secondary)">' + esc(note.content) + '</p>' +
                                    '</div>';
                                }).join('') +
                            '</div>'
                        ) : (
                            '<div class="atlas-card p-10 text-center space-y-2">' +
                                '<i class="fa-solid fa-feather-pointed text-3xl opacity-40"></i>' +
                                '<h4 class="font-bold text-sm">Saqlangan qaydlar topilmadi</h4>' +
                                '<p class="text-xs" style="color:var(--text-secondary)">Chapdagi forma orqali yangi konspekt yozing yoki xarita tugunining batafsil oynasidan «Daftarga saqlash» tugmasini bosing.</p>' +
                            '</div>'
                        )) +
                    '</div>' +
                '</div>' +
            '</div>';

        // Hodisalar
        container.querySelector('#btnSaveNoteSubmit').addEventListener('click', function () {
            const title = container.querySelector('#noteTitleInp').value.trim();
            const topicId = container.querySelector('#noteTopicSel').value;
            const quote = container.querySelector('#noteQuoteInp').value.trim();
            const content = container.querySelector('#noteContentInp').value.trim();
            const isFav = container.querySelector('#noteFavChk').checked;

            if (!title || !content) {
                if (window.PsychAtlasApp) window.PsychAtlasApp.showToast('Sarlavha va konspekt matnini kiriting!', 'error');
                return;
            }
            window.PsychAtlasStorage.saveNote({
                id: editingNote ? editingNote.id : null,
                title: title,
                topicId: topicId,
                quote: quote,
                content: content,
                isFavorite: isFav
            });
            editingNote = null;
            renderNotes();
            if (window.PsychAtlasApp) window.PsychAtlasApp.showToast('Konspekt qaydi saqlandi!', 'success');
        });

        const cancelBtn = container.querySelector('#btnCancelEditNote');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', function () {
                editingNote = null;
                renderNotes();
            });
        }

        container.querySelector('#btnNewNoteReset').addEventListener('click', function () {
            editingNote = null;
            renderNotes();
            const inp = container.querySelector('#noteTitleInp');
            if (inp) inp.focus();
        });

        const searchInp = container.querySelector('#notesSearchInp');
        if (searchInp) {
            searchInp.addEventListener('input', function () {
                notesFilter.query = searchInp.value;
                renderNotes();
                const ni = container.querySelector('#notesSearchInp');
                if (ni) {
                    ni.focus();
                    ni.setSelectionRange(ni.value.length, ni.value.length);
                }
            });
        }

        container.querySelector('#notesFilterTopic').addEventListener('change', function (e) {
            notesFilter.topicId = e.target.value;
            renderNotes();
        });

        container.querySelector('#btnNotesFavFilter').addEventListener('click', function () {
            notesFilter.onlyFavorites = !notesFilter.onlyFavorites;
            renderNotes();
        });

        container.querySelectorAll('[data-edit-note]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                const id = btn.getAttribute('data-edit-note');
                const found = state.notes.find(function (n) { return n.id === id; });
                if (found) {
                    editingNote = Object.assign({}, found);
                    renderNotes();
                }
            });
        });

        container.querySelectorAll('[data-del-note]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                const id = btn.getAttribute('data-del-note');
                window.PsychAtlasStorage.deleteNote(id);
                if (editingNote && editingNote.id === id) editingNote = null;
                renderNotes();
                if (window.PsychAtlasApp) window.PsychAtlasApp.showToast('Qayd o‘chirildi', 'info');
            });
        });

        container.querySelectorAll('[data-note-open-topic]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                const tid = btn.getAttribute('data-note-open-topic');
                if (window.PsychAtlasApp) window.PsychAtlasApp.openTopicInAtlas(tid, 'map');
            });
        });

        container.querySelectorAll('[data-note-unbookmark]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                window.PsychAtlasStorage.toggleBookmarkTopic(btn.getAttribute('data-note-unbookmark'));
                renderNotes();
            });
        });

        container.querySelector('#btnExportNotesPdf').addEventListener('click', function () {
            if (!filteredNotes.length) {
                if (window.PsychAtlasApp) window.PsychAtlasApp.showToast('Eksport qilish uchun kamida bitta qayd bo‘lishi kerak', 'error');
                return;
            }
            const bodyHtml = filteredNotes.map(function (n) {
                const tObj = topics.find(function (t) { return t.id === n.topicId; });
                return '<div class="card">' +
                    '<span class="badge">' + esc(tObj ? (tObj.no + '-mavzu: ' + tObj.title) : 'Konspekt') + '</span>' +
                    '<h3>' + esc(n.title) + '</h3>' +
                    (n.quote ? '<p><em>«' + esc(n.quote) + '»</em></p>' : '') +
                    '<p>' + esc(n.content) + '</p>' +
                '</div>';
            }).join('');
            window.PsychAtlasUtils.printCleanDocument(
                'Shaxsiy Daftar va Ilmiy Konspektlar',
                'Jami qaydlar: ' + filteredNotes.length + ' ta',
                bodyHtml
            );
        });
    }

    window.PsychAtlasNotes = {
        render: renderNotes
    };
})(window);
