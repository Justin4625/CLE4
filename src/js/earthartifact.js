import { Actor, Vector } from "excalibur";
import { Resources } from "./resources";
import { Player } from "./player";

export class Earth extends Actor {
    constructor() {
        super({
            width: Resources.Earthartifact.width,
            height: Resources.Earthartifact.height
        });
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Earthartifact.toSprite());
        this.pos = new Vector(310, 1243);
        this.scale = new Vector(16 / Resources.Earthartifact.width, 16 / Resources.Earthartifact.height);

        this.on('collisionstart', (evt) => {
            if (evt.other instanceof Player) {
                console.log('Earth artifact collected');
                this.emit('collected');
                this.kill();
            }
        });
    }
}