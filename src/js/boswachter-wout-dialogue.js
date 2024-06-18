import { Scene, Label, Color, Input, Font, Vector, Actor } from "excalibur";

export class Woutdialogue extends Scene {
    constructor() {
        super();
        this.currentDialogueIndex = 0;
        this.choiceMade = false;
        this.dialogues = [
            { name: "Wout de Boswachter", text: "Ah, daar ben je! Welkom in het Kralingse Bos. Dit is een plek vol wonderen en mysteries. Heb je ooit gehoord van het Earth Artifact?" },
        ];
    }

    onInitialize(engine) {
        super.onInitialize(engine);
        this.showCurrentDialogue();

        engine.input.keyboard.on('press', (evt) => {
            if (evt.key === Input.Keys.Space) {
                if (this.currentDialogueIndex < this.dialogues.length - 1) {
                    this.nextDialogue();
                } else {
                    this.removeDialogues();
                    if (!this.choiceMade) {
                        this.showChoiceOptions();
                    }
                }
            }
        });
    }

    createDialogueBox(text, name) {
        const maxWidth = 600;
        const lines = this.splitTextIntoLines(text, maxWidth);

        let posY = 550;
        const lineHeight = 25;
        const boxHeight = lines.length * lineHeight + 40;
        const boxWidth = maxWidth + 40;
        const boxPosY = posY - 20;

        const borderBox = new Actor({
            pos: new Vector(650, boxPosY + boxHeight / 2),
            width: boxWidth + 6,
            height: boxHeight + 6,
            color: Color.White,
        });
        this.add(borderBox);

        const dialogueBox = new Actor({
            pos: new Vector(650, boxPosY + boxHeight / 2),
            width: boxWidth,
            height: boxHeight,
            color: Color.Black,
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
                color: Color.White,
            });
            this.add(dialogLabel);
            posY += lineHeight;
        });

        this.createNameBox(name);
    }

    createNameBox(name) {
        if (this.nameBox) this.nameBox.kill();
        if (this.nameLabel) this.nameLabel.kill();

        const nameBoxWidth = name.length * 11 + 20;
        const nameBoxPosX = 575 - nameBoxWidth / 2;

        const nameBoxBorder = new Actor({
            pos: new Vector(nameBoxPosX, 507),
            width: nameBoxWidth + 6,
            height: 46,
            color: Color.White,
        });
        this.add(nameBoxBorder);

        this.nameBox = new Actor({
            pos: new Vector(nameBoxPosX, 507),
            width: nameBoxWidth,
            height: 40,
            color: Color.Black,
        });
        this.add(this.nameBox);

        this.nameLabel = new Label({
            text: name,
            pos: new Vector(375, 497),
            font: new Font({
                size: 20,
                family: 'Arial',
            }),
            color: Color.White,
        });
        this.add(this.nameLabel);
    }

    showCurrentDialogue() {
        this.removeDialogues();
        const currentDialogue = this.dialogues[this.currentDialogueIndex];
        this.createDialogueBox(currentDialogue.text, currentDialogue.name);
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
        return text.length * 10;
    }

    nextDialogue() {
        if (this.currentDialogueIndex < this.dialogues.length - 1) {
            this.currentDialogueIndex++;
            this.showCurrentDialogue();
        } else {
            const newDialoguesAdded = this.dialogues.length > this.currentDialogueIndex + 1;
            if (!newDialoguesAdded) {
                if (!this.choiceMade) {
                    this.showChoiceOptions();
                }
                this.removeDialogues();
            }
        }
    }

    showChoiceOptions() {
        this.removeDialogues();

        const options = [
            "Ja, ik heb erover gelezen! Vertel me er meer over.",
            "Nee, wat is dat precies?",
            "Huh wat? Aardappelgratin?"
        ];

        this.showOptions(options, this.showDialogue2);
    }

    showOptions(options, callback) {
        let posY = 500;
        const lineHeight = 25;
        const maxWidth = 600;
        const borderWidth = 2;
        const padding = 10;

        options.forEach((option, index) => {
            let optionText = `${index + 1}. `;

            if (index === 1 || index === 2 || index === 3) {
                optionText += this.wrapText(option, maxWidth);
            } else {
                optionText += option;
            }

            const textHeight = this.getTextHeight(optionText, maxWidth);

            const optionBox = new Actor({
                pos: new Vector(375, posY + textHeight / 2),
                width: maxWidth + padding * 2,
                height: textHeight + padding * 2,
                color: Color.Black,
            });

            const border = new Actor({
                pos: new Vector(650, posY + textHeight / 2),
                width: maxWidth + padding * 2 + borderWidth * 2,
                height: textHeight + padding * 2 + borderWidth * 2,
                color: Color.White,
                anchor: Vector.Half,
            });

            const optionBackground = new Actor({
                pos: new Vector(650, posY + textHeight / 2),
                width: maxWidth + padding * 2,
                height: textHeight + padding * 2,
                color: Color.Black,
            });

            const optionLabel = new Label({
                text: optionText,
                pos: new Vector(375, posY),
                font: new Font({
                    size: 20,
                    family: 'Arial',
                }),
                color: Color.White,
            });

            optionLabel.on('pointerdown', () => {
                this.removeDialogues();
                this.choiceMade = true;
                callback.call(this);
            });

            this.add(border);
            this.add(optionBackground);
            this.add(optionLabel);
            posY += textHeight + padding * 2 + borderWidth * 2;
        });
    }

    wrapText(text, maxWidth) {
        const words = text.split(' ');
        let currentLine = '';
        let wrappedText = [];
        words.forEach(word => {
            if (this.getTextWidth(currentLine + ' ' + word) < maxWidth) {
                currentLine += ' ' + word;
            } else {
                wrappedText.push(currentLine);
                currentLine = word;
            }
        });
        wrappedText.push(currentLine);
        return wrappedText.join('\n');
    }

    getTextHeight(text, maxWidth) {
        const lines = text.split('\n');
        const lineHeight = 25;
        return lines.length * lineHeight;
    }

    removeDialogues() {
        this.actors.forEach(actor => {
            actor.kill();
        });
    }

    showDialogue2() {
        this.choiceMade = false;

        this.dialogues = [
            { name: "Wout de Boswachter", text: "Het Earth Artifact is een eeuwenoud voorwerp, doordrenkt met de krachten van de aarde zelf." },
            { name: "Wout de Boswachter", text: "Het wordt gezegd dat het werd gemaakt door een oude beschaving die hier lang geleden woonde." },
            { name: "Wout de Boswachter", text: "Deze mensen waren diep verbonden met de natuur en gebruikten het artifact om de balans en harmonie van het bos te bewaren." },
            { name: "Wout de Boswachter", text: "Lang geleden, toen de mensen van deze beschaving merkten dat hun krachten afnamen, besloten ze hun kennis en magie op te sluiten in het Earth Artifact." },
            { name: "Wout de Boswachter", text: "Ze geloofden dat alleen degenen die waardig en in harmonie met de natuur waren, het zouden kunnen gebruiken." },
        ];
        this.currentDialogueIndex = 0;
        this.showCurrentDialogue();

        // Verwijder eerst alle vorige event listeners
        this.engine.input.keyboard.off('press'); // Verwijder alle vorige keyboard event listeners

        // Voeg een nieuwe event listener toe
        this.engine.input.keyboard.on('press', (evt) => {
            if (evt.key === Input.Keys.Space) {
                if (this.currentDialogueIndex < this.dialogues.length - 1) {
                    this.nextDialogue();
                } else {
                    if (!this.choiceMade) {
                        this.showChoiceOptions2(); // Ga naar showChoiceOptions3 na het tonen van dialogen in showDialogue2
                    }
                }
            }
        });
    }



    showChoiceOptions2() {
        this.removeDialogues();

        const options = [
            "Hoe kon deze beschaving zo’n krachtige artefact maken?",
            "Dus een steen met glitters?",
            "Wat gebeurde er met de beschaving die het maakte?"
        ];

        this.showOptions(options, this.showDialogue3);
    }

    showDialogue3() {
        this.choiceMade = false;

        this.dialogues = [
            { name: "Wout de Boswachter", text: "Deze beschaving was heel speciaal." },
            { name: "Wout de Boswachter", text: "Ze hadden een diep begrip van de natuur en haar krachten." },
            { name: "Wout de Boswachter", text: "Ze werkten samen met de elementen, gebruikten oude rituelen en kennis die nu verloren is gegaan." },
            { name: "Wout de Boswachter", text: "Het artifact was hun meesterwerk, een symbool van hun verbinding met de aarde." },
            { name: "Wout de Boswachter", text: "Helaas, zoals bij veel oude beschavingen, ging hun kennis verloren door de tijd." },
            { name: "Wout de Boswachter", text: "Sommigen zeggen dat ze werden opgeslokt door de natuur zelf, anderen geloven dat ze eenvoudigweg verdwenen." },
            { name: "Wout de Boswachter", text: "Maar hun nalatenschap leeft voort in het Earth Artifact." },
        ];
        this.currentDialogueIndex = 0;
        this.showCurrentDialogue();

        this.engine.input.keyboard.off('press'); // Verwijder alle vorige keyboard event listeners

        // Check if all dialogues have been shown before displaying additional choice options
        this.engine.input.keyboard.on('press', (evt) => {
            if (evt.key === Input.Keys.Space) {
                if (this.currentDialogueIndex < this.dialogues.length - 1) {
                    this.nextDialogue();
                } else {
                    if (!this.choiceMade) {
                        this.showChoiceOptions3();
                    }
                }
            }
        });
    }

    showChoiceOptions3() {
        this.removeDialogues();

        const options = [
            "Wat kan het artifact precies doen?",
            "Is het te koop op Ebay?",
            "Zijn er legenden over mensen die het artifact gebruikten?"
        ];

        this.showOptions(options, this.showDialogue4);
    }

    showDialogue4() {
        this.choiceMade = false;

        this.dialogues = [
            { name: "Wout de Boswachter", text: "Het Earth Artifact heeft de kracht om het evenwicht in de natuur te herstellen." },
            { name: "Wout de Boswachter", text: "Het kan gewassen laten groeien, ziektes genezen en zelfs het weer beïnvloeden." },
            { name: "Wout de Boswachter", text: "Maar de kracht komt niet zonder verantwoordelijkheid." },
            { name: "Wout de Boswachter", text: "Alleen degenen die pure intenties hebben en het welzijn van het bos vooropstellen, kunnen de volledige kracht van het artifact benutten." },
            { name: "Wout de Boswachter", text: "Er zijn verhalen van mensen die hebzuchtig waren en het artifact voor hun eigen gewin wilden gebruiken." },
            { name: "Wout de Boswachter", text: "Ze werden altijd afgestraft door de krachten van de natuur zelf." },
            { name: "Wout de Boswachter", text: "Het is een krachtige herinnering dat we respect moeten hebben voor de aarde en alles wat ze ons geeft." },
        ];
        this.currentDialogueIndex = 0;
        this.showCurrentDialogue();

        this.engine.input.keyboard.off('press'); // Verwijder alle vorige keyboard event listeners

        // Check if all dialogues have been shown before displaying additional choice options
        this.engine.input.keyboard.on('press', (evt) => {
            if (evt.key === Input.Keys.Space) {
                if (this.currentDialogueIndex < this.dialogues.length - 1) {
                    this.nextDialogue();
                } else {
                    if (!this.choiceMade) {
                        this.showChoiceOptions4();
                    }
                }
            }
        });
    }

    showChoiceOptions4() {
        this.removeDialogues();

        const options = [
            "Ik ben een bomenknuffelaar, is dat goed genoeg?",
            "Zijn er recentelijk nog mensen geweest die het geprobeerd hebben?",
            "Hoe weet je of iemand waardig is om het artifact te gebruiken?"
        ];

        this.showOptions(options, this.showDialogue5);
    }

    showDialogue5() {
        this.choiceMade = false;

        this.dialogues = [
            { name: "Wout de Boswachter", text: "Dat is een goede vraag." },
            { name: "Wout de Boswachter", text: "Er zijn oude rituelen en proeven die men moet doorstaan om de waardigheid te bewijzen." },
            { name: "Wout de Boswachter", text: "Deze rituelen zijn zorgvuldig bewaard gebleven door de boswachters en wijzen van het Kralingse Bos." },
            { name: "Wout de Boswachter", text: "Alleen zij kennen de geheimen en kunnen de testen afnemen." },
            { name: "Wout de Boswachter", text: "En ja, er zijn inderdaad mensen geweest die het geprobeerd hebben." },
            { name: "Wout de Boswachter", text: "Sommigen van hen hebben hun leven gewijd aan het beschermen van het bos, terwijl anderen faalden en de kracht van het artifact niet konden bevatten." },
            { name: "Wout de Boswachter", text: "Het blijft een mysterie wie echt waardig zal zijn." },
        ];
        this.currentDialogueIndex = 0;
        this.showCurrentDialogue();

        this.engine.input.keyboard.off('press'); // Verwijder alle vorige keyboard event listeners

        // Check if all dialogues have been shown before displaying additional choice options
        this.engine.input.keyboard.on('press', (evt) => {
            if (evt.key === Input.Keys.Space) {
                if (this.currentDialogueIndex < this.dialogues.length - 1) {
                    this.nextDialogue();
                } else {
                    if (!this.choiceMade) {
                        this.showChoiceOptions5();
                    }
                }
            }
        });
    }

    showChoiceOptions5() {
        this.removeDialogues();

        const options = [
            "Denk je dat ik het kan proberen?",
            "Hoe word ik een van die beschermers van het bos?",
            "Nog waardiger dan ik al ben?"
        ];

        this.showOptions(options, this.showDialogue6);
    }

    showDialogue6() {
        this.choiceMade = false;

        this.dialogues = [
            { name: "Wout de Boswachter", text: "Wie weet? Misschien zit het lot wel in jouw handen." },
            { name: "Wout de Boswachter", text: "Maar onthoud, het gaat niet om de kracht, maar om de intentie waarmee je handelt." },
            { name: "Wout de Boswachter", text: "Als je echt het bos en de natuur wilt beschermen, zou je wel eens waardig kunnen zijn." },
            { name: "Wout de Boswachter", text: "Het begint allemaal met respect en liefde voor de natuur." },
            { name: "Wout de Boswachter", text: "Door te zorgen voor het bos, de dieren en alles wat hierin leeft, bewijs je je waarde." },
            { name: "Wout de Boswachter", text: "Wie weet, misschien zal het Earth Artifact op een dag voor je openen en je zijn geheimen onthullen." },
        ];
        this.currentDialogueIndex = 0;
        this.showCurrentDialogue();

        this.engine.input.keyboard.off('press'); // Verwijder alle vorige keyboard event listeners

        // Check if all dialogues have been shown before displaying additional choice options
        this.engine.input.keyboard.on('press', (evt) => {
            if (evt.key === Input.Keys.Space) {
                if (this.currentDialogueIndex < this.dialogues.length - 1) {
                    this.nextDialogue();
                } else {
                    if (!this.choiceMade) {
                        this.showChoiceOptions6();
                    }
                }
            }
        });
    }

    showChoiceOptions6() {
        this.removeDialogues();

        const options = [
            "Dank je, Wout. Ik zal mijn best doen!",
            "Weet je, ik denk dat bomen echt mijn vrienden zijn.",
            "Ik ben klaar voor het avontuur. Waar moet ik beginnen?"
        ];

        this.showOptions(options, this.showDialogue7);
    }

    showDialogue7() {
        this.choiceMade = false;

        this.dialogues = [
            { name: "Wout de Boswachter", text: "Dat is de geest! Ga, ontdek en bescherm." },
            { name: "Wout de Boswachter", text: "Het Kralingse Bos heeft altijd behoefte aan meer dappere zielen zoals jij." },
            { name: "Wout de Boswachter", text: "Vergeet niet, de natuur is je bondgenoot en zal je leiden op je pad." },
            { name: "Wout de Boswachter", text: "Veel succes, en moge het Earth Artifact ooit zijn geheimen aan je onthullen." },
        ];
        this.currentDialogueIndex = 0;
        this.showCurrentDialogue();

        this.engine.input.keyboard.off('press'); // Verwijder alle vorige keyboard event listeners

        // Check if all dialogues have been shown before displaying additional choice options
        this.engine.input.keyboard.on('press', (evt) => {
            if (evt.key === Input.Keys.Space) {
                if (this.currentDialogueIndex < this.dialogues.length - 1) {
                    this.nextDialogue();
                } else {
                    if (!this.choiceMade) {
                        this.showChoiceOptions6();
                    }
                }
            }
        });
    }
}