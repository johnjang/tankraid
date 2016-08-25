//This function will load all the images given in the address and 
// call the callBackFunction() when the job is done.
// imgAddress: array of string or a string of address containing the file
// callBackFunction: Function to callback when loading all images are done
// returnObject: the cache object where the images are stored
function loadImages(imgAddress, callBackFunction, returnObject) {
    //Check if the address is an array or a single address
    if(imgAddress instanceof Array) {
        imgAddress.forEach(function(address) {
            loadImage(address);
        });
    }
    else {
        loadImage(imgAddress);
    }

    function loadImage(address) {
        var img = new Image;
        img.onload = function() {
            returnObject[address] = img;
            if(isReady()) {
                console.log("initialLoad.js: all loaded");
                callBackFunction();
            }
        };
        returnObject[address] = false;
        img.src = address;
    }

    function isReady() {
        for(var i in returnObject) {
            if(returnObject.hasOwnProperty(i) &&
                    !returnObject[i]) {
                return false;
            }
        }
        return true;
    }



}

var address = "resources/sprites.png";
var img = new Image();
img.onload = function() {
    console.log("loaded");
};
img.src = address;
