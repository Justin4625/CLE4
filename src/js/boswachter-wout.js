import { Actor, Engine, Vector, SpriteSheet, Animation, Input, Keys } from 'excalibur';
import { Resources } from './resources';

export class Wout extends Actor {
    constructor() {
        super();
        const idleSheet = SpriteSheet.fromImageSource({
            image: Resources.Wout,
            grid: { rows: 1, columns: 1, spriteWidth: 96, spriteHeight: 96 }
        });
        const idleFrames = [0]; // assuming you want to animate the first frame
        const idleAnimation = Animation.fromSpriteSheet(idleSheet, idleFrames, 100); // 100ms per frame

        this.graphics.add("idle", idleAnimation);
        this.graphics.use("idle");
    }

    onInitialize(engine) {
        this.pos = new Vector(400, 200); // adjust the position as needed
        this.vel = new Vector(0, 0);
    }

    onPreUpdate(engine) {
        // no movement needed, Wout is stationary
    }
}