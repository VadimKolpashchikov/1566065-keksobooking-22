import {leafletMap} from './leaflet-map.js';
import {announcementForm} from './form.js';
import {getData} from './api.js';
import {customizeMapFilterClick} from './map-filter.js';
import {showAvatarImg, showHousingPhoto} from './preview-img.js';
import {debounce} from './util.js'

const RERENDER_DELAY = 500;

leafletMap.create();
getData((data) => {
  leafletMap.addMarkers(data);
  customizeMapFilterClick(debounce(
    () => leafletMap.addMarkers(data),
    RERENDER_DELAY,
  ));
});
announcementForm.addValidation();
announcementForm.clear(leafletMap.reset);
announcementForm.submit(leafletMap.reset);
showAvatarImg();
showHousingPhoto();




