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
    //@@@@confused as to how this works. esp the part where this.x += this.speed * dt  ~TL
    this.x += this.speed * dt;
    this.reset();
};

// Reset enemy location upon reaching randomly generated endpoint range
Enemy.prototype.reset = function() {
    if (this.x >= randomInt(500, 800)) {
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
    this.StartY = 390;
    //locates player
    this.x = this.StartX;
    this.y = this.StartY;
};

// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.prototype.handleInput = function(direction) {
    if (direction === 'left' && this.x !== borders.left) {
        this.x -= 101;
    }
    if (direction === 'right' && this.x !== borders.right) {
        this.x += 101;
    }
    if (direction === 'up' && this.y !== borders.top) {
        this.y -= 85;
    }
    if (direction == 'down' && this.y !== borders.bottom) {
        this.y += 85;
    //resets the player position when top border is reached
    } else if (direction === 'up' && this.y === 50) {
        this.reset();
    }
};

// defines player borders
var borders = {
    left: 0,
    right: 404,
    bottom: 390,
    top: 50
};
//instantiates enemy object, passing in x, y, speed
var enemy1 = new Enemy(-110, 55, randomInt(100, 400));
var enemy2 = new Enemy(-110, 140, randomInt(100, 400));
var enemy3 = new Enemy(-110, 225, randomInt(100, 400));

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
