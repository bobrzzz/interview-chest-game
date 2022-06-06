import * as PIXI from 'pixi.js';
import { Chest } from "./chest";
import { StartButton } from "./button";
import { Bonus } from './bonus';


class Scene extends PIXI.Container {
    constructor(totalChestAmount, spriteSheet, callbacks) {
        super();
        this.chests = [];

        this.createElements(totalChestAmount, spriteSheet, callbacks);
    }

    createElements(totalChestAmount, spriteSheet, callbacks) {
        const filter = this.createFilter();
        this.createChests(totalChestAmount, spriteSheet, filter, callbacks.chest);
        this.createStartButton(spriteSheet, callbacks.startButton);
        this.createTitle();
        this.createBonusView(spriteSheet);
    }
    
    createFilter() {
        const filter = new PIXI.filters.ColorMatrixFilter();
        filter.desaturate();
        return filter;
    }

    createChests(chestAmount, spriteSheet, filter, callback) {
        const background = new PIXI.Graphics();
        background.beginFill(0xffffff);
        background.drawRoundedRect(50, 55, 300, 215, 10);
        background.endFill();
        background.alpha = 0.5;
    
        this.addChild(background);
    
        for(let i = 0; i < chestAmount; i++) {
            const button = new Chest(spriteSheet, filter);
            button.x = 95 + (160 * (i % 2));
            button.y = 65 + (Math.floor(i / 2) * 70); 
            button.on('pointerdown', callback(i));
    
            this.chests.push(button);
            this.addChild(button);
        }
    }
    
    createStartButton(spriteSheet, callback) {
        this.startButton = new StartButton('Start', spriteSheet);
        this.startButton.x = 145;
        this.startButton.y = 285;
        
        this.startButton.changeState(true);
        this.startButton.on('pointerdown', callback);
    
        this.addChild(this.startButton);
    }
    
    createBonusView(spriteSheet) {
        this.bonusView = new Bonus(spriteSheet);
        this.addChild(this.bonusView);
    }

    createTitle() {
        const style = new PIXI.TextStyle({
            fill: 'yellow',//,
            stroke: '#000000',
            strokeThickness: 5,
        });
        this.title = new PIXI.Text('Interview Chest Game', style);
        this.title.anchor.set(0.5, 0);
        this.title.x = 400 / 2;
        this.title.y = 20;
        this.addChild(this.title);
    }

    getChests() {
        return this.chests;
    }

    getStartButton() {
        return this.startButton;
    }

    getBonusView() {
        return this.bonusView;
    }
}

export {
    Scene
}