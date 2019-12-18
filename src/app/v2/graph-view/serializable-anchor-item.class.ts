import { JsonObject, JsonProperty } from 'json2typescript';
import { ArgumentValue } from './argument-value.class';

@JsonObject("SerializableAnchorItem")
export class SerializableAnchorItem {

  @JsonProperty("id", String)
  id = "";

  @JsonProperty("type", String)
  type = "";

  @JsonProperty("args", [ArgumentValue])
  arguments: ArgumentValue[] = [];
}