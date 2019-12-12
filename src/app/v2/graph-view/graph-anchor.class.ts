import { JsonObject, JsonProperty } from 'json2typescript';
import { GraphTarget } from './interfaces/graph-target.interface';
import { GraphItem } from './graph-item.class';
import { GraphService } from './services/graph.service';
import { AnchorItem } from './interfaces/anchor-item.interface';

@JsonObject("GraphAnchor")
export class GraphAnchor implements GraphTarget {

  parentGraphItem: GraphItem;
  graphService: GraphService;

  inAnchors: AnchorItem[] = [];
  outAnchors: AnchorItem[] = [];

  baseOutAnchor: AnchorItem = {
    id: "ontriggered",
    label: "On triggered",
    callback: () => {
      this.triggerOut();
    }
  };

  baseInAnchor: AnchorItem = {
    id: "trigger",
    label: "Trigger",
    callback: () => {
      this.triggerIn();
    }
  };


  init() {
    if (this.type === "in") {
      this.outAnchors = [
        this.baseOutAnchor
      ];
    }

    if (this.type === "out") {
      this.inAnchors = [
        this.baseInAnchor
      ];
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

  @JsonProperty("an")
  anchorName = "";

  @JsonProperty("aid")
  anchorId = "";

  triggerIn() {

  }

  triggerOut() {
    // this.graphService.playIn(this.baseOutAnchor, this.parentGraphItem);
  }
}