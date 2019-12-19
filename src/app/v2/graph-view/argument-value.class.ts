import { JsonObject, JsonProperty, Any } from 'json2typescript';

@JsonObject("ArgumentValue")
export class ArgumentValue {

  @JsonProperty("id", String)
  id = "";

  @JsonProperty("type", String)
  type = "";

  @JsonProperty("value", Any)
  value: any = undefined;
}