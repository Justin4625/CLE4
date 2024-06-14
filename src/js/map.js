import { Actor, Scene, Vector } from "excalibur";
import { Resources } from "./resources";

export class Map extends Scene {

    onInitialize(engine) {
        console.log("start de game!");

        this.setupScene(engine);
    }
    
    setupScene(engine) {
        const fish = new Actor()
        fish.graphics.use(Resources.Fish.toSprite())
        fish.pos = new Vector(400, 300)
        fish.vel = new Vector(-10,0)
        this.add(fish)
    }
}