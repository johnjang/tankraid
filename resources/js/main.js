
//create a canvas for the game
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1100;
canvas.height = 550;
document.body.appendChild(canvas);

var imageObjects = {};
var imgAddress = [];
var terrain;



function loadResources() {
    //loading all the images
    imgAddress = [
        "resources/images/sprites.png",
        "resources/images/backgroundtile.bmp",
        "resources/images/grid.bmp",
        "resources/images/mainTank.bmp"
    ];
    loadImages(imgAddress, loadGame, imageObjects);

    //loading all the sounds (to be added)

}

var dummies = [];
function loadGame() {
    var mainTank = imageObjects["resources/images/mainTank.bmp"];
    dummies.push(new Sprite(mainTank, [400, 200], 80, 41, 'N'));
    loop();
}


function update(dtr) {
    console.log("updating");
        var backGround = imageObjects["resources/images/backgroundtile.bmp"];
        var backGround2 = imageObjects["resources/images/grid.bmp"];
        var mainTank = imageObjects["resources/images/mainTank.bmp"];
        terrain = ctx.createPattern(backGround, 'repeat');
        ctx.fillStyle = terrain;
        ctx.fillRect(0, 0, canvas.width, canvas.height-50);

        ctx.fillStyle = ctx.createPattern(backGround2, 'repeat');
        ctx.fillRect(0, 0+canvas.height-120, canvas.width, canvas.height-50);

        ctx.drawImage(mainTank, 0,0,41,41,20,300,42,42);


    dummies[0].updateLocation(dtr);
    dummies[0].render(ctx);
}

function startGame() {
    console.log("starting game");

    
}

//the main function that starts everything
function main() {
    loadResources();
}

var w = window;
requestAnimationFrame = w.requestAnimationFrame ||
                        w.webkitRequestAnimationFrame ||
                        w.msRequestAnimationFrame ||
                        w.mozRequestAnimationFrame;

var loop = function() {
    var now = Date.now();
    var delta = now - then;

    update(delta/1000);
    then = now;
    requestAnimationFrame(loop);
}

var then = Date.now();
main();



//context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
//sx, sy is top left corner of ORIGINAL FILE
//sw, sh is width and height of original file
//dx, dy is top left corner of DESTINATION CANVAS
//dw, dh is width and height of picture in DESTINATION CANVAS


