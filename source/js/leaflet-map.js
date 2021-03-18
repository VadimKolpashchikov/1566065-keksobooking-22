import {card} from './card.js';
import {formStates} from './form-states.js';
import {getMapFilter} from './map-filter.js';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {resetMapFilter} from './map-filter';

const ANNOUNCEMENT_COUNT = 10;

const address = document.querySelector('#address');
const TokyoCenterCoordinates = {
  lat: 35.68950,
  lng: 139.69171,
};
address.value = TokyoCenterCoordinates.lat.toFixed(5) + ', ' + TokyoCenterCoordinates.lng.toFixed(5);


const map = L.map('map-canvas');
const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  {
    lat: 35.6895,
    lng: 139.69171,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const icon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

let markers = Array();

const leafletMap = {
  create() {
    formStates.makeInactive();
    map.on('load', () => {
      formStates.makeActive();
    }).setView(TokyoCenterCoordinates, 10);

    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      },
    ).addTo(map);

    mainMarker.addTo(map);

    mainMarker.on('moveend', (evt) => {
      address.value = evt.target.getLatLng().lat.toFixed(5) + ', ' + evt.target.getLatLng().lng.toFixed(5)
    });
  },
  removeMarkers() {
    if(markers.length !== 0) {
      markers.forEach((marker) => {
        map.removeLayer(marker)
      })
      markers = [];
    }
  },
  addMarkers(data) {
    leafletMap.removeMarkers();
    const markersData = data.slice();
    const markersFilteredData = markersData.filter(getMapFilter)

    markersFilteredData.slice(0, ANNOUNCEMENT_COUNT).forEach(({location}, number) => {
      const lat = location.lat;
      const lng = location.lng;

      const marker = new L.marker(
        {
          lat,
          lng,
        },
        {
          icon,
        },
      );
      markers.push(marker);
      markers[number]
        .addTo(map)
        .bindPopup(card.showOnPage(markersFilteredData[number]));
    });
  },

  reset(data) {
    map.setView(TokyoCenterCoordinates, 10);
    mainMarker.setLatLng(TokyoCenterCoordinates);
    address.value = TokyoCenterCoordinates.lat.toFixed(5) + ', ' + TokyoCenterCoordinates.lng.toFixed(5);
    resetMapFilter();
    this.addMarkers(data);
  },
}

export {leafletMap}
