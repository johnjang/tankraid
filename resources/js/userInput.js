//This file is responsible for user inputs and related functions to it
//Last update: 9/8
//Author: PBJ 
//*****************************************************************************

//getting a canvas where the game will take place
var canvas = document.getElementById("gameCanvas");
canvas.style.display = "block";
var ctx = canvas.getContext("2d");
canvas.style.cursor = "none";
var boundary = [[0,0],[canvas.width,canvas.height]];

//function to generate a random point. Will be used by enemy sprites mostly
var generateRandomPoint = function() {
    //random x and y point within the canvas
    var xPos = Math.random() * (canvas.width-10); 
    var yPos = Math.random() * (canvas.height-10-100);
    xPos = Math.floor(xPos);
    yPos = Math.floor(yPos);
    return [xPos, yPos];
};

//self executing anonymous function
// sets up listeners for user's mouse interactions
(function() {
    //cursor object to track user cursor movements 
    window.cursor = {
        xPos:0, //current mouse pos-xaxis
        yPos:0, //current mouse pos-yaxis
        click:false, //if user is clicking, it is true, else false
        cxPos:0, //mouse click for x axis
        cyPos:0  //mouse click for y axis
    }

    //mousemove listener, it will store the current value into the cursor object
    canvas.addEventListener("mousemove", function(e) {
        cursor["xPos"] = e.clientX;
        cursor["yPos"] = e.clientY;
    }, false);
    
    //if user is clicking, change the state of cursor to click:true 
    canvas.addEventListener("mousedown", function(e) {
        cursor["click"] = true;
    }, false);

    //if user is not clicking anymore, change the state of cursor to click:false
    canvas.addEventListener("mouseup", function(e) {
        cursor["click"] = false;
    }, false);
})();

//self executing anonymous function
// sets up listeners for user's keyboard interactions
(function() {
    //an object to hold information of user's keyboard interactions
    var pressedKeys = {};
    
    //Two simple listener to track user keyboard interactions
    document.addEventListener('keydown', function(e) {
        setKey(e, true);
    });
    document.addEventListener('keyup', function(e) {
        setKey(e, false);
    });

    //It will set pressedKeys object to show whether or not a key is pressed
    function setKey(event, status) {
        var code = event.keyCode;
        var key;
        switch(code) {
            //Left for a
            case 65:
                key = 'LEFT'; 
                break;
            //Up for w
            case 87:
                key = 'UP'; 
                break;
            //Right for d
            case 68:
                key = 'RIGHT'; 
                break;
            //Down for s
            case 83:
                key = 'DOWN'; 
                break;
            //numbers 1~4 or number pad 1~4
            case 49:
            case 97:
                key = '1'; 
                break;
            case 50:
            case 98:
                key = '2'; 
                break;
            case 51:
            case 99:
                key = '3'; 
                break;
            case 52:
            case 100:
                key = '4'; 
                break;
            default:
                //do nothing
        }
        //the keys will be either true(pressed) or false(not pressed)
        pressedKeys[key] = status;
    }

    //making a global variable called input to access the information
    // processed in this function
    window.input = {
        isDown: function(key) {
            return pressedKeys[key.toUpperCase()];
        }
    };
})();
