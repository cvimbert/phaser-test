import { Point } from './interfaces/point.interface';
import { CloudSettings } from './cloud-settings.class';
import { RotationType } from './enums/rotation-type.enum';

export class NodeVector {

  // logique
  parent: NodeVector;
  children: NodeVector[];

  // geometrie
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


  get rRot(): number {
    return this.relativeRotation - (CloudSettings.rotationType === RotationType.PARENT_RELATIVE ? this.initRotation : 0);
  }

  getAbsoluteRotation(): number {
    return this.rRot + (this.parent ? this.parent.absoluteRotation : 0);
  }

  getAngleWithParent(): number {
    // console.log(this.id, this.relativePosition);
    return Math.atan2(this.parent ? this.relativePosition.y : 0, this.parent ? this.relativePosition.x : 0);
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

  calculateHypothenus() {
    this.hypothenus = Math.sqrt(
      Math.pow(this.relativePosition.x, 2) + Math.pow(this.relativePosition.y, 2)
    );
  }

  calculateChildren() {
    this.children.forEach(child => child.calculateGeometry());
  }

  applyAbsoluteTranslation() {
    this.children.forEach(child => child.calculateGeometry());
  }

  absoluteTranslationEnd() {
    // calcul de la position relative
    this.relativePosition = {
      x: this.absolutePosition.x - (this.parent ? this.parent.absolutePosition.x : 0),
      y: this.absolutePosition.y - (this.parent ? this.parent.absolutePosition.y : 0)
    };

    this.basePosition = {
      x: this.relativePosition.x,
      y: this.relativePosition.y
    };
  }

  applyRelativeTranslation() {
    this.calculateGeometry();
  }

  applyRelativeRotation() {

    this.absoluteRotation = this.rRot + (this.parent ? this.parent.absoluteRotation : 0);

    // calcul des nouvelles positions relatives
    // parent.absoluteRotation ou absoluteRotation tout court, deux choix valables
    this.relativePosition.x = this.parent ? Math.cos(this.initRotation - this.parent.absoluteRotation) * this.hypothenus : this.basePosition.x;
    this.relativePosition.y = this.parent ? Math.sin(this.initRotation - this.parent.absoluteRotation) * this.hypothenus : this.basePosition.y;

    // calcul des positions absolues
    this.absolutePosition = {
      x: (this.parent ? this.parent.absolutePosition.x : 0) + this.relativePosition.x,
      y: (this.parent ? this.parent.absolutePosition.y : 0) + this.relativePosition.y
    };

    this.children.forEach(child => child.applyRelativeRotation());
  }
}