import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject("Transition")
export class Transition {

  @JsonProperty("id", String)
  id: string = "";

  @JsonProperty("n", String)
  name: string = "";

  @JsonProperty("desc")
  description: string = "";

  @JsonProperty("stid", String)
  stateId: string = "";

  @JsonProperty("d", Number)
  duration: number = 0;

  @JsonProperty("eas", Number)
  easingType: number = 0;
}