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

    calculatedX: number = 0;
    calculatedY: number = 0;
    calculatedRotation: number = 0;

    constructor(
        public x: number = 0,
        public y: number = 0
    ) {

    }

    render(data?: ChildObjectData) {

        // calcul des positions relatives
        //let nodeAngle = (data ? data.initAngle : 0) - this.rotation;

        //let newNodeX = Math.cos(nodeAngle) * (data ? )

        if (data) {
            this.relativeRotation = data.initAngle - this.parentNode.rotation;
            this.relativeX = Math.cos(this.relativeRotation) * data.hypothenus;
            this.relativeY = Math.sin(this.relativeRotation) * data.hypothenus;

            this.calculatedX = this.relativeX + this.parentNode.x + this.parentNode.relativeX;
            this.calculatedY = this.relativeY + this.parentNode.y + this.parentNode.relativeY;
            this.calculatedRotation = this.rotation + this.parentNode.calculatedRotation;
        } else {
            this.calculatedX = this.relativeX;
            this.calculatedY = this.relativeY;
            this.calculatedRotation = this.rotation;
        }

        this.childrenObjects.forEach(obj => {
            let angle = obj.initAngle - this.rotation;

            // Il faudra voir plus tard si on a besoin de ces deux lignes
            /*angle = angle < 0 ? angle + 2 * Math.PI : angle;
            angle = angle >= 2 * Math.PI ? angle - 2 * Math.PI : angle;*/

            let newX = Math.cos(angle) * obj.hypothenus;
            let newY = Math.sin(angle) * obj.hypothenus;

            obj.object.x = this.x + newX + this.calculatedX;
            obj.object.y = this.y + newY + this.calculatedY;

            if (this.parentNode) {
                console.log(this.x, newX, this.parentNode.x, this.calculatedX);
            }

            obj.object.rotation = obj.rotation - this.calculatedRotation;
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