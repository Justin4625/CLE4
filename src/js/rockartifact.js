import { Actor, Vector } from "excalibur";
import { Resources } from "./resources";
import { Player } from "./player";

export class Rock extends Actor {
    constructor() {
        super({
            width: Resources.Rockartifact.width,
            height: Resources.Rockartifact.height
        });
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Rockartifact.toSprite());
        this.pos = new Vector(2233, 3142);
        this.scale = new Vector(16 / Resources.Rockartifact.width, 16 / Resources.Rockartifact.height);

        this.on('collisionstart', (evt) => {
            if (evt.other instanceof Player) {
                console.log('Rock artifact collected');
                this.emit('collected');
                this.kill();
            }
        });
    }
}