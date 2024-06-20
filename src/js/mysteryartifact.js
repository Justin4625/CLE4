import { Actor, Vector } from "excalibur";
import { Resources } from "./resources";
import { Player } from "./player";

export class Mystery extends Actor {
    constructor() {
        super({
            width: Resources.Mysteryartifact.width,
            height: Resources.Mysteryartifact.height
        });
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Mysteryartifact.toSprite());
        this.pos = new Vector(3090, 120);
        this.scale = new Vector(16 / Resources.Mysteryartifact.width, 16 / Resources.Mysteryartifact.height);

        this.on('collisionstart', (evt) => {
            if (evt.other instanceof Player) {
                console.log('Mystery artifact collected');
                this.emit('collected');
                this.kill();
            }
        });
    }
}