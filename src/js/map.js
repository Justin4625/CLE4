import { Scene } from "excalibur";
import { Startdialogue } from "./startdialogue"; // Zorg ervoor dat het juiste pad is ingesteld naar Startdialogue

export class Map extends Scene {

    onInitialize(engine) {
        console.log("start de game!");

        // Start gelijk de dialoog wanneer de Map scene wordt geïnitialiseerd
        this.startDialogue(engine);
    }
    
    startDialogue(engine) {
        // Maak een instantie van de Startdialogue scene en laad deze gelijk
        const startDialogueScene = new Startdialogue();
        engine.addScene("startDialogue", startDialogueScene);
        engine.goToScene("startDialogue");
    }
}
