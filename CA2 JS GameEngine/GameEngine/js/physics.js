import Component from "./component";
import Renderer from "./renderer";

class Physics extends Component {
    constructor(velocity = {x:0, y:0}, acceleration = {x:0, y:0}, gravity = {x:0, y:300}) {
        super();
        this.velocity = velocity;
        this.acceleration = acceleration;
        this.gravity = gravity;
    }

    update(deltaTime) {
        this.velocity.x += this.acceleration.x * deltaTime;
        this.velocity.y += (this.acceleration.y + this.gravity.y) * deltaTime;
        this.gameObject.x += this.velocity.x * deltaTime; //might not need to be * deltaTime twice
        this.gameObject.y += this.velocity.y * deltaTime;
    }
    
    //AABB_isColliding rename after 
    isColliding(otherPhysics) {
        const [left, right, top, bottom] = this.getBoundingBox;
        const [otherLeft, otherRight, otherTop, otherBottom] = otherPhysics.getBoundingBox;

        //AABB Collision Detection
        return left < otherRight && right > otherLeft && top < otherBottom && bottom > otherTop;
    }

    //Add more collision types for project
    //https://www.raylib.com/cheatsheet/cheatsheet.html
    // ^ has collision methods

    //Rectangular Collision
    getBoundingBox() {
        const renderer = this.gameObject.getComponent(Renderer);
        const left = this.gameObject.x;
        const right = this.gameObject.x + renderer.width;
        const top = this.gameObject.y;
        const bottom = this.gameObject.y + renderer.height;

        return[left, right, top, bottom];
    }

    //Circular Collision
    //Find area, get perimeter, if they touch anywhere, collision true

    //Polygon Collision (custom??)
}

export default Physics;