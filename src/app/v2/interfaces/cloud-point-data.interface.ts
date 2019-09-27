import { CloudSpriteData } from './cloud-sprite-data.interface';

export interface CloudPointData {
  x: number;
  y: number;
  sprites?: { [key: string]: CloudSpriteData };
}