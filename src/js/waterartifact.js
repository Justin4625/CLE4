import { Actor, Vector } from "excalibur";
import { Resources } from "./resources";


export class Water extends Actor {
    constructor() {
        super({
            width: Resources.Waterartifact.width,
            height: Resources.Waterartifact.height
        })
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Waterartifact.toSprite())
        this.pos = new Vector(450, 200)
        this.scale = new Vector(16 / Resources.Waterartifact.width, 16 / Resources.Waterartifact.height)

        this.on('collisionstart', () => {
            this.kill()
        });
    }

    switchScene() {

    }
}