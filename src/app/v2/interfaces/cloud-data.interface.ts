import { CloudPointData } from './cloud-point-data.interface';
import { CloudStructureData } from './cloud-structure-data.interface.class';

export interface CloudData {
  points: { [key: string]: CloudPointData };
  structures: { [key: string]: CloudStructureData };
}