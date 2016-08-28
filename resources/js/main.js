

var imageObjects = {};
var imgAddress = [];
var enemySprites = [];
var enemyBulletSprites = [];
var bulletSprites = [];
var user = {
    image : 0,
    sprite : 0,
    locationx : 0,
    locationy : 0,
    alive : false
};
var level;
var levelDate = Date.now();

function loadResources() {
    //loading all the images
    console.log("calling loadResources");
    imgAddress = [
        "resources/images/sprites.png",
        "resources/images/backgroundtile.bmp",
        "resources/images/grid.bmp",
        "resources/images/mainTank.png",
        "resources/images/enemyTank.png",
        "resources/images/cursor.png",
        "resources/images/bullet.bmp"

    ];
    loadImages(imgAddress, loadGame, imageObjects);

    //loading all the sounds (to be added)

}

function loadGame() {

    //making the main character.
    user["image"] = imageObjects["resources/images/mainTank.png"];
    level = 0;  //initial level 0. Level increases every frame.
   
    user.sprite = new Sprite(user.image, [238,367], 0, 0, null, 
                                null, null,
                                null, null, null);

    var enemyTank = imageObjects["resources/images/enemyTank.png"];
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
    
    var cursorImg = imageObjects["resources/images/cursor.png"];
    ctx.drawImage(cursorImg, cursor["xPos"]-cursorImg.width, 
                    cursor["yPos"]-cursorImg.height, cursorImg.width, 
                    cursorImg.height);


}

function updateUser(dtr) {
    var userSpeed = 150;
    var bulletSpeed = 200;
    if(input.isDown('LEFT') == true) {
        user.sprite.dir = 'W';
        if(user.sprite.position[0] < 0) {
            //do nothing. out of bounds
        } else {
            user.sprite.position[0] -= dtr*userSpeed;
        }
    }
    if(input.isDown('RIGHT') == true) {
        user.sprite.dir = 'E';
        if(user.sprite.position[0] > canvas.width) {
            //do nothing. out of bounds
        } else {
            user.sprite.position[0] += dtr*userSpeed;
        }
    }
    if(input.isDown('DOWN') == true) {
        user.sprite.dir = 'S';
        if(user.sprite.position[1] > canvas.height) {
            //do nothing. out of bounds
        } else {
            user.sprite.position[1] += dtr*userSpeed;
        }
    }
    if(input.isDown('UP') == true) {
        user.sprite.dir = 'N';
        if(user.sprite.position[1] < 0) {
            //do nothing. out of bounds
        } else {
            user.sprite.position[1] -= dtr*userSpeed;
        } 
    }
    if(input.isDown('1') == true) {
        console.log("change shot 1");
    }
    if(input.isDown('2') == true) {
        console.log("change shot 2");
    }
    if(input.isDown('3') == true) {
        console.log("change shot 3");
    }
    if(input.isDown('4') == true) {
        console.log("change shot 4");
    }
    else {

    }
    user.sprite.render(ctx);

    if(cursor["click"] == true &&
        (Date.now() - user.sprite.lastFired) > 1000) {

        user.sprite.lastFired = Date.now();
        var bulletImg = imageObjects["resources/images/bullet.bmp"];
        var sx = user.sprite.position[0];
        var sy = user.sprite.position[1];
        var cx = cursor["cxPos"];
        var cy = cursor["cyPos"];
        var bullet = new Sprite(bulletImg, [sx, sy], 100, 0, 
                                [cx, cy], null, null, null, null, null);

        bullet.generateRandomLoc = false;
        bulletSprites.push(bullet);
    }
}

//go through an array of bullet sprites and update them all
function updateBullets(dtr) {
    for(var i=0; i<bulletSprites.length; i++) {
        bullet = bulletSprites[i];
        bullet.updateLocation2(dtr);
        //check if it hit an object
        if(bulletSprites[i].destinationReached == true) {
            bulletSprites.splice(i, 1);
            i--;
        } else {
            bulletSprites[i].render(ctx);
        }
    }
}

function updateEnemy(dtr) {
    //making enemy sprites
    if(Date.now() -levelDate > 5000) {
        levelDate = Date.now();
        var enemyImg = imageObjects["resources/images/enemyTank.png"];
        var points = generateRandomPoint();
        var points2= generateRandomPoint();
        var enemy = new Sprite(enemyImg, [points[0], points[1]], 50, null,
                               [points2[0],points2[1]], null, null, null, null, null); 
        enemySprites.push(enemy);
    }

    for(var i=0; i<enemySprites.length; i++) {
        enemySprites[i].updateLocation2(dtr);
        enemySprites[i].render(ctx);
    }
}

function update(dtr) {
    renderBackground(); //always get the background first!!
    updateUser(dtr);
    updateEnemy(dtr);
    updateBullets(dtr);
     
    updateAllCollision();
    

}

var updateAllCollision = function() {
    //check enemytank with user
    //enemySprites vs user.sprite

    //check enemybullets with user
    //enemyBullets vs user.sprite


    //check allybullets with enemytanks
    //bulletSprites vs enemySprites
    for(var i=0; i< enemySprites.length; i++) {
        enemySprite = enemySprites[i];
        for(var j=0; j<bulletSprites.length; j++) {
            if(enemySprite.checkCollision(bulletSprites[j])) {
                console.log("collision happened");
                //collision happened, destroy both objects
                enemySprites.splice(i,1);
                bulletSprites.splice(j,1);
                i--; j--;
                //replace with an explosion
            }
        }
    }

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


