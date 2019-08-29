import { ChildObjectData } from '../interfaces/child-object-data.interface';

export class BoneNode {

    rotation: number = 0;
    parentNode: BoneNode;
    childrenObjects: ChildObjectData[] = [];

    constructor(
        public x: number = 0,
        public y: number = 0
    ) {

    }

    render() {
        // il va falloir rendre tout ça récursif !
        this.childrenObjects.forEach(obj => {
            console.log(Math.cos(this.rotation), Math.sin(this.rotation));
            
            // pas bon tout ça !
            obj.object.x = this.x + obj.x * Math.cos(this.rotation);
            obj.object.y = this.y + obj.y * Math.sin(this.rotation);
            obj.object.rotation = obj.object.rotation + this.rotation;
        });
    }

    addChild(child: Phaser.GameObjects.Sprite) {
        this.childrenObjects.push({
            x: child.x,
            y: child.y,
            rotation: child.rotation,
            object: child
        });
    }

    removeChild(child: Phaser.GameObjects.Sprite) {
        // à faire

        /*let index = this.childrenObjects.indexOf(child);

        if (index !== -1) {
            this.childrenObjects.splice(index, 1);
        }*/
    }
}