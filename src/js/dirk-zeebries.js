import { Actor, Vector, SpriteSheet, Animation } from 'excalibur';
import { Resources } from './resources';

export class Dirk extends Actor {
    constructor() {
        super();
        const idleSheet = SpriteSheet.fromImageSource({
            image: Resources.Dirk,
            grid: { rows: 1, columns: 2, spriteWidth: 498, spriteHeight: 498 }
        });

        const idleFrames = [0, 1]; // assuming you want to animate the first frame
        const idleAnimation = Animation.fromSpriteSheet(idleSheet, idleFrames, 500);
        idleAnimation.scale = new Vector(32 / 498, 32 / 498);

        this.graphics.add("idle", idleAnimation);
        this.graphics.use("idle");
    }

    onInitialize(engine) {
        this.pos = new Vector(755, 1280); // adjust the position as needed
        this.vel = new Vector(0, 0);
    }

    onPreUpdate(engine) {
        // no movement needed, Wout is stationary
    }
}