import { Actor, Axes, Buttons, CollisionType, Input, Keys, Vector } from "excalibur";
import { Resources } from "./resources";

export class Player extends Actor {
    constructor(x, y) {
        super({
            pos: new Vector(x, y),
            width: Resources.Player.width / 2,
            height: Resources.Player.height / 2,
            collisionType: CollisionType.Active
        });
        this.isGrounded = false;
    }

    onPreUpdate(engine, delta) {
        let xspeed = 0;
        let yspeed = this.vel.y;

        // Check for keyboard or controller input
        const keyboard = engine.input.keyboard;
        const gamepads = engine.input.gamepads;

        if (keyboard.isHeld(Keys.W) || keyboard.isHeld(Keys.Up) || gamepads.at(0).isButtonPressed(Buttons.Face1)) {
            if (this.isGrounded) {
                this.isGrounded = false;
            }
        }

        if (keyboard.isHeld(Keys.D) || keyboard.isHeld(Keys.Right) || gamepads.at(0).getAxes(Axes.LeftStickX) > 0.5) {
            xspeed = 200;
            // this.sprite.flipHorizontal = true;
        }

        if (keyboard.isHeld(Keys.A) || keyboard.isHeld(Keys.Left) || gamepads.at(0).getAxes(Axes.LeftStickX) < -0.5) {
            xspeed = -200;
            // this.sprite.flipHorizontal = false;
        }

        // Update velocity
        this.vel = new Vector(xspeed, yspeed);
    }

}