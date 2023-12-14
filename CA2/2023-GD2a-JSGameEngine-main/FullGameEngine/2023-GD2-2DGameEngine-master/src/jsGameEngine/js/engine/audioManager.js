import Component from './component.js';
import { Sounds } from './resources.js';

class AudioManager extends Component{
    
    // Constructor initializes the game object and add necessary components
    constructor(){
        super();
        this.sounds = Sounds;
    }

    playJumpSound(){
        //Sounds.playerJumpSound.play(); still wont play the defined audio files: playerJumpSound.wav: 
        this.sounds.playerJumpSound.play();
        //code to play the wav file
    }

    playCollectSound(){
        this.sounds.playerCollectSound.play();
        //code to play the wav file
    }

    playDamageSound(){
        this.sounds.playerDamageSound.play();
        //code to play the wav file
    }

}

export default AudioManager;