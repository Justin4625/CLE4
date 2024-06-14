import { Color, Font, Label, Scene, Vector } from "excalibur";

export class Start extends Scene {

    onActivate() {
        this.engine.backgroundColor = Color.Black;

        this.startLabel = new Label({
            text: 'Start Game',
            pos: new Vector(615, 450),
            color: Color.White,
            font: new Font({ 
                size: 50,
                bold: true
            }),
        });

        this.startLabel.on('pointerup', () => {
            this.engine.goToScene('map');
        });
        this.add(this.startLabel);
    }
}