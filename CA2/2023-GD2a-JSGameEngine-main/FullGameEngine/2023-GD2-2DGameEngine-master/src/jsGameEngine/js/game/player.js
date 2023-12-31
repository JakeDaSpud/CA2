// Importing necessary components and resources
import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';
import Input from '../engine/input.js';
import { Images, Sounds } from '../engine/resources.js';
import { Colours } from '../engine/resources.js';
import Enemy from './enemy.js';
import Platform from './platform.js';
import Collectible from './collectible.js';
import ParticleSystem from '../engine/particleSystem.js';
import AudioManager from '../engine/audioManager.js';
import Animator from '../engine/animator.js';

// Defining a class Player that extends GameObject
class Player extends GameObject {
  // Constructor initializes the game object and add necessary components
  constructor(x, y, level) {
    super(x, y); // Call parent's constructor
    this.renderer = new Renderer(Colours.Gley, 50, 50, Images.jelIdle); // Add renderer
    this.addComponent(this.renderer);

    this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 })); // Add physics

    this.addComponent(new Input()); // Add input for handling user input

    this.audioManager = new AudioManager(); // Add audio manager for handling / playing audio

    this.animator = new Animator(this.renderer); // Add animator for handling animations

    this.level = level; // Add level for handling level data

    // Initialize all the player specific properties
    this.direction = 1;
    this.lives = 3;
    this.score = 0;
    this.isOnPlatform = false;
    this.isJumping = false;
    this.jumpForce = 300;
    this.jumpTime = 5;
    this.jumpTimer = 0;
    this.isInvulnerable = false;
    this.isGamepadMovement = false;
    this.isGamepadJump = false;
    this.debugMode = false;
    this.muteMusic = false;
  }

  // The update function runs every frame and contains game logic
  update(deltaTime) {
    const physics = this.getComponent(Physics); // Get physics component
    const input = this.getComponent(Input); // Get input component

    this.handleGamepadInput(input);

    // Falling animation if vertical velocity is over 5 (going downwards)
    if (!this.isOnPlatform && Math.floor(physics.velocity.y) > 5)
    {
      this.animator.jelFallingAnimation(this);
    }

    if (this.isOnPlatform) {
      this.animator.jelIdleAnimation(this);
    }
    
    //Handle debug flip input
    if (!this.isGamepadMovement && input.isKeyUp('KeyB')) {
      this.toggleDebug();
    } 

    //Handle music flip input
    if (!this.isGamepadMovement && input.isKeyUp('KeyM')) {
      this.toggleMusic();
    } 

    // Handle player movement)
    if (!this.isGamepadMovement && (input.isKeyDown('ArrowRight') || input.isKeyDown('KeyD'))) {
      this.moveRight();
      this.direction = -1;
    } 
    
    else if (!this.isGamepadMovement && (input.isKeyDown('ArrowLeft') || input.isKeyDown('KeyA'))) {
      this.moveLeft();
      this.direction = 1;
    } 
    
    else if (!this.isGamepadMovement) {
      physics.velocity.x = 0;
    }

    // Handle player jumping
    if (!this.isGamepadJump && (input.isKeyDown('ArrowUp') || input.isKeyDown('KeyW') || input.isKeyDown('Space')) && this.isOnPlatform) {
      
      this.startJump();
      console.log('Jump action performed.');

      this.audioManager.playJumpSound(); // Play jump sound
      console.log('Jump sound played.');
    }

    if (this.isJumping) {
      this.updateJump(deltaTime);
    }

    // Handle collisions with collectibles
    const collectibles = this.game.gameObjects.filter((obj) => obj instanceof Collectible);
    for (const collectible of collectibles) {
      if (physics.isColliding(collectible.getComponent(Physics))) {
        this.collect(collectible);
        this.game.removeGameObject(collectible);
      }
    }
  
    // Handle collisions with enemies
    const enemies = this.game.gameObjects.filter((obj) => obj instanceof Enemy);
    for (const enemy of enemies) {
      if (physics.isColliding(enemy.getComponent(Physics))) {
        this.collidedWithEnemy();
      }
    }
  
    // Handle collisions with platforms
    this.isOnPlatform = false;  // Reset this before checking collisions with platforms
    const platforms = this.game.gameObjects.filter((obj) => obj instanceof Platform);
    for (const platform of platforms) {
      if (physics.isColliding(platform.getComponent(Physics))) {
        if (!this.isJumping) {
          //DO NOT CHANGE THE SIGN OR SIX, THIS MAKES SENSE
          //Checking if y velocity is standing (for some reason it's 5 instead of 0 normally)
          if (physics.velocity.y < 6)
          {
            this.animator.jelIdleAnimation;
          }
          physics.velocity.y = 0;
          physics.acceleration.y = 0;
          this.y = platform.y - this.renderer.height;
          this.isOnPlatform = true;
        }
      }
    }
  
    // Check if player has fallen off the bottom of the screen
    if (this.y > this.game.canvas.height) {
      //this.resetPlayerState(); I have decided that if you fall off the screen, you restart the whole level, not get teleported back up
      location.reload();
    }

    // Check if player has no lives left
    if (this.lives <= 0) {
      location.reload();
    }

    // Check if player has collected all collectibles
    if (this.level.currentLevel == 1) {
      if (this.score >= 10) {
        console.log('Beat Level 1!');
        this.level.currentLevel = 2;
        console.log(`Level is now: ${this.level.currentLevel}`);
        location.href = "winScreen.html";
      }
    }

    super.update(deltaTime);
  }

  handleGamepadInput(input){
    const gamepad = input.getGamepad(); // Get the gamepad input
    const physics = this.getComponent(Physics); // Get physics component
    if (gamepad) {
      // Reset the gamepad flags
      this.isGamepadMovement = false;
      this.isGamepadJump = false;

      // Handle movement
      const horizontalAxis = gamepad.axes[0];

      // Move right
      if (horizontalAxis > 0.1) {
        this.isGamepadMovement = true;
        this.moveRight();
        this.direction = -1;
      } 

      // Move left
      else if (horizontalAxis < -0.1) {
        this.isGamepadMovement = true;
        this.moveLeft();
        this.direction = 1;
      } 

      // Stop
      else {
        physics.velocity.x = 0;
      }
      
      // Handle jump, using gamepad button 0 (typically the 'A' button on most gamepads)
      if (input.isGamepadButtonDown(0) && this.isOnPlatform) {
        this.isGamepadJump = true;
        this.startJump();
      }

      if (input.isGamepadButtonDown(5)) {
        this.toggleDebug();
      }

      if (input.isGamepadButtonDown(4)) {
        this.toggleMusic();
      }
    }
  }

  startJump() {
    // Initiate a jump if the player is on a platform
    if (this.isOnPlatform) { 
      this.isJumping = true;
      this.jumpTimer = this.jumpTime;
      this.getComponent(Physics).velocity.y = -this.jumpForce;
      this.isOnPlatform = false;
    }
  }
  
  updateJump(deltaTime) {
    // Updates the jump progress over time
    this.jumpTimer -= deltaTime;
    if (this.jumpTimer <= 0 || this.getComponent(Physics).velocity.y > 0) {
      this.isJumping = false;
    }
  }

  collidedWithEnemy() {
    // Checks collision with an enemy and reduce player's life if not invulnerable
    if (!this.isInvulnerable) {
      this.lives--;
      this.isInvulnerable = true;

      this.audioManager.playDamageSound(); // Play damage sound

      // Make player vulnerable again after 2 seconds
      setTimeout(() => {
        this.isInvulnerable = false;
      }, 2000);
    }
  }

  collect(collectible) {
    // Handle collectible pickup
    this.score += collectible.value;
    console.log(`Score: ${this.score}`);

    this.audioManager.playCollectSound(); // Play collect sound

    this.emitCollectParticles(collectible);
  }

  emitCollectParticles() {
    // Create a particle system at the player's position when a collectible is collected
    const particleSystem = new ParticleSystem(this.x, this.y, Colours.Cyan, 20, 1, 0.5);
    this.game.addGameObject(particleSystem);
  }

  resetPlayerState() {
    // Reset the player's state, repositioning it and nullifying movement
    this.x = this.game.canvas.width / 2;
    this.y = this.game.canvas.height / 2;
    this.getComponent(Physics).velocity = { x: 0, y: 0 };
    this.getComponent(Physics).acceleration = { x: 0, y: 0 };
    this.direction = 1;
    this.isOnPlatform = false;
    this.isJumping = false;
    this.jumpTimer = 0;
  }

  resetGame() {
    // Reset the game state, which includes the player's state
    this.lives = 3;
    this.score = 0;
    this.resetPlayerState();
    Sounds.mainTheme.reload();
  }

  // Functions to move, the gamepad and keyboard input was doing different amounts of movement before I made these functions
  moveLeft() {
    // Move the player left
    if (Math.floor(this.getComponent(Physics).velocity.y) > 5) {
      this.animator.jelFallingAnimation(this);
    }

    else {
      this.animator.jelRunningAnimation();
    }

    this.getComponent(Physics).velocity.x = -700;
    this.direction = 1;
  }

  moveRight() {
    // Move the player right
    if (Math.floor(this.getComponent(Physics).velocity.y) > 5) {
      this.animator.jelFallingAnimation(this);
    }

    else {
      this.animator.jelRunningAnimation();
    }

    this.getComponent(Physics).velocity.x = 700;
    this.direction = -1;
  }

  // Flips debugMode boolean read by playerUI to show and hide the debug menu, when B on the keyboard, or right bumper on the gamepad is pressed
  toggleDebug() {
    this.debugMode = !this.debugMode;
    console.log("Debug mode is now "+this.debugMode);
  }

  // Flips muteMusic boolean read by playerUI to mute and unmute the music, when M on the keyboard, or left bumper on the gamepad is pressed
  toggleMusic() {
    Sounds.mainTheme.muted = !Sounds.mainTheme.muted;
    console.log("Mute music is now " + Sounds.mainTheme.muted);
  }
}

export default Player;
