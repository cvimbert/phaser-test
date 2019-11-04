import { BaseGraphItemComponent } from './components/base-graph-item/base-graph-item.component';
import { GraphScene } from './graph-scene.class';

export class GraphLink {

  fromItem: BaseGraphItemComponent;
  fromAnchor: string;
  toItem: BaseGraphItemComponent;
  toAnchor: string;
  scene: GraphScene;

  private lineGraphics: Phaser.GameObjects.Graphics;


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

    // les direction ne sont pas fonctionnelles, à voir plus tard
    let verticalDirection = 1;
    let horizontalDirection = 1;

    let bat = (toPoint.x - fromPoint.x) / 4;
    let yBat = verticalDirection * ((toPoint.y - fromPoint.y) / 2);
    
    let points: Phaser.Math.Vector2[] = [
      new Phaser.Math.Vector2(fromPoint.x, fromPoint.y),
      new Phaser.Math.Vector2(fromPoint.x + bat, fromPoint.y + 20),
      new Phaser.Math.Vector2(fromPoint.x + bat * 2, fromPoint.y + yBat),

      new Phaser.Math.Vector2(toPoint.x - bat * 2, toPoint.y - yBat),
      new Phaser.Math.Vector2(toPoint.x - bat, toPoint.y - 20),
      new Phaser.Math.Vector2(toPoint.x, toPoint.y)
    ];

    let curve = new Phaser.Curves.Spline(points);
    curve.draw(this.lineGraphics);
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