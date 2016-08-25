console.log("main.js loaded");

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 700;
document.body.appendChild(canvas);

var imageObjects = {};
var imgAddress = [
    "resources/images/sprites.png",
    "resources/images/backgroundtile.bmp",
];


loadImages(imgAddress, foo, imageObjects);

var terrain;
function foo() {

    var img = imageObjects["resources/images/backgroundtile.bmp"];
    terrain = ctx.createPattern(img, 'repeat');
    
    ctx.fillStyle = terrain;
    ctx.fillRect(0, 0, canvas.width, canvas.height);


}



