class Play extends Phaser.Scene{
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        //this.load.image('rocket', './assets/rocket.png');
        this.load.image('egg', './assets/egg.png');
        //this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('field', './assets/field.png');
        this.load.image('speedy', './assets/speedy.png');
        this.load.image('bunnyfirst', './assets/bunnyfirst.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64,
        frameHeight: 32, stateFrame: 0, endFrame: 9});
        this.load.spritesheet('bunny', './assets/bunny.png', {frameWidth: 128, 
        frameHeight:64, stateFrame: 0, endFrame:3});
        this.load.spritesheet('speedhop', './assets/speedhop.png', {frameWidth: 128, 
            frameHeight:64, stateFrame: 0, endFrame:3});
    
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion382.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        //this.load.audio('bkmusic', './assets/bkmusic.wav');
    }

    create() {
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'field').setOrigin(0, 0);
        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding,
        game.config.width, borderUISize * 2,
        0x4b92b9).setOrigin(0,0);
        // white borders
        this.add.rectangle(0,0, game.config.width, borderUISize,
        0x6abe30 ).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width,
        borderUISize,  0x6abe30).setOrigin(0,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 
            0x6abe30).setOrigin(0,0);
        this.add.rectangle(game.config.width -borderUISize, 0, borderUISize,
        game.config.height,  0x6abe30).setOrigin(0,0);
        // add rocket (p1 & p2)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize -
        borderPadding, 'egg').setOrigin(0, 0);
        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + 
        borderUISize*6, borderUISize*5.2, 'bunnyfirst', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3,
        borderUISize*6 + borderPadding*3.2, 'bunnyfirst', 0, 10).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*7 + borderPadding*5, 'bunnyfirst',
        0, 10).setOrigin(0,0);
        this.ship04 = new Spaceship(this, game.config.width, borderUISize*4, 'speedy',
        0, 40).setOrigin(0,0);
        // define keys
        keyF  = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        // animcation config
        this.anims.create({
            key: 'explode', 
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        this.anims.create({
            key: 'bunHop', 
            frames: this.anims.generateFrameNumbers('bunny', { start: 0, end: 3, first: 0}),
            frameRate: 12,
        });
        this.anims.create({
            key: 'speedup', 
            frames: this.anims.generateFrameNumbers('speedhop', { start: 0, end: 3, first: 0}),
            frameRate: 12,
        });
        this.once = false;
        // init score
        this.p1Score = 0;
        //display score
        let scoreConfig = {
            fontFamily: 'Andale Mono',
            fontSize: '28px',
            backgroundColor: '#6aacd1',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5, 
            },
            fixedWidth: 100
        }
        this.add.rectangle(borderUISize + borderPadding*6, borderUISize + borderPadding*4,
            110, 50,
            0x4a9cc9);
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize 
        +borderPadding*2,this.p1Score, scoreConfig);

        // display fire tag
        scoreConfig.align = 'center';
        // GAME OVER flag
        this.gameOver = false;
        // displaying the time
        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', 
            scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64,
            'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
        // displaying time
        let timeConfig = {
        fontFamily: 'Andale Mono',
        fontSize: '28px',
        backgroundColor: '#6aacd1',
        color: '#843605',
        align: 'center',
        padding: {
            top: 5,
            bottom: 5, 
        },
        fixedWidth: 150
        }
        this.add.rectangle(borderUISize*16 + borderPadding, borderUISize + borderPadding*3.9,
            160, 50,
            0x4a9cc9);
        this.timeRight = this.add.text (borderUISize*13.6 + borderPadding, borderUISize + borderPadding*2,
        'Time: ' + this.clock.getRemainingSeconds(), timeConfig);
        //this.animalMove(this.ship01);
        //this.once = false;
        //this.sound.play('bkmusic');
    }

    update() {    
        // decreasing the timer
        this.timeRight.text = 'Time:' + parseInt((this.clock.getRemainingSeconds()));
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start("menuScene");
        }
        

         // animating bunny
         //if (!this.once){
            //this.animalMove(this.ship01);
        //this.once = true;
        //}
        //fire display
        this.starfield.tilePositionX -= 4;
        if (!this.gameOver){
            this.p1Rocket.update();
            //this.animalMove(this.ship01);
            //this.animalMove(this.ship01);
            //this.p2Rocket.update();
            // update spaceships (x4)
            //this.animalMove(ship01);
            this.ship01.update();
            this.ship02.update();
            this.ship03.update(); 
            this.ship04.update();
        }
        // implement speed up when hitting 30 seconds
        //console.log(parseInt(this.clock.getRemainingSeconds()));
        //console.log(parseInt(game.settings.gameTimer/1000) - 30);
        if (parseInt(this.clock.getRemainingSeconds()) == (parseInt(game.settings.gameTimer/1000) - 30)){
            this.ship01.moveSpeed += 0.05;
            this.ship02.moveSpeed += 0.05;
            this.ship03.moveSpeed += 0.05;
            this.ship04.moveSpeed += 0.05;
            
        }
        
         // checking collisions
        if (this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if(this.checkCollision(this.p1Rocket, this.ship04)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship04);
        }
    }

    checkCollision(rocket, ship){
        // simple AABB checking
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y){
                return true;
            } else {
                return false;
            }
    }

    shipExplode(ship){
        // temp hide ship
        if (ship.points == 40){
                ship.alpha = 0;
            // create explosion sprite at ship's pos
            let boom = this.add.sprite(ship.x, ship.y, 'speedhop').setOrigin(0,0);
            boom.anims.play('speedup');             // play explode animation
            boom.on('animationcomplete', () => {    // callback after anim completes
                ship.reset();                       // reset ship pos
                ship.alpha = 1;                     // make ship visible again
                boom.destroy();                     // remove explosion sprite 
            });
        }
        else{
            ship.alpha = 0;
            // create explosion sprite at ship's pos
            let boom = this.add.sprite(ship.x, ship.y, 'bunny').setOrigin(0,0);
            boom.anims.play('bunHop');             // play explode animation
            boom.on('animationcomplete', () => {    // callback after anim completes
                ship.reset();                       // reset ship pos
                ship.alpha = 1;                     // make ship visible again
                boom.destroy();                     // remove explosion sprite 
            });
        }
        // score add and repaint
        this.p1Score += ship.points;   
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');
        // increasing timer 
        this.time.preUpdate(this.time.now, this.cur_time - this.time.now); 
        this.clock.delay += 5000;
    }

    /*animalMove(ship){
        ship.alpha = 0;
        let hopping = this.add.sprite(ship.x, ship.y, 'bunny');
        hopping.anims.play('bunHop');
        hopping.on('animationcomplete', () =>{
            ship.alpha = 1;
        })
    }*/

}

