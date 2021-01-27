import {GifImagesController} from './GifImages.js'
import {renderDOM} from '../render.js';
import {request} from '../helper.js';
import {domElements,modal} from '../DOMstuff.js';
import {GIPHY_API_KEY, GIPHY_API_BASE_URL, API_ERROR_DEFAULT_MSG, API_TIMEOUT} from '../Constants.js';

const ImageSearchBoxController = (() => {
  /**
   * It fetch the images from passed url and from response data load the images to DOM.
   * @param {string} requestURL -  The url for which request is made.
   * @param {object} requestParams - request parameters
   * @param {number} timeout -  The time in which API should provide a valid response,
   *                            otherwise request will be cancelled.
   */
  function _loadImages(requestURL, requestParams = {}, timeout) {
    modal.loadingMsgDom.show();
    request(requestURL, requestParams, timeout)
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        GifImagesController.emptyStore();
        let data = response.data;
        if(data.length){
          response.data.forEach((imgObj) => {
            GifImagesController.addToStore(imgObj);
          });
          renderDOM.gifImages.list();
          modal.loadingMsgDom.close();
        }else{
          modal.errorMsgDom.show("For searched query no giffs are available");
        }
      })
      .catch(function (error) {
        console.error(error);
        modal.errorMsgDom.show(API_ERROR_DEFAULT_MSG);
      });
  }

  /**
   * Image Search Clear button event handler. It delete the query typed in image search box.
   * @param {object} - The Click event occur on clicking the image search clear button.
   */
  function clearSeachText(e){
    const _imageInputEl = domElements.imageInputEl;
    _imageInputEl.value = '';
  }

  /**
   * Image Search button event handler. It load the images on the browser screen based
   * on the search query.
   * @param {object} - The Click event occur on clicking the image search button.
   */
  function handleImageSearchBtnClick(e) {
    e.preventDefault();
    const _imageInputEl = domElements.imageInputEl;
    let textToSearch = _imageInputEl.value.trim();
    if (textToSearch.length) {
      let requestURL = `${GIPHY_API_BASE_URL}search?api_key=${GIPHY_API_KEY}&q=${textToSearch}`;
      _loadImages(requestURL, {} , API_TIMEOUT);
    }
  }

  return { 
    handleImageSearchBtnClick,
    clearSeachText
   };
})();

export {ImageSearchBoxController};