//This file holds all information about sprite object and related functions
//Last update: 9/8
//Author: PBJ 
//*****************************************************************************

//A self executing anonymous function for initializing Sprite object
(function () {
    // address: the image address of sprite
    // sx: source image x position
    // sy: source image y position
    // swidth: source image width
    // sheight: source image height
    // dx: destination x position
    // dy: destination y position
    // dxsize: sprite width size
    // dysize: sprite height size
    // speed: speed of sprite (0 for user)
    // destination: destination the sprite is moving to (0 for user)
    // frame: for changing animations
    function Sprite(image, sx, sy, swidth, sheight, dx, dy, dxsize, dysize,
                        speed, destination, frame, linear) {
       this.image = image;
       this.sx = sx;
       this.sy = sy;
       this.swidth = swidth;
       this.sheight = sheight;
       this.dx = dx;
       this.dy = dy;
       this.dxsize = dxsize;
       this.dysize = dysize;
       this.speed = speed;
       this.xspeed = 0; //will be calculated depending on destination
       this.yspeed = 0; //will be calculated depending on destination
       this.destination = destination;
       this.frame = frame;
       this.destinationReached = false;
       this.generateRandomLoc = true;   //for enemy sprites it is always true
       this.linear = linear;         //for bullet sprites, it will be true for
                                    // those that goes on straight linearly
       this.velocityX = 0;
       this.velocityY = 0;
    }

    Sprite.prototype = {
        //draw itself on the canvas
        render : function(ctx) { 
                ctx.drawImage(this.image, this.sx, this.sy, this.swidth, this.sheight,
                            this.dx-((this.dxsize+this.swidth)/2), 
                            this.dy-((this.dysize+this.sheight)/2),
                            this.swidth+this.dxsize,
                            this.sheight+this.dysize);
        },
        findVelocity : function() {
            var sx = this.dx;
            var sy = this.dy;
            var dx = this.destination[0];
            var dy = this.destination[1];
            var xx = Math.pow((dx-sx), 2);
            var yy = Math.pow((dy-sy), 2);
            var di = Math.floor(Math.sqrt(xx+yy)); //distance using above equation
            //the final velocity!!
            this.velocityX = (dx-sx)/di; //(x2-x1)/dist
            this.velocityY = (dy-sy)/di; //(y2-y1)/dist
        },
        //updates the current location depending on the final destination 
        updateLocation : function(dtr) {
            if(this.destination[0]== this.dx &&
                    this.destination[1]== this.dy &&
                    this.generateRandomLoc == true) {
                var newDest = generateRandomPoint();
                this.destination[0] = newDest[0];
                this.destination[1] = newDest[1];
            } else if(this.velocityX == 0) {
                this.findVelocity();
            } else {
                var sx = this.dx;
                var sy = this.dy;
                var dx = this.destination[0];
                var dy = this.destination[1];
                var xx = Math.pow((dx-sx), 2);
                var yy = Math.pow((dy-sy), 2);
                var di = Math.floor(Math.sqrt(xx+yy)); //distance using above equation
                if(this.linear == true) {
                    this.dx += (this.velocityX*dtr*this.speed);
                    this.dy += (this.velocityY*dtr*this.speed);
                    if(this.dx < 0 || this.dx > canvas.width ||
                            this.dy < 0 || this.dy > canvas.height) {
                        this.destinationReached = true;
                        console.log("reached");
                    }
                } else if(di < 8) {
                //if the destination is less than eight pixels away, just move
                // to the destination right away
                    this.dx= this.destination[0];
                    this.dy = this.destination[1];
                    this.destinationReached = true;
                    this.velocityX = 0;
                } else {
                    this.dx += (this.velocityX*dtr*this.speed);
                    this.dy += (this.velocityY*dtr*this.speed);
                }
            }
        },

        //checks if each top left and bottom right collides with another 
        // set of top left and bottom right.
        checkCollision : function(sprite) {
            // Thank you mozilla 2D collision detection guide!
            if( (this.dx+this.dxsize+this.swidth >= sprite.dx) &&
                (this.dx <= sprite.dx+sprite.dxsize+sprite.swidth) &&
                (this.dy+this.dysize+this.sheight >= sprite.dy) &&
                (this.dy <= sprite.dy + sprite.sheight) ) {
                return true;
            } else {
                return false;
            }
         }
    };
    
    window.Sprite = Sprite;
})();
