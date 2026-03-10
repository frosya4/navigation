// Исторические и культурные локации Минска (маршрут)
const minskLocations = [
    {
        id: 1,
        title: "Площадь Независимости",
        coords: [53.8966, 27.5476],
        description: "Одна из крупнейших площадей Европы, административный центр Беларуси. Здесь расположены Дом Правительства, здание БГУ и знаменитый Красный костёл. Подземный торговый центр «Столица» находится прямо под площадью.",
        icon: "fa-landmark",
        image: "https://bestbelarus.by/upload/dev2fun.imagecompress/webp/iblock/3b6/3b63a09f13037763e53dec41c73591f1.webp",
        transport: {
            method: "Пешком",
            icon: "fa-walking",
            details: "Идём на север по ул. Ленина до Михайловского сквера (~7 минут пешком)."
        }
    },
    {
        id: 2,
        title: "Михайловский сквер",
        coords: [53.9018, 27.5583],
        description: "Уютный городской сквер в центре Минска, окружённый историческими зданиями. Место для прогулок и отдыха, вблизи Национального художественного музея и ряда важных культурных объектов.",
        icon: "fa-tree",
        image: "https://avatars.mds.yandex.net/get-altay/5538812/2a00000184256e384f3420a67d1182d70095/XXL_height",
        transport: {
            method: "Пешком",
            icon: "fa-walking",
            details: "До 5-го корпуса БГЭУ ~4 минуты пешком по ул. Советской."
        }
    },
    {
        id: 3,
        title: "5-й корпус БГЭУ",
        coords: [53.9026, 27.5570],
        description: "Один из учебных корпусов Белорусского государственного экономического университета — ведущего экономического вуза страны. Здание расположено в историческом центре Минска и является частью университетского городка.",
        icon: "fa-graduation-cap",
        image: "https://avatars.mds.yandex.net/get-altay/6310045/2a00000180780e9efa4eb39c5ffa95c7eb96/orig",
        transport: {
            method: "Пешком",
            icon: "fa-walking",
            details: "До стадиона Динамо ~6 минут по ул. Кирова."
        },
        personalities: [
            {
                name: "БОЛБАС Валерий Сергеевич",
                specialty: "Доктор педагогических наук, профессор",
                image: "https://mspu.by/images/news/04.2015/29-04-3.jpg",
                description: "Выдающийся белорусский ученый, педагог. Специалист в области этнопедагогики и теории воспитания, автор многочисленных трудов по истории педагогической мысли Беларуси."
            },
            {
                name: "Лидия Петровна Жуковская",
                specialty: "Лингвист, палеограф",
                image: "https://upload.wikimedia.org/wikipedia/ru/1/1a/%D0%9B.%D0%9F.%D0%96%D1%83%D0%BA%D0%BE%D0%B2%D1%81%D0%BA%D0%B0%D1%8F.jpg",
                description: "Крупный советский ученый-лингвист, исследователь древнерусских рукописей и палеографии. Доктор филологических наук, внесла неоценимый вклад в изучение истории языка."
            },
            {
                name: "Учащиеся БГЭУ",
                specialty: "Будущее экономики Беларуси",
                image: "https://vedomosti102.ru/upload/iblock/58c/58c28e44b8a370a90fc91af2c7ef418d.jpg",
                description: "Студенты ведущего экономического вуза страны, ежедневно создающие живую историю университета и готовящиеся стать высококлассными специалистами."
            }
        ]
    },
    {
        id: 4,
        title: "Стадион «Динамо»",
        coords: [53.8979, 27.5608],
        description: "Легендарный стадион, построенный в 1934 году. Входит в список объектов историко-культурного наследия Беларуси. После реконструкции стал современной спортивной ареной, принявшей финал Лиги Европы УЕФА в 2021 году.",
        icon: "fa-futbol",
        image: "https://f-solutions.by/storage/app/uploads/public/5ef/ade/e40/5efadee406d4f484802236.jpg",
        transport: {
            method: "Автобус / Пешком",
            icon: "fa-bus",
            details: "Автобусом №1 или пешком (~10 мин) до Национального художественного музея."
        },
        athletes: [
            {
                name: "АЛЕКСАНДР МЕДВЕДЬ",
                specialty: "Борец вольного стиля",
                image: "https://static1-repo.aif.by/1/d7/38377/0ff751b912c69e9b2130d94f48154328.jpg",
                description: "Трехкратный олимпийский чемпион, многократный чемпион мира, Европы и СССР. Один из самых титулованных борцов в истории спорта."
            },
            {
                name: "ВИТАЛИЙ ЩЕРБО",
                specialty: "Гимнаст",
                image: "https://static1-repo.aif.by/1/d9/38378/75499d96d226735bc6b3d9cece27830e.jpg",
                description: "Шестикратный олимпийский чемпион (все золотые медали завоеваны на одних Играх в 1992 году), двенадцатикратный чемпион мира."
            },
            {
                name: "ЕЛЕНА БЕЛОВА",
                specialty: "Фехтовальщица",
                image: "https://static1-repo.aif.by/1/97/38380/c7c3f0c82bce906fdb49756bcfac0a2f.jpg",
                description: "Четырехкратная олимпийская чемпионка по фехтованию на рапирах, многократная чемпионка мира. Первая женщина в истории фехтования, завоевавшая 4 золотые олимпийские медали."
            },
            {
                name: "ВЛАДИМИР ПАРФЕНОВИЧ",
                specialty: "Гребец на байдарке",
                image: "https://static1-repo.aif.by/1/ad/38379/7a61afa88528eea2a7bd37de046346cb.jpg",
                description: "Трехкратный олимпийский чемпион (все медали на Играх-1980), многократный чемпион мира. Единственный байдарочник в мире, выигравший три золота на одной Олимпиаде."
            }
        ]
    },
    {
        id: 5,
        title: "Национальный художественный музей",
        coords: [53.9025, 27.5621],
        description: "Крупнейший художественный музей Беларуси. Коллекция насчитывает более 27 000 предметов искусства: белорусская живопись, западноевропейская графика и скульптура, произведения народного творчества.",
        icon: "fa-palette",
        image: "https://admin.artmuseum.by/Files/news/30-aprelia-2025-goda-besplatnyi-vkhod-khudozhestvennyi-muzei-dlia-grazhdan-pensionnogo-vozrasta/Share.jpeg",
        transport: {
            method: "Пешком",
            icon: "fa-walking",
            details: "Выходим на Проспект Независимости — главную магистраль страны (~3 минуты)."
        },
        personalities: [
            {
                name: "Волков Валентин Викторович",
                specialty: "Художник",
                image: "https://upload.wikimedia.org/wikipedia/ru/a/ae/Volkov-valentin-viktorovich.jpg",
                workName: "Минск 3 июля 1944 г.",
                workImage: "https://libmogilev.by/virtual-exhibitions/images/picture-volkov/minsk.03-07-1944.jpg",
                description: "Мастер тематической картины и портрета. Его полотно «Минск 3 июля 1944 г.» стало символом освобождения Беларуси и подвига народа."
            },
            {
                name: "Шибнев Анатолий Демьянович",
                specialty: "Художник",
                image: "https://sun9-16.userapi.com/impg/Hp6zP6QW_rclC00wiGaZH5Eu3DU0Q-24iDR9mw/a6gwhYJy1AU.jpg?size=180x276&quality=96&sign=31a117338c483f92c9ca9eb4868288e8&type=album",
                workName: "Пленных ведут (1946 г.)",
                workImage: "https://ic.pics.livejournal.com/nornegest/76826399/327779/327779_900.jpg",
                description: "Известный живописец, чьи работы посвящены трагическим и героическим страницам войны. Картина «Пленных ведут» — глубокое размышление о возмездии и мире."
            },
            {
                name: "Савицкий Михаил Андреевич",
                specialty: "Народный художник СССР",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUvDwDhG4vwBhuVjcFvRaOdiEnQ1RyIeotVghr_sskKUxZJLXsj-lWjf0&s=10",
                workName: "Мадонна Биркенау (1978 г.)",
                workImage: "https://minsknews.by/wp-content/uploads/2022/02/Madonna-Birkenau.jpeg",
                description: "Герой Беларуси. В цикле «Цифры на сердце» он отразил ужасы концлагерей. «Мадонна Биркенау» — это гимн несокрушимому человеческому духу."
            }
        ]
    },
    {
        id: 6,
        title: "Проспект Независимости",
        coords: [53.9055, 27.5618],
        description: "Главная улица Минска протяжённостью 15 км — объект Всемирного наследия ЮНЕСКО как пример советского монументального классицизма. Застроена в 1940–50-е годы в духе сталинской архитектуры с симметричными ансамблями и широкими тротуарами.",
        icon: "fa-road",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Minsk_Prospekt_Nezalezhnosti_05.jpg/1280px-Minsk_Prospekt_Nezalezhnosti_05.jpg",
        transport: {
            method: "Пешком",
            icon: "fa-walking",
            details: "Спускаемся по проспекту к Октябрьской площади (~8 минут)."
        }
    },
    {
        id: 7,
        title: "Октябрьская площадь",
        coords: [53.9011, 27.5494],
        description: "Центральная площадь Минска, место проведения государственных торжеств и праздников. Здесь расположены Дворец Республики и Дворец профсоюзов. Подземный пешеходный переход украшен мозаиками советской эпохи.",
        icon: "fa-star-of-david",
        image: "https://media-cdn.tripadvisor.com/media/photo-s/10/cb/2a/fb/palacio-da-republica.jpg",
        transport: {
            method: "Пешком",
            icon: "fa-walking",
            details: "Дворец Республики прямо на площади (~1 минута)."
        }
    },
    {
        id: 8,
        title: "Дворец Республики",
        coords: [53.9007, 27.5482],
        description: "Главный концертный зал страны, вмещающий 2700 зрителей. Строился с 1985 по 2001 год. В Дворце проходят важнейшие государственные мероприятия, концерты звёзд мировой эстрады и международные форумы.",
        icon: "fa-building-columns",
        image: "https://avatars.mds.yandex.net/get-altay/9368060/2a00000189e7ebc5642527216adae1f8b7c1/XXXL",
        transport: {
            method: "Пешком",
            icon: "fa-walking",
            details: "Дом офицеров в 5 минутах ходьбы по ул. Комсомольской."
        }
    },
    {
        id: 9,
        title: "Дом офицеров",
        coords: [53.8993, 27.5530],
        description: "Центральный Дом офицеров Вооружённых сил Республики Беларусь — памятник архитектуры конструктивизма (1934). Здесь проводятся выставки, спектакли и культурные мероприятия для военнослужащих и горожан.",
        icon: "fa-shield-halved",
        image: "https://avatars.mds.yandex.net/i?id=a9328a555dc82a3e70e22a960fc9d4bf_l-4080301-images-thumbs&n=13",
        transport: {
            method: "Пешком",
            icon: "fa-walking",
            details: "До Храма Кирилла и Мефодия ~6 минут пешком по ул. Раковской."
        }
    },
    {
        id: 10,
        title: "Храм Кирилла и Мефодия",
        coords: [53.8961, 27.5547],
        description: "Современный православный храм, возведённый в 2008 году в честь создателей славянской письменности. Расположен близ исторического Верхнего города. Отличается монументальным куполом и богатым внутренним убранством.",
        icon: "fa-church",
        image: "https://sobory.ru/pic/54250/54251_20201109_123541.jpg",
        transport: {
            method: "Троллейбус",
            icon: "fa-bus",
            details: "Троллейбусом №5 или 20 до ост. «Цирк» (~5 мин) или пешком (~15 мин) по пр. Независимости."
        }
    },
    {
        id: 11,
        title: "Минский государственный цирк",
        coords: [53.9107, 27.5713],
        description: "Один из крупнейших стационарных цирков Европы, открытый в 1954 году. Вмещает 1876 зрителей. Манеж диаметром 13 метров принимал труппы со всего мира. В 2022 году проведена масштабная реконструкция.",
        icon: "fa-masks-theater",
        image: "https://avatars.mds.yandex.net/get-altay/474904/2a0000015ed61e1d906eb9e774570b56962f/orig",
        transport: {
            method: "Пешком",
            icon: "fa-walking",
            details: "До Площади Победы ~7 минут по пр. Независимости."
        }
    },
    {
        id: 12,
        title: "Площадь Победы",
        coords: [53.9083, 27.5750],
        description: "Главный мемориальный комплекс Минска. 38-метровый монумент с орденом Победы увенчивает площадь, у основания которого горит Вечный огонь в память о воинах Великой Отечественной войны. Под площадью — Музей Победы.",
        icon: "fa-fire-flame-curved",
        image: "https://static.tildacdn.biz/tild3534-6232-4466-b739-353333636639/__52-20-06-2023.jpg",
        transport: {
            method: "Метро",
            icon: "fa-train-subway",
            details: "Ст. м. «Площадь Победы» → 1 остановка до «Купаловской» → пешком до ЦУМа (~3 мин)."
        }
    },
    {
        id: 13,
        title: "ЦУМ",
        coords: [53.9016, 27.5637],
        description: "Центральный универмаг Минска — легендарный советский торговый центр, открытый в 1951 году. После реконструкции сохранил исторический фасад в стиле сталинского классицизма. Один из главных символов торгового центра города.",
        icon: "fa-shop",
        image: "https://avatars.mds.yandex.net/get-altay/14382555/2a00000196eda9c60e186b32c7685f9e5064/orig",
        transport: {
            method: "Пешком",
            icon: "fa-walking",
            details: "До площади Якуба Коласа ~15 минут пешком по проспекту Независимости."
        }
    },
    {
        id: 14,
        title: "Площадь Якуба Коласа",
        coords: [53.9139, 27.5829],
        description: "Центр литературной и культурной жизни района. Площадь названа в честь народного поэта Якуба Коласа. Здесь оживает история литературы 1940-1990-х годов — эпоха великих очерков военного времени и интеллектуальной «оттепели», сформировавшей современный облик культуры.",
        icon: "fa-book-open",
        image: "https://images.weserv.nl/?url=planetabelarus.by/upload/resize_cache/iblock/0cf/1330_887_18e21fe612b4afb807a26ecc22279a1d9/0cf0ba4117ccd91c4234bdba402759a8.jpg",
        transport: {
            method: "Пешком / Троллейбус",
            icon: "fa-walking",
            details: "До Академии наук ~8 минут пешком по ул. Сурганова."
        },
        personalities: [
            {
                name: "Иван Мележ",
                specialty: "Писатель-прозаик",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZRt0IkaJTjuAT5AcwZM9jYr06yG-lyy5Mmqa84nDXQ1ZfGrSsGQAgZ6iI&s=10",
                description: "Выдающийся белорусский прозаик, драматург. Автор цикла «Полесская хроника»."
            },
            {
                name: "Иван Шамякин",
                specialty: "Народный писатель Беларуси",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1WDaWqWjCb_5wfr8tDUISHVnCT5rpP6y-PbAMd_urhfgm4tMMzDlaBTI&s=10",
                description: "Классик белорусской литературы, мастер социально-психологической и военной прозы."
            },
            {
                name: "Василь Быков",
                specialty: "Писатель, мастер военной прозы",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrVuti_7tSR50EGWtSNPrsB6BnZcG6haveRhNwE9IRsrLQApjpaBRBbLc&s=10",
                description: "Герой Социалистического Труда, великий мастер военной прозы, автор всемирно известных произведений."
            },
            {
                name: "Владимир Короткевич",
                specialty: "Писатель, поэт и драматург",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNr6gDjxIJ8ch-jdSCbQG_pYM5KtucckaFHCGm-FJ3OZNziu67sLFZqM1u&s=10",
                description: "Классик белорусской литературы, основоположник жанра исторического детектива."
            },
            {
                name: "Нил Гилевич",
                specialty: "Народный поэт Беларуси",
                image: "https://minoblturism.gov.by/upload/iblock/e2e/e2ead60f86107a99f82e4a2b291a1554.jpg",
                description: "Поэт, литературовед, общественный деятель, автор эпической поэмы «Сказ о Лысой горе»."
            },
            {
                name: "Рыгор Барадулин",
                specialty: "Народный поэт Беларуси",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy3TtBZtGpBd_MoowddlHw9iItcx0F9wbnuLqAOB9m5nGa1GBuWvML_k2A&s=10",
                description: "Выдающийся поэт, эссеист и переводчик, мастер белорусского слова и иронии."
            }
        ]
    },
    {
        id: 15,
        title: "Академия наук",
        coords: [53.9177, 27.5960],
        description: "Национальная академия наук Беларуси — главный научный центр страны, основан в 1929 году. Величественное здание-президиум (1952) в духе сталинского ампира является памятником архитектуры. Здесь работают сотни исследовательских институтов.",
        icon: "fa-microscope",
        image: "https://avatars.mds.yandex.net/get-altay/363317/2a0000015d45d2ec95b3ece11ee67c379c7b/XXXL",
        transport: {
            method: "Конец маршрута",
            icon: "fa-flag-checkered",
            details: "Рядом ст. м. «Академия наук» для удобного возвращения в любую точку города."
        },
        scientists: [
            {
                name: "Александр Чижевский",
                specialty: "Основоположник гелиобиологии",
                image: "https://biographe.ru/wp-content/uploads/2023/02/2321.jpg",
                description: "Знаменитый исследователь биологического воздействия Солнца и Вселенной. Основоположник космического естествознания и гелиобиологии. Изобретатель аэроионизации («люстра Чижевского»)."
            },
            {
                name: "Павел Сухой",
                specialty: "Авиаконструктор",
                image: "https://upload.wikimedia.org/wikipedia/ru/a/a8/Sukhoy_PO.jpg",
                description: "Один из выдающихся авиаконструкторов XX века. Под его руководством была создана легендарная линейка боевых самолетов «Су». Дважды Герой Социалистического Труда."
            },
            {
                name: "Михаил Высоцкий",
                specialty: "Генеральный конструктор МАЗ",
                image: "https://problr.by/images/pro_belarus/izvestnye_ludi/Mihail_Visotskiy_1.jpg",
                description: "Основоположник белорусского грузового автомобилестроения. Герой Беларуси. Создал белорусскую школу конструирования и исследования грузовых автомобилей."
            }
        ]
    }
];
