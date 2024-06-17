import { Actor, Loader, Scene, Vector } from "excalibur";
import { Startdialogue } from "./startdialogue";
import { TiledResource } from "@excaliburjs/plugin-tiled";
import { Player } from "./player";
import { Lithorock } from "./lithorock";
import { vector } from "excalibur/build/dist/Util/DrawUtil";
import { Resources } from "./resources";


export class Map extends Scene {
    constructor() {
        super()
    }

    onInitialize(engine) {
        console.log("start de game!");
        // const tiledMap = new TiledResource('map/tilemap.tmx');
        // tiledMap.addToScene(this);

        const tiledMap = new TiledResource('map/tilemap.tmx')
        const loader = new Loader([tiledMap]);
        engine.start(loader).then(() => {
            tiledMap.addToScene(engine.currentScene);
        });
    }

    onPostUpdate() {
        const player = new Lithorock
        this.add(player)
    }
}