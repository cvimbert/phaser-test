import { CloudData } from './interfaces/cloud-data.interface';
import { CloudNode } from './cloud-node.class';
import { Point } from './interfaces/point.interface';
import { CloudStructure } from './cloud-structure.class';

export class CloudManager {

  nodes: { [key: string]: CloudNode } = {};
  data: CloudData;

  constructor(
    public scene: Phaser.Scene
  ) {

  }

  load(data: CloudData) {
    this.data = data;
    this.parsePoints(data);
  }

  parsePoints(data: CloudData) {
    for (let pointName in data.points) {
      let node = new CloudNode(pointName, this.scene, data.points[pointName], this, data.offset);
      this.nodes[pointName] = node;
    }
  }

  getNode(nodeId: string): CloudNode {
    if (this.nodes[nodeId]) {
      return this.nodes[nodeId];
    } else {
      console.warn(`No node named ${ nodeId }`);
      return null;
    }
  }

  getStructure(structureId: string): CloudStructure {
    return new CloudStructure(this.data.structures[structureId], this);
  }

  getNodes(nodeIds: string[]): CloudNode[] {
    return nodeIds.map(nodeId => this.getNode(nodeId));
  }
}