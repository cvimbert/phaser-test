import { BaseGraphItemComponent } from './components/base-graph-item/base-graph-item.component';
import { GraphScene } from './graph-scene.class';
import { Point } from '../interfaces/point.interface';

export class GraphLink {

  fromItem: BaseGraphItemComponent;
  fromAnchor: string;
  toItem: BaseGraphItemComponent;
  toAnchor: string;
  scene: GraphScene;

  private lineGraphics: Phaser.GameObjects.Graphics;
  private arrow: Phaser.GameObjects.Graphics;


  drawLink() {
    if (!this.lineGraphics) {
      this.lineGraphics = this.scene.add.graphics({
        lineStyle: {
          color: 0x000000,
          width: 2
        }
      });
    } else {
      this.lineGraphics.clear();
    }

    let fromPoint = this.fromItem.getAnchorPosition(this.fromAnchor);
    let toPoint = this.toItem.getAnchorPosition(this.toAnchor);

    let points = this.getSplinePoints(toPoint, fromPoint);

    let curve = new Phaser.Curves.Spline(points);
    curve.draw(this.lineGraphics);

    let tPoint = curve.getPoint(0.5);
    let tTangent = curve.getTangent(0.5);
    let angle = Math.atan2(tTangent.y, tTangent.x);

    this.drawArrow(tPoint.x, tPoint.y, angle);
  }

  drawArrow(x: number, y: number, rotation: number) {
    if (!this.arrow) {
      this.arrow = this.scene.add.graphics({
        fillStyle: {
          color: 0x000000
        }
      });

      this.arrow.fillTriangle(10, -6, 10, 6, -10, 0);
    }

    this.arrow.x = x;
    this.arrow.y = y;
    this.arrow.rotation = rotation;
  }

  getSplinePoints(from: Point, to: Point): Phaser.Math.Vector2[] {
    
    let xBat = to.x - from.x;
    let yBat = to.y - from.y;

    let yMini = yBat / 8;
    let xQuarter = xBat / 3.5;

    let points: Point[] = [
      { x: from.x, y: from.y },
      { x: from.x + xQuarter, y: from.y + yMini },
      { x: to.x - xQuarter, y: to.y - yMini },
      { x: to.x, y: to.y },
    ];

    return points.map(point => new Phaser.Math.Vector2(point.x, point.y));
  }

  subscribeToPositions() {
    this.fromItem.positionSubject.subscribe(() => {
      this.onMove();
    });
    this.toItem.positionSubject.subscribe(() => {
      this.onMove();
    });
  }

  onMove() {
    this.drawLink();
  }
}