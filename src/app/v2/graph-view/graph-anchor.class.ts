import { JsonObject, JsonProperty } from 'json2typescript';
import { GraphTarget } from './interfaces/graph-target.interface';
import { AnchorItem } from './interfaces/anchor-item.interface';
import { BaseGameStructure } from '../game-structures/base-game-structure.class';

@JsonObject("GraphAnchor")
export class GraphAnchor extends BaseGameStructure implements GraphTarget {

  inAnchors: AnchorItem[] = [];
  outAnchors: AnchorItem[] = [];

  label = "";

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

    this.label = this.name;
  }

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