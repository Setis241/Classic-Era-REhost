// ==========================================
// ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ
// ==========================================
let scale = 1;
const maxScale = 3.0; 
const zoomSpeed = 0.1;

let isDragging = false;
let startX = 0, startY = 0;
let translateX = 0, translateY = 0;

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

// ==========================================
// ИНИЦИАЛИЗАЦИЯ КАРТЫ
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const viewport = document.getElementById('map-viewport');
    const canvas = document.getElementById('map-canvas');
    const starsLayer = document.getElementById('stars-layer');
    const hyperlanesLayer = document.getElementById('hyperlanes-layer');

    // Размеры карты
    canvas.style.width = GALAXY_CONFIG.width + 'px';
    canvas.style.height = GALAXY_CONFIG.height + 'px';

    // ==========================================
    // 2. ОТРИСОВКА ЗВЕЗД
    // ==========================================
    SYSTEMS.forEach(sys => {
        const star = document.createElement('div');
        star.className = 'star-sprite';
        
        // Проверка на гиганта
        if (sys.isGiant) {
            star.classList.add('giant-star');
        }

        star.style.left = sys.coords.x + 'px';
        star.style.top = sys.coords.y + 'px';

        const img = document.createElement('img');
        img.src = `${GALAXY_CONFIG.basePath}stars/star_${sys.star_type}.png`;

        const label = document.createElement('span');
        label.innerText = sys.name;
        label.className = 'star-label';

        star.appendChild(img);
        star.appendChild(label);
        
        star.onclick = () => openSystemPanel(sys);
        starsLayer.appendChild(star);
    });

    // ==========================================
    // ЛОГИКА КАМЕРЫ И ПЕРЕТАСКИВАНИЯ
    // ==========================================
    function updateMap() {
        const windowWidth = viewport.clientWidth;
        const windowHeight = viewport.clientHeight;

        const minScaleX = windowWidth / GALAXY_CONFIG.width;
        const minScaleY = windowHeight / GALAXY_CONFIG.height;
        const minScale = Math.max(minScaleX, minScaleY);

        scale = Math.max(scale, minScale);

        const mapWidth = GALAXY_CONFIG.width * scale;
        const mapHeight = GALAXY_CONFIG.height * scale;

        const minX = windowWidth - mapWidth;
        const minY = windowHeight - mapHeight;

        translateX = clamp(translateX, minX > 0 ? 0 : minX, 0);
        translateY = clamp(translateY, minY > 0 ? 0 : minY, 0);

        canvas.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    }

    viewport.addEventListener('wheel', (e) => {
        e.preventDefault();
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const pointX = (mouseX - translateX) / scale;
        const pointY = (mouseY - translateY) / scale;

        if (e.deltaY > 0) scale -= zoomSpeed; 
        else scale += zoomSpeed; 

        scale = Math.min(scale, maxScale);
        translateX = mouseX - pointX * scale;
        translateY = mouseY - pointY * scale;

        updateMap();
    }, { passive: false });

    viewport.addEventListener('mousedown', (e) => {
        if (e.target.closest('.star-sprite') || e.target.closest('#system-info-panel')) return;
        isDragging = true;
        viewport.classList.add('active-grab');
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
        viewport.classList.remove('active-grab');
    });

    window.addEventListener('mousemove', (e) => {
        const pointX = Math.round((e.clientX - translateX) / scale);
        const pointY = Math.round((e.clientY - translateY) / scale);
        
        const coordPanel = document.getElementById('coord-panel');
        if (coordPanel) {
            if (pointX >= 0 && pointY >= 0 && pointX <= GALAXY_CONFIG.width && pointY <= GALAXY_CONFIG.height) {
                coordPanel.innerText = `X: ${pointX} | Y: ${pointY}`;
            }
        }

        if (!isDragging) return;
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        updateMap();
    });

    window.addEventListener('resize', updateMap);
    updateMap();
});

// ==========================================
// ФУНКЦИИ ИНТЕРФЕЙСА (ПАНЕЛЬ)
// ==========================================
function openSystemPanel(sys) {
    const panel = document.getElementById('system-info-panel');
    document.getElementById('sys-name').innerText = sys.name;
    document.getElementById('sys-desc').innerText = sys.description;
    
    const pList = document.getElementById('planets-list');
    pList.innerHTML = ''; // Очищаем старый список
    
    if (sys.planets && sys.planets.length > 0) {
        // Если планеты есть, рисуем их
        sys.planets.forEach(p => {
            const pDiv = document.createElement('div');
            pDiv.className = 'planet-card';
            pDiv.innerHTML = `
                <div class="planet-frame">
                    <img src="${GALAXY_CONFIG.basePath}${p.img}" onerror="this.src='https://via.placeholder.com/50/1a1a2e/00e5ff?text=?'">
                </div>
                <div>
                    <p style="margin: 0; color: #ffcc00; font-weight: bold; font-size: 14px;">${p.name}</p>
                    <p style="margin: 2px 0 0 0; color: #00e5ff; font-size: 11px;">${p.type || 'Неизвестно'}</p>
                    <small style="color: #8892b0; font-size: 11px;">Контроль: ${p.owner || 'Ничейная'}</small>
                </div>
            `;
            pList.appendChild(pDiv);
        });
    } else {
        // Если массив planets пустой
        pList.innerHTML = '<p style="color:#8892b0; font-size:12px; font-style: italic;">Система еще не исследована. Данные о планетах отсутствуют.</p>';
    }

    panel.classList.remove('hidden');
}
function closePanel() {
    const panel = document.getElementById('system-info-panel');
    if (panel) {
        panel.classList.add('hidden');
    }
}