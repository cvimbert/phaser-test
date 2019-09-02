import { ChildObjectData } from '../interfaces/child-object-data.interface';

export class BoneNode {

    rotation: number = 0;
    parentNode: BoneNode;

    childrenObjects: ChildObjectData[] = [];
    childrenObjectsById: { [key: string]: ChildObjectData } = {};

    childrenNodes: ChildObjectData[] = [];
    childrenNodesById: { [key: string]: ChildObjectData } = {};

    relativeX: number = 0;
    relativeY: number = 0;
    relativeRotation: number = 0;

    absoluteX: number = 0;
    absoluteY: number = 0;
    absoluteRotation: number = 0;

    constructor(
        public x: number = 0,
        public y: number = 0
    ) {

    }

    render(data?: ChildObjectData) {

        if (data) {
            this.relativeRotation = data.initAngle - this.parentNode.rotation;

            var ng = data.initAngle - this.rotation - this.parentNode.rotation;

            this.relativeX = Math.cos(ng) * data.hypothenus;
            this.relativeY = Math.sin(ng) * data.hypothenus;

            // ça devrait être par là que ça débloque
            this.absoluteX = this.relativeX + this.parentNode.absoluteX;
            this.absoluteY = this.relativeY + this.parentNode.absoluteY;

            console.log(data.hypothenus, this.absoluteX, this.absoluteY);
            
            this.absoluteRotation = this.rotation + this.parentNode.absoluteRotation;
        } else {
            this.absoluteX = this.x;
            this.absoluteY = this.y;
            this.absoluteRotation = this.rotation;
        }

        this.childrenObjects.forEach(obj => {
            let angle = obj.initAngle - this.rotation;

            // Il faudra voir plus tard si on a besoin de ces deux lignes
            /*angle = angle < 0 ? angle + 2 * Math.PI : angle;
            angle = angle >= 2 * Math.PI ? angle - 2 * Math.PI : angle;*/

            let newX = Math.cos(angle) * obj.hypothenus;
            let newY = Math.sin(angle) * obj.hypothenus;

            obj.object.x = newX + this.absoluteX;
            obj.object.y = newY + this.absoluteY;

            obj.object.rotation = obj.rotation - this.absoluteRotation;
        });

        this.childrenNodes.forEach(data => {
            (<BoneNode>data.object).render(data);
        });
    }

    addChild(child: Phaser.GameObjects.Sprite, id?: string) {

        let data: ChildObjectData = {
            id: id,
            x: child.x,
            y: child.y,
            rotation: child.rotation,
            object: child,
            initAngle: Math.atan(child.y / child.x),
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
            initAngle: Math.atan(child.y / child.x),
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