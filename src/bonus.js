import * as PIXI from 'pixi.js';

class Bonus extends PIXI.Container {
    constructor(spriteSheet) {
        super();
        this.bonusValue = 0;
        this.createView(spriteSheet);
        this.x = 150;
        this.y = 150;
        this.alpha = 0
        window.bonus = this;
    }

    createView(spriteSheet) {
        this.chestAnimation = new PIXI.AnimatedSprite(spriteSheet.animations['bonusChest']);
        this.chestAnimation.scale.set(3);
        this.chestAnimation.loop = false;
        this.chestAnimation.animationSpeed = 0.5;
        this.addChild(this.chestAnimation);


        this.coinAnimation = new PIXI.AnimatedSprite(spriteSheet.animations['sparkleCoin']);
        this.coinAnimation.scale.set(3);
        this.coinAnimation.alpha = 0;
        this.coinAnimation.animationSpeed = 0.25;
        this.coinAnimation.y = -10;
        this.addChild(this.coinAnimation);

        this.label = new PIXI.Text(this.text, {fill: 'red'});
        this.label.anchor.set(0.5);
        this.label.x = this.width / 2 - 20;
        this.label.y = -10;
        this.label.alpha = 0;
        this.addChild(this.label);
    }

    show(win) {
        this.alpha = 1;
        this.bonusValue = win;
        this.label.text = `Bonus win: ${this.bonusValue}`;
        this.chestAnimation.play();

        return new Promise((resolve, reject) => {
            this.chestAnimation.onComplete = () => {
                this.revealPrize(resolve);
            }
        })
    }

    revealPrize(resolve) {
        this.coinAnimation.alpha = 1;
        this.coinAnimation.play();
        this.label.alpha = 1;

        setTimeout(() => {
            this.hide();
            resolve();
        }, 5000);
    }

    hide() {
        this.chestAnimation.gotoAndStop(0);
        this.coinAnimation.gotoAndStop(0);
        this.label.alpha = 0;
        this.coinAnimation.alpha = 0;
        this.alpha = 0;
    }
}

export {
    Bonus
}