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
        y: number = 0,
        id: string = ""
    ) {
        super(scene, id, x, y);
    }

    render() {
        super.render();

        this.childrenObjects.forEach(obj => {
            obj.render();
        });

        this.childrenNodes.forEach(obj => {
            obj.render();
        });
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

    displayLinks(recursive = false) {
        this.childrenObjects.forEach(obj => {
            obj.displayLinkToParent();
        });

        this.displayLinkToParent();

        this.childrenNodes.forEach(node => {
            (<BoneNode>node).displayLinks(recursive);
        });
    }

    addChildNode(child: BoneNode, id?: string) {

        this.childrenNodes.push(child);

        child.parentContainer = this;

        if (id) {
            this.childrenNodesById[id] = child;
        }

        // child.parentNode = this;
    }

    removeChild(child: Phaser.GameObjects.Sprite) {
        // à faire

        /*let index = this.childrenObjects.indexOf(child);

        if (index !== -1) {
            this.childrenObjects.splice(index, 1);
        }*/
    }
}