import { Transformation } from './transformation.class';
import { CloudNode } from '../cloud-node.class';
import { Point } from '../interfaces/point.interface';

export class AbsoluteTransform extends Transformation {

  private initX: number;
  private initY: number;

  x: number;
  y: number;

  constructor(
    protected targetNode: CloudNode,
    protected propagateToNodes: CloudNode[] = []
  ) {
    super();
    this.x = targetNode.x;
    this.y = targetNode.y;
  }

  update() {
    
  }
}