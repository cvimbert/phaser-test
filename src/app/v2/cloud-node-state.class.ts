import { Point } from './interfaces/point.interface';
import { TransformationNode } from './transformation-node.class';
import { DiffMode } from './enums/diff-mode.enum';

export class CloudNodeState {

  initRotation: number;
  absoluteRotation: number;
  relativeRotation: number;

  absolutePosition: Point;
  absoluteX: number;
  absoluteY: number;

  relativePosition: Point;
  relativeX: number;
  relativeY: number;

  ownPosition: Point;
  ownX: number;
  ownY: number;

  // data: any = {};

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

  static fromJsonString(jsonString: string): CloudNodeState {
    return CloudNodeState.fromObject(jsonString);
  }

  static fromObject(data: Object): CloudNodeState {
    let state = new CloudNodeState();

    CloudNodeState.allProperties.forEach(property => {
      state[property] = data[property];
    });

    return state;
  }

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

  toJson(): string {
    return JSON.stringify(this);
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