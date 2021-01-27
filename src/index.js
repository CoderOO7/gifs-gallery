import "./modules/staticEventListeners.js";
import { GifImagesController } from "./modules/controller/GifImages.js";
import { GIPHY_API_KEY, GIPHY_API_BASE_URL, API_ERROR_DEFAULT_MSG,API_TIMEOUT} from "./modules/Constants.js";
import {renderDOM} from './modules/render.js';
import {modal} from './modules/DOMstuff.js';
import { request } from "./modules/helper.js";
import './modules/staticEventListeners.js'

(function initApp(document) {
  /**
   * It will fetch and load default gifs on user screen on each browser
   * refresh window.
   */
  function loadDefaultImages() {
    let requestURL = `${GIPHY_API_BASE_URL}search?api_key=${GIPHY_API_KEY}&q=goodmorning`;
    request(requestURL, {}, API_TIMEOUT)
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        GifImagesController.emptyStore();
        response.data.forEach((imgObj) => {
          GifImagesController.addToStore(imgObj);
        });
        renderDOM.gifImages.list();
      })
      .catch(function (error) {
        console.error(error);
        modal.errorMsgDom.show(API_ERROR_DEFAULT_MSG);
      });
  }

  console.log('APP LOADED');

  //Add DOMContentLoaded event to loadDefaultImages on DOM
  document.addEventListener("DOMContentLoaded", (e) => loadDefaultImages());
})(document);
