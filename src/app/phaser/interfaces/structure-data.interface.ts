import { NodeData } from './node-data.interface';

export interface StructureData {
    globalSpritesScale?: number;
    nodes?: { [key: string] : NodeData };
}