/**
 * Remove all the children of DOM Node
 * @param {object} node - A DOM Node 
 */
function clearNode(node){
    while(node.firstChild){
        node.removeChild(node.firstChild);
    }
}

/**
 * A timeout utility for promise
 * @param {number} time - Time in which promise will resolved
 * @return {Promise.<Object>} - A promise object that resolve after specified time.
 */
function timeoutPromise(time = 60000){
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve(Error("API Timeout"));
      }, time);
    });
}

export {
    clearNode,
    timeoutPromise
}