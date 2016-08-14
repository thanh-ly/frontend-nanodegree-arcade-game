// defines play borders
var borders = {
    left: 0,
    right: 404,
    bottom: 400,
    top: 50
};

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// Moves the enemy and executes reset
Enemy.prototype.update = function(dt) {
    //@@@@confused as to how this works. esp the part where this.x += this.speed * dt; also why is this not leaving a trail of sprites?  ~TL
    this.x += this.speed * dt;
    this.reset();
};

// Reset enemy location upon reaching randomly generated endpoint range
Enemy.prototype.reset = function() {
    if (this.x >= borders.right + randomInt(100, 300)) {
        this.x = -110;
        this.speed = randomInt(100, 400);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//defines Player class
var Player = function() {
    this.sprite = 'images/char-boy.png';
    //defines the start location
    this.StartX = 202;
    this.StartY = 400;
    //locates player
    this.x = this.StartX;
    this.y = this.StartY;
    this.score = 0
};

// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    this.collide();
};

// Draw the enemy on the screen, required method for game
//logs the score on top right corner of canvas
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = "24px Arial";
    ctx.fillText("Score: " + this.score, 400, 40);
};

// Reset player to start points
Player.prototype.reset = function () {
    this.x = this.StartX;
    this.y = this.StartY;
};

//translates input to player movement. Resets the player
//once player reaches the top of the canvas (water sprite) and 
//increases the score
Player.prototype.handleInput = function(direction) {
    if (direction === 'left' && this.x !== borders.left) {
        this.x -= 101;
    }
    if (direction === 'right' && this.x !== borders.right) {
        this.x += 101;
    }
    if (direction === 'up' && this.y !== borders.top) {
        this.y -= 80;
    }
    if (direction == 'down' && this.y !== borders.bottom) {
        this.y += 80;
    //resets the player position when top border is reached
    } else if (direction === 'up' && this.y <= 0) {
        this.reset(); 
        this.score += 1;
    }
};

//gives Player collision logic
Player.prototype.collide = function () {
    //iterates through enemy instances, collects the location of enemy 
    //instance vs. player instance, if less than specified margin, 
    //resets player 
    //@@@@@@@ not sure how I got this to work. Why does this get called in the .update and not the main class? TL
    for (i = 0; i < allEnemies.length; i++) {
        var margin = 50;
        if (Math.abs(allEnemies[i].x - this.x) < margin && Math.abs(allEnemies[i].y - this.y) < margin) {
            this.reset();
            //console.log('collision with enemy');
            }
        }
}

//instantiates enemy object, passing in x, y, speed
var enemy1 = new Enemy(-110, 80, randomInt(100, 400));
var enemy2 = new Enemy(-110, 160, randomInt(100, 400));
var enemy3 = new Enemy(-110, 240, randomInt(100, 400));

//pushes enemy ojects into allEnemies
var allEnemies = [];
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);

//instantiates player object
var player = new Player;

//random positive integer generator
function randomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
