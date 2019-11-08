import { JsonObject, JsonProperty } from 'json2typescript';

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
}