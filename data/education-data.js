/**
 * PSYCHOLOGY ATLAS — TA'LIM MODULLARI MA'LUMOTLAR BAZASI
 *
 * Quyidagi ma'lumotlar modellarini o'z ichiga oladi:
 * 1. HISTORY_ERAS va SCIENTISTS (Psixologiya tarixi — 10 ta xronologik davr va olimlar)
 * 2. GLOSSARY_TERMS (Psixologik atamalar lug'ati — 36 ta tasdiqlangan ilmiy termin)
 * 3. QUESTIONS (Test savollari bazasi — 13 mavzu va 6 xil savol turi bo'yicha)
 * 4. DEFAULT_FLASHCARDS (Smart Flashcards boshlang'ich to'plami)
 * 5. BADGES (Haqiqiy faoliyatga asoslangan yutuq va nishonlar)
 */
(function (window) {
    'use strict';

    /* =========================================================
       1. PSIXOLOGIYA TARIXI — 10 XRONOLOGIK DAVR VA OLIMLAR
    ========================================================= */
    const HISTORY_ERAS = [
        {
            id: 'era-1',
            order: 1,
            period: 'Mil. avv. IV–I ming yilliklar',
            title: 'Qadimgi davrda jon haqidagi qarashlar',
            subtitle: 'Animizm va ilk mifologik-falsafiy tasavvurlar',
            summary: 'Insoniyat tarixining dastlabki bosqichlarida psixik hodisalar tabiat kuchlari va «jon» (animizm) tushunchasi orqali izohlangan. Qadimgi Misr, Hindiston («Upanishadalar») va Xitoy manbalarida jonning tana bilan aloqasi, nafas va hayotiy quvvat haqidagi ilk qarashlar shakllangan.',
            keyIdeas: [
                'Animizm — tabiatdagi barcha narsalar va tirik mavjudotlarda jon (ruh) mavjudligi haqidagi tasavvur.',
                'Qadimgi Misr va Sharq tabobatida yurak hamda nafas psixik faoliyat markazi sifatida qaralgan.',
                'Uyqu, tush ko‘rish va hushdan ketish hodisalari jonning tanadan vaqtincha chiqishi sifatida talqin etilgan.'
            ],
            relatedTopics: ['psyuxe'],
            source: 'E.G‘. G‘oziyev. Umumiy psixologiya (2010), 18–23-betlar; S.L. Rubinshteyn. Основы общей психологии (2002).'
        },
        {
            id: 'era-2',
            order: 2,
            period: 'Mil. avv. VI – mil. II asrlar',
            title: 'Antik yunon mutafakkirlari',
            subtitle: '«Psyuxe» ta’limoti, ilk ilmiy traktatlar va gumoral nazariya',
            summary: 'Antik Yunonistonda jon va bilish jarayonlari falsafiy hamda tabiiy-ilmiy asosda o‘rganila boshlandi. Suqrot o‘z-o‘zini anglashni, Aflotun g‘oyalar va jonning uch qismli tuzilishini, Arastu esa tarixdagi ilk tizimli psixologik asar — «Jon haqida» («De Anima») traktatini yaratdi. Gippokrat va Galen temperament ta’limotiga asos soldilar.',
            keyIdeas: [
                'Arastuning «Jon haqida» asari psixologiyaning ilk tizimli ilmiy poydevori hisoblanadi.',
                'Gippokrat organizmdagi 4 suyuqlik (qon, safro, qora safro, balg‘am) nisbati bilan individual farqlarni tushuntirdi.',
                'Alkmeyon va Galen bosh miyani sezgi hamda tafakkur a’zosi sifatida ko‘rsatdi.'
            ],
            relatedTopics: ['psyuxe', 'temperament-nazariyalari', 'temperament-turlari'],
            source: 'Arastu. «Jon haqida» (De Anima, mil. avv. IV asr); E.G‘. G‘oziyev. Umumiy psixologiya (2010), 24–31-betlar.'
        },
        {
            id: 'era-3',
            order: 3,
            period: 'IX–XII asrlar',
            title: 'O‘rta asr psixologik qarashlari',
            subtitle: 'Sharq Uyg‘onish davri mutafakkirlari va tibbiy-psixologik meros',
            summary: 'Markaziy Osiyo mutafakkirlari — Abu Nasr Forobiy, Abu Ali ibn Sino va Abu Rayhon Beruniy psixik jarayonlarni tabiiy-ilmiy va tibbiy kuzatishlar bilan boyitdilar. Ibn Sino «Tib qonunlari» va «Kitob ash-shifo» asarlarida hissiy holatlarning tana salomatligiga ta’sirini (psixosomatika) va puls diagnostikasini ilmiy asoslab berdi.',
            keyIdeas: [
                'Abu Ali ibn Sino ichki sezgi va idrok quvvatlarini, xayol, xotira hamda affektlarning fiziologik ta’sirini tahlil qildi.',
                'Abu Nasr Forobiy bilish bosqichlari (sezgi, idrok, aql), nutq va muloqotning ijtimoiy tabiatini yoritdi.',
                'Mijoz (temperament) tushunchasi Sharq tabobatida shaxsning individual-fiziologik holati sifatida rivojlantirildi.'
            ],
            relatedTopics: ['psyuxe', 'idrok', 'xotira', 'temperament-nazariyalari'],
            source: 'Abu Ali ibn Sino. «Tib qonunlari» (XI asr); V.M. Karimova. Psixologiya (2011), 16–22-betlar.'
        },
        {
            id: 'era-4',
            order: 4,
            period: 'XVII–XVIII asrlar',
            title: 'Yangi davr',
            subtitle: 'Ong psixologiyasi, refleks tushunchasi va assotsianizm',
            summary: 'Yangi davr falsafasi va tabiatshunosligida psixologiya «jon haqidagi ta’limot»dan «ong haqidagi fan»ga aylandi. Rene Dekart refleks mexanizmini va ong («Men fikrlayapman, demak mavjudman») tushunchasini kiritdi; Jon Lokk esa tajriba va ichki idrok (refleksiya) haqidagi empirik ta’limotni ilgari surdi.',
            keyIdeas: [
                'Rene Dekart xulq-atvorning reflektor (qo‘zg‘atuvchiga avtomatik javob) mexanizmini kashf etdi.',
                'Jon Lokk inson ongini «Tabula rasa» (toza lavha) deb atab, barcha bilimlar sezgi va tajribadan kelib chiqishini asosladi.',
                'Xristian Volf (1732–1734) «Empirik psixologiya» va «Ratsional psixologiya» asarlari bilan «psixologiya» atamasini ilmiy muomalaga mustahkamladi.'
            ],
            relatedTopics: ['psyuxe', 'idrok', 'tafakkur'],
            source: 'S.L. Rubinshteyn. Основы общей психологии (2002), 45–54-betlar; R. Dekart. Ehtiroslar haqida risola (1649).'
        },
        {
            id: 'era-5',
            order: 5,
            period: '1879-yil va XIX asr oxiri',
            title: 'Eksperimental psixologiyaning shakllanishi',
            subtitle: 'Psixologiyaning mustaqil eksperimental fanga aylanishi',
            summary: '1879-yilda Vilgelm Vundt Germaniyaning Leypsig universitetida dunyodagi birinchi eksperimental psixologiya laboratoriyasini ochdi. Shu sanadan boshlab psixologiya falsafadan ajralib, o‘z tajriba metodlariga ega mustaqil fanga aylandi. German Ebbingauz esa xotira qonuniyatlarini eksperimental o‘lchashni boshlab berdi.',
            keyIdeas: [
                '1879-yil — Leypsigda V. Vundt tomonidan ilk psixologik laboratoriyaning tashkil etilishi.',
                'Sezgi chegaralari, reaksiya vaqti va diqqat ko‘lamini asboblar yordamida aniq o‘lchash yo‘lga qo‘yildi.',
                'G. Ebbingauz (1885) esda olib qolish va unutish egri chizig‘ini tajribada isbotladi.'
            ],
            relatedTopics: ['psyuxe', 'diqqat', 'idrok', 'xotira'],
            source: 'W. Wundt. Grundzüge der physiologischen Psychologie (1874); E.G‘. G‘oziyev. Umumiy psixologiya (2010), 35–40-betlar.'
        },
        {
            id: 'era-6',
            order: 6,
            period: 'XIX asr oxiri – XX asr birinchi yarmi',
            title: 'Psixoanaliz (Chuqur psixologiya)',
            subtitle: 'Ongsizlik qatlami, motivlar va psixodinamika',
            summary: 'Avstriyalik shifokor va psixolog Zigmund Freyd inson psixikasi faqat ongdan iborat emasligini, xulq-atvorimizda ongsiz mayllar, ichki nizolar va himoya mexanizmlari katta rol o‘ynashini ko‘rsatdi. Karl Gustav Yung esa analitik psixologiya doirasida ekstraversiya va introversiya tipologiyasini yaratdi.',
            keyIdeas: [
                'Z. Freyd psixikani aysbergga qiyoslab, Ong, Ongosti va Ongsizlik qatlamlarini hamda Id, Ego, Superego tuzilmasini tavsifladi.',
                'K.G. Yung (1921) psixik energiya yo‘nalishiga ko‘ra Ekstravert va Introvert tiplarni fanga kiritdi.',
                'Motivatsiya, tush ko‘rish (ixtiyorsiz xayol) va affektiv holatlarning chuqur sabablari o‘rganildi.'
            ],
            relatedTopics: ['psyuxe', 'xayol', 'faoliyat', 'temperament-xususiyatlari'],
            source: 'S. Freud. The Interpretation of Dreams (1900); C.G. Jung. Psychological Types (1921).'
        },
        {
            id: 'era-7',
            order: 7,
            period: '1913-yil – XX asr o‘rtalari',
            title: 'Bixeviorizm va Oliy nerv faoliyati ta’limoti',
            subtitle: 'Kuzatiladigan xulq-atvor va shartli reflekslar fiziologiyasi',
            summary: 'I.P. Pavlov oliy nerv faoliyati (ONF) qonuniyatlarini va 4 ta asab tizimi tipini kashf etib, temperamentning neyrofiziologik asosini yaratdi. AQSHda Jon Uotson va B.F. Skinner psixologiyaning predmeti subyektiv ong emas, balki obyektiv kuzatiladigan xulq-atvor (Stimul → Reaksiya) bo‘lishi kerakligini ilgari surdilar.',
            keyIdeas: [
                'I.P. Pavlov qo‘zg‘alish va tormozlanishning 3 xossasi (kuch, muvozanat, harakatchanlik) asosida 4 temperament tipini ilmiy izohladi.',
                'J. Uotson (1913) «Stimul – Reaksiya» (S–R) formulasini va ko‘nikmalarning shakllanishini tadqiq etdi.',
                'B.F. Skinner operant shartlanish va tashqi motivatsiya (rag‘bat va jazo) mexanizmlarini aniqladi.'
            ],
            relatedTopics: ['temperament-nazariyalari', 'temperament-turlari', 'faoliyat'],
            source: 'I.P. Pavlov. О типах высшей нервной деятельности (1951); J.B. Watson. Psychology as the Behaviorist Views It (1913).'
        },
        {
            id: 'era-8',
            order: 8,
            period: '1912–1940-yillar',
            title: 'Geshtalt psixologiyasi',
            subtitle: 'Idrokning yaxlitligi va tafakkurda insayt qonuniyatlari',
            summary: 'Germaniyada Maks Vertgeymer, Volfgang Kyoler va Kurt Koffka tomonidan asos solingan Geshtalt psixologiyasi («Gestalt» — yaxlit shakl, obraz) psixikani alohida elementlar yig‘indisi emas, balki yaxlit tizim sifatida o‘rgandi. Idrokning yaxlitlik, doimiylik (konstantlik) va figura-fon qonunlari aynan shu maktab kashfiyotidir.',
            keyIdeas: [
                '«Butun o‘z qismlarining oddiy yig‘indisidan kattaroqdir» — idrokning yaxlitlik va strukturalilik qonuni.',
                'Figura va fon qonuni — diqqat va idrokning tanlovchanlik xususiyatini tushuntirib berdi.',
                'Tafakkurda muammoni hal qilish «insayt» (vaziyatni birdan yaxlit tushunib yetish) orqali kechishi ko‘rsatildi.'
            ],
            relatedTopics: ['idrok', 'diqqat', 'tafakkur'],
            source: 'M. Wertheimer. Laws of Organization in Perceptual Forms (1923); S.L. Rubinshteyn (2002), 190–215-betlar.'
        },
        {
            id: 'era-9',
            order: 9,
            period: '1950–1980-yillar',
            title: 'Kognitiv psixologiya va Faoliyat nazariyasi',
            subtitle: 'Axborotni qayta ishlash, diqqat, xotira va faoliyat strukturasi',
            summary: 'XX asrning ikkinchi yarmida kognitiv psixologiya (J. Miller, D. Brodbent, U. Naysser, J. Strup) inson ongini axborotni qabul qiluvchi, kodlovchi, saqlovchi va qayta ishlovchi murakkab tizim sifatida tadqiq etdi. Shu davrda L.S. Vigotskiy, A.N. Leontyev va S.L. Rubinshteyn ong va faoliyat birligi nazariyasini yaratdilar.',
            keyIdeas: [
                'Jorj Miller (1956) qisqa muddatli xotira va diqqat hajmining «7 ± 2» qonuniyatini aniqladi.',
                'Donald Brodbent va Kolin Cherri («Kokteyl kechasi effekti») diqqatning selektiv filtr modelini yaratdi.',
                'A.N. Leontyev (1975) faoliyatning «Ehtiyoj → Motiv → Maqsad → Harakat» strukturasini ishlab chiqdi.'
            ],
            relatedTopics: ['diqqat', 'xotira', 'tafakkur', 'faoliyat', 'shaxs'],
            source: 'G.A. Miller. The Magical Number Seven, Plus or Minus Two (1956); A.N. Leontyev. Faoliyat. Ong. Shaxs (1975).'
        },
        {
            id: 'era-10',
            order: 10,
            period: '1990-yillardan hozirgi davrgacha',
            title: 'Zamonaviy psixologik yo‘nalishlar',
            subtitle: 'Emotsional intellekt (EQ), kognitiv neyropsixologiya va differensial psixologiya',
            summary: 'Zamonaviy psixologiya neyrofiziologiya, kognitiv fanlar va ijtimoiy-emotsional tadqiqotlarni birlashtirdi. Piter Salovey, Jon Mayer va Daniel Goleman (1995) Emotsional intellekt (EQ) konsepsiyasini ishlab chiqdilar; Jeyms Gross esa hissiyotlarni boshqarishda «kognitiv qayta baholash» strategiyasini ilmiy asosladi.',
            keyIdeas: [
                'D. Goleman (1995) muvaffaqiyat va samarali muloqotda IQ bilan birga EQ (o‘z-o‘zini anglash, empatiya, hissiyotlarni boshqarish) hal qiluvchi ekanini asosladi.',
                'V.S. Merlin va Ya. Strelyau temperamentning integral-regulyativ xususiyatlarini (senzitivlik, reaktivlik, faollik, plastiklik) tizimlashtirdilar.',
                'Neyrovizualizatsiya (fMRT, EEG) diqqat, xotira, tafakkur va emotsiyalarning miya tarmoqlaridagi real faolligini ko‘rsatib berdi.'
            ],
            relatedTopics: ['eq', 'muloqot', 'temperament-xususiyatlari', 'shaxs'],
            source: 'D. Goleman. Emotional Intelligence (1995); V.S. Merlin. Очерк интегрального исследования индивидуальности (1986).'
        }
    ];

    const SCIENTISTS = [
        {
            id: 'sci-aristotle',
            name: 'Arastu (Aristotel)',
            lifespan: 'Mil. avv. 384–322',
            eraId: 'era-2',
            coreTheory: 'Jon haqidagi ta’limot («Psyuxe») va bilish bosqichlari',
            contribution: 'Tarixdagi ilk tizimli psixologik asar — «Jon haqida» traktatini yozgan; sezgi, idrok, xotira, xayol va tafakkurni jonning bilish quvvatlari sifatida tasniflagan.',
            majorWorks: ['«Jon haqida» (De Anima)', '«Nikomax axloqi»', '«Xotira va esga tushirish haqida»'],
            relatedTopics: ['psyuxe', 'idrok', 'xotira', 'tafakkur'],
            references: 'Arastu. Jon haqida (De Anima); E.G‘. G‘oziyev. Umumiy psixologiya (2010), 25-bet.'
        },
        {
            id: 'sci-hippocrates-galen',
            name: 'Gippokrat va Klavdiy Galen',
            lifespan: 'Mil. avv. 460–370 / Mil. 129–216',
            eraId: 'era-2',
            coreTheory: 'Temperamentning gumoral (4 hayotiy suyuqlik) nazariyasi',
            contribution: 'Gippokrat organizmdagi 4 suyuqlik (qon, safro, qora safro, balg‘am) mutanosibligi g‘oyasini ilgari surgan; Galen esa «temperamentum» atamasini va 4 klassik tip (Sangvinik, Xolerik, Flegmatik, Melanxolik) tavsifini fanga kiritgan.',
            majorWorks: ['Gippokrat: «Inson tabiati haqida»', 'Galen: «De Temperamentis» (Mijozlar haqida)'],
            relatedTopics: ['temperament-nazariyalari', 'temperament-turlari'],
            references: 'E.G‘. G‘oziyev. Umumiy psixologiya (2010), 282–285-betlar.'
        },
        {
            id: 'sci-ibn-sino',
            name: 'Abu Ali ibn Sino (Avitsenna)',
            lifespan: '980–1037',
            eraId: 'era-3',
            coreTheory: 'Mijoz ta’limoti, ichki sezgi quvvatlari va psixosomatika',
            contribution: 'Hissiy kechinmalar (qo‘rquv, quvonch, stress) va yurak urishi (puls), nafas hamda tana salomatligi o‘rtasidagi bevosita bog‘liqlikni tajribada isbotlagan; idrok, xayol va xotiraning miya bo‘lmachalaridagi joylashuvi haqida nazariya yaratgan.',
            majorWorks: ['«Tib qonunlari» (Al-Qonun fit-tibb)', '«Kitob ash-shifo»', '«Jon haqida risola»'],
            relatedTopics: ['psyuxe', 'idrok', 'temperament-nazariyalari'],
            references: 'Abu Ali ibn Sino. Tib qonunlari, I jild; V.M. Karimova. Psixologiya (2011), 18-bet.'
        },
        {
            id: 'sci-wundt',
            name: 'Vilgelm Vundt (Wilhelm Wundt)',
            lifespan: '1832–1920',
            eraId: 'era-5',
            coreTheory: 'Eksperimental psixologiya va ong strukturasi',
            contribution: '1879-yilda Leypsigda ilk eksperimental psixologiya laboratoriyasini ochib, reaksiya vaqti, sezgi va diqqat ko‘lamini laboratoriya sharoitida o‘lchashni boshlab berdi.',
            majorWorks: ['«Fiziologik psixologiya asoslari» (1874)', '«Xalqlar psixologiyasi» (1900–1920)'],
            relatedTopics: ['psyuxe', 'diqqat', 'idrok'],
            references: 'S.L. Rubinshteyn. Основы общей психологии (2002), 62–66-betlar.'
        },
        {
            id: 'sci-pavlov',
            name: 'Ivan Petrovich Pavlov',
            lifespan: '1849–1936',
            eraId: 'era-7',
            coreTheory: 'Oliy nerv faoliyati (ONF) tiplari va shartli reflekslar',
            contribution: 'Temperamentning haqiqiy fiziologik asosi bosh miya po‘stlog‘idagi qo‘zg‘alish va tormozlanish jarayonlarining 3 xossasi (kuchi, muvozanati, harakatchanligi) ekanini kashf etdi va 4 temperament tipini ilmiy asosladi.',
            majorWorks: ['«Oliy nerv faoliyatini obyektiv o‘rganish bo‘yicha 20 yillik tajriba» (1923)', '«Oliy nerv faoliyati tiplari haqida» (1935)'],
            relatedTopics: ['temperament-nazariyalari', 'temperament-turlari', 'temperament-xususiyatlari'],
            references: 'I.P. Pavlov. О типах высшей нервной деятельности (1951), 267–295-betlar.'
        },
        {
            id: 'sci-sherrington',
            name: 'Charlz Skott Sherrington (Charles Sherrington)',
            lifespan: '1857–1952',
            eraId: 'era-5',
            coreTheory: 'Retseptorlar va sezgilarning funksional tasnifi',
            contribution: 'Sezgi retseptorlarini joylashuvi va funksiyasiga ko‘ra 3 turga — eksteroreseptiv (tashqi olam), interoreseptiv (ichki a’zolar) va proprioreseptiv (tana holati va mushak muvozanati) sezgilarga ajratdi.',
            majorWorks: ['«Asab tizimining integrativ faoliyati» (The Integrative Action of the Nervous System, 1906)'],
            relatedTopics: ['idrok'],
            references: 'E.G‘. G‘oziyev. Umumiy psixologiya (2010), 118–121-betlar.'
        },
        {
            id: 'sci-jung-eysenck',
            name: 'Karl Yung va Gans Ayzenk (C.G. Jung & H.J. Eysenck)',
            lifespan: '1875–1961 / 1916–1997',
            eraId: 'era-6',
            coreTheory: 'Ekstraversiya – Introversiya va neyrotizm shkalasi',
            contribution: 'K. Yung inson psixik energiyasining tashqi yoki ichki olamga yo‘nalganligiga ko‘ra Ekstravert va Introvert tiplarni kiritdi; G. Ayzenk esa buni asab tizimi barqarorligi (neyrotizm) bilan birlashtirib, 4 temperament doirasini yaratdi.',
            majorWorks: ['K. Yung: «Psixologik tiplar» (1921)', 'G. Ayzenk: «Inson shaxsining tuzilishi» (1953)'],
            relatedTopics: ['temperament-xususiyatlari', 'temperament-turlari', 'shaxs'],
            references: 'C.G. Jung. Psychological Types (1921); E.G‘. G‘oziyev (2010), 292–295-betlar.'
        },
        {
            id: 'sci-kretschmer-sheldon',
            name: 'Ernst Krechmer va Uilyam Sheldon',
            lifespan: '1888–1964 / 1898–1977',
            eraId: 'era-7',
            coreTheory: 'Temperamentning konstitutsion (somatotip) nazariyasi',
            contribution: 'Tana tuzilishi (Piknik/Endomorf, Atletik/Mezomorf, Astenik/Ektomorf) bilan emotsional reaksiya tiplari o‘rtasidagi bog‘liqlik gipotezasini tadqiq etganlar.',
            majorWorks: ['E. Krechmer: «Tana tuzilishi va xarakter» (1921)', 'U. Sheldon: «Inson temperamenti turlari» (1942)'],
            relatedTopics: ['temperament-nazariyalari'],
            references: 'E.G‘. G‘oziyev. Umumiy psixologiya (2010), 286–289-betlar.'
        },
        {
            id: 'sci-leontyev',
            name: 'Aleksey Nikolayevich Leontyev',
            lifespan: '1903–1979',
            eraId: 'era-9',
            coreTheory: 'Psixologik faoliyat nazariyasi',
            contribution: 'Inson faoliyatining psixologik strukturasini («Ehtiyoj → Motiv → Maqsad → Harakat va Operatsiya») asoslab berdi hamda motivni faoliyatning haqiqiy harakatlantiruvchi kuchi sifatida tavsifladi.',
            majorWorks: ['«Faoliyat. Ong. Shaxs» (1975)', '«Psixika rivojlanishi muammolari» (1959)'],
            relatedTopics: ['faoliyat', 'psyuxe', 'shaxs'],
            references: 'A.N. Leontyev. Деятельность. Сознание. Личность (1975), 75–180-betlar.'
        },
        {
            id: 'sci-merlin-teplov',
            name: 'Volf Merlin, Boris Teplov va Yan Strelyau',
            lifespan: '1898–1982 / 1896–1965 / 1931–2020',
            eraId: 'era-10',
            coreTheory: 'Temperamentning strukturaviy mezonlari va qobiliyatlar psixologiyasi',
            contribution: 'Temperamentni baholovchi asosiy psixologik mezonlarni (senzitivlik, reaktivlik, faollik, plastiklik/rigidlik, sur’at, ekstraversiya) hamda qobiliyat va tug‘ma layoqat o‘rtasidagi farqlarni ilmiy asoslab berdilar.',
            majorWorks: ['V.S. Merlin: «Individuallikni integral tadqiq etish ocherki» (1986)', 'B.M. Teplov: «Individual farqlar muammolari» (1961)'],
            relatedTopics: ['temperament-xususiyatlari', 'shaxs'],
            references: 'V.S. Merlin. Очерк интегрального исследования индивидуальности (1986).'
        },
        {
            id: 'sci-goleman',
            name: 'Daniel Goleman (Daniel Goleman)',
            lifespan: '1946-yilda tug‘ilgan',
            eraId: 'era-10',
            coreTheory: 'Emotsional intellekt (EQ) modeli',
            contribution: 'P. Salovey va J. Mayer tadqiqotlariga tayanib, emotsional intellekt (o‘z-o‘zini anglash, o‘zini boshqarish, motivatsiya, empatiya va ijtimoiy ko‘nikmalar) insonning kasbiy va shaxsiy muvaffaqiyatida hal qiluvchi rol o‘ynashini asosladi.',
            majorWorks: ['«Emotsional intellekt: Nima uchun u IQ dan muhimroq bo‘lishi mumkin» (1995)', '«Ijtimoiy intellekt» (2006)'],
            relatedTopics: ['eq', 'muloqot', 'shaxs'],
            references: 'D. Goleman. Emotional Intelligence (1995), 33–145-betlar.'
        }
    ];

    /* =========================================================
       2. PSIXOLOGIK ATAMALAR LUG'ATI (36 TA TASDIQLANGAN TERMIN)
    ========================================================= */
    const GLOSSARY_TERMS = [
        {
            id: 'term-psyuxe',
            termUz: 'Psyuxe (Psixika)',
            termIntl: 'Psyche (yunoncha: ψυχή — jon, ruh)',
            shortDef: 'Oliy nerv tizimining obyektiv borliqni subyektiv obrazlar shaklida faol aks ettirish xossasi.',
            extendedDef: 'Qadimgi yunon tilida «jon», «ruh», «nafas» ma’nosini anglatgan. Zamonaviy psixologiyada psixika — yuksak darajada tashkil topgan materiyaning (bosh miyaning) tashqi olamni aks ettirish va shu asosda inson xulq-atvorini boshqarish qobiliyatidir. U psixik jarayonlar, holatlar va shaxs xususiyatlaridan tashkil topadi.',
            example: 'Ko‘chada kelayotgan avtomobilni ko‘rib (idrok), xavfni baholash (tafakkur) va yo‘l chetiga chiqish — psixikaning boshqaruvchanlik funksiyasidir.',
            topicId: 'psyuxe',
            source: 'E.G‘. G‘oziyev. Umumiy psixologiya (2010), 12–16-betlar.'
        },
        {
            id: 'term-affekt',
            termUz: 'Affekt',
            termIntl: 'Affect (lotincha: affectus — ruhiy hayajon, ehtiros)',
            shortDef: 'Qisqa muddatda shiddatli va bo‘ronli kechuvchi kuchli emotsional portlash holati.',
            extendedDef: 'Psixik holatlar qatoriga kiruvchi o‘ta kuchli hissiy reaksiya. Affekt holatida ong torayadi, irodaviy nazorat susayadi va kuchli vegetativ o‘zgarishlar (yurak urishi tezlashishi, qizarish yoki oqarish) kuzatiladi.',
            example: 'Favqulodda xavf yoki kuchli haqorat paytida insonning bir necha soniya ichida o‘zini tuta olmay qattiq baqirib yuborishi.',
            topicId: 'psyuxe',
            source: 'S.L. Rubinshteyn. Основы общей психологии (2002), 575-bet.'
        },
        {
            id: 'term-diqqat',
            termUz: 'Diqqat',
            termIntl: 'Attention (lotincha: attentio)',
            shortDef: 'Ongning muayyan obyektga yo‘naltirilishi va unda to‘planishidan iborat psixik holat.',
            extendedDef: 'Diqqat o‘zining alohida mahsuliga ega bo‘lmagan, ammo sezgi, idrok, xotira va tafakkurning aniq hamda samarali kechishini ta’minlaydigan tanlovchan «filtr» mexanizmidir. U ixtiyorsiz, ixtiyoriy va ixtiyoriydan so‘nggi turlarga bo‘linadi.',
            example: 'Gavjum vokzalda minglab tovushlar ichidan aynan o‘z poyezdingiz e’lonini eshitib qolishingiz («Kokteyl kechasi effekti»).',
            topicId: 'diqqat',
            source: 'E.G‘. G‘oziyev. Umumiy psixologiya (2010), 160–175-betlar.'
        },
        {
            id: 'term-dominanta',
            termUz: 'Dominanta',
            termIntl: 'Dominant focus (lotincha: dominans — hukmron)',
            shortDef: 'Bosh miya po‘stlog‘ida vaqtincha hukmronlik qiluvchi kuchli qo‘zg‘alish o‘chog‘i.',
            extendedDef: 'Fiziolog A.A. Uxtomskiy kashf etgan qonuniyat bo‘lib, diqqatning fiziologik asosini tushuntiradi: miyadagi dominant qo‘zg‘alish markazi boshqa qo‘shni markazlarni tormozlaydi va o‘ziga kelayotgan kuchsiz impulslar hisobiga yanada kuchayadi.',
            example: 'Qiziqarli kitob o‘qiyotgan talabaning xonaga birov kirganini ham payqamay qolishi.',
            topicId: 'diqqat',
            source: 'S.L. Rubinshteyn. Основы общей психологии (2002), 418-bet.'
        },
        {
            id: 'term-ixtiyoriydan-songgi-diqqat',
            termUz: 'Ixtiyoriydan so‘nggi diqqat',
            termIntl: 'Post-voluntary attention (N.F. Dobrinin)',
            shortDef: 'Ongli maqsad saqlangan holda, irodaviy zo‘riqishsiz davom etadigan eng samarali diqqat turi.',
            extendedDef: 'Psixolog N.F. Dobrinin tomonidan ajratilgan diqqat turi. Dastlab iroda kuchi bilan boshlangan faoliyat insonni qiziqtirib qo‘ygach, irodaviy zo‘riqish yo‘qoladi va charchoqsiz uzoq davom etadi.',
            example: 'Qiyin matematik masalani yechishni majburan boshlab, jarayonga qiziqib ketib soatlab vaqt qanday o‘tganini sezmaslik.',
            topicId: 'diqqat',
            source: 'E.G‘. G‘oziyev. Umumiy psixologiya (2010), 166-bet.'
        },
        {
            id: 'term-sezgi',
            termUz: 'Sezgi',
            termIntl: 'Sensation (lotincha: sensatio)',
            shortDef: 'Narsa va hodisalarning alohida xossalarini aks ettiruvchi eng sodda bilish jarayoni.',
            extendedDef: 'Tashqi yoki ichki muhit qo‘zg‘atuvchilarining sezgi a’zolari (retseptorlar) ga bevosita ta’sir etishi natijasida buyumlarning alohida belgilari (rangi, harorati, ta’mi, og‘irligi) ongga yetkaziladi.',
            example: 'Qo‘lingizga muz bo‘lagini olganingizda faqat uning sovuqligini his qilishingiz — teri harorat sezgisidir.',
            topicId: 'idrok',
            source: 'E.G‘. G‘oziyev. Umumiy psixologiya (2010), 116-bet.'
        },
        {
            id: 'term-proprioreseptiv',
            termUz: 'Proprioreseptiv sezgilar',
            termIntl: 'Proprioception (lotincha: proprius — xos, o‘z)',
            shortDef: 'Mushak, pay va bo‘g‘imlardan keluvchi, tana holati va harakatini bildiruvchi sezgilar.',
            extendedDef: 'Ch. Sherrington tasnifiga ko‘ra, mushaklar va bo‘g‘imlarda joylashgan retseptorlar fazoda tanamiz va a’zolarimiz qay holatda turganini, harakat yo‘nalishi va kuchini ko‘z bilan ko‘rmasdan ham boshqarish imkonini beradi.',
            example: 'Qorong‘i xonada yoki ko‘zni yumgan holda barmoq uchini burun uchiga aniq tekkiza olish.',
            topicId: 'idrok',
            source: 'E.G‘. G‘oziyev. Umumiy psixologiya (2010), 120-bet.'
        },
        {
            id: 'term-idrok',
            termUz: 'Idrok',
            termIntl: 'Perception (lotincha: perceptio)',
            shortDef: 'Sezgi a’zolariga ta’sir etayotgan narsa va hodisalarning ongdagi yaxlit obrazi.',
            extendedDef: 'Sezgidan farqli ravishda, idrok alohida xossalarni emas, balki buyumni butunligicha — uning rangi, shakli, hajmi va vazifasini yaxlit obraz sifatida aks ettiradi. U yaxlitlik, predmetlilik, doimiylik va tanlovchanlik xususiyatlariga ega.',
            example: 'Qizil rang, shirin hid va dumaloq shaklni alohida emas, balki yaxlit «olma» sifatida tanib olish.',
            topicId: 'idrok',
            source: 'S.L. Rubinshteyn. Основы общей психологии (2002), 240-bet.'
        },
        {
            id: 'term-konstantlik',
            termUz: 'Idrokning doimiyligi (Konstantlik)',
            termIntl: 'Perceptual constancy (lotincha: constans — o‘zgarmas)',
            shortDef: 'Fizik sharoitlar (yorug‘lik, masofa, burchak) o‘zgarsa ham buyumning shakl, rang va o‘lchamini o‘zgarmas deb idrok etish.',
            extendedDef: 'O‘tmish tajriba va ko‘rish tizimi moslashuvi tufayli uzoqdagi odamning ko‘z to‘r pardasidagi tasviri kichrayib qolsa ham, biz uni mittigina odam deb emas, uzoqda turgan normal bo‘yli inson sifatida idrok etamiz.',
            example: 'Kechqurun xira sariq chiroq ostida ham oq ko‘ylakni sariq emas, oq rangda deb bilishimiz.',
            topicId: 'idrok',
            source: 'E.G‘. G‘oziyev. Umumiy psixologiya (2010), 146-bet.'
        },
        {
            id: 'term-xotira',
            termUz: 'Xotira',
            termIntl: 'Memory (yunoncha: μνήμη — mnema)',
            shortDef: 'O‘tmish tajribani esda olib qolish, saqlash, qayta esga tushirish va unutish jarayoni.',
            extendedDef: 'Insonning o‘z hayotiy tajribasini to‘plash, saqlash va kelajakdagi faoliyatda qo‘llash imkonini beruvchi kognitiv tizim. Material turiga ko‘ra harakat, hissiy, obrazli va so‘z-mantiq xotirasiga ajraladi.',
            example: 'Bolalikda o‘rganilgan she’rni yillar o‘tib bayramda yoddan aytib berish.',
            topicId: 'xotira',
            source: 'E.G‘. G‘oziyev. Umumiy psixologiya (2010), 178-bet.'
        },
        {
            id: 'term-soz-mantiq-xotirasi',
            termUz: 'So‘z-mantiq xotirasi',
            termIntl: 'Verbal-logical memory',
            shortDef: 'Fikrlar, tushunchalar, formulalar va mantiqiy bog‘lanishlarni esda saqlash turi.',
            extendedDef: 'Faqat insonga xos bo‘lgan oliy xotira turi bo‘lib, nutq va tafakkur bilan chambarchas bog‘liq. Unda so‘zma-so‘z yodlash emas, balki asosiy ma’no va mantiqiy aloqadorlik saqlanadi.',
            example: 'Fizika qonuni yoki psixologik nazariyaning ma’nosini tushunib, o‘z so‘zlari bilan aniq tushuntirib berish.',
            topicId: 'xotira',
            source: 'S.L. Rubinshteyn. Основы общей психологии (2002), 312-bet.'
        },
        {
            id: 'term-tafakkur',
            termUz: 'Tafakkur',
            termIntl: 'Thinking / Cognition (lotincha: cogitatio)',
            shortDef: 'Voqelikdagi narsa va hodisalar o‘rtasidagi muhim bog‘lanishlarni umumlashtirilgan va bilvosita aks ettiruvchi oliy bilish jarayoni.',
            extendedDef: 'Sezgi va idrok bevosita ko‘rib bo‘lmaydigan ichki qonuniyatlar, sabab-oqibat aloqalari va mohiyatni tushuncha, hukm hamda xulosa chiqarish orqali ochib beradigan jarayon.',
            example: 'Ertalab ko‘chadagi ho‘l asfaltni ko‘rib (idrok), kechasi yomg‘ir yog‘ganini bilvosita anglash (tafakkur).',
            topicId: 'tafakkur',
            source: 'E.G‘. G‘oziyev. Umumiy psixologiya (2010), 204-bet.'
        },
        {
            id: 'term-induksiya',
            termUz: 'Induksiya',
            termIntl: 'Induction (lotincha: inductio — keltirib chiqarish)',
            shortDef: 'Xususiy faktlar va kuzatishlardan umumiy qoida yoki xulosaga borish yo‘li.',
            extendedDef: 'Mantiqiy xulosa chiqarish usullaridan biri: bir turkumga kiruvchi bir nechta yakka hodisada ma’lum xossa takrorlansa, butun turkum uchun umumiy qoida shakllantiriladi.',
            example: 'Mis, temir va alyuminiy qizdirilganda kengayganini kuzatib, «Barcha metallar qizdirilganda kengayadi» degan xulosaga kelish.',
            topicId: 'tafakkur',
            source: 'E.G‘. G‘oziyev. Umumiy psixologiya (2010), 210-bet.'
        },
        {
            id: 'term-deduksiya',
            termUz: 'Deduksiya',
            termIntl: 'Deduction (lotincha: deductio — keltirib chiqarish)',
            shortDef: 'Umumiy qoida yoki qonuniyatdan xususiy holat haqida mantiqiy xulosa chiqarish yo‘li.',
            extendedDef: 'Induksiyaning aksi bo‘lib, tasdiqlangan umumiy hukmdan aniq bir yakka obyekt yoki vaziyatga nisbatan mantiqiy zaruriy xulosa chiqarishdir (sillogizm).',
            example: '«Barcha odamlar kislorod bilan nafas oladi» → «Alisher — odam» → «Demak, Alisher kislorod bilan nafas oladi».',
            topicId: 'tafakkur',
            source: 'E.G‘. G‘oziyev. Umumiy psixologiya (2010), 211-bet.'
        },
        {
            id: 'term-xayol',
            termUz: 'Xayol',
            termIntl: 'Imagination (lotincha: imaginatio)',
            shortDef: 'O‘tmish tasavvurlarini qayta ishlash va birlashtirish asosida yangi obrazlar yaratish jarayoni.',
            extendedDef: 'Inson faoliyat boshlashidan oldin uning natijasini ongda ko‘ra olishini, ijodiy kashfiyot va badiiy asarlar yaratishini ta’minlovchi bilish jarayoni. Qayta tiklovchi va ijodiy turlarga bo‘linadi.',
            example: 'Muhandisning hali qurilmagan ko‘prik konstruksiyasini ongida tasavvur qilib chizmaga tushirishi.',
            topicId: 'xayol',
            source: 'S.L. Rubinshteyn. Основы общей психологии (2002), 346-bet.'
        },
        {
            id: 'term-qayta-tiklovchi-xayol',
            termUz: 'Qayta tiklovchi xayol',
            termIntl: 'Reproductive imagination',
            shortDef: 'Matnli tavsif, chizma, xarita yoki sxemaga asoslanib ongda mos obrazni gavdalantirish.',
            extendedDef: 'O‘quv va kasbiy faoliyatda juda muhim xayol turi: inson o‘zi bevosita ko‘rmagan narsani belgi, so‘z yoki chizma asosida tasavvurida jonlantiradi.',
            example: 'Geografiya darsida xaritaga qarab Amazonka o‘rmonlari manzarasini ko‘z oldiga keltirish.',
            topicId: 'xayol',
            source: 'E.G‘. G‘oziyev. Umumiy psixologiya (2010), 229-bet.'
        },
        {
            id: 'term-muloqot',
            termUz: 'Muloqot',
            termIntl: 'Communication & Social Interaction',
            shortDef: 'Insonlar o‘rtasida axborot almashish, o‘zaro ta’sir va bir-birini idrok etish jarayoni.',
            extendedDef: 'Ijtimoiy psixologiyaning markaziy kategoriyasi. G.M. Andreyeva tasnifiga ko‘ra, muloqot uchta o‘zaro bog‘liq tomondan iborat: kommunikativ (axborot almashish), interaktiv (hamkorlik/raqobat harakatlari) va perseptiv (bir-birini tushunish).',
            example: 'Shifokor va bemor suhbati: shikoyatni tinglash (kommunikativ), bemor holatini his etish (perseptiv) va davolash rejasini kelishish (interaktiv).',
            topicId: 'muloqot',
            source: 'G.M. Andreyeva. Социальная психология (2001), 82-bet.'
        },
        {
            id: 'term-noverbal-muloqot',
            termUz: 'Noverbal muloqot',
            termIntl: 'Nonverbal communication',
            shortDef: 'So‘z va nutq ishtirokisiz — mimika, imo-ishora, tana holati, masofa va ovoz ohangi orqali axborot uzatish.',
            extendedDef: 'Muloqotning kommunikativ tomoniga kiruvchi muhim kanal. Tadqiqotlarga ko‘ra, suhbatdoshning hissiy munosabati va samimiyligi ko‘p jihatdan noverbal signallar orqali anglanadi.',
            example: 'Suhbatdosh «Hammasi yaxshi» desa ham, uning past ovozi va tushkun nigohidan muammo borligini sezish.',
            topicId: 'muloqot',
            source: 'V.M. Karimova. Psixologiya (2011), 142-bet.'
        },
        {
            id: 'term-empatiya',
            termUz: 'Empatiya',
            termIntl: 'Empathy (yunoncha: ἐμπάθεια — hamdardlik)',
            shortDef: 'Boshqa insonning ichki hissiy holatini uning o‘rniga o‘zini qo‘yib his qilish va tushunish qobiliyati.',
            extendedDef: 'Ham perseptiv muloqot mexanizmi, ham emotsional intellektning (EQ) asosiy tarkibiy qismi. Empatiya kognitiv (boshqaning nuqtayi nazarini tushunish) va emotsional (hamdard bo‘lish) shakllarda namoyon bo‘ladi.',
            example: 'Imtihondan yiqilgan kursdoshingizning kayfiyatini so‘zsiz tushunib, unga samimiy dalda berish.',
            topicId: 'eq',
            source: 'D. Goleman. Emotional Intelligence (1995), 96-bet; G.M. Andreyeva (2001), 128-bet.'
        },
        {
            id: 'term-refleksiya',
            termUz: 'Refleksiya',
            termIntl: 'Reflection (lotincha: reflexio — ortga qaytish, aks etish)',
            shortDef: 'Insonning o‘z ichki holati, fikrlari va xatti-harakatlarini tahlil qilishi hamda boshqalar nazari bilan baholashi.',
            extendedDef: 'Muloqotning perseptiv tomonida refleksiya — suhbatdosh meni qanday qabul qilyapti va tushunyapti, degan savolga javob izlash orqali o‘z xulq-atvorini to‘g‘rilash mexanizmidir.',
            example: 'Ma’ruzadan so‘ng o‘qituvchining «Mavzuni talabalarga tushunarli yetkaza oldimmi?» deb o‘z nutqini tahlil qilishi.',
            topicId: 'muloqot',
            source: 'G.M. Andreyeva. Социальная психология (2001), 131-bet.'
        },
        {
            id: 'term-faoliyat',
            termUz: 'Faoliyat',
            termIntl: 'Activity (ruscha: деятельность; A.N. Leontyev)',
            shortDef: 'Ongli maqsad bilan boshqariladigan, tashqi olamni va insonning o‘zini o‘zgartirishga qaratilgan faollik shakli.',
            extendedDef: 'Faqat insonga xos bo‘lgan ongli, ijtimoiy-tarixiy faollik. A.N. Leontyevga ko‘ra, faoliyat tuzilishi ehtiyoj → motiv → maqsad → harakat va operatsiyalardan iborat bo‘lib, o‘yin, o‘qish va mehnat uning asosiy turlaridir.',
            example: 'Shifokorning bemorni davolash uchun tashxis qo‘yishi va muolaja o‘tkazishi — kasbiy mehnat faoliyatidir.',
            topicId: 'faoliyat',
            source: 'A.N. Leontyev. Деятельность. Сознание. Личность (1975), 102-bet.'
        },
        {
            id: 'term-motiv',
            termUz: 'Motiv va Motivatsiya',
            termIntl: 'Motive & Motivation (lotincha: movere — harakatga keltirish)',
            shortDef: 'Motiv — ehtiyojni qondirishga undovchi ichki turtki; motivatsiya — xulq-atvorni yo‘naltiruvchi motivlar tizimi.',
            extendedDef: 'Motiv insonning «Nima uchun bu ishni qilyapman?» degan savoliga javob bo‘lib, ehtiyojning predmetlashgan shaklidir. Motivatsiya ichki (intrinsik — jarayondan zavq olish) va tashqi (ekstrinsik — mukofot yoki baho uchun) turlarga bo‘linadi.',
            example: 'Dasturlashni yangi dastur yaratish zavqi uchun o‘rganish — ichki motiv; faqat diplom olish uchun o‘qish — tashqi motiv.',
            topicId: 'faoliyat',
            source: 'A.N. Leontyev (1975), 115-bet; E.G‘. G‘oziyev (2010), 248-bet.'
        },
        {
            id: 'term-xarakter',
            termUz: 'Xarakter',
            termIntl: 'Character (yunoncha: χαρακτήρ — iz, tamg‘a, belgi)',
            shortDef: 'Hayot davomida shakllanadigan, insonning borliqqa, odamlarga, mehnatga va o‘ziga munosabatini ifodalovchi barqaror sifatlar tizimi.',
            extendedDef: 'Temperamentdan farqli ravishda, xarakter tug‘ma emas — u ijtimoiy muhit, tarbiya va o‘z-o‘zini tarbiyalash orqali shakllanadi hamda axloqiy jihatdan (halollik, mehnatsevarlik, mas’uliyat) baholanadi.',
            example: 'Qiyin vaziyatda ham bergan va’dasining ustidan chiqish va ishni oxirigacha halol bajarish — kuchli xarakter belgisidir.',
            topicId: 'shaxs',
            source: 'E.G‘. G‘oziyev. Umumiy psixologiya (2010), 298–308-betlar.'
        },
        {
            id: 'term-qobiliyat',
            termUz: 'Qobiliyat',
            termIntl: 'Ability / Aptitude',
            shortDef: 'Muayyan faoliyatni muvaffaqiyatli egallash va samarali bajarish imkonini beruvchi individual-psixologik xususiyat.',
            extendedDef: 'Qobiliyat tayyor bilim yoki ko‘nikma emas, balki ularni qanchalik tez, oson va chuqur o‘zlashtirish dinamikasini belgilovchi imkoniyatdir. Uning biologik zamini tug‘ma layoqat (zehn) bo‘lib, faqat faoliyat va mashq orqali rivojlanadi.',
            example: 'Musiqiy eshitish layoqatiga ega bolaning muntazam mashq orqali mohir pianinochiga aylanishi.',
            topicId: 'shaxs',
            source: 'B.M. Teplov (1961); E.G‘. G‘oziyev. Umumiy psixologiya (2010), 312-bet.'
        },
        {
            id: 'term-eq',
            termUz: 'Emotsional intellekt (EQ)',
            termIntl: 'Emotional Intelligence (EQ / EI)',
            shortDef: 'O‘z va o‘zgalar hissiyotlarini anglash, tushunish hamda ularni oqilona boshqarish qobiliyati.',
            extendedDef: 'P. Salovey, J. Mayer va D. Goleman tomonidan rivojlantirilgan tushuncha. EQ o‘z-o‘zini anglash, hissiy o‘zini boshqarish (kognitiv qayta baholash), empatiya va ijtimoiy munosabatlarni samarali yuritish ko‘nikmalarini qamrab oladi.',
            example: 'Muzokara vaqtida provokatsiyaga berilmay, o‘z g‘azabini anglab, vazmin va asosli javob qaytarish.',
            topicId: 'eq',
            source: 'D. Goleman. Emotional Intelligence (1995), 34–46-betlar.'
        },
        {
            id: 'term-kognitiv-qayta-baholash',
            termUz: 'Kognitiv qayta baholash',
            termIntl: 'Cognitive reappraisal (J. Gross)',
            shortDef: 'Hissiy reaksiyani o‘zgartirish maqsadida vaziyatning ma’nosini boshqa rakursdan talqin qilish strategiyasi.',
            extendedDef: 'Emotsiyalarni boshqarishning eng sog‘lom va samarali usuli: hissiyotni ichga yutish (bostirish) o‘rniga, inson vaziyatga bo‘lgan fikriy munosabatini o‘zgartiradi va natijada salbiy stress kamayadi.',
            example: 'Imtihondagi murakkab savolni «Meni yiqitish uchun tuzilgan tuzoq» emas, «Bilimimni sinash uchun qiziqarli boshqotirma» deb qabul qilish.',
            topicId: 'eq',
            source: 'D. Goleman (1995); J.J. Gross. Emotion Regulation (1998).'
        },
        {
            id: 'term-temperament',
            termUz: 'Temperament (Mijoz)',
            termIntl: 'Temperament (lotincha: temperamentum — mutanosiblik, aralashma)',
            shortDef: 'Psixik faoliyatning dinamik (sur’at, ritm, intensivlik) va emotsional tomonlarini belgilovchi tug‘ma individual xususiyatlar.',
            extendedDef: 'Temperament oliy nerv faoliyati (ONF) tipiga asoslanadi va inson xulq-atvorining mazmunini («nima qilishini») emas, balki uning dinamik uslubini («qanday tezlik va kuch bilan qilishini») belgilaydi. Yaxshi yoki yomon temperament bo‘lmaydi.',
            example: 'To‘rt xil temperamentli talaba ham imtihonga a’lo tayyorlanishi mumkin, ammo har biri o‘ziga xos sur’at va uslubda ishlaydi.',
            topicId: 'temperament-nazariyalari',
            source: 'E.G‘. G‘oziyev. Umumiy psixologiya (2010), 280–297-betlar.'
        },
        {
            id: 'term-senzitivlik',
            termUz: 'Senzitivlik (Sezgirlik)',
            termIntl: 'Sensitivity (lotincha: sensitivus — sezgir)',
            shortDef: 'Psixik reaksiya yuzaga kelishi uchun zarur bo‘lgan eng kuchsiz tashqi ta’sir kuchi.',
            extendedDef: 'V.S. Merlin ajratgan temperament mezonlaridan biri: kishini ta’sirlantirish, xursand qilish yoki ranjitish uchun qanchalik kam ta’sir yetarli bo‘lsa, uning senzitivligi shunchalik yuqori hisoblanadi (masalan, melanxolik tipda).',
            example: 'Xonadagi bilinar-bilinmas shovqin yoki suhbatdoshning biroz o‘zgargan ohangini darhol sezish.',
            topicId: 'temperament-xususiyatlari',
            source: 'V.S. Merlin. Очерк интегрального исследования индивидуальности (1986), 58-bet.'
        },
        {
            id: 'term-reaktivlik',
            termUz: 'Reaktivlik',
            termIntl: 'Reactivity',
            shortDef: 'Tashqi yoki ichki ta’sirlarga beixtiyor beriladigan emotsional va harakat javobining kuchi.',
            extendedDef: 'Bir xil kuchdagi qo‘zg‘atuvchiga (masalan, kutilmagan ovoz yoki tanqidga) inson qanchalik kuchli va tez emotsional javob qaytarishini ko‘rsatuvchi temperament mezoni.',
            example: 'Kutilmagan savolga xolerikning darhol qizishib va baland ovozda javob qaytarishi — yuqori reaktivlikdir.',
            topicId: 'temperament-xususiyatlari',
            source: 'V.S. Merlin (1986), 60-bet; E.G‘. G‘oziyev (2010), 291-bet.'
        },
        {
            id: 'term-plastiklik-rigidlik',
            termUz: 'Plastiklik va Rigidlik',
            termIntl: 'Plasticity vs. Rigidity',
            shortDef: 'O‘zgaruvchan tashqi sharoitga tez moslashish (plastiklik) yoki odatlangan tartibga qattiq bog‘lanib qolish (rigidlik).',
            extendedDef: 'Asab jarayonlarining harakatchanligi bilan bog‘liq temperament mezoni. Plastik tiplar (sangvinik) bir ishdan ikkinchisiga oson ko‘chadi, rigid tiplar (flegmatik) esa sekin moslashadi, ammo barqaror ishlaydi.',
            example: 'Uchrashuv vaqti va joyi to‘satdan o‘zgarganda sangvinikning tezda yangi rejaga moslashishi (plastiklik).',
            topicId: 'temperament-xususiyatlari',
            source: 'V.S. Merlin (1986), 63-bet; E.G‘. G‘oziyev (2010), 292-bet.'
        },
        {
            id: 'term-ekstraversiya-introversiya',
            termUz: 'Ekstraversiya va Introversiya',
            termIntl: 'Extraversion & Introversion (C.G. Jung)',
            shortDef: 'Shaxs psixik faolligi va reaksiyalarining tashqi olamga (ekstraversiya) yoki ichki kechinmalarga (introversiya) yo‘nalganligi.',
            extendedDef: 'Karl Yung kiritgan va Gans Ayzenk temperament modeliga tatbiq etgan shkala. Ekstravertlar (sangvinik, xolerik) keng muloqot doirasiga intilsa, introvertlar (flegmatik, melanxolik) sokinlik va chuqur ichki tahlilni afzal ko‘radilar.',
            example: 'Dam olish kunini ekstravert katta davrada o‘tkazishni, introvert esa sokin kutubxonada kitob o‘qishni tanlaydi.',
            topicId: 'temperament-xususiyatlari',
            source: 'C.G. Jung. Psychological Types (1921); G. Ayzenk (1953).'
        },
        {
            id: 'term-sangvinik',
            termUz: 'Sangvinik',
            termIntl: 'Sanguine (lotincha: sanguis — qon)',
            shortDef: 'Oliy nerv faoliyati kuchli, muvozanatli va harakatchan («chaqqon») bo‘lgan temperament tipi.',
            extendedDef: 'I.P. Pavlov tasnifiga ko‘ra kuchli, muvozanatli va harakatchan asab tizimiga ega tip. Yuqori kirishimlilik, plastiklik, optimizm va stressga chidamlilik bilan ajralib turadi, ammo monoton (bir xil) ishlardan tez zerikishi mumkin.',
            example: 'Yangi jamoaga kelgan kuniyoq hamma bilan til topishib, umumiy loyihani jo‘shqinlik bilan muvofiqlashtiruvchi xodim.',
            topicId: 'temperament-turlari',
            source: 'I.P. Pavlov (1951); E.G‘. G‘oziyev. Umumiy psixologiya (2010), 293-bet.'
        },
        {
            id: 'term-xolerik',
            termUz: 'Xolerik',
            termIntl: 'Choleric (yunoncha: χολή — safro, o‘t)',
            shortDef: 'Oliy nerv faoliyati kuchli, ammo muvozanatsiz (qo‘zg‘alish tormozlanishdan ustun) bo‘lgan jo‘shqin temperament tipi.',
            extendedDef: 'Kuchli energiya, qat’iyatlilik, tashabbuskorlik va yuqori reaktivlikka ega tip. Qo‘zg‘alish jarayoni tormozlanishdan ustun bo‘lgani sababli sabrsizlik va tez qizishuvchanlik kuzatilishi mumkin.',
            example: 'Murakkab inqirozli vaziyatda mas’uliyatni qo‘rqmasdan o‘z zimmasiga olib, jamoani maqsad sari boshlovchi rahbar.',
            topicId: 'temperament-turlari',
            source: 'I.P. Pavlov (1951); E.G‘. G‘oziyev. Umumiy psixologiya (2010), 294-bet.'
        },
        {
            id: 'term-flegmatik',
            termUz: 'Flegmatik',
            termIntl: 'Phlegmatic (yunoncha: φλέγμα — balg‘am)',
            shortDef: 'Oliy nerv faoliyati kuchli, muvozanatli, ammo sust (inert) bo‘lgan vazmin temperament tipi.',
            extendedDef: 'Asab jarayonlari kuchli va muvozanatli bo‘lib, qo‘zg‘alishdan tormozlanishga o‘tish sekin kechadi. Yuqori sabr-toqat, sovuqqonlik, tartiblilik va boshlagan ishni oxirigacha yetkazish bilan tavsiflanadi.',
            example: 'Katta hajmdagi moliyaviy hisobot yoki dastur kodini soatlab chalg‘imasdan, yuqori aniqlik bilan tekshiruvchi mutaxassis.',
            topicId: 'temperament-turlari',
            source: 'I.P. Pavlov (1951); E.G‘. G‘oziyev. Umumiy psixologiya (2010), 295-bet.'
        },
        {
            id: 'term-melanxolik',
            termUz: 'Melanxolik',
            termIntl: 'Melancholic (yunoncha: μέλαινα χολή — qora safro)',
            shortDef: 'Oliy nerv faoliyati kuchsiz, ammo yuqori senzitivlikka (nozik sezgirlikka) ega bo‘lgan ta’sirchan temperament tipi.',
            extendedDef: 'Kuchli va uzoq davom etuvchi yuklamalarda asab tizimi tez toladi, ammo kuchsiz signallarga nisbatan o‘ta sezgir bo‘ladi. Yuqori empatiya, detallarga e’tibor, badiiy did va mas’uliyatlilik uning kuchli jihatlaridir.',
            example: 'Musiqa asaridagi eng nozik ohang o‘zgarishlarini yoki suhbatdoshning yashirin kayfiyatini bexato ilg‘ovchi ijodkor.',
            topicId: 'temperament-turlari',
            source: 'I.P. Pavlov (1951); E.G‘. G‘oziyev. Umumiy psixologiya (2010), 296-bet.'
        },
        {
            id: 'term-strup-effekti',
            termUz: 'Strup effekti (Kognitiv interferensiya)',
            termIntl: 'Stroop Effect (J.R. Stroop, 1935)',
            shortDef: 'So‘zning ma’nosi bilan u yozilgan siyoh rangi mos kelmaganda reaksiya vaqtining sekinlashishi hodisasi.',
            extendedDef: '1935-yilda Jon Ridli Strup kashf etgan kognitiv hodisa: o‘qish avtomatlashgan jarayon bo‘lgani uchun, «QIZIL» so‘zi ko‘k rangda yozilganda, siyoh rangini aytish uchun ixtiyoriy diqqat avtomatik o‘qish impulsini tormozlashi kerak bo‘ladi.',
            example: 'Laboratoriyadagi Strup sinovida mos kelmaydigan rangli so‘zlarni nomlashda 150–300 millisekund kechikish yuzaga kelishi.',
            topicId: 'diqqat',
            source: 'J.R. Stroop. Studies of interference in serial verbal reactions (1935).'
        }
    ];

    /* =========================================================
       3. TEST SAVOLLARI BAZASI (BARCHA 13 MAVZU + 6 TEST TURI)
       Turlar:
       - 'single'      : Bir javobli test
       - 'multi'       : Ko'p javobli test
       - 'boolean'     : To'g'ri / noto'g'ri
       - 'matching'    : Moslashtirish
       - 'sequence'    : Ketma-ketlikni tartiblash
       - 'situational' : Vaziyatli savollar
    ========================================================= */
    const QUESTIONS = [
        /* -------------------- 1. PSYXE -------------------- */
        {
            id: 'q-psyuxe-1',
            topicId: 'psyuxe',
            type: 'single',
            difficulty: 'Oson',
            question: 'Qadimgi yunon tilida «Psyuxe» va «Logos» so‘zlarining birikmasi qanday ma’noni anglatadi?',
            options: [
                'Jon (ruh) haqidagi ilm yoki ta’limot',
                'Asab tizimi va miya fiziologiyasi',
                'Insonning jamiyatdagi xulq-atvori qoidalari',
                'Tana suyuqliklari mutanosibligi'
            ],
            correctAnswer: 0,
            explanation: 'Qadimgi yunon tilida «Psyuxe» — jon, ruh, nafas; «Logos» — ilm, ta’limot demakdir.',
            sourceId: 'ref-gziyev-2010'
        },
        {
            id: 'q-psyuxe-2',
            topicId: 'psyuxe',
            type: 'matching',
            difficulty: 'O‘rta',
            question: 'Psixikaning uch asosiy qatlamini ularga mos hodisalar bilan to‘g‘ri moslashtiring:',
            pairs: [
                { left: 'Psixik jarayonlar', right: 'Diqqat, sezgi, idrok, xotira, tafakkur, xayol' },
                { left: 'Psixik holatlar', right: 'Tetiklik, charchoq, stress, affekt, ilhom, kayfiyat' },
                { left: 'Shaxs xususiyatlari', right: 'Temperament, xarakter, qobiliyat, qiziqish' }
            ],
            explanation: 'Umumiy psixologiyada psixika 3 qatlamga ajratiladi: qisqa muddatli faol jarayonlar, fon holatlari va barqaror shaxs xususiyatlari.',
            sourceId: 'ref-gziyev-2010'
        },
        {
            id: 'q-psyuxe-3',
            topicId: 'psyuxe',
            type: 'boolean',
            difficulty: 'Oson',
            question: 'Arastuning (Aristotelning) «Jon haqida» («De Anima») asari psixologiyaning ilk tizimli ilmiy poydevori hisoblanadi.',
            options: ['To‘g‘ri', 'Noto‘g‘ri'],
            correctAnswer: 0,
            explanation: 'Arastu «Jon haqida» asarida ilk bor sezgi, idrok, xotira va tafakkur jarayonlarini tizimli tahlil qilgan.',
            sourceId: 'ref-gziyev-2010'
        },

        /* -------------------- 2. DIQQAT -------------------- */
        {
            id: 'q-diqqat-1',
            topicId: 'diqqat',
            type: 'situational',
            difficulty: 'O‘rta',
            question: 'Vaziyat: Talaba qiyin ilmiy maqolani o‘qishni dastlab o‘zini majburlab, irodaviy zo‘r berish bilan boshladi. Ammo 15 daqiqadan so‘ng mavzu uni shu qadar qiziqtirib qo‘ydiki, u hech qanday zo‘riqishsiz yana bir soat o‘qishda davom etdi. Bu yerda diqqatning qanday o‘zgarishi yuz berdi?',
            options: [
                'Ixtiyoriy diqqatdan ixtiyoriydan so‘nggi diqqatga o‘tish',
                'Ixtiyorsiz diqqatdan ixtiyoriy diqqatga o‘tish',
                'Diqqatning bo‘linishidan ixtiyorsiz diqqatga o‘tish',
                'Ta’sirlanish qonunidan ixtiyorsiz diqqatga o‘tish'
            ],
            correctAnswer: 0,
            explanation: 'Dastlab ongli maqsad va iroda bilan boshlangan (ixtiyoriy) diqqat ishga qiziqib ketgach, irodaviy zo‘riqishsiz davom etuvchi «ixtiyoriydan so‘nggi diqqat»ga aylanadi.',
            sourceId: 'ref-gziyev-2010'
        },
        {
            id: 'q-diqqat-2',
            topicId: 'diqqat',
            type: 'multi',
            difficulty: 'O‘rta',
            question: 'Quyidagilardan qaysilari diqqatning xususiyatlari tarkibiga kiradi? (Bir nechta to‘g‘ri javobni belgilang)',
            options: [
                'Diqqatning barqarorligi',
                'Diqqatning taqsimlanishi',
                'Diqqatning ko‘chishi',
                'Idrokning predmetliligi'
            ],
            correctAnswer: [0, 1, 2],
            explanation: 'Barqarorlik, taqsimlanish, bo‘linish va ko‘chish diqqat xususiyatlaridir. Predmetlilik esa idrok xususiyatiga kiradi.',
            sourceId: 'ref-rubinshteyn-2002'
        },
        {
            id: 'q-diqqat-3',
            topicId: 'diqqat',
            type: 'single',
            difficulty: 'Murakkab',
            question: 'Jarrohning operatsiya vaqtida bir vaqtning o‘zida ham jarrohlik asboblariga, ham bemorning yurak urishi monitoriga muvaffaqiyatli e’tibor berishi diqqatning qaysi xususiyatiga misol bo‘ladi?',
            options: [
                'Diqqatning taqsimlanishi',
                'Ixtiyorsiz diqqat',
                'Diqqatning qaytaruvchi qonuni',
                'Diqqatning chalg‘ishi'
            ],
            correctAnswer: 0,
            explanation: 'Bir vaqtning o‘zida ikki yoki undan ortiq faoliyatni muvaffaqiyatli nazorat qilish va bajarish diqqatning taqsimlanishidir.',
            sourceId: 'ref-gziyev-2010'
        },

        /* -------------------- 3. SEZGI VA IDROK -------------------- */
        {
            id: 'q-idrok-1',
            topicId: 'idrok',
            type: 'single',
            difficulty: 'Oson',
            question: 'Qorong‘i xonada ham oq qog‘ozni oq rangda deb idrok etishimiz idrokning qaysi xususiyatini ifodalaydi?',
            options: [
                'Doimiylik (Konstantlik)',
                'Interoreseptivlik',
                'Proprioreseptivlik',
                'Ixtiyorsizlik'
            ],
            correctAnswer: 0,
            explanation: 'Yorug‘lik yoki masofa o‘zgarsa ham buyumning rang, shakl va hajmini o‘zgarmas deb bilish idrokning doimiylik (konstantlik) xususiyatidir.',
            sourceId: 'ref-gziyev-2010'
        },
        {
            id: 'q-idrok-2',
            topicId: 'idrok',
            type: 'matching',
            difficulty: 'O‘rta',
            question: 'Ch. Sherrington tasnifiga ko‘ra sezgi turlarini ularning funksiyasi bilan moslashtiring:',
            pairs: [
                { left: 'Eksteroreseptiv sezgilar', right: 'Tashqi dunyoni aks ettiruvchi 5 sezgi (ko‘rish, eshitish, hid, ta’m, teri)' },
                { left: 'Interoreseptiv sezgilar', right: 'Ichki a’zolardan keluvchi signallar (ochlik, tashnalik, og‘riq)' },
                { left: 'Proprioreseptiv sezgilar', right: 'Tana holati, mushak harakati va muvozanatni bildiruvchi sezgilar' }
            ],
            explanation: 'Sherrington retseptorlarni tashqi muhit (ekstero-), ichki a’zolar (intero-) va mushak-bo‘g‘im muvozanati (proprio-) bo‘yicha 3 turga ajratgan.',
            sourceId: 'ref-gziyev-2010'
        },
        {
            id: 'q-idrok-3',
            topicId: 'idrok',
            type: 'boolean',
            difficulty: 'Oson',
            question: 'Sezgi narsa va hodisalarning yaxlit obrazini aks ettiradi, idrok esa faqat alohida bir xossasini aks ettiradi.',
            options: ['To‘g‘ri', 'Noto‘g‘ri'],
            correctAnswer: 1,
            explanation: 'Noto‘g‘ri. Aksincha, sezgi alohida xossalarni (masalan, faqat rang yoki haroratni), idrok esa narsa va hodisalarning yaxlit obrazini aks ettiradi.',
            sourceId: 'ref-rubinshteyn-2002'
        },

        /* -------------------- 4. XOTIRA -------------------- */
        {
            id: 'q-xotira-1',
            topicId: 'xotira',
            type: 'sequence',
            difficulty: 'Oson',
            question: 'Xotira jarayonlarining mantiqiy-dinamik ketma-ketligini to‘g‘ri tartibda joylashtiring:',
            items: [
                'Esda olib qolish (yangi axborotni qabul qilish)',
                'Esda saqlash (axborotni uzoq muddat ushlab turish)',
                'Qayta esga tushirish (kerakli ma’lumotni ongga qaytarish)',
                'Unutish (ishlatilmagan axborotning chiqib ketishi)'
            ],
            explanation: 'Xotira dinamikasi: Esda olib qolish → Esda saqlash → Qayta esga tushirish → Unutish bosqichlaridan iborat.',
            sourceId: 'ref-gziyev-2010'
        },
        {
            id: 'q-xotira-2',
            topicId: 'xotira',
            type: 'situational',
            difficulty: 'O‘rta',
            question: 'Vaziyat: Yillar davomida velosiped minmagan inson velosipedga o‘tirishi bilan muvozanatni saqlab bemalol haydab ketdi. Bu holatda xotiraning qaysi turi yetakchi rol o‘ynadi?',
            options: [
                'Harakat (motor) xotirasi',
                'So‘z-mantiq xotirasi',
                'Hissiy (emotsional) xotira',
                'Obrazli xotira'
            ],
            correctAnswer: 0,
            explanation: 'Suzish, velosiped haydash, yozish va sport malakalarini eslab qolish harakat (motor) xotirasiga kiradi.',
            sourceId: 'ref-gziyev-2010'
        },
        {
            id: 'q-xotira-3',
            topicId: 'xotira',
            type: 'multi',
            difficulty: 'O‘rta',
            question: 'Saqlanayotgan material xususiyatiga ko‘ra xotiraning 4 asosiy turini belgilang:',
            options: [
                'Hissiy (emotsional) xotira',
                'Harakat (motor) xotirasi',
                'Obrazli xotira',
                'So‘z-mantiq xotirasi',
                'Proprioreseptiv xotira'
            ],
            correctAnswer: [0, 1, 2, 3],
            explanation: 'Material xususiyatiga ko‘ra xotira: hissiy, harakat, obrazli va so‘z-mantiq turlariga bo‘linadi.',
            sourceId: 'ref-rubinshteyn-2002'
        },

        /* -------------------- 5. TAFAKKUR -------------------- */
        {
            id: 'q-tafakkur-1',
            topicId: 'tafakkur',
            type: 'single',
            difficulty: 'O‘rta',
            question: '«Barcha metallar elektr tokini o‘tkazadi» + «Mis — metall» → «Demak, mis elektr tokini o‘tkazadi». Ushbu mantiqiy jarayon xulosa chiqarishning qaysi yo‘liga kiradi?',
            options: [
                'Deduksiya (umumiy qoidadan xususiy holatga)',
                'Induksiya (xususiy kuzatishdan umumiy qoidaga)',
                'Perseptiv konstantlik',
                'Ixtiyorsiz assotsiatsiya'
            ],
            correctAnswer: 0,
            explanation: 'Umumiy qoidaga («Barcha metallar...») tayanib, xususiy holat («Mis...») haqida xulosa chiqarish deduksiyadir.',
            sourceId: 'ref-gziyev-2010'
        },
        {
            id: 'q-tafakkur-2',
            topicId: 'tafakkur',
            type: 'matching',
            difficulty: 'O‘rta',
            question: 'Tafakkurning uch mantiqiy shaklini ularning ta’rifi bilan moslashtiring:',
            pairs: [
                { left: 'Tushuncha', right: 'Predmetlarning eng muhim va umumiy belgilarini aks ettiruvchi fikr shakli' },
                { left: 'Hukm', right: 'Narsalar o‘rtasidagi bog‘liqlikni tasdiqlovchi yoki inkor etuvchi fikr' },
                { left: 'Xulosa chiqarish', right: 'Bir nechta hukmlardan yangi mantiqiy bilim hosil qilish' }
            ],
            explanation: 'Tafakkur tushuncha, hukm va xulosa chiqarishdan iborat uch asosiy mantiqiy shaklda namoyon bo‘ladi.',
            sourceId: 'ref-gziyev-2010'
        },

        /* -------------------- 6. XAYOL -------------------- */
        {
            id: 'q-xayol-1',
            topicId: 'xayol',
            type: 'situational',
            difficulty: 'Oson',
            question: 'Vaziyat: O‘quvchi badiiy roman o‘qiyotganida yozuvchi so‘z bilan tasvirlagan tarixiy qal’a va qahramon qiyofasini ko‘z oldiga aniq keltirdi. Bu xayolning qaysi turi?',
            options: [
                'Qayta tiklovchi xayol',
                'Ixtiyorsiz xayol (tush ko‘rish)',
                'Salbiy (destruktiv) xayol',
                'Proprioreseptiv sezgi'
            ],
            correctAnswer: 0,
            explanation: 'Chizma, xarita yoki badiiy tasvirga qarab ongda obrazni gavdalantirish qayta tiklovchi xayol hisoblanadi.',
            sourceId: 'ref-gziyev-2010'
        },
        {
            id: 'q-xayol-2',
            topicId: 'xayol',
            type: 'single',
            difficulty: 'O‘rta',
            question: 'Sportchining musobaqadan oldin o‘z harakatlarini va g‘alaba qozonishini ijobiy tasavvur qilishi (vizualizatsiya) xayolning qaysi ta’sir yo‘nalishiga kiradi?',
            options: [
                'Ijobiy (Konstruktiv) xayol',
                'Salbiy (Destruktiv) xayol',
                'Neytral xayol',
                'Ixtiyorsiz tush ko‘rish'
            ],
            correctAnswer: 0,
            explanation: 'Insonni harakatga undovchi, ilhom va ishonch beruvchi obrazlar ijobiy (konstruktiv) xayoldir.',
            sourceId: 'ref-rubinshteyn-2002'
        },

        /* -------------------- 7. MULOQOT -------------------- */
        {
            id: 'q-muloqot-1',
            topicId: 'muloqot',
            type: 'matching',
            difficulty: 'O‘rta',
            question: 'Muloqotning uch tomonini (G.M. Andreyeva tasnifi) ularning mazmuni bilan moslashtiring:',
            pairs: [
                { left: 'Kommunikativ tomoni', right: 'Verbal va noverbal vositalar orqali axborot hamda fikr almashinuvi' },
                { left: 'Interaktiv tomoni', right: 'Ishtirokchilarning birgalikdagi harakatlari (hamkorlik yoki raqobat)' },
                { left: 'Perseptiv tomoni', right: 'Odamlarning bir-birini idrok etishi va tushunishi (empatiya, refleksiya)' }
            ],
            explanation: 'Muloqot uchta uzviy qirradan — axborot almashish (kommunikativ), o‘zaro harakat (interaktiv) va bir-birini tushunishdan (perseptiv) iborat.',
            sourceId: 'ref-andreeva-2001'
        },
        {
            id: 'q-muloqot-2',
            topicId: 'muloqot',
            type: 'single',
            difficulty: 'O‘rta',
            question: 'Insonning o‘z xatti-harakati va fikrlarini suhbatdoshi nazari bilan tashqaridan ko‘rib anglab yetishi nima deb ataladi?',
            options: [
                'Refleksiya',
                'Senzitivlik',
                'Induksiya',
                'Rigidlik'
            ],
            correctAnswer: 0,
            explanation: 'Refleksiya — muloqotning perseptiv mexanizmi bo‘lib, o‘zini boshqa kishi nuqtayi nazaridan baholash va anglashdir.',
            sourceId: 'ref-andreeva-2001'
        },

        /* -------------------- 8. FAOLIYAT VA MOTIVATSIYA -------------------- */
        {
            id: 'q-faoliyat-1',
            topicId: 'faoliyat',
            type: 'sequence',
            difficulty: 'O‘rta',
            question: 'A.N. Leontyev nazariyasiga ko‘ra faoliyat tuzilishining bosqichlarini to‘g‘ri ketma-ketlikda joylashtiring:',
            items: [
                'Ehtiyoj (yetishmovchilik hissi)',
                'Motiv (ehtiyojni qondirishga undovchi ichki turtki)',
                'Maqsad (kutilayotgan natijaning ongdagi obrazi)',
                'Harakat va operatsiya (maqsadga erishish yo‘lidagi amaliy qadamlar)'
            ],
            explanation: 'Faoliyat zanjiri: Ehtiyoj → Motiv → Maqsad → Harakat va operatsiya tartibida shakllanadi.',
            sourceId: 'ref-leontyev-1975'
        },
        {
            id: 'q-faoliyat-2',
            topicId: 'faoliyat',
            type: 'situational',
            difficulty: 'Oson',
            question: 'Vaziyat: Talaba psixologiya kitobini baho olish yoki jazodan qochish uchun emas, balki inson tabiatini tushunish jarayonining o‘zidan zavq olgani uchun mutolaa qilmoqda. Bu qanday motivatsiya turi?',
            options: [
                'Ichki motivatsiya (Intrinsik)',
                'Tashqi motivatsiya (Ekstrinsik)',
                'Shartsiz reflektor harakat',
                'Affektiv portlash'
            ],
            correctAnswer: 0,
            explanation: 'Faoliyat jarayonining o‘zidan zavqlanish va qiziquvchanlikka asoslangan turtki ichki (intrinsik) motivatsiyadir.',
            sourceId: 'ref-leontyev-1975'
        },

        /* -------------------- 9. SHAXS XUSUSIYATLARI -------------------- */
        {
            id: 'q-shaxs-1',
            topicId: 'shaxs',
            type: 'single',
            difficulty: 'Oson',
            question: '«Avtomobil dvigatelining quvvati va tezligi — bu ..., haydovchining uni qayerga va qanday boshqarishi esa — ...». Nuqtalar o‘rniga mos tushunchalarni qo‘ying:',
            options: [
                'Temperament va Xarakter',
                'Qiziqish va Sezgi',
                'Hukm va Xulosa',
                'Induksiya va Deduksiya'
            ],
            correctAnswer: 0,
            explanation: 'Temperament psixik faoliyatning tug‘ma dinamik quvvati va tezligini, xarakter esa hayotda shakllangan maqsadli munosabat va boshqaruvni bildiradi.',
            sourceId: 'ref-gziyev-2010'
        },
        {
            id: 'q-shaxs-2',
            topicId: 'shaxs',
            type: 'multi',
            difficulty: 'O‘rta',
            question: 'Shaxsning individual-tipologik xususiyatlari tarkibiga kiruvchi 4 asosiy tushunchani belgilang:',
            options: [
                'Temperament',
                'Xarakter',
                'Qobiliyat',
                'Qiziqish',
                'Interoreseptiv sezgi'
            ],
            correctAnswer: [0, 1, 2, 3],
            explanation: 'Temperament, xarakter, qobiliyat va qiziqish shaxsning individual xususiyatlarini tashkil etadi.',
            sourceId: 'ref-gziyev-2010'
        },

        /* -------------------- 10. EMOTSIONAL INTELLEKT (EQ) -------------------- */
        {
            id: 'q-eq-1',
            topicId: 'eq',
            type: 'situational',
            difficulty: 'O‘rta',
            question: 'Vaziyat: Aeroportda reys 3 soatga kechikdi. Yo‘lovchi asabiylashish o‘rniga vaziyatga boshqa rakursdan qarab: «Yaxshi bo‘ldi, o‘qiy olmay yurgan kitobimni bemalol tugatib olaman», deb xotirjamlikni saqladi. Bu EQning qaysi mexanizmi?',
            options: [
                'Kognitiv qayta baholash',
                'Rigidlik',
                'Ixtiyorsiz diqqat',
                'Gumoral reaksiya'
            ],
            correctAnswer: 0,
            explanation: 'Stressli vaziyatga boshqa rakursdan qarab, uning ma’nosini ijobiy/konstruktiv qayta talqin qilish kognitiv qayta baholashdir.',
            sourceId: 'ref-goleman-1995'
        },
        {
            id: 'q-eq-2',
            topicId: 'eq',
            type: 'boolean',
            difficulty: 'Oson',
            question: 'Emotsional intellektning (EQ) birinchi mezoni — inson ayni damda o‘zi qanday hissiyotni boshdan kechirayotganini aniq anglashidir (o‘z-o‘zini anglash).',
            options: ['To‘g‘ri', 'Noto‘g‘ri'],
            correctAnswer: 0,
            explanation: 'D. Goleman modeliga ko‘ra, o‘z hissiyotlarini tanish va nomlay olish (o‘z-o‘zini anglash) EQning poydevoridir.',
            sourceId: 'ref-goleman-1995'
        },

        /* -------------------- 11. TEMPERAMENT NAZARIYALARI -------------------- */
        {
            id: 'q-temp-naz-1',
            topicId: 'temperament-nazariyalari',
            type: 'matching',
            difficulty: 'Murakkab',
            question: 'I.P. Pavlovning Oliy nerv faoliyati (ONF) tiplarini 4 klassik temperament bilan moslashtiring:',
            pairs: [
                { left: 'Kuchli, muvozanatli, harakatchan («Chaqqon»)', right: 'Sangvinik' },
                { left: 'Kuchli, muvozanatsiz (qo‘zg‘alish ustun — «Jo‘shqin»)', right: 'Xolerik' },
                { left: 'Kuchli, muvozanatli, sust («Vazmin»)', right: 'Flegmatik' },
                { left: 'Kuchsiz, ammo yuqori sezgir («Ta’sirchan»)', right: 'Melanxolik' }
            ],
            explanation: 'I.P. Pavlov asab jarayonlarining kuchi, muvozanati va harakatchanligi kombinatsiyasidan 4 ta ONF tipini ajratgan.',
            sourceId: 'ref-pavlov-1951'
        },
        {
            id: 'q-temp-naz-2',
            topicId: 'temperament-nazariyalari',
            type: 'single',
            difficulty: 'O‘rta',
            question: 'Gippokrat va Galenning gumoral nazariyasida «Phlegma» (balg‘am) va «Chole» (sariq safro) suyuqliklari qaysi temperament turlariga asos qilib olingan?',
            options: [
                'Flegmatik va Xolerik',
                'Sangvinik va Melanxolik',
                'Endomorf va Ektomorf',
                'Piknik va Astenik'
            ],
            correctAnswer: 0,
            explanation: 'Phlegma (balg‘am) — Flegmatik; Chole (sariq safro/o‘t) — Xolerik; Sanguis (qon) — Sangvinik; Melaina chole (qora safro) — Melanxolik.',
            sourceId: 'ref-gziyev-2010'
        },

        /* -------------------- 12. TEMPERAMENT XUSUSIYATLARI -------------------- */
        {
            id: 'q-temp-xus-1',
            topicId: 'temperament-xususiyatlari',
            type: 'single',
            difficulty: 'Murakkab',
            question: 'Psixik reaksiya yuzaga kelishi uchun zarur bo‘lgan eng kuchsiz tashqi ta’sir kuchi V.S. Merlin tasnifida nima deb ataladi?',
            options: [
                'Senzitivlik (Sezgirlik)',
                'Rigidlik',
                'Ekstraversiya',
                'Predmetlilik'
            ],
            correctAnswer: 0,
            explanation: 'Senzitivlik — insonda psixik reaksiya hosil qilish uchun yetarli bo‘lgan eng kichik (minimal) tashqi ta’sir darajasidir.',
            sourceId: 'ref-merlin-1986'
        },
        {
            id: 'q-temp-xus-2',
            topicId: 'temperament-xususiyatlari',
            type: 'multi',
            difficulty: 'O‘rta',
            question: 'Temperament va xarakter o‘rtasidagi to‘g‘ri farqlarni belgilang (bir nechta javob):',
            options: [
                'Temperament tug‘ma biologik asosga ega, xarakter esa hayot davomida shakllanadi',
                'Temperamentga axloqiy («yaxshi/yomon») baho berilmaydi, xarakter esa axloqiy baholanadi',
                'Xarakterni tarbiya va o‘z ustida ishlash orqali o‘zgartirish mumkin',
                'Temperament har yili tarbiya ta’sirida boshqa tipga butunlay almashadi'
            ],
            correctAnswer: [0, 1, 2],
            explanation: 'Temperament tug‘ma va barqaror dinamik poydevor bo‘lib, axloqiy baholanmaydi; xarakter esa ijtimoiy shakllanadi va tarbiya bilan o‘zgaradi.',
            sourceId: 'ref-merlin-1986'
        },

        /* -------------------- 13. TEMPERAMENT TURLARI -------------------- */
        {
            id: 'q-temp-tur-1',
            topicId: 'temperament-turlari',
            type: 'situational',
            difficulty: 'O‘rta',
            question: 'Vaziyat: Favqulodda texnik nosozlik yuz berganda jamoaning aksariyat a’zolari sarosimaga tushdi. Ammo bir muhandis hech qanday vahimasiz, sovuqqonlik bilan yo‘riqnomani ochib, barcha bosqichlarni tizimli bajarib muammoni bartaraf etdi. Uning xatti-harakati qaysi temperamentning kuchli jihatiga mos?',
            options: [
                'Flegmatik (Introvert + Barqaror asab tizimi)',
                'Xolerik (Ekstravert + Muvozanatsiz asab tizimi)',
                'Melanxolik (Introvert + Kuchsiz sezgir asab tizimi)',
                'Sangvinik (Ekstravert + Harakatchan asab tizimi)'
            ],
            correctAnswer: 0,
            explanation: 'Flegmatik tip kuchli, muvozanatli va bosiq bo‘lib, ekstremal vaziyatda ham sovuqqonlik va tizimli aniqlikni yo‘qotmaydi.',
            sourceId: 'ref-pavlov-1951'
        },
        {
            id: 'q-temp-tur-2',
            topicId: 'temperament-turlari',
            type: 'matching',
            difficulty: 'Oson',
            question: '4 temperament tipini jamoadagi eng kuchli funksional rollari bilan moslashtiring:',
            pairs: [
                { left: 'Xolerik', right: 'G‘oya beradi, start boshlaydi va jamoani maqsad sari shiddat bilan ruhlantiradi' },
                { left: 'Sangvinik', right: 'Odamlarni tez birlashtiradi, muzokara olib boradi va o‘zgarishga oson moslashadi' },
                { left: 'Flegmatik', right: 'Reja asosida barqaror, sabr va aniqlik bilan ishni oxirigacha yetkazadi' },
                { left: 'Melanxolik', right: 'Nozik detallar va xatolarni oldindan ko‘rib, yuqori sifat hamda empatiyani ta’minlaydi' }
            ],
            explanation: 'Har bir jamoa muvaffaqiyati uchun barcha 4 temperament tipining o‘ziga xos kuchli tomonlari muhimdir.',
            sourceId: 'ref-merlin-1986'
        }
    ];

    /* =========================================================
       4. SMART FLASHCARDS BOSHLANG'ICH TO'PLAMI (26 TA KARTOCHKA)
    ========================================================= */
    const DEFAULT_FLASHCARDS = [
        {
            id: 'fc-1', topicId: 'psyuxe',
            term: 'Umumiy psixologiya nimani o‘rganadi?',
            definition: 'Inson psixikasining umumiy qonuniyatlarini: psixik jarayonlar, psixik holatlar va shaxsning individual-tipologik xususiyatlarini o‘rganuvchi fundamental fan.',
            example: 'Muammoni yechishda idrok, diqqat, xotira va tafakkurning yaxlit tizim sifatida ishlashi.'
        },
        {
            id: 'fc-2', topicId: 'psyuxe',
            term: 'Psixik holatlar nima va ularga nimalar kiradi?',
            definition: 'Ma’lum vaqt oralig‘ida butun psixikani qamrab oluvchi va faoliyat samaradorligiga ta’sir etuvchi fon holatlari: tetiklik, charchoq, stress, affekt, ilhom, kayfiyat.',
            example: 'Tetiklik holatida 40 daqiqada bajariladigan vazifa charchoqda ikki baravar ko‘p vaqt olishi.'
        },
        {
            id: 'fc-3', topicId: 'diqqat',
            term: 'Diqqatning 3 asosiy turi qaysilar?',
            definition: '1) Ixtiyorsiz diqqat (irodasiz, kutilmagan ta’sirdan); 2) Ixtiyoriy diqqat (ongli maqsad va iroda bilan); 3) Ixtiyoriydan so‘nggi diqqat (qiziqish tufayli zo‘riqishsiz davom etuvchi).',
            example: 'Darsni majburan boshlab (ixtiyoriy), mavzuga qiziqib ketib soatlab o‘qish (ixtiyoriydan so‘nggi).'
        },
        {
            id: 'fc-4', topicId: 'diqqat',
            term: 'Diqqatning taqsimlanishi va ko‘chishi nima?',
            definition: 'Taqsimlanish — bir vaqtda 2 va undan ortiq faoliyatni muvaffaqiyatli bajarish; Ko‘chish — diqqatni ongli ravishda bir faoliyatdan ikkinchisiga tez o‘tkazish.',
            example: 'Haydovchining bir vaqtda yo‘lni, oynalarni va tezlik ko‘rsatkichini kuzatishi.'
        },
        {
            id: 'fc-5', topicId: 'idrok',
            term: 'Idrokning 4 asosiy xususiyati qaysilar?',
            definition: '1) Yaxlitlik (qismlardan butun obraz); 2) Predmetlilik (aniq buyumga bog‘lash); 3) Doimiylik/Konstantlik (sharoit o‘zgarsa ham barqarorlik); 4) Tanlovchanlik (kerakli obyektni ajratish).',
            example: 'Qorong‘i xonada ham oq qog‘ozni oq deb idrok etish — konstantlik.'
        },
        {
            id: 'fc-6', topicId: 'idrok',
            term: 'Ch. Sherrington bo‘yicha sezgilarning 3 turi',
            definition: '1) Eksteroreseptiv (tashqi 5 sezgi); 2) Interoreseptiv (ichki a’zolar: ochlik, og‘riq); 3) Proprioreseptiv (mushak-bo‘g‘im, tana holati va muvozanat).',
            example: 'Ko‘zni yumib qo‘lning qay holatda turganini sezish — proprioreseptiv sezgi.'
        },
        {
            id: 'fc-7', topicId: 'xotira',
            term: 'Xotiraning 4 asosiy jarayoni qaysilar?',
            definition: '1) Esda olib qolish; 2) Esda saqlash; 3) Qayta esga tushirish; 4) Unutish.',
            example: 'Imtihon oldidan konspektni o‘qib mustahkamlash va imtihonda qayta esga tushirish.'
        },
        {
            id: 'fc-8', topicId: 'xotira',
            term: 'Material xususiyatiga ko‘ra xotiraning 4 turi',
            definition: '1) Hissiy (emotsional); 2) Harakat (motor); 3) Obrazli; 4) So‘z-mantiq xotirasi.',
            example: 'Suzish va velosiped haydashni unutmaslik — harakat xotirasi.'
        },
        {
            id: 'fc-9', topicId: 'tafakkur',
            term: 'Tafakkurning 3 mantiqiy shakli',
            definition: '1) Tushuncha (muhim va umumiy belgilar); 2) Hukm (bog‘liqlikni tasdiqlash/inkor etish); 3) Xulosa chiqarish (hukmlardan yangi bilim hosil qilish).',
            example: '«Metall» tushunchasi → «Mis — metall» hukmi → «Mis tok o‘tkazadi» xulosasi.'
        },
        {
            id: 'fc-10', topicId: 'tafakkur',
            term: 'Induksiya va Deduksiya farqi nima?',
            definition: 'Induksiya — xususiy kuzatishlardan umumiy qoidaga borish; Deduksiya — umumiy qoidadan xususiy holat haqida xulosa chiqarish.',
            example: 'Barcha o‘lchangan metallar tok o‘tkazdi (induksiya) → demak, bu yangi metall ham tok o‘tkazadi (deduksiya).'
        },
        {
            id: 'fc-11', topicId: 'xayol',
            term: 'Qayta tiklovchi va Ijodiy xayol farqi',
            definition: 'Qayta tiklovchi xayol — tayyor tavsif, xarita yoki chizmaga qarab obraz jonlantirish; Ijodiy xayol — ilgari mavjud bo‘lmagan mutlaqo yangi, original obraz yaratish.',
            example: 'Badiiy kitob o‘qib qahramonni tasavvur qilish (qayta tiklovchi) vs yangi asar yozish (ijodiy).'
        },
        {
            id: 'fc-12', topicId: 'muloqot',
            term: 'Muloqotning 3 tomoni qaysilar?',
            definition: '1) Kommunikativ (axborot almashish); 2) Interaktiv (birgalikdagi harakat va ta’sir); 3) Perseptiv (bir-birini idrok etish va tushunish).',
            example: 'Suhbatdoshni tinglash (kommunikativ), kayfiyatini anglash (perseptiv) va birga qaror qabul qilish (interaktiv).'
        },
        {
            id: 'fc-13', topicId: 'muloqot',
            term: 'Empatiya va Refleksiya nima?',
            definition: 'Empatiya — boshqa insonning hissiy holatini uning o‘rniga o‘zini qo‘yib his qilish; Refleksiya — o‘zini va xatti-harakatlarini boshqalar nazari bilan tashqaridan ko‘rib anglash.',
            example: 'Do‘stining dardiga hamdard bo‘lish (empatiya) va o‘z so‘zlarining unga qanday ta’sir qilganini tahlil etish (refleksiya).'
        },
        {
            id: 'fc-14', topicId: 'faoliyat',
            term: 'A.N. Leontyev bo‘yicha faoliyat tuzilishi zanjiri',
            definition: 'Ehtiyoj (yetishmovchilik) → Motiv (ichki turtki) → Maqsad (kutilayotgan natija obrazi) → Harakat va operatsiya.',
            example: 'Bilim ehtiyoji → mutaxassis bo‘lish motivi → universitetga kirish maqsadi → dars tayyorlash harakati.'
        },
        {
            id: 'fc-15', topicId: 'faoliyat',
            term: 'Ichki (intrinsik) va Tashqi (ekstrinsik) motivatsiya',
            definition: 'Ichki motiv — faoliyatning o‘zidan zavq olish va qiziquvchanlik; Tashqi motiv — mukofot, baho, obro‘ olish yoki jazodan qochish.',
            example: 'Qiziqib kitob o‘qish (ichki) vs faqat imtihondan o‘tish uchun o‘qish (tashqi).'
        },
        {
            id: 'fc-16', topicId: 'shaxs',
            term: 'Temperament va Xarakterning asosiy farqi',
            definition: 'Temperament — tug‘ma neyrodinamik asos (xulqning «qanday» kechishi, axloqiy baholanmaydi); Xarakter — hayotda shakllangan ijtimoiy sifatlar («nima» qilishi, axloqiy baholanadi).',
            example: 'Temperament — avtomobil dvigateli quvvati, Xarakter — haydovchining qayerga va qanday boshqarishi.'
        },
        {
            id: 'fc-17', topicId: 'eq',
            term: 'Emotsional intellektning (EQ) 3 asosiy tarkibiy ko‘nikmasi (Atlas bo‘yicha)',
            definition: '1) O‘z-o‘zini anglash (hissiyotni aniq bilish); 2) Empatiya (boshqaning holatini his qilish); 3) Kognitiv qayta baholash (vaziyatga boshqa rakursdan qarash).',
            example: 'Tanqiddan xafa bo‘lish o‘rniga o‘sish uchun foydali xulosa chiqarish.'
        },
        {
            id: 'fc-18', topicId: 'temperament-nazariyalari',
            term: 'I.P. Pavlov bo‘yicha ONFning 3 asosiy xossasi',
            definition: 'Bosh miya po‘stlog‘idagi qo‘zg‘alish va tormozlanish jarayonlarining: 1) Kuchi; 2) Muvozanati; 3) Harakatchanligi.',
            example: 'Kuchli + muvozanatli + harakatchan = Sangvinik; Kuchli + muvozanatsiz = Xolerik.'
        },
        {
            id: 'fc-19', topicId: 'temperament-xususiyatlari',
            term: 'Senzitivlik va Reaktivlik farqi',
            definition: 'Senzitivlik — psixik reaksiya uyg‘otish uchun zarur bo‘lgan eng kuchsiz ta’sir chegarasi; Reaktivlik — ta’sirga beixtiyor beriladigan emotsional javob kuchi.',
            example: 'Melanxolikda senzitivlik eng yuqori bo‘lsa, Xolerikda reaktivlik juda yuqori bo‘ladi.'
        },
        {
            id: 'fc-20', topicId: 'temperament-turlari',
            term: '4 klassik temperament tipining qisqa formulasi',
            definition: 'Sangvinik: Ekstravert + Barqaror/Harakatchan; Xolerik: Ekstravert + Beqaror/Jo‘shqin; Flegmatik: Introvert + Barqaror/Vazmin; Melanxolik: Introvert + Sezgir/Ta’sirchan.',
            example: 'Jamoada Xolerik boshlaydi, Sangvinik birlashtiradi, Flegmatik tizimli bajaradi, Melanxolik sifatni nazorat qiladi.'
        }
    ];

    /* =========================================================
       5. GAMIFIKATSIYA NISHONLARI (REAL FAOLIYATGA ASOSLANGAN)
    ========================================================= */
    const BADGES = [
        {
            id: 'badge-first-step',
            title: 'Ilk Kashfiyotchi',
            desc: 'Atlasdagi birinchi mavzuni o‘rganib chiqdingiz.',
            icon: 'fa-compass',
            color: '#5C9DFF',
            xpReward: 50
        },
        {
            id: 'badge-atlas-master',
            title: 'Atlas Bilimdoni',
            desc: 'Barcha 13 ta psixologik mavzuni o‘rganib chiqdingiz.',
            icon: 'fa-Globe',
            color: '#D6B56D',
            xpReward: 300
        },
        {
            id: 'badge-quiz-ace',
            title: 'Ilmiy Tahlilchi',
            desc: 'Test sinovida kamida 80% yuqori natija qayd etdingiz.',
            icon: 'fa-award',
            color: '#10b981',
            xpReward: 100
        },
        {
            id: 'badge-experimenter',
            title: 'Eksperimentator (Vundt izdoshi)',
            desc: 'Virtual psixologiya laboratoriyasida kamida 3 ta tajribani yakunladingiz.',
            icon: 'fa-flask-vial',
            color: '#8B7CFF',
            xpReward: 120
        },
        {
            id: 'badge-memory-keeper',
            title: 'Xotira Ustasi',
            desc: 'Smart Flashcards tizimida 10 ta atamani «Bilaman» darajasiga yetkazdingiz.',
            icon: 'fa-layer-group',
            color: '#f59e0b',
            xpReward: 100
        },
        {
            id: 'badge-scholar-scribe',
            title: 'Tadqiqotchi Daftar',
            desc: 'Shaxsiy daftarda kamida 3 ta ilmiy qayd yoki konspekt yaratdingiz.',
            icon: 'fa-feather-pointed',
            color: '#ec4899',
            xpReward: 80
        }
    ];

    window.PsychAtlasEducation = {
        HISTORY_ERAS: HISTORY_ERAS,
        SCIENTISTS: SCIENTISTS,
        GLOSSARY_TERMS: GLOSSARY_TERMS,
        QUESTIONS: QUESTIONS,
        DEFAULT_FLASHCARDS: DEFAULT_FLASHCARDS,
        BADGES: BADGES
    };
})(window);
