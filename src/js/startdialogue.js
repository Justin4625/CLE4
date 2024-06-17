import { Scene, Label, Color, Input, Font, Vector, Actor } from "excalibur";

export class Startdialogue extends Scene {
    constructor() {
        super();
        this.currentDialogueIndex = 0;
        this.dialogues = [
            { name: "Mysterieuze Stem", text: "Hier ben ik, in de wind die fluistert, in het water dat stroomt... Jij bent uitverkoren." },
            { name: "Mysterieuze Stem", text: "Je bent gekomen omdat je geroepen werd. Er rust een taak op jouw schouders, een taak van groot belang." },
            { name: "Mysterieuze Stem", text: "Je moet vier artefacten vinden, verborgen rondom deze wateren en bossen. Ze zijn sleutels tot het mysterie dat wacht om onthuld te worden." },
            { name: "Mysterieuze Stem", text: "Je zult begrijpen wanneer de tijd rijp is. Vind het, en de weg zal zich openbaren." },
            { name: "Mysterieuze Stem", text: "Die antwoorden komen als je gehoor geeft aan de roep van het onbekende. Ga, en ontdek." }
        ];
    }

    onInitialize(engine) {
        super.onInitialize(engine);
        this.createNameBox(); // Maak het vak voor de naam
        this.showCurrentDialogue();

        // Luister naar het spatiebalk evenement om naar de volgende dialoog te gaan
        engine.input.keyboard.on('press', (evt) => {
            if (evt.key === Input.Keys.Space) {
                this.nextDialogue();
            }
        });
    }

    createNameBox() {
        // Verwijder de bestaande naambox en naamlabel als die er zijn
        if (this.nameBox) this.nameBox.kill();
        if (this.nameLabel) this.nameLabel.kill();
    
        const name = this.dialogues[this.currentDialogueIndex].name;
    
        // Border voor de naambox (wit), toegevoegd na de achtergrond
        const nameBoxBorder = new Actor({
            pos: new Vector(450, 510), // Aangepaste positie voor de naambox
            width: name.length * 11 + 26, // Breedte op basis van lengte van de naam en de border
            height: 46, // Hoogte van de box voor de naam inclusief de border
            color: Color.White, // Border kleur wit
        });
        this.add(nameBoxBorder);
    
        // Achtergrondbox voor de naam (zwart), toegevoegd bovenop de border
        this.nameBox = new Actor({
            pos: new Vector(450, 510), // Aangepaste positie voor de naambox
            width: name.length * 11 + 20, // Breedte op basis van lengte van de naam
            height: 40, // Hoogte van de box voor de naam
            color: Color.Black, // Achtergrondkleur zwart
        });
        this.add(this.nameBox);
    
        // Label voor de naam van de spreker
        this.nameLabel = new Label({
            text: name,
            pos: new Vector(375, 500), // Aangepaste positie voor de naam
            font: new Font({
                size: 20,
                family: 'Arial',
            }),
            color: Color.White, // Tekstkleur wit
        });
        this.add(this.nameLabel);
    }
    
    
    
    showCurrentDialogue() {
        const currentDialogue = this.dialogues[this.currentDialogueIndex];
        const text = currentDialogue.text;

        const maxWidth = 600; // Maximale breedte van de zin
        const lines = this.splitTextIntoLines(text, maxWidth);

        let posY = 550; // Positie van de eerste regel dialoog
        const lineHeight = 25;

        const boxHeight = lines.length * lineHeight + 40;
        const boxWidth = maxWidth + 40;
        const boxPosX = 400 - boxWidth / 2;
        const boxPosY = posY - 20;

        // Border voor de dialoogbox
        const borderBox = new Actor({
            pos: new Vector(650, boxPosY + boxHeight / 2),
            width: boxWidth + 6,
            height: boxHeight + 6,
            color: Color.White, // Achtergrondkleur wit
        });
        this.add(borderBox);

        // Dialoogbox
        const dialogueBox = new Actor({
            pos: new Vector(650, boxPosY + boxHeight / 2),
            width: boxWidth,
            height: boxHeight,
            color: Color.Black, // Achtergrondkleur zwart
        });
        this.add(dialogueBox);

        lines.forEach(line => {
            const dialogLabel = new Label({
                text: line,
                pos: new Vector(375, posY),
                font: new Font({
                    size: 20,
                    family: 'Arial',
                }),
                color: Color.White, // Tekstkleur wit
            });

            this.add(dialogLabel);
            posY += lineHeight;
        });
    }

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

    getTextWidth(text) {
        // Schatting van de breedte op basis van de lengte van de tekststring
        return text.length * 10; // Dit is een ruwe schatting, afhankelijk van de grootte van je lettertype
    }

    nextDialogue() {
        // Verwijder alle huidige dialoogactoren (behalve de naambox en het nameLabel)
        this.actors.forEach(actor => {
            if (actor !== this.nameBox && actor !== this.nameLabel) {
                actor.kill();
            }
        });
    
        // Ga naar de volgende dialoog als er nog dialogen zijn
        if (this.currentDialogueIndex < this.dialogues.length) {
            this.currentDialogueIndex++;
            this.createNameBox(); // Update de naambox voor de nieuwe dialoog
            this.showCurrentDialogue();
        } else {
            // Als er geen dialogen meer zijn, stop de event listener en ga naar de volgende scene ('map')
            this.engine.input.keyboard.off('press'); // Stop met luisteren naar toetsaanslagen
            this.engine.goToScene('map');
        }
    }
}
