import { StructureData } from '../interfaces/structure-data.interface';
import { NodeData } from '../interfaces/node-data.interface';
import { SpriteData } from '../interfaces/sprite-data.interface';
import { ObjectContainer } from './object-container.class';

export class StructureManager {

    globalSpritesScale: number = 1;
    spritesToPreload: string[] = [];

    nodeContainers: ObjectContainer[] = [];
    spriteContainers: ObjectContainer[] = [];

    constructor(
        private scene: Phaser.Scene,
        data?: StructureData
    ) {
        if (data) {
            this.loadData(data);
        }
    }

    loadData(data: StructureData) {
        if (data.globalSpritesScale != null) {
            this.globalSpritesScale = data.globalSpritesScale;
        }

        this.parseNodes(data.nodes);
    }

    private parseNodes(nodes: { [key: string]: NodeData }, parent?: ObjectContainer) {
        for (let key in nodes) {
            this.parseNode(key, nodes[key], parent);
        }
    }

    private parseNode(name: string, node: NodeData, parent?: ObjectContainer) {

        let container = new ObjectContainer(
            this.scene,
            name,
            node.x || 0,
            node.y || 0,
        );

        // container.displayOrigin();

        this.nodeContainers.push(container);

        if (parent) {
            parent.addChildContainer(container, name);
        }

        if (node.sprites) {
            for (let key in node.sprites) {
                this.parseSprite(key, node.sprites[key], container);
            }
        }

        if (node.nodes) {
            this.parseNodes(node.nodes, container);
        }
    }

    private parseSprite(name: string, data: SpriteData, parent: ObjectContainer) {

        let sprite = this.scene.add.sprite(
            data.x | 0,
            data.y | 0,
            data.file || name
        ).setOrigin(
            data.originX !== null ? data.originX : .5,
            data.originY !== null ? data.originY : .5
        ).setScale(
            this.globalSpritesScale
        );

        let container = parent.addChild(sprite, name);
        // container.displayOrigin();
        this.spriteContainers.push(container);
    }
}