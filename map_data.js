// ==========================================
// НАСТРОЙКИ КАРТЫ
// ==========================================
const GALAXY_CONFIG = {
    width: 3300,
    height: 2062,
    basePath: "assets/map/" 
};

// ==========================================
// ФРАКЦИИ
// ==========================================
const FACTIONS = {
    "empire": { name: "Империя", color: "rgba(255, 50, 50, 0.3)" },
    "rebels": { name: "Повстанцы", color: "rgba(50, 150, 255, 0.3)" }
};

// ==========================================
// РАБОЧИЕ СИСТЕМЫ (51 штук)
// ==========================================
const SYSTEMS = [
    // --- ПЕРВЫЕ 23 СИСТЕМЫ (Сохранены на своих местах) ---
// --- НАШЕ ЯДРО ---
    { id: "sys_50", name: "Даллерия", star_type: "yellow", coords: { x: 1188, y: 1091 }, isGiant: true, faction: "empire", description: "Сверхмассивная желтая звезда. Сердце региона.", planets: [] },

    { 
        id: "sys_00", 
        name: "Валас", 
        star_type: "yellow", 
        coords: { x: 1650, y: 1031 }, 
        faction: "empire", 
        description: "Система, расположенная недалеко от суперзвезды Даллерия. Известна богатой планетой Трасвалакия.", 
        planets: [
            // --- СПИСОК НЕБЕСНЫХ ТЕЛ СИСТЕМЫ ---
            { 
                name: "Трасвалакия", 
                type: "Терра", // Тип объекта
                owner: "Не колонизирована",               // Кто контролирует
                img: "planets/Terra.png" // Картинка (путь от папки assets/map/)
            },
            { 
                name: "Кольцо Гелиоса", 
                type: "Пояс астероидов", 
                owner: "Не колонизирована", 
                img: "planets/asteroid.png" 
            },
            { 
                name: "Облако Оорта", 
                type: "Турмион", 
                owner: "Не колонизирована", 
                img: "planets/Turmion.png" 
            },
            { 
                name: "Ева-IV", 
                type: "Псамора", 
                owner: "Не колонизирована", 
                img: "planets/Psamora.png" 
            },
        ] 
    },
    { id: "sys_01", name: "Вестуза", star_type: "red", coords: { x: 215, y: 1844 }, faction: "rebels", description: "Окраинный мир. Суровые условия, но богатые залежи руды.", planets: [] },
    { id: "sys_02", name: "Меркатор", star_type: "blue", coords: { x: 2800, y: 450 }, faction: "empire", description: "Массивная промышленная зона. Орбита усеяна верфями.", planets: [] },
    { id: "sys_03", name: "Веридис", star_type: "green", coords: { x: 850, y: 320 }, faction: null, description: "Аномальная зона. Радиация звезды вызывает бурный рост экзофлоры.", planets: [] },
    { id: "sys_04", name: "Люмина", star_type: "white", coords: { x: 2400, y: 1600 }, faction: "rebels", description: "Ярчайшая звезда сектора. База ученых и исследователей.", planets: [] },
    { id: "sys_05", name: "Альтон", star_type: "yellow", coords: { x: 500, y: 1200 }, faction: "empire", description: "Богатая планетами звёздная система", planets: [] },
    { id: "sys_06", name: "Инферно", star_type: "red", coords: { x: 3100, y: 1100 }, faction: null, description: "Нестабильный красный гигант. Зона повышенной опасности.", planets: [] },
    { id: "sys_07", name: "Аквалон", star_type: "blue", coords: { x: 1200, y: 1850 }, faction: "rebels", description: "Система океанических миров. Крупный поставщик пресной воды.", planets: [] },
    { id: "sys_08", name: "Тарсонис", star_type: "green", coords: { x: 2000, y: 250 }, faction: "empire", description: "Военный полигон и секретные исследовательские лаборатории.", planets: [] },
    { id: "sys_09", name: "Эридан", star_type: "yellow", coords: { x: 1500, y: 500 }, faction: null, description: "Тихая система, облюбованная контрабандистами.", planets: [] },
    { id: "sys_10", name: "Шер-Маан", star_type: "white", coords: { x: 2900, y: 1800 }, faction: "rebels", description: "Система, ранее принадлежавшая Королевским Дюнам Шер-Маана.", planets: [] },
    { id: "sys_11", name: "Кел-Тарис", star_type: "red", coords: { x: 400, y: 700 }, faction: null, description: "Пустынная планета, убежище для наемников.", planets: [] },
    { id: "sys_12", name: "Альтаир", star_type: "blue", coords: { x: 1000, y: 800 }, faction: "empire", description: "Важный стратегический форпост.", planets: [] },
    { id: "sys_13", name: "Сириус", star_type: "white", coords: { x: 1300, y: 1400 }, faction: "rebels", description: "Богатая система с развитой экономикой.", planets: [] },
    { id: "sys_14", name: "Вега", star_type: "yellow", coords: { x: 2100, y: 1400 }, faction: "empire", description: "Аграрный мир, поставляющий провизию флоту.", planets: [] },
    { id: "sys_15", name: "Проксима-Прайм", star_type: "red", coords: { x: 2600, y: 900 }, faction: "rebels", description: "Шахтерская колония в астероидном поясе.", planets: [] },
    { id: "sys_16", name: "Энигма", star_type: "green", coords: { x: 200, y: 200 }, faction: null, description: "Неизведанный сектор, откуда редко возвращаются корабли.", planets: [] },
    { id: "sys_17", name: "Дайтория", star_type: "yellow", coords: { x: 3100, y: 300 }, faction: "empire", description: "Закрытый мир для элиты.", planets: [] },
    { id: "sys_18", name: "Орион", star_type: "blue", coords: { x: 1800, y: 1800 }, faction: "rebels", description: "Секретные верфи Повстанцев.", planets: [] },
    { id: "sys_19", name: "Авалон", star_type: "white", coords: { x: 700, y: 1600 }, faction: null, description: "Мир-загадка с руинами неизвестной расы.", planets: [] },
    { id: "sys_20", name: "Драконис", star_type: "red", coords: { x: 2200, y: 700 }, faction: "empire", description: "Военно-учебная база, славящаяся жесткой дисциплиной.", planets: [] },
    { id: "sys_21", name: "Нова", star_type: "blue", coords: { x: 1700, y: 100 }, faction: null, description: "Холодная, покрытая льдами система на самом краю карты.", planets: [] },
    { id: "sys_22", name: "Гелиос", star_type: "yellow", coords: { x: 2700, y: 1300 }, faction: "rebels", description: "Огромный город-планета, центр торговли и интриг.", planets: [] },

    // --- ЕЩЕ 28 НОВЫХ СИСТЕМ ---
    { id: "sys_23", name: "Икар", star_type: "white", coords: { x: 1400, y: 200 }, faction: "empire", description: "Система с аномально высокой солнечной активностью.", planets: [] },
    { id: "sys_24", name: "Омега", star_type: "red", coords: { x: 3000, y: 1500 }, faction: null, description: "Глухое место. Здесь не задают лишних вопросов.", planets: [] },
    { id: "sys_25", name: "Нексус", star_type: "blue", coords: { x: 1800, y: 1200 }, faction: "rebels", description: "Крупный координационный центр флота.", planets: [] },
    { id: "sys_26", name: "Аркадия", star_type: "green", coords: { x: 900, y: 900 }, faction: "empire", description: "Планета-курорт для высшего командования.", planets: [] },
    { id: "sys_27", name: "Элизиум", star_type: "yellow", coords: { x: 2500, y: 250 }, faction: "rebels", description: "Мир джунглей, полный смертоносной фауны.", planets: [] },
    { id: "sys_28", name: "Ригель", star_type: "blue", coords: { x: 300, y: 1400 }, faction: null, description: "Вольный торговый порт на пересечении торговых путей.", planets: [] },
    { id: "sys_29", name: "Воларис", star_type: "white", coords: { x: 2200, y: 1800 }, faction: "empire", description: "Тюремная колония строгого режима.", planets: [] },
    { id: "sys_30", name: "Зион", star_type: "yellow", coords: { x: 1600, y: 1500 }, faction: "rebels", description: "Скрытая база, глубоко в подземных пещерах.", planets: [] },
    { id: "sys_31", name: "Астерия", star_type: "red", coords: { x: 600, y: 400 }, faction: null, description: "Кладбище старых кораблей. Рай для мародеров.", planets: [] },
    { id: "sys_32", name: "Хеликон", star_type: "green", coords: { x: 2800, y: 800 }, faction: "empire", description: "Научный комплекс по изучению биологического оружия.", planets: [] },
    { id: "sys_33", name: "Терра Нова", star_type: "blue", coords: { x: 1100, y: 1500 }, faction: "rebels", description: "Недавно колонизированная система с большими перспективами.", planets: [] },
    { id: "sys_34", name: "Махаон", star_type: "yellow", coords: { x: 1900, y: 300 }, faction: null, description: "Нейтральная территория, где проводятся подпольные бои.", planets: [] },
    { id: "sys_35", name: "Септим", star_type: "white", coords: { x: 150, y: 800 }, faction: "empire", description: "Таможенная застава Империи.", planets: [] },
    { id: "sys_36", name: "Атум", star_type: "red", coords: { x: 3200, y: 600 }, faction: "rebels", description: "Система, пережившая масштабную орбитальную бомбардировку.", planets: [] },
    { id: "sys_37", name: "Каденция", star_type: "blue", coords: { x: 1400, y: 800 }, faction: null, description: "Родина искусных инженеров и механиков.", planets: [] },
    { id: "sys_38", name: "Сомнус", star_type: "green", coords: { x: 2000, y: 1100 }, faction: "empire", description: "Мир вечной ночи, окутанный густым туманом.", planets: [] },
    { id: "sys_39", name: "Иллиум", star_type: "yellow", coords: { x: 2600, y: 1100 }, faction: "rebels", description: "Процветающий финансовый сектор.", planets: [] },
    { id: "sys_40", name: "Эребус", star_type: "red", coords: { x: 800, y: 1900 }, faction: null, description: "Зона нестабильных гравитационных полей.", planets: [] },
    { id: "sys_41", name: "Харон", star_type: "white", coords: { x: 3000, y: 100 }, faction: "empire", description: "Мрачная система, используемая для ссылки диссидентов.", planets: [] },
    { id: "sys_42", name: "Калибан", star_type: "blue", coords: { x: 400, y: 1000 }, faction: "rebels", description: "Оплот сопротивления с тяжелой планетарной обороной.", planets: [] },
    { id: "sys_43", name: "Сигма", star_type: "yellow", coords: { x: 2100, y: 1600 }, faction: null, description: "Крупный промышленный узел без политической принадлежности.", planets: [] },
    { id: "sys_44", name: "Тау", star_type: "green", coords: { x: 1700, y: 600 }, faction: "empire", description: "Центр подготовки шпионов и диверсантов.", planets: [] },
    { id: "sys_45", name: "Цетус", star_type: "red", coords: { x: 1200, y: 200 }, faction: "rebels", description: "Ремонтные доки, укрытые внутри газового гиганта.", planets: [] },
    { id: "sys_46", name: "Лира", star_type: "white", coords: { x: 2300, y: 500 }, faction: null, description: "Система с невероятно красивыми кристаллическими планетами.", planets: [] },
    { id: "sys_47", name: "Дракон", star_type: "blue", coords: { x: 2700, y: 1900 }, faction: "empire", description: "Стоянка тяжелых дредноутов.", planets: [] },
    { id: "sys_48", name: "Феникс", star_type: "yellow", coords: { x: 1000, y: 1800 }, faction: "rebels", description: "Мир, восстающий из пепла прошлых войн.", planets: [] },
    { id: "sys_49", name: "Кассиопея", star_type: "green", coords: { x: 150, y: 1500 }, faction: null, description: "Дальняя окраина. Связь здесь ловит очень редко.", planets: [] }
];