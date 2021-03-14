import {showLoadingErrorMessage} from './notifications.js'
import {mapFormStates} from './form-states.js';

const SERVER_ADDRESS = 'https://22.javascript.pages.academy/keksobooking';

const getData = (onSuccess) => {
  mapFormStates.makeInactive()
  fetch(SERVER_ADDRESS + '/data')
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
      mapFormStates.makeActive();
    })
    .catch(() => {
      showLoadingErrorMessage();
      onSuccess();
    });
}

const sendData = (data, onSuccess, dataReset, successMessage, errorMessage) => {
  fetch(
    SERVER_ADDRESS,
    {
      method: 'POST',
      body: data,
    },
  )
    .then((response) => {
      if (response.ok) {
        dataReset();
        onSuccess();
        successMessage();
      }
    })
    .catch(() => {
      errorMessage();
    });
}

export {getData, sendData}
