import { GifImagesController } from "./modules/controller/GifImages.js";
import { renderDOM } from "./modules/render.js";
import { timeoutPromise } from "./modules/helper.js";

(function () {
  const API_KEY = "mxFIqNNWgjxb3HLuiEPqXsC8jTFfAS4W";
  const _imageSearchBtnEl = document.querySelector(".btn--image_search");
  const _imageInputEl = document.querySelector('input[name="gif-name"]');

  function request(url, init = {}, timeout) {
    init = Object.assign({ mode: "cors" }, init);
    return Promise.race([fetch(url, init), timeoutPromise(timeout)]);
  }

  /**
   * It fetch the images from passed url and from response data load the images to DOM.
   * @param {string} requestURL -  The url for which request is made.
   * @param {number} timeout -  The time in which API should provide a valid response,
   *                            otherwise request will be cancelled.
   */
  function loadImages(requestURL, timeout) {
    request(requestURL, {}, timeout)
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        console.log("request completed");
        GifImagesController.emptyStore();
        response.data.forEach((imgObj) => {
          GifImagesController.addToStore(imgObj);
        });
        renderDOM.gifImages.list();
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  /**
   * Image Search button event handler. It load the images on the browser screen based
   * on the search query.
   * @param {object} - The Click event occur on clicking the image search button.
   */
  function handleImageSearchBtnClick(e) {
    let textToSearch = _imageInputEl.value.trim();
    if (textToSearch.length) {
      let requestURL = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${textToSearch}`;

      loadImages(requestURL, 8000);
    }
  }

  /**
   * It will fetch and load default gifs on user screen on each browser
   * refresh window.
   */
  function loadDefaultImages() {
    let requestURL =
      "https://api.giphy.com/v1/gifs/search?api_key=mxFIqNNWgjxb3HLuiEPqXsC8jTFfAS4W&q=goodmorning";
    loadImages(requestURL, 8000);
  }

  // Add Click event to ImageSearchBtn to load the images related seach text
  _imageSearchBtnEl.addEventListener("click", handleImageSearchBtnClick);
  //Add DOMContentLoaded event to loadDefaultImages on DOM
  document.addEventListener("DOMContentLoaded", (e) => loadDefaultImages);
})();
