import * as PIXI from 'pixi.js';
import { StartButton } from "./button";
import { Chest } from "./chest";
import { Bonus } from './bonus';
 
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
const app = new PIXI.Application({
    width: 400,
    height: 300,
    transparent: true
});
document.body.appendChild(app.view);

app.loader
    .add('interview.json')
    .load(init);


const totalChestAmount = 6;
let closedChestIndexes = [];
let chests = [];
let startButton;
let bonusView;
let filter;

let spriteSheet;

function init() {
    spriteSheet = app.loader.resources['interview.json'].spritesheet;
    console.log(spriteSheet);
    createElements();
}

function createElements() {
    createFilter();
    createChests(totalChestAmount, spriteSheet);
    createStartButton(spriteSheet);
    createBonusView();
}

function createFilter() {
    filter = new PIXI.filters.ColorMatrixFilter();
    filter.desaturate();

}

function createChests(chestAmount, spriteSheet) {
    const background = new PIXI.Graphics();
    background.beginFill(0xffffff);
    background.drawRoundedRect(50, 25, 300, 200, 10);
    background.endFill();
    background.alpha = 0.5;

    app.stage.addChild(background);


    for(let i = 0; i < chestAmount; i++) {
        const button = new Chest(spriteSheet, filter);
        button.x = 95 + (160 * (i % 2));
        button.y = 25 + (Math.floor(i / 2) * 70); 
        button.on('pointerdown', openChest(i));

        chests.push(button);
        closedChestIndexes.push(i);
        app.stage.addChild(button);
    }
}

function createStartButton(spriteSheet) {
    startButton = new StartButton('Start', spriteSheet);
    startButton.x = 145;
    startButton.y = 240;
    
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

function openChest(index) {
    return function() {
        const chest = chests[index];
        const winValue = processWin();
        const openedIndex = closedChestIndexes.indexOf(index);
        closedChestIndexes.splice(openedIndex, 1);
        console.log(closedChestIndexes);
        for (const chest of chests) {
            chest.changeState(false);
        }

        chest.showWin(winValue)
            .then(() => {
                if(isBonusWin()) { 
                    return bonusView.show(500);
                }
            })
            .then(() => {
                if(closedChestIndexes.length === 0) {
                    restart();
                    return;
                }

                enableClosedChests();
            })
    }
}

function enableClosedChests() {
    for(const i of closedChestIndexes) {
        chests[i].changeState(true);
    }
}

function restart() {
    let i = 0;
    for (const chest of chests) {
        chest.changeState(false);
        chest.reset();
        closedChestIndexes.push(i++);
    }
    console.log(closedChestIndexes);

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

