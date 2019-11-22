import { JsonObject, JsonProperty, Any } from 'json2typescript';
import { StateDisplayerType } from '../../enums/state-displayer-type.enum';
import { GraphTarget } from '../../graph-view/interfaces/graph-target.interface';
import { AnchorItem } from '../../graph-view/interfaces/anchor-item.interface';

@JsonObject("Transition")
export class Transition implements GraphTarget {

  inAnchors: AnchorItem[] = [
    {
      id: "play",
      label: "Play",
      callback: () => {
        this.play();
      }
    },
    {
      id: "stop",
      label: "Stop",
      callback: () => {
        this.stop();
      }
    },
    {
      id: "reset",
      label: "Reset the animation",
      callback: () => {
        this.reset();
      }
    }
  ];

  outAnchors: AnchorItem[] = [
    {
      id: "onstart",
      label: "On start",
      callback: () => {
        this.onTransitionStart();
      }
    },
    {
      id: "oncomplete",
      label: "On complete",
      callback: () => {
        this.onTransitionComplete();
      }
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
    console.log(this.id + ": transition complete");
  }

  onTransitionStart() {
    console.log(this.id + ": transition start");
  }

  play() {
    // simulation
    console.log(this.id + ": play");
    
    this.onTransitionStart();

    setTimeout(() => {
      this.onTransitionComplete();
    }, 2000);
  }

  stop() {
    console.log(this.id + ": stop");
  }

  reset() {
    console.log(this.id + ": reset");
  }
}