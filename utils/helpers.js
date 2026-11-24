/**
 * PSYCHOLOGY ATLAS — XAVFSIZLIK, EKSPORT VA YORDAMCHI FUNKSIYALAR
 */
(function (window) {
    'use strict';

    /**
     * XSS himoyasi: Foydalanuvchi kiritgan har qanday matnni HTML ga xavfsiz chiqarish
     */
    function escapeHtml(str) {
        if (str === null || str === undefined) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    /**
     * Noyob identifikator yaratish
     */
    function uid(prefix) {
        return (prefix || 'id') + '-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7);
    }

    /**
     * Sanani o'zbek tilida chiroyli ko'rsatish
     */
    function formatDateUz(dateInput) {
        if (!dateInput) return 'Hali belgilanmagan';
        const d = new Date(dateInput);
        if (isNaN(d.getTime())) return 'Hali belgilanmagan';
        const months = [
            'yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun',
            'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr'
        ];
        const hours = String(d.getHours()).padStart(2, '0');
        const mins = String(d.getMinutes()).padStart(2, '0');
        return d.getDate() + '-' + months[d.getMonth()] + ', ' + d.getFullYear() + ' · ' + hours + ':' + mins;
    }

    /**
     * Qisqa sana (kun va oy)
     */
    function formatShortDateUz(dateInput) {
        if (!dateInput) return 'Bugun';
        const d = new Date(dateInput);
        if (isNaN(d.getTime())) return 'Bugun';
        const months = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyn', 'Iyl', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'];
        return d.getDate() + '-' + months[d.getMonth()];
    }

    /**
     * Soniyani o'qish vaqti formatiga o'tkazish
     */
    function formatDurationUz(totalSeconds) {
        const sec = Math.max(0, Math.floor(totalSeconds || 0));
        if (sec === 0) return '0 daqiqa';
        if (sec < 60) return sec + ' soniya';
        const mins = Math.floor(sec / 60);
        if (mins < 60) return mins + ' daqiqa';
        const hrs = Math.floor(mins / 60);
        const remMins = mins % 60;
        return hrs + ' soat' + (remMins > 0 ? ' ' + remMins + ' daq' : '');
    }

    /**
     * Xaritani mustaqil SVG vektor grafikasi sifatida qurish (SVG va PNG eksport uchun)
     */
    function buildStandaloneMapSVG(topic) {
        const THEMES = window.PsychAtlasData.THEMES;
        const w = (topic && topic._w) ? topic._w : 1400;
        const h = (topic && topic._h) ? topic._h : 900;
        const isLight = document.documentElement.classList.contains('light-mode');
        const bg = isLight ? '#fcfbf9' : '#0B1020';
        const cardBg = isLight ? '#ffffff' : '#17233A';
        const textMain = isLight ? '#0f172a' : '#F1F5F9';
        const textSub = isLight ? '#64748b' : '#94A3B8';

        let svgParts = [];
        svgParts.push('<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '">');
        svgParts.push('<rect width="100%" height="100%" fill="' + bg + '"/>');

        // Connectors
        function addCurve(p, c, strokeW) {
            if (!p || !c || !p._el || !c._el || c._hidden) return;
            const ph = p._el.offsetHeight || 120;
            const ch = c._el.offsetHeight || 120;
            const x1 = p._x + p._w;
            const y1 = p._y + ph / 2;
            const x2 = c._x;
            const y2 = c._y + ch / 2;
            const mx = (x1 + x2) / 2;
            const color = (THEMES[c.theme] || THEMES.indigo).line;
            svgParts.push(
                '<path d="M ' + x1 + ' ' + y1 + ' C ' + mx + ' ' + y1 + ', ' + mx + ' ' + y2 + ', ' + x2 + ' ' + y2 + '" ' +
                'fill="none" stroke="' + color + '" stroke-width="' + strokeW + '" stroke-opacity="0.75"/>'
            );
        }

        if (topic && topic._branches) {
            topic._branches.forEach(function (b) {
                addCurve(topic._root, b.node, 3);
                if (!b._collapsed) {
                    b.children.forEach(function (k) { addCurve(b.node, k, 2.2); });
                }
            });
        }

        // Nodes
        if (topic && topic._all) {
            topic._all.forEach(function (n) {
                if (!n._el || n._hidden) return;
                const nh = n._el.offsetHeight || 130;
                const nw = n._w || 280;
                const nx = n._x || 0;
                const ny = n._y || 0;
                const th = THEMES[n.theme] || THEMES.indigo;
                const fill = n.kind === 'root' ? th.deep : cardBg;
                const titleColor = n.kind === 'root' ? '#ffffff' : textMain;
                const subColor = n.kind === 'root' ? '#cbd5e1' : textSub;
                const catText = escapeHtml((n.cat || n.kind || '').toUpperCase());
                const titleText = escapeHtml(n.title || '');
                const subText = escapeHtml((n.sub || '').slice(0, 75));

                svgParts.push('<g transform="translate(' + nx + ',' + ny + ')">');
                svgParts.push(
                    '<rect width="' + nw + '" height="' + nh + '" rx="18" fill="' + fill + '" stroke="' + th.line + '" stroke-width="2"/>'
                );
                svgParts.push(
                    '<text x="16" y="26" fill="' + th.line + '" font-family="Inter, sans-serif" font-size="10" font-weight="700">' + catText + '</text>'
                );
                svgParts.push(
                    '<text x="16" y="52" fill="' + titleColor + '" font-family="Inter, sans-serif" font-size="15" font-weight="800">' + titleText + '</text>'
                );
                svgParts.push(
                    '<text x="16" y="76" fill="' + subColor + '" font-family="Inter, sans-serif" font-size="11.5">' + subText + '</text>'
                );
                svgParts.push('</g>');
            });
        }

        svgParts.push('</svg>');
        return svgParts.join('');
    }

    /**
     * SVG formatda yuklab olish
     */
    function exportTopicAsSVG(topic) {
        if (!topic) return;
        const svgContent = buildStandaloneMapSVG(topic);
        const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'psychology-atlas-' + topic.id + '.svg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    }

    /**
     * PNG rasm formatida yuklab olish
     */
    function exportTopicAsPNG(topic, callback) {
        if (!topic) return;
        const svgContent = buildStandaloneMapSVG(topic);
        const w = topic._w || 1400;
        const h = topic._h || 900;
        const img = new Image();
        const svgBlob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);

        img.onload = function () {
            const canvas = document.createElement('canvas');
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, w, h);
            URL.revokeObjectURL(url);
            canvas.toBlob(function (pngBlob) {
                if (!pngBlob) return;
                const pngUrl = URL.createObjectURL(pngBlob);
                const a = document.createElement('a');
                a.href = pngUrl;
                a.download = 'psychology-atlas-' + topic.id + '.png';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                setTimeout(function () { URL.revokeObjectURL(pngUrl); }, 1000);
                if (typeof callback === 'function') callback(true);
            }, 'image/png');
        };
        img.onerror = function () {
            URL.revokeObjectURL(url);
            if (typeof callback === 'function') callback(false);
        };
        img.src = url;
    }

    /**
     * Maxsus chop etish / PDF oynasini chiqarish (Konspekt, qaydlar yoki mavzu uchun)
     */
    function printCleanDocument(docTitle, subtitle, bodyHtml) {
        let printFrame = document.getElementById('psychAtlasPrintFrame');
        if (!printFrame) {
            printFrame = document.createElement('iframe');
            printFrame.id = 'psychAtlasPrintFrame';
            printFrame.style.position = 'fixed';
            printFrame.style.right = '0';
            printFrame.style.bottom = '0';
            printFrame.style.width = '0';
            printFrame.style.height = '0';
            printFrame.style.border = '0';
            document.body.appendChild(printFrame);
        }

        const doc = printFrame.contentWindow.document;
        doc.open();
        doc.write(
            '<!DOCTYPE html><html lang="uz"><head><meta charset="UTF-8"><title>' + escapeHtml(docTitle) + '</title>' +
            '<style>' +
            'body{font-family:Inter,Arial,sans-serif;color:#0f172a;padding:32px;line-height:1.6;}' +
            'h1{font-size:24px;margin:0 0 6px;color:#1e1b4b;}' +
            '.sub{font-size:13px;color:#475569;margin-bottom:24px;padding-bottom:12px;border-bottom:2px solid #e2e8f0;}' +
            '.card{border:1px solid #cbd5e1;border-radius:12px;padding:16px;margin-bottom:14px;page-break-inside:avoid;}' +
            '.badge{font-size:10px;font-weight:700;text-transform:uppercase;color:#4338ca;background:#eef2ff;padding:3px 8px;border-radius:6px;display:inline-block;margin-bottom:6px;}' +
            'h3{margin:4px 0 8px;font-size:16px;}' +
            'p{margin:4px 0;font-size:13.5px;}' +
            '.footer{margin-top:28px;font-size:11px;color:#64748b;border-top:1px solid #e2e8f0;padding-top:10px;}' +
            '</style></head><body>' +
            '<h1>' + escapeHtml(docTitle) + '</h1>' +
            '<div class="sub">' + escapeHtml(subtitle) + ' · PSYCHOLOGY ATLAS (' + formatDateUz(new Date()) + ')</div>' +
            bodyHtml +
            '<div class="footer">PSYCHOLOGY ATLAS — "Psixologiyani yodlamang — uni anglang, bog‘lang va kashf eting."</div>' +
            '</body></html>'
        );
        doc.close();
        setTimeout(function () {
            printFrame.contentWindow.focus();
            printFrame.contentWindow.print();
        }, 250);
    }

    window.PsychAtlasUtils = {
        escapeHtml: escapeHtml,
        uid: uid,
        formatDateUz: formatDateUz,
        formatShortDateUz: formatShortDateUz,
        formatDurationUz: formatDurationUz,
        exportTopicAsSVG: exportTopicAsSVG,
        exportTopicAsPNG: exportTopicAsPNG,
        printCleanDocument: printCleanDocument
    };
})(window);
