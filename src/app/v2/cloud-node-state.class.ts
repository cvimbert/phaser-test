import { Point } from './interfaces/point.interface';
import { TransformationNode } from './transformation-node.class';

export class CloudNodeState {

  initRotation: number;
  absoluteRotation: number;
  relativeRotation: number;

  absolutePosition: Point;
  relativePosition: Point;
    
  constructor() {}

  static fromJsonString(jsonString: string): CloudNodeState {
    let state = new CloudNodeState();
    let data = JSON.parse(jsonString);

    state.initRotation = data.initRotation;
    state.absoluteRotation = data.absoluteRotation;

    state.absolutePosition = {
      x: data.absolutePosition.x,
      y: data.absolutePosition.y
    };

    state.relativePosition = {
      x: data.relativePosition.x,
      y: data.relativePosition.y
    };

    return state;
  }

  static fromNode(node: TransformationNode): CloudNodeState {
    let state = new CloudNodeState();
    state.initRotation = node.initRotation;
    state.absoluteRotation = node.absoluteRotation;

    state.absolutePosition = {
      x: node.absolutePosition.x,
      y: node.absolutePosition.y
    };

    state.relativePosition = {
      x: node.relativePosition.x,
      y: node.relativePosition.y
    };

    return state;
  }

  toJson(): string {
    return JSON.stringify(this);
  }
}