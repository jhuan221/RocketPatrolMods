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
    Total: 50/100
    20 - Implement a new timing/scoring mechanism that adds time to the clock for successful hits
        * every time a ship is hit, the timer increases by five seconds

    20 - Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points 
        * new ship is faster and player's earn 40 points if they take down the ship
    
    10 - Display the time remaining (in seconds) on the screen 
*/