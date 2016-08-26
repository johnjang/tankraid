//A file responsible for sprites

(function () {
    // address: the image address of sprite
    // state: alive/destroyed
    // position: top left corner of [x,y] of sprite
    // frame: frames to alternate
    // speed: the speed of sprites movement pixels/s
    // size: size of a sprite in pixels
    function Sprite(image, position, speed, size, dir) {
        this.image = image;
        this.position = position;
        this.speed = speed;
        this.size = size;
        this.dir = dir;
    }

    Sprite.prototype = {
        updateLocation : function(dt) {
                            switch(this.dir) {
                                case 'N':
                                    this.position[1] -= this.speed*dt;
                                    break;
                                case 'S':
                                    this.position[1] += this.speed*dt;
                                    break;    
                                case 'E':
                                    this.position[0] += this.speed*dt;
                                    break;
                                case 'W':
                                    this.position[0] -= this.speed*dt;
                                    break;
                                }
                         },
        render : function(ctx) { //draw itself
            ctx.drawImage(this.image, 
                            0, 0, this.size, this.size, this.position[0], 
                           this.position[1], this.size*2, this.size*2);
        }
    };
   
    window.Sprite = Sprite;
    console.log("Sprites loaded");
})();
