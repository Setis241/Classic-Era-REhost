/* mobile.js — бургер-меню для мобильных (≤ 900px).
   Инжектит кнопку в .top-header и затемнение для .main-nav.
   Подключать с defer ПОСЛЕ загрузки страницы. */
(function () {
    function init() {
        var header = document.querySelector('.top-header') || document.querySelector('header');
        var nav = document.querySelector('.main-nav') || (header && header.querySelector('nav'));
        if (!header || !nav) return;
        if (header.querySelector('.mobile-burger')) return; // уже есть

        // Кнопка-бургер
        var btn = document.createElement('button');
        btn.className = 'mobile-burger';
        btn.setAttribute('aria-label', 'Меню');
        btn.setAttribute('aria-expanded', 'false');
        btn.innerHTML = '<span></span><span></span><span></span>';
        header.appendChild(btn);

        // Затемнение
        var backdrop = document.createElement('div');
        backdrop.className = 'mobile-nav-backdrop';
        document.body.appendChild(backdrop);

        function close() {
            document.body.classList.remove('nav-open');
            btn.setAttribute('aria-expanded', 'false');
        }
        function toggle() {
            var open = document.body.classList.toggle('nav-open');
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        }

        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            toggle();
        });
        backdrop.addEventListener('click', close);
        // Клик по ссылке внутри меню — закрываем
        nav.addEventListener('click', function (e) {
            if (e.target.tagName === 'A') close();
        });
        // Esc
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') close();
        });
        // Если перешли в десктоп — сброс
        window.addEventListener('resize', function () {
            if (window.innerWidth > 900) close();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
