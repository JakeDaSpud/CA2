import Component from './component.js';
import { Animations } from './resources.js';
import { Images } from './resources.js';
import Player from '../game/player.js';
import Physics from './physics.js';
import Enemy from '../game/enemy.js';

class Animator extends Component{
    
    // Constructor initializes the game object and add necessary components
    constructor(entityRenderer){
        super(); // Call parent's constructor
        this.entityRenderer = entityRenderer;/*this.gameObjectParameter.getComponent(Renderer);*/ /*new Renderer('green', 50, 50, Images.jelIdle);*/ // Add renderer
        //this.entityRenderer.image = this.images.jelIdle; //Setting default image (idle)
        this.anims = Animations;
        this.images = Images;
    }

    //Copilot: Asked it if WaitForSeconds(0.2) is a real function, it gave me it but it wasn't in JS 🙄 so it made me this waiting function
    //An async function tries to run the code in a Promise() while letting other code go first, but the "await" means that it won't let other code go first until it is finished
    async WaitForSeconds(waitingTimeInSeconds){
        /*await*/ return new Promise(resolve => setTimeout(resolve, waitingTimeInSeconds / 1000))
    }

    jelIdleAnimation(playerLink){
        if(playerLink.isOnPlatform && Math.floor(playerLink.getComponent(Physics).velocity.x) == 0){
            this.entityRenderer.image = this.images.jelIdle;
            console.log('jel idle "animation".');
        }
    }

    jelRunningAnimation(){
        this.entityRenderer.image = this.images.jelRun;
        console.log("jel running animation.");
    }

    async jelFallingAnimation(playerLink){
        this.playerLink = playerLink;
        
        do {
            const timeBetweenFrames = 3;

            this.entityRenderer.image = this.anims.jelFallAnim.one;
            console.log("jel falling animation 1.");

            await this.WaitForSeconds(timeBetweenFrames);
            console.log(`waited ${timeBetweenFrames} seconds.`);
            
            this.entityRenderer.image = this.anims.jelFallAnim.two;
            console.log("jel falling animation 2.");

            await this.WaitForSeconds(timeBetweenFrames);
            console.log(`waited ${timeBetweenFrames} seconds.`);
        }

        while(!playerLink.isOnPlatform && Math.floor(playerLink.getComponent(Physics).velocity.y) > 6)
    }

    enemyRunningAnimation(){
        this.entityRenderer.image = this.images.enemyRun;
    }

}

export default Animator;