import GameObject from "../GameEngine/js/gameobject";
import Renderer from "../GameEngine/js/renderer";
import Physics from "../GameEngine/js/physics";

class Platform extends GameObject {
    constructor(x, y, width, height, color = "gray") {
        super(x, y);
        this.addComponent(new Renderer(color, width, height));
        this.addComponent(new Physics({x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}));

        this.tag = "platform";
    }
}

export default Platform;