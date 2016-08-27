

var imageObjects = {};
var imgAddress = [];
var enemySprites = [];
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
   
    user.sprite = new Sprite(user.image, [41,41], 0, 81, 'S');

    var enemyTank = imageObjects["resources/images/enemyTank.bmp"];
//    enemySprites.push(new Sprite(enemyTank, [400, 200], 20, 41, 'N'));
//    enemySprites.push(new Sprite(enemyTank, [0, 0], 10, 41, 'S'));
//    enemySprites.push(new Sprite(enemyTank, [400, 200], 30, 41, 'E'));
//    enemySprites.push(new Sprite(enemyTank, [400, 200], 20, 41, 'W'));
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
    ctx.fillRect(0, 0+canvas.height-120, canvas.width, canvas.height-50);
    
    var cursorImg = imageObjects["resources/images/cursor.bmp"];
    ctx.drawImage(cursorImg, cursor["xPos"]-cursorImg.width, 
                    cursor["yPos"]-cursorImg.height, cursorImg.width, 
                    cursorImg.height);


}

function updateUser(dtr) {
    var userSpeed = 50;
    if(input.isDown('LEFT') == true) {
        user.sprite.dir = 'W';
        user.sprite.speed = userSpeed;
    }
    else if(input.isDown('RIGHT') == true) {
        user.sprite.dir = 'E';
        user.sprite.speed = userSpeed;
    }
    else if(input.isDown('DOWN') == true) {
        user.sprite.dir = 'S';
        user.sprite.speed = userSpeed;
    }
    else if(input.isDown('UP') == true) {
        user.sprite.dir = 'N';
        user.sprite.speed = userSpeed;
    }
    else if(input.isDown('SPACE') == true) {
        console.log("fire shot");
    }
    else if(input.isDown('1') == true) {
        console.log("fire shot 1");
    }
    else if(input.isDown('2') == true) {
        console.log("fire shot 2");
    }
    else if(input.isDown('3') == true) {
        console.log("fire shot 3");
    }
    else if(input.isDown('4') == true) {
        console.log("fire shot 4");
    }
    else {
        user.sprite.speed = 0;
    }
    user.sprite.updateLocation(dtr);
    user.sprite.render(ctx);

    if(cursor["click"] == true) {
        console.log("fired, x:y = " + cursor["cxPos"] +
                       ":" + cursor["cyPos"]);
    }

}

function update(dtr) {
    console.log("updating");
    renderBackground();
   
    updateUser(dtr);
    //updating enemy sprites
    for(var i=0; i<enemySprites.length; i++) {
        enemySprites[i].updateLocation(dtr);
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


