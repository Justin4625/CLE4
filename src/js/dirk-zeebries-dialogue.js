import { Scene, Label, Color, Input, Font, Vector, Actor } from "excalibur";
import { Player } from "./player";

export class Drikdialogue extends Scene {
    constructor() {
        super();
        this.currentDialogueIndex = 0;
        this.choiceMade = false;
        this.dialogues = [
            { name: "Dirk Zeebries", text: "Yo, een reiziger! Kom dichterbij, man." },
            { name: "Dirk Zeebries", text: "Het lijkt erop dat je iets zoekt, nietwaar?" },
            { name: "Dirk Zeebries", text: "Yo, je hebt geluk dat je mij hebt gevonden." },
            { name: "Dirk Zeebries", text: "Ik ben Dirk Zeebries, kenner van de geheimen van dit bos." },
            { name: "Dirk Zeebries", text: "Yo, wat wil je weten, dude?" },
        ];
        this.respawnCoordinates = { x: 755, y: 1280 };
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
        const nameBoxPosX = 520 - nameBoxWidth / 2;

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
            "Yo Dirk, vertel me alles over dat water artifact.",
            "Yo, ben jij de baas van die mysterieuze waterkracht?",
            "Yo, heb je ooit een vis met een water artifact zien zwemmen?"
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
            { name: "Dirk Zeebries", text: "Yo, het water artifact, dat is een chill verhaal, man!" },
            { name: "Dirk Zeebries", text: "Luister goed, want dit is een verhaal dat teruggaat tot de tijd dat de wereld nog jong was." },
            { name: "Dirk Zeebries", text: "Het artifact werd gecreëerd door de oude watermagiërs, meesters van de elementaire krachten." },
            { name: "Dirk Zeebries", text: "Yo, zij putten hun energie uit de diepe wateren van de Kralingse Plas, waar het artifact tot op de dag van vandaag verborgen ligt, dude." },
            { name: "Dirk Zeebries", text: "Yo, het artifact zelf is gemaakt van een zeldzaam kristal, doordrenkt met de essentie van zuiver water." },
            { name: "Dirk Zeebries", text: "Die magiërs dachten dat dit kristal de kracht had om water te manipuleren en zelfs leven te schenken aan de dorre aarde." },
            { name: "Dirk Zeebries", text: "Maar yo, met zo'n kracht komt ook gevaar." },
            { name: "Dirk Zeebries", text: "Velen hebben geprobeerd het artifact te pakken te krijgen, maar slechts weinigen zijn geslaagd, man." },
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
            "Vergelijkbaar met Finding Nemo?",
            "Zijn er gevaren die dat artifact beschermen?",
            "Yo, wie heeft dat ding voor het laatst gezien?"
        ];

        this.showOptions(options, this.showDialogue3);
    }

    showDialogue3() {
        this.choiceMade = false;

        this.dialogues = [
            { name: "Dirk Zeebries", text: "Yo, inderdaad, de laatste persoon die het artifact heeft gezien, was een machtige magiër genaamd Elvira de Aquatische." },
            { name: "Dirk Zeebries", text: "Zij wist de ware potentie van het artifact te benutten en gebruikte het om haar volk te beschermen tegen een grote droogte." },
            { name: "Dirk Zeebries", text: "Maar yo, Elvira verdween op mysterieuze wijze, en met haar verdween ook het artifact." },
            { name: "Dirk Zeebries", text: "Sommigen zeggen dat ze is opgenomen in het water zelf, haar geest eeuwig verbonden met de Kralingse Plas, dude." },
            { name: "Dirk Zeebries", text: "Yo, wat betreft de gevaren, ja, die zijn er volop." },
            { name: "Dirk Zeebries", text: "Het artifact wordt bewaakt door oude beschermers, watergeesten die loyaler zijn dan de trouwste wachter." },
            { name: "Dirk Zeebries", text: "Yo, ze zullen alles doen om te voorkomen dat onwaardige handen het artifact bemachtigen." },
            { name: "Dirk Zeebries", text: "Er wordt gezegd dat de plas zelf je zal opslokken als je te dichtbij komt zonder de juiste voorbereidingen, man." },
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
            "Hoe kan ik me voorbereiden om dat artifact te vinden?",
            "Moet ik een snorkel meenemen?",
            "Zijn er aanwijzingen in het bos die naar dat artifact leiden?"
        ];

        this.showOptions(options, this.showDialogue4);
    }

    showDialogue4() {
        this.choiceMade = false;

        this.dialogues = [
            { name: "Dirk Zeebries", text: "Yo, voorbereiding is de sleutel, dude." },
            { name: "Dirk Zeebries", text: "Yo, maar pas op, niet alles is wat het lijkt in dit bos." },
            { name: "Dirk Zeebries", text: "De geesten van de plas kunnen je ook misleiden als ze denken dat je kwade bedoelingen hebt." },
            { name: "Dirk Zeebries", text: "Yo, wees respectvol en voorzichtig in je zoektocht, en misschien, heel misschien, zal het artifact zichzelf aan je onthullen, dude." },
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
            "Tijd om de golven te temmen, yo!",
            "Thanks, Dirk. Ik ga je advies volgen.",
            "Yo, dit klinkt als een avontuur dat ik niet kan missen."
        ];

        this.showOptions(options, this.showDialogue5);
        
    }

    showDialogue5() {
        this.choiceMade = false;

        this.dialogues = [
            { name: "Dirk Zeebries", text: "Yo, heel goed, reiziger. Moge de krachten van het water je leiden en beschermen." },
            { name: "Dirk Zeebries", text: "En vergeet niet, soms is het antwoord dat je zoekt dichterbij dan je denkt." },
            { name: "Dirk Zeebries", text: "Yo, het artifact wacht op degene die het waard is." },
            { name: "Dirk Zeebries", text: "Veel geluk, en moge de stroom je gunstig gezind zijn, man." },
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
                        this.endDialogueScene();
                    }
                }
            }
        });
    }

    endDialogueScene() {
        const player = new Player;
        player.pos.x = this.respawnCoordinates.x;
        player.pos.y = this.respawnCoordinates.y;
        
        this.engine.goToScene('map'); 
       
    }
}