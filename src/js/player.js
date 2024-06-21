import { Actor, Axes, Buttons, CollisionType, Input, Keys, Vector } from "excalibur";
import { Resources } from "./resources";
import { Elaradialogue } from "./elara-mystveil-dialogue";
import { Elara } from "./elara-mystveil";
import { Wout } from "./boswachter-wout";
import { Dirk } from "./dirk-zeebries";
import { Woutdialogue } from "./boswachter-wout-dialogue";
import { Drikdialogue } from "./dirk-zeebries-dialogue";
import { Lithorock } from "./lithorock";
import { Earth } from "./earthartifact";
import { Water } from "./waterartifact";
import { Rock } from "./rockartifact";
import { Mystery } from "./mysteryartifact";

export class Player extends Actor {

    sprite
    dialogueStartedMap = new Map();

    constructor(x, y) {
        super({
            pos: new Vector(x, y),
            width: 16, /* Resources.Player.width / 2 */
            height: 16, /* Resources.Player.width / 2 */
            collisionType: CollisionType.Active
        });
        this.isGrounded = false;
    }
    onInitialize(engine) {
        this.sprite = Resources.Test.toSprite();
        this.graphics.use(this.sprite);

        this.on("collisionstart", (event) => this.onCollide(event));
    }

    onCollide(event) {
        const other = event.other;
        if (other instanceof Elara && !this.dialogueStartedMap.has('elara')) {
            console.log("Collision with Elara detected");
            this.startDialogue('elaraDialogue');
            this.dialogueStartedMap.set('elara', true);
        } else if (other instanceof Wout && !this.dialogueStartedMap.has('wout')) {
            console.log("Collision with Wout detected");
            this.startDialogue('woutDialogue');
            this.dialogueStartedMap.set('wout', true);
        } else if (other instanceof Dirk && !this.dialogueStartedMap.has('dirk')) {
            console.log("Collision with Dirk detected");
            this.startDialogue('dirkDialogue');
            this.dialogueStartedMap.set('dirk', true);
        } else if (other instanceof Lithorock && !this.dialogueStartedMap.has('lithorock')) {
            console.log("Collision with Lithorock detected");
            this.startDialogue('lithorockDialogue');
            this.dialogueStartedMap.set('lithorock', true);
        }
    }

    startDialogue(dialogue) {
        this.scene?.engine.goToScene(dialogue);
    }


    onPreUpdate(engine, delta) {
        this.sprite = Resources.Test.toSprite()
        this.graphics.use(this.sprite)


        let xspeed = 0;
        let yspeed = 0;

        // Check for keyboard or controller input
        const keyboard = engine.input.keyboard;
        const gamepads = engine.input.gamepads;

        if (keyboard.isHeld(Keys.W) || keyboard.isHeld(Keys.Up) || gamepads.at(0).getAxes(Axes.LeftStickY) < - 0.5) {
            if (this.isGrounded) {
                //  this.isGrounded = false;
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

        if (keyboard.isHeld(Keys.S) || keyboard.isHeld(Keys.Down) || gamepads.at(0).getAxes(Axes.LeftStickY) > 0.5) {
            yspeed = 150;
            // this.sprite.flipHorizontal = false;
        }

        // Update velocity
        this.vel = new Vector(xspeed, yspeed);
    }

}