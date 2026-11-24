/**
 * PSYCHOLOGY ATLAS — ASOSIY PLATFORMA BOSHQARUVCHISI (APP CONTROLLER)
 */
(function (window) {
    'use strict';

    var $ = function (id) { return document.getElementById(id); };
    var activeModule = 'atlas'; // Boshlang'ich yoki hash bo'yicha: 'dashboard' | 'atlas' | 'library' | 'laboratory' | 'tests' | 'flashcards' | 'ai-tutor' | 'history' | 'glossary' | 'notes'

    var MODULES_LIST = [
        { id: 'dashboard',  ViewId: 'dashboardViewport',  label: 'Bosh sahifa (Dashboard)', icon: 'fa-chart-line' },
        { id: 'atlas',      ViewId: 'atlasViewport',      label: 'Interaktiv Atlas',        icon: 'fa-diagram-project' },
        { id: 'library',    ViewId: 'libraryViewport',    label: 'Mavzular kutubxonasi',    icon: 'fa-layer-group' },
        { id: 'laboratory', ViewId: 'labViewport',        label: 'Laboratoriya (7)',        icon: 'fa-flask-vial' },
        { id: 'tests',      ViewId: 'testsViewport',      label: 'Test tizimi',             icon: 'fa-clipboard-check' },
        { id: 'flashcards', ViewId: 'flashcardsViewport', label: 'Smart Flashcards',        icon: 'fa-clone' },
        { id: 'ai-tutor',   ViewId: 'aiViewport',         label: 'AI Psixologiya Ustoz',    icon: 'fa-robot' },
        { id: 'history',    ViewId: 'historyViewport',    label: 'Psixologiya tarixi',      icon: 'fa-landmark' },
        { id: 'glossary',   ViewId: 'glossaryViewport',   label: 'Atamalar lug‘ati',        icon: 'fa-spell-check' },
        { id: 'notes',      ViewId: 'notesViewport',      label: 'Shaxsiy daftar',          icon: 'fa-book-journal-whills' }
    ];

    function applyThemeMode() {
        var st = window.PsychAtlasStorage.getState();
        var isLight = st.themeMode === 'light';
        document.documentElement.classList.toggle('light-mode', isLight);
        var icon = $('themeModeIcon');
        if (icon) {
            icon.className = isLight ? 'fa-solid fa-moon text-sm' : 'fa-solid fa-sun text-sm text-amber-400';
        }
    }

    function toggleThemeMode() {
        var st = window.PsychAtlasStorage.getState();
        st.themeMode = st.themeMode === 'light' ? 'dark' : 'light';
        window.PsychAtlasStorage.saveState();
        applyThemeMode();
        showToast(st.themeMode === 'light' ? 'Yorug‘ (Light) rejim yoqildi' : 'Premium Qorong‘i (Dark) rejim yoqildi', 'info');
    }

    function updateHeaderBadges() {
        var stats = window.PsychAtlasStorage.getComputedStats();
        var state = window.PsychAtlasStorage.getState();
        if ($('headerXpBadge')) {
            $('headerXpBadge').textContent = stats.xp + ' XP · ' + stats.level + '-daraja';
        }
        if ($('notifCountBadge')) {
            var count = state.activities.length;
            $('notifCountBadge').textContent = count > 9 ? '9+' : String(count);
            $('notifCountBadge').classList.toggle('hidden', count === 0);
        }
    }

    function navigateTo(moduleId) {
        var target = MODULES_LIST.find(function (m) { return m.id === moduleId; }) || MODULES_LIST[1];
        activeModule = target.id;

        // Barcha viewportlarni yashirish va tanlanganni ochish
        MODULES_LIST.forEach(function (m) {
            var el = $(m.ViewId);
            if (el) el.classList.toggle('hidden', m.id !== activeModule);
        });

        // Atlas tezkor ko'rinish tugmalarini faqat Atlas modulida ko'rsatish
        if ($('atlasViewSwitcherWrap')) {
            $('atlasViewSwitcherWrap').classList.toggle('hidden', activeModule !== 'atlas');
        }

        // Chap menyu aktiv holati
        document.querySelectorAll('[data-module-nav]').forEach(function (btn) {
            btn.classList.toggle('is-active', btn.getAttribute('data-module-nav') === activeModule);
        });

        // Tegishli modulni render qilish
        if (activeModule === 'dashboard' && window.PsychAtlasDashboard) {
            window.PsychAtlasDashboard.render();
        } else if (activeModule === 'atlas' && window.PsychAtlasModule) {
            window.PsychAtlasModule.renderNav();
            requestAnimationFrame(function () {
                window.PsychAtlasModule.fitView();
            });
        } else if (activeModule === 'library' && window.PsychAtlasModule) {
            window.PsychAtlasModule.renderLibrary();
        } else if (activeModule === 'laboratory' && window.PsychAtlasLaboratory) {
            window.PsychAtlasLaboratory.render();
        } else if (activeModule === 'tests' && window.PsychAtlasTests) {
            window.PsychAtlasTests.render();
        } else if (activeModule === 'flashcards' && window.PsychAtlasFlashcards) {
            window.PsychAtlasFlashcards.render();
        } else if (activeModule === 'ai-tutor' && window.PsychAtlasAiTutor) {
            window.PsychAtlasAiTutor.render();
        } else if (activeModule === 'history' && window.PsychAtlasHistory) {
            window.PsychAtlasHistory.render();
        } else if (activeModule === 'glossary' && window.PsychAtlasGlossary) {
            window.PsychAtlasGlossary.render();
        } else if (activeModule === 'notes' && window.PsychAtlasNotes) {
            window.PsychAtlasNotes.render();
        }

        closeSidebar();
        hideGlobalSearchDropdown();
    }

    function openTopicInAtlas(topicId, viewMode) {
        navigateTo('atlas');
        if (window.PsychAtlasModule) {
            if (viewMode) window.PsychAtlasModule.setView(viewMode);
            window.PsychAtlasModule.pickTopic(topicId);
        }
    }

    function openSidebar() {
        var sb = $('sidebar');
        var bd = $('sidebarBackdrop');
        if (sb) sb.classList.remove('-translate-x-full');
        if (bd) bd.classList.remove('hidden');
    }

    function closeSidebar() {
        var sb = $('sidebar');
        var bd = $('sidebarBackdrop');
        if (sb) sb.classList.add('-translate-x-full');
        if (bd) bd.classList.add('hidden');
    }

    /* =========================================================
       GLOBAL QIDIRUV DROPDOWN (BARCHA MAVZULAR, TUGUNLAR, LUG'AT VA OLIMLAR)
    ========================================================= */
    function handleGlobalSearchInput(query) {
        var dropdown = $('globalSearchDropdown');
        if (!dropdown) return;
        var q = (query || '').trim().toLowerCase();
        if (q.length < 2) {
            dropdown.classList.add('hidden');
            return;
        }

        var data = window.PsychAtlasData;
        var edu = window.PsychAtlasEducation;
        var esc = window.PsychAtlasUtils.escapeHtml;
        var results = [];

        // 1. Mavzular va tugunlar
        data.TOPICS.forEach(function (t) {
            t._all.forEach(function (n) {
                var hay = (n.title + ' ' + (n.sub || '') + ' ' + (n.desc || '')).toLowerCase();
                if (hay.indexOf(q) !== -1) {
                    results.push({
                        kind: 'node',
                        badge: t.no + '-mavzu',
                        title: n.title,
                        sub: n.sub || n.desc || '',
                        topicId: t.id,
                        nodeId: n.id
                    });
                }
            });
        });

        // 2. Lug'at atamalari
        (edu.GLOSSARY_TERMS || []).forEach(function (term) {
            var hay = (term.termUz + ' ' + term.termIntl + ' ' + term.shortDef).toLowerCase();
            if (hay.indexOf(q) !== -1) {
                results.push({
                    kind: 'term',
                    badge: 'Lug‘at',
                    title: term.termUz,
                    sub: term.shortDef,
                    termId: term.id
                });
            }
        });

        // 3. Tarix va olimlar
        (edu.SCIENTISTS || []).forEach(function (sci) {
            var hay = (sci.name + ' ' + sci.coreTheory).toLowerCase();
            if (hay.indexOf(q) !== -1) {
                results.push({
                    kind: 'scientist',
                    badge: 'Psixologiya tarixi',
                    title: sci.name,
                    sub: sci.coreTheory
                });
            }
        });

        if (!results.length) {
            dropdown.innerHTML = '<div class="p-4 text-xs text-center" style="color:var(--text-secondary)">«' + esc(query) + '» bo‘yicha natija topilmadi</div>';
            dropdown.classList.remove('hidden');
            return;
        }

        dropdown.innerHTML =
            '<div class="p-2 space-y-1 max-h-80 overflow-y-auto">' +
                results.slice(0, 10).map(function (r, idx) {
                    return '<button data-gsearch-idx="' + idx + '" class="w-full text-left p-2.5 rounded-xl hover:bg-white/10 transition flex items-start justify-between gap-2">' +
                        '<div class="min-w-0">' +
                            '<div class="text-xs font-bold truncate">' + esc(r.title) + '</div>' +
                            '<div class="text-[11px] truncate" style="color:var(--text-secondary)">' + esc(r.sub) + '</div>' +
                        '</div>' +
                        '<span class="px-2 py-0.5 rounded-md text-[10px] font-bold atlas-surface shrink-0" style="color:var(--gold-accent)">' + esc(r.badge) + '</span>' +
                    '</button>';
                }).join('') +
            '</div>';
        dropdown.classList.remove('hidden');

        dropdown.querySelectorAll('[data-gsearch-idx]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var r = results[Number(btn.getAttribute('data-gsearch-idx'))];
                hideGlobalSearchDropdown();
                if (!r) return;
                if (r.kind === 'node') {
                    openTopicInAtlas(r.topicId, 'map');
                    var tObj = data.TOPICS.find(function (t) { return t.id === r.topicId; });
                    if (tObj && tObj._byId[r.nodeId]) {
                        window.PsychAtlasModule.openDrawer(tObj._byId[r.nodeId]);
                    }
                } else if (r.kind === 'term') {
                    navigateTo('glossary');
                } else if (r.kind === 'scientist') {
                    navigateTo('history');
                }
            });
        });
    }

    function hideGlobalSearchDropdown() {
        var dd = $('globalSearchDropdown');
        if (dd) dd.classList.add('hidden');
    }

    /* =========================================================
       BILDIRISHNOMALAR VA PROFIL MODAL OYNASI
    ========================================================= */
    function toggleNotificationsPopover() {
        var pop = $('notifPopover');
        if (!pop) return;
        var isHidden = pop.classList.contains('hidden');
        if (!isHidden) {
            pop.classList.add('hidden');
            return;
        }
        var state = window.PsychAtlasStorage.getState();
        var esc = window.PsychAtlasUtils.escapeHtml;
        pop.innerHTML =
            '<div class="p-3.5 border-b border-white/10 flex items-center justify-between">' +
                '<span class="text-xs font-extrabold uppercase tracking-wider" style="color:var(--gold-accent)">Bildirishnomalar va Faoliyat</span>' +
                '<span class="text-[11px]" style="color:var(--text-secondary)">' + state.activities.length + ' ta</span>' +
            '</div>' +
            '<div class="p-2.5 max-h-72 overflow-y-auto space-y-1.5">' +
                (state.activities.length > 0 ? state.activities.slice(0, 8).map(function (a) {
                    return '<div class="p-2.5 rounded-xl atlas-surface text-xs">' +
                        '<div class="font-bold flex items-center justify-between gap-2">' +
                            '<span class="truncate">' + esc(a.title) + '</span>' +
                            (a.xpEarned ? '<span class="text-[10px] text-amber-400">+' + a.xpEarned + ' XP</span>' : '') +
                        '</div>' +
                        '<div class="text-[11px] mt-0.5" style="color:var(--text-secondary)">' + esc(a.detail) + '</div>' +
                    '</div>';
                }).join('') : '<div class="p-4 text-center text-xs" style="color:var(--text-secondary)">Hozircha yangi bildirishnomalar yo‘q</div>') +
            '</div>';
        pop.classList.remove('hidden');
    }

    function openProfileModal() {
        var modal = $('profileModal');
        if (!modal) return;
        var stats = window.PsychAtlasStorage.getComputedStats();
        var state = window.PsychAtlasStorage.getState();
        var badges = window.PsychAtlasEducation.BADGES || [];
        var esc = window.PsychAtlasUtils.escapeHtml;

        $('profileModalBody').innerHTML =
            '<div class="space-y-4">' +
                '<div class="flex items-center justify-between p-4 rounded-2xl atlas-surface">' +
                    '<div class="flex items-center gap-3">' +
                        '<div class="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-black text-slate-950" style="background:linear-gradient(135deg,#D6B56D,#F59E0B)">' +
                            stats.level +
                        '</div>' +
                        '<div>' +
                            '<div class="font-bold text-base">Tadqiqotchi Profili (' + stats.level + '-daraja)</div>' +
                            '<div class="text-xs" style="color:var(--text-secondary)">Jami: ' + stats.xp + ' XP · Ketma-ket: ' + stats.streakDays + ' kun</div>' +
                        '</div>' +
                    '</div>' +
                    '<span class="px-3 py-1 rounded-full text-xs font-bold" style="background:rgba(214,181,109,0.16);color:var(--gold-accent)">O‘zlashtirish: ' + stats.overallMastery + '%</span>' +
                '</div>' +

                '<div class="grid grid-cols-3 gap-2.5 text-center text-xs">' +
                    '<div class="p-3 rounded-xl atlas-surface"><div class="font-extrabold text-base">' + stats.studiedTopicsCount + '/13</div><div style="color:var(--text-secondary)">Mavzular</div></div>' +
                    '<div class="p-3 rounded-xl atlas-surface"><div class="font-extrabold text-base">' + stats.completedQuizzesCount + '</div><div style="color:var(--text-secondary)">Testlar</div></div>' +
                    '<div class="p-3 rounded-xl atlas-surface"><div class="font-extrabold text-base">' + stats.completedLabsCount + '/7</div><div style="color:var(--text-secondary)">Tajribalar</div></div>' +
                '</div>' +

                '<div>' +
                    '<div class="text-xs font-bold mb-2">Qo‘lga kiritilgan nishonlar (' + stats.earnedBadgesCount + '/' + badges.length + ')</div>' +
                    '<div class="grid grid-cols-2 gap-2">' +
                        badges.map(function (b) {
                            var has = state.earnedBadges.indexOf(b.id) !== -1;
                            return '<div class="p-2.5 rounded-xl border text-xs ' + (has ? 'bg-amber-500/15 border-amber-400/40' : 'atlas-surface opacity-50') + '">' +
                                '<div class="font-bold"><i class="fa-solid ' + b.icon + ' mr-1.5" style="color:' + b.color + '"></i>' + esc(b.title) + '</div>' +
                                '<div class="text-[10.5px] mt-0.5" style="color:var(--text-secondary)">' + esc(b.desc) + '</div>' +
                            '</div>';
                        }).join('') +
                    '</div>' +
                '</div>' +

                '<div class="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">' +
                    '<button id="btnProfileBackup" class="px-3.5 py-2 rounded-xl text-xs font-bold atlas-surface hover:border-white/30"><i class="fa-solid fa-download mr-1.5"></i>Ma’lumotlarni eksport (Backup)</button>' +
                    '<button id="btnProfileReset" class="px-3.5 py-2 rounded-xl text-xs font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30 hover:bg-rose-500/25">Progressni 0 ga tushirish</button>' +
                '</div>' +
            '</div>';

        modal.classList.remove('hidden');

        $('btnProfileBackup').addEventListener('click', function () {
            window.PsychAtlasStorage.exportBackupJSON();
        });
        $('btnProfileReset').addEventListener('click', function () {
            window.PsychAtlasStorage.resetAllProgress();
            modal.classList.add('hidden');
            navigateTo(activeModule);
            if (window.PsychAtlasModule) window.PsychAtlasModule.renderNav();
            updateHeaderBadges();
            showToast('Barcha statistik ko‘rsatkichlar boshlang‘ich (0) holatga qaytarildi', 'info');
        });
    }

    /* =========================================================
       TOAST XABARNOMALAR TIZIMI
    ========================================================= */
    function showToast(message, type) {
        var wrap = $('toastContainer');
        if (!wrap) return;
        var el = document.createElement('div');
        var colorCls = type === 'error'
            ? 'border-rose-400 bg-rose-950/90 text-rose-100'
            : (type === 'success'
                ? 'border-emerald-400 bg-emerald-950/90 text-emerald-100'
                : 'border-amber-400 bg-slate-900/95 text-slate-100');
        el.className = 'px-4 py-3 rounded-xl border shadow-2xl text-xs font-bold flex items-center gap-2.5 transition-all duration-200 ' + colorCls;
        el.innerHTML = '<i class="fa-solid ' + (type === 'error' ? 'fa-circle-exclamation text-rose-400' : (type === 'success' ? 'fa-circle-check text-emerald-400' : 'fa-bell text-amber-400')) + '"></i>' +
            '<span>' + window.PsychAtlasUtils.escapeHtml(message) + '</span>';
        wrap.appendChild(el);
        setTimeout(function () {
            if (el.parentNode) el.parentNode.removeChild(el);
        }, 3400);
    }

    function initApp() {
        applyThemeMode();
        updateHeaderBadges();

        // Backend va offline statusni tekshirish
        window.PsychAtlasApi.checkBackendStatus();

        // Atlas modulini ishga tushirish
        if (window.PsychAtlasModule) {
            window.PsychAtlasModule.init();
        }

        // Chap paneldagi asosiy modullar navigatsiyasi
        document.querySelectorAll('[data-module-nav]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                navigateTo(btn.getAttribute('data-module-nav'));
            });
        });

        // Mobil menyu
        if ($('menuBtn')) $('menuBtn').addEventListener('click', openSidebar);
        if ($('sidebarBackdrop')) $('sidebarBackdrop').addEventListener('click', closeSidebar);

        // Dark/Light rejim
        if ($('btnThemeToggle')) $('btnThemeToggle').addEventListener('click', toggleThemeMode);

        // Bildirishnomalar va Profil
        if ($('btnNotifications')) {
            $('btnNotifications').addEventListener('click', function (e) {
                e.stopPropagation();
                toggleNotificationsPopover();
            });
        }
        if ($('btnProfile')) {
            $('btnProfile').addEventListener('click', openProfileModal);
        }
        if ($('closeProfileModal')) {
            $('closeProfileModal').addEventListener('click', function () {
                $('profileModal').classList.add('hidden');
            });
        }

        // Global Qidiruv
        var searchInp = $('searchInput');
        if (searchInp) {
            searchInp.addEventListener('input', function () {
                handleGlobalSearchInput(searchInp.value);
            });
            searchInp.addEventListener('focus', function () {
                if (searchInp.value.trim().length >= 2) {
                    handleGlobalSearchInput(searchInp.value);
                }
            });
        }

        document.addEventListener('click', function (e) {
            if (!e.target.closest('#globalSearchWrap')) {
                hideGlobalSearchDropdown();
            }
            if (!e.target.closest('#notifWrap')) {
                var pop = $('notifPopover');
                if (pop) pop.classList.add('hidden');
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                if (window.PsychAtlasModule) window.PsychAtlasModule.closeDrawer();
                closeSidebar();
                hideGlobalSearchDropdown();
                if ($('profileModal')) $('profileModal').classList.add('hidden');
                if ($('notifPopover')) $('notifPopover').classList.add('hidden');
            }
        });

        // State o'zgarganda header badgelarni yangilash
        window.addEventListener('psychatlas:statechange', updateHeaderBadges);
        window.addEventListener('psychatlas:badgeearned', function (ev) {
            var list = ev.detail || [];
            list.forEach(function (b) {
                showToast('Yangi nishon qo‘lga kiritildi: «' + b.title + '» (+' + b.xpReward + ' XP)!', 'success');
            });
        });

        // Haqiqiy o'quv vaqti trekeri (har 15 soniyada, faqat sahifa ochiq va aktiv bo'lganda)
        setInterval(function () {
            if (!document.hidden) {
                window.PsychAtlasStorage.addStudyTime(15);
            }
        }, 15000);
    }

    window.PsychAtlasApp = {
        init: initApp,
        navigateTo: navigateTo,
        openTopicInAtlas: openTopicInAtlas,
        getActiveModule: function () { return activeModule; },
        openSidebar: openSidebar,
        closeSidebar: closeSidebar,
        showToast: showToast
    };

    document.addEventListener('DOMContentLoaded', initApp);
})(window);
