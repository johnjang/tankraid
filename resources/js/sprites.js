//A file responsible for sprites

(function () {
    // address: the image address of sprite
    // state: alive/destroyed
    // position: top left corner of [x,y] of sprite
    // frame: frames to alternate
    // speed: the speed of sprites movement pixels/s
    // size: size of a sprite in pixels
    // destination: the place where sprite is going to
    function Sprite(image, position, speed, size, dir, destination) {
        this.image = image;
        this.position = position;
        this.speed = speed;
        this.size = size;
        this.dir = dir;
        this.destination = destination;
    }

    Sprite.prototype = {

        render : function(ctx) { //draw itself
            ctx.drawImage(this.image, this.position[0], this.position[1]);
        },

        updateLocation2 : function(dtr) {
            if(this.destination == null) {
                this.destination = [];
                var newDest = generateRandomPoint();
                console.log(newDest[0]+":"+newDest[1]);
                this.destination[0] = newDest[0];
                this.destination[1] = newDest[1];
            } else if(this.destination[0]==this.position[0] &&
                      this.destination[1]==this.position[1]) {
                var newDest = generateRandomPoint();
                this.destination[0] = newDest[0];
                this.destination[1] = newDest[1];
            } else {
                var sx = this.position[0];
                var sy = this.position[1];
                var dx = this.destination[0];
                var dy = this.destination[1];

                var xx = Math.pow((dx-sx), 2);
                var yy = Math.pow((dy-sy), 2);

                var di = Math.sqrt(xx+yy);
                if(di < 1) {
                    this.position[0] = this.destination[0];
                    this.position[1] = this.destination[1];
                } else {
                    var dix= (dx-sx)/di;
                    var diy= (dy-sy)/di;

                    this.position[0] += (dix*dtr*this.speed);
                    this.position[1] += (diy*dtr*this.speed);
                }
                console.log("di,x,y: " + di + ", " + this.position[0] +
                                ", " + this.position[1]);
            }
        }

    };
  

    window.Sprite = Sprite;
    console.log("Sprites loaded");
})();
