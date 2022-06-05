import { Button } from "./button";

class Chest extends Button {
    constructor(name) {
        super(arguments);
        this.name = name;
    }

    reset() {
        this.changeText(this.name);
    }

    changeText(newText) {
        this.text.text = newText;
    }

}