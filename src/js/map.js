import { Loader, Scene } from "excalibur";
import { Startdialogue } from "./startdialogue"; // Zorg ervoor dat het juiste pad is ingesteld naar Startdialogue
import { TiledResource } from "@excaliburjs/plugin-tiled";

export class Map extends Scene {

    constructor() {
        super()
    }

    onInitialize(engine) {
        console.log("start de game!");

        // Start gelijk de dialoog wanneer de Map scene wordt geïnitialiseerd
        this.startDialogue(engine);
        // const tilemap = new TiledResource('./path/to/map.tmx');
        // const loader = new Loader([tilemap]);

        // Map.start(loader).then(() => {
        //     tilemap.addToScene(game.currentScene);
        // });
    }

    startDialogue(engine) {
        // Maak een instantie van de Startdialogue scene en laad deze gelijk
        const startDialogueScene = new Startdialogue();
        engine.addScene("startDialogue", startDialogueScene);
        engine.goToScene("startDialogue");

        this.spawnMap();
    }

    spawnMap() {
        console.log('Je bent nu in de map scene');
    }
}
