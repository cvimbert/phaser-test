import { AnchorItem } from './anchor-item.interface';

export interface GraphTarget {
    id: string;
    name: string;
    description: string;
    inAnchors: AnchorItem[];
    outAnchors: AnchorItem[];
}