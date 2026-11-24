/**
 * PSYCHOLOGY ATLAS — INTERAKTIV PSIXOLOGIK ATLAS, KNOWLEDGE GALAXY VA MAVZULAR KUTUBXONASI
 *
 * Asl loyihadagi barcha xarita funksiyalari (layoutTopic, drawConnectors, renderMap,
 * renderGrid, openDrawer, fitView, zoomBy, centerOn, applySearch) to'liq saqlangan
 * va yangi imkoniyatlar (shoxlarni ochish/yopish, Knowledge Galaxy, PNG/SVG/PDF eksport,
 * xarita holatini saqlash hamda Mavzular kutubxonasi) bilan kengaytirilgan.
 */
(function (window) {
    'use strict';

    var $ = function (id) { return document.getElementById(id); };
    var activeTopic = null;
    var activeView = 'map'; // 'map' | 'grid' | 'galaxy'
    var view = { scale: 1, x: 0, y: 0 };
    var activeGalaxyCategory = 'all';
    var selectedGalaxyLink = null;
    var currentDrawerNode = null;

    // Kutubxona filtrlari
    var libFilter = {
        query: '',
        category: 'all',
        group: 'all',
        sort: 'no',
        onlyBookmarked: false
    };

    function getActiveTopic() {
        return activeTopic || window.PsychAtlasData.TOPICS[0];
    }

    /* =========================================================
       1. TUGUN HTML MARKUPI (ASL + SHOXNI OCHISH/YOPISH VA PROGRESS)
    ========================================================= */
    function nodeMarkup(node, branchObj) {
        var esc = window.PsychAtlasUtils.escapeHtml;
        var badge = '';
        if (node.cat) {
            badge = '<span class="node__badge">' +
                (node.icon ? '<i class="fa-solid ' + esc(node.icon) + '"></i>' : '') +
                esc(node.cat) + '</span>';
        }

        var auditDot = (node.auditFlags && node.auditFlags.length)
            ? '<span class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-[10px]" title="Ilmiy audit izohi mavjud"><i class="fa-solid fa-magnifying-glass-chart"></i></span>'
            : '';

        if (node.kind === 'root') {
            return '<div class="node__head">' +
                '<span class="node__badge"><i class="fa-solid ' + esc(node.icon) + '"></i> ' + activeTopic.no + '-MAVZU</span>' +
                auditDot +
                '</div>' +
                '<h2 class="node__title">' + esc(node.title) + '</h2>' +
                '<p class="node__sub">' + esc(node.sub) + '</p>' +
                '<div class="node__foot"><span>' + activeTopic._branches.length + ' ta tipologik shox</span>' +
                '<i class="fa-solid fa-arrow-right"></i></div>';
        }
        if (node.kind === 'branch') {
            var isCollapsed = branchObj && branchObj._collapsed;
            var toggleBtn = node.count
                ? '<button type="button" class="node__count-btn" data-toggle-branch="' + esc(node.id) + '" title="' + (isCollapsed ? 'Ichki tugunlarni ochish' : 'Ichki tugunlarni yig‘ish') + '">' +
                    '<span>' + node.count + '</span>' +
                    '<i class="fa-solid ' + (isCollapsed ? 'fa-chevron-right' : 'fa-chevron-down') + ' text-[8px]"></i>' +
                  '</button>'
                : '';
            return '<div class="node__head">' + badge +
                '<div class="flex items-center gap-1">' + auditDot + toggleBtn + '</div>' +
                '</div>' +
                '<h3 class="node__title">' + esc(node.title) + '</h3>' +
                '<p class="node__sub">' + esc(node.sub) + '</p>';
        }
        return '<div class="node__head">' +
            '<div class="flex items-center gap-1.5 min-w-0"><span class="node__dot"></span>' +
            '<span class="node__cat">' + esc(node.cat || 'Tarkibiy qism') + '</span></div>' +
            auditDot +
            '</div>' +
            '<h4 class="node__title">' + esc(node.title) + '</h4>' +
            '<p class="node__sub">' + esc(node.sub) + '</p>';
    }

    function createNodeEl(node, branchObj) {
        var el = document.createElement('div');
        el.className = 'node theme-' + node.theme + ' node--' + node.kind;
        el.dataset.id = node.id;
        el.setAttribute('tabindex', '0');
        el.setAttribute('role', 'button');
        el.setAttribute('aria-label', node.title + ' — ' + (node.sub || ''));
        el.innerHTML = nodeMarkup(node, branchObj);

        // Shoxni yig'ish / yoyish tugmasi
        var toggleBtn = el.querySelector('[data-toggle-branch]');
        if (toggleBtn && branchObj) {
            toggleBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                branchObj._collapsed = !branchObj._collapsed;
                persistCollapsedBranches();
                renderMap(true);
            });
        }

        el.addEventListener('click', function (e) {
            e.stopPropagation();
            openDrawer(node);
        });
        el.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openDrawer(node);
            }
        });
        return el;
    }

    function persistCollapsedBranches() {
        if (!activeTopic) return;
        var collapsedIds = activeTopic._branches
            .filter(function (b) { return !!b._collapsed; })
            .map(function (b) { return b.node.id; });
        window.PsychAtlasStorage.saveMapState(activeTopic.id, {
            collapsedBranches: collapsedIds,
            scale: view.scale,
            x: view.x,
            y: view.y
        });
    }

    function restoreCollapsedBranches(topic) {
        var saved = window.PsychAtlasStorage.getMapState(topic.id);
        var collapsedIds = (saved && saved.collapsedBranches) ? saved.collapsedBranches : [];
        topic._branches.forEach(function (b) {
            b._collapsed = collapsedIds.indexOf(b.node.id) !== -1;
        });
    }

    /* =========================================================
       2. AVTOMATIK JOYLASHTIRISH ALGORITMI (ASL + COLLAPSE QO'LLAB-QUVVATLASHI)
    ========================================================= */
    function layoutTopic(t) {
        var H = {};
        t._all.forEach(function (n) {
            if (n._el && !n._hidden) {
                H[n.id] = n._el.offsetHeight || 130;
            } else {
                H[n.id] = 0;
            }
        });

        var ROOT_W = 330, BR_W = 285, LEAF_W = 274, GAPX = 112, GAPY = 24, GAPB = 46, PAD = 80;
        var rootX = PAD;
        var brX = rootX + ROOT_W + GAPX;
        var hasVisibleLeaves = t._branches.some(function (b) {
            return !b._collapsed && b.children.length > 0;
        });
        var leafX = brX + BR_W + GAPX;

        var cursor = PAD;
        t._branches.forEach(function (b) {
            var kids = b._collapsed ? [] : b.children;
            var kidsH = kids.length
                ? kids.reduce(function (s, k) { return s + H[k.id]; }, 0) + GAPY * (kids.length - 1)
                : 0;
            var blockH = Math.max(H[b.node.id], kidsH);
            b.node._x = brX;
            b.node._w = BR_W;
            b.node._y = cursor + (blockH - H[b.node.id]) / 2;
            var kc = cursor + (blockH - kidsH) / 2;
            b.children.forEach(function (k) {
                if (b._collapsed) {
                    k._hidden = true;
                } else {
                    k._hidden = false;
                    k._x = leafX;
                    k._w = LEAF_W;
                    k._y = kc;
                    kc += H[k.id] + GAPY;
                }
            });
            cursor += blockH + GAPB;
        });

        var contentBottom = cursor - GAPB;
        var rootH = H[t._root.id];
        t._w = (hasVisibleLeaves ? leafX + LEAF_W : brX + BR_W) + PAD;
        t._h = Math.max(contentBottom + PAD, rootH + 2 * PAD);
        t._root._x = rootX;
        t._root._w = ROOT_W;
        t._root._y = Math.max(PAD, t._h / 2 - rootH / 2);

        t._all.forEach(function (n) {
            if (!n._el) return;
            if (n._hidden) {
                n._el.style.display = 'none';
                return;
            }
            n._el.style.display = '';
            n._el.style.left = n._x + 'px';
            n._el.style.top = n._y + 'px';
            n._el.style.width = n._w + 'px';
            n._el.classList.add('ready');
        });
    }

    function drawConnectors(t, svg) {
        var THEMES = window.PsychAtlasData.THEMES;
        var NS = 'http://www.w3.org/2000/svg';
        var defs = document.createElementNS(NS, 'defs');
        Object.keys(THEMES).forEach(function (key) {
            var marker = document.createElementNS(NS, 'marker');
            marker.setAttribute('id', 'arw-' + key);
            marker.setAttribute('viewBox', '0 0 10 10');
            marker.setAttribute('refX', '8');
            marker.setAttribute('refY', '5');
            marker.setAttribute('markerWidth', '5');
            marker.setAttribute('markerHeight', '5');
            marker.setAttribute('orient', 'auto-start-reverse');
            var p = document.createElementNS(NS, 'path');
            p.setAttribute('d', 'M 0 1.5 L 8 5 L 0 8.5 z');
            p.setAttribute('fill', THEMES[key].line);
            marker.appendChild(p);
            defs.appendChild(marker);
        });
        svg.appendChild(defs);

        function link(parent, child, width) {
            if (!parent._el || !child._el || child._hidden) return;
            var ph = parent._el.offsetHeight || 120;
            var ch = child._el.offsetHeight || 120;
            var x1 = parent._x + parent._w;
            var y1 = parent._y + ph / 2;
            var x2 = child._x;
            var y2 = child._y + ch / 2;
            var mx = (x1 + x2) / 2;
            var path = document.createElementNS(NS, 'path');
            path.setAttribute('d', 'M ' + x1 + ' ' + y1 + ' C ' + mx + ' ' + y1 + ', ' + mx + ' ' + y2 + ', ' + (x2 - 3) + ' ' + y2);
            path.setAttribute('stroke', THEMES[child.theme].line);
            path.setAttribute('stroke-width', width);
            path.setAttribute('stroke-opacity', '0.68');
            path.setAttribute('marker-end', 'url(#arw-' + child.theme + ')');
            path.setAttribute('class', 'connector');
            svg.appendChild(path);
        }

        t._branches.forEach(function (b) {
            link(t._root, b.node, 3);
            if (!b._collapsed) {
                b.children.forEach(function (k) { link(b.node, k, 2.2); });
            }
        });
    }

    /* =========================================================
       3. XARITA RENDERERI (MAP VIEW)
    ========================================================= */
    function renderMap(preserveViewport) {
        var t = getActiveTopic();
        activeTopic = t;
        var layer = $('nodesContainer');
        var svg = $('connectorsSvg');
        var world = $('mapWorld');
        if (!layer || !svg || !world) return;

        restoreCollapsedBranches(t);
        layer.innerHTML = '';
        svg.innerHTML = '';

        // Root
        t._root._hidden = false;
        t._root._el = createNodeEl(t._root, null);
        layer.appendChild(t._root._el);

        // Branches & Children
        t._branches.forEach(function (b) {
            b.node._hidden = false;
            b.node._el = createNodeEl(b.node, b);
            layer.appendChild(b.node._el);
            b.children.forEach(function (k) {
                k._hidden = !!b._collapsed;
                k._el = createNodeEl(k, null);
                if (k._hidden) k._el.style.display = 'none';
                layer.appendChild(k._el);
            });
        });

        layoutTopic(t);
        world.style.width = t._w + 'px';
        world.style.height = t._h + 'px';
        svg.setAttribute('viewBox', '0 0 ' + t._w + ' ' + t._h);
        svg.setAttribute('width', t._w);
        svg.setAttribute('height', t._h);

        drawConnectors(t, svg);
        applySearch();
        if (!preserveViewport) {
            requestAnimationFrame(fitView);
        } else {
            applyTransform();
        }
    }

    function toggleAllBranches() {
        var t = getActiveTopic();
        var anyOpen = t._branches.some(function (b) { return b.children.length > 0 && !b._collapsed; });
        t._branches.forEach(function (b) {
            if (b.children.length > 0) b._collapsed = anyOpen;
        });
        persistCollapsedBranches();
        renderMap(false);
    }

    function applyTransform() {
        var world = $('mapWorld');
        var zoomTxt = $('zoomLevelText');
        if (world) {
            world.style.transform =
                'translate(' + view.x + 'px, ' + view.y + 'px) scale(' + view.scale + ')';
        }
        if (zoomTxt) {
            zoomTxt.textContent = Math.round(view.scale * 100) + '%';
        }
    }

    function fitView() {
        var t = getActiveTopic();
        var vp = $('mapViewport');
        if (!vp) return;
        var vw = vp.clientWidth;
        var vh = vp.clientHeight;
        if (!vw || !vh || !t._w) return;
        var s = Math.min((vw - 56) / t._w, (vh - 80) / t._h, 1.08);
        view.scale = Math.max(0.22, s);
        view.x = (vw - t._w * view.scale) / 2;
        view.y = (vh - t._h * view.scale) / 2;
        applyTransform();
    }

    function zoomBy(delta) {
        var vp = $('mapViewport');
        if (!vp) return;
        var cx = vp.clientWidth / 2;
        var cy = vp.clientHeight / 2;
        var prev = view.scale;
        view.scale = Math.min(Math.max(0.2, view.scale + delta), 2);
        view.x = cx - (cx - view.x) * (view.scale / prev);
        view.y = cy - (cy - view.y) * (view.scale / prev);
        applyTransform();
    }

    function centerOn(node) {
        if (!node || !node._el) return;
        var vp = $('mapViewport');
        if (!vp) return;
        var h = node._el.offsetHeight || 120;
        view.x = vp.clientWidth / 2 - (node._x + node._w / 2) * view.scale;
        view.y = vp.clientHeight / 2 - (node._y + h / 2) * view.scale;
        applyTransform();
    }

    /* =========================================================
       4. QIDIRUV (XARITA VA KONSPEKT ICHIDA)
    ========================================================= */
    function nodeHaystack(n) {
        return (n.title + ' ' + (n.sub || '') + ' ' + (n.desc || '') + ' ' +
            (n.items || []).map(function (i) { return i[0] + ' ' + i[1]; }).join(' ')).toLowerCase();
    }

    function applySearch() {
        var input = $('searchInput');
        var q = input ? input.value.trim().toLowerCase() : '';
        var t = getActiveTopic();
        var first = null;
        t._all.forEach(function (n) {
            if (!n._el) return;
            var hit = !!q && nodeHaystack(n).indexOf(q) !== -1;
            n._el.classList.toggle('is-match', hit);
            n._el.classList.toggle('is-dim', !!q && !hit);
            if (hit && !first) first = n;
        });
        if (q && first && activeView === 'map') centerOn(first);
    }

    function applyGridFilter() {
        var input = $('searchInput');
        var q = input ? input.value.trim().toLowerCase() : '';
        var container = $('gridCards');
        if (!container) return;
        var cards = container.querySelectorAll('[data-open]');
        Array.prototype.forEach.call(cards, function (card) {
            var n = activeTopic._byId[card.dataset.open];
            var hide = !!q && n && nodeHaystack(n).indexOf(q) === -1;
            card.classList.toggle('hidden', !!hide);
        });
    }

    /* =========================================================
       5. STUDY VIEW (KONSPEKT VA KARTOCHKALAR KO'RINISHI)
    ========================================================= */
    function renderGrid() {
        var t = getActiveTopic();
        var THEMES = window.PsychAtlasData.THEMES;
        var th = THEMES[t.theme] || THEMES.indigo;
        var esc = window.PsychAtlasUtils.escapeHtml;
        var state = window.PsychAtlasStorage.getState();
        var isBookmarked = state.bookmarkedTopics.indexOf(t.id) !== -1;
        var prog = state.topicProgress[t.id] || { completion: 0 };

        var hero = $('gridHero');
        if (!hero) return;
        hero.style.background = 'linear-gradient(125deg, ' + th.line + ' 0%, ' + th.deep + ' 100%)';
        hero.innerHTML =
            '<div class="flex flex-col lg:flex-row lg:items-center justify-between gap-5">' +
                '<div>' +
                    '<div class="flex flex-wrap items-center gap-2 mb-2">' +
                        '<span class="inline-block px-3 py-1 rounded-full bg-white/20 text-[11px] font-semibold">' +
                            t.no + '-mavzu • ' + (t.group === 0 ? 'Umumiy psixologiya' : 'Temperament (mijoz)') +
                        '</span>' +
                        '<span class="inline-block px-3 py-1 rounded-full bg-black/25 text-[11px] font-semibold">' +
                            'O‘zlashtirish: ' + prog.completion + '%' +
                        '</span>' +
                        '<span class="inline-block px-3 py-1 rounded-full bg-black/25 text-[11px] font-semibold">' +
                            esc(t.difficulty) + ' · ' + esc(t.duration) +
                        '</span>' +
                    '</div>' +
                    '<h2 class="serif text-2xl sm:text-3xl font-bold">' + esc(t.title) + '</h2>' +
                    '<p class="text-white/85 text-sm mt-2 max-w-2xl">' + esc(t.summary) + '</p>' +
                '</div>' +
                '<div class="flex flex-wrap items-center gap-2.5 self-start lg:self-center">' +
                    '<button data-grid-bookmark class="px-3.5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs flex items-center gap-1.5 transition">' +
                        '<i class="' + (isBookmarked ? 'fa-solid text-amber-300' : 'fa-regular') + ' fa-bookmark"></i>' +
                        '<span>' + (isBookmarked ? 'Xatcho‘pda' : 'Xatcho‘pga') + '</span>' +
                    '</button>' +
                    '<button data-grid-complete class="px-3.5 py-2.5 rounded-xl bg-emerald-500/30 hover:bg-emerald-500/45 border border-emerald-300/40 text-white font-semibold text-xs flex items-center gap-1.5 transition">' +
                        '<i class="fa-solid fa-circle-check"></i>' +
                        '<span>Mavzuni o‘rganildi deb belgilash</span>' +
                    '</button>' +
                    '<button data-goto-map class="px-4 py-2.5 bg-white rounded-xl font-bold text-xs sm:text-sm shadow hover:bg-white/90 transition" style="color:' + th.deep + '">' +
                        '<i class="fa-solid fa-diagram-project mr-1.5"></i>Xaritani ko‘rish' +
                    '</button>' +
                '</div>' +
            '</div>';

        hero.querySelector('[data-goto-map]').addEventListener('click', function () { setView('map'); });
        hero.querySelector('[data-grid-bookmark]').addEventListener('click', function () {
            window.PsychAtlasStorage.toggleBookmarkTopic(t.id);
            renderGrid();
        });
        hero.querySelector('[data-grid-complete]').addEventListener('click', function () {
            window.PsychAtlasStorage.markTopicCompleted(t.id);
            renderGrid();
            renderNav();
            if (window.PsychAtlasApp) window.PsychAtlasApp.showToast('«' + t.title + '» 100% o‘rganildi deb belgilandi (+40 XP)!', 'success');
        });

        var cardsEl = $('gridCards');
        cardsEl.innerHTML = t._all.map(function (n) {
            var nth = THEMES[n.theme] || THEMES.indigo;
            var chips = (n.items || []).slice(0, 4).map(function (i) {
                return '<span class="inline-block text-[11px] atlas-surface px-2.5 py-1 rounded-lg font-medium">' + esc(i[0]) + '</span>';
            }).join('');
            var label = n.cat || (n.kind === 'root' ? 'Mavzu asosi' : n.kind === 'branch' ? 'Shox' : 'Tur');
            var size = n.kind === 'root' ? 'text-xl' : n.kind === 'branch' ? 'text-base' : 'text-sm';
            var visited = prog.visitedNodes && prog.visitedNodes.indexOf(n.id) !== -1;

            return '<button data-open="' + esc(n.id) + '" class="text-left atlas-card p-5 hover:-translate-y-0.5 transition flex flex-col justify-between gap-4">' +
                '<div>' +
                    '<div class="flex items-center justify-between gap-2">' +
                        '<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide" style="background:' + nth.tint + ';color:' + nth.line + '">' +
                            (n.icon ? '<i class="fa-solid ' + esc(n.icon) + '"></i>' : '') + esc(label) +
                        '</span>' +
                        (visited ? '<span class="text-[10px] text-emerald-400 font-bold"><i class="fa-solid fa-check mr-1"></i>O‘qilgan</span>' : '') +
                    '</div>' +
                    '<h3 class="font-bold mt-2.5 mb-1 ' + size + '">' + esc(n.title) + '</h3>' +
                    '<p class="text-xs leading-relaxed clamp-4" style="color:var(--text-secondary)">' + esc(n.desc || n.sub || '') + '</p>' +
                    (chips ? '<div class="flex flex-wrap gap-1.5 mt-3">' + chips + '</div>' : '') +
                '</div>' +
                '<span class="text-[11px] font-bold" style="color:' + nth.line + '">Batafsil o‘qish <i class="fa-solid fa-arrow-right ml-0.5"></i></span>' +
            '</button>';
        }).join('');

        Array.prototype.forEach.call(cardsEl.querySelectorAll('[data-open]'), function (card) {
            card.addEventListener('click', function () {
                openDrawer(activeTopic._byId[card.dataset.open]);
            });
        });
    }

    /* =========================================================
       6. KNOWLEDGE GALAXY — YAGONA BILIMLAR XARITASI
    ========================================================= */
    function renderGalaxy() {
        var container = $('galaxyViewport');
        if (!container) return;

        var data = window.PsychAtlasData;
        var topics = data.TOPICS;
        var links = data.GALAXY_LINKS;
        var categories = data.CATEGORIES;
        var esc = window.PsychAtlasUtils.escapeHtml;
        var state = window.PsychAtlasStorage.getState();

        var selectedLink = selectedGalaxyLink || links[2]; // default: Diqqat -> Idrok yoki Xotira

        container.innerHTML =
            '<div class="h-full flex flex-col lg:flex-row overflow-hidden">' +
                '<!-- Chap/Markaziy Galaxy Xarita Maydoni -->' +
                '<div class="flex-1 flex flex-col min-w-0 overflow-hidden canvas-bg relative">' +
                    '<!-- Kategoriya Filtrlari -->' +
                    '<div class="p-3 border-b border-white/10 atlas-glass flex items-center gap-1.5 overflow-x-auto z-20">' +
                        categories.map(function (cat) {
                            var isActive = activeGalaxyCategory === cat.id;
                            return '<button data-galaxy-cat="' + cat.id + '" class="px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 ' +
                                (isActive ? 'text-slate-950 shadow' : 'atlas-surface hover:border-white/30') + '" ' +
                                (isActive ? 'style="background:var(--gold-accent)"' : '') + '>' +
                                '<i class="fa-solid ' + cat.icon + '"></i>' +
                                '<span>' + esc(cat.label) + '</span>' +
                            '</button>';
                        }).join('') +
                    '</div>' +

                    '<!-- Galaxy Scrollable / Interactive Canvas -->' +
                    '<div class="flex-1 overflow-auto relative p-6">' +
                        '<div class="relative mx-auto" style="width:1520px;height:900px;">' +
                            '<svg class="absolute inset-0 w-full h-full" viewBox="0 0 1520 900">' +
                                links.map(function (lnk, idx) {
                                    var fromT = topics.find(function (t) { return t.id === lnk.from; });
                                    var toT = topics.find(function (t) { return t.id === lnk.to; });
                                    if (!fromT || !toT) return '';
                                    var x1 = fromT.galaxyPos.x + 110;
                                    var y1 = fromT.galaxyPos.y + 48;
                                    var x2 = toT.galaxyPos.x + 110;
                                    var y2 = toT.galaxyPos.y + 48;
                                    var mx = (x1 + x2) / 2;
                                    var my = (y1 + y2) / 2 - 22;
                                    var isSelected = selectedLink && selectedLink.from === lnk.from && selectedLink.to === lnk.to;
                                    var strokeColor = isSelected ? '#D6B56D' : '#8B7CFF';
                                    var strokeW = isSelected ? '3.5' : '2';
                                    var opacity = isSelected ? '1' : '0.48';

                                    return '<g class="cursor-pointer" data-galaxy-link="' + idx + '">' +
                                        '<path d="M ' + x1 + ' ' + y1 + ' Q ' + mx + ' ' + my + ' ' + x2 + ' ' + y2 + '" fill="none" stroke="' + strokeColor + '" stroke-width="' + strokeW + '" stroke-opacity="' + opacity + '" stroke-dasharray="' + (isSelected ? 'none' : '6 4') + '"/>' +
                                        '<circle cx="' + mx + '" cy="' + my + '" r="' + (isSelected ? 7 : 5) + '" fill="' + strokeColor + '"/>' +
                                    '</g>';
                                }).join('') +
                            '</svg>' +

                            topics.map(function (t) {
                                var th = data.THEMES[t.theme] || data.THEMES.indigo;
                                var matchesCat = activeGalaxyCategory === 'all' ||
                                    t.categoryId === activeGalaxyCategory ||
                                    (t.tags && t.tags.indexOf(activeGalaxyCategory) !== -1);
                                var prog = (state.topicProgress[t.id] && state.topicProgress[t.id].completion) || 0;

                                return '<div data-galaxy-topic="' + t.id + '" class="galaxy-node theme-' + t.theme + (matchesCat ? '' : ' is-filtered-out') + '" style="left:' + t.galaxyPos.x + 'px;top:' + t.galaxyPos.y + 'px;">' +
                                    '<div class="flex items-center justify-between gap-2 mb-1">' +
                                        '<span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase" style="background:' + th.tint + ';color:' + th.line + '">' +
                                            '<i class="fa-solid ' + t.icon + ' mr-1"></i>' + t.no + '-mavzu' +
                                        '</span>' +
                                        '<span class="text-[10px] font-bold" style="color:var(--gold-accent)">' + prog + '%</span>' +
                                    '</div>' +
                                    '<h4 class="font-extrabold text-sm leading-snug">' + esc(t.title) + '</h4>' +
                                    '<p class="text-[11px] line-clamp-2 mt-0.5" style="color:var(--text-secondary)">' + esc(t.short) + '</p>' +
                                '</div>';
                            }).join('') +
                        '</div>' +
                    '</div>' +
                '</div>' +

                '<!-- O‘ng Panel: Ilmiy Bog‘lanishlar Tahlili -->' +
                '<div class="w-full lg:w-96 shrink-0 border-t lg:border-t-0 lg:border-l border-white/10 atlas-bg-sec p-5 overflow-y-auto space-y-4">' +
                    '<div>' +
                        '<span class="text-[10px] font-extrabold uppercase tracking-widest text-purple-400"><i class="fa-solid fa-circle-nodes mr-1.5"></i>KNOWLEDGE GALAXY</span>' +
                        '<h3 class="serif text-lg font-bold mt-1">Ilmiy bog‘lanishlar xaritasi</h3>' +
                        '<p class="text-xs mt-1" style="color:var(--text-secondary)">Psixik jarayonlar va shaxs xususiyatlari alohida emas, balki yaxlit tizim sifatida ishlaydi. Aloqa chizig‘ini yoki quyidagi juftlikni bosing:</p>' +
                    '</div>' +

                    (selectedLink ? (function () {
                        var ft = topics.find(function (x) { return x.id === selectedLink.from; });
                        var tt = topics.find(function (x) { return x.id === selectedLink.to; });
                        return '<div class="p-4 rounded-2xl border border-amber-400/40 bg-amber-500/10 space-y-2.5">' +
                            '<div class="flex items-center gap-2 text-xs font-extrabold" style="color:var(--gold-accent)">' +
                                '<span>' + (ft ? esc(ft.title) : '') + '</span>' +
                                '<i class="fa-solid fa-arrow-right"></i>' +
                                '<span>' + (tt ? esc(tt.title) : '') + '</span>' +
                            '</div>' +
                            '<div class="text-sm font-bold">' + esc(selectedLink.label) + '</div>' +
                            '<p class="text-xs leading-relaxed" style="color:var(--text-main)">' + esc(selectedLink.scientificBasis) + '</p>' +
                            '<div class="flex flex-wrap gap-2 pt-2">' +
                                (ft ? '<button data-open-galaxy-topic="' + ft.id + '" class="px-2.5 py-1.5 rounded-lg text-[11px] font-bold atlas-surface hover:border-white/40">' + esc(ft.title) + ' xaritasi</button>' : '') +
                                (tt ? '<button data-open-galaxy-topic="' + tt.id + '" class="px-2.5 py-1.5 rounded-lg text-[11px] font-bold atlas-surface hover:border-white/40">' + esc(tt.title) + ' xaritasi</button>' : '') +
                            '</div>' +
                        '</div>';
                    })() : '') +

                    '<div class="space-y-2">' +
                        '<div class="text-[11px] font-bold uppercase tracking-wider" style="color:var(--text-secondary)">Barcha ilmiy aloqalar (' + links.length + ')</div>' +
                        links.map(function (lnk, idx) {
                            var ft = topics.find(function (x) { return x.id === lnk.from; });
                            var tt = topics.find(function (x) { return x.id === lnk.to; });
                            var isSel = selectedLink && selectedLink.from === lnk.from && selectedLink.to === lnk.to;
                            return '<button data-galaxy-link="' + idx + '" class="w-full text-left p-3 rounded-xl transition border ' +
                                (isSel ? 'bg-purple-500/15 border-purple-400/50' : 'atlas-surface hover:border-white/25') + '">' +
                                '<div class="text-xs font-bold flex items-center justify-between">' +
                                    '<span>' + (ft ? esc(ft.title) : '') + ' → ' + (tt ? esc(tt.title) : '') + '</span>' +
                                    '<i class="fa-solid fa-chevron-right text-[10px] opacity-60"></i>' +
                                '</div>' +
                                '<div class="text-[11px] mt-0.5" style="color:var(--gold-accent)">' + esc(lnk.label) + '</div>' +
                            '</button>';
                        }).join('') +
                    '</div>' +
                '</div>' +
            '</div>';

        // Galaxy kategoriya filtrlari
        container.querySelectorAll('[data-galaxy-cat]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                activeGalaxyCategory = btn.getAttribute('data-galaxy-cat');
                renderGalaxy();
            });
        });

        // Galaxy aloqa chizig'i yoki ro'yxat elementi
        container.querySelectorAll('[data-galaxy-link]').forEach(function (el) {
            el.addEventListener('click', function () {
                var idx = Number(el.getAttribute('data-galaxy-link'));
                selectedGalaxyLink = links[idx];
                renderGalaxy();
            });
        });

        // Galaxy tugunini bosganda o'sha mavzu xaritasini ochish
        container.querySelectorAll('[data-galaxy-topic], [data-open-galaxy-topic]').forEach(function (el) {
            el.addEventListener('click', function () {
                var tid = el.getAttribute('data-galaxy-topic') || el.getAttribute('data-open-galaxy-topic');
                if (tid) {
                    setView('map');
                    pickTopic(tid);
                }
            });
        });
    }

    /* =========================================================
       7. MAVZULAR KUTUBXONASI (SECTION 7)
    ========================================================= */
    function renderLibrary() {
        var container = $('libraryViewport');
        if (!container) return;

        var data = window.PsychAtlasData;
        var state = window.PsychAtlasStorage.getState();
        var esc = window.PsychAtlasUtils.escapeHtml;

        // Filtrlash
        var filtered = data.TOPICS.filter(function (t) {
            if (libFilter.onlyBookmarked && state.bookmarkedTopics.indexOf(t.id) === -1) return false;
            if (libFilter.group !== 'all' && String(t.group) !== String(libFilter.group)) return false;
            if (libFilter.category !== 'all' && t.categoryId !== libFilter.category && (!t.tags || t.tags.indexOf(libFilter.category) === -1)) return false;
            if (libFilter.query) {
                var hay = (t.title + ' ' + t.short + ' ' + t.summary + ' ' + t.root.desc).toLowerCase();
                if (hay.indexOf(libFilter.query.toLowerCase()) === -1) return false;
            }
            return true;
        });

        // Saralash
        filtered.sort(function (a, b) {
            if (libFilter.sort === 'title') return a.title.localeCompare(b.title);
            if (libFilter.sort === 'mastery') {
                var pa = (state.topicProgress[a.id] && state.topicProgress[a.id].completion) || 0;
                var pb = (state.topicProgress[b.id] && state.topicProgress[b.id].completion) || 0;
                return pb - pa;
            }
            if (libFilter.sort === 'difficulty') {
                var order = { 'Oson': 1, 'O‘rta': 2, 'Murakkab': 3 };
                return (order[a.difficulty] || 2) - (order[b.difficulty] || 2);
            }
            return a.no - b.no;
        });

        container.innerHTML =
            '<div class="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">' +
                '<!-- Sarlavha va qidiruv/filtr paneli -->' +
                '<div class="atlas-card p-6 space-y-4">' +
                    '<div class="flex flex-col md:flex-row md:items-center justify-between gap-4">' +
                        '<div>' +
                            '<span class="text-xs font-bold uppercase tracking-wider" style="color:var(--gold-accent)"><i class="fa-solid fa-layer-group mr-1.5"></i>MAVZULAR KUTUBXONASI</span>' +
                            '<h2 class="serif text-2xl sm:text-3xl font-bold mt-1">13 ta fundamental psixologik mavzu va 2 bo‘lim</h2>' +
                            '<p class="text-xs sm:text-sm mt-1" style="color:var(--text-secondary)">Har bir mavzu bo‘yicha tipologik xarita, konspekt, ilmiy manbalar, bog‘liq mavzular va o‘zlashtirish ko‘rsatkichi.</p>' +
                        '</div>' +
                        '<div class="flex items-center gap-2">' +
                            '<button id="libBookmarkToggle" class="px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ' +
                                (libFilter.onlyBookmarked ? 'bg-amber-500/20 border border-amber-400 text-amber-300' : 'atlas-surface') + '">' +
                                '<i class="fa-solid fa-bookmark"></i>' +
                                '<span>Xatcho‘plar (' + state.bookmarkedTopics.length + ')</span>' +
                            '</button>' +
                        '</div>' +
                    '</div>' +

                    '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">' +
                        '<div class="relative">' +
                            '<i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-xs opacity-60"></i>' +
                            '<input id="libSearchInput" type="text" value="' + esc(libFilter.query) + '" placeholder="Mavzu yoki tushunchani izlash..." class="w-full pl-8 pr-3 py-2 rounded-xl text-xs atlas-surface">' +
                        '</div>' +
                        '<select id="libGroupSelect" class="px-3 py-2 rounded-xl text-xs atlas-surface">' +
                            '<option value="all"' + (libFilter.group === 'all' ? ' selected' : '') + '>Barcha bo‘limlar (2 ta asosiy bo‘lim)</option>' +
                            '<option value="0"' + (libFilter.group === '0' ? ' selected' : '') + '>1-bo‘lim: Umumiy psixologiya (10 mavzu)</option>' +
                            '<option value="1"' + (libFilter.group === '1' ? ' selected' : '') + '>2-bo‘lim: Temperament / mijoz (3 mavzu)</option>' +
                        '</select>' +
                        '<select id="libCatSelect" class="px-3 py-2 rounded-xl text-xs atlas-surface">' +
                            data.CATEGORIES.map(function (c) {
                                return '<option value="' + c.id + '"' + (libFilter.category === c.id ? ' selected' : '') + '>Yo‘nalish: ' + esc(c.label) + '</option>';
                            }).join('') +
                        '</select>' +
                        '<select id="libSortSelect" class="px-3 py-2 rounded-xl text-xs atlas-surface">' +
                            '<option value="no"' + (libFilter.sort === 'no' ? ' selected' : '') + '>Saralash: Tartib raqami (1 → 13)</option>' +
                            '<option value="mastery"' + (libFilter.sort === 'mastery' ? ' selected' : '') + '>Saralash: O‘zlashtirish foizi</option>' +
                            '<option value="difficulty"' + (libFilter.sort === 'difficulty' ? ' selected' : '') + '>Saralash: Murakkablik darajasi</option>' +
                            '<option value="title"' + (libFilter.sort === 'title' ? ' selected' : '') + '>Saralash: Alifbo bo‘yicha</option>' +
                        '</select>' +
                    '</div>' +
                '</div>' +

                '<!-- Mavzular Kartochkalari -->' +
                (filtered.length > 0 ? (
                    '<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">' +
                        filtered.map(function (t) {
                            var th = data.THEMES[t.theme] || data.THEMES.indigo;
                            var prog = state.topicProgress[t.id] || { completion: 0, status: 'not_started' };
                            var isBookmarked = state.bookmarkedTopics.indexOf(t.id) !== -1;
                            var statusBadge = prog.completion >= 100
                                ? '<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300"><i class="fa-solid fa-check-double mr-1"></i>O‘zlashtirilgan (100%)</span>'
                                : (prog.completion > 0
                                    ? '<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/20 text-sky-300">Jarayonda (' + prog.completion + '%)</span>'
                                    : '<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold atlas-surface opacity-75">Boshlanmagan (0%)</span>');

                            return '<div class="atlas-card p-6 flex flex-col justify-between gap-4">' +
                                '<div class="space-y-3">' +
                                    '<div class="flex items-center justify-between gap-2">' +
                                        '<span class="px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase" style="background:' + th.tint + ';color:' + th.line + '">' +
                                            '<i class="fa-solid ' + t.icon + ' mr-1"></i>' + t.no + '-mavzu · ' + (t.group === 0 ? 'Umumiy psixologiya' : 'Temperament') +
                                        '</span>' +
                                        '<button data-lib-bookmark="' + t.id + '" class="w-8 h-8 rounded-lg atlas-surface flex items-center justify-center hover:border-amber-400 transition" title="Xatcho‘p">' +
                                            '<i class="' + (isBookmarked ? 'fa-solid text-amber-400' : 'fa-regular') + ' fa-bookmark text-xs"></i>' +
                                        '</button>' +
                                    '</div>' +

                                    '<div>' +
                                        '<h3 class="serif text-xl font-bold">' + esc(t.title) + '</h3>' +
                                        '<p class="text-xs mt-1 leading-relaxed" style="color:var(--text-secondary)">' + esc(t.summary) + '</p>' +
                                    '</div>' +

                                    '<div class="flex flex-wrap items-center gap-2 text-[11px]">' +
                                        statusBadge +
                                        '<span class="px-2.5 py-0.5 rounded-full atlas-surface">Murakkablik: <b>' + esc(t.difficulty) + '</b></span>' +
                                        (t.duration ? '<span class="px-2.5 py-0.5 rounded-full atlas-surface"><i class="fa-regular fa-clock mr-1"></i>' + esc(t.duration) + '</span>' : '') +
                                        '<span class="px-2.5 py-0.5 rounded-full atlas-surface">' + t._all.length + ' ta tugun</span>' +
                                    '</div>' +

                                    '<!-- Ilmiy manbalar -->' +
                                    '<div class="p-3 rounded-xl atlas-surface text-[11px] space-y-1">' +
                                        '<div class="font-bold uppercase tracking-wider text-[10px]" style="color:var(--gold-accent)"><i class="fa-solid fa-book-bookmark mr-1"></i>Ilmiy manbalar:</div>' +
                                        (t.references || []).map(function (r) {
                                            return '<div class="truncate" style="color:var(--text-secondary)">• ' + esc(r.author) + '. <em>' + esc(r.title) + '</em> (' + r.publicationYear + ')</div>';
                                        }).join('') +
                                    '</div>' +

                                    (t.auditFlags && t.auditFlags.length ? (
                                        '<div class="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-[11px] text-amber-200">' +
                                            '<i class="fa-solid fa-magnifying-glass-chart mr-1 text-amber-400"></i><b>Ilmiy audit qaydi:</b> ' + esc(t.auditFlags[0].title) +
                                        '</div>'
                                    ) : '') +

                                    '<!-- Bog‘liq mavzular -->' +
                                    (t.related && t.related.length ? (
                                        '<div class="flex flex-wrap items-center gap-1.5 pt-1">' +
                                            '<span class="text-[10px] font-bold uppercase mr-1" style="color:var(--text-secondary)">Bog‘liq:</span>' +
                                            t.related.map(function (rel) {
                                                return '<button data-lib-open-map="' + esc(rel.to) + '" class="px-2 py-0.5 rounded-md text-[10.5px] font-semibold atlas-surface hover:border-amber-400/50 transition">' + esc(rel.label) + '</button>';
                                            }).join('') +
                                        '</div>'
                                    ) : '') +
                                '</div>' +

                                '<div class="grid grid-cols-2 gap-2 pt-3 border-t border-white/10">' +
                                    '<button data-lib-open-map="' + t.id + '" class="px-3 py-2.5 rounded-xl font-bold text-xs text-slate-950 flex items-center justify-center gap-1.5 transition" style="background:var(--gold-accent)">' +
                                        '<i class="fa-solid fa-diagram-project"></i><span>Xaritada ochish</span>' +
                                    '</button>' +
                                    '<button data-lib-open-study="' + t.id + '" class="px-3 py-2.5 rounded-xl font-bold text-xs atlas-surface hover:border-white/30 flex items-center justify-center gap-1.5 transition">' +
                                        '<i class="fa-solid fa-table-cells-large"></i><span>Konspekt</span>' +
                                    '</button>' +
                                '</div>' +
                            '</div>';
                        }).join('') +
                    '</div>'
                ) : (
                    '<div class="atlas-card p-12 text-center">' +
                        '<i class="fa-solid fa-magnifying-glass text-3xl opacity-40 mb-3"></i>' +
                        '<h3 class="font-bold text-base">So‘rovingiz bo‘yicha mavzu topilmadi</h3>' +
                        '<p class="text-xs mt-1" style="color:var(--text-secondary)">Filtr yoki qidiruv so‘zini o‘zgartirib ko‘ring.</p>' +
                    '</div>'
                )) +
            '</div>';

        // Kutubxona hodisalari
        var searchInp = container.querySelector('#libSearchInput');
        if (searchInp) {
            searchInp.addEventListener('input', function () {
                libFilter.query = searchInp.value;
                renderLibrary();
                var newInp = container.querySelector('#libSearchInput');
                if (newInp) {
                    newInp.focus();
                    newInp.setSelectionRange(newInp.value.length, newInp.value.length);
                }
            });
        }
        var grpSel = container.querySelector('#libGroupSelect');
        if (grpSel) {
            grpSel.addEventListener('change', function () {
                libFilter.group = grpSel.value;
                renderLibrary();
            });
        }
        var catSel = container.querySelector('#libCatSelect');
        if (catSel) {
            catSel.addEventListener('change', function () {
                libFilter.category = catSel.value;
                renderLibrary();
            });
        }
        var sortSel = container.querySelector('#libSortSelect');
        if (sortSel) {
            sortSel.addEventListener('change', function () {
                libFilter.sort = sortSel.value;
                renderLibrary();
            });
        }
        var bmToggle = container.querySelector('#libBookmarkToggle');
        if (bmToggle) {
            bmToggle.addEventListener('click', function () {
                libFilter.onlyBookmarked = !libFilter.onlyBookmarked;
                renderLibrary();
            });
        }

        container.querySelectorAll('[data-lib-bookmark]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                window.PsychAtlasStorage.toggleBookmarkTopic(btn.getAttribute('data-lib-bookmark'));
                renderLibrary();
            });
        });

        container.querySelectorAll('[data-lib-open-map]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var tid = btn.getAttribute('data-lib-open-map');
                if (window.PsychAtlasApp) {
                    window.PsychAtlasApp.openTopicInAtlas(tid, 'map');
                }
            });
        });

        container.querySelectorAll('[data-lib-open-study]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var tid = btn.getAttribute('data-lib-open-study');
                if (window.PsychAtlasApp) {
                    window.PsychAtlasApp.openTopicInAtlas(tid, 'grid');
                }
            });
        });
    }

    /* =========================================================
       8. BATAFSIL PANEL (DRAWER) — ASL + PROGRESS + ILMIY MANBA + DAFTARGA SAQLASH
    ========================================================= */
    function openDrawer(node) {
        if (!node) return;
        currentDrawerNode = node;
        var THEMES = window.PsychAtlasData.THEMES;
        var th = THEMES[node.theme] || THEMES.indigo;
        var esc = window.PsychAtlasUtils.escapeHtml;
        var label = node.cat || (node.kind === 'root' ? 'Mavzu asosi' : node.kind === 'branch' ? 'Tipologik shox' : 'Tarkibiy qism');

        // Real progressni qayd etish
        window.PsychAtlasStorage.recordNodeVisit(activeTopic.id, node.id, node.title);
        renderNav();

        $('drawerHeader').style.background = 'linear-gradient(135deg, ' + th.line + ' 0%, ' + th.deep + ' 100%)';
        $('drawerBadge').textContent = label;
        $('drawerTitle').textContent = node.title;
        $('drawerSub').textContent = node.sub || '';
        $('drawerDesc').textContent = node.desc || '';

        $('drawerItemsWrap').classList.toggle('hidden', !(node.items && node.items.length));
        $('drawerItems').innerHTML = (node.items || []).map(function (item) {
            return '<div class="p-3 rounded-xl atlas-surface">' +
                '<div class="flex items-start gap-2 text-sm font-bold">' +
                    '<span class="mt-1.5 w-2 h-2 rounded-full shrink-0" style="background:' + th.line + '"></span>' + esc(item[0]) +
                '</div>' +
                '<p class="text-xs mt-1 pl-4 leading-relaxed" style="color:var(--text-secondary)">' + esc(item[1]) + '</p>' +
            '</div>';
        }).join('');

        $('drawerExampleWrap').classList.toggle('hidden', !node.example);
        $('drawerExample').textContent = node.example || '';
        $('drawerExtraWrap').classList.toggle('hidden', !node.extra);
        $('drawerExtra').textContent = node.extra || '';

        // Ilmiy audit eslatmasi (5-qat'iy qoida asosida)
        var auditWrap = $('drawerAuditWrap');
        if (auditWrap) {
            var flags = node.auditFlags || [];
            auditWrap.classList.toggle('hidden', !flags.length);
            if (flags.length) {
                $('drawerAuditText').innerHTML = flags.map(function (f) {
                    return '<div class="mb-1.5 last:mb-0"><b>' + esc(f.title) + ':</b> ' + esc(f.note) + '</div>';
                }).join('');
            }
        }

        // Ilmiy manbalar
        var refWrap = $('drawerRefsWrap');
        if (refWrap) {
            var refs = activeTopic.references || [];
            refWrap.classList.toggle('hidden', !refs.length);
            $('drawerRefs').innerHTML = refs.map(function (r) {
                return '<div>• <b>' + esc(r.author) + '</b> (' + r.publicationYear + '). <em>' + esc(r.title) + '</em>. ' + esc(r.publisher) + ', ' + esc(r.page) + '-b.</div>';
            }).join('');
        }

        var rel = activeTopic.related || [];
        $('drawerRelatedWrap').classList.toggle('hidden', !rel.length);
        $('drawerRelated').innerHTML = rel.map(function (r) {
            return '<button class="rel-chip" data-to="' + esc(r.to) + '"><i class="fa-solid fa-diagram-project"></i>' + esc(r.label) + '</button>';
        }).join('');
        Array.prototype.forEach.call($('drawerRelated').querySelectorAll('[data-to]'), function (chip) {
            chip.addEventListener('click', function () {
                var to = chip.dataset.to;
                closeDrawer();
                pickTopic(to);
            });
        });

        $('drawer').classList.remove('hidden');
        $('drawerPanel').scrollTop = 0;
    }

    function closeDrawer() {
        var dr = $('drawer');
        if (dr) dr.classList.add('hidden');
    }

    /* =========================================================
       9. CHAP NAVIGATSIYA, LEGEND VA KO'RINISH BOSHQARUVI
    ========================================================= */
    function renderNav() {
        var nav = $('topicNav');
        if (!nav) return;
        var GROUPS = window.PsychAtlasData.GROUPS;
        var TOPICS = window.PsychAtlasData.TOPICS;
        var state = window.PsychAtlasStorage.getState();
        var tCurr = getActiveTopic();

        nav.innerHTML = GROUPS.map(function (g) {
            var items = TOPICS.filter(function (t) { return t.group === g.id; }).map(function (t) {
                var prog = state.topicProgress[t.id] || { completion: 0 };
                var isComplete = prog.completion >= 100;
                return '<button class="nav__item' + (t.id === tCurr.id ? ' is-active' : '') + '" data-topic="' + t.id + '">' +
                    '<span class="nav__no">' + (isComplete ? '<i class="fa-solid fa-check text-emerald-400"></i>' : (t.no < 10 ? '0' + t.no : t.no)) + '</span>' +
                    '<span class="min-w-0 flex-1">' +
                        '<span class="flex items-center justify-between gap-1">' +
                            '<span class="nav__title truncate">' + t.title + '</span>' +
                            (prog.completion > 0 ? '<span class="text-[10px] font-bold" style="color:var(--gold-accent)">' + prog.completion + '%</span>' : '') +
                        '</span>' +
                        '<span class="nav__short">' + t.short + '</span>' +
                    '</span>' +
                '</button>';
            }).join('');
            return '<div><p class="nav__group">' + g.label + '</p><div class="space-y-1">' + items + '</div></div>';
        }).join('');

        Array.prototype.forEach.call(nav.querySelectorAll('[data-topic]'), function (btn) {
            btn.addEventListener('click', function () {
                if (window.PsychAtlasApp && window.PsychAtlasApp.getActiveModule() !== 'atlas') {
                    window.PsychAtlasApp.navigateTo('atlas');
                }
                pickTopic(btn.dataset.topic);
                if (window.PsychAtlasApp) window.PsychAtlasApp.closeSidebar();
            });
        });
    }

    function renderLegend() {
        var legendEl = $('legend');
        if (!legendEl || !activeTopic) return;
        var THEMES = window.PsychAtlasData.THEMES;
        var seen = [];
        activeTopic._branches.forEach(function (b) {
            if (!seen.some(function (s) { return s.theme === b.node.theme; })) {
                seen.push({ theme: b.node.theme, label: b.node.title });
            }
        });
        var html = '<span class="font-bold">Tipologik shoxlar:</span>';
        seen.forEach(function (s) {
            var label = s.label.length > 26 ? s.label.slice(0, 24) + '…' : s.label;
            html += '<div class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full" style="background:' + THEMES[s.theme].line + '"></span>' + label + '</div>';
        });
        legendEl.innerHTML = html;
    }

    function setView(v) {
        activeView = v;
        if ($('btnMapView')) $('btnMapView').classList.toggle('is-active', v === 'map');
        if ($('btnGridView')) $('btnGridView').classList.toggle('is-active', v === 'grid');
        if ($('btnGalaxyView')) $('btnGalaxyView').classList.toggle('is-active', v === 'galaxy');

        if ($('mapViewport')) $('mapViewport').classList.toggle('hidden', v !== 'map');
        if ($('gridViewport')) $('gridViewport').classList.toggle('hidden', v !== 'grid');
        if ($('galaxyViewport')) $('galaxyViewport').classList.toggle('hidden', v !== 'galaxy');

        if (v === 'map') {
            renderMap(false);
        } else if (v === 'grid') {
            renderGrid();
            applyGridFilter();
        } else if (v === 'galaxy') {
            renderGalaxy();
        }
    }

    function pickTopic(id) {
        var TOPICS = window.PsychAtlasData.TOPICS;
        var t = TOPICS.filter(function (x) { return x.id === id; })[0] || TOPICS[0];
        activeTopic = t;
        if ($('searchInput')) $('searchInput').value = '';
        if ($('clearSearchBtn')) $('clearSearchBtn').classList.add('hidden');
        if ($('headerTopic')) $('headerTopic').textContent = t.no + '-mavzu · ' + t.title;
        if (location.hash.slice(1) !== t.id) {
            history.replaceState(null, '', '#' + t.id);
        }
        renderNav();
        renderLegend();
        if (activeView === 'map') renderMap(false);
        else if (activeView === 'grid') { renderGrid(); applyGridFilter(); }
        else if (activeView === 'galaxy') renderGalaxy();
    }

    function navigateAdjacentTopic(dir) {
        var TOPICS = window.PsychAtlasData.TOPICS;
        var curr = getActiveTopic();
        var idx = TOPICS.findIndex(function (t) { return t.id === curr.id; });
        var nextIdx = (idx + dir + TOPICS.length) % TOPICS.length;
        pickTopic(TOPICS[nextIdx].id);
    }

    /* =========================================================
       10. HODISALARNI BOG'LASH (INIT)
    ========================================================= */
    function initAtlasEvents() {
        var hash = location.hash.replace('#', '');
        var TOPICS = window.PsychAtlasData.TOPICS;
        activeTopic = TOPICS.filter(function (t) { return t.id === hash; })[0] || TOPICS[0];
        if ($('headerTopic')) $('headerTopic').textContent = activeTopic.no + '-mavzu · ' + activeTopic.title;

        if ($('btnMapView')) $('btnMapView').addEventListener('click', function () { setView('map'); });
        if ($('btnGridView')) $('btnGridView').addEventListener('click', function () { setView('grid'); });
        if ($('btnGalaxyView')) $('btnGalaxyView').addEventListener('click', function () { setView('galaxy'); });

        if ($('zoomInBtn')) $('zoomInBtn').addEventListener('click', function () { zoomBy(0.12); });
        if ($('zoomOutBtn')) $('zoomOutBtn').addEventListener('click', function () { zoomBy(-0.12); });
        if ($('fitBtn')) $('fitBtn').addEventListener('click', fitView);
        if ($('toggleBranchesBtn')) $('toggleBranchesBtn').addEventListener('click', toggleAllBranches);
        if ($('prevTopicBtn')) $('prevTopicBtn').addEventListener('click', function () { navigateAdjacentTopic(-1); });
        if ($('nextTopicBtn')) $('nextTopicBtn').addEventListener('click', function () { navigateAdjacentTopic(1); });

        // Eksport tugmalari (PNG, SVG, PDF/Print)
        if ($('btnExportPNG')) {
            $('btnExportPNG').addEventListener('click', function () {
                window.PsychAtlasUtils.exportTopicAsPNG(getActiveTopic(), function (ok) {
                    if (window.PsychAtlasApp) {
                        window.PsychAtlasApp.showToast(ok ? 'Xarita PNG rasm sifatida yuklab olindi!' : 'PNG eksportda xatolik', ok ? 'success' : 'error');
                    }
                });
            });
        }
        if ($('btnExportSVG')) {
            $('btnExportSVG').addEventListener('click', function () {
                window.PsychAtlasUtils.exportTopicAsSVG(getActiveTopic());
                if (window.PsychAtlasApp) {
                    window.PsychAtlasApp.showToast('Xarita SVG vektor formatida yuklab olindi!', 'success');
                }
            });
        }
        if ($('btnPrint')) {
            $('btnPrint').addEventListener('click', function () {
                var t = getActiveTopic();
                var bodyHtml = t._all.map(function (n) {
                    var itemsHtml = (n.items || []).map(function (it) {
                        return '<li><b>' + window.PsychAtlasUtils.escapeHtml(it[0]) + ':</b> ' + window.PsychAtlasUtils.escapeHtml(it[1]) + '</li>';
                    }).join('');
                    return '<div class="card">' +
                        '<span class="badge">' + window.PsychAtlasUtils.escapeHtml(n.cat || n.kind) + '</span>' +
                        '<h3>' + window.PsychAtlasUtils.escapeHtml(n.title) + '</h3>' +
                        '<p>' + window.PsychAtlasUtils.escapeHtml(n.desc || n.sub || '') + '</p>' +
                        (itemsHtml ? '<ul>' + itemsHtml + '</ul>' : '') +
                        (n.example ? '<p><em>Hayotiy misol: ' + window.PsychAtlasUtils.escapeHtml(n.example) + '</em></p>' : '') +
                    '</div>';
                }).join('');
                window.PsychAtlasUtils.printCleanDocument(
                    t.no + '-mavzu: ' + t.title,
                    t.summary,
                    bodyHtml
                );
            });
        }

        // Drawer ichidagi "Daftarga saqlash" va "AI Ustozdan so'rash" tugmalari
        if ($('btnSaveNodeToNotes')) {
            $('btnSaveNodeToNotes').addEventListener('click', function () {
                if (!currentDrawerNode || !activeTopic) return;
                window.PsychAtlasStorage.saveNote({
                    title: activeTopic.title + ' — ' + currentDrawerNode.title,
                    topicId: activeTopic.id,
                    content: currentDrawerNode.desc || currentDrawerNode.sub || '',
                    quote: currentDrawerNode.example || '',
                    isFavorite: true
                });
                if (window.PsychAtlasApp) {
                    window.PsychAtlasApp.showToast('«' + currentDrawerNode.title + '» Shaxsiy daftarga saqlandi (+15 XP)!', 'success');
                }
            });
        }
        if ($('btnAskAiAboutNode')) {
            $('btnAskAiAboutNode').addEventListener('click', function () {
                if (!currentDrawerNode || !activeTopic) return;
                var qText = currentDrawerNode.title + ' nima va uning psixologik mexanizmi qanday?';
                closeDrawer();
                if (window.PsychAtlasApp) {
                    window.PsychAtlasApp.navigateTo('ai-tutor');
                    if (window.PsychAtlasAiTutor) {
                        window.PsychAtlasAiTutor.askPreset(activeTopic.id, qText);
                    }
                }
            });
        }

        Array.prototype.forEach.call(document.querySelectorAll('[data-close-drawer]'), function (el) {
            el.addEventListener('click', closeDrawer);
        });

        // Qidiruv
        var searchInp = $('searchInput');
        if (searchInp) {
            searchInp.addEventListener('input', function () {
                var q = searchInp.value.trim();
                if ($('clearSearchBtn')) $('clearSearchBtn').classList.toggle('hidden', !q);
                applySearch();
                if (activeView === 'grid') applyGridFilter();
            });
        }
        if ($('clearSearchBtn')) {
            $('clearSearchBtn').addEventListener('click', function () {
                if ($('searchInput')) $('searchInput').value = '';
                $('clearSearchBtn').classList.add('hidden');
                applySearch();
                if (activeView === 'grid') applyGridFilter();
            });
        }

        // Surish (Pan) va G'ildirak bilan Zoom
        var drag = null;
        var vp = $('mapViewport');
        if (vp) {
            vp.addEventListener('pointerdown', function (e) {
                if (e.target.closest('.node') || e.target.closest('button')) return;
                if (e.pointerType === 'mouse' && e.button !== 0) return;
                drag = { sx: e.clientX, sy: e.clientY, ox: view.x, oy: view.y };
                vp.classList.add('is-panning');
                if (vp.setPointerCapture) vp.setPointerCapture(e.pointerId);
            });
            vp.addEventListener('pointermove', function (e) {
                if (!drag) return;
                view.x = drag.ox + (e.clientX - drag.sx);
                view.y = drag.oy + (e.clientY - drag.sy);
                applyTransform();
            });
            ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (ev) {
                vp.addEventListener(ev, function () { drag = null; vp.classList.remove('is-panning'); });
            });
            vp.addEventListener('wheel', function (e) {
                e.preventDefault();
                zoomBy(e.deltaY < 0 ? 0.09 : -0.09);
            }, { passive: false });
        }

        var resizeTimer = null;
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                if (activeView === 'map' && window.PsychAtlasApp && window.PsychAtlasApp.getActiveModule() === 'atlas') {
                    fitView();
                }
            }, 140);
        });

        renderNav();
        renderLegend();
        renderMap(false);
        renderGrid();
    }

    window.PsychAtlasModule = {
        init: initAtlasEvents,
        renderMap: renderMap,
        renderGrid: renderGrid,
        renderGalaxy: renderGalaxy,
        renderLibrary: renderLibrary,
        renderNav: renderNav,
        setView: setView,
        pickTopic: pickTopic,
        openDrawer: openDrawer,
        closeDrawer: closeDrawer,
        fitView: fitView,
        getActiveTopic: getActiveTopic
    };
})(window);
