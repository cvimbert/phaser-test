import { JsonObject, JsonProperty, Any } from 'json2typescript';
import { StateDisplayerType } from '../../enums/state-displayer-type.enum';
import { GraphTarget } from '../../graph-view/interfaces/graph-target.interface';
import { AnchorItem } from '../../graph-view/interfaces/anchor-item.interface';

@JsonObject("Transition")
export class Transition implements GraphTarget {

  outAnchors: AnchorItem[] = [
    {
      id: "onstart",
      label: "On start",
      callback: this.onTransitionStart
    },
    {
      id: "oncomplete",
      label: "On complete",
      callback: this.onTransitionComplete
    }
  ];

  inAnchors: AnchorItem[] = [
    {
      id: "play",
      label: "Play"
    },
    {
      id: "stop",
      label: "Stop"
    },
    {
      id: "reset",
      label: "Reset the animation"
    }
  ];

  constructor() {}

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

  onTransitionComplete() {
    console.log("Transition complete callback");
  }

  onTransitionStart() {
    console.log("Transition start callback");
  }
}