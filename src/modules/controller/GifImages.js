const GifImagesController = (() => {
    const _imagesLocalStore = [];

    function addToStore(imgObj){
        _imagesLocalStore.push(imgObj);
    }

    function emptyStore(){
       _imagesLocalStore.length = 0;
    }

    function getImages(){
        return [..._imagesLocalStore];
    }


    return {
        addToStore,
        getImages,
        emptyStore
    }
})();

export {GifImagesController}; 