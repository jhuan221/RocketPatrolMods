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
    Total: 100/100 (100 is max, total: 115 points)

    60 - Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi)
        * egg_shot sound from https://www.youtube.com/watch?v=aUb_FbdFZSA
        * bunny hit sound from https://www.youtube.com/watch?v=zHa-hy4xldg
        * start select sound from https://www.youtube.com/watch?v=zXKcybzvj7Y 
        * bunnies, background and egg assets were made in aseprite and photoshop

    20 - Implement a new timing/scoring mechanism that adds time to the clock for successful hits
        * every time a ship is hit, the timer increases by five seconds

    20 - Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points 
        * new ship is faster and player's earn 40 points if they take down the ship
        * faster bunny is the brown one 
    
    10 - Display the time remaining (in seconds) on the screen 

    5 - Implement the speed increase that happens after 30 seconds in the original game
*/