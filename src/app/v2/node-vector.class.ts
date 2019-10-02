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

  ownPosition: Point;


  get rRot(): number {
    return this.relativeRotation - (CloudSettings.rotationType === RotationType.PARENT_RELATIVE ? this.initRotation : 0);
  }

  getAbsoluteRotation(): number {
    return this.rRot + (this.parent ? this.parent.absoluteRotation : 0);
  }

  getAngleWithParent(): number {
    let xv = this.absolutePosition.x - (this.parent ? this.parent.absolutePosition.x : 0);
    let yv = this.absolutePosition.y - (this.parent ? this.parent.absolutePosition.y : 0);

    return Math.atan2(yv, xv);
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
    let xv = this.absolutePosition.x - (this.parent ? this.parent.absolutePosition.x : 0);
    let yv = this.absolutePosition.y - (this.parent ? this.parent.absolutePosition.y : 0);
    
    this.hypothenus = Math.sqrt(
      Math.pow(xv, 2) + Math.pow(yv, 2)
    );

    // console.log(this.hypothenus);
    
  }

  calculateChildren() {
    this.children.forEach(child => child.calculateGeometry());
  }

  applyAbsoluteTranslation() {
    this.children.forEach(child => child.calculateGeometry());
  }

  absoluteTranslationEnd() {
    // calcul de la position relative

    // c'est sûrement là que le calcule de position n'est pas correct
    // à ramener dans un autre repère

    this.calculateHypothenus();
    this.initRotation = this.getAngleWithParent();

    this.relativePosition = {
      x: Math.cos(this.initRotation) * this.hypothenus,
      y: Math.sin(this.initRotation) * this.hypothenus
    }

    // this.relativePosition = {
    //   x: this.absolutePosition.x - (this.parent ? this.parent.absolutePosition.x : 0),
    //   y: this.absolutePosition.y - (this.parent ? this.parent.absolutePosition.y : 0)
    // };

    
    // this.relativeRotation = this.getAngleWithParent();
    

    // du coup, est-ce-que ownPosition est vraiment utile ?
    // tentative de suppression
    this.ownPosition = {
      x: 0,
      y: 0
    };
  }

  applyRelativeTranslation() {
    this.calculateGeometry();
  }

  applyRelativeRotation() {

    this.absoluteRotation = this.rRot + (this.parent ? this.parent.absoluteRotation : 0);

    // calcul des nouvelles positions relatives
    // parent.absoluteRotation ou absoluteRotation tout court, deux choix valables
    this.relativePosition.x = this.parent ? Math.cos(this.initRotation - this.parent.absoluteRotation) * this.hypothenus : this.relativePosition.x;
    this.relativePosition.y = this.parent ? Math.sin(this.initRotation - this.parent.absoluteRotation) * this.hypothenus : this.relativePosition.y;

    // calcul des positions absolues
    this.absolutePosition = {
      x: (this.parent ? this.parent.absolutePosition.x : 0) + this.relativePosition.x,
      y: (this.parent ? this.parent.absolutePosition.y : 0) + this.relativePosition.y
    };

    this.children.forEach(child => child.applyRelativeRotation());
  }
}