// Create an Images object to hold the Image instances for the player and the enemy.
const Images = {
  playerIdle: new Image(), // The Image instance for the player.
  playerRun: new Image(), // The Image instance for the player.
  playerFall: new Image(), // The Image instance for the player.
  enemy: new Image(), // The Image instance for the enemy.
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
Images.playerIdle.src = './resources/images/player/jel_Idle.png'; // Update the image path

// Set the source of the player run image.
Images.playerRun.src = './resources/images/player/jel_Run.png'; // Update the image path

// Set the source of the player falling image.
Images.playerFall.src = './resources/images/player/jel_Fall.png'; // Update the image path

// Set the source of the enemy image.
Images.enemy.src = './resources/images/enemy/enemy_Run.png'; // Update the image path



//Setting Audio Sound sources

//Set the source of the player jump sound.
Sounds.playerJumpSound.src = './resources/sounds/playerJumpSound.wav'; // Update the sound path

//Set the source of the player collect sound.
Sounds.playerCollectSound.src = './resources/sounds/playerCollectSound.wav'; // Update the sound path

//Set the source of the player damage sound.
Sounds.playerDamageSound.src = './resources/sounds/playerDamageSound.wav'; // Update the sound path


// Export the Images and AudioFiles objects so they can be imported and used in other modules.
export { Images, Sounds };
