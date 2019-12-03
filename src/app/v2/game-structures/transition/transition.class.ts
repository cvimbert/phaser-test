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

  playItem: AnchorItem = {
    id: "play",
    label: "Play",
    callback: () => {
      this.play();
    }
  };

  stopItem: AnchorItem = {
    id: "stop",
    label: "Stop",
    callback: () => {
      this.stop();
    }
  };

  resetItem = {
    id: "reset",
    label: "Reset the animation",
    callback: () => {
      this.reset();
    }
  };

  inAnchors: AnchorItem[] = [
    this.playItem,
    this.stopItem,
    this.resetItem
  ];


  

  onStartItem = {
    id: "onstart",
    label: "On start",
    callback: () => {
      this.onTransitionStart();
    }
  };

  onCompleteItem = {
    id: "oncomplete",
    label: "On complete",
    callback: () => {
      this.onTransitionComplete();
    }
  };

  outAnchors: AnchorItem[] = [
    this.onStartItem,
    this.onCompleteItem
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
    this.graphService.playOut(this.onCompleteItem, this.parentGraphItem);
  }

  onTransitionStart() {
    this.graphService.playOut(this.onStartItem, this.parentGraphItem);
  }

  play() {    
    this.graphService.playIn(this.onStartItem, this.parentGraphItem);

    setTimeout(() => {      
      this.graphService.playIn(this.onCompleteItem, this.parentGraphItem);
    }, 2000);
  }

  stop() {
    // console.log(this.id + ": stop");
  }

  reset() {
    // console.log(this.id + ": reset");
  }
}