import { JsonObject, JsonProperty } from 'json2typescript';
import { GraphTarget } from './interfaces/graph-target.interface';
import { OutLink } from './out-link.class';
import { GraphService } from './services/graph.service';
import { SerializableAnchorItem } from './serializable-anchor-item.class';
import { AnchorItem } from './interfaces/anchor-item.interface';

@JsonObject("GraphItem")
export class GraphItem {

  constructor() {}

  graphService: GraphService;

  @JsonProperty("id", String)
  id = "";

  @JsonProperty("type", String)
  type = "";

  @JsonProperty("x", Number)
  x = 0;

  @JsonProperty("y", Number)
  y = 0;

  @JsonProperty("itemId", String)
  itemId = "";

  @JsonProperty("outLinks", [OutLink])
  outLinks: OutLink[] = [];

  @JsonProperty("ianchor", Number)
  anchorIndex = 0;

  @JsonProperty("outAAnchors", [SerializableAnchorItem])
  outActiveAnchors: SerializableAnchorItem[] = [];

  @JsonProperty("inAAnchors", [SerializableAnchorItem])
  inActiveAnchors: SerializableAnchorItem[] = [];

  outAnchors: AnchorItem[];
  inAnchors: AnchorItem[];

  targetItem: GraphTarget;

  init(target: GraphTarget, graphService: GraphService) {
    this.targetItem = target;
    target.graphService = graphService;
    target.parentGraphItem = this;

    target.init();
    this.generateAnchors();
  }

  generateAnchors() {

    this.outAnchors = [];

    for (let serItem of this.outActiveAnchors) {
      let titem = this.targetItem.outAnchors.find(item => item.id === serItem.type);

      this.outAnchors.push({
        id: serItem.id,
        label: titem.label,
        type: serItem.type,
        callback: titem.callback,
        nameGetter: titem.nameGetter,
        argumentValues: serItem.arguments
      });
    }

    this.inAnchors = [];

    for (let serItem of this.inActiveAnchors) {
      let titem = this.targetItem.inAnchors.find(item => item.id === serItem.type);

      this.inAnchors.push({
        id: serItem.id,
        label: titem.label,
        type: serItem.type,
        callback: titem.callback,
        nameGetter: titem.nameGetter,
        argumentValues: serItem.arguments
      });
    }

    if (this.graphService) {
      this.graphService.mainView.update();
    }
  }

  removeLink(link: OutLink) {
    let index = this.outLinks.indexOf(link);
    
    if (index != -1) {
      this.outLinks.splice(index, 1);
    } else {
      console.warn("Link unavailable in graphItem");
    }
  }

  pushItem(item: SerializableAnchorItem, inOut: string) {
    if (inOut === "in") {
      this.inActiveAnchors.push(item);
    } else if (inOut === "out") {
      this.outActiveAnchors.push(item);
    }

    this.generateAnchors();
  }
}