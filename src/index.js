import $ from "jquery";
import 'owl.carousel';
import Plyr from 'plyr';
import { dropdown, menu, sizeHead } from './js/mobile-menu';
import tabs from './js/tab';
import select from './js/select';
import selectImg from "./js/select-img";
import Modal from "./js/modal";
import initForm from "./js/form";
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


    initForm();

    selectImg('.img-prod', '.cn_img-edit');

    tabs('.tabs','.gall_prod');

    select('select');

    new Plyr('#player');

    initMap();

    let modalSend = document.querySelector('.modal.sent');
    let modalSaveTime = document.querySelector('.modal.save-time');
    let btnSaveTime = document.querySelectorAll('.reqCall');

    if (modalSend) {
        modalSend = new Modal(modalSend);
        // modalSend.on();
    }


    if (modalSaveTime && btnSaveTime.length != 0) {
        modalSaveTime = new Modal(modalSaveTime);

        for (const btn of btnSaveTime) {
            btn.addEventListener('click', () => {
                modalSaveTime.on()
            }, { passive: true, capture: false })
        }
    }

    function accordion(emitSelector, targetSelector) {
        const tg = document.querySelector(emitSelector);
        if (!tg) return;

        tg.addEventListener('click', () => {
            document.querySelector(targetSelector).classList.toggle('active');
        }, { passive: true, capture: false })
    }
    accordion('.btnTextarea', '.cn_textarea')

});

function initMap() {
    let mapElement = document.getElementById( 'map' );
    if(!mapElement) return;

    Map.loadGoogleMapsApi().then( function (googleMaps) {
        let maps = Map.createMap( googleMaps, mapElement );
        console.log( maps );
    } );
}