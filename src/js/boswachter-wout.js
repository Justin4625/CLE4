import { Actor, Vector, SpriteSheet, Animation } from 'excalibur';
import { Resources } from './resources';

export class Wout extends Actor {
    constructor() {
        super();
        const idleSheet = SpriteSheet.fromImageSource({
            image: Resources.Wout,
            grid: { rows: 1, columns: 2, spriteWidth: 498, spriteHeight: 498 }
        });

        const idleFrames = [0, 1]; // Add more frames if you want to animate multiple frames
        const idleAnimation = Animation.fromSpriteSheet(idleSheet, idleFrames, 500);
        idleAnimation.scale = new Vector(32 / 498, 32 / 498);

        this.graphics.add("idle", idleAnimation);
        this.graphics.use("idle");
    }

    onInitialize(engine) {
        this.pos = new Vector(1455, 440); // adjust the position as needed
        this.vel = new Vector(0, 0);
    }

    onPreUpdate(engine) {
        // no movement needed, Wout is stationary
    }
}