const form = document.querySelector('.ad-form');
const formElements = form.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersElements = Array.from (mapFilters.children);

const makeAble  = (item) => {
  item.forEach((element) => {
    element.removeAttribute('disabled')
  });
};

const makeDisabled = (item) => {
  item.forEach((element) => {
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
    makeAble(formElements);
  },
}

const mapFormStates = {
  makeInactive() {
    mapFilters.classList.add('map__filters--disabled');
    makeDisabled(mapFiltersElements);
  },
  makeActive() {
    mapFilters.classList.remove('map__filters--disabled');
    makeAble(mapFiltersElements);
  },
}

export {formStates, mapFormStates}
