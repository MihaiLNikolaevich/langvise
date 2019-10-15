const clickM = searchTarget({
    fn: function (tg) {
        if(tg.classList.contains('accord_toggle')){
            tg.parentElement.classList.toggle('active')
        } else {
            this.classList.remove('active');
            overflow()
        }
    }
});

export function menu(onMenuSelector, menuSelector) {
    const menuEl = document.querySelector(menuSelector);
    if (!menuEl) return;

    const menu = function() {

        if (this == null) {
            menuEl.classList.remove('active');
            overflow();
            return
        }

        menuEl.classList.toggle('active');

        (this.classList.contains('open') ? overflow('hidden') : overflow());
    };

    document.querySelector(onMenuSelector)
        .addEventListener('click', menu, { capture: false, passive: true });

    menuEl.addEventListener('click', clickM, { capture: false, passive: true });
}

export function sizeHead(selector = '.header') {
    const head = document.querySelector(selector);
    if (!head || window.innerWidth < 1350) return;

    const check = (y) => (y > 60) ? head.classList.add('min') : head.classList.remove('min');

    window.addEventListener('scroll', () => {

        check(window.pageYOffset);

    },{ capture: false, passive: true });
}

export function overflow(value = '') {
    document.documentElement.style.overflow = value;
    document.body.style.overflow = value;
}

export function dropdown(selector = '.dropdown', btnSelector = '.dropdown_btn') {
    const elements = document.querySelectorAll(selector);
    
    if(!elements.length) return;

    const toggle = function(event) {
        event.stopPropagation();
        this.parentElement.classList.toggle('active');

        setTimeout(function () {
            document.body.addEventListener('click', clear, { capture: false, passive: true });
        }, 0);
    };

    elements.forEach((element) => {
        element.querySelector(btnSelector).addEventListener('click', toggle, { capture: false, passive: true });
    });


    function clear() {
        elements.forEach((element) => {
            element.classList.remove('active');
        });
        document.body.removeEventListener('click', clear, { capture: false })
    }
}

export function searchTarget({ fn = function () {}, bubbling = 'parentElement', targets = ['A', 'BUTTON'] }) {
    return function search(ev) {
        let tg = ev.target;

        while(tg != this) {

            for (const target of targets) {

                if (tg.tagName == target) {
                    const self = this;
                    fn.call(this, tg, self);
                    break;
                }
            }

            tg.parentElement;
            tg = tg[bubbling];

            if (!tg) return
        }
    }
}