//file responsible for user input. 
//It will load event handlers.
//
//List of keys to listen:
//  w/W: up, a/A: left, d/D: right, s/S: down
//  space: shoot, 1~4: weapon selection

(function() {
    var pressedKeys = {};
    
    function setKey(event, status) {
        var code = event.keyCode;
        var key;
        switch(code) {
            case 32:
                key = 'SPACE'; 
                break;
            case 37:
                key = 'LEFT'; 
                break;
            case 38:
                key = 'UP'; 
                break;
            case 39:
                key = 'RIGHT'; 
                break;
            case 40:
                key = 'DOWN'; 
                break;
            case 49:
                key = '1'; 
                break;
            case 51:
                key = '2'; 
                break;
            case 52:
                key = '3'; 
                break;
            case 53:
                key = '4'; 
                break;
            default:
                //do nothing
        }
        pressedKeys[key] = status;
    }

    document.addEventListener('keydown', function(e) {
        setKey(e, true);
    });

    document.addEventListener('keyup', function(e) {
        setKey(e, false);
    });
    window.input = {
        isDown: function(key) {
            return pressedKeys[key.toUpperCase()];
        }
    };
    
})();
