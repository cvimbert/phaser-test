import { JsonObject, JsonProperty, Any } from 'json2typescript';
import { StateDisplayerType } from '../../enums/state-displayer-type.enum';
import { GraphTarget } from '../../graph-view/interfaces/graph-target.interface';
import { AnchorItem } from '../../graph-view/interfaces/anchor-item.interface';
import { GraphService } from '../../graph-view/services/graph.service';
import { GraphItem } from '../../graph-view/graph-item.class';

@JsonObject("Transition")
export class Transition implements GraphTarget {

  // ou bien un graph manager, ce qui permettrait de sortir de la structure d'angular
  graphService: GraphService;
  parentGraphItem: GraphItem;

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
    // console.log(this.id + ": transition complete");
    this.graphService.playOut(this.outAnchors[1], this.parentGraphItem);
  }

  onTransitionStart() {
    // console.log(this.id + ": transition start");
    this.graphService.playOut(this.outAnchors[0], this.parentGraphItem);
  }

  play() {
    // this.onTransitionStart();
    this.graphService.playIn(this.outAnchors[0], this.parentGraphItem);

    setTimeout(() => {
      // this.onTransitionComplete();
      this.graphService.playIn(this.outAnchors[1], this.parentGraphItem);
    }, 2000);
  }

  stop() {
    // console.log(this.id + ": stop");
  }

  reset() {
    // console.log(this.id + ": reset");
  }
}