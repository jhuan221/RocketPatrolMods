// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        
        // add object to existing scene
        scene.add.existing(this); // add to existing, displayList, updateList
        this.isFiring1 = false; // track rocket's firing status
        //this.isFiring2 = false;
        this.moveSpeed = 2;    // pixels per frame 
        this.sfxRocket = scene.sound.add('sfx_rocket'); // adding rocket sfx
        //this.fireMiddle.visible = false;
    }
    
    update() {
        // left/right movement for player
        if (!this.isFiring){
            if (keyLEFT.isDown && this.x >= borderUISize + this.width){
                this.x -= this.moveSpeed;
            }
            else if (keyRIGHT.isDown && this.x <= game.config.width -
            borderUISize - this.width){
                this.x += this.moveSpeed;
            }
        }
        /*if (!this.isFiring2){
            if (keyA.isDown && this.x >= borderUISize + this.width){
                this.x -= this.moveSpeed;
            }
            else if (keyD.isDown && this.x <= game.config.width -
            borderUISize - this.width){
                this.x += this.moveSpeed;
            }
        }*/
        // fire button for player
        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring){
            this.isFiring = true;
            this.sfxRocket.play(); // play rocket sfx
            //this.fireCenter.visible = true;
        }
        // if fired, move up
        if (this.isFiring && this.y >= borderUISize * 3 + borderPadding){
            this.y -= this.moveSpeed;
            //this.fireMiddle.visible = true;
        }
        // reset on miss
        if (this.y <= borderUISize * 3 + borderPadding){
            this.reset();
        }
    }

    // rest rocket to the ground
    reset(){
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}

