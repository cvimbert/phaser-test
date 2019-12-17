import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject("SerializableAnchorItem")
export class SerializableAnchorItem {

  @JsonProperty("id", String)
  id = "";

  @JsonProperty("type", String)
  type = "";
}