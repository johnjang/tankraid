//create a canvas for the game
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1100;
canvas.height = 550;
canvas.style.cursor = "none";
var boundary = [[0,0],[canvas.width,canvas.height]];
document.body.appendChild(canvas);

var generateRandomPoint = function() {
    var xPos = Math.random() * canvas.width-20; //random xPos inside a canvas
    var yPos = Math.random() * canvas.height-20;    //random yPos inside a canvas
    xPos = Math.floor(xPos);
    yPos = Math.floor(yPos);
    return [xPos, yPos];
};

(function() {
    window.cursor = {
        xPos:0, //current mouse pos-xaxis
        yPos:0, //current mouse pos-yaxis
        click:false, //if user is clicking, it is true
        cxPos:0, //click mouse pos-xaxis
        cyPos:0  //click mouse pos-yaxis
    }

    canvas.addEventListener("mousemove", function(e) {
        cursor["xPos"] = e.clientX;
        cursor["yPos"] = e.clientY;
    }, false);
    canvas.addEventListener("mousedown", function(e) {
        var rect = canvas.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        cursor["cxPos"] = x; 
        cursor["cyPos"] = y; 
        cursor["click"] = true;
    }, false);
    canvas.addEventListener("mouseup", function(e) {
        cursor["click"] = false;
    }, false);

})();

(function() {
    var pressedKeys = {};
    
    function setKey(event, status) {
        var code = event.keyCode;
        var key;
        switch(code) {
            case 37:
                key = 'LEFT'; 
                break;
            case 38:
                key = 'UP'; 
                break;
            case 39:
                key = 'RIGHT'; 
                break;
            case 40:
                key = 'DOWN'; 
                break;
            case 49:
                key = '1'; 
                break;
            case 51:
                key = '2'; 
                break;
            case 52:
                key = '3'; 
                break;
            case 53:
                key = '4'; 
                break;
            default:
                //do nothing
        }
        pressedKeys[key] = status;
    }

    document.addEventListener('keydown', function(e) {
        setKey(e, true);
    });

    document.addEventListener('keyup', function(e) {
        setKey(e, false);
    });
    window.input = {
        isDown: function(key) {
            return pressedKeys[key.toUpperCase()];
        }
    };
    
})();
