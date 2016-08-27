

var imageObjects = {};
var imgAddress = [];
var enemySprites = [];
var bulletSprites = [];
var user = {
    image : 0,
    sprite : 0,
    locationx : 0,
    locationy : 0,
    alive : false
};
var level;

function loadResources() {
    //loading all the images
    console.log("calling loadResources");
    imgAddress = [
        "resources/images/sprites.png",
        "resources/images/backgroundtile.bmp",
        "resources/images/grid.bmp",
        "resources/images/mainTank.bmp",
        "resources/images/enemyTank.bmp",
        "resources/images/cursor.bmp"

    ];
    loadImages(imgAddress, loadGame, imageObjects);

    //loading all the sounds (to be added)

}

function loadGame() {

    //making the main character.
    user["image"] = imageObjects["resources/images/mainTank.bmp"];
    level = 0;  //initial level 0. Level increases every frame.
   
    user.sprite = new Sprite(user.image, [238,367], 0, 81, 'S');

    var enemyTank = imageObjects["resources/images/enemyTank.bmp"];
    enemySprites.push(new Sprite(enemyTank, [228, 103], 30, 41, 'N', null));
    enemySprites.push(new Sprite(enemyTank, [100, 20], 10, 41, 'S', null));
    enemySprites.push(new Sprite(enemyTank, [300, 200], 100, 41, 'E', null));
    enemySprites.push(new Sprite(enemyTank, [400, 200], 200, 41, 'W', null));
    loop();
}

function renderBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);   //clear the background
    //redraw the static backgroun
    var backGround = imageObjects["resources/images/backgroundtile.bmp"];
    var menuPanel = imageObjects["resources/images/grid.bmp"];
    
    ctx.fillStyle = ctx.createPattern(backGround, 'repeat');
    ctx.fillRect(0, 0, canvas.width, canvas.height-50);

    ctx.fillStyle = ctx.createPattern(menuPanel, 'repeat');
    ctx.fillRect(0, 0+canvas.height-50, canvas.width, canvas.height);
    
    var cursorImg = imageObjects["resources/images/cursor.bmp"];
    ctx.drawImage(cursorImg, cursor["xPos"]-cursorImg.width, 
                    cursor["yPos"]-cursorImg.height, cursorImg.width, 
                    cursorImg.height);


}

function updateUser(dtr) {
    var userSpeed = 50;
    var bulletSpeed = 200;
    if(input.isDown('LEFT') == true) {
        user.sprite.dir = 'W';
        user.sprite.position[0] -= dtr*userSpeed;
    }
    if(input.isDown('RIGHT') == true) {
        user.sprite.dir = 'E';
        user.sprite.position[0] += dtr*userSpeed;
    }
    if(input.isDown('DOWN') == true) {
        user.sprite.dir = 'S';
        user.sprite.position[1] += dtr*userSpeed;
    }
    if(input.isDown('UP') == true) {
        user.sprite.dir = 'N';
        user.sprite.position[1] -= dtr*userSpeed;
    }
    if(input.isDown('1') == true) {
        console.log("fire shot 1");
    }
    if(input.isDown('2') == true) {
        console.log("fire shot 2");
    }
    if(input.isDown('3') == true) {
        console.log("fire shot 3");
    }
    if(input.isDown('4') == true) {
        console.log("fire shot 4");
    }
    else {

    }
    user.sprite.render(ctx);

    if(cursor["click"] == true) {
        console.log("fired, x:y = " + cursor["cxPos"] +
                       ":" + cursor["cyPos"]);
        console.log("fire shot");
    //    var bullet = new Sprite("resources/images/cursor.bmp",
    //                                [user.position[0], user.position[1]],
    //                                bulletSpeed, 5,'');
    //    bulletSprites.add(bullet);
    }

}


//a function to shoot from sprite's current position
// sprite: Sprite object (the missile)
// img: missile img
// destination: x,y coordinates
function shootFire(sprite, destination){
    var sx = sprites.position[0];
    var sy = sprites.position[1];
    var dx = destination[0];
    var dy = destination[1];

    var xx = Math.pow((dx-sx), 2);
    var yy = Math.pow((dy-sy), 2);
    var di = Math.sqrt(xx+yy);
    var mv = di/sprite.speed;
    
    sprite.position[0] = Math.floor((dx-sx)/mv);
    sprite.position[1] = Math.floor((dy-sy)/mv);

}

function update(dtr) {
    renderBackground();
   
    updateUser(dtr);
    //updating enemy sprites
    for(var i=0; i<enemySprites.length; i++) {
        enemySprites[i].updateLocation2(dtr);
        enemySprites[i].render(ctx);
    }
    //making enemy sprites
    if(level > Math.random()) {
        console.log("making enemy");
        var randomX;
        var randomY;
        var randomD;

    }

    level += 0.000001;

}


//cross platform
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

loadResources();    //it will start everything. 


