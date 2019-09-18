import { CloudData } from './interfaces/cloud-data.interface';
import { CloudNode } from './cloud-node.class';

export class CloudManager {

  nodes: { [key: string]: CloudNode } = {};

  constructor(
    public scene: Phaser.Scene
  ) {

  }

  load(data: CloudData) {
    this.parsePoints(data);
  }

  parsePoints(data: CloudData) {
    for (let pointName in data.points) {
      
    }
  }
}