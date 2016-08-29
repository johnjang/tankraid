
var enemySprites = [];
var enemyBulletSprites = []; //array that holds array of enemy bullet sprites
var allyBulletSprites = {   //object that holds array of ally bullet sprites
    t0 : [],
    t1 : [],
    t2 : [],
    t3 : []
};
var itemSprites = { //array that holds item sprites
    t1 : [],
    t2 : [],
    t3 : []

};  
var imageObjects = {};
var bulletSprites = [];
var bulletSprites
var user = {
    image : 0,
    sprite : 0,
    locationx : 0,
    locationy : 0,
    alive : true,
    bulletType : 0,
    bulletInfo: {
        t0 : [1, Date.now(), 2000],
        t1 : [0, Date.now(), 500],
        t2 : [0, Date.now(), 200],
        t3 : [0, Date.now(), 3000],
    }
};
var level;
var levelDate = Date.now();

function loadResources() {
    //loading all the images
    var imgAddress = [
        "resources/images/backgroundtile.bmp",
        "resources/images/grid.bmp",
        "resources/images/mainTank.png",
        "resources/images/enemyTank.png",
        "resources/images/cursor.png",
        "resources/images/bullets.png",
        "resources/images/explosion.png"
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
        user.bulletType = 0;
    }
    if(input.isDown('2') == true) {
        user.bulletType = 1;
    }
    if(input.isDown('3') == true) {
        user.bulletType = 2;
    }
    if(input.isDown('4') == true) {
        user.bulletType = 3;      
    }
    user.sprite.render(ctx);
    var arrayBulletInfo = user.bulletInfo["t"+user.bulletType];
    if(cursor["click"] == true &&
            (Date.now() - arrayBulletInfo[1] > 
                        arrayBulletInfo[2]) &&
                (arrayBulletInfo[0] > 0)) {
            
        var bulletImg = imageObjects["resources/images/bullets.png"];
        var sx = user.sprite.position[0];
        var sy = user.sprite.position[1];
        var cx = cursor["cxPos"];
        var cy = cursor["cyPos"];
        var sizeW; var sizeH; var imageX; var imageY; var bullet; var speed;

        user.bulletInfo["t"+user.bulletType][1] = Date.now();

        switch(user.bulletType) {
            case 0:
                sizeW = 17;
                sizeH = 12;
                imageX = 1;
                imageY = 7; 
                speed = 300;
                break;
            case 1:
                sizeW = 12;
                sizeH = 7;
                imageX = 25;
                imageY = 8;
                speed = 500;
                user.bulletInfo["t"+user.bulletType][0] -= 1;
                break;
            case 2:
                sizeW = 7;
                sizeH = 7;
                imageX = 47;
                imageY = 7; 
                speed = 600;
                user.bulletInfo["t"+user.bulletType][0] -= 1;
                break;
            case 3:
                sizeW = 7;
                sizeH = 13;
                imageX = 87;
                imageY = 5;
                speed = 100;
                user.bulletInfo["t"+user.bulletType][0] -= 1;
                break;
        }
        bullet = new Sprite(bulletImg, [sx, sy], speed, 0, [cx, cy],
                            sizeW, sizeH, imageX, imageY, null);

        bullet.generateRandomLoc = false;
        allyBulletSprites["t"+user.bulletType].push(bullet);
    }
}

//go through an array of bullet sprites and update them all
function updateBullets(dtr) {
    //updating ally bullets first from t0 to t3
    var arrayOfTypes = allyBulletSprites["t0"];
    for(var i=0; i<arrayOfTypes.length; i++) {
        arrayOfTypes[i].updateLocation2(dtr);
        if(arrayOfTypes[i].destinationReached == true) {
            //do nothing
        } else {
             arrayOfTypes[i].render(ctx);
        }
    }
    arrayOfTypes = allyBulletSprites["t1"];
    for(var i=0; i<arrayOfTypes.length; i++) {
        arrayOfTypes[i].updateLocation2(dtr);
        if(arrayOfTypes[i].destinationReached == true) {
            //do nothing
        } else {
             arrayOfTypes[i].render(ctx);
        }
    }
    arrayOfTypes = allyBulletSprites["t2"];
    for(var i=0; i<arrayOfTypes.length; i++) {
        arrayOfTypes[i].updateLocation2(dtr);
        if(arrayOfTypes[i].destinationReached == true) {
             arrayOfTypes.splice(i, 1);
             i--;
        } else {
             arrayOfTypes[i].render(ctx);
        }
    }
    arrayOfTypes = allyBulletSprites["t3"];
    for(var i=0; i<arrayOfTypes.length; i++) {
        arrayOfTypes[i].updateLocation2(dtr);
        if(arrayOfTypes[i].destinationReached == true) {
             arrayOfTypes.splice(i, 1);
             i--;
        } else {
             arrayOfTypes[i].render(ctx);
        }
    }

    //updating enemy bullets


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

function updateItems() {
    for(var i=1; i<4; i++) {
        var item = itemSprites["t"+i];
        for(var j=0; j<item.length; j++) {
            item[j].render(ctx);
        }
    }
}

function update(dtr) {
    renderBackground(); //always get the background first!!
    updateUser(dtr);
    updateEnemy(dtr);
    updateBullets(dtr);
    updateItems();
     
    updateAllCollision();
    
    if(user.alive == false) {
        //end the game
    }

}

//drops an item on the sprite's position randomly
var randomDrop = function(sprite) {
    var randomNum = Math.random();
    var image = imageObjects["resources/images/bullets.png"];
    if(randomNum < 0.3) {
        //make t1 weapon, 30% chance
        console.log("30% dropped");
        var sprite = new Sprite(image,
                    [sprite.position[0],sprite.position[1]], 0, 0, null,
                    12, 7, 25, 8, null);
        itemSprites["t1"].push(sprite);
        
    } else if (randomNum < 0.5) {
        //make t2 weapon, 20% chance
        console.log("20% dropped");
        var sprite = new Sprite(image,
                    [sprite.position[0],sprite.position[1]], 0, 0, null,
                    7, 7, 47, 7, null);
        itemSprites["t2"].push(sprite);
        
    } else if (randomNum < 0.6) {
        //make t3 weapon, 10% chance
        console.log("10% dropped");
        var sprite = new Sprite(image,
                    [sprite.position[0],sprite.position[1]], 0, 0, null,
                    7, 13, 87, 5, null);
        itemSprites["t3"].push(sprite);
    }

}


var updateAllCollision = function() {
    //check enemytank with user
    for(var i=0; i<enemySprites.length; i++) {
        if(enemySprites[i].checkCollision(user.sprite)) {
            user.alive = false;
        }
    }
   
    //check items
    for(var i=1; i<4; i++) {
        var item = itemSprites["t"+i];
        for(var j=0; j<item.length; j++) {
            if(item[j].checkCollision(user.sprite)) {
                user.bulletInfo["t"+i][0] += 10;
                item.splice(j,1);
                j--;
            }
        }
    }



    var arrayOfTypes = itemSprites["t1"];

    var arrayOfTypes = itemSprites["t2"];

    var arrayOfTypes = itemSprites["t3"];



    //checking all user bullets
    var arrayOfTypes = allyBulletSprites["t0"];
    for(var i=0; i<arrayOfTypes.length; i++) {
        if(arrayOfTypes[i].destinationReached == true) {
            for(var j=0; j<enemySprites.length; j++) {
                if(enemySprites[j].checkCollision(arrayOfTypes[i])) {
                    randomDrop(enemySprites[j]);    //randomly drop item upon death
                    enemySprites.splice(j,1);
                    j--;
                }
            }
            arrayOfTypes.splice(i,1)
            i--;
        }
    }

    arrayOfTypes = allyBulletSprites["t1"];
    for(var i=0; i<arrayOfTypes.length; i++) {
        if(arrayOfTypes[i].destinationReached == true) {
            for(var j=0; j<enemySprites.length; j++) {
                if(enemySprites[j].checkCollision(arrayOfTypes[i])) {
                    randomDrop(enemySprites[j]);    //randomly drop item upon death
                    enemySprites.splice(j,1);
                    j--;
                }
            }
            arrayOfTypes.splice(i,1)
            i--;
        }
    }

    arrayOfTypes = allyBulletSprites["t2"];
    for(var i=0; i<arrayOfTypes.length; i++) {
        for(var j=0; j<enemySprites.length &&
                    arrayOfTypes[i]!=null; j++) {
            if(enemySprites[j].checkCollision(arrayOfTypes[i])) {
                randomDrop(enemySprites[j]);    //randomly drop item upon death
                enemySprites.splice(j,1);
                j--;
                arrayOfTypes.splice(i,1);
                i--;
            }
        }
    }

    arrayOfTypes = allyBulletSprites["t3"];
    for(var i=0; i<arrayOfTypes.length; i++) {
        for(var j=0; j<enemySprites.length; j++) {
            if(enemySprites[j].checkCollision(arrayOfTypes[i])) {
                randomDrop(enemySprites[j]);    //randomly drop item upon death
                enemySprites.splice(j,1);
                j--;
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
    if(user.alive == true) {
        requestAnimationFrame(loop);
    }
    else  {
        //end game
    }       
}

var then = Date.now();

loadResources();    //it will start everything. 


