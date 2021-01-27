import {modal,domElements} from './DOMstuff.js'
import {ImageSearchBoxController} from './controller/ImageSearchBox.js'

domElements.errorMsgModalCloseBtnEl.addEventListener('click',(e)=>modal.errorMsgDom.close());
domElements.imageSearchForm.addEventListener('submit',ImageSearchBoxController.handleImageSearchBtnClick);
domElements.imageSeachClearBtnEl.addEventListener('click',ImageSearchBoxController.clearSeachText);