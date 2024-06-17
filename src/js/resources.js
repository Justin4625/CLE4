import { ImageSource, Sound, Resource, Loader } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Fish: new ImageSource('images/fish.png'),
    StartScreen: new ImageSource('images/startscreen.png'),
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