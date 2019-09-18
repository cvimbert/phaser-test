import { CloudPointData } from './interfaces/cloud-point-data.interface';

export class CloudNode {

  displayer: Phaser.GameObjects.Graphics;

  constructor(
    public scene: Phaser.Scene,
    public data: CloudPointData
  ) {

  }

  showDisplayer() {
    this.displayer = this.scene.add.graphics({
      fillStyle: {
        color: 0x000000
      },
      lineStyle: {
        color: 0x000000,
        width: 2
      }
    });

    this.displayer.fillCircle(0, 0, 3);
    this.displayer.setPosition(this.data.x, this.data.y);
  }
}