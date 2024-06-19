import { Actor, Vector } from "excalibur";
import { Resources } from "./resources";


export class Earth extends Actor {
    constructor() {
        super({
            width: Resources.Earthartifact.width,
            height: Resources.Earthartifact.height
        })
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Earthartifact.toSprite())
        this.pos = new Vector(400, 200)
        this.scale = new Vector(16 / Resources.Earthartifact.width, 16 / Resources.Earthartifact.height)

        this.on('collisionstart', () => {
            this.kill()
        });
    }

    switchScene() {

    }
}