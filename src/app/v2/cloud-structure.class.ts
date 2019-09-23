import { CloudStructureData } from './interfaces/cloud-structure-data.interface.class';
import { TransformationNode } from './transformation-node.class';
import { CloudManager } from './cloud-manager.class';

export class CloudStructure {

  nodes: { [key: string]: TransformationNode } = {};
  rootNode: TransformationNode;

  private linksDisplayed: boolean = false;

  constructor(
    data: CloudStructureData,
    manager: CloudManager
  ) {

    // Il faudra aussi vérifier la cohérence des data, et les potentielles redondances cycliques

    for (let nodeName in data.links) {
      let transformationNode = new TransformationNode(nodeName, manager.scene);
      transformationNode.node = manager.getNode(nodeName);
      this.nodes[nodeName] = transformationNode;
    }

    this.rootNode = this.nodes[data.root];

    for (let nodeName in this.nodes) {

      data.links[nodeName].forEach(childId => {
        let child = this.getNode(childId);

        if (!child.parent) {
          child.parent = this.getNode(nodeName);
          this.nodes[nodeName].children.push(child);
        } else {
          console.warn(`The node ${ childId } as already a parent: ${ child.parent.id }`);
        }
      });
    }

    this.initializeNodes();
  }

  initializeNodes() {
    for (let nodeId in this.nodes) {
      let node = this.getNode(nodeId);
      node.initGeometry();
    }
  }

  displayLinks() {
    this.linksDisplayed = true;
    
    for (let nodeId in this.nodes) {
      let node = this.getNode(nodeId);
      node.displayLink();
    }
  }

  getNodes(ids: string[]): TransformationNode[] {
    return ids.map(id => this.getNode(id));
  }

  getNode(id: string): TransformationNode {
    if (this.nodes[id]) {
      return this.nodes[id];
    } else {
      console.warn(`No transformation node named: ${ id }`);
    }
  }
}