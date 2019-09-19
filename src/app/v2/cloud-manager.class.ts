import { CloudData } from './interfaces/cloud-data.interface';
import { CloudNode } from './cloud-node.class';
import { Point } from './interfaces/point.interface';
import { AbsoluteTransform } from './transformations/absolute-transfom.class';

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
      let node = new CloudNode(this.scene, data.points[pointName], this);
      this.nodes[pointName] = node;
    }
  }

  getNode(nodeId: string): CloudNode {
    if (this.nodes[nodeId]) {
      return this.nodes[nodeId];
    } else {
      console.warn(`Node node named ${ nodeId }`);
      return null;
    }
  }

  getNodes(nodeIds: string[]): CloudNode[] {
    return nodeIds.map(nodeId => this.getNode(nodeId));
  }

  // pour test
  setRelativePosition(
    target: string,
    relativeTo: string,
    propagateTo: string[] = [],
    position: Point
  ) {
    let targetNode = this.getNode(target);
    let relativeToNode = this.getNode(relativeTo);
    let propagateToNodes = this.getNodes(propagateTo);
 
  }

  // pour test
  setAbsolutePosition(
    target: string,
    propagateTo: string[],
    position: Point
  ) {
    let targetNode = this.getNode(target);
    let propagateToNodes = this.getNodes(propagateTo);

    let xd = position.x - targetNode.x;
    let yd = position.y - targetNode.y;

    targetNode.x += xd;
    targetNode.y += yd;
    targetNode.render();

    propagateToNodes.forEach(node => {
      node.x += xd;
      node.y += yd;
      node.render();
    });

    let transform = new AbsoluteTransform(targetNode, propagateToNodes);
  }
}