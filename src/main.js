let config = {
    type: Phaser.CANVAS, 
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;


/*
    Point Breakdown
    Total: 30/100
    20 - Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points 
    10 - Display the time remaining (in seconds) on the screen (10)
*/