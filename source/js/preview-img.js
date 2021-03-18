const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const AVATAR_DEFAULT = 'img/muffin-grey.svg';

const fileAvatarChooser = document.querySelector('#avatar');
const previewAvatarContainer = document.querySelector('.ad-form-header__preview');
const previewAvatarImg = previewAvatarContainer.querySelector('img');
const fileHousingPhotoChooser = document.querySelector('#images');
const previewHousingPhotoContainer = document.querySelector('.ad-form__photo');


const showAvatarImg = () => {
  fileAvatarChooser.addEventListener('change', () => {
    const file = fileAvatarChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        previewAvatarImg.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
};

const showHousingPhoto = () => {
  fileHousingPhotoChooser.addEventListener('change', () => {
    const file = fileHousingPhotoChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();
      const previewHousingImg = document.createElement('img');

      previewHousingImg.setAttribute('width', 70);
      previewHousingImg.setAttribute('height', 70);
      previewHousingImg.setAttribute('alt', 'фотография жилья');

      reader.addEventListener('load', () => {
        previewHousingImg.src = reader.result;
        previewHousingPhotoContainer.append(previewHousingImg)
      });

      reader.readAsDataURL(file);
    }
  });
};

const resetPreviewImg = () => {
  previewAvatarImg.src = AVATAR_DEFAULT;
  previewHousingPhotoContainer.innerHTML = '';
};

export {showAvatarImg, showHousingPhoto, resetPreviewImg}
