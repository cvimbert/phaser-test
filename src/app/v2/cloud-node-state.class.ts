import { TransformationNode } from './transformation-node.class';
import { DiffMode } from './enums/diff-mode.enum';
import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject("CloudNodeState")
export class CloudNodeState {

  @JsonProperty("ir")
  initRotation: number = null;

  @JsonProperty("ar")
  absoluteRotation: number = null;

  @JsonProperty("rr")
  relativeRotation: number = null;

  @JsonProperty("ax")
  absoluteX: number = null;

  @JsonProperty("ay")
  absoluteY: number = null;

  @JsonProperty("rx")
  relativeX: number = null;

  @JsonProperty("ry")
  relativeY: number = null;

  @JsonProperty("ox")
  ownX: number = null;

  @JsonProperty("oy")
  ownY: number = null;

  static allProperties = [
    "initRotation",
    "relativeRotation",
    "absoluteRotation",
    "relativeX",
    "relativeY",
    "absoluteX",
    "absoluteY",
    "ownX",
    "ownY"
  ];

  static relativeProperties = [
    "relativeRotation",
    "ownX",
    "ownY"
  ];

  static absoluteProperties = [
    "absoluteRotation",
    "absoluteX",
    "absoluteY"
  ];

  static propertiesSets = {
    [DiffMode.ALL]: CloudNodeState.allProperties,
    [DiffMode.RELATIVE]: CloudNodeState.relativeProperties,
    [DiffMode.ABSOLUTE]: CloudNodeState.absoluteProperties
  };
    
  constructor() {}

  static fromNode(node: TransformationNode): CloudNodeState {
    let state = new CloudNodeState();
    state.initRotation = node.initRotation;
    state.relativeRotation = node.relativeRotation;
    state.absoluteRotation = node.absoluteRotation;

    state.absoluteX = node.absolutePosition.x;
    state.absoluteY = node.absolutePosition.y;

    state.relativeX = node.relativePosition.x;
    state.relativeY = node.relativePosition.y;

    state.ownX = node.ownPosition.x;
    state.ownY = node.ownPosition.y;

    return state;
  }

  diffWithState(state: CloudNodeState, mode: DiffMode): CloudNodeState {

    // console.log("mode =>", mode);
    console.log(this, state);
    
    let diff = new CloudNodeState();
    let props = CloudNodeState.propertiesSets[mode];

    // console.log("props", props);
    

    props.forEach(property => {
      
      if (typeof this[property] === "number") {

        // ajout d'une tolérance pour les erreurs d'arrondi lors des recalculs
        if (Math.abs(this[property] - state[property]) > 0.5) {
          diff[property] = state[property];
        }
      } else {
        if (this[property] != state[property]) {
          diff[property] = state[property];
        }
      }
      
    });

    return diff;
  }

  getUpdatedKeys(): string[] {
    return Object.keys(this).filter(key => this[key] != undefined);
  }
}