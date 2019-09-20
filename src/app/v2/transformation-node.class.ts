import { CloudNode } from './cloud-node.class';
import { Point } from './interfaces/point.interface';
import { CloudScene } from './cloud-scene.class';

export class TransformationNode {

  // logic
  node: CloudNode;
  parent: TransformationNode;
  children: TransformationNode[] = [];

  // geometry
  relativeRotation: number;
  relativePosition: Point;

  // display
  private linkDisplayer: Phaser.GameObjects.Graphics;

  constructor(
    public id: string,
    private scene: Phaser.Scene
  ) {
    
  }

  initGeometry() {
    this.relativePosition = this.getRelativePosition();
    this.relativeRotation = this.getAngleWithParent();
  }

  getRelativePosition(): Point {
    return {
      x: this.parent ? this.node.x - this.parent.node.x : 0,
      y: this.parent ? this.node.y - this.parent.node.y : 0
    }
  }

  getAngleWithParent(): number {
    return Math.atan2(this.relativePosition.y, this.relativePosition.x);
  }

  displayLink() {
    if (!this.linkDisplayer) {
      this.linkDisplayer = this.scene.add.graphics({
        lineStyle: {
          color: 0x000000,
          width: 2
        }
      });
    } else {
      this.linkDisplayer.clear();
    }

    if (this.parent) {
      this.linkDisplayer.lineBetween(this.parent.node.x, this.parent.node.y, this.node.x, this.node.y);
    }
  }
}