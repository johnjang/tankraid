//A file responsible for sprites objects

(function () {
    // address: the image address of sprite
    // state: alive/destroyed
    // position: top left corner of [x,y] of sprite
    // frame: frames to alternate
    // speed: the speed of sprites movement pixels/s
    // size: size of a sprite in pixels
    // destination: the place where sprite is going to
    function Sprite(image, sx, sy, swidth, sheight, dx, dy, dxsize, dysize,
                        speed, destination, frame) {
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
       this.destination = destination;
       this.frame = frame;
       this.destinationReached = false;
       this.generateRandomLoc = true;
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

        //updates the current location depending on the final destination 
        updateLocation : function(dtr) {
            if(this.destination[0]== this.dx &&
                    this.destination[1]== this.dy &&
                    this.generateRandomLoc == true) {
                var newDest = generateRandomPoint();
                this.destination[0] = newDest[0];
                this.destination[1] = newDest[1];
            } 
            //If none of the above it will move to given destination
            else {
                //di = sqrt((x2-x1)^2 + (y2-y1)^2)
                var sx = this.dx;
                var sy = this.dy;
                var dx = this.destination[0];
                var dy = this.destination[1];
                var xx = Math.pow((dx-sx), 2);
                var yy = Math.pow((dy-sy), 2);
                var di = Math.floor(Math.sqrt(xx+yy)); //distance using above equation

                //if the destination is less than two pixels away, just move
                // to the destination right away
                if(di < 5) {
                    this.dx= this.destination[0];
                    this.dy = this.destination[1];
                    this.destinationReached = true;
                } else {
                    var dix= (dx-sx)/di; //(x2-x1)/dist
                    var diy= (dy-sy)/di; //(y2-y1)/dist
                    this.dx += (dix*dtr*this.speed);
                    this.dy += (diy*dtr*this.speed);
                }
            }
        },

        //checks if each top left and bottom right collides with another 
        // set of top left and bottom right.
        checkCollision : function(sprite) {
            //now check if each point is within the boundary
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
