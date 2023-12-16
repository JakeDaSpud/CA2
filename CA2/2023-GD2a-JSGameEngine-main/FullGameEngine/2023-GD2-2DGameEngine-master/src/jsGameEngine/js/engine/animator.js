import Component from './component.js';
import Renderer from './renderer.js';
import { Animations } from './resources.js';
import { Images } from './resources.js';

class Animator extends Component{
    
    // Constructor initializes the game object and add necessary components
    constructor(gameObject){
        super();
        this.gameObject = gameObject;
        this.renderer = this.gameObject.getComponent(Renderer); /*new Renderer('green', 50, 50, Images.jelIdle);*/ // Add renderer
        this.anims = Animations;
        this.images = Images;
    }

    jelRunningAnimation(){
        this.renderer.image = this.images.jelRun;
        console.log("jel running animation.");
    }

    jelFallingAnimation(){
        while(true){
            this.renderer.image = this.anims.jelFallAnim[0];
            console.log("jel falling animation 1.");

            WaitForSeconds(0.2);
            console.log("waited 0.2 seconds.");
            
            this.renderer.image = this.anims.jelFallAnim[1];
            console.log("jel falling animation 1.");

            WaitForSeconds(0.2);
            console.log("waited 0.2 seconds.");
        }
    }

    enemyRunningAnimation(){
        this.renderer.image = this.images.enemyRun;
    }

}

export default Animator;