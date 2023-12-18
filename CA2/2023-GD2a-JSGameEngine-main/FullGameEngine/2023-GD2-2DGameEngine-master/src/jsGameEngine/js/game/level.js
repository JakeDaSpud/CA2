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

    //levels meta data
    this.levelsData = {
      Level1: {id:1, worldID:"[1-1]", levelName:"preschool platforming"},
      //Level2: {id:2, worldID:"[1-2]", levelName:"donkey's revenge"}
    };
    
    // Create a player object and add it to the game
    const player = new Player(0, -100, this);
    this.addGameObject(player);
    
    // Add the player UI object to the game
    this.addGameObject(new PlayerUI(10, 10, this));

    // Set the game's camera target to the player
    this.camera.target = player;

    this.currentLevel = this.levelsData.Level1.id;

    if (this.currentLevel == 1) {
      // Define the platform's width and the gap between platforms
      const platformWidth = 100;
      const gap = 80;
      const vertGap = platformWidth / 0.75;

      // Create platforms and add them to the game
      const platforms = [
        new Platform(0, 0, platformWidth, 20, Colours.Blue),

        //Trash Platform Top Left: 1st from Left
        new Platform(-1 * (platformWidth + gap), -3 * vertGap, platformWidth, 20, Colours.Gley),

        new Platform(0, -2 * vertGap, platformWidth, 20, Colours.Cyan),
        new Platform(platformWidth + gap, -2 * vertGap, platformWidth, 20, Colours.Orange),

        //Trash Platform Immediate Right: 2nd from Left
        new Platform(2 * (platformWidth + gap), 0, platformWidth, 20, Colours.Gley),
        new Platform(3 * (platformWidth + gap), -2 * vertGap, platformWidth, 20, Colours.Cyan),

        //Trash Platform 3th from Left
        new Platform(4 * (platformWidth + gap), -1 * vertGap, platformWidth, 20, Colours.Gley),
        new Platform(5 * (platformWidth + gap), -1 * vertGap, platformWidth, 20, Colours.Cyan),

        //Trash Platform 4th from Left Bottom
        new Platform(5 * (platformWidth + gap), vertGap, platformWidth, 20, Colours.Gley),

        //Trash Platform 4th from Left Top
        new Platform(5 * (platformWidth + gap), -3 * vertGap, platformWidth, 20, Colours.Gley),

        //Trash Platform 5th from Left
        new Platform(7 * (platformWidth + gap), vertGap, platformWidth, 20, Colours.Gley),

        new Platform(9 * (platformWidth + gap), vertGap, platformWidth, 20, Colours.Orange),
        //Trash Platform 8th from Left
        new Platform(9 * (platformWidth + gap), -1 * vertGap, platformWidth, 20, Colours.Gley),

        //Trash Platform 7th from Left
        new Platform(8 * (platformWidth + gap), -4 * vertGap, platformWidth, 20, Colours.Gley),
        new Platform(9 * (platformWidth + gap), -3 * vertGap, platformWidth, 20, Colours.Lighter_Red),
        new Platform(10 * (platformWidth + gap), -2 * vertGap, platformWidth, 20, Colours.Cyan),
        //Trash Platform 9th from Left
        new Platform(11 * (platformWidth + gap), -3 * vertGap, platformWidth, 20, Colours.Gley),

        new Platform(11 * (platformWidth + gap), 0, platformWidth, 20, Colours.Lighter_Red),
        new Platform(12 * (platformWidth + gap), 0, platformWidth, 20, Colours.Cyan),
        //Trash Platform 10th from Left
        new Platform(13 * (platformWidth + gap), 0, platformWidth, 20, Colours.Gley),
      ];

      for (const platform of platforms) {
        this.addGameObject(platform);
      };
  
      // Create enemies and add them to the game
      this.addGameObject(new JumpingEnemy(platformWidth + gap, -2 * vertGap, 0, 300));
      this.addGameObject(new JumpingEnemy(9 * (platformWidth + gap) + 15, vertGap, 0, 200));
      
      this.addGameObject(new Enemy(11 * (platformWidth + gap), 0, 50));
      this.addGameObject(new Enemy(9 * (platformWidth + gap), -3 * vertGap, 50));
      
  
      //platformWidth * 0.8 + gap, -1 whatever the * vertGap is
      // Create collectibles and add them to the game
      this.addGameObject(new Collectible(-1 * ((platformWidth * 0.8) + gap), -4 * vertGap, 60, 60, Colours.White, Images.trash));
      this.addGameObject(new Collectible(2 * (platformWidth + gap) + 20, -1 * vertGap, 60, 60, Colours.White, Images.trash));
      this.addGameObject(new Collectible(4 * ((platformWidth) + gap) + 15, -2 * vertGap, 60, 60, Colours.White, Images.trash));
      this.addGameObject(new Collectible(5 * (platformWidth + gap) + 15, .1 *- vertGap, 60, 60, Colours.White, Images.trash));
      this.addGameObject(new Collectible(5 * (platformWidth + gap) + 15, -4 * vertGap, 60, 60, Colours.White, Images.trash));
      
      this.addGameObject(new Collectible(7 * (platformWidth + gap) + 17, .1 * vertGap, 60, 60, Colours.White, Images.trash));
      this.addGameObject(new Collectible(8 * (platformWidth + gap) + 17, -5 * vertGap, 60, 60, Colours.White, Images.trash));
      this.addGameObject(new Collectible(9 * (platformWidth + gap) + 15, -2 * vertGap, 60, 60, Colours.White, Images.trash));
      this.addGameObject(new Collectible(11 * (platformWidth + gap) + 15, -4 * vertGap, 60, 60, Colours.White, Images.trash));
      this.addGameObject(new Collectible(13 * (platformWidth + gap) + 15, -vertGap, 60, 60, Colours.White, Images.trash));
    }

    // else if (this.currentLevel == 2) {
    //   // Define the platform's width and the gap between platforms
    //   const platformWidth = 200;
    //   const gap = 100;

    //   // Create platforms and add them to the game
    //   const platforms = [
    //     new Platform(2 * (platformWidth + gap), this.canvas.height - 20, platformWidth, 20, Colours.Lighter_Red),
    //   ];

    //   for (const platform of platforms) {
    //     this.addGameObject(platform);
    //   };
  
    //   // Create enemies and add them to the game
    //   this.addGameObject(new Enemy(50, 50, 50));
    //   this.addGameObject(new JumpingEnemy(50, 50, 100));
  
    //   // Create collectibles and add them to the game
    //   this.addGameObject(new Collectible(250, this.canvas.height - 100, 60, 60, Colours.White, Images.trash));
    // }

    else if (this.currentLevel == 2) {
      location.href = "winScreen.html";
    }
  }
  
}

// Export the Level class as the default export of this module
export default Level;
