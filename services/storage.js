/**
 * PSYCHOLOGY ATLAS — SAQLASH, PROGRESS VA OFFLINE STATE XIZMATI
 *
 * Barcha statistik ko'rsatkichlar faqat real foydalanuvchi faoliyatidan hisoblanadi.
 * Boshlang'ich holatda barcha qiymatlar 0 yoki tegishli bo'sh holatda bo'ladi.
 */
(function (window) {
    'use strict';

    const STORAGE_KEY = 'psychology_atlas_state_v1';

    function getTodayDateString() {
        const d = new Date();
        return d.getFullYear() + '-' +
            String(d.getMonth() + 1).padStart(2, '0') + '-' +
            String(d.getDate()).padStart(2, '0');
    }

    function createInitialState() {
        return {
            version: 1,
            userId: 'local-scholar',
            themeMode: 'dark', // 'dark' (asosiy) yoki 'light'
            dailyGoalMinutes: 20,
            xp: 0,
            studySeconds: 0,
            dailyStudySeconds: {}, // { 'YYYY-MM-DD': seconds }
            activeDays: [],        // ['YYYY-MM-DD']
            streakDays: 0,
            lastOpenedTopicId: null,
            lastOpenedNodeId: null,
            lastOpenedNodeTitle: null,
            lastVisitedAt: null,
            bookmarkedTopics: [],
            favoriteTerms: [],
            topicProgress: {}, // { topicId: { visitedNodes: [], completion: 0, status: 'not_started'|'in_progress'|'completed', lastVisitedAt: iso } }
            mapStates: {},     // { topicId: { collapsedBranches: [], scale: 1, x: 0, y: 0 } }
            quizHistory: [],   // [{ id, topicId, score, total, percentage, timeSpentSec, difficulty, createdAt, wrongQuestions }]
            labResults: {},    // { expId: { attempts: 0, lastResult: '', lastScore: null, completedAt: iso } }
            flashcardState: {},// { cardId: { reviewStatus: 'known'|'review'|'unknown', intervalDays: 1, ease: 2.5, nextReviewAt: iso, lastReviewedAt: iso } }
            customFlashcards: [], // [{ id, topicId, term, definition, example, createdAt }]
            deletedFlashcardIds: [],
            notes: [],         // [{ id, topicId, title, content, quote, isFavorite, createdAt, updatedAt }]
            activities: [],    // [{ id, type, title, detail, timestamp, xpEarned }]
            earnedBadges: [],  // ['badge-id']
            dailyQuestionAnswered: {} // { 'YYYY-MM-DD': { questionId, isCorrect, selectedIndex } }
        };
    }

    let state = loadState();

    function loadState() {
        try {
            const raw = window.localStorage.getItem(STORAGE_KEY);
            if (!raw) return createInitialState();
            const parsed = JSON.parse(raw);
            return Object.assign(createInitialState(), parsed);
        } catch (err) {
            console.warn('Saqlangan holatni o‘qishda xatolik:', err);
            return createInitialState();
        }
    }

    function saveState() {
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
            window.dispatchEvent(new CustomEvent('psychatlas:statechange', { detail: state }));
        } catch (err) {
            console.warn('Holatni saqlashda xatolik:', err);
        }
    }

    /**
     * Kunlik faollik va ketma-ket o'quv kunlarini (streak) haqiqiy harakat asosida yangilash
     */
    function markActiveDay() {
        const today = getTodayDateString();
        if (state.activeDays.indexOf(today) === -1) {
            state.activeDays.push(today);
            state.activeDays.sort();
        }
        // Ketma-ket kunlarni hisoblash
        if (!state.activeDays.length) {
            state.streakDays = 0;
            return;
        }
        let streak = 1;
        const sorted = state.activeDays.slice().sort().reverse();
        let current = new Date(sorted[0] + 'T00:00:00');

        for (let i = 1; i < sorted.length; i++) {
            const prev = new Date(sorted[i] + 'T00:00:00');
            const diffDays = Math.round((current - prev) / (1000 * 60 * 60 * 24));
            if (diffDays === 1) {
                streak++;
                current = prev;
            } else if (diffDays > 1) {
                break;
            }
        }
        state.streakDays = streak;
    }

    /**
     * Faoliyat jurnaliga yozish va XP qo'shish
     */
    function logActivity(type, title, detail, xpDelta) {
        const earned = Math.max(0, Number(xpDelta) || 0);
        if (earned > 0) {
            state.xp += earned;
        }
        markActiveDay();
        const entry = {
            id: 'act-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
            type: type,
            title: title,
            detail: detail || '',
            xpEarned: earned,
            timestamp: new Date().toISOString()
        };
        state.activities.unshift(entry);
        if (state.activities.length > 40) {
            state.activities = state.activities.slice(0, 40);
        }
        checkBadges();
        saveState();
        return entry;
    }

    /**
     * Mavzu yoki tugun ochilganda progressni haqiqiy hisoblash
     */
    function recordNodeVisit(topicId, nodeId, nodeTitle) {
        if (!topicId) return;
        const topic = window.PsychAtlasData.TOPICS.find(function (t) { return t.id === topicId; });
        if (!topic) return;

        const now = new Date().toISOString();
        state.lastOpenedTopicId = topicId;
        state.lastOpenedNodeId = nodeId || (topicId + '-root');
        state.lastOpenedNodeTitle = nodeTitle || topic.title;
        state.lastVisitedAt = now;

        if (!state.topicProgress[topicId]) {
            state.topicProgress[topicId] = {
                topicId: topicId,
                visitedNodes: [],
                completion: 0,
                status: 'in_progress',
                lastVisitedAt: now
            };
        }

        const prog = state.topicProgress[topicId];
        prog.lastVisitedAt = now;

        const targetNodeId = nodeId || (topicId + '-root');
        let isNewNode = false;
        if (prog.visitedNodes.indexOf(targetNodeId) === -1) {
            prog.visitedNodes.push(targetNodeId);
            isNewNode = true;
        }

        const totalNodes = (topic._all && topic._all.length) ? topic._all.length : 1;
        prog.completion = Math.min(100, Math.round((prog.visitedNodes.length / totalNodes) * 100));
        prog.status = prog.completion >= 100 ? 'completed' : (prog.completion > 0 ? 'in_progress' : 'not_started');

        if (isNewNode) {
            logActivity(
                'study',
                topic.title + ' — ' + (nodeTitle || 'Tugun o‘rganildi'),
                'O‘zlashtirish: ' + prog.completion + '% (' + prog.visitedNodes.length + '/' + totalNodes + ' tugun)',
                10
            );
        } else {
            markActiveDay();
            saveState();
        }
    }

    /**
     * Mavzuni to'liq o'rganilgan deb belgilash
     */
    function markTopicCompleted(topicId) {
        const topic = window.PsychAtlasData.TOPICS.find(function (t) { return t.id === topicId; });
        if (!topic) return;
        const allIds = (topic._all || []).map(function (n) { return n.id; });
        const now = new Date().toISOString();
        const wasCompleted = state.topicProgress[topicId] && state.topicProgress[topicId].completion === 100;

        state.topicProgress[topicId] = {
            topicId: topicId,
            visitedNodes: allIds,
            completion: 100,
            status: 'completed',
            lastVisitedAt: now
        };
        state.lastOpenedTopicId = topicId;
        state.lastVisitedAt = now;

        if (!wasCompleted) {
            logActivity('topic_complete', '«' + topic.title + '» mavzusi to‘liq o‘rganildi', '100% tugunlar ko‘rib chiqildi', 40);
        } else {
            saveState();
        }
    }

    /**
     * O'qish vaqtini qo'shish (soniyalarda)
     */
    function addStudyTime(seconds) {
        const delta = Math.max(0, Math.floor(seconds || 0));
        if (delta <= 0) return;
        state.studySeconds += delta;
        const today = getTodayDateString();
        state.dailyStudySeconds[today] = (state.dailyStudySeconds[today] || 0) + delta;
        saveState();
    }

    /**
     * Xatcho'p (Sevimli mavzu) qo'shish yoki olib tashlash
     */
    function toggleBookmarkTopic(topicId) {
        const idx = state.bookmarkedTopics.indexOf(topicId);
        let added = false;
        if (idx === -1) {
            state.bookmarkedTopics.push(topicId);
            added = true;
        } else {
            state.bookmarkedTopics.splice(idx, 1);
        }
        saveState();
        return added;
    }

    /**
     * Lug'atdagi sevimli atamani belgilash
     */
    function toggleFavoriteTerm(termId) {
        const idx = state.favoriteTerms.indexOf(termId);
        let added = false;
        if (idx === -1) {
            state.favoriteTerms.push(termId);
            added = true;
        } else {
            state.favoriteTerms.splice(idx, 1);
        }
        saveState();
        return added;
    }

    /**
     * Test natijasini saqlash
     */
    function saveQuizResult(resultObj) {
        const entry = {
            id: 'quiz-' + Date.now(),
            topicId: resultObj.topicId || 'all',
            topicTitle: resultObj.topicTitle || 'Umumiy test',
            score: resultObj.score || 0,
            total: resultObj.total || 0,
            percentage: resultObj.percentage || 0,
            timeSpentSec: resultObj.timeSpentSec || 0,
            difficulty: resultObj.difficulty || 'Barchasi',
            wrongQuestions: resultObj.wrongQuestions || [],
            createdAt: new Date().toISOString()
        };
        state.quizHistory.unshift(entry);
        const xp = Math.max(15, entry.score * 10);
        logActivity(
            'quiz',
            'Test yakunlandi: ' + entry.topicTitle,
            'Natija: ' + entry.score + '/' + entry.total + ' (' + entry.percentage + '%)',
            xp
        );
        return entry;
    }

    /**
     * Laboratoriya tajribasi natijasini saqlash
     */
    function saveLabResult(expId, expTitle, summaryText, metricValue) {
        const prev = state.labResults[expId] || { attempts: 0 };
        state.labResults[expId] = {
            expId: expId,
            title: expTitle,
            attempts: prev.attempts + 1,
            lastResult: summaryText,
            lastScore: metricValue,
            completedAt: new Date().toISOString()
        };
        logActivity(
            'lab',
            'Laboratoriya tajribasi: ' + expTitle,
            summaryText,
            30
        );
    }

    /**
     * Smart Flashcards ro'yxatini olish (standart + foydalanuvchi yaratganlari)
     */
    function getAllFlashcards() {
        const defaults = (window.PsychAtlasEducation.DEFAULT_FLASHCARDS || []).filter(function (c) {
            return state.deletedFlashcardIds.indexOf(c.id) === -1;
        });
        const all = defaults.concat(state.customFlashcards || []);
        return all.map(function (card) {
            const st = state.flashcardState[card.id] || {
                reviewStatus: 'unreviewed',
                intervalDays: 0,
                ease: 2.5,
                nextReviewAt: null,
                lastReviewedAt: null
            };
            return Object.assign({}, card, st);
        });
    }

    /**
     * Intervalga asoslangan takrorlash algoritmi (Spaced Repetition SM-2 soddalashtirilgan)
     * status: 'known' ("Bilaman") | 'review' ("Takrorlash kerak") | 'unknown' ("Bilmayman")
     */
    function reviewFlashcard(cardId, status) {
        const prev = state.flashcardState[cardId] || {
            reviewStatus: 'unreviewed',
            intervalDays: 0,
            ease: 2.5
        };

        let intervalDays = 1;
        let ease = prev.ease || 2.5;
        const now = new Date();
        let nextDate = new Date(now);

        if (status === 'known') {
            intervalDays = prev.intervalDays <= 0 ? 3 : Math.min(60, Math.round(prev.intervalDays * ease));
            ease = Math.min(3.0, ease + 0.15);
            nextDate.setDate(now.getDate() + intervalDays);
        } else if (status === 'review') {
            intervalDays = 1;
            ease = Math.max(1.3, ease - 0.15);
            nextDate.setDate(now.getDate() + 1);
        } else {
            // 'unknown' — bugun qayta ko'rish (10 daqiqadan keyin)
            intervalDays = 0;
            ease = Math.max(1.3, ease - 0.3);
            nextDate = new Date(now.getTime() + 10 * 60 * 1000);
        }

        state.flashcardState[cardId] = {
            reviewStatus: status,
            intervalDays: intervalDays,
            ease: ease,
            lastReviewedAt: now.toISOString(),
            nextReviewAt: nextDate.toISOString()
        };

        const xp = status === 'known' ? 10 : 5;
        logActivity(
            'flashcard',
            'Flashcard takrorlandi',
            status === 'known' ? 'Holat: Bilaman (+' + intervalDays + ' kun interval)' :
            (status === 'review' ? 'Holat: Takrorlash kerak (+1 kun)' : 'Holat: Bilmayman (Bugun qayta)'),
            xp
        );
        return state.flashcardState[cardId];
    }

    /**
     * Yangi flashcard yaratish yoki tahrirlash
     */
    function saveFlashcard(cardData) {
        const now = new Date().toISOString();
        if (cardData.id) {
            // Mavjud foydalanuvchi kartochkasini yoki standart kartochkani yangilash
            const existingIdx = state.customFlashcards.findIndex(function (c) { return c.id === cardData.id; });
            if (existingIdx !== -1) {
                state.customFlashcards[existingIdx] = Object.assign({}, state.customFlashcards[existingIdx], {
                    topicId: cardData.topicId || 'psyuxe',
                    term: cardData.term,
                    definition: cardData.definition,
                    example: cardData.example || '',
                    updatedAt: now
                });
            } else {
                // Standart kartochka tahrirlangan bo'lsa, eskini yashirib yangi custom qo'shamiz
                if (state.deletedFlashcardIds.indexOf(cardData.id) === -1) {
                    state.deletedFlashcardIds.push(cardData.id);
                }
                state.customFlashcards.unshift({
                    id: 'fc-custom-' + Date.now(),
                    topicId: cardData.topicId || 'psyuxe',
                    term: cardData.term,
                    definition: cardData.definition,
                    example: cardData.example || '',
                    isCustom: true,
                    createdAt: now
                });
            }
        } else {
            const newCard = {
                id: 'fc-custom-' + Date.now(),
                topicId: cardData.topicId || 'psyuxe',
                term: cardData.term,
                definition: cardData.definition,
                example: cardData.example || '',
                isCustom: true,
                createdAt: now
            };
            state.customFlashcards.unshift(newCard);
            logActivity('flashcard_create', 'Yangi flashcard yaratildi', newCard.term, 15);
        }
        saveState();
    }

    function deleteFlashcard(cardId) {
        state.customFlashcards = state.customFlashcards.filter(function (c) { return c.id !== cardId; });
        if (state.deletedFlashcardIds.indexOf(cardId) === -1) {
            state.deletedFlashcardIds.push(cardId);
        }
        delete state.flashcardState[cardId];
        saveState();
    }

    /**
     * Shaxsiy daftar va konspektlar CRUD
     */
    function saveNote(noteData) {
        const now = new Date().toISOString();
        if (noteData.id) {
            const idx = state.notes.findIndex(function (n) { return n.id === noteData.id; });
            if (idx !== -1) {
                state.notes[idx] = Object.assign({}, state.notes[idx], {
                    title: noteData.title,
                    topicId: noteData.topicId || 'psyuxe',
                    content: noteData.content,
                    quote: noteData.quote || '',
                    isFavorite: !!noteData.isFavorite,
                    updatedAt: now
                });
                saveState();
                return state.notes[idx];
            }
        }
        const newNote = {
            id: 'note-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
            title: noteData.title || 'Yangi konspekt qaydi',
            topicId: noteData.topicId || 'psyuxe',
            content: noteData.content || '',
            quote: noteData.quote || '',
            isFavorite: !!noteData.isFavorite,
            createdAt: now,
            updatedAt: now
        };
        state.notes.unshift(newNote);
        logActivity('note', 'Shaxsiy daftarga yangi qayd qo‘shildi', newNote.title, 15);
        return newNote;
    }

    function deleteNote(noteId) {
        state.notes = state.notes.filter(function (n) { return n.id !== noteId; });
        saveState();
    }

    /**
     * Xarita holatini saqlash
     */
    function saveMapState(topicId, mapStateObj) {
        if (!topicId) return;
        state.mapStates[topicId] = Object.assign({}, state.mapStates[topicId] || {}, mapStateObj);
        saveState();
    }

    function getMapState(topicId) {
        return state.mapStates[topicId] || null;
    }

    /**
     * Yutuq va nishonlarni real ko'rsatkichlar asosida tekshirish
     */
    function checkBadges() {
        const badges = window.PsychAtlasEducation.BADGES || [];
        const stats = getComputedStats();
        let newlyEarned = [];

        function award(badgeId) {
            if (state.earnedBadges.indexOf(badgeId) === -1) {
                state.earnedBadges.push(badgeId);
                const b = badges.find(function (x) { return x.id === badgeId; });
                if (b) {
                    state.xp += (b.xpReward || 50);
                    newlyEarned.push(b);
                }
            }
        }

        if (stats.studiedTopicsCount >= 1) award('badge-first-step');
        if (stats.completedTopicsCount >= 13) award('badge-atlas-master');
        if (state.quizHistory.some(function (q) { return q.percentage >= 80; })) award('badge-quiz-ace');
        if (Object.keys(state.labResults).length >= 3) award('badge-experimenter');
        if (stats.knownFlashcardsCount >= 10) award('badge-memory-keeper');
        if (state.notes.length >= 3) award('badge-scholar-scribe');

        if (newlyEarned.length > 0) {
            window.dispatchEvent(new CustomEvent('psychatlas:badgeearned', { detail: newlyEarned }));
        }
    }

    /**
     * Real foydalanuvchi faoliyatidan hisoblangan barcha statistikalar
     */
    function getComputedStats() {
        const topics = window.PsychAtlasData.TOPICS || [];
        const totalTopics = topics.length;
        let studiedTopicsCount = 0;
        let completedTopicsCount = 0;
        let totalTopicCompletionSum = 0;

        topics.forEach(function (t) {
            const p = state.topicProgress[t.id];
            if (p && p.completion > 0) {
                studiedTopicsCount++;
                totalTopicCompletionSum += p.completion;
                if (p.completion >= 100) completedTopicsCount++;
            }
        });

        const avgTopicMastery = totalTopics > 0 ? Math.round(totalTopicCompletionSum / totalTopics) : 0;
        const completedQuizzesCount = state.quizHistory.length;
        const avgQuizScore = completedQuizzesCount > 0
            ? Math.round(state.quizHistory.reduce(function (s, q) { return s + q.percentage; }, 0) / completedQuizzesCount)
            : 0;

        // Umumiy o'zlashtirish foizi: agar hali faoliyat bo'lmasa 0%
        let overallMastery = 0;
        if (studiedTopicsCount > 0 && completedQuizzesCount > 0) {
            overallMastery = Math.round(avgTopicMastery * 0.6 + avgQuizScore * 0.4);
        } else if (studiedTopicsCount > 0) {
            overallMastery = avgTopicMastery;
        } else if (completedQuizzesCount > 0) {
            overallMastery = avgQuizScore;
        }

        const flashcards = getAllFlashcards();
        const knownFlashcardsCount = flashcards.filter(function (c) { return c.reviewStatus === 'known'; }).length;
        const dueFlashcardsCount = flashcards.filter(function (c) {
            if (c.reviewStatus === 'unreviewed' || c.reviewStatus === 'unknown') return true;
            if (!c.nextReviewAt) return true;
            return new Date(c.nextReviewAt) <= new Date();
        }).length;

        const today = getTodayDateString();
        const todayStudyMinutes = Math.round((state.dailyStudySeconds[today] || 0) / 60);

        // Haftalik o'quv statistikasi (oxirgi 7 kun)
        const weeklyData = [];
        const dayNames = ['Yak', 'Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan'];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const key = d.getFullYear() + '-' +
                String(d.getMonth() + 1).padStart(2, '0') + '-' +
                String(d.getDate()).padStart(2, '0');
            const mins = Math.round((state.dailyStudySeconds[key] || 0) / 60);
            weeklyData.push({
                date: key,
                label: dayNames[d.getDay()],
                minutes: mins,
                active: state.activeDays.indexOf(key) !== -1 || mins > 0
            });
        }

        const level = Math.floor(state.xp / 150) + 1;
        const currentLevelXp = state.xp % 150;

        return {
            totalTopics: totalTopics,
            studiedTopicsCount: studiedTopicsCount,
            completedTopicsCount: completedTopicsCount,
            completedQuizzesCount: completedQuizzesCount,
            avgQuizScore: avgQuizScore,
            overallMastery: overallMastery,
            studySeconds: state.studySeconds,
            todayStudyMinutes: todayStudyMinutes,
            dailyGoalMinutes: state.dailyGoalMinutes || 20,
            streakDays: state.streakDays,
            xp: state.xp,
            level: level,
            currentLevelXp: currentLevelXp,
            nextLevelXp: 150,
            knownFlashcardsCount: knownFlashcardsCount,
            dueFlashcardsCount: dueFlashcardsCount,
            totalFlashcardsCount: flashcards.length,
            completedLabsCount: Object.keys(state.labResults).length,
            notesCount: state.notes.length,
            earnedBadgesCount: state.earnedBadges.length,
            weeklyData: weeklyData
        };
    }

    /**
     * Ma'lumotlarni JSON fayl sifatida eksport (Backup) va import qilish
     */
    function exportBackupJSON() {
        const dataStr = JSON.stringify(state, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'psychology-atlas-backup-' + getTodayDateString() + '.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    }

    function importBackupJSON(jsonString) {
        const parsed = JSON.parse(jsonString);
        if (!parsed || typeof parsed !== 'object') {
            throw new Error('Noto‘g‘ri zahira fayl formati');
        }
        state = Object.assign(createInitialState(), parsed);
        saveState();
        return state;
    }

    function resetAllProgress() {
        state = createInitialState();
        saveState();
        return state;
    }

    window.PsychAtlasStorage = {
        getState: function () { return state; },
        saveState: saveState,
        recordNodeVisit: recordNodeVisit,
        markTopicCompleted: markTopicCompleted,
        addStudyTime: addStudyTime,
        toggleBookmarkTopic: toggleBookmarkTopic,
        toggleFavoriteTerm: toggleFavoriteTerm,
        saveQuizResult: saveQuizResult,
        saveLabResult: saveLabResult,
        getAllFlashcards: getAllFlashcards,
        reviewFlashcard: reviewFlashcard,
        saveFlashcard: saveFlashcard,
        deleteFlashcard: deleteFlashcard,
        saveNote: saveNote,
        deleteNote: deleteNote,
        saveMapState: saveMapState,
        getMapState: getMapState,
        getComputedStats: getComputedStats,
        logActivity: logActivity,
        exportBackupJSON: exportBackupJSON,
        importBackupJSON: importBackupJSON,
        resetAllProgress: resetAllProgress,
        getTodayDateString: getTodayDateString
    };
})(window);
