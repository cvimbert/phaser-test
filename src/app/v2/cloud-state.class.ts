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

    static fromJsonString(jsonString: string): CloudState {
        let deserialized: Object = JSON.parse(jsonString);

        // console.log("Original string: ", deserialized);
        
        let state = new CloudState();

        state.structureId = deserialized["structureId"];
        state.name = deserialized["name"];

        for (let key in deserialized["nodeStates"]) {
            state.nodeStates[key] = CloudNodeState.fromObject(deserialized["nodeStates"][key]);
        }

        return state;
    }

    toJsonString(): string {
        console.log(this);
        
        return JSON.stringify(this);
    }
}