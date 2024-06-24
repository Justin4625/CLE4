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

    leftcurrentFrame = 0;
    rightcurrentFrame = 0;
    frontcurrentFrame = 0;
    backcurrentFrame = 0;
    animationSpeed = 0.08;
    leftanimationFrames = [Resources.ML1, Resources.ML2, Resources.ML3, Resources.ML2];
    rightanimationFrames = [Resources.MR1, Resources.MR2, Resources.MR3, Resources.MR2];
    frontanimationFrames = [Resources.MF1, Resources.MF2, Resources.MF3, Resources.MF2];
    backanimationFrames = [Resources.MB1, Resources.MB2, Resources.MB3, Resources.MB2];
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
        this.sprite = Resources.MF2.toSprite();
        this.graphics.use(this.sprite);
        this.scale = new Vector(0.5, 0.5);

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
        // this.sprite = Resources.MF2.toSprite()
        // this.graphics.use(this.sprite)


        let xspeed = 0;
        let yspeed = 0;

        // Check for keyboard or controller input
        const keyboard = engine.input.keyboard;
        const gamepads = engine.input.gamepads;

        if (keyboard.isHeld(Keys.W) || keyboard.isHeld(Keys.Up) || gamepads.at(0).getAxes(Axes.LeftStickY) < - 0.5) {
            yspeed = -150;
            this.animateBack();
        }

        if (keyboard.isHeld(Keys.D) || keyboard.isHeld(Keys.Right) || gamepads.at(0).getAxes(Axes.LeftStickX) > 0.5) {
            xspeed = 150;
            this.animateRight();
        }

        if (keyboard.isHeld(Keys.A) || keyboard.isHeld(Keys.Left) || gamepads.at(0).getAxes(Axes.LeftStickX) < -0.5) {
            xspeed = -150;
            this.animateLeft();
        }

        if (keyboard.isHeld(Keys.S) || keyboard.isHeld(Keys.Down) || gamepads.at(0).getAxes(Axes.LeftStickY) > 0.5) {
            yspeed = 150;
            this.animateFront();
        }

        // Update velocity
        this.vel = new Vector(xspeed, yspeed);
    }

    animateLeft() {
        this.leftcurrentFrame = (this.leftcurrentFrame + this.animationSpeed) % this.leftanimationFrames.length;
        if (this.leftcurrentFrame >= this.leftanimationFrames.length) {
            this.leftcurrentFrame = 0;
        }

        const sprite = this.leftanimationFrames[Math.floor(this.leftcurrentFrame)].toSprite();
        this.graphics.use(sprite);
    }

    animateRight() {
        this.rightcurrentFrame = (this.rightcurrentFrame + this.animationSpeed) % this.rightanimationFrames.length;
        if (this.rightcurrentFrame >= this.rightanimationFrames.length) {
            this.rightcurrentFrame = 0;
        }

        const sprite = this.rightanimationFrames[Math.floor(this.rightcurrentFrame)].toSprite();
        this.graphics.use(sprite);
    }

    animateFront() {
        this.frontcurrentFrame = (this.frontcurrentFrame + this.animationSpeed) % this.frontanimationFrames.length;
        if (this.frontcurrentFrame >= this.frontanimationFrames.length) {
            this.frontcurrentFrame = 0;
        }

        const sprite = this.frontanimationFrames[Math.floor(this.frontcurrentFrame)].toSprite();
        this.graphics.use(sprite);
    }

    animateBack() {
        this.backcurrentFrame = (this.backcurrentFrame + this.animationSpeed) % this.backanimationFrames.length;
        if (this.backcurrentFrame >= this.backanimationFrames.length) {
            this.backcurrentFrame = 0;
        }

        const sprite = this.backanimationFrames[Math.floor(this.backcurrentFrame)].toSprite();
        this.graphics.use(sprite);
    }
}