export default function tabs(tabsSelector, elSelector) {
    const tabsBtn = document.querySelector(tabsSelector);
    if (!tabsBtn) return;

    setTabs(tabsBtn.firstElementChild.firstElementChild);

    tabsBtn.addEventListener('click', function(ev) {
        ev.preventDefault();

        let target = ev.target;

        while(target != this){

            if (target.tagName == 'A') return setTabs(target);

            target = target.parentElement;
        }
    }, { capture: false, passive: false });

    function setTabs(el) {
        if (!el.hasAttribute('href')) return;

        document.querySelectorAll('.'+el.className).forEach((elem) => {
            elem.style.color = 'rgba(0, 0, 0, 0.7)';
        });
        el.style.color = '';

        let attr = el.getAttribute('href').replace(/#/, '');

        document.querySelectorAll(elSelector).forEach((el) => {
            el.style.display = (el.getAttribute('data-tab') == attr) ? '' : 'none';
        })
    }
}