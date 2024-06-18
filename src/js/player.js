import { Actor, Axes, Buttons, CollisionType, Input, Keys, Vector } from "excalibur";
import { Resources } from "./resources";

export class Player extends Actor {

    sprite

    constructor(x, y) {
        super({
            pos: new Vector(x, y),
            width: 16, /* Resources.Player.width / 2 */
            height: 16, /* Resources.Player.width / 2 */
            collisionType: CollisionType.Active
        });
        this.isGrounded = false;
    }

    onPreUpdate(engine, delta) {
        this.sprite = Resources.Test.toSprite()
        this.graphics.use(this.sprite)


        let xspeed = 0;
        let yspeed = 0;

        // Check for keyboard or controller input
        const keyboard = engine.input.keyboard;
        const gamepads = engine.input.gamepads;

        if (keyboard.isHeld(Keys.W) || keyboard.isHeld(Keys.Up) || gamepads.at(0).getAxes(Axes.LeftStickY) > 0.5) {
            if (this.isGrounded) {
                this.isGrounded = false;
            }
            yspeed = -150;
        }

        if (keyboard.isHeld(Keys.D) || keyboard.isHeld(Keys.Right) || gamepads.at(0).getAxes(Axes.LeftStickX) > 0.5) {
            xspeed = 150;
            // this.sprite.flipHorizontal = true;
        }

        if (keyboard.isHeld(Keys.A) || keyboard.isHeld(Keys.Left) || gamepads.at(0).getAxes(Axes.LeftStickX) < -0.5) {
            xspeed = -150;
            // this.sprite.flipHorizontal = false;
        }

        if (keyboard.isHeld(Keys.S) || keyboard.isHeld(Keys.Down) || gamepads.at(0).getAxes(Axes.LeftStickY) < -0.5) {
            yspeed = 150;
            // this.sprite.flipHorizontal = false;
        }

        // Update velocity
        this.vel = new Vector(xspeed, yspeed);
    }

}