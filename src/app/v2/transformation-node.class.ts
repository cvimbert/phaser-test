import { CloudNode } from './cloud-node.class';
import { Point } from './interfaces/point.interface';
import { CloudScene } from './cloud-scene.class';
import { CloudSettings } from './cloud-settings.class';
import { RotationType } from './enums/rotation-type.enum';
import { NodeVector } from './node-vector.class';

export class TransformationNode extends NodeVector {

  // logic
  node: CloudNode;
  parent: TransformationNode;
  children: TransformationNode[] = [];

  // display
  private linkDisplayer: Phaser.GameObjects.Graphics;
  private linkEnabled = false;

  private originDisplayer: Phaser.GameObjects.Graphics;

  constructor(
    public id: string,
    private scene: Phaser.Scene
  ) {
    super();
  }

  initGeometry() {

    this.absolutePosition = {
      x: this.node.x,
      y: this.node.y
    };

    this.relativePosition = this.getRelativePosition();
    this.basePosition = this.getRelativePosition();
    this.initRotation = this.getAngleWithParent();

    switch (CloudSettings.rotationType) {

      case RotationType.NODE_RELATIVE:
        this.relativeRotation = 0;
        break

      case RotationType.PARENT_RELATIVE:
        this.relativeRotation = this.getAngleWithParent();
        break;
    }
    
    this.calculateHypothenus();
  }

  // à passer dans NodeVector ?
  getRelativePosition(): Point {
    return {
      x: this.parent ? this.node.x - this.parent.node.x : this.node.x,
      y: this.parent ? this.node.y - this.parent.node.y : this.node.y
    }
  }

  calculateAndRender() {
    this.calculateGeometry();
    this.render();
  }

  // temporaire aussi
  render() {
    this.node.x = this.absolutePosition.x;
    this.node.y = this.absolutePosition.y;
    this.node.rotation = -this.absoluteRotation || 0;

    if (this.originDisplayer) {
      this.originDisplayer.x = this.absolutePosition.x;
      this.originDisplayer.y = this.absolutePosition.y;
      this.originDisplayer.rotation = -this.absoluteRotation || 0;
    }

    // console.log(this.node.x, this.node.y, this.node.rotation);

    this.node.render();
    this.children.forEach(child => child.render());

    this.displayLink();
  }

  displayLinks(first = true, recursive = true, color = 0x000000) {

    if (!first) {
      this.linkEnabled = true;
      this.displayLink(color);
    }

    if (recursive) {
      this.children.forEach(child => child.displayLinks(false, true, color));
    }
  }

  clearAllDisplay() {
    this.clearLink();
    this.clearOrigin();
  }

  clearLink() {

    this.linkEnabled = false;

    if (this.linkDisplayer) {
      this.linkDisplayer.clear();
    }
  }

  clearOrigin() {
    if (this.originDisplayer) {
      this.originDisplayer.clear();
      this.originDisplayer = null;
    }
  }

  displayOrigin() {

    if (!this.originDisplayer) {
      this.originDisplayer = this.scene.add.graphics({
        lineStyle: {
          color: 0x000000,
          width: 2
        },
        fillStyle: {
          color: 0x000000
        }
      });

      this.originDisplayer.fillCircle(0, 0, 5);
      this.originDisplayer.lineBetween(-8, 0, 8, 0);
      this.originDisplayer.lineBetween(0, -8, 0, 8);

      this.originDisplayer.x = this.node.x;
      this.originDisplayer.y = this.node.y;
      this.originDisplayer.rotation = -this.absoluteRotation;
    }
  }

  displayLink(color = 0x000000) {

    if (!this.linkEnabled) return;

    if (!this.linkDisplayer) {
      this.linkDisplayer = this.scene.add.graphics({
        lineStyle: {
          color: color,
          width: 2
        },
        fillStyle: {
          color: color
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