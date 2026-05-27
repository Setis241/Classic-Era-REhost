/* =========================================
   БАЗА ДАННЫХ БИРЖИ (С ПОДРОБНЫМИ ТТХ)
   ========================================= */
const MARKET_DATA = [
    {
        id: "ship_shchedry",
        category: "ships", // Категория: Корабли
        name: "Фрегат «Гондарт»",
        classDesc: "Тяжелый транспортный фрегат", // Подпись под названием
        img: "img/frigate.jpg",
        shortDesc: "Легко вооруженный транспортный фрегат для доставки грузов. Из-за низкого количества вооружений, ему всё равно потребуется эскорт.",
        price: "1400 ГС",
        
        // 1. Основные параметры (Выводятся в две колонки)
        mainStats: {
            "Корпус": "5000 HP / 5350 AR",
            "Щиты": "10000 ед.",
            "Скорость": "23 у.е.",
            "Реактор": "ПЛГУ-37В"
        },
        // 2. Вооружение
        weapons: [
            "240-мм рельсовый ускоритель масс x4",
            "лёгкое одиночное лазерное импульсное орудие x10",
            "лёгкое одиночное электромагнитное орудие x3",
            "сдвоенный лазерный пулемёт x4"
        ],
        // 3. Ангары
        hangars: [
            "Грузовой ангар х2"
        ], // Оставили пустым, так как ангаров нет
        // 4. Модули
        modules: [
            "Система общей связи",
            "Локальная связь",
            "Многоцелевой сканер",
            "БИУС Флагман",
            "АСУО Терминус",
            "Сверхдвигатель Фотон"
        ],
        
        sellers: [
            { faction: "Альянс", name: "Представитель: Конрант Авалон", vkLink: "https://vk.com/im" },
        ]
    },
        {
        id: "ship_shchedry",
        category: "ships", // Категория: Корабли
        name: "Корвет «Липпо»",
        classDesc: "Быстрый корвет", // Подпись под названием
        img: "img/corvette.jpg",
        shortDesc: "Быстрый и маневренный корвет космического пространства, разработанный для поддержки огнём по вражеским целям.",
        price: "800 ГС",
        
        // 1. Основные параметры (Выводятся в две колонки)
        mainStats: {
            "Корпус": "500 HP / 2200 AR",
            "Щиты": "5000 ед.",
            "Скорость": "25 у.е.",
            "Реактор": "ПЛГУ-28В"
        },
        // 2. Вооружение
        weapons: [
            "100-мм рельсовый ускоритель масс x2",
            "лёгкое одиночное лазерное импульсное орудие x4",
            "лёгкое одиночное электромагнитное орудие x2",
            "лёгкая шестиствольная пусковая установка x2",
            "сдвоенный лазерный пулемёт x4"
        ],
        // 3. Ангары
        hangars: [], // Оставили пустым, так как ангаров нет
        // 4. Модули
        modules: [
            "Система общей связи",
            "Локальная связь",
            "Многоцелевой сканер",
            "БИУС Флагман",
            "АСУО Терминус",
            "Сверхдвигатель Фотон"
        ],
        
        sellers: [
            { faction: "Альянс", name: "Представитель: Конрант Авалон", vkLink: "https://vk.com/im" },
        ]
    },
    {
        id: "army_aat",
        category: "army", // Категория: Наземная техника
        name: "Бронированный штурмовой танк",
        classDesc: "Репульсорный танк",
        img: "assets/market/aat.png",
        shortDesc: "Основной боевой танк Альянса. Обладает прочной фронтальной броней и мощным калибром.",
        price: "1000 ГС",
        
        mainStats: {
            "Броня": "Тяжелая фронтальная",
            "Экипаж": "4 единицы",
            "Скорость": "80 км/ч",
            "Двигатель": "Тяжелый репульсор"
        },
        weapons: [
            "Тяжелая лазерная пушка x1",
            "Сдвоенные бластерные орудия x2",
            "Пусковые установки для снарядов x6"
        ],
        hangars: [], // У танка нет ангаров
        modules: [
            "Система наведения дроидов"
        ],

        sellers: [
            { faction: "Альянс", name: "Представитель: Конрант Авалон", vkLink: "https://vk.com/im" }
        ]
    }
];


/* =========================================
   ЛОГИКА ИНТЕРФЕЙСА
   ========================================= */

function renderMarket(items) {
    const grid = document.getElementById('market-grid');
    if (!grid) {
        console.error("ОШИБКА: Не найден блок <div id='market-grid'> в HTML!");
        return;
    }
    grid.innerHTML = ''; 

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'market-card';
        card.innerHTML = `
            <div class="card-img-box">
                <img src="${item.img}" onerror="this.src='https://via.placeholder.com/300x150/1a1a2e/00e5ff?text=Нет+Фото'">
            </div>
            <div class="card-info">
                <h3>${item.name}</h3>
                <p>${item.shortDesc}</p>
                <div class="card-price">${item.price}</div>
            </div>
        `;
        card.onclick = () => openModal(item);
        grid.appendChild(card);
    });
}

function filterMarket(category) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    if (event && event.target) event.target.classList.add('active');
    
    const filtered = MARKET_DATA.filter(item => item.category === category);
    renderMarket(filtered);
}

// Продвинутая генерация модального окна
function openModal(item) {
    // Проверяем, существует ли span для класса, если нет - создаем
    let titleHtml = item.name;
    if (item.classDesc) {
        titleHtml += ` <span id="modal-class" style="color: var(--text-muted); font-size: 14px; display: block; margin-top: 5px;">${item.classDesc}</span>`;
    }
    document.getElementById('modal-title').innerHTML = titleHtml;
    
    document.getElementById('modal-img').src = item.img;
    document.getElementById('modal-price').innerText = item.price;
    
    // Получаем тело модалки (В HTML у тебя должен быть <div class="modal-body">)
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = ''; // Очищаем от старого мусора
    
    // Добавляем описание (shortDesc)
    const descP = document.createElement('p');
    descP.className = 'item-description';
    descP.innerText = item.shortDesc;
    modalBody.appendChild(descP);
    
    // Генерация Сетки основных параметров (mainStats)
    if (item.mainStats) {
        const statsGrid = document.createElement('div');
        statsGrid.className = 'main-stats-grid';
        for (const [key, value] of Object.entries(item.mainStats)) {
            statsGrid.innerHTML += `
                <div class="stat-row">
                    <span class="stat-label">${key}:</span>
                    <span class="stat-value">${value}</span>
                </div>
            `;
        }
        modalBody.appendChild(statsGrid);
    }
    
    // Хелпер для списков (Вооружение, Ангары, Модули)
    function createTthSection(title, dataArray) {
        if (!dataArray || dataArray.length === 0) return; // Если пусто - пропускаем!
        
        const header = document.createElement('h3');
        header.className = 'tth-category-title';
        header.innerText = title;
        modalBody.appendChild(header);
        
        const list = document.createElement('ul');
        list.className = 'tth-extended-list';
        
        dataArray.forEach(text => {
            const li = document.createElement('li');
            li.innerText = text;
            list.appendChild(li);
        });
        
        modalBody.appendChild(list);
    }
    
    // Вызываем хелпер для каждого раздела
    createTthSection("Вооружение:", item.weapons);
    createTthSection("Ангары:", item.hangars);
    createTthSection("Модули:", item.modules);
    
    // Генерация списка поставщиков
    const sellersHeader = document.createElement('h3');
    sellersHeader.style = "margin-top: 30px; color: var(--cyan); font-family: Orbitron, sans-serif; text-transform: uppercase; font-size: 15px;";
    sellersHeader.innerText = "Официальные поставщики:";
    modalBody.appendChild(sellersHeader);
    
    const sellersContainer = document.createElement('div');
    sellersContainer.className = 'sellers-container';
    
    if (item.sellers && item.sellers.length > 0) {
        item.sellers.forEach(seller => {
            sellersContainer.innerHTML += `
                <div class="seller-card">
                    <div class="seller-info">
                        <strong>${seller.faction}</strong>
                        <span>${seller.name}</span>
                    </div>
                    <a href="${seller.vkLink}" target="_blank" class="btn-vk">Связаться в ВК</a>
                </div>
            `;
        });
    } else {
        sellersContainer.innerHTML = '<p style="color: #8892b0;">В данный момент нет открытых предложений.</p>';
    }
    
    modalBody.appendChild(sellersContainer);
    
    // Открываем окно
    document.getElementById('item-modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('item-modal').classList.add('hidden');
}

window.onclick = function(event) {
    const modal = document.getElementById('item-modal');
    if (event.target == modal) closeModal();
}

document.addEventListener("DOMContentLoaded", () => {
    filterMarket('ships'); // По умолчанию открываем вкладку "Корабли"
});