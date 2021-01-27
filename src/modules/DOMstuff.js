const DOMstuff = ((document) => {
  const domElements = (()=>{
    const errorMsgModalCloseBtnEl = document.querySelector(".err_msg_modal .btn--close");
    const imageSearchForm = document.querySelector(".image__search_form");
    const imageSearchBtnEl = document.querySelector(".image__search_btn--seach");
    const imageSeachClearBtnEl = document.querySelector(".image__search_btn--clear")
    const imageInputEl = document.querySelector('input[name="gif-name"]');

    return{
        errorMsgModalCloseBtnEl,
        imageSearchForm,
        imageSearchBtnEl,
        imageSeachClearBtnEl,
        imageInputEl,
    }
  })();

  const modal = (() => {
    const _mainModalEl = document.querySelector(".modal");

    const _hideMainModal = () => _mainModalEl.classList.add("hidden");
    const _showMainModal = () => _mainModalEl.classList.remove("hidden");

    const errorMsgDom = (() => {
      const _errorMsgModalEl = document.querySelector(".err_msg_modal");
      const _errorMsgModalDisplayEl = document.querySelector(".err_msg_modal__display");
        
      function show(msg) {
        _showMainModal();
        _errorMsgModalEl.classList.remove("hidden");
        _errorMsgModalDisplayEl.textContent = msg;
      }

      function close() {
        _errorMsgModalEl.classList.add("hidden");
        _errorMsgModalDisplayEl.textContent = "";
        _hideMainModal();
      }

      return{ 
          show,
          close,
      }
    })();

    const loadingMsgDom = (() => {
      const _loadingMsgModalEl = document.querySelector(".loading_msg_modal");

      function show() {
         _showMainModal();
        _loadingMsgModalEl.classList.remove("hidden");
      }

      function close() {
        _loadingMsgModalEl.classList.add("hidden");
        _hideMainModal();
      }

      return {
        show,
        close,
      };
    })();

    return {
      errorMsgDom,
      loadingMsgDom,
    };
  })();

  return {
      modal,
      domElements
  }
})(document);

export const {modal,domElements} = DOMstuff;
