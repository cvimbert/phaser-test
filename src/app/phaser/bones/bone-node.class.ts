import { ChildObjectData } from '../interfaces/child-object-data.interface';
import { ObjectContainer } from './object-container.class';

export class BoneNode {

    rotation: number = 0;
    parentNode: BoneNode;

    childrenObjects: ObjectContainer[] = [];
    childrenObjectsById: { [key: string]: ObjectContainer } = {};

    childrenNodes: ObjectContainer[] = [];
    childrenNodesById: { [key: string]: ObjectContainer } = {};

    relativeX: number = 0;
    relativeY: number = 0;
    relativeRotation: number = 0;

    absoluteX: number = 0;
    absoluteY: number = 0;
    absoluteRotation: number = 0;

    constructor(
        public scene: Phaser.Scene,
        public x: number = 0,
        public y: number = 0
    ) {

    }

    render(data?: ObjectContainer) {

        if (data) {
            this.relativeRotation = data.initAngle - this.parentNode.rotation;

            var ng = data.initAngle - this.rotation - this.parentNode.rotation;

            this.relativeX = Math.cos(ng) * data.hypothenus;
            this.relativeY = Math.sin(ng) * data.hypothenus;

            // ça devrait être par là que ça débloque
            this.absoluteX = this.relativeX + this.parentNode.absoluteX;
            this.absoluteY = this.relativeY + this.parentNode.absoluteY;

            //console.log(data.hypothenus, this.absoluteX, this.absoluteY);
            
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

            //console.log(obj.object.x, obj.object.y);

            obj.object.rotation = obj.rotation - this.absoluteRotation;
        });

        this.childrenNodes.forEach(data => {
            (<BoneNode>data.object).render(data);
        });
    }

    addChild(child: Phaser.GameObjects.Sprite, id?: string) {

        let container = new ObjectContainer(this.scene, id, child.x, child.y, child);

        this.childrenObjects.push(container);

        if (id) {
            this.childrenObjectsById[id] = container;
        }
    }

    addChildNode(child: BoneNode, id?: string) {

        let container = new ObjectContainer(this.scene, id, child.x, child.y, child);

        this.childrenNodes.push(container);

        if (id) {
            this.childrenNodesById[id] = container;
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