import "./modules/staticEventListeners.js";
import { GifImagesController } from "./modules/controller/GifImages.js";
import {
  GIPHY_API_KEY,
  GIPHY_API_BASE_URL,
  API_ERROR_DEFAULT_MSG,
  API_TIMEOUT,
} from "./modules/Constants.js";
import { renderDOM } from "./modules/render.js";
import { modal } from "./modules/DOMstuff.js";
import { request } from "./modules/helper.js";
import "./modules/staticEventListeners.js";

(function initApp(document) {
  /**
   * It will fetch and load default gifs on user screen on each browser
   * refresh window.
   */
  async function loadDefaultImages() {
    const requestURL = `${GIPHY_API_BASE_URL}search?api_key=${GIPHY_API_KEY}&q=goodmorning`;
    modal.loadingMsgDom.show();

    try {
      const response = await request(requestURL, {}, API_TIMEOUT);
      const imageData = await response.json();
      GifImagesController.emptyStore();

      if (imageData.data.length) {
        imageData.data.forEach((imgObj) => {
          GifImagesController.addToStore(imgObj);
        });
        renderDOM.gifImages.list();
        modal.loadingMsgDom.close();
      } else {
        modal.errorMsgDom.show("No gifs are available for seached query");
      }
    } catch (error) {
      console.error(error);
      modal.errorMsgDom.show(API_ERROR_DEFAULT_MSG);
    }
  }
  console.log("APP LOADED");

  //Add DOMContentLoaded event to loadDefaultImages on DOM
  document.addEventListener("DOMContentLoaded", (e) => loadDefaultImages());
})(document);
