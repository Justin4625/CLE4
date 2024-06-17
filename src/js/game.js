import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, TileMap } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Start } from './start'
import { Map } from './map'
import { Startdialogue } from './startdialogue.js'
import { End } from './end.js'

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
        this.add('startdialogue', new Startdialogue)
        this.add('map', new Map())
        this.add('end', new End)
        this.goToScene('map')
    }
}

const game = new Game()
