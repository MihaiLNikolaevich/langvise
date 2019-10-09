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

    $('.owl-one').owlCarousel({
        loop: false,
        margin: 15,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                nav:false
            },
            1000:{
                items:1,
                nav:true,
            }
        }
    });

    initForm();

    $('.owl-multiple').owlCarousel({
        loop: false,
        margin: 20,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                nav:false
            },
            600:{
                items:2,
                nav:false,
            },
            992:{
                items:3,
                nav:false,
            },
            1200:{
                margin: 50,
                items:4,
                nav:false,
            }
        }
    });

    selectImg('.img-prod', '.cn_img-edit');

    tabs('.tabs','.gall_prod');

    select('select');

    new Plyr('#player');

    initMap();

    let modalSend = document.querySelector('.modal.sent');
    if (modalSend) {
        modalSend = new Modal(modalSend);
        modalSend.on();
    }
    // new Modal(document.querySelector('.modal.save-time'));

});

function initMap() {
    let mapElement = document.getElementById( 'map' );
    if(!mapElement) return;

    Map.loadGoogleMapsApi().then( function (googleMaps) {
        let maps = Map.createMap( googleMaps, mapElement );
        console.log( maps );
    } );
}