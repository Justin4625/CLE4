import { Scene, Label, Color, Input, Font, Vector, Actor } from "excalibur";
import { Player } from "./player";

export class Elaradialogue extends Scene {
    constructor() {
        super();
        this.currentDialogueIndex = 0;
        this.choiceMade = false;
        this.dialogues = [
            { name: "Elara Mystveil?", text: "Hé, jij daar! Mijn naam is Elara Mystveil..." },
            { name: "Elara Mystveil?", text: "Denk ik." },
            { name: "Elara Mystveil?", text: "Wat een toeval dat je hier bent." },
            { name: "Elara Mystveil?", text: "Ik bedoel, ik denk dat het toeval is." },
            { name: "Elara Mystveil?", text: "Of niet?" },
            { name: "Elara Mystveil?", text: "Wie weet." },
        ];
        this.respawnCoordinates = { x: 183, y: 526 }; 
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
        const nameBoxPosX = 540 - nameBoxWidth / 2;

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
            "Toeval is een vreemd iets. Soms vind ik koekjes in mijn zak waarvan ik zeker weet dat ik ze er niet gestopt heb.",
            "Misschien is het lot. Of gewoon een goede timing. Wie zal het zeggen?",
            "Ik ben hier eigenlijk omdat mijn kaart verdwaald is. Maar misschien is dat ook toeval."
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
            { name: "Elara Mystveil?", text: "Luister, ik heb gehoord dat je op zoek bent naar wat informatie over het Mystery Artifact, toch?" },
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
            "Eerlijk gezegd wist ik niet eens dat ik op zoek was, maar laten we gaan met 'ja'.",
            "Ja, ik zoek wat hints over dat mysterieuze ding.",
            "Inderdaad, ik probeer wat meer te weten te komen over dat Artifact."
        ];

        this.showOptions(options, this.showDialogue3);
    }

    showDialogue3() {
        this.choiceMade = false;

        this.dialogues = [
            { name: "Elara Mystveil?", text: "Het Mystery Artifact..." },
            { name: "Elara Mystveil?", text: "Het is best wel een raar ding." },
            { name: "Elara Mystveil?", text: "Weet je." },
            { name: "Elara Mystveil?", text: "En oud." },
            { name: "Elara Mystveil?", text: "Echt oud." },
            { name: "Elara Mystveil?", text: "Alsof het uit een tijd komt waar zelfs de bomen nog baby's waren." },
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
            "Raar en oud klinkt intrigerend. Heb je ooit een oudere boom dan een babyboom gezien?",
            "Oud en raar... net als mijn favoriete sokken. Maar laten we het hebben over dat Artifact.",
            "Ik heb altijd al een ding voor mysterieuze, oude voorwerpen gehad. Vertel me meer!"
        ];

        this.showOptions(options, this.showDialogue4);
    }

    showDialogue4() {
        this.choiceMade = false;

        this.dialogues = [
            { name: "Elara Mystveil?", text: "Eh ja oke." },
            { name: "Elara Mystveil?", text: "Dus, wat wil je weten?" },
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
            "Heeft het Artifact speciale eigenschappen waarvan we moeten weten?",
            "Waar werd het Mystery Artifact precies gevonden? Misschien moet ik daar eens gaan kijken.",
            "Vertel me, heeft het Mystery Artifact echt de kracht om de tijd te beïnvloeden?"
        ];

        this.showOptions(options, this.showDialogue5);
    }

    showDialogue5() {
        this.choiceMade = false;

        this.dialogues = [
            { name: "Elara Mystveil?", text: "Oh, wacht, voordat je begint..." },
            { name: "Elara Mystveil?", text: "Heb je ooit gemerkt hoe wolken soms lijken op draken?" },
            { name: "Elara Mystveil?", text: "Of ligt dat aan mij?" },
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
            "Drakenwolken? Misschien heb je gelijk. Maar laten we teruggaan naar het Mystery Artifact.",
            "Nu je het zegt, soms lijken ze inderdaad op draken. Misschien zijn het wel drakenwolken.",
            "Ik heb altijd gedacht dat ze meer op gigantische kippen leken, maar draken klinken cooler."
        ];

        this.showOptions(options, this.showDialogue6);
    }

    showDialogue6() {
        this.choiceMade = false;

        this.dialogues = [
            { name: "Elara Mystveil?", text: "Sorry, afdwalen." },
            { name: "Elara Mystveil?", text: "Dus, het Mystery Artifact." },
            { name: "Elara Mystveil?", text: "Ja, dat ding." },
            { name: "Elara Mystveil?", text: "Waar zal ik beginnen?" },
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
            "Ah, begin maar bij het begin. Hoe werd het Artifact ontdekt?",
            "Heb je zelf ooit interactie gehad met het Artifact?",
            "Vertel me meer over de krachten van het Mystery Artifact."
        ];

        this.showOptions(options, this.showDialogue7);
    }

    showDialogue7() {
        this.choiceMade = false;

        this.dialogues = [
            { name: "Elara Mystveil?", text: "Ah ja, ooit, lang geleden, toen de wereld nog jong was..." },
            { name: "Elara Mystveil?", text: "Of misschien niet zo jong," },
            { name: "Elara Mystveil?", text: "Wie weet eigenlijk," },
            { name: "Elara Mystveil?", text: "Werd het Mystery Artifact ontdekt door..." },
            { name: "Elara Mystveil?", text: "Eh, door iemand." },
            { name: "Elara Mystveil?", text: "Ja, door iemand met avontuurlijke handen" },
            { name: "Elara Mystveil?", text: "Denk ik." },
            { name: "Elara Mystveil?", text: "..." },
            { name: "Elara Mystveil?", text: "Het was een hele ontdekking, geloof me." },
            { name: "Elara Mystveil?", text: "Verborgen diep onder de wortels van een oude boom, in een grot vol..." },
            { name: "Elara Mystveil?", text: "Nou ja," },
            { name: "Elara Mystveil?", text: "Mysteries," },
            { name: "Elara Mystveil?", text: "Denk ik." },
            { name: "Elara Mystveil?", text: "..." },
            { name: "Elara Mystveil?", text: "Maar goed, genoeg over de ontdekking." },
            { name: "Elara Mystveil?", text: "Het belangrijkste is dat het ding krachten heeft." },
            { name: "Elara Mystveil?", text: "Grote, enge krachten." },
            { name: "Elara Mystveil?", text: "Soms denk ik dat het Artifact zelf niet eens weet wat het doet." },
            { name: "Elara Mystveil?", text: "Het ligt hier gewoon rond te hangen," },
            { name: "Elara Mystveil?", text: "Weet je," },
            { name: "Elara Mystveil?", text: "Alsof het wacht op een goede gelegenheid om iets te doen." },
            { name: "Elara Mystveil?", text: "Heb je ooit iets gehad dat gewoon..." },
            { name: "Elara Mystveil?", text: "Rondhangt en wacht?" },
            { name: "Elara Mystveil?", text: "Nee?" },
            { name: "Elara Mystveil?", text: "Misschien ben ik gewoon raar." },
            { name: "Elara Mystveil?", text: "..." },
            { name: "Elara Mystveil?", text: "Hoe dan ook, mensen zeggen dat het Mystery Artifact mysterieuze dingen kan doen." },
            { name: "Elara Mystveil?", text: "Zoals de tijd buigen, de ruimte verdraaien, en misschien zelfs je sokken laten verdwijnen als je niet oppast." },
            { name: "Elara Mystveil?", text: "Maar wie gelooft er nu in legendes, toch?" },
            { name: "Elara Mystveil?", text: "Dus ja, dat is het verhaal van het Mystery Artifact." },
            { name: "Elara Mystveil?", text: "Spannend, hè?" },
            { name: "Elara Mystveil?", text: "Oh kijk..." },
            { name: "Elara Mystveil?", text: "Een eekhoorn!" },
            { name: "Elara Mystveil?", text: "Waar waren we ook alweer?" },
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
                        this.showChoiceOptions7();
                    }
                }
            }
        });
    }

    showChoiceOptions7() {
        this.removeDialogues();

        const options = [
            "We waren verdwaald in het verhaal van het Mystery Artifact, geloof ik.",
            "Ik denk dat we bij het deel waren waar je mysterieus verdwijnt, toch?",
            "Eekhoorns zijn echt meesters in het verstoren van gesprekken, nietwaar?"
        ];

        this.showOptions(options, this.showDialogue8);
    }

    showDialogue8() {
        this.choiceMade = false;

        this.dialogues = [
            { name: "Elara Mystveil?", text: "Hoe dan ook, als je nog meer wilt weten..." },
            { name: "Elara Mystveil?", text: "Nou ja..." },
            { name: "Elara Mystveil?", text: "dan moet je maar verder zoeken." },
            { name: "Elara Mystveil?", text: "Of niet." },
            { name: "Elara Mystveil?", text: "Het is jouw avontuur, toch?" },
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
                        this.showChoiceOptions8();
                    }
                }
            }
        });
    }

    showChoiceOptions8() {
        this.removeDialogues();

        const options = [
            "Misschien kom ik je later weer tegen. Bedankt voor je hulp, Elara!",
            "Ik denk dat ik verder op onderzoek ga. Bedankt voor alle info!",
            "Ik zal zeker verder op ontdekking gaan. Tot ziens, Elara!"
        ];

        this.showOptions(options, this.showDialogue9);
    }

    showDialogue9() {
        this.choiceMade = false;

        this.dialogues = [
            { name: "Elara Mystveil?", text: "Nou, ik denk dat ik maar weer eens verdwijn, net als die eekhoorn." },
            { name: "Elara Mystveil?", text: "Misschien kom ik je later weer tegen," },
            { name: "Elara Mystveil?", text: "Wie weet?" },
            { name: "Elara Mystveil?", text: "Dag, avonturier!" },
            { name: "Elara Mystveil?", text: "En..." },
            { name: "Elara Mystveil?", text: "Eh..." },
            { name: "Elara Mystveil?", text: "Veel succes..." },
            { name: "Elara Mystveil?", text: "Denk ik..." },
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
        
        this.engine.input.keyboard.off('press');
        this.engine.goToScene('map'); 
       
    }
    
}