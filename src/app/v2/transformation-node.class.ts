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
  absoluteRotation: number;
  initRotation: number;

  relativePosition: Point;
  absolutePosition: Point;
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
    this.relativeRotation = 0;
    this.absoluteRotation = 0;

    // console.log(this.absoluteRotation);
    console.log(this.parent ? this.parent.node.id : "*", this.node.id, this.relativeRotation);
    
    this.calculateHypothenus();
  }


  getAbsoluteRotation(): number {
    return this.relativeRotation + (this.parent ? this.parent.absoluteRotation : 0);
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

    // on devrait ne pouvoir calculer la nouvelle longueur de l'hypothenus qu'à l'initiation d'une nouvelle rotation
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

    this.absoluteRotation = this.relativeRotation + (this.parent ? this.parent.relativeRotation : 0);

    // console.log(this.absoluteRotation);

    // calcul des nouvelles positions relatives
    // this.relativePosition.x = Math.cos(this.absoluteRotation) * this.hypothenus;
    // return this.parentContainer ? Math.cos(this.initAngle - this.parentContainer.absoluteRotation) * this.hypothenus : this.xPos;
    this.relativePosition.x = this.parent ? Math.cos(this.initRotation - this.parent.absoluteRotation) * this.hypothenus : this.basePosition.x;
    this.relativePosition.y = this.parent ? Math.sin(this.initRotation - this.parent.absoluteRotation) * this.hypothenus : this.basePosition.y;

    // console.log(this.relativePosition);
    

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