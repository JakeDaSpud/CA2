import Enemy from './enemy.js';
import Renderer from '../engine/renderer.js';
import { Colours } from '../engine/resources.js';
import { Images } from '../engine/resources.js';
import Physics from '../engine/physics.js';
import Player from './player.js';
import Platform from './platform.js';
import Animator from '../engine/animator.js';

class JumpingEnemy extends Enemy {
    constructor(x, y, movementLimit) {
        super(x, y, movementLimit);

        this.renderer = this.getComponent(Renderer);
        this.renderer.image = Images.jumpingEnemyRun;

        this.animator = new Animator(this.renderer);

        // Get the Physics component of this enemy
        this.physics = this.getComponent(Physics);

        this.movementDistance = 0;
        this.movementLimit = movementLimit;
        this.movingRight = true;
        this.isOnPlatform = false;
    }

    // Define an update method that will run every frame of the game. It takes deltaTime as an argument
    // which represents the time passed since the last frame
    update(deltaTime) {

        // Check if the enemy is colliding with the player
        const player = this.game.gameObjects.find(obj => obj instanceof Player);
        if (this.physics.isColliding(player.getComponent(Physics))) {
            player.collidedWithEnemy();
        }

        // Check if the enemy is colliding with any platforms
        const platforms = this.game.gameObjects.filter(obj => obj instanceof Platform);

        for (const platform of platforms) {
            if (this.physics.isColliding(platform.getComponent(Physics))) {
                // If it is, stop its vertical movement and position it on top of the platform
                this.physics.velocity.y = 0;
                this.physics.acceleration.y = 0;
                this.y = platform.y - this.getComponent(Renderer).height;
                this.isOnPlatform = true;
            }
        }

        if (this.isOnPlatform) {
            this.animator.jumpingEnemyRunningAnimation(this.renderer);
        } 
        
        else if (!this.isOnPlatform) {
            this.animator.jumpingEnemyFallingAnimation(this.renderer);
        }

        // Call the update method of the superclass (GameObject), passing along deltaTime
        super.update(deltaTime);
    }
}

export default JumpingEnemy;