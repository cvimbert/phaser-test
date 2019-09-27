import { CloudPointData } from './cloud-point-data.interface';
import { CloudStructureData } from './cloud-structure-data.interface.class';
import { Point } from './point.interface';

export interface CloudData {
  globalSpritesScale?: number;
  points: { [key: string]: CloudPointData };
  structures: { [key: string]: CloudStructureData };
  offset?: Point;
}