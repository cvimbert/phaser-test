import { GraphService } from '../graph-view/services/graph.service';
import { CloudService } from '../services/cloud.service';
import { JsonProperty } from 'json2typescript';
import { GraphTarget } from '../graph-view/interfaces/graph-target.interface';
import { GraphItem } from '../graph-view/graph-item.class';

export class BaseGameStructure {

  graphService: GraphService;
  cloudService: CloudService;
  parentGraphItem: GraphItem;

  @JsonProperty("id", String)
  id: string = "";

  @JsonProperty("name", String)
  name: string = "";

  @JsonProperty("description", String)
  description: string = "";

  // pas certain que les arguments soient les bons
  init(targetItem: GraphTarget, graphService: GraphService, item: GraphItem) {
    
  }
  
}