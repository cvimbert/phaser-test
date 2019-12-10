import { CloudNodeState } from './cloud-node-state.class';
import { TransformationNode } from './transformation-node.class';
import { CloudStructure } from './cloud-structure.class';
import { JsonObject, JsonProperty } from 'json2typescript';
import { DiffMode } from './enums/diff-mode.enum';
import { CloudNodeStatesDictionary } from './cloud-node-states-dictionary.class';
import { CloudNodeStatesDictionaryConverter } from './converters/cloud-node-states-dictionary-converter.class';

@JsonObject("CloudState")
export class CloudState {
    
    @JsonProperty("id", String)
    id = "";

    @JsonProperty("sid", String)
    structureId = "";

    @JsonProperty("states", CloudNodeStatesDictionaryConverter)
    nodeStates: CloudNodeStatesDictionary = {};

    @JsonProperty("name", String)
    name = "";

    @JsonProperty("desc", String)
    description = "";

    constructor() {        
    }

    static fromNodesList(id: string, structure: CloudStructure, nodes: TransformationNode[]): CloudState {
        let state = new CloudState();

        state.structureId = structure.id;
        state.id = id;

        nodes.forEach(node => {
            let nd = CloudNodeState.fromNode(node); 
            state.nodeStates[node.id] = nd;
        });

        state.name = name;

        return state;
    }

    getDiff(target: CloudState, mode = DiffMode.RELATIVE, nodeId?: string): CloudState {

        let state = new CloudState();
        state.structureId = this.structureId;

        // console.log(this, target);
        
        if (mode === DiffMode.RELATIVE) {
            for (let key in this.nodeStates) {

                // console.log(key);
    
                // attention : code douteux, et nécessité de cloner, peut-être, les cloudNodeStates
                let ownState = this.nodeStates[key];
                let targetState = target.nodeStates[key];
                
                if (!ownState && targetState) {
                    state.nodeStates[key] = targetState;
                } else if (ownState && !targetState) {
                    state.nodeStates[key] = ownState;
                } else if (ownState && targetState) {
                    let diffState = ownState.diffWithState(targetState, mode);
    
                    if (Object.keys(diffState).length > 0) {
                        state.nodeStates[key] = diffState;
                    }
                }
            }
        } else if (mode === DiffMode.ABSOLUTE) {
            if (nodeId != undefined) {
                let ownState = this.nodeStates[nodeId];
                state.nodeStates[nodeId] = ownState.getAbsoluteProperties();
            } else {
                console.warn("Must provide a node id for absolute diff");
            }
        }
        

        return state;
    }
}