import { Actor, Loader, Scene, Vector } from "excalibur";
import { Startdialogue } from "./startdialogue";
import { TiledResource } from "@excaliburjs/plugin-tiled";
import { Player } from "./player";
import { Lithorock } from "./lithorock";
import { vector } from "excalibur/build/dist/Util/DrawUtil";
import { Resources } from "./resources";
import { Wout } from "./boswachter-wout";
import { Dirk } from "./dirk-zeebries";
import { Elara } from "./elara-mystveil";
import { Earth } from "./earthartifact";
import { Water } from "./waterartifact";
import { Rock } from "./rockartifact";
import { Mystery } from "./mysteryartifact";


export class Map extends Scene {
    constructor() {
        super()
    }

    onInitialize(engine) {
        console.log("start de game! Blabla");
        // const tiledMap = new TiledResource('map/tilemap.tmx');
        // tiledMap.addToScene(this);

        // const tiledMap = new TiledResource('map/tilemap.tmx')
        // const loader = new Loader([tiledMap]);
        // engine.start(loader).then(() => {
        // });
        Resources.Map.addToScene(this);

        const player = new Player
        player.pos = new Vector(440, 2530)
        this.add(player)

        const wout = new Wout
        this.add(wout)

        const dirk = new Dirk
        this.add(dirk)

        const elara = new Elara
        this.add(elara)

        const lithorock = new Lithorock
        this.add(lithorock)

        const earthartifact = new Earth
        this.add(earthartifact)

        const waterartifact = new Water
        this.add(waterartifact)

        const Rockartifact = new Rock
        this.add(Rockartifact)

        const Mysteryartifact = new Mystery
        this.add(Mysteryartifact)


        engine.currentScene.camera.strategy.lockToActor(player);
        engine.currentScene.camera.zoom = 2.5;
    }

    onPostUpdate() {

    }
}