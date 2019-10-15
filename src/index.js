import "@babel/polyfill";
import "whatwg-fetch";
import $ from "jquery";
import 'owl.carousel';
import Plyr from 'plyr';
import { dropdown, menu, searchTarget, sizeHead } from './js/mobile-menu';
import tabs from './js/tab';
import select from './js/select';
import selectImg from "./js/select-img";
import Modal from "./js/modal";
import { formBasket, initForm } from "./js/form";
import { Map } from './js/maps';

import './scss/index.scss';

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

document.addEventListener("DOMContentLoaded", function() {

    menu('.btn-mob.open', '.mob-menu');

    sizeHead();

    dropdown();


    const owlInit = function (event) {
        const prevBtn = event.currentTarget.children[1].firstElementChild;
        const el = document.createElement('div');
        el.className = 'carousel-count';
        el.textContent = `1 / ${event.item.count}`;
        prevBtn.after(el);
    };

    $('.owl-one').owlCarousel({
        loop: true,
        margin: 15,
        responsiveClass:true,
        autoplay: true,
        responsive:{
            0:{
                items:1,
                nav:false
            },
            992:{
                items:1,
                nav:true,
                navText:[
                    '<svg width="14" height="26" viewBox="0 0 14 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 1L1 13" stroke="black" stroke-linecap="round"/><path d="M13 25L1 13" stroke="black" stroke-linecap="round"/></svg>',
                    '<svg width="14" height="26" viewBox="0 0 14 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 25L13 13" stroke="black" stroke-linecap="round"/><path d="M1 1L13 13" stroke="black" stroke-linecap="round"/></svg>'
                ],
                onInitialized: owlInit,
                dots: false,
            }
        }
    })
        .on('changed.owl.carousel', function (event) {
            const tgEl = event.currentTarget.children[1].querySelector('div');
            if (!tgEl) return;
            let tgSlid = event.item.index - 1;
            tgSlid = (tgSlid <= event.item.count) ? tgSlid : 1;

            tgEl.textContent = `${tgSlid} / ${event.item.count}`;
        });

    $('.owl-multiple').owlCarousel({
        loop: false,
        margin: 20,
        responsiveClass:true,
        autoplay: true,
        nav:false,
        responsive:{
            0:{
                items:1,
            },
            600:{
                items:2,
            },
            992:{
                items:3,
            },
            1350:{
                margin: 35,
                items:4,
            },
            1820:{
                items:4,
                margin: 50,
            }
        }
    });

    formBasket();

    initForm();


    selectImg('.img-prod', '.cn_img-edit');

    tabs('.tabs','.gall_prod');

    select('select');

    new Plyr('#player');

    initMap().catch( err => console.log('map', err));


    let modalSaveTime = document.querySelector('.modal.save-time');
    const btnSaveTime = document.querySelectorAll('.reqCall');

    if (modalSaveTime && btnSaveTime.length != 0) {
        modalSaveTime = new Modal(modalSaveTime);

        for (const btn of btnSaveTime) {
            btn.addEventListener('click', () => {
                modalSaveTime.on()
            }, { passive: true, capture: false })
        }

        modalSaveTime.el.querySelector('form')
            .addEventListener('submit', () => {
                modalSaveTime.off()
            }, { passive: true, capture: false })
    }

    //anchor
    document.querySelectorAll('.anchor').forEach((el) => {

        el.addEventListener('click', (ev) => {
            ev.preventDefault();

            const anchor = ev.target.getAttribute('href').replace(/#/, '');

            document.getElementById(anchor).scrollIntoView({ behavior: "smooth" })

        }, { capture: false })

    });
    // end anchor

    function accordion(emitSelector, targetSelector) {
        const tg = document.querySelector(emitSelector);
        if (!tg) return;

        tg.addEventListener('click', () => {
            document.querySelector(targetSelector).classList.toggle('active');
        }, { passive: true, capture: false })
    }
    accordion('.btnTextarea', '.cn_textarea')


});

async function initMap() {
    const mapElement = document.getElementById( 'map' );
    if(!mapElement) return;

    const selectMap = document.querySelector('.sl-maps');
    const googleMaps = await Map.loadGoogleMapsApi();

    function create(target) {
        const prev = target.parentElement.querySelector('.sl-maps_it.active');

        if (prev) {
            prev.classList.remove('active')
        }

        target.classList.add('active');
        const coordinates = {
            lat: +target.getAttribute('data-lat') || 50.45,
            lng: +target.getAttribute('data-lng') || 30.53,
        };

        Map.createMap( googleMaps, mapElement, coordinates);
    }

    create(selectMap.firstElementChild);


    const eventMap = searchTarget({
        fn: function (target) {
            create(target);
        },
        targets: ['LI']
    });

    document.querySelector('.sl-maps')
        .addEventListener('click', eventMap, { passive: true, capture: false });

}