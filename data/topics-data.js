/**
 * PSYCHOLOGY ATLAS — MAVZULAR VA BILIMLAR XARITASI MA'LUMOTLAR BAZASI
 *
 * QAT'IY QOIDA:
 * Asl loyihadagi 13 ta mavzu (TOPICS), 2 ta asosiy bo'lim (GROUPS), THEMES ranglari,
 * mavzu identifikatorlari, ta'riflar, misollar va ichki bog'lanishlar 100% o'zgarishsiz saqlangan.
 * Yangi tizim uchun zarur bo'lgan metama'lumotlar (references, difficulty, duration, categoryId,
 * ilmiy audit belgilari va Knowledge Galaxy aloqalari) mavjud ma'lumotlarni buzmasdan boyitilgan.
 */
(function (window) {
    'use strict';

    /* =========================================================
       1. ASL RANG PALITRASI (SAQLANGAN)
    ========================================================= */
    const THEMES = {
        indigo:  { line: '#6366f1', tint: 'rgba(99, 102, 241, 0.14)', lightTint: '#eef2ff', deep: '#312e81' },
        sky:     { line: '#38bdf8', tint: 'rgba(56, 189, 248, 0.14)', lightTint: '#f0f9ff', deep: '#0c4a6e' },
        emerald: { line: '#10b981', tint: 'rgba(16, 185, 129, 0.14)', lightTint: '#ecfdf5', deep: '#064e3b' },
        amber:   { line: '#f59e0b', tint: 'rgba(245, 158, 11, 0.14)', lightTint: '#fffbeb', deep: '#78350f' },
        purple:  { line: '#a855f7', tint: 'rgba(168, 85, 247, 0.14)', lightTint: '#faf5ff', deep: '#4c1d95' },
        rose:    { line: '#f43f5e', tint: 'rgba(244, 63, 94, 0.14)', lightTint: '#fff1f2', deep: '#881337' }
    };

    /* =========================================================
       2. ASL 2 TA ASOSIY BO'LIM (SAQLANGAN)
    ========================================================= */
    const GROUPS = [
        { id: 0, label: 'Umumiy psixologiya' },
        { id: 1, label: 'Temperament (mijoz)' }
    ];

    /* =========================================================
       3. KENGAYTIRILGAN KATEGORIYA FILTRLARI (ATLAS VA KUTUBXONA UCHUN)
    ========================================================= */
    const CATEGORIES = [
        { id: 'all', label: 'Barcha mavzular', icon: 'fa-layer-group' },
        { id: 'bilish', label: 'Bilish jarayonlari', icon: 'fa-brain' },
        { id: 'hissiy-irodaviy', label: 'Hissiy-irodaviy jarayonlar', icon: 'fa-heart-pulse' },
        { id: 'shaxs', label: 'Shaxs psixologiyasi', icon: 'fa-user-astronaut' },
        { id: 'ijtimoiy', label: 'Ijtimoiy psixologiya', icon: 'fa-comments' },
        { id: 'temperament', label: 'Temperament', icon: 'fa-masks-theater' },
        { id: 'tarix', label: 'Psixologiya tarixi', icon: 'fa-landmark' },
        { id: 'boshqa', label: 'Boshqa yo‘nalishlar', icon: 'fa-compass' }
    ];

    /* =========================================================
       4. TASDIQLANGAN ILMIY MANBALAR REYESTRI (Reference Model)
    ========================================================= */
    const REFERENCES = [
        {
            id: 'ref-gziyev-2010',
            title: 'Umumiy psixologiya',
            author: 'E.G‘. G‘oziyev',
            publicationYear: 2010,
            publisher: 'Toshkent: "O‘zbekiston faylasuflari milliy jamiyati" nashriyoti',
            page: '12–340',
            url: '',
            relatedTopics: ['psyuxe', 'diqqat', 'idrok', 'xotira', 'tafakkur', 'xayol', 'faoliyat', 'shaxs', 'temperament-nazariyalari', 'temperament-xususiyatlari', 'temperament-turlari']
        },
        {
            id: 'ref-karimova-2011',
            title: 'Psixologiya (O‘quv qo‘llanma)',
            author: 'V.M. Karimova',
            publicationYear: 2011,
            publisher: 'Toshkent: A. Qodiriy nomidagi xalq merosi nashriyoti',
            page: '8–245',
            url: '',
            relatedTopics: ['psyuxe', 'muloqot', 'shaxs', 'faoliyat']
        },
        {
            id: 'ref-rubinshteyn-2002',
            title: 'Основы общей психологии (Umumiy psixologiya asoslari)',
            author: 'S.L. Rubinshteyn',
            publicationYear: 2002,
            publisher: 'Sankt-Peterburg: Piter',
            page: '15–680',
            url: '',
            relatedTopics: ['psyuxe', 'diqqat', 'idrok', 'xotira', 'tafakkur', 'xayol', 'faoliyat', 'shaxs']
        },
        {
            id: 'ref-leontyev-1975',
            title: 'Деятельность. Сознание. Личность (Faoliyat. Ong. Shaxs)',
            author: 'A.N. Leontyev',
            publicationYear: 1975,
            publisher: 'Moskva: Politizdat',
            page: '75–230',
            url: '',
            relatedTopics: ['psyuxe', 'faoliyat', 'shaxs']
        },
        {
            id: 'ref-goleman-1995',
            title: 'Emotional Intelligence: Why It Can Matter More Than IQ',
            author: 'Daniel Goleman',
            publicationYear: 1995,
            publisher: 'New York: Bantam Books',
            page: '33–189',
            url: '',
            relatedTopics: ['eq', 'muloqot', 'shaxs']
        },
        {
            id: 'ref-pavlov-1951',
            title: 'О типах высшей нервной деятельности и экспериментальных неврозах',
            author: 'I.P. Pavlov',
            publicationYear: 1951,
            publisher: 'Moskva: AN SSSR',
            page: '267–295',
            url: '',
            relatedTopics: ['temperament-nazariyalari', 'temperament-xususiyatlari', 'temperament-turlari']
        },
        {
            id: 'ref-merlin-1986',
            title: 'Очерк интегрального исследования индивидуальности',
            author: 'V.S. Merlin, B.M. Teplov, Ya. Strelyau',
            publicationYear: 1986,
            publisher: 'Moskva: Pedagogika',
            page: '44–162',
            url: '',
            relatedTopics: ['temperament-xususiyatlari', 'temperament-turlari', 'shaxs']
        },
        {
            id: 'ref-andreeva-2001',
            title: 'Социальная психология (Ijtimoiy psixologiya)',
            author: 'G.M. Andreyeva',
            publicationYear: 2001,
            publisher: 'Moskva: Aspekt Press',
            page: '80–145',
            url: '',
            relatedTopics: ['muloqot', 'eq']
        }
    ];

    /* =========================================================
       5. ASL 13 TA MAVZU MA'LUMOTLARI (100% SAQLANGAN)
    ========================================================= */
    const TOPICS = [
        /* -------------------- 1. PSIXOLOGIYA VA PSYXE -------------------- */
        {
            id: 'psyuxe', no: 1, group: 0,
            title: 'Psixologiya va Psyuxe',
            short: 'Fan predmeti, «Psyuxe» va psixika qatlamlari',
            icon: 'fa-brain', theme: 'indigo',
            summary: 'Psixologiya fanining predmeti, «Psyuxe» tushunchasining tarixiy ildizi va psixikaning uch qatlami: jarayonlar, holatlar hamda shaxs xususiyatlari.',
            root: {
                cat: 'Markaziy tushuncha',
                title: 'UMUMIY PSIXOLOGIYA',
                sub: 'Psixik jarayonlar, holatlar va shaxs xususiyatlari fani',
                desc: 'Umumiy psixologiya — inson psixikasining umumiy qonuniyatlarini, bilish jarayonlari (sezgi, idrok, xotira, tafakkur, xayol, diqqat), hissiy-irodaviy soha hamda shaxsning individual-tipologik xususiyatlarini o‘rganuvchi fundamental fandir.',
                items: [
                    ['Psixik jarayonlar', 'Diqqat, sezgi, idrok, xotira, tafakkur, xayol, nutq.'],
                    ['Psixik holatlar', 'Tetiklik, charchoq, stress, affekt, ilhomlanish, kayfiyat.'],
                    ['Shaxs xususiyatlari', 'Temperament, xarakter, qobiliyat, qiziqish va motivatsiya.']
                ],
                example: 'Inson biror muammoni hal qilayotganda avval uni idrok etadi, diqqatini jamlaydi, xotiradagi bilimlarga tayanadi va tafakkur orqali xulosa chiqaradi — bularning barchasi yaxlit tizimdir.'
            },
            branches: [
                {
                    node: {
                        cat: 'Tarixiy-falsafiy asos', theme: 'sky', icon: 'fa-feather-pointed',
                        title: 'PSYXE (JON / RUH)',
                        sub: '«Psixologiya» atamasining ildizi',
                        desc: 'Qadimgi yunon tilida «Psyuxe» — jon, ruh, nafas; «Logos» — ilm, ta’limot demakdir. Antik davr mutafakkirlari (Suqrot, Aflotun, Arastu) insonning barcha xatti-harakatlari va ichki kechinmalarini jonning faolligi bilan izohlaganlar.',
                        items: [
                            ['Jon haqidagi ta’limot', 'Arastuning «Jon haqida» asari psixologiyaning ilk ilmiy poydevori.'],
                            ['Ong va ongsizlik', 'Zamonaviy psixologiyada «jon» tushunchasi psixika va ong sifatida o‘rganiladi.']
                        ],
                        example: 'Qadimgi yunon afsonasida Psixeya kapalak qanotli qiz sifatida tasvirlangan — bu inson ruhining nozikligi va yuksaklikka intilishini anglatadi.'
                    },
                    children: [
                        {
                            cat: 'Tarixiy ildiz', title: 'Jon haqidagi ta’limot',
                            sub: 'Antik davr mutafakkirlari merosi',
                            desc: 'Suqrot, Aflotun va Arastu insonning barcha xatti-harakatlari va ichki kechinmalarini jonning faolligi bilan izohlaganlar. Arastuning «Jon haqida» asari psixologiyaning ilk ilmiy poydevori hisoblanadi.',
                            example: 'Bugungi «psixika» tushunchasi o‘z ildizi bilan aynan ana shu antik ta’limotga borib taqaladi.'
                        },
                        {
                            cat: 'Zamonaviy ko‘rinish', title: 'Ong va ongsizlik',
                            sub: '«Jon» tushunchasining ilmiy davomi',
                            desc: 'Zamonaviy psixologiyada «jon» tushunchasi psixika va ong sifatida o‘rganiladi: ongli boshqariladigan jarayonlar bilan birga ongsiz qatlam ham inson xulq-atvoriga ta’sir ko‘rsatadi.'
                        }
                    ]
                },
                {
                    node: {
                        cat: 'Psixika tuzilishi', theme: 'emerald', icon: 'fa-diagram-project',
                        title: 'PSIXIK JARAYONLAR',
                        sub: 'Ongda kechadigan faol psixik hodisalar',
                        desc: 'Psixik jarayonlar — ongda nisbatan qisqa vaqt ichida kechadigan faol psixik hodisalar. Ular insonning bilish faoliyati hamda hissiy-irodaviy sohasini tashkil etadi.',
                        example: 'Muammoni hal qilishda idrok, diqqat, xotira va tafakkur ketma-ket emas, bir vaqtda va o‘zaro bog‘langan holda ishlaydi.'
                    },
                    children: [
                        {
                            cat: 'Bilish sohasi', title: 'Bilish jarayonlari',
                            sub: 'Diqqat, sezgi, idrok, xotira, tafakkur, xayol, nutq',
                            desc: 'Bilish jarayonlari atrofdagi olamni aks ettirish bosqichlaridir: sezgi va idrok orqali obraz hosil bo‘ladi, xotira uni saqlaydi, tafakkur umumlashtiradi, xayol esa yangi obraz yaratadi.'
                        },
                        {
                            cat: 'Kechinish sohasi', title: 'Hissiy-irodaviy jarayonlar',
                            sub: 'Tuyg‘ular va irodaviy harakatlar',
                            desc: 'Insonning kechinmalari, voqelikka hissiy munosabati va maqsadga erishish yo‘lidagi irodaviy zo‘r berishi psixikaning hissiy-irodaviy sohasini tashkil qiladi.'
                        }
                    ]
                },
                {
                    node: {
                        cat: 'Fon holatlari', theme: 'amber', icon: 'fa-wave-square',
                        title: 'PSIXIK HOLATLAR',
                        sub: 'Tetiklik, charchoq, stress, affekt, ilhom, kayfiyat',
                        desc: 'Psixik holatlar — ma’lum vaqt oralig‘ida butun psixikani qamrab oluvchi fon holatlari. Ular faoliyat samaradorligini sezilarli darajada o‘zgartiradi.',
                        example: 'Bir xil vazifa tetiklik holatida 40 daqiqada bajarilsa, charchoq holatida ikki baravar ko‘p vaqt talab qilishi mumkin.'
                    },
                    children: [
                        {
                            cat: 'Faollik holati', title: 'Tetiklik va charchoq',
                            sub: 'Ish qobiliyatining ikki qutbi',
                            desc: 'Tetiklik — faoliyatga tayyorlik holati; charchoq esa uzoq davom etgan ishdan keyin ish qobiliyatining pasayishi.'
                        },
                        {
                            cat: 'Emotsional holat', title: 'Kayfiyat, stress, affekt, ilhom',
                            sub: 'Hissiy fon holatlari',
                            desc: 'Kayfiyat — uzoq saqlanuvchi umumiy emotsional fon; stress — zo‘riqish holati; affekt — kuchli va qisqa muddatli emotsional portlash; ilhom — ijodiy yuksalish holati.'
                        }
                    ]
                },
                {
                    node: {
                        cat: 'Differensial psixologiya', theme: 'purple', icon: 'fa-user-astronaut',
                        title: 'SHAXS XUSUSIYATLARI',
                        sub: 'Temperament, xarakter, qobiliyat, qiziqish',
                        desc: 'Har bir insonni boshqalardan ajratib turuvchi barqaror psixologik belgilar tizimi shaxsning individual-tipologik xususiyatlarini tashkil etadi.',
                        example: 'Temperament — avtomobil dvigatelining quvvati va tezligi bo‘lsa, Xarakter — haydovchining qayerga va qanday boshqarishidir.'
                    },
                    children: [
                        {
                            cat: 'Tug‘ma asos', title: 'Temperament',
                            sub: 'Psixik faoliyatning dinamik xususiyatlari',
                            desc: 'Temperament — oliy nerv faoliyatining tug‘ma dinamik xususiyatlari (tezlik, kuch, muvozanat). U batafsil alohida mavzularda — temperament nazariyalari, xususiyatlari va turlarida — ko‘rib chiqiladi.'
                        },
                        {
                            cat: 'Ijtimoiy sifatlar', title: 'Xarakter',
                            sub: 'Hayot davomida shakllanadigan sifatlar',
                            desc: 'Xarakter — hayot davomida shakllanadigan, insonning borliqqa va o‘ziga munosabatini bildiruvchi barqaror sifatlar tizimi.'
                        },
                        {
                            cat: 'Imkoniyatlar', title: 'Qobiliyat va qiziqish',
                            sub: 'Faoliyatni egallash sharti',
                            desc: 'Qobiliyat — muayyan faoliyatni muvaffaqiyatli egallash imkonini beruvchi individual xususiyatlar; qiziqish — shaxsning ma’lum sohani bilishga bo‘lgan hissiy-kognitiv intilishi.'
                        }
                    ]
                }
            ],
            related: [
                { to: 'diqqat', label: 'Diqqat' },
                { to: 'shaxs', label: 'Shaxs xususiyatlari' },
                { to: 'temperament-turlari', label: 'Temperament turlari' }
            ]
        },

        /* -------------------- 2. DIQQAT -------------------- */
        {
            id: 'diqqat', no: 2, group: 0,
            title: 'Diqqat',
            short: 'Turlari, xususiyatlari va qonunlari',
            icon: 'fa-bullseye', theme: 'sky',
            summary: 'Diqqat — ongning muayyan obyektga yo‘naltirilishi va to‘planishi. Xaritada uning uch turi, to‘rt xususiyati va uch qonuni ko‘rsatilgan.',
            root: {
                cat: 'Bilish jarayonlari',
                title: 'DIQQAT',
                sub: 'Ongning bir nuqtaga yo‘nalishi va to‘planishi',
                desc: 'Diqqat — inson ongining muayyan obyektga yo‘naltirilishi va unda to‘planishidan iborat psixik holat. U mustaqil bilish jarayoni bo‘lmasa-da, barcha bilish jarayonlarining samaradorligini ta’minlovchi «filtr» vazifasini bajaradi.',
                example: 'Shovqinli kafeda do‘stingizning gapini diqqat bilan tinglashingiz («Kokteyl kechasi effekti») — bu diqqatning tanlovchanlik kuchidir.'
            },
            branches: [
                {
                    node: {
                        cat: 'Klassifikatsiya', theme: 'emerald', icon: 'fa-list-check',
                        title: 'DIQQAT TURLARI',
                        sub: 'Ixtiyorsiz, ixtiyoriy, ixtiyoriydan so‘nggi',
                        desc: 'Diqqatning uch turi ong faolligi va irodaviy zo‘riqish darajasiga qarab ajratiladi: beixtiyor yuzaga keladigan, ongli maqsad bilan boshqariladigan va ishga kirishib ketgandan keyingi diqqat.',
                        example: 'Dars boshida o‘zingizni majburlab tinglaysiz, mavzu qiziqarli bo‘lib ketsa — irodaviy zo‘riqish yo‘qoladi.'
                    },
                    children: [
                        {
                            cat: 'Turning mezoni', title: 'Ixtiyorsiz diqqat',
                            sub: 'Kutilmagan kuchli ta’sir natijasi',
                            desc: 'Kutilmagan kuchli ta’sir (ovoz, yorug‘lik) natijasida beixtiyor yuzaga keladi — inson uni boshqarishga iroda sarflamaydi.'
                        },
                        {
                            cat: 'Turning mezoni', title: 'Ixtiyoriy diqqat',
                            sub: 'Ongli maqsad va iroda',
                            desc: 'Ongli maqsad va irodaviy zo‘r berish orqali boshqariladi; maqsadga erishish uchun chalg‘ituvchi ta’sirlarni bostirishni talab qiladi.'
                        },
                        {
                            cat: 'Turning mezoni', title: 'Ixtiyoriydan so‘nggi diqqat',
                            sub: 'Zo‘riqishsiz davom etuvchi diqqat',
                            desc: 'Ishga chuqur qiziqib ketganda irodaviy zo‘riqishsiz davom etuvchi diqqat — eng samarali shakl hisoblanadi.'
                        }
                    ]
                },
                {
                    node: {
                        cat: 'Diqqat tuzilishi', theme: 'amber', icon: 'fa-sliders',
                        title: 'DIQQAT XUSUSIYATLARI',
                        sub: 'Barqarorligi, taqsimlanishi, bo‘linishi, ko‘chishi',
                        desc: 'Har bir inson diqqatining sifati 5 ta asosiy ko‘rsatkich bilan o‘lchanadi: barqarorlik, ko‘lam (hajm), taqsimlanish, bo‘linish va ko‘chish.',
                        items: [
                            ['Barqarorligi', 'Diqqatning bir obyektda uzoq vaqt chalg‘imasdan saqlanib turishi.'],
                            ['Taqsimlanishi', 'Bir vaqtning o‘zida bir nechta harakatni muvaffaqiyatli bajarish (masalan, haydovchilik).'],
                            ['Bo‘linishi', 'Ongning ikki yoki undan ortiq faoliyat o‘rtasida ulushlarga ajralishi.'],
                            ['Ko‘chishi', 'Diqqatni ongli ravishda bir faoliyatdan ikkinchisiga tez o‘tkazish.']
                        ],
                        example: 'Jarroh operatsiya vaqtida ham asboblarga, ham bemorning yurak urishiga e’tibor berishi diqqat taqsimlanishining oliy namunasidir.'
                    },
                    children: [
                        {
                            cat: 'Barqarorlik', title: 'Diqqat barqarorligi',
                            sub: 'Uzoq vaqt bir obyektda saqlanish',
                            desc: 'Diqqatning bir obyektda uzoq vaqt chalg‘imasdan saqlanib turishi. Barqarorlik faoliyatning monotonligi va charchoq darajasiga bog‘liq.'
                        },
                        {
                            cat: 'Taqsimlanish', title: 'Diqqat taqsimlanishi',
                            sub: 'Bir vaqtda bir nechta harakat',
                            desc: 'Bir vaqtning o‘zida bir nechta harakatni muvaffaqiyatli bajarish qobiliyati — masalan, haydovchining yo‘l, asboblar va yo‘l belgilarini birga kuzatishi.'
                        },
                        {
                            cat: 'Bo‘linish', title: 'Diqqatning bo‘linishi',
                            sub: 'Ongning faoliyatlar o‘rtasida ajralishi',
                            desc: 'Ongning ikki yoki undan ortiq faoliyat o‘rtasida ulushlarga ajralishi.'
                        },
                        {
                            cat: 'Ko‘chish', title: 'Diqqatning ko‘chishi',
                            sub: 'Bir faoliyatdan ikkinchisiga o‘tish',
                            desc: 'Diqqatni ongli ravishda bir faoliyatdan ikkinchisiga tez o‘tkazish; ko‘chish tezligi asab jarayonlarining harakatchanligiga bog‘liq.'
                        }
                    ]
                },
                {
                    node: {
                        cat: 'Diqqat mexanizmlari', theme: 'purple', icon: 'fa-scale-balanced',
                        title: 'DIQQAT QONUNLARI',
                        sub: 'Qaytaruvchi, ommaviy va ta’sirlanish qonunlari',
                        desc: 'Diqqatning qonuniyatlari axborot oqimi ichidan qaysi signallar ong markaziga o‘tishini va qaysilari tormozlanishini belgilab beradi (Dominanta printsipi).',
                        example: 'Reklama bannerlarida yorqin ranglar va harakatlanuvchi tasvirlardan foydalanish aynan «ta’sirlanish qonuni»ga asoslanadi.'
                    },
                    children: [
                        {
                            cat: 'Qonun', title: 'Qaytaruvchi qonun',
                            sub: 'Takrorlanuvchi signallar',
                            desc: 'Takrorlanuvchi yoki ritmik signallarning ongda qayta-qayta faollashuvi.'
                        },
                        {
                            cat: 'Qonun', title: 'Ommaviy qonun',
                            sub: 'Jamoaviy diqqat',
                            desc: 'Ko‘pchilikning e’tiborini tortgan ijtimoiy hodisalarga jamoaviy diqqat qaratilishi.'
                        },
                        {
                            cat: 'Qonun', title: 'Ta’sirlanish qonuni',
                            sub: 'Kuchli qo‘zg‘atuvchilar',
                            desc: 'Hissiy-emotsional jihatdan kuchli qo‘zg‘atuvchilarning darhol diqqatni jalb etishi.'
                        }
                    ]
                }
            ],
            related: [
                { to: 'idrok', label: 'Sezgi va idrok' },
                { to: 'xotira', label: 'Xotira' }
            ]
        },

        /* -------------------- 3. SEZGI VA IDROK -------------------- */
        {
            id: 'idrok', no: 3, group: 0,
            title: 'Sezgi va idrok',
            short: 'Sezgi bosqichi va idrok qonuniyatlari',
            icon: 'fa-eye', theme: 'sky',
            summary: 'Sezgi — eng sodda psixik jarayon, idrok esa obyektning ongdagi yaxlit obrazi. Xaritada idrokning to‘rt xususiyati va sezgining uch turi berilgan.',
            root: {
                cat: 'Bilish jarayonlari',
                title: 'IDROK',
                sub: 'Narsa va hodisalarning yaxlit obrazi',
                desc: 'Idrok — sezgi a’zolarimizga bevosita ta’sir etib turgan narsa va hodisalarning ongimizda yaxlit obraz sifatida aks etishidir.',
                example: 'Qorong‘i xonada ham oq qog‘ozni oq deb idrok etishimiz idrokning doimiylik (konstantlik) xususiyatidir.'
            },
            branches: [
                {
                    node: {
                        cat: 'Idrok qonuniyatlari', theme: 'amber', icon: 'fa-sliders',
                        title: 'IDROK XUSUSIYATLARI',
                        sub: 'Yaxlitlik, predmetlilik, doimiylik, tanlovchanlik',
                        desc: 'Idrok obrazining sifatini belgilovchi to‘rt asosiy xususiyat mavjud. Ular birgalikda biz ko‘rayotgan narsani to‘g‘ri va barqaror tanib olishimizni ta’minlaydi.',
                        example: 'Notanish shaklni ham avval yaxlit ko‘ramiz, keyin uni aniq bir buyumga bog‘laymiz.'
                    },
                    children: [
                        { cat: 'Xususiyat', title: 'Yaxlitlik', sub: 'Qismlardan butun obraz', desc: 'Obyektning alohida qismlarini bir butun obraz holida ko‘rish.' },
                        { cat: 'Xususiyat', title: 'Predmetlilik', sub: 'Obrazni aniq buyumga bog‘lash', desc: 'Olingan tasvirni tashqi olamdagi aniq bir buyumga bog‘lash.' },
                        { cat: 'Xususiyat', title: 'Doimiylik (Konstantlik)', sub: 'Rang va shakl barqarorligi', desc: 'Yorug‘lik yoki masofa o‘zgarsa ham buyum rangi va shaklini o‘zgarmas deb bilish.' },
                        { cat: 'Xususiyat', title: 'Tanlovchanlik', sub: 'Kerakli obyektni ajratish', desc: 'Ko‘plab obyektlar orasidan aynan bizga keraklisini ajratib olish.' }
                    ]
                },
                {
                    node: {
                        cat: 'Bilishning ilk bosqichi', theme: 'emerald', icon: 'fa-hand-sparkles',
                        title: 'SEZGI',
                        sub: 'Interoreseptiv, proprioreseptiv, eksteroreseptiv',
                        desc: 'Sezgi — tashqi va ichki muhit qo‘zg‘atuvchilarining alohida xossalarini aks ettiruvchi eng sodda psixik jarayon (Ch. Sherrington tasnifi).',
                        example: 'Ko‘zni yumgan holda qo‘lingiz qay holatda turganini sezishingiz proprioreseptiv retseptorlar ishidir.'
                    },
                    children: [
                        { cat: 'Retseptor turi', title: 'Interoreseptiv sezgilar', sub: 'Ichki a’zolardan signallar', desc: 'Ichki a’zolardan keluvchi signallar (ochlik, tashnalik, og‘riq).' },
                        { cat: 'Retseptor turi', title: 'Proprioreseptiv sezgilar', sub: 'Tana holati va muvozanat', desc: 'Tana holati, mushak harakati va muvozanatni bildiruvchi sezgilar.' },
                        { cat: 'Retseptor turi', title: 'Eksteroreseptiv sezgilar', sub: 'Tashqi dunyo sezgilari', desc: 'Tashqi dunyoni aks ettiruvchi 5 sezgi (ko‘rish, eshitish, hid, ta’m, teri).' }
                    ]
                }
            ],
            related: [
                { to: 'diqqat', label: 'Diqqat' },
                { to: 'xotira', label: 'Xotira' }
            ]
        },

        /* -------------------- 4. XOTIRA -------------------- */
        {
            id: 'xotira', no: 4, group: 0,
            title: 'Xotira',
            short: 'Turlari va jarayonlari',
            icon: 'fa-database', theme: 'emerald',
            summary: 'Xotiraning to‘rt turi (hissiy, harakat, obrazli, so‘z-mantiq) va to‘rt jarayoni (esda olib qolish, saqlash, esga tushirish, unutish).',
            root: {
                cat: 'Bilish jarayonlari',
                title: 'XOTIRA',
                sub: 'Tajribani esda olib qolish va saqlash tizimi',
                desc: 'Xotira — o‘tmish tajribamizni esda olib qolish, esda saqlash, qayta esga tushirish va unutishdan iborat murakkab kognitiv tizim.',
                example: 'Yillar o‘tib ham suzishni unutmaslik — harakat xotirasi; bolalikdagi sevimli kuy eshitilganda iliqlik tuyish — hissiy xotiradir.'
            },
            branches: [
                {
                    node: {
                        cat: 'Klassifikatsiya', theme: 'sky', icon: 'fa-layer-group',
                        title: 'XOTIRA TURLARI',
                        sub: 'Hissiy, harakat, obrazli va so‘z-mantiq',
                        desc: 'Xotira saqlanayotgan material xususiyatiga qarab to‘rt turga ajratiladi. Har bir tur inson faoliyatining ma’lum sohasini ta’minlaydi.',
                        example: 'Bir insonda bir necha xotira turi bir vaqtda ishlaydi: sportchi harakatni, rassom obrazni, olim esa so‘z-mantiqiy bog‘liqlikni yaxshiroq eslaydi.'
                    },
                    children: [
                        { cat: 'Xotira turi', title: 'Hissiy (emotsional) xotira', sub: 'Tuyg‘ularni esda saqlash', desc: 'Boshdan kechirilgan tuyg‘ular, quvonch yoki hayajonni esda saqlash.' },
                        { cat: 'Xotira turi', title: 'Harakat (motor) xotirasi', sub: 'Ko‘nikma va malakalar', desc: 'Velosiped haydash, yozish, sport va kasbiy ko‘nikmalarni eslab qolish.' },
                        { cat: 'Xotira turi', title: 'Obrazli xotira', sub: 'Sezgi obrazlari', desc: 'Ko‘rish, eshitish, hid va ta’m obrazlarini xotirada saqlash.' },
                        { cat: 'Xotira turi', title: 'So‘z-mantiq xotirasi', sub: 'Fikr va qoidalar', desc: 'Fikrlar, formulalar, qoidalar va mantiqiy bog‘liqliklarni eslab qolish.' }
                    ]
                },
                {
                    node: {
                        cat: 'Dinamikasi', theme: 'amber', icon: 'fa-arrows-rotate',
                        title: 'XOTIRA JARAYONLARI',
                        sub: 'Esda olib qolish → saqlash → esga tushirish → unutish',
                        desc: 'Xotira bir tekis saqlash emas, ketma-ket kechadigan jarayonlardan iborat: axborot qabul qilinadi, mustahkamlanadi, kerak bo‘lganda qaytariladi va ishlatilmasa unutiladi.',
                        example: 'Imtihon oldidan materialni takrorlash esda olib qolishni mustahkamlaydi, imtihondan keyin esa ko‘p qismi unutiladi.'
                    },
                    children: [
                        { cat: 'Jarayon', title: 'Esda olib qolish', sub: 'Yangi axborotni qabul qilish', desc: 'Yangi axborotni ongga qabul qilib, mustahkamlash — xotiraning birinchi bosqichi.' },
                        { cat: 'Jarayon', title: 'Esda saqlash', sub: 'Axborotni ushlab turish', desc: 'Ma’lumotni xotirada uzoq muddat ushlab turish va kerak paytda faol holatda saqlash.' },
                        { cat: 'Jarayon', title: 'Qayta esga tushirish', sub: 'Kerakli ma’lumotni qaytarish', desc: 'Kerakli ma’lumotni ongga qaytarish — eslash yoki tanlab esga tushirish shaklida kechadi.' },
                        { cat: 'Jarayon', title: 'Unutish', sub: 'Axborotning chiqib ketishi', desc: 'Keraksiz yoki uzoq ishlatilmagan axborotning xotiradan chiqib ketishi.' }
                    ]
                }
            ],
            related: [
                { to: 'tafakkur', label: 'Tafakkur' },
                { to: 'idrok', label: 'Sezgi va idrok' }
            ]
        },

        /* -------------------- 5. TAFAKKUR -------------------- */
        {
            id: 'tafakkur', no: 5, group: 0,
            title: 'Tafakkur',
            short: 'Shakllari va xulosa chiqarish yo‘llari',
            icon: 'fa-lightbulb', theme: 'purple',
            summary: 'Tafakkur — voqelikning muhim bog‘lanishlarini umumlashtirib aks ettiruvchi oliy bilish jarayoni. Uning uch shakli va xulosa chiqarish yo‘llari.',
            root: {
                cat: 'Oliy bilish jarayoni',
                title: 'TAFAKKUR',
                sub: 'Umumlashtirilgan va bilvosita bilish',
                desc: 'Tafakkur — voqelikdagi narsa va hodisalar o‘rtasidagi muhim, ichki bog‘lanishlarni umumlashtirilgan va bilvosita aks ettiruvchi oliy bilish jarayonidir.',
                example: '«Barcha metallar elektr tokini o‘tkazadi» (hukm) + «Mis — metall» (hukm) → «Demak, mis elektr tokini o‘tkazadi» (xulosa).'
            },
            branches: [
                {
                    node: {
                        cat: 'Mantiqiy shakllar', theme: 'amber', icon: 'fa-shapes',
                        title: 'TAFAKKUR SHAKLLARI',
                        sub: 'Tushuncha, hukm va xulosa chiqarish',
                        desc: 'Tafakkur uch asosiy mantiqiy shaklda namoyon bo‘ladi: tushuncha (belgilar umumlashmasi), hukm (bog‘lanishni tasdiqlash yoki inkor etish) va xulosa (yangi bilim hosil qilish).',
                        example: '«Metall» tushunchasi + «mis — metall» hukmi → yangi xulosa.'
                    },
                    children: [
                        { cat: 'Shakl', title: 'Tushuncha', sub: 'Umumiy va muhim belgilar', desc: 'Predmetlarning eng muhim va umumiy belgilarini aks ettiruvchi fikr shakli.' },
                        { cat: 'Shakl', title: 'Hukm', sub: 'Tasdiq yoki inkor', desc: 'Narsalar o‘rtasidagi bog‘liqlikni tasdiqlovchi yoki inkor etuvchi fikr.' },
                        { cat: 'Shakl', title: 'Xulosa chiqarish', sub: 'Yangi mantiqiy bilim', desc: 'Bir nechta hukmlardan yangi mantiqiy bilim hosil qilish.' }
                    ]
                },
                {
                    node: {
                        cat: 'Mantiqiy yo‘llar', theme: 'emerald', icon: 'fa-arrow-right-arrow-left',
                        title: 'XULOSA CHIQARISH YO‘LLARI',
                        sub: 'Induksiya va deduksiya',
                        desc: 'Xulosa chiqarishning ikki asosiy yo‘li bor: xususiy hollardan umumiy qoidaga borish (induksiya) va umumiy qoidadan xususiy holatni aniqlash (deduksiya).',
                        example: 'Har bir o‘lchangan metall tok o‘tkazdi (induksiya) → qoidaga asoslanib yangi metall haqida xulosa (deduksiya).'
                    },
                    children: [
                        { cat: 'Yo‘l', title: 'Induksiya', sub: 'Xususiydan umumiyga', desc: 'Bir nechta xususiy holatdagi kuzatishlardan umumiy qoida va xulosa hosil qilish.' },
                        { cat: 'Yo‘l', title: 'Deduksiya', sub: 'Umumiydan xususiyga', desc: 'Umumiy qoida yoki hukmga tayanib, aniq bir xususiy holat haqida xulosa chiqarish.' }
                    ]
                }
            ],
            related: [
                { to: 'xotira', label: 'Xotira' },
                { to: 'xayol', label: 'Xayol' }
            ]
        },

        /* -------------------- 6. XAYOL -------------------- */
        {
            id: 'xayol', no: 6, group: 0,
            title: 'Xayol',
            short: 'Turlari va ta’sir yo‘nalishlari',
            icon: 'fa-cloud-sun', theme: 'purple',
            summary: 'Xayol — o‘tmish tasavvurlarni qayta ishlash asosida yangi obrazlar yaratish jarayoni. Uning to‘rt turi va hissiy ta’sir yo‘nalishlari.',
            root: {
                cat: 'Bilish jarayonlari',
                title: 'XAYOL VA UNING TURLARI',
                sub: 'Yangi obrazlar yaratish psixik jarayoni',
                desc: 'Xayol — o‘tmish tajribada idrok etilgan tasavvurlarni qayta ishlash asosida ilgari ko‘rilmagan yangi obrazlar, g‘oyalar va kelajak modellarini yaratish jarayonidir.',
                example: 'Kitob o‘qiyotganingizda yozuvchi tasvirlagan qahramon qiyofasini ko‘z oldingizga keltirishingiz — qayta tiklovchi xayoldir.'
            },
            branches: [
                {
                    node: {
                        cat: 'Klassifikatsiya', theme: 'sky', icon: 'fa-images',
                        title: 'XAYOL TURLARI',
                        sub: 'Ixtiyoriy, ixtiyorsiz, qayta tiklovchi, ijodiy',
                        desc: 'Xayol ong nazorati va obrazning yangilik darajasiga qarab to‘rt turga ajratiladi.',
                        example: 'Me’mor chizgan loyiha — ixtiyoriy va ijodiy xayolning birgalikdagi mahsuli.'
                    },
                    children: [
                        { cat: 'Xayol turi', title: 'Ixtiyoriy xayol', sub: 'Maqsad asosida obraz yaratish', desc: 'Oldindan qo‘yilgan maqsad asosida ongli ravishda obraz yaratish (masalan, me’mor loyihasi).' },
                        { cat: 'Xayol turi', title: 'Ixtiyorsiz xayol', sub: 'Ong nazoratisiz kechadi', desc: 'Ong nazoratisiz, tush ko‘rish yoki beixtiyor xayol surishda yuzaga keladi.' },
                        { cat: 'Xayol turi', title: 'Qayta tiklovchi xayol', sub: 'Tasvirga qarab obraz hosil qilish', desc: 'Chizma, xarita yoki badiiy tasvirga qarab ongda obrazni gavdalantirish.' },
                        { cat: 'Xayol turi', title: 'Ijodiy xayol', sub: 'Original obraz yaratish', desc: 'Mutlaqo yangi, original kashfiyot va san’at asarlarini yaratish.' }
                    ]
                },
                {
                    node: {
                        cat: 'Xayolning hissiy rangi', theme: 'amber', icon: 'fa-arrows-split-up-and-left',
                        title: 'TA’SIR YO‘NALISHLARI',
                        sub: 'Ijobiy, salbiy va neytral xayollar',
                        desc: 'Xayol obrazlari insonning hissiy holati va motivatsiyasiga qarab uch xil ta’sir kuchiga ega bo‘ladi.',
                        example: 'Sportchining musobaqadan oldin g‘alaba qozonishini tasavvur qilishi (vizualizatsiya) — ijobiy xayolning amaliy kuchidir.'
                    },
                    children: [
                        { cat: 'Yo‘nalish', title: 'Ijobiy (Konstruktiv)', sub: 'Harakatga undovchi xayollar', desc: 'Insonni harakatga undovchi, ilhom beruvchi orzu va rejalar.' },
                        { cat: 'Yo‘nalish', title: 'Salbiy (Destruktiv)', sub: 'Xavotir va qo‘rquv', desc: 'Asossiz xavotir, qo‘rquv va pessimizm uyg‘otuvchi xayollar.' },
                        { cat: 'Yo‘nalish', title: 'Neytral xayol', sub: 'Kuchli hissiyotsiz tasavvurlar', desc: 'Kuchli hissiyot uyg‘otmaydigan kundalik texnik tasavvurlar.' }
                    ]
                }
            ],
            related: [
                { to: 'tafakkur', label: 'Tafakkur' },
                { to: 'faoliyat', label: 'Faoliyat va motivatsiya' }
            ]
        },

        /* -------------------- 7. MULOQOT -------------------- */
        {
            id: 'muloqot', no: 7, group: 0,
            title: 'Muloqot',
            short: 'Kommunikativ, interaktiv, perseptiv tomonlar',
            icon: 'fa-comments', theme: 'emerald',
            summary: 'Muloqot — axborot almashish, o‘zaro ta’sir va bir-birini tushunishdan iborat ko‘p qirrali ijtimoiy-psixologik jarayon. Uning uch tomoni.',
            root: {
                cat: 'Ijtimoiy psixologiya',
                title: 'MULOQOT TOMONLARI',
                sub: 'Kommunikativ, interaktiv va perseptiv',
                desc: 'Muloqot — kamida ikki kishining o‘zaro axborot almashishi, bir-biriga ta’sir ko‘rsatishi va bir-birini tushunishidan iborat ko‘p qirrali ijtimoiy-psixologik jarayon.',
                items: [
                    ['Kommunikativ tomoni', 'Insonlar o‘rtasida bilim, g‘oya, fikr va hissiy axborot almashinuvi (verbal va noverbal).'],
                    ['Interaktiv tomoni', 'Muloqot ishtirokchilarining birgalikdagi harakatlari va o‘zaro ta’siri (hamkorlik yoki raqobat).'],
                    ['Perseptiv tomoni', 'Muloqot jarayonida odamlarning bir-birini idrok etishi, tushunishi (empatiya, refleksiya).']
                ],
                example: 'Suhbatdoshning so‘zlariga quloq solish (kommunikativ), uning yuz ifodasidan kayfiyatini anglash (perseptiv) va birga qaror qabul qilish (interaktiv).'
            },
            branches: [
                {
                    node: {
                        cat: 'Axborot almashinuvi', theme: 'sky', icon: 'fa-comment-dots',
                        title: 'KOMMUNIKATIV TOMON',
                        sub: 'Bilim, fikr va hissiy axborot almashinuvi',
                        desc: 'Muloqotning kommunikativ tomoni — insonlar o‘rtasida bilim, g‘oya, fikr va hissiy axborot almashinuvi. U verbal va noverbal kanallar orqali kechadi.',
                        example: 'Bir gapni aytish bilan birga ohang va imo-ishora orqali unga qo‘shimcha ma’no yuklashimiz tabiiy hol.'
                    },
                    children: [
                        { cat: 'Kanal', title: 'Verbal muloqot', sub: 'Nutq orqali axborot', desc: 'So‘z va nutq orqali bilim, fikr va hissiy axborot almashinuvi.' },
                        { cat: 'Kanal', title: 'Noverbal muloqot', sub: 'Mimika, imo-ishora, ohang', desc: 'So‘zsiz vositalar — mimika, imo-ishora, qarash, ovoz ohangi orqali axborot uzatish.' }
                    ]
                },
                {
                    node: {
                        cat: 'O‘zaro ta’sir', theme: 'amber', icon: 'fa-people-group',
                        title: 'INTERAKTIV TOMON',
                        sub: 'Birgalikdagi harakatlar va ta’sir',
                        desc: 'Muloqotning interaktiv tomoni — ishtirokchilarning birgalikdagi harakatlari va o‘zaro ta’siri. U hamkorlik yoki raqobat shaklida kechadi.',
                        example: 'Guruh loyihasida kimningdir tashabbusni olishi va boshqalarning qo‘llab-quvvatlashi — interaktiv ta’sirning kundalik ko‘rinishi.'
                    },
                    children: [
                        { cat: 'Shakl', title: 'Hamkorlik', sub: 'Umumiy maqsad sari birga', desc: 'Ishtirokchilarning umumiy maqsad yo‘lida kuch va resurslarini birlashtirishi.' },
                        { cat: 'Shakl', title: 'Raqobat', sub: 'Manfaatlar to‘qnashuvi', desc: 'Ishtirokchilarning o‘z manfaatini ustun qo‘yishga intilishi natijasida yuzaga keladigan o‘zaro ta’sir.' }
                    ]
                },
                {
                    node: {
                        cat: 'Bir-birini tushunish', theme: 'purple', icon: 'fa-heart-circle-check',
                        title: 'PERSEPTIV TOMON',
                        sub: 'Idrok etish, tushunish, baholash',
                        desc: 'Muloqotning perseptiv tomoni — jarayonda odamlarning bir-birini idrok etishi va tushunishi. Uning asosiy mexanizmlari empatiya va refleksiyadir.',
                        example: 'Suhbatdoshning yuz ifodasidan uning charchaganini sezish — perseptiv idrokning natijasi.'
                    },
                    children: [
                        { cat: 'Mexanizm', title: 'Empatiya', sub: 'Boshqaning holatini his qilish', desc: 'Boshqa insonning ichki holatini uning o‘rniga o‘zini qo‘yib his qilish.' },
                        { cat: 'Mexanizm', title: 'Refleksiya', sub: 'O‘zini tashqaridan ko‘rish', desc: 'O‘z xatti-harakati va fikrlarini boshqa kishi nazari bilan anglab yetish.' }
                    ]
                }
            ],
            related: [
                { to: 'shaxs', label: 'Shaxs xususiyatlari' },
                { to: 'eq', label: 'Emotsional intellekt' }
            ]
        },

        /* -------------------- 8. FAOLIYAT VA MOTIVATSIYA -------------------- */
        {
            id: 'faoliyat', no: 8, group: 0,
            title: 'Faoliyat va motivatsiya',
            short: 'Ehtiyojdan harakatgacha; motiv turlari',
            icon: 'fa-person-running', theme: 'emerald',
            summary: 'Faoliyat — ongli maqsad bilan boshqariladigan faollik. Uning tuzilishi: ehtiyoj → motiv → maqsad → harakat; motivatsiya esa ichki va tashqi bo‘ladi.',
            root: {
                cat: 'Shaxs faolligi',
                title: 'FAOLIYAT TUZILISHI',
                sub: 'Ehtiyoj → Motiv → Maqsad → Harakat',
                desc: 'Faoliyat — insonning ongli maqsad bilan boshqariladigan, tashqi olamni va o‘zini o‘zgartirishga qaratilgan faollik shaklidir (A.N. Leontyev nazariyasi).',
                example: 'Bilim olish ehtiyoji → Yetuk mutaxassis bo‘lish motivi → Universitetga kirish maqsadi → Har kuni dars tayyorlash harakati.'
            },
            branches: [
                {
                    node: {
                        cat: 'Tuzilish', theme: 'sky', icon: 'fa-stairs',
                        title: 'FAOLIYAT BOSQICHLARI',
                        sub: 'Ehtiyoj, motiv, maqsad, harakat',
                        desc: 'Har qanday faoliyat ketma-ket bosqichlardan o‘tadi: ehtiyoj seziladi, motiv shakllanadi, maqsad belgilanadi va harakatlar orqali natijaga erishiladi.',
                        example: 'Ochlik hissi (ehtiyoj) → ovqatlanish istagi (motiv) → tushlik tayyorlash (maqsad) → amaliy harakatlar.'
                    },
                    children: [
                        { cat: 'Bosqich', title: 'Ehtiyoj', sub: 'Yetishmovchilik hissi', desc: 'Organizm va shaxsning yashashi hamda rivojlanishi uchun zarur bo‘lgan yetishmovchilik.' },
                        { cat: 'Bosqich', title: 'Motiv', sub: 'Ichki turtki', desc: 'Ehtiyojni qondirishga undovchi ichki turtki — «nima uchun?» degan savolga javob.' },
                        { cat: 'Bosqich', title: 'Maqsad', sub: 'Kutilayotgan natija obrazi', desc: 'Kutilayotgan natijaning ongda oldindan modellashtirilgan obrazi.' },
                        { cat: 'Bosqich', title: 'Harakat va operatsiya', sub: 'Amaliy qadamlar', desc: 'Maqsadga erishish yo‘lidagi amaliy qadamlar va ularni bajarish usullari.' }
                    ]
                },
                {
                    node: {
                        cat: 'Harakatlantiruvchi kuch', theme: 'amber', icon: 'fa-fire',
                        title: 'MOTIVATSIYA',
                        sub: 'Ichki va tashqi motiv turlari',
                        desc: 'Motivatsiya — inson xulq-atvorini yo‘naltiruvchi, quvvatlantiruvchi va qo‘llab-quvvatlovchi motivlar majmuidir.',
                        example: 'Kitobni imtihon uchun o‘qish — tashqi motiv; dunyoqarashni kengaytirish va zavq uchun o‘qish — ichki motivdir.'
                    },
                    children: [
                        { cat: 'Motiv turi', title: 'Ichki motiv (Intrinsik)', sub: 'Jarayonning o‘zidan zavq', desc: 'Jarayonning o‘zidan zavqlanish, qiziquvchanlik va o‘zini rivojlantirish istagi.' },
                        { cat: 'Motiv turi', title: 'Tashqi motiv (Ekstrinsik)', sub: 'Mukofot yoki jazodan qochish', desc: 'Mukofot, baho, obro‘ olish yoki jazodan qochishga asoslangan turtki.' }
                    ]
                }
            ],
            related: [
                { to: 'xayol', label: 'Xayol' },
                { to: 'shaxs', label: 'Shaxs xususiyatlari' }
            ]
        },

        /* -------------------- 9. SHAXS XUSUSIYATLARI -------------------- */
        {
            id: 'shaxs', no: 9, group: 0,
            title: 'Shaxs xususiyatlari',
            short: 'Temperament, xarakter, qobiliyat, qiziqish',
            icon: 'fa-user-astronaut', theme: 'amber',
            summary: 'Insonni boshqalardan ajratib turuvchi barqaror psixologik belgilar: temperament, xarakter, qobiliyat va qiziqish.',
            root: {
                cat: 'Differensial psixologiya',
                title: 'SHAXS XUSUSIYATLARI',
                sub: 'Xarakter, Temperament, Qobiliyat, Qiziqish',
                desc: 'Har bir insonni boshqalardan ajratib turuvchi barqaror psixologik belgilar tizimi shaxsning individual-tipologik xususiyatlarini tashkil etadi.',
                items: [
                    ['Temperament', 'Oliy nerv faoliyatining tug‘ma dinamik xususiyatlari (tezlik, kuch, muvozanat).'],
                    ['Xarakter', 'Hayot davomida shakllanadigan, insonning borliqqa va o‘ziga munosabatini bildiruvchi sifatlar.'],
                    ['Qobiliyat', 'Muayyan faoliyatni muvaffaqiyatli egallash imkonini beruvchi individual xususiyatlar.'],
                    ['Qiziqish', 'Shaxsning ma’lum bir sohani bilishga bo‘lgan hissiy-kognitiv intilishi.']
                ],
                example: 'Temperament — avtomobil dvigatelining quvvati va tezligi bo‘lsa, Xarakter — haydovchining qayerga va qanday boshqarishidir.'
            },
            branches: [
                {
                    node: {
                        cat: 'Tug‘ma dinamik asos', theme: 'indigo', icon: 'fa-masks-theater',
                        title: 'TEMPERAMENT',
                        sub: 'Psixik faoliyatning sur’ati va intensivligi',
                        desc: 'Temperament — oliy nerv faoliyatining tug‘ma dinamik xususiyatlari (tezlik, kuch, muvozanat). U insonning «nima» qilishini emas, «qanday» qilishini belgilaydi. Batafsil: temperament nazariyalari, xususiyatlari va turlari mavzularida.',
                        items: [
                            ['Biologik asos', 'ONF va asab tizimining tug‘ma xususiyatlariga tayanadi.'],
                            ['Yaxshi yoki yomon tip yo‘q', 'Har bir temperamentning kuchli tomonlari va moslashuv imkoniyatlari bor.']
                        ],
                        example: 'Bir xil tanbehga Xolerik jahldorlik bilan, Sangvinik hazil bilan, Flegmatik xotirjamlik bilan, Melanxolik esa chuqur xafa bo‘lish bilan javob beradi.'
                    },
                    children: []
                },
                {
                    node: {
                        cat: 'Ijtimoiy shakllangan sifatlar', theme: 'emerald', icon: 'fa-compass',
                        title: 'XARAKTER',
                        sub: 'Borliqqa va o‘ziga munosabat',
                        desc: 'Xarakter — hayot davomida shakllanadigan, insonning borliqqa va o‘ziga munosabatini bildiruvchi barqaror sifatlar tizimi. Tarbiya va o‘z ustida ishlash orqali o‘zgaradi.',
                        example: 'Xolerik temperamentli ikki kishidan biri tarbiya tufayli adolatparvar bo‘lsa, ikkinchisi janjalkash bo‘lishi mumkin — temperament bir xil, xarakter turlicha.'
                    },
                    children: []
                },
                {
                    node: {
                        cat: 'Imkoniyatlar tizimi', theme: 'sky', icon: 'fa-gem',
                        title: 'QOBILIYAT',
                        sub: 'Faoliyatni egallash imkoniyati',
                        desc: 'Qobiliyat — muayyan faoliyatni muvaffaqiyatli egallash imkonini beruvchi individual psixologik xususiyatlar. U tug‘ma moyillik va faoliyat tajribasi asosida rivojlanadi.',
                        example: 'Musiqa darslarida bir xil sharoitda bir o‘quvchi tezroq, ikkinchisi sekinroq o‘zlashtirsa — bu qobiliyatdagi farqdir.'
                    },
                    children: []
                },
                {
                    node: {
                        cat: 'Yo‘naltiruvchi omil', theme: 'purple', icon: 'fa-star',
                        title: 'QIZIQISH',
                        sub: 'Bilishga intilish',
                        desc: 'Qiziqish — shaxsning ma’lum bir sohani bilishga bo‘lgan hissiy-kognitiv intilishi. U faoliyat tanlashga va bilim olishga undaydi.',
                        example: 'Astronomiyaga qiziqqan o‘quvchi qo‘shimcha kitob va hujjatli filmlarni o‘zi izlab topadi.'
                    },
                    children: []
                }
            ],
            related: [
                { to: 'temperament-turlari', label: 'Temperament turlari' },
                { to: 'temperament-xususiyatlari', label: 'Temperament xususiyatlari' },
                { to: 'eq', label: 'Emotsional intellekt' }
            ]
        },

        /* -------------------- 10. EMOTSIONAL INTELLEKT -------------------- */
        {
            id: 'eq', no: 10, group: 0,
            title: 'Emotsional intellekt (EQ)',
            short: 'Hissiyotlarni anglash va boshqarish',
            icon: 'fa-heart-pulse', theme: 'purple',
            summary: 'Zamonaviy psixologiyada muvaffaqiyat uchun IQ bilan birga EQ — o‘z va o‘zgalar hissiyotlarini tushunish hamda boshqarish qobiliyati ham muhim.',
            root: {
                cat: 'Zamonaviy psixologiya',
                title: 'EMOTSIONAL INTELLEKT (EQ)',
                sub: 'Hissiyotlarni anglash va boshqarish san’ati',
                desc: 'Zamonaviy psixologiyada (D. Goleman) inson muvaffaqiyati uchun IQ (aql koeffitsienti) bilan birga EQ — o‘z va o‘zgalar hissiyotlarini tushunish va boshqarish qobiliyati hal qiluvchi ahamiyatga ega.',
                example: 'Tanqid eshitganda darhol xafa bo‘lish o‘rniga, undan o‘sish uchun foydali ma’lumot ajratib olish — yuqori EQ belgisidir.'
            },
            branches: [
                {
                    node: {
                        cat: 'EQ tarkibi', theme: 'sky', icon: 'fa-face-smile',
                        title: 'O‘Z-O‘ZINI ANGLASH',
                        sub: 'Hissiyotni aniq bilish',
                        desc: 'Ayni damda qanday hissiyotni boshdan kechirayotganini aniq bilish — emotsional intellektning birinchi mezoni.',
                        example: 'Muhim suhbat oldidan «hozir xavotirda ekanman» deb aytish qo‘rquvni boshqarishning birinchi qadamidir.'
                    },
                    children: []
                },
                {
                    node: {
                        cat: 'EQ tarkibi', theme: 'amber', icon: 'fa-hand-holding-heart',
                        title: 'EMPATIYA',
                        sub: 'Boshqaning holatini his qilish',
                        desc: 'Boshqa insonning ichki holatini uning o‘rniga o‘zini qo‘yib his qilish.',
                        example: 'Do‘stingizning ohangidanoq uning xafa ekanini sezish va to‘g‘ri tasalli so‘zlarini topish.'
                    },
                    children: []
                },
                {
                    node: {
                        cat: 'EQ tarkibi', theme: 'emerald', icon: 'fa-arrows-rotate',
                        title: 'KOGNITIV QAYTA BAHOLASH',
                        sub: 'Vaziyatga boshqa rakursdan qarash',
                        desc: 'Stressli vaziyatga boshqa rakursdan qarab xotirjamlikni saqlash.',
                        example: 'Reys kechikishini «yo‘qolgan vaqt» emas, «dam olish uchun imkoniyat» deb baholash.'
                    },
                    children: []
                }
            ],
            related: [
                { to: 'muloqot', label: 'Muloqot' },
                { to: 'shaxs', label: 'Shaxs xususiyatlari' }
            ]
        },

        /* -------------------- 11. TEMPERAMENT NAZARIYALARI -------------------- */
        {
            id: 'temperament-nazariyalari', no: 11, group: 1,
            title: 'Temperament nazariyalari',
            short: 'Gumoral, konstitutsion, neyrodinamik asoslar',
            icon: 'fa-landmark', theme: 'indigo',
            summary: 'Temperamentning kelib chiqishini tushuntiruvchi uch yondashuv: organizm suyuqliklari (gumoral), tana tuzilishi (konstitutsion) va asab tizimi xususiyatlari (neyrodinamik).',
            root: {
                cat: 'Markaziy tushuncha',
                title: 'TEMPERAMENT (MIJOZ)',
                sub: 'Lotincha «temperamentum» — aralashma, mutanosiblik',
                desc: 'Temperament — inson psixik faoliyatining dinamik (tezlik, sur’at, ritm, intensivlik) va emotsional (qo‘zg‘aluvchanlik, ta’sirchanlik) tomonlarini xarakterlovchi tug‘ma, barqaror individual xususiyatlar majmuidir.',
                items: [
                    ['Biologik asos', 'Oliy nerv faoliyati (ONF) va asab tizimining tug‘ma xususiyatlariga tayanadi.'],
                    ['Dinamik tavsif', 'Insonning «nima» qilishini emas, balki «qanday» (qanday tezlik va kuch bilan) qilishini belgilaydi.'],
                    ['Yaxshi yoki yomon tip yo‘q', 'Har bir temperamentning o‘ziga xos kuchli tomonlari va moslashuv imkoniyatlari mavjud.']
                ],
                extra: 'Tabiatda 100% «sof» bitta temperament kam uchraydi. Odatda insonda bitta yetakchi va 1-2 ta qo‘shimcha (aralash) tip uyg‘unlashgan bo‘ladi.',
                example: 'Ikki talaba bir xil matematik masalani to‘g‘ri yechadi: biri uni 2 daqiqada jo‘shqinlik bilan, ikkinchisi 10 daqiqada shoshmasdan, chuqur mulohaza bilan hal qiladi — bu ularning temperament farqidir.'
            },
            branches: [
                {
                    node: {
                        cat: 'Gumoral nazariya', theme: 'amber', icon: 'fa-flask',
                        title: 'GIPPOKRAT VA GALEN',
                        sub: 'Organizmdagi 4 xil hayotiy suyuqlik nisbati',
                        desc: 'Qadimgi yunon tabibi Gippokrat inson organizmida 4 xil suyuqlik mavjudligini aytgan, rimlik shifokor Galen esa qaysi suyuqlik ustunligiga qarab 4 temperament nomini fanga kiritgan.',
                        example: 'Gippokrat nomi bilan atalgan bu 4 atama (Sangvinik, Xolerik, Flegmatik, Melanxolik) 2500 yildan beri psixologiyada o‘z nomini saqlab kelmoqda.'
                    },
                    children: [
                        { cat: 'Suyuqlik', title: 'Sanguis (Qon) → Sangvinik', sub: 'Faol, quvnoq, harakatchan', desc: 'Yurakdan chiqadigan issiq qon ustunligi — faol, quvnoq va harakatchan tip.' },
                        { cat: 'Suyuqlik', title: 'Chole (Sariq safro) → Xolerik', sub: 'Qizishuvchan, shiddatli', desc: 'Jigarda ishlanadigan o‘t suyuqligi — qizishuvchan, tezkor, shiddatli tip.' },
                        { cat: 'Suyuqlik', title: 'Phlegma (Balg‘am) → Flegmatik', sub: 'Bosiq, vazmin, sustkash', desc: 'Miyada hosil bo‘ladigan sovuq suyuqlik — bosiq, vazmin, sustkash tip.' },
                        { cat: 'Suyuqlik', title: 'Melaina chole → Melanxolik', sub: 'Ta’sirchan, xavotirli', desc: 'Taloqda to‘planadigan quyuq suyuqlik — g‘amgin, ta’sirchan, xavotirli tip.' }
                    ]
                },
                {
                    node: {
                        cat: 'Neyrofiziologik asos', theme: 'sky', icon: 'fa-brain',
                        title: 'I.P. PAVLOVNING ONF TIPLARI',
                        sub: 'Qo‘zg‘alish va tormozlanishning 3 xossasi',
                        desc: 'Akademik I.P. Pavlov temperamentning haqiqiy fiziologik asosi bosh miya po‘stlog‘idagi qo‘zg‘alish va tormozlanish jarayonlarining 3 ta xususiyati (kuchi, muvozanati, harakatchanligi) ekanligini kashf etdi.',
                        example: 'Xolerikda «gaz» (qo‘zg‘alish) pedali kuchli, ammo «tormoz» pedali zaifroq; Flegmatikda esa ikkalasi ham kuchli, lekin bir holatdan ikkinchisiga o‘tish sekin kechadi.'
                    },
                    children: [
                        { cat: 'ONF tipi', title: 'Kuchli, muvozanatli, harakatchan', sub: '«Chaqqon» → Sangvinik', desc: 'Asab jarayonlari kuchli, muvozanatli va harakatchan — Sangvinik temperamentiga mos keladi.' },
                        { cat: 'ONF tipi', title: 'Kuchli, muvozanatsiz', sub: '«Jo‘shqin» → Xolerik', desc: 'Qo‘zg‘alish tormozlanishdan ustun — Xolerik tipiga mos keladi.' },
                        { cat: 'ONF tipi', title: 'Kuchli, muvozanatli, sust', sub: '«Vazmin» → Flegmatik', desc: 'Asab jarayonlari sekin almashinadi — Flegmatik tipiga mos keladi.' },
                        { cat: 'ONF tipi', title: 'Kuchsiz tip', sub: '«Ta’sirchan» → Melanxolik', desc: 'Asab hujayralari tez charchaydi, ammo o‘ta sezgir — Melanxolik tipiga mos.' }
                    ]
                },
                {
                    node: {
                        cat: 'Konstitutsion nazariya', theme: 'emerald', icon: 'fa-person',
                        title: 'E. KRECHMER VA U. SHELDON',
                        sub: 'Tana tuzilishi (somatotip) va mijoz bog‘liqligi',
                        desc: 'Nemis psixiatri E. Krechmer va amerikalik psixolog U. Sheldon insonning tana tuzilishi (suyak, mushak va yog‘ qatlami nisbati) uning temperamentiga ta’sir qilishini ilgari surgan.',
                        example: 'Zamonaviy psixologiya bu nazariyani mutlaqlashtirmaydi, chunki tana tuzilishi tashqi ko‘rinish bo‘lsa, asab tizimi ichki neyrodinamik jarayondir.'
                    },
                    children: [
                        { cat: 'Somatotip', title: 'Piknik / Endomorf', sub: 'Kirishimli, kayfiyati tebranuvchan', desc: 'To‘lachadan kelgan tip — kirishimli, hazilkash, kayfiyati tebranuvchan (siklotimik).' },
                        { cat: 'Somatotip', title: 'Atletik / Mezomorf', sub: 'Dadil, energiyali, hukmron', desc: 'Mushakdor, baquvvat tip — dadil, energiyali, hukmronlikka moyil (somatotonik).' },
                        { cat: 'Somatotip', title: 'Astenik / Ektomorf', sub: 'Yopiq, sezgir, chuqur fikrlovchi', desc: 'Ingichka, baland bo‘yli tip — yopiq, sezgir, chuqur fikrlovchi, tortinchoq (shizotimik).' }
                    ]
                }
            ],
            related: [
                { to: 'temperament-xususiyatlari', label: 'Temperament xususiyatlari' },
                { to: 'temperament-turlari', label: 'Temperament turlari' }
            ]
        },

        /* -------------------- 12. TEMPERAMENT XUSUSIYATLARI -------------------- */
        {
            id: 'temperament-xususiyatlari', no: 12, group: 1,
            title: 'Temperament xususiyatlari',
            short: '7 mezon, ekstraversiya, plastiklik, xarakter',
            icon: 'fa-sliders', theme: 'sky',
            summary: 'Temperamentni baholash mezonlari (senzitivlik, reaktivlik, faollik), ekstraversiya–introversiya, plastiklik–rigidlik va temperamentning xarakterdan farqi.',
            root: {
                cat: 'Strukturaviy ko‘rsatkichlar',
                title: 'TEMPERAMENT XUSUSIYATLARI',
                sub: 'Har bir tipni o‘lchovchi 7 psixologik mezon',
                desc: 'Psixologiyada (V.S. Merlin, B.M. Teplov, Ya. Strelyau) inson temperamentini aniq baholash uchun 7 ta asosiy psixologik xususiyat ajratib ko‘rsatiladi.',
                items: [
                    ['1. Senzitivlik (Sezgirlik)', 'Psixik reaksiya yuzaga kelishi uchun zarur bo‘lgan eng kuchsiz tashqi ta’sir kuchi.'],
                    ['2. Reaktivlik', 'Tashqi yoki ichki ta’sirlarga beixtiyor beriladigan emotsional javob kuchi.'],
                    ['3. Faollik (Aktivlik)', 'Insonning tashqi olamga qanchalik g‘ayrat bilan ta’sir ko‘rsatishi va maqsadga intilishi.'],
                    ['4. Plastiklik va Rigidlik', 'O‘zgaruvchan sharoitga tez moslashish (plastiklik) yoki odatlarga qattiq yopishib olish (rigidlik).']
                ],
                example: 'Melanxolikda senzitivlik (nozik sezgirlik) juda yuqori bo‘lsa, Xolerikda reaktivlik va faollik eng yuqori darajada bo‘ladi.'
            },
            branches: [
                {
                    node: {
                        cat: 'Asosiy mezonlar', theme: 'emerald', icon: 'fa-gauge-high',
                        title: 'BAHOLASH MEZONLARI',
                        sub: 'Senzitivlik, reaktivlik, faollik',
                        desc: 'Temperamentni o‘lchashda eng ko‘p ishlatiladigan mezonlar: sezgirlik chegarasi, tashqi ta’sirga javob kuchi va insonning o‘z faolligi darajasi.',
                        example: 'Bir xil shovqin bir kishini chalg‘itmaydi, ikkinchisining ishini butunlay buzadi — bu senzitivlikdagi farq.'
                    },
                    children: [
                        { cat: 'Mezon', title: 'Senzitivlik (Sezgirlik)', sub: 'Eng kuchsiz ta’sir chegarasi', desc: 'Psixik reaksiya yuzaga kelishi uchun zarur bo‘lgan eng kuchsiz tashqi ta’sir kuchi.' },
                        { cat: 'Mezon', title: 'Reaktivlik', sub: 'Beixtiyor emotsional javob', desc: 'Tashqi yoki ichki ta’sirlarga beixtiyor beriladigan emotsional javob kuchi.' },
                        { cat: 'Mezon', title: 'Faollik (Aktivlik)', sub: 'Tashqi olamga ta’sir kuchi', desc: 'Insonning tashqi olamga qanchalik g‘ayrat bilan ta’sir ko‘rsatishi va maqsadga intilishi.' }
                    ]
                },
                {
                    node: {
                        cat: 'K. Yung va G. Ayzenk', theme: 'amber', icon: 'fa-arrows-left-right',
                        title: 'EKSTRAVERSIYA VA INTROVERSIYA',
                        sub: 'Psixik energiyaning yo‘nalish vektori',
                        desc: 'Shveysariyalik psixolog Karl Yung kiritgan va Gans Ayzenk rivojlantirgan tushunchalar: inson psixik energiyasi tashqi dunyoga (odamlarga) yoki ichki dunyoga (o‘z fikrlariga) qaratilganligi.',
                        example: 'Og‘ir ish kunidan keyin Ekstravert do‘stlari bilan uchrashib dam olsa, Introvert uyda yolg‘iz choy ichib o‘zini tiklaydi.'
                    },
                    children: [
                        { cat: 'Yo‘nalish', title: 'Ekstravert', sub: 'Sangvinik, Xolerik', desc: 'Energiyani tashqi muloqot, odamlar davrasi va faol harakatdan oladi.' },
                        { cat: 'Yo‘nalish', title: 'Introvert', sub: 'Flegmatik, Melanxolik', desc: 'Energiyani yolg‘izlik, sokinlik, kitoblar va ichki mulohazadan oladi.' },
                        { cat: 'Yo‘nalish', title: 'Ambivert', sub: 'O‘rta, muvozanatli holat', desc: 'Vaziyatga qarab ham muloqotga kirishuvchi, ham yolg‘izlikni qadrlovchi muvozanatli tip.' }
                    ]
                },
                {
                    node: {
                        cat: 'Moslashuvchanlik mezoni', theme: 'purple', icon: 'fa-rotate',
                        title: 'PLASTIKLIK VA RIGIDLIK',
                        sub: 'O‘zgarishga moslashish vs barqarorlik',
                        desc: 'Psixik jarayonlarning bir faoliyat turidan ikkinchisiga o‘tish tezligi va yangi sharoitlarga ko‘nikish darajasi.',
                        example: 'Sayohat paytida reys kechiksa, plastik tip darhol yangi marshrut tuzadi; rigid tip esa avvalgi rejasi buzilganidan uzoq noqulaylik sezadi.'
                    },
                    children: [
                        { cat: 'Qutb', title: 'Plastiklik', sub: 'Sangvinik, Xolerik', desc: 'Yangi muhit, yangi jamoa va kutilmagan reja o‘zgarishlariga oson moslashish.' },
                        { cat: 'Qutb', title: 'Rigidlik', sub: 'Flegmatik, Melanxolik', desc: 'Odatlangan tartib, reja va qarashlarni o‘zgartirishga qiynalish, ammo sodiqlik.' }
                    ]
                },
                {
                    node: {
                        cat: 'Qiyosiy tahlil', theme: 'indigo', icon: 'fa-scale-balanced',
                        title: 'TEMPERAMENT VA XARAKTER',
                        sub: 'Tug‘ma biologik asos vs ijtimoiy sifatlar',
                        desc: 'Ko‘pchilik temperament va xarakterni adashtiradi. Temperament — tug‘ma biologik poydevor (o‘zgarmas), Xarakter esa tarbiya, muhit va iroda orqali hayot davomida shakllanadigan ijtimoiy sifatlar tizimidir.',
                        items: [
                            ['Kelib chiqishi', 'Temperament — tug‘ma (genetik va ONF); Xarakter — hayot davomida orttirilgan.'],
                            ['O‘zgaruvchanligi', 'Temperament umr bo‘yi deyarli o‘zgarmaydi; Xarakterni tarbiya va o‘z ustida ishlash bilan o‘zgartirish mumkin.'],
                            ['Axloqiy baho', 'Temperamentga «yaxshi/yomon» baho berilmaydi; Xarakter esa axloqiy baholanadi.'],
                            ['Bog‘liqligi', 'Temperament xarakter rivojlanishining dinamik asosini tashkil etadi, lekin inson qanday shaxs bo‘lishini hal qilmaydi (B.G. Ananyev).']
                        ],
                        example: 'Xolerik temperamentli ikki kishidan biri tarbiya tufayli adolatparvar jasur qahramon bo‘lsa, ikkinchisi tarbiyasizlik tufayli janjalkash bo‘lishi mumkin — temperament bir xil, xarakter turlicha!'
                    },
                    children: [
                        { cat: 'Farq', title: 'Kelib chiqishi', sub: 'Tug‘ma vs orttirilgan', desc: 'Temperament — tug‘ma (genetik va ONF); Xarakter — hayot davomida orttirilgan.' },
                        { cat: 'Farq', title: 'O‘zgaruvchanligi', sub: 'Barqaror vs o‘zgaruvchan', desc: 'Temperament umr bo‘yi deyarli o‘zgarmaydi; Xarakterni tarbiya va o‘z ustida ishlash bilan o‘zgartirish mumkin.' },
                        { cat: 'Farq', title: 'Axloqiy baho', sub: 'Baholanmaydi vs baholanadi', desc: 'Temperamentga «yaxshi/yomon» baho berilmaydi; Xarakter esa axloqiy baholanadi (mehnatsevar, halol, dangasa).' }
                    ]
                }
            ],
            related: [
                { to: 'temperament-turlari', label: 'Temperament turlari' },
                { to: 'temperament-nazariyalari', label: 'Temperament nazariyalari' },
                { to: 'shaxs', label: 'Shaxs xususiyatlari' }
            ]
        },

        /* -------------------- 13. TEMPERAMENT TURLARI -------------------- */
        {
            id: 'temperament-turlari', no: 13, group: 1,
            title: 'Temperament turlari',
            short: 'Sangvinik, Xolerik, Flegmatik, Melanxolik',
            icon: 'fa-users-viewfinder', theme: 'indigo',
            summary: 'Insoniyat tarixida eng keng tan olingan 4 klassik psixologik tip: kuchli va zaif tomonlari, muloqot uslubi hamda mos kasblar.',
            root: {
                cat: 'Klassik tipologiya',
                title: '4 ASOSIY TEMPERAMENT TIPI',
                sub: 'Sangvinik • Xolerik • Flegmatik • Melanxolik',
                desc: 'Insoniyat tarixida eng keng tan olingan va amaliy psixologiyada qo‘llaniladigan 4 klassik psixologik tip. Har birining o‘ziga xos energiya darajasi, muloqot uslubi va kuchli jihatlari bor.',
                items: [
                    ['Sangvinik (Sariq / Oltin)', 'Ekstravert + Barqaror asab tizimi.'],
                    ['Xolerik (Qizil / Olovrang)', 'Ekstravert + Beqaror (qo‘zg‘aluvchan) asab tizimi.'],
                    ['Flegmatik (Yashil / Zumrad)', 'Introvert + Barqaror asab tizimi.'],
                    ['Melanxolik (Binafsha / Ko‘kish)', 'Introvert + Sezgir (kuchsiz) asab tizimi.']
                ],
                example: 'Har bir jamoa muvaffaqiyati uchun 4 tip ham zarur: Xolerik g‘oya beradi va boshlaydi, Sangvinik odamlarni birlashtiradi, Flegmatik tizimli bajaradi, Melanxolik xatolarni oldindan ko‘rib sifatni ta’minlaydi.'
            },
            branches: [
                {
                    node: {
                        cat: 'Sangvinik (Qon • Chaqqon tip)', theme: 'amber', icon: 'fa-sun',
                        title: 'SANGVINIK',
                        sub: 'Quvnoq, faol, kirishimli, moslashuvchan',
                        desc: 'Oliy nerv faoliyati kuchli, muvozanatli va harakatchan. Optimist, hayotsevar, nutqi tez va ifodali, mimikasi boy. Qiyinchiliklardan tez o‘tib ketadi va yangi sharoitga oson moslashadi.',
                        items: [
                            ['Ijobiy tomonlari', 'Yuqori kirishimlilik, hazil-mutoyiba hissi, tashabbuskorlik, stressga chidamlilik, tez qaror qabul qilish.'],
                            ['Salbiy / Zaif tomonlari', 'Bir xil zerikarli ishdan tez charchash, ba’zan yuzakilik va boshlagan ishni oxiriga yetkazmaslik.'],
                            ['Muloqot uslubi', 'Ochiq, samimiy, do‘stona; suhbatda tashabbusni qo‘lga oladi va davrani qizitadi.']
                        ],
                        extra: 'Mos kasblar: Menejer, jurnalist, diplomat, shifokor, tadbirkor, o‘qituvchi, marketing va PR mutaxassisi.',
                        example: 'Yangi ishga kirgan Sangvinik birinchi kunning o‘zidayoq barcha hamkasblari bilan tanishib, tushlikka birga chiqishni tashkil qiladi.'
                    },
                    children: []
                },
                {
                    node: {
                        cat: 'Xolerik (Safro • Jo‘shqin tip)', theme: 'rose', icon: 'fa-fire-flame-curved',
                        title: 'XOLERIK',
                        sub: 'Tez hayajonlanuvchi, jo‘shqin, lider',
                        desc: 'Oliy nerv faoliyati kuchli, ammo qo‘zg‘alish tormozlanishdan ustun (muvozanatsiz). Ulkan ichki energiya egasi, maqsad sari shiddat bilan intiladi, qiyinchiliklardan qo‘rqmaydi, ammo jahli tez chiqadi.',
                        items: [
                            ['Ijobiy tomonlari', 'Tug‘ma yetakchilik (liderlik), jasorat, yuqori ishchanlik, qat’iyatlilik, yangilikka intilish.'],
                            ['Salbiy / Zaif tomonlari', 'Qizishuvchanlik, sabrsizlik, keskin kayfiyat o‘zgarishi, ba’zan murosasizlik.'],
                            ['Muloqot uslubi', 'To‘g‘riso‘z, baland ovozli, ishonchli va hissiyotlarga boy; bahslarda yengishni xohlaydi.']
                        ],
                        extra: 'Mos kasblar: Inqiroz menejeri, tadbirkor-startapchi, sportchi, jarroh, harbiy qo‘mondon, rejissyor.',
                        example: 'Loyiha muddati yaqinlashganda Xolerik kechasi bilan uxlamasdan butun jamoani ruhlantirib, ishni rekord vaqtda yakunlaydi.'
                    },
                    children: []
                },
                {
                    node: {
                        cat: 'Flegmatik (Balg‘am • Vazmin tip)', theme: 'emerald', icon: 'fa-shield-halved',
                        title: 'FLEGMATIK',
                        sub: 'Sabrli, bosiq, vazmin, barqaror',
                        desc: 'Oliy nerv faoliyati kuchli, muvozanatli, ammo kamharakat. Tuyg‘ulari chuqur va doimiy, tashqi tomondan hissiyotlarini kam namoyon etadi. Har bir ishni puxta reja va mantiq asosida bajaradi.',
                        items: [
                            ['Ijobiy tomonlari', 'Temirdek sabr-toqat, yuqori ishonchlilik, sovuqqonlik, tahliliy aniqlik, boshlagan ishni albatta tugatish.'],
                            ['Salbiy / Zaif tomonlari', 'Yangi sharoitga sekin moslashish, tashabbusni kam ko‘rsatish, ba’zan sustkashlik.'],
                            ['Muloqot uslubi', 'Xotirjam, kamgap, yaxshi tinglovchi; behuda bahslarga qo‘shilmaydi, so‘ziga sodiq.']
                        ],
                        extra: 'Mos kasblar: Dasturchi, muhandis, moliyachi-auditor, ilmiy tadqiqotchi, uchuvchi, huquqshunos.',
                        example: 'Favqulodda holat yuz berganda hamma sarosimaga tushsa ham, Flegmatik sovuqqonlik bilan yo‘riqnomaga qarab aniq harakat qiladi.'
                    },
                    children: []
                },
                {
                    node: {
                        cat: 'Melanxolik (Qora safro • Ta’sirchan tip)', theme: 'purple', icon: 'fa-feather',
                        title: 'MELANXOLIK',
                        sub: 'Ta’sirchan, sezgir, tortinchoq',
                        desc: 'Oliy nerv faoliyati kuchsiz, ammo o‘ta nozik va sezgir. Boshqalar payqamaydigan eng kichik o‘zgarishlar va insonlar kayfiyatini chuqur his qiladi. Ichki olami boy, ijodkor va sadoqatli.',
                        items: [
                            ['Ijobiy tomonlari', 'Yuqori empatiya (hamdardlik), nozik badiiy did, intuitsiya, mas’uliyat va sadoqat, detallarga e’tibor.'],
                            ['Salbiy / Zaif tomonlari', 'Tez ranjish, o‘ziga ishonchsizlik, notanish muhitda tortinish, stressdan uzoq vaqt chiqa olmaslik.'],
                            ['Muloqot uslubi', 'Muloyim, ehtiyotkor, samimiy; ko‘pchilik davrasidan ko‘ra 1-2 ta yaqin do‘st bilan chuqur suhbatni afzal ko‘radi.']
                        ],
                        extra: 'Mos kasblar: Psixolog, yozuvchi, rassom, bastakor, dizayner, muharrir, san’atshunos.',
                        example: 'Melanxolik do‘stining ovoz ohangidanoq uning xafa ekanini darhol sezadi va eng to‘g‘ri tasalli so‘zlarini topa oladi.'
                    },
                    children: []
                }
            ],
            related: [
                { to: 'shaxs', label: 'Shaxs xususiyatlari' },
                { to: 'temperament-xususiyatlari', label: 'Temperament xususiyatlari' },
                { to: 'temperament-nazariyalari', label: 'Temperament nazariyalari' }
            ]
        }
    ];

    /* =========================================================
       6. MAVZU METAMA'LUMOTLARI (KUTUBXONA, AUDIT VA GALAXY UCHUN)
    ========================================================= */
    const TOPIC_META = {
        'psyuxe': {
            slug: 'psixologiya-va-psyuxe',
            categoryId: 'tarix',
            tags: ['bilish', 'hissiy-irodaviy', 'shaxs', 'tarix'],
            difficulty: 'Oson',
            duration: '15 daqiqa',
            references: ['ref-gziyev-2010', 'ref-rubinshteyn-2002', 'ref-karimova-2011'],
            galaxyPos: { x: 180, y: 380 }
        },
        'diqqat': {
            slug: 'diqqat',
            categoryId: 'bilish',
            tags: ['bilish'],
            difficulty: 'O‘rta',
            duration: '20 daqiqa',
            references: ['ref-gziyev-2010', 'ref-rubinshteyn-2002'],
            galaxyPos: { x: 460, y: 150 }
        },
        'idrok': {
            slug: 'sezgi-va-idrok',
            categoryId: 'bilish',
            tags: ['bilish'],
            difficulty: 'O‘rta',
            duration: '20 daqiqa',
            references: ['ref-gziyev-2010', 'ref-rubinshteyn-2002'],
            galaxyPos: { x: 460, y: 310 }
        },
        'xotira': {
            slug: 'xotira',
            categoryId: 'bilish',
            tags: ['bilish'],
            difficulty: 'O‘rta',
            duration: '25 daqiqa',
            references: ['ref-gziyev-2010', 'ref-rubinshteyn-2002'],
            galaxyPos: { x: 740, y: 180 }
        },
        'tafakkur': {
            slug: 'tafakkur',
            categoryId: 'bilish',
            tags: ['bilish'],
            difficulty: 'Murakkab',
            duration: '25 daqiqa',
            references: ['ref-gziyev-2010', 'ref-rubinshteyn-2002'],
            galaxyPos: { x: 1020, y: 180 }
        },
        'xayol': {
            slug: 'xayol',
            categoryId: 'bilish',
            tags: ['bilish', 'hissiy-irodaviy'],
            difficulty: 'Oson',
            duration: '15 daqiqa',
            references: ['ref-gziyev-2010', 'ref-rubinshteyn-2002'],
            galaxyPos: { x: 1280, y: 260 }
        },
        'muloqot': {
            slug: 'muloqot',
            categoryId: 'ijtimoiy',
            tags: ['ijtimoiy', 'boshqa'],
            difficulty: 'O‘rta',
            duration: '20 daqiqa',
            references: ['ref-andreeva-2001', 'ref-karimova-2011'],
            galaxyPos: { x: 740, y: 460 }
        },
        'faoliyat': {
            slug: 'faoliyat-va-motivatsiya',
            categoryId: 'hissiy-irodaviy',
            tags: ['hissiy-irodaviy', 'shaxs'],
            difficulty: 'O‘rta',
            duration: '20 daqiqa',
            references: ['ref-leontyev-1975', 'ref-gziyev-2010'],
            galaxyPos: { x: 1050, y: 410 }
        },
        'shaxs': {
            slug: 'shaxs-xususiyatlari',
            categoryId: 'shaxs',
            tags: ['shaxs'],
            difficulty: 'O‘rta',
            duration: '20 daqiqa',
            references: ['ref-gziyev-2010', 'ref-rubinshteyn-2002', 'ref-leontyev-1975'],
            galaxyPos: { x: 480, y: 580 }
        },
        'eq': {
            slug: 'emotsional-intellekt',
            categoryId: 'hissiy-irodaviy',
            tags: ['hissiy-irodaviy', 'ijtimoiy', 'boshqa'],
            difficulty: 'O‘rta',
            duration: '18 daqiqa',
            references: ['ref-goleman-1995', 'ref-andreeva-2001'],
            galaxyPos: { x: 1020, y: 580 }
        },
        'temperament-nazariyalari': {
            slug: 'temperament-nazariyalari',
            categoryId: 'temperament',
            tags: ['temperament', 'tarix', 'shaxs'],
            difficulty: 'Murakkab',
            duration: '25 daqiqa',
            references: ['ref-pavlov-1951', 'ref-gziyev-2010'],
            galaxyPos: { x: 260, y: 760 }
        },
        'temperament-xususiyatlari': {
            slug: 'temperament-xususiyatlari',
            categoryId: 'temperament',
            tags: ['temperament', 'shaxs'],
            difficulty: 'Murakkab',
            duration: '25 daqiqa',
            references: ['ref-merlin-1986', 'ref-gziyev-2010'],
            galaxyPos: { x: 640, y: 760 }
        },
        'temperament-turlari': {
            slug: 'temperament-turlari',
            categoryId: 'temperament',
            tags: ['temperament', 'shaxs'],
            difficulty: 'Oson',
            duration: '20 daqiqa',
            references: ['ref-pavlov-1951', 'ref-merlin-1986', 'ref-gziyev-2010'],
            galaxyPos: { x: 1020, y: 760 }
        }
    };

    /* =========================================================
       7. ILMIY AUDIT BELGILARI (5-QAT'IY QOIDA ASOSIDA)
       Takrorlangan yoki ilmiy izoh talab etadigan tugunlar asl matni
       o'zgartirilmasdan, alohida ilmiy audit eslatmasi bilan belgilandi.
    ========================================================= */
    const AUDIT_FLAGS = [
        {
            id: 'audit-dup-1',
            type: 'duplication',
            severity: 'info',
            topicIds: ['psyuxe', 'shaxs'],
            nodeIds: ['psyuxe-b3', 'shaxs-root'],
            title: 'Kross-mavzuli takrorlanish: «Shaxs xususiyatlari»',
            note: '1-mavzuning 4-shoxi («psyuxe-b3») hamda 9-mavzuning markaziy tuguni («shaxs-root») bir xil ta’rif va avtomobil dvigateli/haydovchisi metaforasidan foydalanadi. Bu 1-mavzuda umumiy kirish, 9-mavzuda esa alohida chuqurlashtirilgan bo‘lim sifatida saqlangan.'
        },
        {
            id: 'audit-dup-2',
            type: 'duplication',
            severity: 'info',
            topicIds: ['shaxs', 'temperament-xususiyatlari'],
            nodeIds: ['shaxs-b1', 'temperament-xususiyatlari-b3'],
            title: 'Misol takrorlanishi: «Xolerik temperament va xarakter farqi»',
            note: '9-mavzudagi «Xarakter» shoxi va 12-mavzudagi «Temperament va xarakter» shoxida xolerik temperamentli ikki kishi (adolatparvar vs janjalkash) haqidagi hayotiy misol takrorlangan.'
        },
        {
            id: 'audit-dup-3',
            type: 'duplication',
            severity: 'info',
            topicIds: ['muloqot', 'eq'],
            nodeIds: ['muloqot-b2-l0', 'eq-b1'],
            title: 'Tushuncha takrorlanishi: «Empatiya»',
            note: '7-mavzuning Perseptiv muloqot qismidagi «Empatiya» bargi va 10-mavzudagi «Empatiya» shoxi bir xil ta’rifga ega, chunki empatiya ham muloqot mexanizmi, ham EQ tarkibiy qismidir.'
        },
        {
            id: 'audit-sci-1',
            type: 'scientific-review',
            severity: 'review',
            topicIds: ['temperament-xususiyatlari'],
            nodeIds: ['temperament-xususiyatlari-root'],
            title: 'Ilmiy aniqlashtirish: Temperamentning 7 mezoni',
            note: 'Mavzu sarlavhasida «7 psixologik mezon» ko‘rsatilgan, ammo ro‘yxatda 4 ta band keltirilgan (4-bandda plastiklik va rigidlik juftlangan). V.S. Merlin va B.M. Teplov klassifikatsiyasida qolgan mezonlar: psixik reaksiyalar sur’ati (temp), emotsional qo‘zg‘aluvchanlik, ekstraversiya/introversiya hamda reaktivlik va faollik nisbatidir.'
        },
        {
            id: 'audit-sci-2',
            type: 'scientific-review',
            severity: 'review',
            topicIds: ['diqqat'],
            nodeIds: ['diqqat-b1', 'diqqat-b2'],
            title: 'Ilmiy aniqlashtirish: Diqqat xususiyatlari va qonunlari',
            note: '1) Klassik psixologiyada (S.L. Rubinshteyn, E.G‘. G‘oziyev) diqqatning 5 asosiy xususiyati: barqarorlik, jamlanish (konsentratsiya), ko‘lam (hajm), taqsimlanish va ko‘chishdir. Asl xaritada «bo‘linish» alohida keltirilgan. 2) «Qaytaruvchi, ommaviy va ta’sirlanish qonunlari» amaliy-pedagogik tavsif bo‘lib, neyrofiziologik asosi A.A. Uxtomskiyning «Dominanta» qonuniga tayanadi.'
        }
    ];

    /* =========================================================
       8. KNOWLEDGE GALAXY — YAGONA BILIMLAR XARITASI BOG'LANISHLARI
    ========================================================= */
    const GALAXY_LINKS = [
        {
            from: 'psyuxe', to: 'diqqat',
            label: 'Psixik jarayonlar darvozasi',
            scientificBasis: 'Ong va psixikaning barcha bilish jarayonlari diqqat filtri orqali faollashadi (S.L. Rubinshteyn).'
        },
        {
            from: 'psyuxe', to: 'shaxs',
            label: 'Psixikaning 3-qatlami',
            scientificBasis: 'Psixika jarayonlar va holatlar bilan birga barqaror shaxs xususiyatlarida namoyon bo‘ladi.'
        },
        {
            from: 'diqqat', to: 'idrok',
            label: 'Tanlovchan idrok',
            scientificBasis: 'Diqqat sezgi a’zolariga kelayotgan minglab signallar ichidan kerakli obyektni ajratib, yaxlit idrok obrazini hosil qiladi.'
        },
        {
            from: 'diqqat', to: 'xotira',
            label: 'Kodlash va eslab qolish',
            scientificBasis: 'Diqqat qaratilmagan axborot sensor xotiradan qisqa va uzoq muddatli xotiraga o‘tmaydi.'
        },
        {
            from: 'idrok', to: 'xotira',
            label: 'Obrazlarni saqlash',
            scientificBasis: 'Sezgi va idrok orqali qabul qilingan obrazlar xotira tizimida tasavvurlar sifatida mustahkamlanadi.'
        },
        {
            from: 'xotira', to: 'tafakkur',
            label: 'Bilimlar bazasi va tahlil',
            scientificBasis: 'Tafakkur tushuncha, hukm va xulosa chiqarishda xotirada saqlangan tajriba va faktlarga tayanadi.'
        },
        {
            from: 'tafakkur', to: 'xayol',
            label: 'Muammoli vaziyat va gipoteza',
            scientificBasis: 'Tafakkur mantiqiy yechim izlaganda, xayol noma’lum kelajak modelini va ijodiy farazlarni yaratadi.'
        },
        {
            from: 'xayol', to: 'faoliyat',
            label: 'Maqsad obrazini modellashtirish',
            scientificBasis: 'A.N. Leontyevga ko‘ra, faoliyat boshlanishidan avval kutilayotgan natija (maqsad) xayolda obraz sifatida yaratiladi.'
        },
        {
            from: 'faoliyat', to: 'shaxs',
            label: 'Faoliyatda shakllanish',
            scientificBasis: 'Shaxsning xarakteri va qobiliyatlari faoliyat hamda motivatsiya jarayonida namoyon bo‘ladi va rivojlanadi.'
        },
        {
            from: 'shaxs', to: 'temperament-nazariyalari',
            label: 'Biologik poydevor',
            scientificBasis: 'Temperament shaxsning tug‘ma neyrodinamik asosi bo‘lib, uning tarixiy va fiziologik nazariyalari mavjud.'
        },
        {
            from: 'shaxs', to: 'temperament-xususiyatlari',
            label: 'Individual-tipologik mezonlar',
            scientificBasis: 'Shaxsning dinamik faolligi senzitivlik, reaktivlik, plastiklik va ekstraversiya mezonlari bilan o‘lchanadi.'
        },
        {
            from: 'shaxs', to: 'temperament-turlari',
            label: '4 klassik psixologik tip',
            scientificBasis: 'Sangvinik, Xolerik, Flegmatik va Melanxolik tiplar shaxs xulq-atvorining dinamik uslubini belgilaydi.'
        },
        {
            from: 'temperament-nazariyalari', to: 'temperament-xususiyatlari',
            label: 'ONF xossalaridan mezonlargacha',
            scientificBasis: 'I.P. Pavlov aniqlagan kuch, muvozanat va harakatchanlik V.S. Merlinning 7 psixologik mezoniga asos bo‘lgan.'
        },
        {
            from: 'temperament-xususiyatlari', to: 'temperament-turlari',
            label: 'Mezonlar kombinatsiyasi',
            scientificBasis: 'Ekstraversiya/introversiya va neyrodinamik barqarorlik kesishmasida 4 ta temperament tipi hosil bo‘ladi.'
        },
        {
            from: 'muloqot', to: 'eq',
            label: 'Empatiya va ijtimoiy idrok',
            scientificBasis: 'Muloqotning perseptiv tomoni (empatiya, refleksiya) emotsional intellektning (D. Goleman) markaziy bo‘g‘inidir.'
        },
        {
            from: 'shaxs', to: 'muloqot',
            label: 'Ijtimoiy munosabatlar',
            scientificBasis: 'Shaxs xususiyatlari va xarakter insonlar o‘rtasidagi kommunikativ va interaktiv muloqotda shakllanadi.'
        },
        {
            from: 'shaxs', to: 'eq',
            label: 'Hissiy o‘z-o‘zini boshqarish',
            scientificBasis: 'Emotsional intellekt shaxsning hissiy-irodaviy yetukligi va ijtimoiy moslashuvchanligini ta’minlaydi.'
        }
    ];

    /* =========================================================
       9. ASL NORMALIZATSIYA FUNKSIYASI (100% MOSLIK BILAN)
       Har bir mavzu tugunlarining yagona ID'si:
       - topic.id + '-root'
       - topic.id + '-b' + bi
       - topic.id + '-b' + bi + '-l' + ci
    ========================================================= */
    function normalize(topic) {
        const meta = TOPIC_META[topic.id] || {
            slug: topic.id,
            categoryId: topic.group === 0 ? 'bilish' : 'temperament',
            tags: [topic.group === 0 ? 'bilish' : 'temperament'],
            difficulty: 'O‘rta',
            duration: '20 daqiqa',
            references: ['ref-gziyev-2010'],
            galaxyPos: { x: 500, y: 400 }
        };

        topic.slug = meta.slug;
        topic.categoryId = meta.categoryId;
        topic.tags = meta.tags;
        topic.difficulty = meta.difficulty;
        topic.duration = meta.duration;
        topic.referenceIds = meta.references;
        topic.references = meta.references.map(function (refId) {
            return REFERENCES.find(function (r) { return r.id === refId; });
        }).filter(Boolean);
        topic.galaxyPos = meta.galaxyPos;
        topic.relatedTopics = (topic.related || []).map(function (r) { return r.to; });

        const root = Object.assign({}, topic.root, {
            id: topic.id + '-root',
            topicId: topic.id,
            parentId: null,
            kind: 'root',
            type: 'root',
            theme: 'indigo',
            icon: topic.icon
        });

        const branches = (topic.branches || []).map(function (b, bi) {
            const bnode = Object.assign({}, b.node, {
                id: topic.id + '-b' + bi,
                topicId: topic.id,
                parentId: root.id,
                kind: 'branch',
                type: 'branch'
            });
            bnode.theme = bnode.theme || 'sky';
            bnode.count = (b.children || []).length;
            const kids = (b.children || []).map(function (c, ci) {
                return Object.assign({}, c, {
                    id: topic.id + '-b' + bi + '-l' + ci,
                    topicId: topic.id,
                    parentId: bnode.id,
                    kind: 'leaf',
                    type: 'leaf',
                    theme: bnode.theme,
                    children: []
                });
            });
            bnode.children = kids;
            return { node: bnode, children: kids };
        });

        root.children = branches.map(function (b) { return b.node; });
        topic.rootNode = root;
        topic._root = root;
        topic._branches = branches;
        topic._all = [root];
        branches.forEach(function (b) {
            topic._all.push(b.node);
            b.children.forEach(function (k) { topic._all.push(k); });
        });
        topic._byId = {};
        topic._all.forEach(function (n) {
            n.items = n.items || [];
            n.description = n.desc || n.sub || '';
            n.auditFlags = AUDIT_FLAGS.filter(function (f) {
                return f.nodeIds.indexOf(n.id) !== -1;
            });
            topic._byId[n.id] = n;
        });
        topic.auditFlags = AUDIT_FLAGS.filter(function (f) {
            return f.topicIds.indexOf(topic.id) !== -1;
        });
        return topic;
    }

    TOPICS.forEach(normalize);

    // Global eksport
    window.PsychAtlasData = {
        THEMES: THEMES,
        GROUPS: GROUPS,
        CATEGORIES: CATEGORIES,
        REFERENCES: REFERENCES,
        TOPICS: TOPICS,
        TOPIC_META: TOPIC_META,
        AUDIT_FLAGS: AUDIT_FLAGS,
        GALAXY_LINKS: GALAXY_LINKS,
        normalize: normalize
    };
})(window);
