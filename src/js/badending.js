import { Actor, Buttons, Color, DisplayMode, Font, Label, Scene, Sprite, Vector } from "excalibur";
import { Resources } from "./resources";


export class Badending extends Scene {
    constructor() {
        super();
        this.congratulations = null;
        this.youdidit = null;
        this.Backbutton = null;
    }

    onInitialize(engine) {
        const endScreenImage = new Sprite({
            image: Resources.BadEndScreen,
            destSize: { width: 1280, height: 720 }
        });

        const bg = new Actor({
            pos: new Vector(640, 360),
            width: 1280,
            height: 720
        });
        bg.graphics.use(endScreenImage);
        this.add(bg);

        this.spawnBackbutton();

        if (this.Backbutton) {
            this.Backbutton.on('pointerup', () => {
                // Reload the entire page
                window.location.reload();
            });
        }
    }

    spawnBackbutton() {
        this.Backbutton = new Actor();
        this.Backbutton.graphics.use(Resources.Backbutton.toSprite());
        this.Backbutton.pos = new Vector(600, 450);
        this.add(this.Backbutton);
    }

    onPreUpdate(engine) {
        if (engine.input.gamepads.at(0).isButtonPressed(Buttons.Start)) {
            window.location.reload();
        }
    }
}