import { Scene, Label, Color, Input, Font, Vector } from "excalibur";

export class Startdialogue extends Scene {
    constructor() {
        super();
        this.currentDialogueIndex = 0;
        this.dialogues = [
            "Hier ben ik, in de wind die fluistert, in het water dat stroomt... Jij bent uitverkoren.",
            "Je bent gekomen omdat je geroepen werd. Er rust een taak op jouw schouders, een taak van groot belang.",
            "Je moet vier artefacten vinden, verborgen rondom deze wateren en bossen. Ze zijn sleutels tot het mysterie dat wacht om onthuld te worden.",
            "Je zult begrijpen wanneer de tijd rijp is. Vind het, en de weg zal zich openbaren.",
            "Die antwoorden komen als je gehoor geeft aan de roep van het onbekende. Ga, en ontdek."
        ];
    }

    onInitialize(engine) {
        super.onInitialize(engine);

        this.showCurrentDialogue();

        // Luister naar het spatiebalk evenement om naar de volgende dialoog te gaan
        engine.input.keyboard.on('press', (evt) => {
            if (evt.key === Input.Keys.Space) {
                this.nextDialogue();
            }
        });
    }

    showCurrentDialogue() {
        const currentText = this.dialogues[this.currentDialogueIndex];
        const dialogLabel = new Label({
            text: currentText,
            pos: new Vector(300, 500), // Vector voor positie
            font: new Font({ 
                size: 20,
                family: 'Arial',
            }),
            color: Color.White,
        });

        this.add(dialogLabel);
    }

    nextDialogue() {
        // Verwijder het huidige dialooglabel
        this.actors.forEach(actor => {
            actor.kill();
        });

        // Ga naar de volgende dialoog, als er geen volgende dialoog is, sluit de dialoogscene
        this.currentDialogueIndex++;
        if (this.currentDialogueIndex < this.dialogues.length) {
            this.showCurrentDialogue();
        } else {
            this.engine.removeScene(this);
        }
    }
}
