import * as PIXI from 'pixi.js';
import { Controller } from "./controller"; 

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
const app = new PIXI.Application({
    width: 400,
    height: 400,
    transparent: true
});
document.body.appendChild(app.view);

app.loader
    .add('interview.json')
    .load(() => {
        const controller = new Controller(app);
    });
