import { Actor, Engine, Vector, SpriteSheet, Animation } from 'excalibur';
import { Resources } from './resources';

export class Lithorock extends Actor {
    constructor() {
        super();
        const idleSheet = SpriteSheet.fromImageSource({
            image: Resources.Lithorock,
            grid: { rows: 1, columns: 2, spriteWidth: 498, spriteHeight: 504 }
        });

        const idleFrames = [0, 1]; // assuming you want to animate the first frame
        const idleAnimation = Animation.fromSpriteSheet(idleSheet, idleFrames, 500); // 100ms per frame
        idleAnimation.scale = new Vector(32 / 498, 32 / 504);

        this.graphics.add("idle", idleAnimation);
        this.graphics.use("idle");
    }

    onInitialize(engine) {
        this.pos = new Vector(2662, 1875); // adjust the position as needed
        this.vel = new Vector(0, 0);
    }

    onPreUpdate(engine) {
        // no movement needed, Wout is stationary
    }
}