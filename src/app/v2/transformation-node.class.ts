import { CloudNode } from './cloud-node.class';
import { Point } from './interfaces/point.interface';
import { CloudScene } from './cloud-scene.class';
import { CloudSettings } from './cloud-settings.class';
import { RotationType } from './enums/rotation-type.enum';

export class TransformationNode {

  // logic
  node: CloudNode;
  parent: TransformationNode;
  children: TransformationNode[] = [];

  // geometry
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

    console.log(this.id, this.relativeRotation);
    // console.log(this.parent ? this.parent.node.id : "*", this.node.id, this.relativeRotation);
    
    this.calculateHypothenus();
  }

  get rRot(): number {
    return this.relativeRotation - (CloudSettings.rotationType === RotationType.PARENT_RELATIVE ? this.initRotation : 0);
  }

  getAbsoluteRotation(): number {
    return this.rRot + (this.parent ? this.parent.absoluteRotation : 0);
  }

  getRelativePosition(): Point {
    return {
      x: this.parent ? this.node.x - this.parent.node.x : this.node.x,
      y: this.parent ? this.node.y - this.parent.node.y : this.node.y
    }
  }

  getAngleWithParent(): number {
    // console.log(this.id, this.relativePosition);
    return Math.atan2(this.parent ? this.relativePosition.y : 0, this.parent ? this.relativePosition.x : 0);
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

    // on devrait ne avoir à calculer la nouvelle longueur de l'hypothenus qu'à l'initiation d'une nouvelle rotation
    this.calculateHypothenus();

    this.calculateChildren();
  }

  calculateChildren() {
    this.children.forEach(child => child.calculateGeometry());
  }

  applyAbsoluteTranslation() {
    this.children.forEach(child => child.calculateGeometry());
  }

  applyRelativeTranslation() {
    this.calculateGeometry();
  }

  applyRelativeRotation() {

    this.absoluteRotation = this.rRot + (this.parent ? this.parent.absoluteRotation : 0);

    // console.log(this.absoluteRotation);

    // calcul des nouvelles positions relatives
    // parent.absoluteRotation ou absoluteRotation tout court, deux choix valables
    this.relativePosition.x = this.parent ? Math.cos(this.initRotation - this.parent.absoluteRotation) * this.hypothenus : this.basePosition.x;
    this.relativePosition.y = this.parent ? Math.sin(this.initRotation - this.parent.absoluteRotation) * this.hypothenus : this.basePosition.y;

    // console.log(this.parent.absolutePosition);

    // calcul des positions absolues
    this.absolutePosition = {
      x: (this.parent ? this.parent.absolutePosition.x : 0) + this.relativePosition.x,
      y: (this.parent ? this.parent.absolutePosition.y : 0) + this.relativePosition.y
    };

    this.children.forEach(child => child.applyRelativeRotation());
  }

  // temporaire aussi
  render() {
    this.node.x = this.absolutePosition.x;
    this.node.y = this.absolutePosition.y;
    this.node.rotation = -this.absoluteRotation || 0;

    // console.log(this.node.x, this.node.y, this.node.rotation);

    this.node.render();
    this.children.forEach(child => child.render());

    // this.displayLink();
  }

  calculateHypothenus() {
    this.hypothenus = Math.sqrt(
      Math.pow(this.relativePosition.x, 2) + Math.pow(this.relativePosition.y, 2)
    );
  }

  displayLinks(recursive = true, color: number) {
    this.displayLink(color);

    if (recursive) {
      this.children.forEach(child => child.displayLinks(true, color));
    }
  }

  displayLink(color = 0x000000) {
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