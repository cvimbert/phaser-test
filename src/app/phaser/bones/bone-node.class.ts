import { ObjectContainer } from './object-container.class';

export class BoneNode extends ObjectContainer {

    //rotation: number = 0;
    parentNode: BoneNode;

    childrenObjects: ObjectContainer[] = [];
    childrenObjectsById: { [key: string]: ObjectContainer } = {};

    childrenNodes: ObjectContainer[] = [];
    childrenNodesById: { [key: string]: ObjectContainer } = {};

    constructor(
        scene: Phaser.Scene,
        x: number = 0,
        y: number = 0
    ) {
        super(scene, "", x, y);
    }

    render() {
        super.render();

        this.childrenObjects.forEach(obj => {
            obj.render();
        });
    }

    set rotation(value: number) {
        //console.log("ok");
        this.relativeRotation = value;

        // update des positions relatives
        let angle = this.initAngle - this.relativeRotation;
        
        //this.relativeX = Math.cos(angle) * this.hypothenus;
        //this.relativeY = Math.sin(angle) * this.hypothenus;

        console.log(this.relativeX, this.relativeY);
    }

    addChild(child: Phaser.GameObjects.Sprite, id?: string): ObjectContainer {

        let container = new ObjectContainer(this.scene, id, child.x, child.y, child);

        container.parentContainer = this;

        this.childrenObjects.push(container);

        if (id) {
            this.childrenObjectsById[id] = container;
        }

        return container;
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