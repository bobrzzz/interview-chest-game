import { Button } from "./button";
import * as PIXI from 'pixi.js';


class Chest extends Button {
    constructor(name, spriteSheet) {
        super(...arguments);
    }

    createView() {
        this.animation = new PIXI.AnimatedSprite(this.spriteSheet.animations["ChestOption1"]);
        this.animation.scale.set(3);
        this.animation.loop = false;
        this.addChild(this.animation);
        this.createText();
    }

    pointerdownHandler() {
        super.pointerdownHandler();
        this.animation.gotoAndPlay(0);
    }

    reset() {
        this.changeText(this.text);
        this.animation.gotoAndStop(0);
    }

    changeText(newText) {
        this.label.text = newText;
    }

    showWin(newWinValue) {
        this.changeText(newWinValue); 
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 500);
        });
    }

}

export {
    Chest
}