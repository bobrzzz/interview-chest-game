import * as PIXI from 'pixi.js';
import { Button } from "./button";
import { lol } from "./module";

const app = new PIXI.Application({
    width: 400,
    height: 300
});
document.body.appendChild(app.view);


const totalChestAmount = 6;
let opennedChestAmount = 0;
let chests = [];
let startButton;

function init() {
    buildButtons();
}

function buildButtons() {
    for(let i = 0; i < totalChestAmount; i++) {
        const button = new Button('Chest ' + i);
        button.x = 50 + (200 * (i % 2));
        button.y = 30 + (Math.floor(i / 2) * 70); 
        console.log('Button', button.x, button.y)

        button.on('pointerdown', openChest(button));

        chests.push(button);
        app.stage.addChild(button);
    }

    startButton = new Button('Start');
    startButton.x = 150;
    startButton.y = 230;
    
    startButton.changeState(true);
    startButton.on('pointerdown', startGame);


    app.stage.addChild(startButton);
}

init();

function startGame() {
    for (const chest of chests) {
        chest.changeState(true);
    }

    // startButton.changeState(false);
}

function openChest(button) {
    return function() {

        opennedChestAmount++;
        const winValue = processWin();
        button.changeText(winValue);
        if(opennedChestAmount === totalChestAmount) {
            restart();
        }
    }
}

function restart() {
    opennedChestAmount = 0;
    for (const chest of chests) {
        chest.changeState(false);
    }

    startButton.changeState(true);
}

function processWin() {
    if(!isWin()) {
        return 0;
    }
    let winValue = getRandomInteger(100);

    if(isBonusWin()) {
        console.log('Bonus win')
        winValue *= 4;
    }

    console.log(winValue);
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




lol();
console.log('App')
