// Import necessary classes and resources
import Game from '../engine/game.js';
import Player from './player.js';
import Enemy from './enemy.js';
import JumpingEnemy from './jumpingEnemy.js';
import PlayerUI from './playerUI.js';
import Platform from './platform.js';
import Collectible from './collectible.js';
import { Images } from '../engine/resources.js';
import { Colours } from '../engine/resources.js';

// Define a class Level that extends the Game class from the engine
class Level extends Game {
  
  // Define the constructor for this class, which takes one argument for the canvas ID
  constructor(canvasId) {
    // Call the constructor of the superclass (Game) with the canvas ID
    super(canvasId);

    //is this an ienumerable? I'm not sure what this is called but it's a list of all the levels in the game and their names and IDs and stuff like that 
    this.levelIDs = [1, 2, 3, 4, 5];

    this.levelID = 1;
    this.levelData = "[1-1] premeditated platforming";
    
    // Create a player object and add it to the game
    const player = new Player(this.canvas.width / 2 - 25, this.canvas.height / 2 - 25);
    this.addGameObject(player);
    
    // Add the player UI object to the game
    this.addGameObject(new PlayerUI(10, 10));

    // Set the game's camera target to the player
    this.camera.target = player;

    if (this.levelID == 1) {
      // Define the platform's width and the gap between platforms
      const platformWidth = 200;
      const gap = 100;

      // Create platforms and add them to the game
      const platforms = [
        new Platform(0, this.canvas.height - 20, platformWidth, 20),
        new Platform(platformWidth + gap, this.canvas.height - 20, platformWidth, 20),
        new Platform(2 * (platformWidth + gap), this.canvas.height - 20, platformWidth, 20, Colours.Lighter_Red),
        new Platform(3 * (platformWidth + gap), this.canvas.height - 20, platformWidth, 20),
        new Platform(4 * (platformWidth + gap), this.canvas.height - 20, platformWidth, 20),
      ];

      for (const platform of platforms) {
        this.addGameObject(platform);
      };
  
      // Create enemies and add them to the game
      this.addGameObject(new Enemy(50, 50, 50));
      this.addGameObject(new Enemy(100, 50, 50));
      this.addGameObject(new Enemy(150, 50, 500));
      this.addGameObject(new JumpingEnemy(50, 50, 100));
  
      // Create collectibles and add them to the game
      this.addGameObject(new Collectible(250, this.canvas.height - 100, 60, 60, Colours.White, Images.trash));
      this.addGameObject(new Collectible(450, this.canvas.height - 100, 60, 60, Colours.White, Images.trash));
      this.addGameObject(new Collectible(650, this.canvas.height - 100, 60, 60, Colours.White, Images.trash));
    }

    else if (this.levelID == 2) {
      // Define the platform's width and the gap between platforms
      const platformWidth = 200;
      const gap = 100;

      // Create platforms and add them to the game
      const platforms = [
        new Platform(2 * (platformWidth + gap), this.canvas.height - 20, platformWidth, 20, Colours.Lighter_Red),
      ];

      for (const platform of platforms) {
        this.addGameObject(platform);
      };
  
      // Create enemies and add them to the game
      this.addGameObject(new Enemy(50, 50, 50));
      this.addGameObject(new JumpingEnemy(50, 50, 100));
  
      // Create collectibles and add them to the game
      this.addGameObject(new Collectible(250, this.canvas.height - 100, 60, 60, Colours.White, Images.trash));
    }
  }
  
}

// Export the Level class as the default export of this module
export default Level;
