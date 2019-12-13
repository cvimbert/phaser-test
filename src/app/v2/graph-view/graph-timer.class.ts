import { JsonObject, JsonProperty } from 'json2typescript';
import { AnchorItem } from './interfaces/anchor-item.interface';
import { GraphTarget } from './interfaces/graph-target.interface';
import { BaseGameStructure } from '../game-structures/base-game-structure.class';

@JsonObject("GraphTimer")
export class GraphTimer extends BaseGameStructure implements GraphTarget {

  startAnchor: AnchorItem = {
    id: "start",
    label: "Start",
    callback: () => {
      this.start();
    }
  };
  
  stopAnchor: AnchorItem = {
    id: "stop",
    label: "Stop",
    callback: () => {
      this.stop();
    }
  };

  onTimeoutAnchor: AnchorItem = {
    id: "onTimeout",
    label: "On timeout",
    callback: () => {
      this.onTimeout();
    }
  };

  inAnchors = [
    this.startAnchor,
    this.stopAnchor
  ];

  outAnchors = [
    this.onTimeoutAnchor
  ];

  constructor() {
    super();
  }

  @JsonProperty("d", Number)
  duration = 0;

  private timeout: any;

  start() {
    this.timeout = setTimeout(() => {
      this.graphService.playIn(this.onTimeoutAnchor, this.parentGraphItem);
    }, this.duration * 1000);
  }

  stop() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  onTimeout() {
    this.graphService.playOut(this.onTimeoutAnchor, this.parentGraphItem);
  }
}