import * as PIXI from 'pixi.js';

class Button extends PIXI.Container {
    constructor(buttonText, clickCallback) {
        super();
        const background = new PIXI.Graphics();
        background.beginFill(0xffffff);
        background.drawRect(0, 0, 100, 50);
        background.endFill();

        const text = new PIXI.Text(buttonText, {fill: 'red'});
        text.anchor.set(0.5);
        text.x = 100 / 2;
        text.y = 50 / 2;
        this.addChild(background);
        this.addChild(text);

        this.alpha = 0.5;

        this.on('pointerdown', this.pointerdownHandler);
    }

    changeState(isActive) {
        this.interactive = isActive;
        this.buttonMode = isActive;
        this.alpha = isActive? 1 : 0.5;
    }

    pointerdownHandler() {
        this.changeState(false);
    }

}

export {
    Button
}