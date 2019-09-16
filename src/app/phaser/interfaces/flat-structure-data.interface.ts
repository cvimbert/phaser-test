import { FlatNodeData } from './flat-node-data.interface';

export interface FlatStructureData {
  globalSpritesScale?: number;
  rootNodeId: string;
  nodes: { [key: string]: FlatNodeData };
}