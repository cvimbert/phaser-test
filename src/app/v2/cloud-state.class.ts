import { CloudNodeState } from './cloud-node-state.class';

export class CloudState {
    
    structureId: string;
    nodeStates: { [key: string]: CloudNodeState } = {};
}