import * as PIXI from 'pixi.js';

class Button extends PIXI.Container {
    constructor(buttonText, spriteSheet, clickCallback) {
        super();
        this.alpha = 0.5;
        this.text = buttonText;
        this.spriteSheet = spriteSheet;

        this.createView();        
        this.on('pointerdown', this.pointerdownHandler);
    }

    createView() {
        const background = new PIXI.Graphics();
        background.beginFill(0xffffff);
        background.drawRect(0, 0, 100, 50);
        background.endFill();

        
        this.addChild(background);
        this.createText();
    }
    
    createText() {
        this.label = new PIXI.Text(this.text, {fill: 'red'});
        this.label.anchor.set(0.5);
        this.label.x = this.width / 2;
        this.label.y = this.height / 2;
        this.addChild(this.label);
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