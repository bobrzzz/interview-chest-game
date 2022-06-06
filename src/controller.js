import { Scene } from "./scene";


class Controller {
    constructor(app) {
        this.totalChestAmount = 6;
        this.bonusWinAmount = 500;
        this.maxRegularWinAmount = 100;

        this.closedChestIndexes = [];

        const spriteSheet = app.loader.resources['interview.json'].spritesheet;
        const callbacks = {
            chest: this.openChest.bind(this),
            startButton: this.startGame.bind(this)
        };
    
        const scene = new Scene(this.totalChestAmount, spriteSheet, callbacks);
        app.stage.addChild(scene);
    
        this.chests = scene.getChests();
        this.startButton = scene.getStartButton();
        this.bonusView = scene.getBonusView();
        this.resetClosedIndexes();
    }
    
    startGame() {
        for (const chest of this.chests) {
            chest.changeState(true);
        }
    }
    
    openChest(index) {
        return function() {
            const chest = this.chests[index];
            const winValue = this.processWin();
            const openedIndex = this.closedChestIndexes.indexOf(index);
            this.closedChestIndexes.splice(openedIndex, 1);
            
            for (const chest of this.chests) {
                chest.changeState(false);
            }
    
            chest.showWin(winValue)
                .then(() => {
                    if(this.isBonusWin()) { 
                        chest.changeText(winValue + this.bonusWinAmount);
                        return this.bonusView.show(this.bonusWinAmount);
                    }
                })
                .then(() => {
                    if(this.closedChestIndexes.length === 0) {
                        this.restart();
                        return;
                    }
    
                    this.enableClosedChests();
                })
        }.bind(this);
    }
    
    enableClosedChests() {
        for(const i of this.closedChestIndexes) {
            this.chests[i].changeState(true);
        }
    }
    
    restart() {
        for (const chest of this.chests) {
            chest.changeState(false);
            chest.reset();
        }
        this.resetClosedIndexes();
    
        this.startButton.changeState(true);
    }
    
    resetClosedIndexes() {
        this.closedChestIndexes = [];
        for(let i = 0; i < this.chests.length; i++) {
            this.closedChestIndexes.push(i);
        }
    }
    
    processWin() {
        if(!this.isWin()) {
            return 0;
        }
        let winValue = this.getRandomInteger(this.maxRegularWinAmount);
        return winValue;
    
    }
    
    isWin() {
        return this.getRandomInteger(2) === 2;
    }
    
    isBonusWin() {
        return this.getRandomInteger(this.totalChestAmount) === this.totalChestAmount;
    }
    
    getRandomInteger(max) {
        return Math.floor(Math.random() * max) + 1;
    }
}

export {
    Controller
}