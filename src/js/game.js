import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, TileMap } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Start } from './start'
import { Map } from './map'

export class Game extends Engine {

    constructor() {
        super({ 
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
         })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        this.add('start', new Start())
        this.add('map', new Map())
        this.goToScene('start')
    }
}

const game = new Game()
