import GameObject from '../engine/gameobject.js';
import UI from '../engine/ui.js';
import Player from './player.js';
import Physics from '../engine/physics.js';
import Renderer from '../engine/renderer.js';

// The PlayerUI class extends GameObject.
class PlayerUI extends GameObject {
  constructor(x, y) {
    super(x, y); // Call the constructor of the GameObject class.

    // Create a new UI component with initial text and add it to this object's components.
    this.uiComponent = new UI('Lives: 3 Score: 0', x, y);
    this.debugHintUI = new UI('[B / Right Bumper]', x, y + 20, '20px Consolas', 'rgba(255, 255, 255, 0.5)', 'left', 'top');

    //Copilot gave me this handy line of code to position the debug UI component
    this.debugUIComponent = new UI('', x, y + 20);
    this.debugUIComponent2 = new UI('', x, y + 40);
    this.debugUIComponent3 = new UI('', x, y + 60);
    this.debugUIComponent4 = new UI('', x, y + 80);
    this.debugUIComponent5 = new UI('', x, y + 100);

    this.addComponent(this.uiComponent);

    this.addComponent(this.debugUIComponent);
    this.addComponent(this.debugUIComponent2);
    this.addComponent(this.debugUIComponent3);
    this.addComponent(this.debugUIComponent4);
    this.addComponent(this.debugUIComponent5);
    
    this.addComponent(this.debugHintUI);
    this.debugMode = false;
  }

  // The update method is called every frame.
  update(deltaTime) {
    // Find the player object in the game's gameObjects array.
    const player = this.game.gameObjects.find((obj) => obj instanceof Player);
    const playerPhysics = player.getComponent(Physics);
    const playerRenderer = player.getComponent(Renderer);

    //
    if (player.debugMode) {
      this.uiComponent.setText(`Lives: ${player.lives} Score: ${player.score} Level: ${this.game.levelID}`);
      this.debugHintUI.setText('');
      this.debugUIComponent.setText(`[DEBUG] Velocity: X: ${playerPhysics.velocity.x} Y: ${Math.round(playerPhysics.velocity.y)}`);
      this.debugUIComponent2.setText(`[DEBUG] Acceleration: X: ${playerPhysics.acceleration.x} Y: ${playerPhysics.acceleration.y}`);
      this.debugUIComponent3.setText(`[DEBUG] Gravity: X: ${playerPhysics.gravity.x} Y: ${playerPhysics.gravity.y}`);
      this.debugUIComponent4.setText(`[DEBUG] isOnPlatform: ${player.isOnPlatform}`);
      this.debugUIComponent4.setText(`[DEBUG] Animation: ${playerRenderer.image.src.substring(playerRenderer.image.src.lastIndexOf('/') + 1)}`); //Copilot gave me the elements needed to format the png name out of this src path
    }

    else {
      // Update the text of the UI component to reflect the player's current lives and score.
      this.uiComponent.setText(`Lives: ${player.lives} Score: ${player.score} Level: ${this.game.levelID}`);
      this.debugHintUI.setText(`[B / Right Bumper]`);
      this.debugUIComponent.setText(``);
      this.debugUIComponent2.setText(``);
      this.debugUIComponent3.setText(``);
      this.debugUIComponent4.setText(``);
    }
  }
}

export default PlayerUI; // Export the PlayerUI class for use in other modules.
