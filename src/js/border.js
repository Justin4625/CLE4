import { Actor, CollisionType, Color, Vector } from "excalibur";

export class Wall extends Actor {
    constructor(x, y, width, height) {
        super({
            pos: new Vector(x, y),
            width: width,
            height: height,
            color: Color.Transparent
        });
        this.body.collisionType = CollisionType.Fixed;
    }
}
