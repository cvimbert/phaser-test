import { AnchorItem } from './anchor-item.interface';
import { GraphItem } from '../graph-item.class';

export interface AddAnchorModalData {
  anchors: AnchorItem[];
  graphItem: GraphItem;
}