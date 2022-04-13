// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to existing scene
        this.points = pointValue;   // store pointValue
        this.moveSpeed = game.settings.spaceshipSpeed;         // pixels per frame 
    }

    update() {
        // move spaceship left 
        // using the point system to indicate which ship 
        // has to go faster 
        if (this.points > 30){
            this.x -= this.moveSpeed + 2;
        }
        else{
            this.x -= this.moveSpeed;
        }
        // wrap around from left edge to right edge
        if (this.x <= 0 - this.width){
            this.reset();
        }
    }

    // pos reset
    reset() {
        this.x = game.config.width;
    }
}