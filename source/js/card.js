const ROOMS_TEXT_FORM = [
  ' комната',
  ' комнаты',
  ' комнат',
];

const GUESTS_TEXT_FORM = [
  ' гостя',
  ' гостей',
  ' гостей',
];

const changeEndings = (numbers, textForm) => {
  if (numbers === 1) {
    return textForm[0]
  }
  if (2 <= numbers && numbers <= 4) {
    return textForm[1]
  }
  if (numbers >= 5) {
    return textForm[2]
  }
};

const variantsHousing = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
};

const taskTemplateCard = document.querySelector('#card').content;
const popupTemplate = taskTemplateCard.querySelector('.popup');

const card = {
  showOnPage(onScreenItem) {
    const popupClone = popupTemplate.cloneNode(true);
    const popupTitle = popupClone.querySelector('.popup__title');
    const popupAddress = popupClone.querySelector('.popup__text--address');
    const popupPrice = popupClone.querySelector('.popup__text--price');
    const popupType = popupClone.querySelector('.popup__type');
    const popupCapacity = popupClone.querySelector('.popup__text--capacity');
    const popupTime = popupClone.querySelector('.popup__text--time');
    const popupFeatures = popupClone.querySelector('.popup__features');
    const popupDescription = popupClone.querySelector('.popup__description');
    const popupPhotos = popupClone.querySelector('.popup__photos');
    const popupAvatar = popupClone.querySelector('.popup__avatar');

    popupTitle.textContent = onScreenItem.offer.title;
    popupAddress.textContent = onScreenItem.offer.address;
    popupPrice.textContent = onScreenItem.offer.price + ' ₽/ночь';

    popupType.textContent = variantsHousing[onScreenItem.offer.type];

    if(onScreenItem.offer.rooms === 0){
      popupCapacity.textContent = '0 комнат для гостей'
    }else {
      popupCapacity.textContent = onScreenItem.offer.rooms + changeEndings(onScreenItem.offer.rooms, ROOMS_TEXT_FORM) + ' для ' + onScreenItem.offer.guests + changeEndings(onScreenItem.offer.guests, GUESTS_TEXT_FORM);
    }

    popupTime.textContent = 'Заезд после ' + onScreenItem.offer.checkin + ', выезд до ' + onScreenItem.offer.checkout;

    if(onScreenItem.offer.features.length === 0) {
      popupFeatures.remove();
    } else {
      popupFeatures.innerHTML = '';
      onScreenItem.offer.features.forEach((feature) => {
        const newFeature = document.createElement('li');
        newFeature.classList.add('popup__feature');
        newFeature.classList.add('popup__feature--' + feature);
        popupFeatures.appendChild(newFeature);
      });
    }

    popupDescription.textContent = onScreenItem.offer.description;

    const photoFragment = document.createDocumentFragment();
    if(onScreenItem.offer.photos.length === 0) {
      popupPhotos.remove();
    } else {
      let newPhoto = popupClone.querySelector('.popup__photo').cloneNode(true);
      popupPhotos.innerHTML = '';
      onScreenItem.offer.photos.forEach((photo) => {
        newPhoto.src = photo;
        photoFragment.appendChild(newPhoto);
        newPhoto = newPhoto.cloneNode(true);
      });
    }

    popupPhotos.appendChild(photoFragment);
    popupAvatar.src = onScreenItem.author.avatar;

    return popupClone
  },
};

export {card};
