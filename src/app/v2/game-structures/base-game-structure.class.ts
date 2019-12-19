import { GraphService } from '../graph-view/services/graph.service';
import { CloudService } from '../services/cloud.service';
import { JsonProperty } from 'json2typescript';
import { GraphItem } from '../graph-view/graph-item.class';
import { SerializableAnchorItem } from '../graph-view/serializable-anchor-item.class';
import { ArgumentValue } from '../graph-view/argument-value.class';
import { Argument } from '../graph-view/interfaces/argument.interface';

export class BaseGameStructure {

  graphService: GraphService;
  cloudService: CloudService;
  parentGraphItem: GraphItem;

  @JsonProperty("id", String)
  id = "";

  @JsonProperty("name", String)
  name = "";

  @JsonProperty("description", String)
  description = "";

  init() {

  }

  getArg(args: ArgumentValue[], name: string): ArgumentValue {
    return args.find(arg => arg.id === name);
  }
}