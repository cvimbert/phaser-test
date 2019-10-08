import { Point } from './interfaces/point.interface';
import { TransformationNode } from './transformation-node.class';

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

  static properties = [
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
    
  constructor() {}

  static fromJsonString(jsonString: string): CloudNodeState {
    return CloudNodeState.fromObject(jsonString);
  }

  static fromObject(data: Object): CloudNodeState {
    let state = new CloudNodeState();

    CloudNodeState.properties.forEach(property => {
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

  // à tester...
  diffWithState(state: CloudNodeState): CloudNodeState {

    let diff = new CloudNodeState();

    CloudNodeState.properties.forEach(property => {
      if (this[property] != state[property]) {
        diff[property] = state[property];
      }
    });

    return diff;
  }
}