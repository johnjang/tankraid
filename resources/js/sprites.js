//A file responsible for sprites objects

(function () {
    // address: the image address of sprite
    // state: alive/destroyed
    // position: top left corner of [x,y] of sprite
    // frame: frames to alternate
    // speed: the speed of sprites movement pixels/s
    // size: size of a sprite in pixels
    // destination: the place where sprite is going to
    function Sprite(image, position, speed, size, destination, 
                    sizeWidth, sizeHeight, imageX, imageY, frame) {
        
        this.image = image;                 //Image object to hold iamge
        this.position = position;           //current position of sprite
        this.speed = speed;                 //movement speed of sprite
        
        this.size = size;      //if size of the image
                               //needs to get bigger by a constant pixels
        this.sizeWidth = sizeWidth;        
        this.sizeHeight = sizeHeight;     

        this.destination = destination;     //the final destination
        this.generateRandomLoc = true;     //for enemy sprites
        this.destinationReached = false;
        this.lastFired = Date.now();
        this.frame = frame;     //if the image needs to change
        this.imageX = imageX;
        this.imageY = imageY;
    }

    Sprite.prototype = {

        //draw itself on the canvas
        render : function(ctx) { 
            if(this.imageX == null) {
                ctx.drawImage(this.image, this.position[0], this.position[1]);
            } else {
                ctx.drawImage(this.image, this.imageX, this.imageY, this.sizeWidth,
                                this.sizeHeight, this.position[0], this.poition[1],
                                this.sizeWidth, this.sizeHeight);
            }
        },

        //updates the current location depending on the final destination 
        updateLocation2 : function(dtr) {
            //If there is no destination, it will create a random destination
            // unless generateRandomLoc is false
            if(this.destination == null &&
               this.generateRandomLoc == true) {
                this.destination = [];
                var newDest = generateRandomPoint();
                this.destination[0] = newDest[0];
                this.destination[1] = newDest[1];
            } else if(this.destination == null &&
                      this.generateRandomLoc == false) {
                //do nothing
            }
            //If destination has been reached, it will stop or make
            // a new destination depending on generateRandomLoc variable
            else if(this.destination[0]==this.position[0] &&
                    this.destination[1]==this.position[1] &&
                    this.generateRandomLoc == true) {
                var newDest = generateRandomPoint();
                this.destination[0] = newDest[0];
                this.destination[1] = newDest[1];
            } 
            //If none of the above it will move to given destination
            else {
                //di = sqrt((x2-x1)^2 + (y2-y1)^2)
                var sx = this.position[0];
                var sy = this.position[1];
                var dx = this.destination[0];
                var dy = this.destination[1];
                var xx = Math.pow((dx-sx), 2);
                var yy = Math.pow((dy-sy), 2);
                var di = Math.sqrt(xx+yy); //distance using above equation

                //if the destination is less than two pixels away, just move
                // to the destination right away
                if(di < 2) {
                    this.position[0] = this.destination[0];
                    this.position[1] = this.destination[1];
                    this.destinationReached = true;
                } else {
                    var dix= (dx-sx)/di; //(x2-x1)/dist
                    var diy= (dy-sy)/di; //(y2-y1)/dist
                    this.position[0] += (dix*dtr*this.speed);
                    this.position[1] += (diy*dtr*this.speed);
                }
            }
        },
        //a helper function that checks collision of two sprites
        //x,y: top left, c,s: bottom right
        checkCollision : function(sprite1) {
            var x = sprite1.position[0];
            var y = sprite1.position[1];
            var c = sprite1.position[0]+10;//+sprite1.sizeWidth;
            var s = sprite1.position[1]+10;//+sprite1.sizeHeight;
            
            var x1= this.position[0];
            var y1= this.position[1];
            var c1= this.position[0]+10;//+this.sizeWidth;
            var s1= this.position[1]+10;//+this.sizeHeight;

            return !(c <= x1 || x>c1 || s <= y1 || y>s1);
        }
    };
  
    window.Sprite = Sprite;
    console.log("Sprites loaded");
})();
