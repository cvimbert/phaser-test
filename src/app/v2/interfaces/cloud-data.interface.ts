import { CloudPointData } from './cloud-point-data.interface';
import { CloudStructureData } from './cloud-structure-data.interface.class';
import { Point } from './point.interface';

export interface CloudData {
  points: { [key: string]: CloudPointData };
  structures: { [key: string]: CloudStructureData };
  offset?: Point;
}