import * as PIXI from 'pixi.js';
import { Scene } from "./scene";
 
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
const app = new PIXI.Application({
    width: 400,
    height: 400,
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

function init() {
    const spriteSheet = app.loader.resources['interview.json'].spritesheet;
    const callbacks = {
        chest: openChest,
        startButton: startGame
    };

    const scene = new Scene(totalChestAmount, spriteSheet, callbacks);
    app.stage.addChild(scene);

    chests = scene.getChests();
    startButton = scene.getStartButton();
    bonusView = scene.getBonusView();
    resetClosedIndexes();
    console.log(closedChestIndexes)
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
        console.log('index', index);
        
        for (const chest of chests) {
            chest.changeState(false);
        }

        chest.showWin(winValue)
            .then(() => {
                if(isBonusWin()) { 
                    const bonusWin = 500;
                    chest.changeText(winValue + bonusWin);
                    return bonusView.show(bonusWin);
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
    for (const chest of chests) {
        chest.changeState(false);
        chest.reset();
    }
    resetClosedIndexes();
    console.log(closedChestIndexes);

    startButton.changeState(true);
}

function resetClosedIndexes() {
    closedChestIndexes = [];
    for(let i = 0; i < chests.length; i++) {
        closedChestIndexes.push(i);
    }
}

function processWin() {
    if(!isWin()) {
        return 0;
    }
    let winValue = getRandomInteger(100);
    return winValue;

}

function isWin() {
    return getRandomInteger(2) === 2;
}

function isBonusWin() {
    return getRandomInteger(totalChestAmount) === totalChestAmount;
}

function getRandomInteger(max) {
    return Math.floor(Math.random() * max) + 1;
}

