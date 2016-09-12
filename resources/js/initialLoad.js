//This file is responsible for setting up initial settings for the game
// It will load all the necessary resources including images and audios
//Last update: 9/8
//Author: PBJ
//******************************************************************************

//a function responsible for lading audios
// audAddress: an array of string containg addresses of audio for it to load
// callBackFunction: a function to call back when the audio loading is done
// returnObject: an array that will hold the returned auido file
//                  the file will be the address location
//                  ex)
//                      returnObject["sample/aduio/address"]
function loadAudios(audAddress, callBackFunction, returnObject) {
    var loaded = 0; //keeps track of number of loaded audios
    audAddress.forEach(function(address) {
        loadAudio(address); //call loadAudio for each given address
    });
    function loadAudio(address) {
        var audio = new Audio();
        audio.addEventListener('canplaythrough', isReady, false);
        audio.src = address;
        returnObject[address] = audio;
    }
    //function to check if the audio is loaded, if so go to callBackFunction
    function isReady(){
        loaded++;
        if(loaded == audAddress.length) {
            callBackFunction();
        }
    }
}

//a function responsible for loading images
// imgAddress: an array of string containg address of images for it to load
// callBackFunction: a function to call back when the image loading is done
// returnObject: an array that will hold the loaded image files
//                  just like audio, the image will be stored in
//                  the name of an address
function loadImages(imgAddress, callBackFunction, returnObject) {
    imgAddress.forEach(function(address) {
        loadImage(address);
    });
    function loadImage(address) {
        var img = new Image;
        img.onload = function() {
            returnObject[address] = img;
            if(isReady()) {
                callBackFunction();
            }
        };
        returnObject[address] = false;
        img.src = address;
    }
    //checks if the images are all loaded. Implemented a bit differently
    // from how audio checks if it is all loaded
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



