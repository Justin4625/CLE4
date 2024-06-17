import { Actor, Color, DisplayMode, Font, Label, Scene, Sprite, Vector } from "excalibur";
import { Resources } from "./resources";


export class End extends Scene {
    constructor() {
        super()
    }

    onInitialize() {
        const endScreenImage = new Sprite({
            image: Resources.Endscreen,
            destSize: { width: 1280, height: 720 }
        })

        const bg = new Actor({
            pos: new Vector(640, 360),
            width: 1280,
            height: 720
        });
        bg.graphics.use(endScreenImage)
        this.add(bg)

        this.congratulationsText()
        this.youdiditText()
        this.spawnBackbutton()

        this.Backbutton.on('pointerup', () => {
            this.engine.goToScene('start');
        });
    }

    congratulationsText() {
        this.congratulations = new Actor()
        this.congratulations.graphics.use(Resources.Congratulations.toSprite())
        this.congratulations.pos = new Vector(625, 50)
        this.add(this.congratulations)
    }

    youdiditText() {
        this.youdidit = new Actor()
        this.youdidit.graphics.use(Resources.Youdidit.toSprite())
        this.youdidit.pos = new Vector(660, 170)
        this.add(this.youdidit)
    }

    spawnBackbutton() {
        this.Backbutton = new Actor()
        this.Backbutton.graphics.use(Resources.Backbutton.toSprite())
        this.Backbutton.pos = new Vector(650, 500)
        this.add(this.Backbutton)
    }
}