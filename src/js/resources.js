import { TiledMap, TiledResource } from '@excaliburjs/plugin-tiled'
import { ImageSource, Sound, Resource, Loader, TileMap } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Fish: new ImageSource('images/fish.png'),
    StartScreen: new ImageSource('images/startscreen.png'),
    Endscreen: new ImageSource('images/endscreen.png'),
    Backbutton: new ImageSource('images/backbutton.png'),
    Congratulations: new ImageSource('images/congratulations.png'),
    Youdidit: new ImageSource('images/youdidit.png'),
    // Map: new TiledResource('map/tilemap.tmx'),
    Player: new ImageSource('images/mees-mystkeeper.png'),
    Wout: new ImageSource('images/boswachter-wout.png'),
    Dirk: new ImageSource('images/dirk-zeebries.png'),
    Elara: new ImageSource('images/elara-mystveil.png'),
    Lithorock: new ImageSource('images/lithorock.png')
}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }