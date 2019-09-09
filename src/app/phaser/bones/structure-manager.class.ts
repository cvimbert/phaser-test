import { StructureData } from '../interfaces/structure-data.interface';
import { NodeData } from '../interfaces/node-data.interface';

export class StructureManager {

    globalSpritesScale: number = 1;


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

    parseNodes(nodes: { [key: string]: NodeData }) {
        for (let key in nodes) {
            this.parseNode(nodes[key]);
        }
    }

    parseNode(node: NodeData) {

    }
}