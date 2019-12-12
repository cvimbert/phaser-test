import { JsonObject, JsonProperty } from 'json2typescript';
import { GraphItem } from './graph-item.class';
import { GraphService } from './services/graph.service';
import { AnchorItem } from './interfaces/anchor-item.interface';
import { GraphTarget } from './interfaces/graph-target.interface';
import { TriggerType } from '../trigger-type.class';

@JsonObject("GraphTrigger")
export class GraphTrigger implements GraphTarget {

  parentGraphItem: GraphItem;
  graphService: GraphService;

  onTriggerAnchor: AnchorItem = {
    id: "ontrigger",
    label: "On trigger",
    callback: () => {
      this.onTrigger();
    }
  };

  inAnchors = [];

  outAnchors = [
    this.onTriggerAnchor
  ];

  constructor() {

  };

  init() {
    if (this.type === TriggerType.KEYBOARD && this.key != "") {
      document.addEventListener("keydown", (e: KeyboardEvent) => {
        console.log(e.key);
        
        if (e.key.toUpperCase() === this.key.toUpperCase()) {
          this.graphService.playIn(this.onTriggerAnchor, this.parentGraphItem);
        }
      });
    }
  }

  @JsonProperty("id")
  id = "";

  @JsonProperty("n")
  name = "";

  @JsonProperty("d")
  description = "";

  @JsonProperty("t")
  type = "";

  @JsonProperty("k")
  key = "";

  onTrigger() {
    this.graphService.playOut(this.onTriggerAnchor, this.parentGraphItem);
  }
}