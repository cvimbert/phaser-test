import { SpriteData } from './sprite-data.interface';

export interface NodeData {
    sprites?: { [key: string]: SpriteData };
    nodes?: { [key: string]: NodeData };
}