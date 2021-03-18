import {getDifferenceArray} from './util.js';

const DEFAULT = 'any';

const mapFilters = document.querySelector('.map__filters');
const housingType = mapFilters.querySelector('#housing-type');
const housingPrice = mapFilters.querySelector('#housing-price');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');
const housingFeatures = mapFilters.querySelector('#housing-features');
let filterResult = true;

const variantsHousingPrice = {
  middle: 10000,
  low: 0,
  high: 50000,
};

const priceFilter = (data) => {
  const maxPrice = housingPrice.querySelector('option:checked').getAttribute('max');

  if (housingPrice.value === DEFAULT) {
    filterResult = true
  } else if (data.offer.price > variantsHousingPrice[housingPrice.value] && data.offer.price <= maxPrice) {
    filterResult = true
  } else {return false}
  return filterResult
};

const featuresFilter = (data) => {
  const selectedFeatures = housingFeatures.querySelectorAll('.map__checkbox:checked');
  let selectedFeaturesNames = Array();

  selectedFeatures.forEach((feature) => {
    selectedFeaturesNames.push(feature.value)
  });

  let differencesFeatures = Array();

  getDifferenceArray(selectedFeaturesNames, data.offer.features, differencesFeatures)

  if (selectedFeaturesNames.length === 0) {
    filterResult = true
  } else if (differencesFeatures.length === 0) {
    filterResult = true
  } else {return false}
  return filterResult
};

const guestsAndRoomsFilter = (data, typeFilter, typeValue) => {
  if (typeValue.value === DEFAULT) {
    filterResult = true
  } else if (typeFilter === Number(typeValue.value)) {
    filterResult = true
  } else {return false}
  return filterResult
};

const housingTypeFilter = (data) => {
  if (housingType.value === DEFAULT) {
    filterResult = true
  } else if (data.offer.type === housingType.value) {
    filterResult = true
  } else {return false}
  return filterResult
};

const getMapFilter = (data) => {
  if (housingTypeFilter(data) &&
  priceFilter(data) &&
  featuresFilter(data) &&
  guestsAndRoomsFilter(data, data.offer.rooms, housingRooms) &&
  guestsAndRoomsFilter(data, data.offer.guests, housingGuests)) {
    filterResult = true
  } else {return false}
  return filterResult
};

const customizeMapFilterClick = (cb) => {
  mapFilters.addEventListener('change', () => {
    cb();
  })
};

const resetMapFilter = () => {
  mapFilters.reset();
};

export {getMapFilter, customizeMapFilterClick, resetMapFilter};
