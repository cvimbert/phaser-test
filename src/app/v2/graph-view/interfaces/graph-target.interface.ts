import { AnchorItem } from './anchor-item.interface';
import { GraphService } from '../services/graph.service';

export interface GraphTarget {
    id: string;
    name: string;
    description: string;
    inAnchors: AnchorItem[];
    outAnchors: AnchorItem[];
    graphService: GraphService;
}