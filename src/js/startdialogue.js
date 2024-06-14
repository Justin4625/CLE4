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
        const maxWidth = 600; // Maximale breedte van de zin
        const lines = this.splitTextIntoLines(currentText, maxWidth);

        // Positie van de eerste regel
        let posY = 500;

        // Maak een label voor elke regel
        lines.forEach(line => {
            const dialogLabel = new Label({
                text: line,
                pos: new Vector(400, posY),
                font: new Font({
                    size: 20,
                    family: 'Arial',
                }),
                color: Color.White,
            });

            this.add(dialogLabel);
            posY += 25; // Verhoog de Y-positie voor de volgende regel
        });
    }

    // Functie om tekst op te splitsen in regels op basis van de maximale breedte
    splitTextIntoLines(text, maxWidth) {
        const words = text.split(' ');
        const lines = [];
        let currentLine = words[0];

        for (let i = 1; i < words.length; i++) {
            const word = words[i];

            if (this.getTextWidth(currentLine + ' ' + word) < maxWidth) {
                currentLine += ' ' + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }

        lines.push(currentLine);
        return lines;
    }

    // Functie om de breedte van de tekst te schatten
    getTextWidth(text) {
        // Schatting van de breedte op basis van de lengte van de tekststring
        return text.length * 10; // Dit is een ruwe schatting, afhankelijk van de grootte van je lettertype
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
