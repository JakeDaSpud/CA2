import Component from './component.js';
import Renderer from './renderer.js';
import { Animations } from './resources.js';
import { Images } from './resources.js';

class Animator extends Component{
    
    // Constructor initializes the game object and add necessary components
    constructor(entityRenderer){
        super(); // Call parent's constructor
        this.entityRenderer = entityRenderer;/*this.gameObjectParameter.getComponent(Renderer);*/ /*new Renderer('green', 50, 50, Images.jelIdle);*/ // Add renderer
        //this.entityRenderer.image = this.images.jelIdle; //Setting default image (idle)
        this.anims = Animations;
        this.images = Images;
    }

    jelIdleAnimation(){
        this.entityRenderer.image = this.images.jelIdle;
        console.log('jel idle "animation".');
    }

    jelRunningAnimation(){
        this.entityRenderer.image = this.images.jelRun;
        console.log("jel running animation.");
    }

    jelFallingAnimation(){
        while(true){
            this.entityRenderer.image = this.anims.jelFallAnim[0];
            console.log("jel falling animation 1.");

            WaitForSeconds(0.2);
            console.log("waited 0.2 seconds.");
            
            this.entityRenderer.image = this.anims.jelFallAnim[1];
            console.log("jel falling animation 1.");

            WaitForSeconds(0.2);
            console.log("waited 0.2 seconds.");
        }
    }

    enemyRunningAnimation(){
        this.entityRenderer.image = this.images.enemyRun;
    }

    //Copilot: Asked it if WaitForSeconds(0.2) is a real function, it gave me it but it wasn't in JS 🙄 so it made me this waiting function
    //An async function tries to run the code in a Promise() while letting other code go first, but the "await" means that it won't let other code go first until it is finished
    async WaitForSeconds(waitingTimeInSeconds){
        await new Promise(resolve => setTimeout(resolve, waitingTimeInSeconds / 1000))
    }

}

export default Animator;