import { Point } from '../../interfaces/point.interface';

export interface BaseItemData {
  id?: string;
  position: Point;
  anchors?: { [key: string]: Point };
}