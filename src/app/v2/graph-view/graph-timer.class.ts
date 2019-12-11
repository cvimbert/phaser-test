import { JsonObject, JsonProperty } from 'json2typescript';
import { AnchorItem } from './interfaces/anchor-item.interface';
import { GraphTarget } from './interfaces/graph-target.interface';
import { GraphItem } from './graph-item.class';
import { GraphService } from './services/graph.service';

@JsonObject("GraphTimer")
export class GraphTimer implements GraphTarget {

  parentGraphItem: GraphItem;
  graphService: GraphService;

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

  constructor() {}

  @JsonProperty("id", String)
  id = "";

  @JsonProperty("n", String)
  name = "";

  @JsonProperty("desc", String)
  description ="";

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