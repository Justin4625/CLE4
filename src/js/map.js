import { Loader, Scene } from "excalibur";
import { Startdialogue } from "./startdialogue";
import { TiledResource } from "@excaliburjs/plugin-tiled";


export class Map extends Scene {

    constructor() {
        super()
    }

    onInitialize(engine) {
        console.log("start de game!");
        const tiledMap = new TiledResource('map/tilemap.tmx')
        const loader = new Loader([tiledMap]);
        engine.start(loader).then(() => {
            tiledMap.addToScene(engine.currentScene);
        });
    }
}