import { SpriteData } from './sprite-data.interface';

export interface NodeData {
    x?: number;
    y?: number;
    rotation?: number;
    sprites?: { [key: string]: SpriteData };
    nodes?: { [key: string]: NodeData };
}