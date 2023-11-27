import GameObject from "../GameEngine/js/gameobject";
import Renderer from "../GameEngine/js/renderer";
import Physics from "../GameEngine/js/physics";

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