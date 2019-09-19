export class SquareDisplayer extends Phaser.GameObjects.Graphics {

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number
  ) {
    super(scene, {
      fillStyle: {
        color: 0x222222
      },
      lineStyle: {
        color: 0x000000,
        width: 1
      }
    });

    this.x = x;
    this.y = y;

    this.fillRoundedRect(-5, -5, 10, 10, 2);
  }
}