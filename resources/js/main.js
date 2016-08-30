
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
var enemyKilled = 0;
var user = {
    image : 0,
    sprite : 0,
    locationx : 0,
    locationy : 0,
    alive : true,
    bulletType : 0,
    bulletInfo: {
        t0 : [1, Date.now(), 2000], //always 1, dont change
        t1 : [10, Date.now(), 500],
        t2 : [10, Date.now(), 200],
        t3 : [10, Date.now(), 3000],
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
   
    user.sprite = new Sprite(user.image, 0,0, user.image.width, user.image.height, 
                                250, 250, 0, 0, 0, null, null);
    user.sprite.generateRandomLoc = false;
    loop();
}

function renderBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);   //clear the background
    //redraw the static backgroun
    var backGround = imageObjects["resources/images/backgroundtile.bmp"];
    var menuPanel = imageObjects["resources/images/grid.bmp"];
    
    ctx.fillStyle = ctx.createPattern(backGround, 'repeat');
    ctx.fillRect(0, 0, canvas.width, canvas.height-100);

    ctx.fillStyle = ctx.createPattern(menuPanel, 'repeat');
    ctx.fillRect(0, 0+canvas.height-100, canvas.width, canvas.height);
    
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
        if(user.sprite.dx < 0) {
            //do nothing. out of bounds
        } else {
            user.sprite.dx -= dtr*userSpeed;
        }
    }
    if(input.isDown('RIGHT') == true) {
        user.sprite.dir = 'E';
        if(user.sprite.dx > canvas.width) {
            //do nothing. out of bounds
        } else {
            user.sprite.dx += dtr*userSpeed;
        }
    }
    if(input.isDown('DOWN') == true) {
        user.sprite.dir = 'S';
        if(user.sprite.dy > canvas.height-95-user.sprite.image.height) {
            //do nothing. out of bounds
        } else {
            user.sprite.dy += dtr*userSpeed;
        }
    }
    if(input.isDown('UP') == true) {
        user.sprite.dir = 'N';
        if(user.sprite.dy < 0) {
            //do nothing. out of bounds
        } else {
            user.sprite.dy -= dtr*userSpeed;
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
        var dx = user.sprite.dx;
        var dy = user.sprite.dy;
        var destination = [cursor["cxPos"], cursor["cyPos"]];
        var swidth; var sheight; var sx; var sy; var bullet; var speed;

        user.bulletInfo["t"+user.bulletType][1] = Date.now();

        switch(user.bulletType) {
            case 0:
                swidth= 17;
                sheight = 12;
                sx= 1;
                sy= 7; 
                speed = 300;
                break;
            case 1:
                swidth= 12;
                sheight= 7;
                sx= 25;
                sy= 8;
                speed = 500;
                user.bulletInfo["t"+user.bulletType][0] -= 1;
                break;
            case 2:
                swidth = 7;
                sheight= 7;
                sx= 47;
                sy= 7; 
                speed = 600;
                user.bulletInfo["t"+user.bulletType][0] -= 1;
                break;
            case 3:
                swidth = 7;
                sheight= 13;
                sx= 87;
                sy= 5;
                speed = 100;
                user.bulletInfo["t"+user.bulletType][0] -= 1;
                break;
        }
        bullet = new Sprite(bulletImg, sx, sy, swidth, sheight, 
                            dx, dy, 0, 0, speed, destination, null);
        bullet.generateRandomLoc = false;

        allyBulletSprites["t"+user.bulletType].push(bullet);
    }
}

//go through an array of bullet sprites and update them all
function updateBullets(dtr) {
    //updating ally bullets first from t0 to t3
    var arrayOfTypes = allyBulletSprites["t0"];
    for(var i=0; i<arrayOfTypes.length; i++) {
        arrayOfTypes[i].updateLocation(dtr);
        if(arrayOfTypes[i].destinationReached == true) {
            //do nothing
        } else {
             arrayOfTypes[i].render(ctx);
        }
    }
    arrayOfTypes = allyBulletSprites["t1"];
    for(var i=0; i<arrayOfTypes.length; i++) {
        arrayOfTypes[i].updateLocation(dtr);
        if(arrayOfTypes[i].destinationReached == true) {
            //do nothing
        } else {
             arrayOfTypes[i].render(ctx);
        }
    }
    arrayOfTypes = allyBulletSprites["t2"];
    for(var i=0; i<arrayOfTypes.length; i++) {
        arrayOfTypes[i].updateLocation(dtr);
        if(arrayOfTypes[i].destinationReached == true) {
             arrayOfTypes.splice(i, 1);
             i--;
        } else {
             arrayOfTypes[i].render(ctx);
        }
    }
    arrayOfTypes = allyBulletSprites["t3"];
    for(var i=0; i<arrayOfTypes.length; i++) {
        arrayOfTypes[i].updateLocation(dtr);
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
    if(Date.now() - levelDate > 5000) {
        levelDate = Date.now();
        var enemyImg = imageObjects["resources/images/enemyTank.png"];
        var points = generateRandomPoint();
        var points2= generateRandomPoint();
        var enemy = new Sprite(enemyImg, 0, 0, enemyImg.width, enemyImg.height, 
                                points[0], points[1], 0, 0, 50, points2, null);
        enemy.generateRandomLoc = true;
        enemySprites.push(enemy);
    }

    for(var i=0; i<enemySprites.length; i++) {
        enemySprites[i].updateLocation(dtr);
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

function updateMenu() {
    var image = imageObjects["resources/images/bullets.png"];
    var type = user.bulletType;
    //load all the static images/texts
    ctx.fillStyle= 'red';
    ctx.font = '30px customFont';   //custom font not working
    ctx.fillText('WEAPON STATUS', 25, canvas.height-70);
    var ep = 110;
    //working on #1
    ctx.font = '15px customFont';
    ctx.fillText('1', 15, canvas.height-55);
    ctx.drawImage(image, 1, 7, 17, 12, 10, canvas.height-30, 17, 12);
    ctx.font = '10px customFont';
    if(type == 0) { 
        ctx.fillText('ACTIVE', 10+20, canvas.height-30);
    } else {
        ctx.fillText('INACTIVE', 10+20, canvas.height-30);
    }
    ctx.fillText('INF', 10+20, canvas.height-10);
    //working on #2
    ctx.font = '15px customFont';
    ctx.fillText('2', 15+ep, canvas.height-55);
    ctx.drawImage(image, 25, 8, 12, 7,2+10+ep, canvas.height-30, 12, 7);
    ctx.font = '10px customFont';
    if(type == 1) { 
        ctx.fillText('ACTIVE', 30+ep, canvas.height-30);
    } else {
        ctx.fillText('INACTIVE', 30+ep, canvas.height-30);
    }
    ctx.fillText(user.bulletInfo["t1"][0], 30+ep, canvas.height-10);
    //working on #3
    ctx.font = '15px customFont';
    ctx.fillText('3', 15+ep*2, canvas.height-55);
    ctx.drawImage(image, 47, 7, 7, 7, 4+10+ep*2, canvas.height-30, 7, 7);

    ctx.font = '10px customFont';
    if(type == 2) { 
        ctx.fillText('ACTIVE', 30+ep*2, canvas.height-30);
    } else {
        ctx.fillText('INACTIVE', 30+ep*2, canvas.height-30);
    }
    ctx.fillText(user.bulletInfo["t2"][0], 30+ep*2, canvas.height-10);

    //working on #4
    ctx.font = '15px customFont';
    ctx.fillText('4', 15+ep*3, canvas.height-55);
    ctx.drawImage(image, 87, 5, 7, 13, 5+10+ep*3, canvas.height-30, 7, 13);

    ctx.font = '10px customFont';
    if(type == 3) { 
        ctx.fillText('ACTIVE', 30+ep*3, canvas.height-30);
    } else {
        ctx.fillText('INACTIVE', 30+ep*3, canvas.height-30);
    }
    ctx.fillText(user.bulletInfo["t3"][0], 30+ep*3, canvas.height-10);

    //update score (enemies killed, boss killed etc)
    ctx.font = '30px customFont';
    ctx.fillText('SCORE', 850, canvas.height-70);
    ctx.fillText(enemyKilled, 850, canvas.height-20);

}


function update(dtr) {
    renderBackground(); //always get the background first!!
    updateUser(dtr);
    updateEnemy(dtr);
    updateBullets(dtr);
    updateItems();
    updateAllCollision();
    updateMenu();
    
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
        var sprite = new Sprite(image, 25, 8, 12, 7, sprite.dx,
                                sprite.dy, 0, 0, 0, null, 0);
        sprite.generateRandomLoc = false;
        itemSprites["t1"].push(sprite);
        
    } else if (randomNum < 0.5) {
        //make t2 weapon, 20% chance
        var sprite = new Sprite(image, 47, 7, 7, 7, sprite.dx,
                                sprite.dy, 0, 0, 0, null, 0);
        sprite.generateRandomLoc = false;
        itemSprites["t2"].push(sprite);
        
    } else if (randomNum < 0.6) {
        //make t3 weapon, 10% chance
        var sprite = new Sprite(image, 87, 5, 7, 13, sprite.dx,
                                sprite.dy, 0, 0, 0, null, 0);
        sprite.generateRandomLoc = false;
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
                    enemyKilled++;
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
                    enemyKilled++;
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
                enemyKilled++;
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
                enemyKilled++;
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


