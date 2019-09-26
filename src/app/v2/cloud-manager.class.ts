import { CloudData } from './interfaces/cloud-data.interface';
import { CloudNode } from './cloud-node.class';
import { Point } from './interfaces/point.interface';
import { CloudStructure } from './cloud-structure.class';

export class CloudManager {

  nodes: { [key: string]: CloudNode } = {};
  data: CloudData;
  structures: string[];
  mainStructureId: string;

  constructor(
    public scene: Phaser.Scene
  ) {

  }

  load(data: CloudData) {
    this.data = data;
    this.parsePoints(data);
    this.parseStructures(data);
  }

  parsePoints(data: CloudData) {
    for (let pointName in data.points) {
      let node = new CloudNode(pointName, this.scene, data.points[pointName], this, data.offset);
      this.nodes[pointName] = node;
    }
  }

  parseStructures(data: CloudData) {
    this.structures = Object.keys(data.structures);

    if (this.structures) {
      this.mainStructureId = this.structures[0];
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
    return new CloudStructure(this.data.structures[structureId], this, structureId);
  }

  getNodes(nodeIds: string[]): CloudNode[] {
    return nodeIds.map(nodeId => this.getNode(nodeId));
  }
}