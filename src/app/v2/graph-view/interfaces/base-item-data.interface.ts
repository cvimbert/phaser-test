import { Point } from '../../interfaces/point.interface';

export interface BaseItemData {
  position: Point;
  anchors?: Point[];
}