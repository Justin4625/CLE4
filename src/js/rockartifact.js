import { Actor, Vector } from "excalibur";
import { Resources } from "./resources";


export class Rock extends Actor {
    constructor() {
        super({
            width: Resources.Rockartifact.width,
            height: Resources.Rockartifact.height
        })
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Rockartifact.toSprite())
        this.pos = new Vector(500, 200)
        this.scale = new Vector(16 / Resources.Rockartifact.width, 16 / Resources.Rockartifact.height)

        this.on('collisionstart', () => {
            this.kill()
        });
    }

    switchScene() {

    }
}