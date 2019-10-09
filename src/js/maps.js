const loadGoogleMapsApi = require('load-google-maps-api');
import icoMap from '../img/icon-svg/maps.svg';

class Map {

    static loadGoogleMapsApi() {
        return loadGoogleMapsApi({ key: 'AIzaSyA4cn0T63XD7j-FV6Z1gI0TalhQ4eGsWj8' });
    }

    static createMap(googleMaps, mapElement) {

        const maps = new googleMaps.Map(mapElement, {
            center: { lat: 51.525072, lng: -0.107107 },
            zoom: 12,
        });

        return this.createMarker(googleMaps, maps)
    }

    static createMarker(googleMaps, maps,) {
        return new googleMaps.Marker({
            position: { lat: 51.525072, lng: -0.107107 },
            map: maps,
            icon: icoMap
        });
    }
}
export { Map };