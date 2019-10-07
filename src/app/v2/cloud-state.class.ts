import { CloudNodeState } from './cloud-node-state.class';
import { TransformationNode } from './transformation-node.class';
import { CloudStructure } from './cloud-structure.class';
import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject("CloudState")
export class CloudState {
    

    @JsonProperty("structureId", String)
    structureId: string;

    nodeStates: { [key: string]: CloudNodeState } = {};

    @JsonProperty("name", String)
    name: string;

    static fromNodesList(name: string, structure: CloudStructure, nodes: TransformationNode[]): CloudState {
        let state = new CloudState();

        state.structureId = structure.id;

        nodes.forEach(node => {
            state.nodeStates[node.id] = CloudNodeState.fromNode(node);
        });

        state.name = name;

        return state;
    }

    /*static fromObject(data: Object): CloudState {
        return;
    }*/

    toJson(): string {
        return JSON.stringify(this);
    }
}