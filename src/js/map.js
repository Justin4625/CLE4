import { Loader, Scene } from "excalibur";
import { Startdialogue } from "./startdialogue"; // Zorg ervoor dat het juiste pad is ingesteld naar Startdialogue
import { TiledResource } from "@excaliburjs/plugin-tiled";


export class Map extends Scene {

    constructor() {
        super()
    }

    onInitialize(engine) {
        console.log("start de game!");
        const tiledMap = new TiledResource('./map/tilemap.tmx');
        tiledMap.addToScene(Map.currentScene);


    }
}