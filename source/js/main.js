import {leafletMap} from './leaflet-map.js';
import {announcementForm} from './form.js';
import {getData} from './api.js';
import {customizeMapFilterClick} from './map-filter.js';
import {showAvatarImg, showHousingPhoto} from './preview-img.js';
import {debounce} from './util.js';

const RERENDER_DELAY = 500;
let markersData = Array();

leafletMap.create();
getData((data) => {
  leafletMap.addMarkers(data);
  customizeMapFilterClick(debounce(
    () => leafletMap.addMarkers(data),
    RERENDER_DELAY,
  ));
  data.forEach((element) => {
    markersData.push(element)
  });
});

announcementForm.clear(() => leafletMap.reset(markersData));
announcementForm.submit(() => leafletMap.reset(markersData));
announcementForm.addValidation();
showAvatarImg();
showHousingPhoto();
