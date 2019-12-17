import { GraphService } from '../graph-view/services/graph.service';
import { CloudService } from '../services/cloud.service';
import { JsonProperty } from 'json2typescript';
import { GraphItem } from '../graph-view/graph-item.class';

export class BaseGameStructure {

  graphService: GraphService;
  cloudService: CloudService;
  parentGraphItem: GraphItem;

  @JsonProperty("ianchor", Number)
  anchorIndex = 0;

  @JsonProperty("id", String)
  id = "";

  @JsonProperty("name", String)
  name = "";

  @JsonProperty("description", String)
  description = "";

  init() {

  }
  
}