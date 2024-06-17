import { TiledMap, TiledResource } from '@excaliburjs/plugin-tiled'
import { ImageSource, Sound, Resource, Loader, TileMap } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Fish: new ImageSource('images/fish.png'),
    StartScreen: new ImageSource('images/startscreen.png'),
    Endscreen: new ImageSource('images/endscreen.png'),
    Backbutton: new ImageSource('images/backbutton.png'),
    // Map: new TiledResource('map/tilemap.tmx'),
}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }