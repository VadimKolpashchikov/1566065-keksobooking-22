const form = document.querySelector('.ad-form');
const formElements = form.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersElements = Array.from (mapFilters.children);

const enable = (items) => {
  items.forEach((element) => {
    element.removeAttribute('disabled')
  });
};

const makeDisabled = (items) => {
  items.forEach((element) => {
    element.setAttribute('disabled', 'true')
  });
};

const formStates = {
  makeInactive() {
    form.classList.add('ad-form--disabled');
    makeDisabled(formElements);
  },
  makeActive() {
    form.classList.remove('ad-form--disabled');
    enable(formElements);
  },
};

const mapFormStates = {
  makeInactive() {
    mapFilters.classList.add('map__filters--disabled');
    makeDisabled(mapFiltersElements);
  },
  makeActive() {
    mapFilters.classList.remove('map__filters--disabled');
    enable(mapFiltersElements);
  },
};

export {formStates, mapFormStates};
