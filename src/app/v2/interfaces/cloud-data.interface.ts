import { CloudPointData } from './cloud-point-data.interface';

export interface CloudData {
  points: { [key: string]: CloudPointData };
}