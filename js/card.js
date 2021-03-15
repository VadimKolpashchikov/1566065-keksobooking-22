const ROOMS_TEXT_FORM = [
  ' комната',
  ' комнаты',
  ' комнат',

]

const GUESTS_TEXT_FORM = [
  ' гостя',
  ' гостей',
  ' гостей',
]

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

const taskTemplateCard = document.querySelector('#card').content;
const popupTemplate = taskTemplateCard.querySelector('.popup');

const card = {
  showOnPage(onScreenItem) {
    const popup = popupTemplate.cloneNode(true);
    const popupTitle = popup.querySelector('.popup__title');
    const popupAddress = popup.querySelector('.popup__text--address');
    const popupPrice = popup.querySelector('.popup__text--price');
    const popupType = popup.querySelector('.popup__type');
    const popupCapacity = popup.querySelector('.popup__text--capacity');
    const popupTime = popup.querySelector('.popup__text--time');
    const popupFeatures = popup.querySelector('.popup__features');
    const popupDescription = popup.querySelector('.popup__description');
    const popupPhotos = popup.querySelector('.popup__photos');
    const popupAvatar = popup.querySelector('.popup__avatar');

    popupTitle.textContent = onScreenItem.offer.title;
    popupAddress.textContent = onScreenItem.offer.address;
    popupPrice.textContent = onScreenItem.offer.price + ' ₽/ночь';

    const variantsHousing = {
      flat: 'Квартира',
      bungalow: 'Бунгало',
      house: 'Дом',
      palace: 'Дворец',
    };

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
      let newPhoto = popup.querySelector('.popup__photo').cloneNode(true);
      popupPhotos.innerHTML = '';
      onScreenItem.offer.photos.forEach((photo) => {
        newPhoto.src = photo;
        photoFragment.appendChild(newPhoto);
        newPhoto = newPhoto.cloneNode(true);
      });
    }

    popupPhotos.appendChild(photoFragment);
    popupAvatar.src = onScreenItem.author.avatar;
    return popup
  },
};

export {card};
