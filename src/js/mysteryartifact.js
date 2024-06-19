import { Actor, Vector } from "excalibur";
import { Resources } from "./resources";


export class Mystery extends Actor {
    constructor() {
        super({
            width: Resources.Mysteryartifact.width,
            height: Resources.Mysteryartifact.height
        })
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Mysteryartifact.toSprite())
        this.pos = new Vector(3097, 112)
        this.scale = new Vector(16 / Resources.Mysteryartifact.width, 16 / Resources.Mysteryartifact.height)

        this.on('collisionstart', () => {
            this.kill()
        });
    }

    switchScene() {

    }
}