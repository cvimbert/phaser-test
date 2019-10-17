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
    //"initRotation",
    "relativeRotation",
    "ownX",
    "ownY",
    /*"relativeX",
    "relativeY"*/
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
  }
    
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

    let diff = new CloudNodeState();
    let props = CloudNodeState.propertiesSets[mode];

    props.forEach(property => {
      if (this[property] != state[property]) {
        diff[property] = state[property];
      }
    });

    return diff;
  }

  getUpdatedKeys(): string[] {
    return Object.keys(this).filter(key => this[key] != undefined);
  }
}