# PSYCHOLOGY ATLAS — TEXNIK AUDIT VA ARXITEKTURA HUJJATI

## 1. 1-BOSQICH: MAVJUD LOYIHA AUDITI (TEXNIK HISOBOT)

### 1.1. Mavjud `index.html` fayli tahlili (1896 qator)
- **Tuzilmasi:** Yagona monolit HTML fayl bo‘lib, ichida `<style>` (234 qator), HTML maketi (`header`, `aside#sidebar`, `main#mapViewport`, `section#gridViewport`, `div#drawer`) va `<script>` (1492 qator) joylashgan edi.
- **Ma’lumotlar bazasi (`GROUPS` va `TOPICS`):**
  - **2 ta asosiy bo‘lim (`GROUPS`):**
    - `0`: *Umumiy psixologiya* (1–10-mavzular)
    - `1`: *Temperament (mijoz)* (11–13-mavzular)
  - **13 ta mavzu (`TOPICS`):**
    1. `psyuxe` — Psixologiya va Psyuxe
    2. `diqqat` — Diqqat
    3. `idrok` — Sezgi va idrok
    4. `xotira` — Xotira
    5. `tafakkur` — Tafakkur
    6. `xayol` — Xayol
    7. `muloqot` — Muloqot
    8. `faoliyat` — Faoliyat va motivatsiya
    9. `shaxs` — Shaxs xususiyatlari
    10. `eq` — Emotsional intellekt (EQ)
    11. `temperament-nazariyalari` — Temperament nazariyalari
    12. `temperament-xususiyatlari` — Temperament xususiyatlari
    13. `temperament-turlari` — Temperament turlari
- **Saqlangan barcha mavjud funksiyalar:**
  - `normalize(topic)` — har bir tugunga noyob ID (`<topicId>-root`, `<topicId>-b<i >`, `<topicId>-b<i>-l<j>`) berish;
  - `layoutTopic(t)` va `drawConnectors(t, svg)` — chapdan o‘ngga ierarxik daraxt joylashuvi va SVG Bezier egri chiziqlari;
  - Zoom (`zoomBy`), Pan (`pointerdown/move/up`), Fit (`fitView`), Center (`centerOn`);
  - Qidiruv (`applySearch`, `applyGridFilter`);
  - Konspekt ko‘rinishi (`renderGrid`);
  - Batafsil ma’lumot oynasi (`openDrawer`, `closeDrawer`);
  - Chop etish (`window.print()`).

### 1.2. Aniqlangan takrorlanishlar va ilmiy tekshiruv belgilari (5-Qat’iy qoida asosida)
> **Qat’iy qoida №5:** *«Takrorlangan yoki ilmiy jihatdan tekshirish talab qiladigan ma’lumotlarni alohida belgilab chiq. O‘zboshimchalik bilan tuzatma.»*

Asl matnlar 100% o‘zgarishsiz saqlangan holda, `data/topics-data.js` ichidagi `AUDIT_FLAGS` reyestrida va interfeysdagi **«Ilmiy audit va metodologik eslatma»** blokida quyidagilar belgilandi:

1. **Kross-mavzuli takrorlanish (`audit-dup-1`):**
   - `psyuxe-b3` (1-mavzuning 4-shoxi: «Shaxs xususiyatlari») va `shaxs-root` (9-mavzu markazi: «Shaxs xususiyatlari») bir xil ta’rif hamda avtomobil dvigateli va haydovchisi metaforasidan foydalanadi.
2. **Hayotiy misol takrorlanishi (`audit-dup-2`):**
   - `shaxs-b1` («Xarakter») va `temperament-xususiyatlari-b3` («Temperament va xarakter») tugunlarida xolerik temperamentli ikki kishi (adolatparvar vs janjalkash) haqidagi misol takrorlangan.
3. **Ta’rif takrorlanishi (`audit-dup-3`):**
   - `muloqot-b2-l0` (7-mavzudagi «Empatiya» bargi) va `eq-b1` (10-mavzudagi «Empatiya» shoxi) so‘zma-so‘z bir xil ta’rifga ega.
4. **Ilmiy aniqlashtirish — Temperamentning 7 mezoni (`audit-sci-1`):**
   - 12-mavzu (`temperament-xususiyatlari-root`) sarlavha ostida *«Har bir tipni o‘lchovchi 7 psixologik mezon»* deyilgan, ammo `items` ro‘yxatida 4 ta band keltirilgan. V.S. Merlin va B.M. Teplov tasnifidagi to‘liq 7 mezon (senzitivlik, reaktivlik, faollik, reaktivlik va faollik nisbati, reaksiyalar sur’ati/tempi, plastiklik-rigidlik, ekstraversiya-introversiya / emotsional qo‘zg‘aluvchanlik) ilmiy audit izohida ko‘rsatib o‘tildi.
5. **Ilmiy aniqlashtirish — Diqqat xususiyatlari va qonunlari (`audit-sci-2`):**
   - 2-mavzuda (`diqqat-b1`, `diqqat-b2`) diqqatning «taqsimlanishi» va «bo‘linishi» alohida berilgan hamda «Qaytaruvchi, ommaviy va ta’sirlanish qonunlari» keltirilgan. Klassik akademik adabiyotlarda (S.L. Rubinshteyn, E.G‘. G‘oziyev) 5 xususiyat (barqarorlik, konsentratsiya/to‘planish, ko‘lam/hajm, taqsimlanish, ko‘chish) va A.A. Uxtomskiyning «Dominanta» qonuni asos qilib olinishi ilmiy izoh sifatida qo‘shildi.

---

## 2. 2-BOSQICH: MODULLI ARXITEKTURA VA MA’LUMOTLAR MODELI

### 2.1. Fayllar va modullar tuzilmasi
```text
psicologiai/
├── index.html                      # Asosiy SPA kirish nuqtasi (10 ta modul viewporti bilan)
├── server.js                       # Xavfsiz Node.js HTTP server va AI backend proksi (/api/ai/*)
├── package.json                    # Loyiha konfiguratsiyasi
├── AUDIT_VA_ARXITEKTURA.md         # Audit hisoboti va arxitektura hujjati
├── styles/
│   └── atlas.css                   # Premium Dark (#0B1020) va Light akademik dizayn tizimi
├── data/
│   ├── topics-data.js              # 13 mavzu, 2 bo'lim, Reference, AuditFlag va Knowledge Galaxy
│   └── education-data.js           # Tarix (10 davr, 11 olim), Lug'at (36 termin), Testlar, Flashcards, Badges
├── services/
│   ├── storage.js                  # localStorage persistence, real statistika, Spaced Repetition, Backup
│   └── api.js                      # Xavfsiz backend AI integratsiyasi + Mahalliy Tasdiqlangan Atlas Dvigateli
├── utils/
│   └── helpers.js                  # XSS himoyasi (escapeHtml), PNG/SVG/PDF eksport funksiyalari
├── modules/
│   ├── dashboard/dashboard.js      # Bosh sahifa (Hero, Neyron SVG, Real Statistika, Kun savoli, Gamifikatsiya)
│   ├── atlas/atlas.js              # Interaktiv Xarita, Konspekt, Knowledge Galaxy va Mavzular Kutubxonasi
│   ├── laboratory/laboratory.js    # Virtual Psixologiya Laboratoriyasi (7 ta interaktiv tajriba)
│   ├── tests/tests.js              # Adaptiv Test Tizimi (6 xil savol turi, taymer, tahlil)
│   ├── flashcards/flashcards.js    # Smart Flashcards (3D flip, SM-2 interval algoritmi, CRUD)
│   ├── ai-tutor/ai-tutor.js        # AI Psixologiya Ustoz (5 rejim, 8 tezkor amal, manbali javoblar)
│   ├── history/history.js          # Psixologiya Tarixi (10 xronologik davr va olimlar)
│   ├── glossary/glossary.js        # Psixologik Atamalar Lug'ati (A-Z filtr, qidiruv, sevimlilar)
│   └── notes/notes.js              # Shaxsiy Daftar va Konspektlar (CRUD, iqtiboslar, PDF eksport)
└── app/
    └── app.js                      # Global router, qidiruv, bildirishnomalar, profil, Dark/Light rejim
```

### 2.2. Ma’lumotlar modeli (Data Models)
- **`Topic`**: `{ id, no, group, title, slug, categoryId, short, summary, rootNode, branches, relatedTopics, references, difficulty, duration, auditFlags, galaxyPos }`
- **`Node`**: `{ id, topicId, parentId, kind, type, cat, title, sub, desc, description, items, example, extra, children, auditFlags }`
- **`Question`**: `{ id, topicId, type, question, options, pairs, items, correctAnswer, explanation, difficulty, sourceId }`
- **`Flashcard`**: `{ id, topicId, term, definition, example, reviewStatus, intervalDays, ease, nextReviewAt, lastReviewedAt }`
- **`UserProgress`**: `{ userId, topicProgress, quizHistory, labResults, flashcardState, notes, xp, studySeconds, streakDays, earnedBadges }`
- **`Reference`**: `{ id, title, author, publicationYear, publisher, page, url, relatedTopics }`

---

## 3. ISHGA TUSHIRISH BO‘YICHA KO‘RSATMA

### 1-usul: To‘liq Backend + Frontend server orqali (Tavsiya etiladi)
Terminalda loyiha papkasida quyidagi buyruqni ishga tushiring:
```bash
node server.js
```
So‘ng brauzerda **`http://localhost:3000`** manzilini oching.

*(Ixtiyoriy)* Tashqi Gemini AI API kalitini backendga xavfsiz ulash uchun:
```powershell
$env:GEMINI_API_KEY="sizning_api_kalitingiz"
node server.js
```
> Agar `GEMINI_API_KEY` berilmasa ham platforma to‘liq ishlaydi — AI Ustoz avtomatik ravishda **«Tasdiqlangan Atlas Bazasi Rejimi»**da 13 ta mavzu va 8 ta akademik manba asosida javob qaytaradi.

### 2-usul: To‘g‘ridan-to‘g‘ri brauzerda (Offline / Serverless)
`index.html` faylini istalgan zamonaviy brauzerda (Chrome, Edge, Firefox, Safari) to‘g‘ridan-to‘g‘ri ochishingiz mumkin — barcha modullar, xarita, laboratoriya, testlar, flashcards va mahalliy saqlash (`localStorage`) internet va serversiz ham to‘liq ishlaydi.
