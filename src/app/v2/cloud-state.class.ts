import { CloudNodeState } from './cloud-node-state.class';
import { TransformationNode } from './transformation-node.class';
import { CloudStructure } from './cloud-structure.class';
import { JsonObject, JsonProperty } from 'json2typescript';
import { DiffMode } from './enums/diff-mode.enum';

@JsonObject("CloudState")
export class CloudState {
    

    @JsonProperty("structureId", String)
    structureId: string = "";

    nodeStates: { [key: string]: CloudNodeState } = {};

    @JsonProperty("name", String)
    name: string = "";

    constructor() {
        // console.log(this.name);
    }

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
        return CloudState.fromObject(deserialized);
    }

    static fromObject(jsonObject: Object): CloudState {
        
        let state = new CloudState();

        state.structureId = jsonObject["structureId"];
        state.name = jsonObject["name"];

        for (let key in jsonObject["nodeStates"]) {
            state.nodeStates[key] = CloudNodeState.fromObject(jsonObject["nodeStates"][key]);
        }

        return state;
    }

    toJsonString(): string {        
        return JSON.stringify(this);
    }

    getDiff(target: CloudState): CloudState {
        let state = new CloudState();

        for (let key in this.nodeStates) {

            // attention : code douteux, et nécessité de cloner, peut-être, les cloudNodeStates

            let ownState = this.nodeStates[key];
            let targetState = target.nodeStates[key];
            
            if (!ownState && targetState) {
                state.nodeStates[key] = targetState;
            } else if (ownState && !targetState) {
                state.nodeStates[key] = ownState;
            } else if (ownState && targetState) {
                state.nodeStates[key] = ownState.diffWithState(targetState, DiffMode.RELATIVE);
            }
        }

        return state;
    }
}