import { Actor, Buttons, Color, Font, Label, Scene, Sprite, Vector, } from "excalibur";
import { Resources } from "./resources";

export class Start extends Scene {

    onActivate(engine) {
        const startScreenImage = new Sprite({
            image: Resources.StartScreen,
            destSize: { width: 1280, height: 720 } // Afmetingen aangepast aan het scherm
        });

        const startScreenActor = new Actor({
            pos: new Vector(640, 360), // Geplaatst in het midden van het scherm
            width: 1280,
            height: 720
        });

        startScreenActor.graphics.use(startScreenImage);
        this.add(startScreenActor);

        this.startLabel = new Label({
            text: 'Press "Start"',
            pos: new Vector(470, 325), // Positie aangepast om binnen het scherm te passen
            color: Color.Orange,
            font: new Font({
                size: 50,
                bold: true
            }),
        });

        this.startLabel.on('pointerup', () => {
            this.engine.goToScene('startdialogue');
        });
        this.add(this.startLabel);

        Resources.Themesong.stop();
        Resources.Themesong.play();
        Resources.Themesong.loop = true;
    }

    onPreUpdate(engine) {
        if (engine.input.gamepads.at(0).isButtonPressed(Buttons.Start)) {
            this.engine.goToScene('startdialogue')
        }
    }


}
