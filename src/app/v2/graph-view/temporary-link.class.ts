import { Point } from '../interfaces/point.interface';
import { GraphLink } from './graph-link.class';

export class TemporaryLink {

  link: Phaser.GameObjects.Graphics;

  constructor(
    private scene: Phaser.Scene,
    private startPoint: Point
  ) {
    this.scene.input.on("pointermove", this.linkDraw, this);
  }

  linkDraw(pointer: Phaser.Input.Pointer) {    

    if (!this.link) {
      this.link = this.scene.add.graphics({
        lineStyle: {
          color: 0x000000,
          width: 2
        }
      });
    } else {
      this.link.clear();
    }

    let toPoint = {
      x: pointer.x,
      y: pointer.y
    };

    let points = GraphLink.getSplinePoints(toPoint, this.startPoint);

    let curve = new Phaser.Curves.Spline(points);
    curve.draw(this.link);
  }

  destroy() {
    this.link.clear();
    this.scene.input.off("pointermove", this.linkDraw);
  }

}