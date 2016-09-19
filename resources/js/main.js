//This file is where the actual game loop and all the other cool things happen
//Last update: 9/8
//Author: PBJ
//******************************************************************************

var then;
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
var explosionSprites = [];
var imageObjects = {};
var audioObjects = {};
var enemyKilled = 0;
var user = {
    image : 0,
    sprite : 0,
    locationx : 0,
    locationy : 0,
    alive : true,
    bulletType : 0,
    bulletInfo: {
        t0 : [1, Date.now(), 900], //always 1, dont change
        t1 : [0, Date.now(), 300],
        t2 : [0, Date.now(), 100],
        t3 : [0, Date.now(), 1000],
    }
};
var level;
var background;
function loadResources() {
    var audioAddress = [
        "resources/sound/background.mp3",
        "resources/sound/enemySpawn.mp3",
        "resources/sound/explosion1.mp3",
        "resources/sound/itemPickUp.mp3"
    ];
    loadAudios(audioAddress, loadResources2, audioObjects);
    background = audioObjects['resources/sound/background.mp3'];
    background.loop = true;
    background.volume = 0.2;
    background.play();

}

function loadResources2() {
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
    loadImages(imgAddress, loadInstructions, imageObjects);
}

function loadInstructions() {
    //add tutorial...
    loadGame();
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

    //a little helper function for bullets that goes on straight linearly
    //x,y = position user clicked
    //x2,y2 = user's current position
    function calculateEnd(x, y, x2, y2) {
        //find slope
        var xdes; var ydes;
        var slope = (x-x2)/(y-y2);
        //find the equation of line, y = mx + b, solve b
        var b = y - slope*x;

        //find direction
        xdes = x2; ydes = y2;
        
       return [xdes, ydes]; 
        
    }

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
        var swidth; var sheight; var sx; var sy; var bullet; var speed; var size;

        user.bulletInfo["t"+user.bulletType][1] = Date.now();
        var destination; var linear = false;
        switch(user.bulletType) {
            case 0:
                swidth= 17;
                sheight = 12;
                sx= 1;
                sy= 7; 
                speed = 600;
                size = 15;
                destination = [cursor["xPos"]-swidth, cursor["yPos"]-sheight];
                break;
            case 1:
                swidth= 12;
                sheight= 7;
                sx= 25;
                sy= 8;
                speed = 900;
                user.bulletInfo["t"+user.bulletType][0] -= 1;
                size = 15;
                destination = [cursor["xPos"]-swidth, cursor["yPos"]-sheight];
                break;
            case 2:
                swidth = 7;
                sheight= 7;
                sx= 47;
                sy= 7; 
                speed = 1200;
                size = 0;
                user.bulletInfo["t"+user.bulletType][0] -= 1;
                destination = [cursor["xPos"]-swidth, cursor["yPos"]-sheight];
                linear = true;
                break;
            case 3:
                swidth = 7;
                sheight= 13;
                sx= 87;
                sy= 5;
                speed = 500;
                user.bulletInfo["t"+user.bulletType][0] -= 1;
                size = 40;
                destination = [cursor["xPos"]-swidth, cursor["yPos"]-sheight];
                linear = true;
                break;
        }
        bullet = new Sprite(bulletImg, sx, sy, swidth, sheight, 
                            dx, dy, size, size, speed, destination, null, linear);
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
            explosionSprites.push([null, Date.now(), 
                                    arrayOfTypes[i].dx, 
                                    arrayOfTypes[i].dy, 0]);
        } else {
             arrayOfTypes[i].render(ctx);
        }
    }
    arrayOfTypes = allyBulletSprites["t1"];
    for(var i=0; i<arrayOfTypes.length; i++) {
        console.log(i);
        arrayOfTypes[i].updateLocation(dtr);
        if(arrayOfTypes[i].destinationReached == true) {
            explosionSprites.push([null, Date.now(), 
                                    arrayOfTypes[i].dx, 
                                    arrayOfTypes[i].dy, 0]);
        } else {
             arrayOfTypes[i].render(ctx);
        }
    }
    arrayOfTypes = allyBulletSprites["t2"];
    for(var i=0; i<arrayOfTypes.length; i++) {
        console.log(i);
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

var currentEnemies = 0;
function updateEnemy(dtr) {
    //making enemy sprites
    var enemyImg = imageObjects["resources/images/enemyTank.png"];
    if(currentEnemies == 0) {
        var sound = audioObjects["resources/sound/enemySpawn.mp3"];
        sound.play();
        for(var i=0; i<enemyKilled+1; i++) {
            var points = generateRandomPoint();
            var points2= generateRandomPoint();
            var enemy = new Sprite(enemyImg, 0, 0, enemyImg.width, enemyImg.height, 
                                    points[0], 0, 0, 0, 100+enemyKilled*10, points2, 
                                    null, false);
            enemy.generateRandomLoc = true;
            enemySprites.push(enemy);
            currentEnemies++;
        }
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
    ctx.fillStyle= 'black';
    ctx.font = '30px customFont';   //custom font not working
    ctx.fillText('WEAPON STATUS', 75, canvas.height-70);
    var ep = 115;
    //working on #1
    ctx.font = '15px customFont';
    ctx.fillText('1', 15, canvas.height-50);
    ctx.drawImage(image, 1, 7, 17, 12, 10, canvas.height-30, 17, 12);
    ctx.font = '13px customFont';
    if(type == 0) { 
        ctx.fillStyle = 'green';
        ctx.fillText('ACTIVE', 34, canvas.height-30);
    } else {
        ctx.fillStyle = 'red';
        ctx.fillText('INACTIVE', 34, canvas.height-30);
    }
    ctx.fillText('INF', 34, canvas.height-10);
    //working on #2
    ctx.font = '15px customFont';
    ctx.fillStyle= 'black';
    ctx.fillText('2', 15+ep, canvas.height-50);
    ctx.drawImage(image, 25, 8, 12, 7,2+10+ep, canvas.height-30, 12, 7);
    ctx.font = '13px customFont';
    if(type == 1) { 
        ctx.fillStyle = 'green';
        ctx.fillText('ACTIVE', 34+ep, canvas.height-30);
    } else {
        ctx.fillStyle = 'red';
        ctx.fillText('INACTIVE', 34+ep, canvas.height-30);
    }
    if(user.bulletInfo["t1"][0] > 0) {
        ctx.fillStyle = 'green';
    } else {
        ctx.fillStyle = 'red';
    }
    ctx.fillText(user.bulletInfo["t1"][0], 34+ep, canvas.height-10);
    //working on #3
    ctx.font = '15px customFont';
    ctx.fillStyle= 'black';
    ctx.fillText('3', 15+ep*2, canvas.height-50);
    ctx.drawImage(image, 47, 7, 7, 7, 4+10+ep*2, canvas.height-30, 7, 7);

    ctx.font = '13px customFont';
    if(type == 2) { 
        ctx.fillStyle = 'green';
        ctx.fillText('ACTIVE', 34+ep*2, canvas.height-30);
    } else {
        ctx.fillStyle = 'red';
        ctx.fillText('INACTIVE', 34+ep*2, canvas.height-30);
    }
    if(user.bulletInfo["t2"][0] > 0) {
        ctx.fillStyle = 'green';
    } else {
        ctx.fillStyle = 'red';
    }
    ctx.fillText(user.bulletInfo["t2"][0], 34+ep*2, canvas.height-10);

    //working on #4
    ctx.font = '15px customFont';
    ctx.fillStyle= 'black';
    ctx.fillText('4', 15+ep*3, canvas.height-50);
    ctx.drawImage(image, 87, 5, 7, 13, 5+10+ep*3, canvas.height-30, 7, 13);

    ctx.font = '13px customFont';
    if(type == 3) { 
        ctx.fillStyle = 'green';
        ctx.fillText('ACTIVE', 34+ep*3, canvas.height-30);
    } else {
        ctx.fillStyle = 'red';
        ctx.fillText('INACTIVE', 34+ep*3, canvas.height-30);
    }
    if(user.bulletInfo["t3"][0] > 0) {
        ctx.fillStyle = 'green';
    } else {
        ctx.fillStyle = 'red';
    }
    ctx.fillText(user.bulletInfo["t3"][0], 34+ep*3, canvas.height-10);

    //update score (enemies killed, boss killed etc)
    ctx.fillStyle = 'green';
    ctx.font = '30px customFont';
    ctx.fillText('SCORE', 850, canvas.height-70);
    ctx.fillText(enemyKilled, 850, canvas.height-20);

}

var exploding = [];

function updateExplosions() {
    //explosionSprites=[image, datenow, dx dy, #]
    var image = imageObjects['resources/images/explosion.png'];
    var dateNow = Date.now();
    for(var i=0; i<explosionSprites.length; i++) {
        var currExplosion = explosionSprites[i];
        if(dateNow - currExplosion[1] > 50) {
            currExplosion[1] = dateNow; 
            currExplosion[4] += 1;
        } else if(currExplosion[4] == 9) { //done, get rid of it
            explosionSprites.splice(i,1);
            i--;
        } else {
            ctx.drawImage(image, 20*currExplosion[4], 1, 19, 19, 
                        currExplosion[2], currExplosion[3], 19, 19);
        }

    }
    
}

function update(dtr) {
    renderBackground(); //always get the background first!!
    updateUser(dtr);
    updateEnemy(dtr);
    updateBullets(dtr);
    updateItems();
    updateExplosions();
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
    var addValue=0;
    for(var i=1; i<4; i++) {
        switch(i) {
            case 1:
                addValue = 20;
                break;
            case 2:
                addValue = 100;
                break;
            case 3:
                addValue = 10;
                break;
        }
        var item = itemSprites["t"+i];
        for(var j=0; j<item.length; j++) {
            if(item[j].checkCollision(user.sprite)) {
                var sound = audioObjects["resources/sound/itemPickUp.mp3"];
                sound.play();
                user.bulletInfo["t"+i][0] += addValue;
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
                    enemyKilled++;
                    currentEnemies--;
                    explosionSprites.push([null, Date.now(), 
                                            enemySprites[j].dx, 
                                            enemySprites[j].dy, 0]);
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
                    enemyKilled++;
                    currentEnemies--;
                    explosionSprites.push([null, Date.now(), 
                                            enemySprites[j].dx, 
                                            enemySprites[j].dy, 0]);
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
                enemyKilled++;
                currentEnemies--;
                explosionSprites.push([null, Date.now(), 
                                        enemySprites[j].dx, 
                                        enemySprites[j].dy, 0]);
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
                enemyKilled++;
                currentEnemies--;
                explosionSprites.push([null, Date.now(), 
                                        enemySprites[j].dx, 
                                        enemySprites[j].dy, 0]);
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
        background.pause();
        var a = document.getElementById("restart");
        a.style.display = "block";
        currentEnemies = 0;
        exploding = [];
        enemySprites = [];
        enemyBulletSprites = []; //array that holds array of enemy bullet sprites
        allyBulletSprites = {   //object that holds array of ally bullet sprites
            t0 : [],
            t1 : [],
            t2 : [],
            t3 : []
        };
        itemSprites = { //array that holds item sprites
            t1 : [],
            t2 : [],
            t3 : []

        };  
        explosionSprites = [];
        imageObjects = {};
        audioObjects = {};
        enemyKilled = 0;
        user = {
            image : 0,
            sprite : 0,
            locationx : 0,
            locationy : 0,
            alive : true,
            bulletType : 0,
            bulletInfo: {
                t0 : [1, Date.now(), 900], //always 1, dont change
                t1 : [0, Date.now(), 300],
                t2 : [0, Date.now(), 100],
                t3 : [0, Date.now(), 1000],
            }
        };
        //end game
    }       
}


var start = function() {
    then = Date.now();
    var hide = document.getElementById('tutorial');
    hide.style.display ='none';
    hide = document.getElementById('restart');
    hide.style.display ='none';
    
    loadResources();    //it will start everything. 
}


