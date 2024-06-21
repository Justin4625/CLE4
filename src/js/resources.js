import { TiledMap, TiledResource } from '@excaliburjs/plugin-tiled'
import { ImageSource, Sound, Resource, Loader, TileMap } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Fish: new ImageSource('images/fish.png'),
    Startdialogue: new ImageSource('images/startdialogue.png'),
    StartScreen: new ImageSource('images/startscreen.png'),
    w: new ImageSource('images/good-endscreen.png'),
    Endscreen: new ImageSource('images/endscreen.png'),
    Backbutton: new ImageSource('images/backbutton.png'),
    Congratulations: new ImageSource('images/congratulations.png'),
    Youdidit: new ImageSource('images/youdidit.png'),
    Map: new TiledResource('map/tilemap.tmx'),
    PlayerM: new ImageSource('images/mees-mystkeeper.png'),
    PlayerF: new ImageSource('images/alice-mystkeeper.png'),
    Wout: new ImageSource('images/boswachter-wout.png'),
    Dirk: new ImageSource('images/dirk-zeebries.png'),
    Elara: new ImageSource('images/elara-mystveil.png'),
    Lithorock: new ImageSource('images/lithorock.png'),
    Test: new ImageSource('images/L2.jpeg'),
    Themesong: new Sound('sounds/themesong.mp3'),
    Earthartifact: new ImageSource('images/earthartifact.png'),
    Waterartifact: new ImageSource('images/waterartifact.png'),
    Rockartifact: new ImageSource('images/rockartifact.png'),
    Mysteryartifact: new ImageSource('images/mysteryartifact.png'),
    WoutBG: new ImageSource('images/woutbg.png')
}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }