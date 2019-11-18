import { JsonObject, JsonProperty } from 'json2typescript';
import { GraphTarget } from './interfaces/graph-target.interface';
import { OutLink } from './out-link.class';

@JsonObject("GraphItem")
export class GraphItem {

  constructor() {}

  @JsonProperty("id", String)
  id = "";

  @JsonProperty("type", String)
  type = "";

  @JsonProperty("x", Number)
  x = 0;

  @JsonProperty("y", Number)
  y = 0;

  @JsonProperty("itemId", String)
  itemId = "";

  // @JsonProperty("outLinks", [OutLink])
  outLinks: OutLink[] = [];

  targetItem: GraphTarget;
}