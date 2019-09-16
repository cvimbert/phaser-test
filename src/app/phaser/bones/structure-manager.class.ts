import { StructureData } from '../interfaces/structure-data.interface';
import { NodeData } from '../interfaces/node-data.interface';
import { SpriteData } from '../interfaces/sprite-data.interface';
import { ObjectContainer } from './object-container.class';
import { FlatStructureData } from '../interfaces/flat-structure-data.interface';
import { FlatNodeData } from '../interfaces/flat-node-data.interface';

export class StructureManager {

    globalSpritesScale: number = 1;
    spritesToPreload: string[] = [];

    nodeContainers: ObjectContainer[] = [];
    spriteContainers: ObjectContainer[] = [];

    constructor(
        private scene: Phaser.Scene,
        data?: FlatStructureData
    ) {
        if (data) {
            this.loadFlatData(data);
        }
    }

    loadFlatData(data: FlatStructureData) {
        console.log("load flat");
        
        if (data.globalSpritesScale != null) {
            this.globalSpritesScale = data.globalSpritesScale;
        }

        this.parseFlatNode(data.rootNodeId, data.nodes);
    }

    private parseFlatNode(name: string, nodes: { [key: string]: FlatNodeData }, parent?: ObjectContainer) {

        let node = nodes[name];

        let container = new ObjectContainer(
            this.scene,
            name,
            node.x || 0,
            node.y || 0
        );

        this.nodeContainers.push(container);

        if (parent) {
            parent.addChildContainer(container, name);
        }

        if (node.sprites) {
            node.sprites.forEach(spriteData => {
                this.parseSprite(spriteData.file, spriteData, container);
            });
        }

        if (node.nodes) {
            node.nodes.forEach(nodeId => {
                this.parseFlatNode(nodeId, nodes, container);
            });
        }
    }

    private parseSprite(name: string, data: SpriteData, parent: ObjectContainer) {

        let sprite = this.scene.add.sprite(
            data.x || 0,
            data.y || 0,
            data.file || name
        ).setOrigin(
            data.originX !== null ? data.originX : .5,
            data.originY !== null ? data.originY : .5
        ).setScale(
            this.globalSpritesScale
        );

        let container = parent.addChild(sprite, name);
        this.spriteContainers.push(container);
    }
}