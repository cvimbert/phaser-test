import { JsonObject, JsonProperty, Any } from 'json2typescript';
import { StateDisplayerType } from '../../enums/state-displayer-type.enum';
import { GraphTarget } from '../../graph-view/interfaces/graph-target.interface';
import { AnchorItem } from '../../graph-view/interfaces/anchor-item.interface';
import { TransitionsService } from '../../services/transitions.service';
import { BaseGameStructure } from '../base-game-structure.class';

@JsonObject("Transition")
export class Transition extends BaseGameStructure implements GraphTarget {

  // ou bien un graph manager, ce qui permettrait de sortir de la structure d'angular
  
  transitionsService: TransitionsService;
  label = "";

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
    label: "Reset",
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

  constructor() {
    super();
  }

  init() {
    this.initLabel();
  }

  initLabel() {
    this.label = this.name;
  }

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
    this.transitionsService.initiateTween(this, () => {
      this.graphService.playAllIn(this.onStartItem, this.parentGraphItem);
    }, () => {
      this.graphService.playAllIn(this.onCompleteItem, this.parentGraphItem);
    });
  }

  stop() {
  }

  reset() {
  }
}