import Enemy from './enemy.js';
import Renderer from '../engine/renderer.js';
import { Colours } from '../engine/resources.js';
import { Images } from '../engine/resources.js';
import Physics from '../engine/physics.js';
import Player from './player.js';
import Platform from './platform.js';
import Animator from '../engine/animator.js';

class JumpingEnemy extends Enemy {
    constructor(x, y, movementLimit, jumpForce) {
        super(x, y);

        this.renderer = this.getComponent(Renderer);
        this.renderer.image = Images.jumpingEnemyRun;

        this.animator = new Animator(this.renderer);

        // Get the Physics component of this enemy
        this.physics = this.getComponent(Physics);
        this.physics.velocity.x = 0;
        this.physics.acceleration.x = 0;

        this.movementDistance = 0;
        this.movementLimit = 0;
        this.movingRight = true;
        this.isOnPlatform = false;
        this.jumpForce = jumpForce;
        this.isJumping = false;
        this.jumpTime = 105;
        this.jumpTimer = 10;
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
                this.physics.acceleration.y = -50;
                this.y = platform.y - this.getComponent(Renderer).height;
                this.isOnPlatform = true;
            }
        }

        // Initiate a jump if the enemy is on a platform
        if (this.isOnPlatform) {
            this.startJump();
            this.animator.jumpingEnemyRunningAnimation(this.renderer);
        }
        
        else if (!this.isOnPlatform) {
            this.animator.jumpingEnemyFallingAnimation(this.renderer);
        }

        if (this.isJumping) {
            this.updateJump(deltaTime);
        }

        // Call the update method of the superclass (GameObject), passing along deltaTime
        super.update(deltaTime);
    }

    startJump() {
        // Initiate a jump if the player is on a platform
        this.isJumping = true;
        this.jumpTimer = this.jumpTime;
        this.physics.velocity.y = -this.jumpForce;
        //this.isOnPlatform = false;
    }
      
    updateJump(deltaTime) {
        // Updates the jump progress over time
        this.jumpTimer -= deltaTime;
        if (this.jumpTimer <= 0 || this.physics.velocity.y > 0) {
            this.isJumping = false;
        }
    }
}

export default JumpingEnemy;