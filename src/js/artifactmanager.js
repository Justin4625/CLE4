import { EventEmitter } from 'excalibur';

export class ArtifactManager extends EventEmitter {
    constructor() {
        super();
        this.artifacts = new Set();
    }

    addArtifact(artifact) {
        console.log('Adding artifact:', artifact);
        this.artifacts.add(artifact);
        artifact.on('collected', () => {
            this.removeArtifact(artifact);
        });
    }

    removeArtifact(artifact) {
        console.log('Removing artifact:', artifact);
        this.artifacts.delete(artifact);
        this.emit('artifactCollected');
    }

    allCollected() {
        const allCollected = this.artifacts.size === 0;
        console.log('All artifacts collected:', allCollected);
        return allCollected;
    }
}
