
//create a canvas for the game
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1100;
canvas.height = 550;
document.body.appendChild(canvas);

var imageObjects = {};
var imgAddress = [];

var enemySprites = [];
var strucSprites = [];
var staticSprites = [];


function loadResources() {
    //loading all the images
    console.log("calling loadResources");
    imgAddress = [
        "resources/images/sprites.png",
        "resources/images/backgroundtile.bmp",
        "resources/images/grid.bmp",
        "resources/images/mainTank.bmp",
        "resources/images/enemyTank.bmp"
    ];
    loadImages(imgAddress, loadGame, imageObjects);

    //loading all the sounds (to be added)

}

function loadGame() {
    console.log("loadGame called");
    var enemyTank = imageObjects["resources/images/enemyTank.bmp"];
    enemySprites.push(new Sprite(enemyTank, [400, 200], 80, 41, 'N'));
    enemySprites.push(new Sprite(enemyTank, [0, 0], 10, 41, 'S'));
    enemySprites.push(new Sprite(enemyTank, [400, 200], 30, 41, 'E'));
    enemySprites.push(new Sprite(enemyTank, [400, 200], 20, 41, 'W'));
    loop();
}

function renderBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);   //clear the background
    //redraw the static backgroun
    //Maybe for next update, just paste the backgrounds permanently by creating
    // another canvas? 
    var backGround = imageObjects["resources/images/backgroundtile.bmp"];
    var menuPanel = imageObjects["resources/images/grid.bmp"];
    var mainTank = imageObjects["resources/images/mainTank.bmp"];
    
    ctx.fillStyle = ctx.createPattern(backGround, 'repeat');
    ctx.fillRect(0, 0, canvas.width, canvas.height-50);

    ctx.fillStyle = ctx.createPattern(menuPanel, 'repeat');
    ctx.fillRect(0, 0+canvas.height-120, canvas.width, canvas.height-50);

    ctx.drawImage(mainTank, 0,0,41,41,20,300,42,42);
}


function update(dtr) {
    console.log("updating");
    renderBackground();
    
    //updating enemy sprites
    for(var i=0; i<enemySprites.length; i++) {
        enemySprites[i].updateLocation(dtr);
        enemySprites[i].render(ctx);
    }



}

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





