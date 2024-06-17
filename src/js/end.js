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

        this.Endmessage = new Label({
            text: 'Congratulations! You did it!',
            pos: new Vector(120, 100),
            color: Color.Red,
            font: new Font({
                size: 80,
                bold: true
            }),
        });

        this.Backbutton = new Actor()
        this.Backbutton.graphics.use(Resources.Backbutton.toSprite())
        this.Backbutton.pos = new Vector(650, 500)
        this.add(this.Backbutton)

        this.Backbutton.on('pointerup', () => {
            this.engine.goToScene('start');
        });

        this.add(this.Endmessage);
    }
}