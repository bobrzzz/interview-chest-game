import * as PIXI from 'pixi.js';

class Button extends PIXI.Container {
    constructor() {
        super();       
        this.on('pointerdown', this.pointerdownHandler);
    }

    createView() {
    }
    
    createText() {
    }

    changeState(isActive) {
        this.interactive = isActive;
        this.buttonMode = isActive;
        this.changeAppearence(isActive);
    }
    
    changeAppearence(isActive) {
        this.alpha = isActive? 1 : 0.5;
    }

    pointerdownHandler() {
        this.changeState(false);
    }
}

class StartButton extends Button {
    constructor(buttonText, spriteSheet) {
        super();
        
        this.text = buttonText;
        this.spriteSheet = spriteSheet;

        this.createView();        
    }

    createView() {
        this.alpha = 0.5;
        const background = new PIXI.Sprite(this.spriteSheet.textures['button.png']);
        background.scale.set(3.4);
        
        this.addChild(background);
        this.createText();
    }
    
    createText() {
        this.label = new PIXI.Text(this.text, {fill: 'white'});
        this.label.anchor.set(0.5);
        this.label.x = this.width / 2;
        this.label.y = this.height / 2;
        this.addChild(this.label);
    }
}



export {
    Button,
    StartButton
}