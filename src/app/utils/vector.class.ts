export class Vector {

  parentVector: Vector;

  private _localX: number;
  private _localY: number;

  private _absoluteX: number;
  private _absoluteY: number;

  private _rotation: number;
  private _scale: number;

  private _referenceAngle: number;
  private _hypothenus: number;


  constructor(
    x: number,
    y: number
  ) {
    this._localX = x;
    this._localY = y;
  }

  get localX(): number {
    return this._localX;
  }

  set localX(value: number) {

  }

  get localY(): number {
    return this._localY;
  }

  set localY(value: number) {

  }

  get absoluteX(): number {
    return this._absoluteX;
  }

  set absoluteX(value: number) {

  }

  get absoluteY(): number {
    return this._absoluteY;
  }

  set absoluteY(value: number) {

  }

  calculateReferenceAngleAndHypothenus() {

  }
}