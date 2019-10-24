import { JsonObject, JsonProperty, Any } from 'json2typescript';
import { StateDisplayerType } from '../../enums/state-displayer-type.enum';

@JsonObject("Transition")
export class Transition {

  @JsonProperty("id", String)
  id: string = "";

  @JsonProperty("n", String)
  name: string = "";

  @JsonProperty("desc", String)
  description: string = "";

  @JsonProperty("stid", String)
  stateId: string = "";

  @JsonProperty("fr", Any)
  from: StateDisplayerType = undefined;

  @JsonProperty("d", Number)
  duration: number = 0;

  @JsonProperty("eas", String)
  easingType: string = "0";
}