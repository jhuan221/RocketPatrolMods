class Menu extends Phaser.Scene{
    constructor() {
        super("menuScene");
    }

    preload(){
        // load audio
        this.load.audio('sfx_select', './assets/start.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.image('menufield', './assets/menufield.png');
    }
    create() {
        this.add.tileSprite(0, 0, 640, 480, 'menufield').setOrigin(0, 0);
        // menu text config
        let menuConfig = {
            fontFamily: 'Andale Mono',
            fontSize: '28px',
            backgroundColor: '#d16eb1',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5, 
            },
            fixedWidth: 0
        }

        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize-30 -
        borderPadding, 'bunny patrol', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, (game.config.height/2) - 30, 'Use <- -> arrows to move & (F) to fire', 
        menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#37946e';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize-30 +
        borderPadding, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    }
    update(){
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)){
            // easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            // hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
    }
}

