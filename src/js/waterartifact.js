import { Actor, Vector } from "excalibur";
import { Resources } from "./resources";
import { Player } from "./player";

export class Water extends Actor {
    constructor() {
        super({
            width: Resources.Waterartifact.width,
            height: Resources.Waterartifact.height
        });
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Waterartifact.toSprite());
        this.pos = new Vector(2365, 2304);
        this.scale = new Vector(16 / Resources.Waterartifact.width, 16 / Resources.Waterartifact.height);

        this.on('collisionstart', (evt) => {
            if (evt.other instanceof Player) {
                console.log('Water artifact collected');
                this.emit('collected');
                this.kill();
            }
        });
    }
}