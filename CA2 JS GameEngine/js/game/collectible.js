import GameObject from "../GameEngine/js/gameobject.js";
import Renderer from "../GameEngine/js/renderer.js";
import Physics from "../GameEngine/js/physics.js";

class Collectible extends GameObject {
    //Polymorphism, changing color in gameobject to be gold
    constructor(x, y, width, height, color = "gold") {
        super(x, y);
        this.addComponent(new Renderer(color, width, height));
        this.addComponent(new Physics({x: 0, y: 0}, {x: 0, y: 0}));

        this.tag = "collectible";
        this.value = 1;
    }
}

export default Collectible;