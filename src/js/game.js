import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, TileMap } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Start } from './start'
import { Map } from './map'
import { Startdialogue } from './startdialogue.js'
import { End } from './end.js'
import { Wout } from './boswachter-wout'
import { Woutdialogue } from './boswachter-wout-dialogue'
import { Drikdialogue } from './dirk-zeebries-dialogue'

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
        this.add('startdialogue', new Startdialogue())
        this.add('map', new Map())
        this.add('end', new End())
        this.add('woutDialogue', new Woutdialogue())
        this.add('dirkDialogue', new Drikdialogue())
        this.goToScene('start')
    }
}

const game = new Game()
