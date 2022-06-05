import * as PIXI from 'pixi.js';
import { Button } from "./button";
import { Chest } from "./chest";
import { Bonus } from './bonus';
 
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
const app = new PIXI.Application({
    width: 400,
    height: 300
});
document.body.appendChild(app.view);

app.loader
    .add('interview.json')
    .load(init);


const totalChestAmount = 6;
let opennedChestAmount = 0;
let chests = [];
let startButton;
let bonusView;

let spriteSheet;

function init() {
    spriteSheet = app.loader.resources['interview.json'].spritesheet;
    console.log(spriteSheet);
    createElements();
}

function createElements() {
    createChests(totalChestAmount, spriteSheet);
    createStartButton();
    createBonusView();
}

function createChests(chestAmount, spriteSheet) {
    for(let i = 0; i < chestAmount; i++) {
        const button = new Chest('Chest ' + (i + 1), spriteSheet);
        button.x = 50 + (200 * (i % 2));
        button.y = 30 + (Math.floor(i / 2) * 70); 
        button.on('pointerdown', openChest(button));

        chests.push(button);
        app.stage.addChild(button);
    }
}

function createStartButton() {
    startButton = new Button('Start');
    startButton.x = 150;
    startButton.y = 230;
    
    startButton.changeState(true);
    startButton.on('pointerdown', startGame);


    app.stage.addChild(startButton);
}

function createBonusView() {
    bonusView = new Bonus(spriteSheet);
    app.stage.addChild(bonusView);
}

function startGame() {
    for (const chest of chests) {
        chest.changeState(true);
    }
}

function openChest(chest) {
    return function() {

        opennedChestAmount++;
        const winValue = processWin();
        chest.showWin(winValue)
            .then(() => {
                if(isBonusWin()) { 
                    return bonusView.show(500);
                }
            })
            .then(() => {
                if(opennedChestAmount === totalChestAmount) {
                    restart();
                }
            })
    }
}

function restart() {
    opennedChestAmount = 0;
    for (const chest of chests) {
        chest.changeState(false);
        chest.reset();
    }

    startButton.changeState(true);
}

function processWin() {
    if(!isWin()) {
        return 0;
    }
    let winValue = getRandomInteger(100);

    // if(isBonusWin()) {
    //     console.log('Bonus win')
    //     winValue *= 4;
    // }

    console.log(winValue);
    return winValue;

}

function isWin() {
    return getRandomInteger(2) === 2;
}

function isBonusWin() {
    return true;
    return getRandomInteger(totalChestAmount) === totalChestAmount;
}

function getRandomInteger(max) {
    return Math.floor(Math.random() * max) + 1;
}

