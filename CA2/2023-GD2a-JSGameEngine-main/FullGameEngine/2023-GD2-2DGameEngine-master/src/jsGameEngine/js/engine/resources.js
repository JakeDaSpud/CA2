// Create an Images object to hold the Image instances for the player and the enemy.
const Images = {
  jelIdle: new Image(), // The Image instance for the player.
  jelRun: new Image(), // The Image instance for the player.
  jelFall: new Image(), // The Image instance for the player.
  jelFall2: new Image(), // The Image instance for the player.
  enemyRun: new Image(), // The Image instance for the enemy.
  trash: new Image(), // The Image instance for the trash.
};

// Create an AudioFiles object to hold the file paths of the audio resources.
const Sounds = {
  //I used to have these be defined as the file paths, which wouldn't play
  playerJumpSound:  new Audio(), // The file path of the jump sound.
  playerCollectSound: new Audio(), // The file path of the collect sound.
  playerDamageSound: new Audio(), // The file path of the damage sound.
};



//Setting Image sources

// Set the source of the player idle image.
Images.jelIdle.src = './resources/images/player/jel_Idle.png'; // Update the image path

// Set the source of the player run image.
Images.jelRun.src = './resources/images/player/jel_Run.png'; // Update the image path

// Set the source of the player falling image.
Images.jelFall.src = './resources/images/player/jel_Fall.png'; // Update the image path

// Set the source of the second player falling image.
Images.jelFall2.src = './resources/images/player/jel_Fall2.png'; // Update the image path

// Set the source of the enemy image.
Images.enemyRun.src = './resources/images/enemy/enemy_Run.png'; // Update the image path

// Set the source of the trash image.
//Images.trash.src = './resources/images/collectibles/trash.png'; // Update the image path



//Setting Audio Sound sources

//Set the source of the player jump sound.
Sounds.playerJumpSound.src = './resources/sounds/playerJumpSound.wav'; // Update the sound path
Sounds.playerJumpSound.volume = 0.6; // Sound is too loud!

//Set the source of the player collect sound.
Sounds.playerCollectSound.src = './resources/sounds/playerCollectSound.wav'; // Update the sound path
Sounds.playerCollectSound.volume = 0.1; // Sound is too loud!

//Set the source of the player damage sound.
Sounds.playerDamageSound.src = './resources/sounds/playerDamageSound.wav'; // Update the sound path
Sounds.playerDamageSound.volume = 0.4; // Sound is too loud!



const Animations = {
  // Arrays of images for the player animations.
  playerRunAnim: [Images.playerRun, Images.playerIdle],
  playerFallAnim: [Images.playerFall, Images.playerFall2],
}


// Export the Images and AudioFiles objects so they can be imported and used in other modules.
export { Images, Sounds, Animations };
