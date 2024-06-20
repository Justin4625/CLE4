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
import { Wall } from "./border";


export class Map extends Scene {
    constructor() {
        super()
    }

    onInitialize(engine) {
        console.log("start de game! bla");
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

        // Map dimensions (example values, replace with your actual map size)
        const mapWidth = 3200;  // Width of your map
        const mapHeight = 3200; // Height of your map
        const wallThickness = 50;

        // Add walls around the map
        const topWall = new Wall(mapWidth / 2, -wallThickness / 2, mapWidth, wallThickness);
        const bottomWall = new Wall(mapWidth / 2, mapHeight + wallThickness / 2, mapWidth, wallThickness);
        const leftWall = new Wall(-wallThickness / 2, mapHeight / 2, wallThickness, mapHeight);
        const rightWall = new Wall(mapWidth + wallThickness / 2, mapHeight / 2, wallThickness, mapHeight);

        this.add(topWall);
        this.add(bottomWall);
        this.add(leftWall);
        this.add(rightWall);
    }

    onPostUpdate() {

    }
}