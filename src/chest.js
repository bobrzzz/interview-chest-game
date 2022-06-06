import { Button } from "./button";
import * as PIXI from 'pixi.js';


class Chest extends Button {
    constructor(spriteSheet, filter) {
        super(...arguments);
        this.filter = filter;
        this.createView(spriteSheet);
    }

    createView(spriteSheet) {
        this.animation = new PIXI.AnimatedSprite(spriteSheet.animations["ChestOption1"]);
        this.animation.scale.set(3);
        this.animation.loop = false;
        this.animation.animationSpeed = 0.5;
        this.addChild(this.animation);
        this.changeAppearence(false);
        this.createText();
    }

    createText() {
        const style = new PIXI.TextStyle({
            fill: ['#ffffff', 'gold'],
            stroke: '#000000',
            strokeThickness: 5,
        });
        this.label = new PIXI.Text('', style);
        this.label.anchor.set(0.5);
        this.label.x = this.width / 2;
        this.label.y = this.height / 2;
        this.addChild(this.label);
    }

    pointerdownHandler() {
        super.pointerdownHandler();
        this.animation.gotoAndPlay(0);
    }

    reset() {
        this.changeText('');
        this.animation.gotoAndStop(0);
    }

    changeText(newText) {
        this.label.text = newText;
    }

    changeAppearence(isActive) {
        this.animation.filters = isActive ? [] : [this.filter]; 
    }

    showWin(newWinValue) {
        this.changeText(newWinValue); 
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    }

}

export {
    Chest
}