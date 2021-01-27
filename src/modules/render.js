import {GifImagesController} from "./controller/GifImages.js";
import {clearNode} from "./helper.js";

const renderDOM = (() => {
  const gifImages = (() => {
    function list() {
      const imageList = document.querySelector(".image__list");
      clearNode(imageList);

      GifImagesController.getImages().forEach((image, idx) => {
        const li1 = document.createElement("li");
        const img1 = document.createElement("img");

        li1.classList.add("image__item", `image__item--${idx + 1}`);
        
        img1.setAttribute("src", `${image.images.original.url}`);
        
        li1.appendChild(img1);
        imageList.appendChild(li1);
      });
    }

    return { list };
  })();

  return { gifImages };
})();

export {renderDOM};
