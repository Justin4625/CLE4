import { Scene, Label, Color, Input, Font, Vector, Actor, Sprite, Buttons } from "excalibur";
import { Resources } from "./resources";

export class Startdialogue extends Scene {
    constructor() {
        super();
        this.currentDialogueIndex = 0;
        this.bg = null; // Initialize bg as null

        const startDialogueScreen = new Sprite({
            image: Resources.Startdialogue,
            destSize: { width: 1280, height: 720 }
        });

        // Create bg in constructor, but do not declare it as a const or let again
        this.bg = new Actor({
            pos: new Vector(640, 360),
            width: 1280,
            height: 720
        });
        this.bg.graphics.use(startDialogueScreen);
        this.add(this.bg); // Add the background to the scene

        // Calculate the deadline time (10 minutes from now)
        const currentTime = new Date();
        const deadline = new Date(currentTime.getTime() + 10 * 60000);
        const hours = String(deadline.getHours()).padStart(2, '0');
        const minutes = String(deadline.getMinutes()).padStart(2, '0');
        this.deadlineTime = `${hours}:${minutes}`;

        this.dialogues = [
            { name: "Mysterieuze Stem", text: "Hier ben ik, in de wind die fluistert, in het water dat stroomt... Jij bent uitverkoren." },
            { name: "Mysterieuze Stem", text: "Je bent gekomen omdat je geroepen werd. Er rust een taak op jouw schouders, een taak van groot belang." },
            { name: "Mysterieuze Stem", text: "Je moet vier artefacten vinden, verborgen rondom deze wateren en bossen. Ze zijn sleutels tot het voorkomen van het einde." },
            { name: "Mysterieuze Stem", text: "Je zult begrijpen wanneer de tijd rijp is. Vind het, en de weg zal zich vervolgen." },
            { name: "Mysterieuze Stem", text: "Die antwoorden komen als je gehoor geeft aan de roep van het onbekende." },
            { name: "Mysterieuze Stem", text: `Het einde zal zich ergens plaatsvinden rond ${this.deadlineTime}. Dus ongeveer 10 minuten vanaf nu.` },
            { name: "Mysterieuze Stem", text: "(Note: dialogue neemt geen tijd in beslag)" },
            { name: "Mysterieuze Stem", text: "Ga reiziger, ontdek en voorkom het einde." },
        ];

        // Background image setup
        this.startDialogueScreen = new Sprite({
            image: Resources.Startdialogue,
            destSize: { width: 1280, height: 720 }
        });

        const bg = new Actor({
            pos: new Vector(640, 360),
            width: 1280,
            height: 720
        });
        bg.graphics.use(this.startDialogueScreen);
        this.add(bg);
    }

    onInitialize(engine) {
        super.onInitialize(engine);

        this.engine = engine;
        this.createNameBox();
        this.showCurrentDialogue();

        console.log(this.engine)

        engine.input.keyboard.on('press', (evt) => {
            if (evt.key === Input.Keys.Space) {
                this.nextDialogue();
            }
        });
    }
    onPreUpdate(engine, delta) {
        super.onPreUpdate(engine, delta);

        const gamepad = engine.input.gamepads.at(0); // Assume single player and get the first gamepad

        if (gamepad) {
            // X button is typically button 2 on most gamepads
            if (gamepad.isButtonPressed(Input.Buttons.Face1) && !this.gamepadCooldown) {
                this.nextDialogue();
                this.gamepadCooldown = true;
                setTimeout(() => { this.gamepadCooldown = false; }, 400); // 200ms cooldown
            }
        }
    }

    createNameBox() {
        // Remove existing name box and label if they exist
        if (this.nameBox) this.nameBox.kill();
        if (this.nameLabel) this.nameLabel.kill();

        const name = this.dialogues[this.currentDialogueIndex].name;

        // Border for the name box (white), added after the background
        const nameBoxBorder = new Actor({
            pos: new Vector(450, 510), // Adjusted position for the name box
            width: name.length * 11 + 26, // Width based on the length of the name and the border
            height: 46, // Height of the box for the name including the border
            color: Color.White, // Border color white
        });
        this.add(nameBoxBorder);

        // Background box for the name (black), added on top of the border
        this.nameBox = new Actor({
            pos: new Vector(450, 510), // Adjusted position for the name box
            width: name.length * 11 + 20, // Width based on the length of the name
            height: 40, // Height of the box for the name
            color: Color.Black, // Background color black
        });
        this.add(this.nameBox);

        // Label for the name of the speaker
        this.nameLabel = new Label({
            text: name,
            pos: new Vector(375, 500), // Adjusted position for the name
            font: new Font({
                size: 20,
                family: 'Arial',
            }),
            color: Color.White, // Text color white
        });
        this.add(this.nameLabel);
    }

    showCurrentDialogue() {
        const currentDialogue = this.dialogues[this.currentDialogueIndex];
        const text = currentDialogue.text;

        const maxWidth = 600; // Maximum width of the sentence
        const lines = this.splitTextIntoLines(text, maxWidth);

        let posY = 550; // Position of the first dialogue line
        const lineHeight = 25;

        const boxHeight = lines.length * lineHeight + 40;
        const boxWidth = maxWidth + 40;
        const boxPosX = 400 - boxWidth / 2;
        const boxPosY = posY - 20;

        // Border for the dialogue box
        const borderBox = new Actor({
            pos: new Vector(650, boxPosY + boxHeight / 2),
            width: boxWidth + 6,
            height: boxHeight + 6,
            color: Color.White, // Background color white
        });
        this.add(borderBox);

        // Dialogue box
        const dialogueBox = new Actor({
            pos: new Vector(650, boxPosY + boxHeight / 2),
            width: boxWidth,
            height: boxHeight,
            color: Color.Black, // Background color black
        });
        this.add(dialogueBox);

        lines.forEach(line => {
            // If the line contains the deadline, split it into parts
            if (line.includes(this.deadlineTime)) {
                const parts = line.split(this.deadlineTime);
                const beforeDeadline = parts[0];
                const afterDeadline = parts[1];

                const dialogLabelBefore = new Label({
                    text: beforeDeadline,
                    pos: new Vector(375, posY),
                    font: new Font({
                        size: 20,
                        family: 'Arial',
                    }),
                    color: Color.White, // Text color white
                });

                const dialogLabelDeadline = new Label({
                    text: this.deadlineTime,
                    pos: new Vector(768, posY),
                    font: new Font({
                        size: 20,
                        family: 'Arial',
                    }),
                    color: Color.Red, // Text color red for deadline
                });

                const dialogLabelAfter = new Label({
                    text: afterDeadline,
                    pos: new Vector(817, posY),
                    font: new Font({
                        size: 20,
                        family: 'Arial',
                    }),
                    color: Color.White, // Text color white
                });

                this.add(dialogLabelBefore);
                this.add(dialogLabelDeadline);
                this.add(dialogLabelAfter);
            } else {
                const dialogLabel = new Label({
                    text: line,
                    pos: new Vector(375, posY),
                    font: new Font({
                        size: 20,
                        family: 'Arial',
                    }),
                    color: Color.White, // Text color white
                });

                this.add(dialogLabel);
            }
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
        // Estimate the width based on the length of the text string
        return text.length * 10; // This is a rough estimate, depending on your font size
    }

    nextDialogue() {
        this.actors.forEach(actor => {
            if (actor !== this.nameBox && actor !== this.nameLabel && actor !== this.bg) {
                actor.kill();
            }
        });

        this.currentDialogueIndex++;
        if (this.currentDialogueIndex < this.dialogues.length) {
            this.createNameBox();
            this.showCurrentDialogue();
        } else {
            this.engine.input.keyboard.off('press');
            this.engine.goToScene('map');
        }
    }
}
