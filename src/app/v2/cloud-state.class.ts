import { CloudNodeState } from './cloud-node-state.class';
import { TransformationNode } from './transformation-node.class';
import { CloudStructure } from './cloud-structure.class';

export class CloudState {
    
    structureId: string;
    nodeStates: { [key: string]: CloudNodeState } = {};

    static fromNodesList(structure: CloudStructure, nodes: TransformationNode[]): CloudState {
        let state = new CloudState();

        state.structureId = structure.id;

        nodes.forEach(node => {
            state.nodeStates[node.id] = CloudNodeState.fromNode(node);
        });

        return state;
    }

    toJson(): string {
        return JSON.stringify(this);
    }
}