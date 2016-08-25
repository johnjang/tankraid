
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
        "resources/images/grid.bmp"
    ];
    loadImages(imgAddress, loadGame, imageObjects);

    //loading all the sounds (to be added)

}

function loadGame() {

    var backGround = imageObjects["resources/images/backgroundtile.bmp"];
    var backGround2 = imageObjects["resources/images/grid.bmp"];
    terrain = ctx.createPattern(backGround, 'repeat');
    ctx.fillStyle = terrain;
    ctx.fillRect(0, 0, canvas.width, canvas.height-50);

    ctx.fillStyle = ctx.createPattern(backGround2, 'repeat');
    ctx.fillRect(0, 0+canvas.height-120, canvas.width, canvas.height-50);

}


//the main function that starts everything
function main() {
    loadResources();
}

main();

