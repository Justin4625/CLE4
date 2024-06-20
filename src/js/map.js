import { Actor, Engine, Scene, Timer, Vector } from "excalibur";
import { Startdialogue } from "./startdialogue";
import { TiledResource } from "@excaliburjs/plugin-tiled";
import { Player } from "./player";
import { Lithorock } from "./lithorock";
import { Resources } from "./resources";
import { Wout } from "./boswachter-wout";
import { Dirk } from "./dirk-zeebries";
import { Elara } from "./elara-mystveil";
import { Earth } from "./earthartifact";
import { Water } from "./waterartifact";
import { Rock } from "./rockartifact";
import { Mystery } from "./mysteryartifact";
import { Wall } from "./border";
import { ArtifactManager } from "./artifactmanager";

export class Map extends Scene {

    earth = false
    water = false
    rock = false
    mystery = false

    constructor() {
        super();
        this.countdownTimer = null;
        this.artifactmanager = new ArtifactManager();
    }

    onInitialize(engine) {
        console.log("start de game! bla");

        Resources.Map.addToScene(this);

        const player = new Player();
        player.pos = new Vector(440, 2530);
        this.add(player);

        const wout = new Wout();
        this.add(wout);

        const dirk = new Dirk();
        this.add(dirk);

        const elara = new Elara();
        this.add(elara);

        const lithorock = new Lithorock();
        this.add(lithorock);

        const earthartifact = new Earth();
        earthartifact.on('collisionstart', (evt) => {
            if (evt.other instanceof Player) {
                this.earth = true
                console.log(this.earth)
            }
        });

        const waterartifact = new Water();
        waterartifact.on('collisionstart', (evt) => {
            if (evt.other instanceof Player) {
                this.water = true
                console.log(this.water)
            }
        });

        const rockartifact = new Rock();
        rockartifact.on('collisionstart', (evt) => {
            if (evt.other instanceof Player) {
                this.rock = true
                console.log(this.rock)
            }
        });

        const mysteryartifact = new Mystery();
        mysteryartifact.on('collisionstart', (evt) => {
            if (evt.other instanceof Player) {
                this.mystery = true
                console.log(this.mystery)
            }
        });

        wout.on('collisionstart', (evt) => {
            if (evt.other instanceof Player && !this.earth) {
                this.add(earthartifact);
                earthartifact.pos = new Vector(310, 1243); // You can set a specific position if needed
                console.log('Earth Artifact spawned!')
            }
        });

        dirk.on('collisionstart', (evt) => {
            if (evt.other instanceof Player && !this.water) {
                this.add(waterartifact);
                waterartifact.pos = new Vector(2365, 2304); // You can set a specific position if needed
                console.log('Water Artifact spawned!')

            }
        });

        elara.on('collisionstart', (evt) => {
            if (evt.other instanceof Player && !this.mystery) {
                this.add(mysteryartifact);
                mysteryartifact.pos = new Vector(3090, 120); // You can set a specific position if needed
                console.log('Mystery Artifact spawned!')

            }
        });

        lithorock.on('collisionstart', (evt) => {
            if (evt.other instanceof Player && !this.rock) {
                this.add(rockartifact);
                rockartifact.pos = new Vector(2233, 3142); // You can set a specific position if needed
                console.log('Rock Artifact spawned!')

            }
        });

        engine.currentScene.camera.strategy.lockToActor(player);
        engine.currentScene.camera.zoom = 2.5;

        const mapWidth = 3200;
        const mapHeight = 3200;
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

        this.countdownTimer = new Timer({
            fcn: () => this.onTimerEnd(engine),
            interval: 1800 * 1000,
            repeats: false,
        });
        this.add(this.countdownTimer);
        this.countdownTimer.start();

        this.artifactmanager.on('artifactCollected', () => {
            if (this.artifactmanager.allCollected()) {
                this.switchScene();
            }
        });


    }

    onTimerEnd(engine) {
        engine.goToScene('badending');
    }

    addArtifact(artifact) {
        this.artifactmanager.addArtifact(artifact);
        this.add(artifact);
    }


    switchScene() {
        this.engine.goToScene('end');
    }


    onPreUpdate() {
        if (this.earth === true && this.water === true && this.rock === true && this.mystery === true) {
            this.engine.goToScene('badending')
        }
    }
}
