import { Point } from './interfaces/point.interface';
import { CloudNodeState } from './cloud-node-state.class';
import { TransformationProperties } from './transformation-properties.class';

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

  ownPosition: Point = {
    x: 0,
    y: 0
  };


  // fonctions de convertion des positions et angles

  // hypothenus
  calculateHypothenus() {
    let xv = this.absolutePosition.x - (this.parent ? this.parent.absolutePosition.x : 0);
    let yv = this.absolutePosition.y - (this.parent ? this.parent.absolutePosition.y : 0);
    
    this.hypothenus = Math.sqrt(
      Math.pow(xv, 2) + Math.pow(yv, 2)
    );    
  }


  // A - Dans le sens descendant
  // 1 - absolute to relative
  absoluteToRelative() {
    this.absoluteToRelativeX();
    this.absoluteToRelativeY();
    this.absoluteToRelativeRotation();
  }

  absoluteToRelativeX() {
    this.relativePosition.x = this.absolutePosition.x - (this.parent ? this.parent.absolutePosition.x : 0);
  }

  absoluteToRelativeY() {
    this.relativePosition.y = this.absolutePosition.y - (this.parent ? this.parent.absolutePosition.y : 0);
  }

  absoluteToRelativeRotation() {
    this.relativeRotation = this.absoluteRotation - (this.parent ? this.parent.absoluteRotation : 0);
  }

  // 2 - own (depuis relative ou absolute, on verra)
  toOwn() {
    this.calculateHypothenus();
    this.toInitRotation();
    this.toOwnX();
    this.toOwnY();
  }

  toInitRotation() {
    this.initRotation = Math.atan2(this.relativePosition.y, this.relativePosition.x) + (this.parent ? this.parent.absoluteRotation : 0);
  }

  toOwnX() {
    this.ownPosition.x = Math.cos(this.initRotation) * this.hypothenus;
  }

  toOwnY() {
    this.ownPosition.y = Math.sin(this.initRotation) * this.hypothenus;
  }


  // B - Dans le sens montant
  // 1 - Own to relative / own to absolute ?
  ownToRelative(updatedProperties: string[]): string[] {

    if (updatedProperties.indexOf(TransformationProperties.OWN_X) != -1
      || updatedProperties.indexOf(TransformationProperties.OWN_Y) != -1) {
      this.ownToInitRotation();
      this.hypothenusByOwn();
    }
    
    // nécessaire dans tous les cas pour le calcul des coordonnées absolues
    this.ownToRelativeX();
    this.ownToRelativeY();
    
    // console.log(updatedProperties);
    
    // à vérifier si c'est vraiment utile
    let newProps: string[] = updatedProperties.filter(prop =>
      prop != TransformationProperties.OWN_X &&
      prop != TransformationProperties.OWN_Y);

    return newProps;
  }

  // hypothenus doit être connu
  ownToInitRotation() {
    this.initRotation =  Math.atan2(this.ownPosition.y, this.ownPosition.x);
  }

  hypothenusByOwn() {
    this.hypothenus =  Math.sqrt(Math.pow(this.ownPosition.x, 2) + Math.pow(this.ownPosition.y, 2));
  }

  // pas nécessaire dans les cas qui nous intéressent
  ownToRelativeAngle() {
     
  }

  ownToRelativeX() {
    this.relativePosition.x = Math.cos(this.initRotation - (this.parent ? this.parent.absoluteRotation : 0)) * this.hypothenus;
  }

  ownToRelativeY() {
    this.relativePosition.y = Math.sin(this.initRotation - (this.parent ? this.parent.absoluteRotation : 0)) * this.hypothenus;
  }
  
  // 2 - Relative to absolute
  relativeToAbsolute() {
    this.relativeToAbsoluteX();
    this.relativeToAbsoluteY();
    this.relativeToAbsoluteRotation();
  }

  relativeToAbsoluteX() {
    this.absolutePosition.x = this.relativePosition.x + (this.parent ? this.parent.absolutePosition.x : 0);
  }

  relativeToAbsoluteY() {
    this.absolutePosition.y = this.relativePosition.y + (this.parent ? this.parent.absolutePosition.y : 0);
  }

  relativeToAbsoluteRotation() {
    this.absoluteRotation = this.relativeRotation + (this.parent ? this.parent.absoluteRotation : 0);
  }

  // 3 - Own to absolute
  ownToAbsolute(updatedProperties: string[], recursive = false) {
    let newProps = this.ownToRelative(updatedProperties);
    this.relativeToAbsolute();

    if (recursive) {
      this.children.forEach(child => child.ownToAbsolute(newProps, recursive));
    }
  }

  getUpdatedProperties(partialState: CloudNodeState): string[] {
    return Object.keys(partialState);
  }

  // les trois prochaines méthodes ne devraient plus être utiles (dans le meilleur des mondes)
  getRelativePosition(): Point {
    return {
      x: this.parent ? this.absolutePosition.x - this.parent.absolutePosition.x : this.absolutePosition.x,
      y: this.parent ? this.absolutePosition.y - this.parent.absolutePosition.y : this.absolutePosition.y
    }
  }

  getAbsoluteRotation(): number {
    return this.relativeRotation + (this.parent ? this.parent.absoluteRotation : 0);
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

  calculateChildren() {
    this.children.forEach(child => child.calculateGeometry());
  }

  applyAbsoluteTranslation() {
    this.children.forEach(child => child.calculateGeometry());
  }

  applyRelativeTranslation() {
    this.calculateGeometry();
  }

  // calcul de la position du point dans son propre reférentiel
  calculateOwnPositionByRelativeRotation() {
    this.ownPosition = {
      x: Math.cos(this.initRotation) * this.hypothenus,
      y: Math.sin(this.initRotation) * this.hypothenus
    };
  }

  // à priori cette fonction peut disparaitre (ou pas)
  applyRelativeRotation() {

    this.absoluteRotation = this.relativeRotation + (this.parent ? this.parent.absoluteRotation : 0);

    // calcul des nouvelles positions relatives
    // parent.absoluteRotation ou absoluteRotation tout court, deux choix valables

    // c'est probablement ce calcul-ci qui ne retourne pas les bonnes valeurs dans certains cas
    this.relativePosition.x = this.parent ? Math.cos(this.initRotation - this.parent.absoluteRotation) * this.hypothenus : this.relativePosition.x;
    this.relativePosition.y = this.parent ? Math.sin(this.initRotation - this.parent.absoluteRotation) * this.hypothenus : this.relativePosition.y;

    // calcul des positions absolues
    this.absolutePosition = {
      x: (this.parent ? this.parent.absolutePosition.x : 0) + this.relativePosition.x,
      y: (this.parent ? this.parent.absolutePosition.y : 0) + this.relativePosition.y
    };

    this.children.forEach(child => child.applyRelativeRotation());
  }

  
  get ownX(): number {
    return this.ownPosition.x;
  }

  set ownX(value: number) {
    this.ownPosition.x = value;
  }

  get ownY(): number {
    return this.ownPosition.y;
  }

  set ownY(value: number) {
    this.ownPosition.y = value;
  }

  get relativeX(): number {
    return this.relativePosition.x;
  }

  set relativeX(value: number) {
    this.relativePosition.x = value;
  }

  get relativeY(): number {
    return this.relativePosition.y;
  }

  set relativeY(value: number) {
    this.relativePosition.y = value;
  }

  get absoluteX(): number {    
    return this.absolutePosition.x;
  }

  set absoluteX(value: number) {
    this.absolutePosition.x = value;
  }

  get absoluteY(): number {
    return this.absolutePosition.y;
  }

  set absoluteY(value: number) {
    this.absolutePosition.y = value;
  }
}