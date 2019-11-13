import { JsonObject, JsonProperty } from 'json2typescript';
import { GraphTarget } from './interfaces/graph-target.interface';

@JsonObject("GraphItem")
export class GraphItem {

  constructor() {

  }

  @JsonProperty("id")
  id = "";

  @JsonProperty("type")
  type = "";

  @JsonProperty("x")
  x = 0;

  @JsonProperty("y")
  y = 0;

  @JsonProperty("itemId")
  itemId = "";

  targetItem: GraphTarget;
}