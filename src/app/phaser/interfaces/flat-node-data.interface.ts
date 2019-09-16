import { SpriteData } from './sprite-data.interface';

export interface FlatNodeData {
  x?: number;
  y?: number;
  rotation?: number;
  sprites?: SpriteData[];
  nodes?: string[];
}