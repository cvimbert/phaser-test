import { ChildObjectData } from '../interfaces/child-object-data.interface';

export class BoneNode {

    rotation: number = 0;
    parentNode: BoneNode;

    childrenObjects: ChildObjectData[] = [];
    childrenObjectsById: { [key: string]: ChildObjectData } = {};

    childrenNodes: ChildObjectData[] = [];
    childrenNodesById: { [key: string]: ChildObjectData } = {};

    constructor(
        public x: number = 0,
        public y: number = 0
    ) {

    }

    render() {
        // il va falloir rendre tout ça récursif !
        this.childrenObjects.forEach(obj => {
            var angle = obj.relativeAngle - this.rotation;

            // Est-ce que ces deux lignes sont vraiment utiles ?
            /*angle = angle < 0 ? angle + 2 * Math.PI : angle;
            angle = angle >= 2 * Math.PI ? angle - 2 * Math.PI : angle;*/

            var newX = Math.cos(angle) * obj.hypothenus;
            var newY = Math.sin(angle) * obj.hypothenus;

            obj.object.x = this.x + newX;
            obj.object.y = this.y + newY;
            obj.object.rotation = obj.rotation - this.rotation;
        });

        this.childrenNodes.forEach(data => {
            (<BoneNode>data.object).render();
        });
    }

    addChild(child: Phaser.GameObjects.Sprite, id?: string) {

        let data: ChildObjectData = {
            id: id,
            x: child.x,
            y: child.y,
            rotation: child.rotation || 0,
            object: child,
            relativeAngle: Math.atan(child.y / child.x),
            hypothenus: Math.sqrt(Math.pow(child.x, 2) + Math.pow(child.y, 2))
        };

        this.childrenObjects.push(data);

        if (id) {
            this.childrenObjectsById[id] = data;
        }
    }

    addChildNode(child: BoneNode, id?: string) {

        let data = {
            id: id,
            x: child.x,
            y: child.y,
            rotation: child.rotation,
            object: child,
            relativeAngle: Math.atan(child.y / child.x),
            hypothenus: Math.sqrt(Math.pow(child.x, 2) + Math.pow(child.y, 2))
        };

        this.childrenNodes.push(data);

        if (id) {
            this.childrenNodesById[id] = data;
        }

        child.parentNode = this;
    }

    removeChild(child: Phaser.GameObjects.Sprite) {
        // à faire

        /*let index = this.childrenObjects.indexOf(child);

        if (index !== -1) {
            this.childrenObjects.splice(index, 1);
        }*/
    }
}