import { CloudNode } from './cloud-node.class';
import { Point } from './interfaces/point.interface';
import { CloudScene } from './cloud-scene.class';

export class TransformationNode {

  // logic
  node: CloudNode;
  parent: TransformationNode;
  children: TransformationNode[] = [];

  // geometry
  hypothenus: number;
  relativeRotation: number;
  relativePosition: Point;
  absolutePosition: Point;

  // display
  private linkDisplayer: Phaser.GameObjects.Graphics;

  constructor(
    public id: string,
    private scene: Phaser.Scene
  ) {
    
  }

  initGeometry() {

    this.absolutePosition = {
      x: this.node.x,
      y: this.node.y
    };

    this.relativePosition = this.getRelativePosition();
    this.relativeRotation = this.getAngleWithParent();
    this.calculateHypothenus();
  }

  getRelativePosition(): Point {
    return {
      x: this.parent ? this.node.x - this.parent.node.x : this.node.x,
      y: this.parent ? this.node.y - this.parent.node.y : this.node.y
    }
  }

  getAngleWithParent(): number {
    return Math.atan2(this.relativePosition.y, this.relativePosition.x);
  }

  calculateAndRender() {
    this.calculateGeometry();
    this.render();
  }

  // temporaire
  calculateGeometry() {
    this.absolutePosition = {
      x: (this.parent ? this.parent.absolutePosition.x : 0) + this.relativePosition.x,
      y: (this.parent ? this.parent.absolutePosition.y : 0) + this.relativePosition.y
    };

    this.calculateChildren();
  }

  calculateChildren() {
    this.children.forEach(child => child.calculateGeometry());
  }

  applyAbsoluteTranslation() {

  }

  applyRelativeTranslation() {
    
  }

  // temporaire aussi
  render() {
    this.node.x = this.absolutePosition.x;
    this.node.y = this.absolutePosition.y;

    this.node.render();
    this.children.forEach(child => child.render());
    this.displayLink();
  }

  calculateHypothenus() {
    this.hypothenus = Math.sqrt(
      Math.pow(this.relativePosition.x, 2) + Math.pow(this.relativePosition.y, 2)
    );
  }

  displayLink() {
    if (!this.linkDisplayer) {
      this.linkDisplayer = this.scene.add.graphics({
        lineStyle: {
          color: 0x000000,
          width: 2
        },
        fillStyle: {
          color: 0x000000
        }
      });
    } else {
      this.linkDisplayer.clear();
    }

    if (this.parent) {
      this.linkDisplayer.lineBetween(this.parent.node.x, this.parent.node.y, this.node.x, this.node.y);
    }

    this.linkDisplayer.fillCircle(this.node.x, this.node.y, 3);
  }
}