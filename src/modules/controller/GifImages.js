const GifImagesController = (() => {
    const _imagesLocalStore = [];

    function addToStore(imgObj){
        _imagesLocalStore.push(imgObj);
    }

    function emptyStore(){
        while(_imagesLocalStore.length){
            _imagesLocalStore.pop();
        }
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