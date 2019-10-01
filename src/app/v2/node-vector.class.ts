import { Point } from './interfaces/point.interface';
import { TransformationNode } from './transformation-node.class';

export class NodeVector {

  parent: TransformationNode;
  children: TransformationNode[] = [];

  hypothenus: number = 0;

  relativeRotation: number = 0;
  absoluteRotation: number = 0;
  initRotation: number = 0;

  relativePosition: Point = {
    x: 0,
    y: 0
  };

  absolutePosition: Point = {
    x: 0,
    y: 0
  };

  basePosition: Point;

}