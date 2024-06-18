import { Scene, Label, Color, Input, Font, Vector, Actor } from "excalibur";

export class Lithorockdialogue extends Scene {
    constructor() {
        super();
        this.currentDialogueIndex = 0;
        this.choiceMade = false;
        this.dialogues = [
            { name: "Lithorock", text: "Ah, een avonturier! Welkom in het Kralingse Bos." },
            { name: "Lithorock", text: "Mijn naam is Lithorck. Wat brengt je hier vandaag?" },
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
        const nameBoxPosX = 475 - nameBoxWidth / 2;

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
            "Ik ben op zoek naar informatie over het stone artifact.",
            "Mooie plek hier, maar ik hoorde dat je iets weet over een speciaal artefact?",
            "Hoi! Heb je toevallig een steenrijke tip voor mij?"
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

            if (index === 0 || index === 1 || index === 2) {
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
            { name: "Lithorock", text: "Een goede vraag! Je bent vast geïnteresseerd in het stone artifact, nietwaar?" },
            { name: "Lithorock", text: "Het is een fascinerend onderwerp. Laten we eens diep in de geschiedenis duiken, net zoals je een schat zou opgraven." },
            { name: "Lithorock", text: "En zeg eens, waarom zijn rotsen zo goed in wiskunde?" },
            { name: "Lithorock", text: "Ze hebben altijd de juiste 'angle'!" },
            { name: "Lithorock", text: "Lang geleden, in de vroege dagen van deze regio, toen het Kralingse Bos nog jong was en de bomen zich uitstrekten als de armen van reuzen, leefde er een stam van bekwame steenbewerkers." },
            { name: "Lithorock", text: "Ze geloofden dat elke steen een ziel had en dat sommige stenen magische krachten bezaten." },
            { name: "Lithorock", text: "Ze noemden deze bijzondere stenen levensstenen." },
            { name: "Lithorock", text: "De stam ontdekte een enorm rotsblok aan de oever van de Kralingse Plas." },
            { name: "Lithorock", text: "Het was geen gewone steen; het had een vreemde, bijna etherische gloed." },
            { name: "Lithorock", text: "Ze besloten dat deze steen iets speciaals moest zijn, een geschenk van de aarde zelf." },
            { name: "Lithorock", text: "Ze begonnen het rotsblok zorgvuldig te bewerken, met rituelen en gebeden, en na jaren van toewijding ontstond het stone artifact." },
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
            "Als ze die steen verkeerd hakte, hadden ze dan rotsen in hun maag?",
            "Dat klinkt ongelooflijk! Wat voor rituelen voerden ze uit?",
            "Wacht even, je zegt dat stenen zielen hebben? Hoe werkt dat precies?"
        ];

        this.showOptions(options, this.showDialogue3);
    }

    showDialogue3() {
        this.choiceMade = false;

        this.dialogues = [
            { name: "Lithorock", text: "Rituelen die dagen duurden!" },
            { name: "Lithorock", text: "Ze geloofden dat door te zingen en te dansen rond de steen, ze de geest van de steen konden oproepen en zijn magische krachten konden activeren." },
            { name: "Lithorock", text: "Er werd gezegd dat het artefact voorspellende krachten had, en dat het de stam kon beschermen tegen kwade geesten en rampen." },
            { name: "Lithorock", text: "En weet je waarom ze de steen nooit kwijtraakten?" },
            { name: "Lithorock", text: "Hij was altijd rotsvast op zijn plaats!" },
            { name: "Lithorock", text: "De stamhoofden gebruikten het artefact tijdens belangrijke ceremonies." },
            { name: "Lithorock", text: "Ze hielden het vast en er werd gezegd dat het hen visioenen gaf van de toekomst." },
            { name: "Lithorock", text: "De legende vertelt dat toen een grote vloed dreigde, de stam het artefact raadpleegde en zo op tijd wist te evacueren." },
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
            "Heeft iemand ooit geprobeerd het artefact te stelen?",
            "Stel je voor, een steen die je toekomst kan vertellen! Dat is pas een rotsvast verhaal.",
            "Fascinerend! Wat is er uiteindelijk met de stam en het artefact gebeurd?"
        ];

        this.showOptions(options, this.showDialogue4);
    }

    showDialogue4() {
        this.choiceMade = false;

        this.dialogues = [
            { name: "Lithorock", text: "Na vele jaren van voorspoed gebeurde er iets onverwachts." },
            { name: "Lithorock", text: "Een rivaliserende stam, jaloers op de macht en rijkdom die het artefact bracht, probeerde het te stelen." },
            { name: "Lithorock", text: "Nu wacht het op iemand die het waardig is om zijn krachten opnieuw te ontketenen." },
            { name: "Lithorock", text: "De oorspronkelijke stam verdween langzaam, verslagen en zonder hun kostbare artefact." },
            { name: "Lithorock", text: "Maar hun verhalen leven voort, en de magie van de steen wordt nog steeds gevreesd en gerespecteerd." },
            { name: "Lithorock", text: "En weet je wat ze zeggen over het artefact?" },
            { name: "Lithorock", text: "Het is geen gewoon verhaal, het is steen voor steen opgebouwd!" },
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
            "Wat een verhaal! Denk je dat het artefact nog steeds kracht heeft?",
            "Heb je ooit iemand ontmoet die beweert het artefact te hebben gezien?",
            "Dus ik kan een steengoed souvenir vinden?"
        ];

        this.showOptions(options, this.showDialogue5);
    }

    showDialogue5() {
        this.choiceMade = false;

        this.dialogues = [
            { name: "Lithorock", text: "Misschien wel! Het zou een zeer speciaal souvenir zijn, dat kan ik je verzekeren." },
            { name: "Lithorock", text: "Wat betreft de kracht van het artefact, wie weet?" },
            { name: "Lithorock", text: "Magie is een vreemd en mysterieus iets. Het kan sluimeren, wachtend op de juiste persoon om het weer te wekken." },
            { name: "Lithorock", text: "En ja, er zijn altijd verhalen van mensen die zeggen dat ze iets ongewoons hebben gezien in de plas, maar bewijs is er nooit." },
            { name: "Lithorock", text: "Misschien ben jij degene die het artefact zal vinden en zijn geheimen zal onthullen." },
            { name: "Lithorock", text: "Vergeet niet, als je de plas ingaat: blijf altijd rotsvast op je voeten!" },
            { name: "Lithorock", text: "Dus, als je ooit een steentje in je schoen voelt terwijl je in het bos wandelt, wees niet boos." },
            { name: "Lithorock", text: "Het zou wel eens het begin kunnen zijn van een groot avontuur." },
            { name: "Lithorock", text: "En vergeet niet: zelfs de kleinste steen kan de grootste rimpelingen veroorzaken." },
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
}