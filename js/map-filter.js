/* global _:readonly */
const DEFAULT = 'any'

const mapFilters = document.querySelector('.map__filters');
const housingType = mapFilters.querySelector('#housing-type');
const housingPrice = mapFilters.querySelector('#housing-price');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');
const housingFeatures = mapFilters.querySelector('#housing-features');
let filterResult = true;

const variantsHousingPrice = {
  middleMin: 10000,
  middleMax: 50000,
  lowMin: 0,
  lowMax: 10000,
  highMin: 50000,
  highMax: 100000000,
};

const getMapFilter = (data) => {

  if (housingRooms.value === DEFAULT) {
    filterResult = true
  } else if (data.offer.rooms === Number(housingRooms.value)) {
    filterResult = true
  } else {return  false}

  if (housingType.value === DEFAULT) {
    filterResult = true
  } else if (data.offer.type === housingType.value) {
    filterResult = true
  } else {return  false}

  if (housingGuests.value === DEFAULT) {
    filterResult = true
  } else if (data.offer.guests === Number(housingGuests.value)) {
    filterResult = true
  } else {return  false}

  if (housingPrice.value === DEFAULT) {
    filterResult = true
  } else if (data.offer.price > variantsHousingPrice[housingPrice.value + 'Min'] && data.offer.price < variantsHousingPrice[housingPrice.value + 'Max']) {
    filterResult = true
  } else {return  false}

  const selectedFeatures = housingFeatures.querySelectorAll('.map__checkbox:checked');
  let selectedFeaturesNames = Array();

  selectedFeatures.forEach((feature) => {
    selectedFeaturesNames.push(feature.value)
  });

  const differencesFeatures = _.difference(selectedFeaturesNames, data.offer.features);

  if (selectedFeaturesNames.length === 0) {
    filterResult = true
  } else if (differencesFeatures.length === 0) {
    filterResult = true
  } else {return  false}

  return filterResult
};

const customizeMapFilterClick = (cb) => {
  mapFilters.addEventListener('change', () => {
    cb();
  })
};

export {getMapFilter, customizeMapFilterClick}
