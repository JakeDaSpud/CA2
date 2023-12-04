import Component from "./component.js";

//Might be able to extend MouseInput
class Input extends Component {
    constructor() {
        super();
        this.keys = {};
        this.gamepadIndex = null;

        document.addEventListener("keydown", (event) => (this.keys[event.code] = true));
        document.addEventListener("keyup", (event) => (this.keys[event.code] = true));

        window.addEventListener("gamepadconnected", (event) => {
            console.log("Gamepad Connected", event.gamepad);
            this.gamepadIndex = event.gamepad.index;
        });

        window.addEventListener("gamepaddisconnected", (event) => {
            console.log("Gamepad Disconnected", event.gamepad);
            this.gamepadIndex = null;
        });
    }

    isKeyDown(key) {
        return this.keys[key] || false;
    }

    getGamepad() {
        if (this.gamepadIndex !== null) {
            const gamepads = navigator.getGamepads();            
            return gamepads[this.gamepadIndex];
        }
        return null;
    }

    isGamepadButtonDown(buttonIndex) {
        const gamepad = this.getGamepad();
        if (gamepad && gamepad.buttons[buttonIndex]) {
            return gamepad.buttons[buttonIndex].pressed;
        }
        return false;
    }
}

export default Input;