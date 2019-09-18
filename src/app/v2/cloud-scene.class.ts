import { CloudManager } from './cloud-manager.class';
import { CloudData } from './interfaces/cloud-data.interface';

export class CloudScene extends Phaser.Scene {

  gridGraphics: Phaser.GameObjects.Graphics;
  manager: CloudManager;

  testData: CloudData = {
    points: {
      p1: {
        x: 100,
        y: 100
      },
      p2: {
        x: 400,
        y: 200
      }
    }
  }

  constructor() {
    super({
      key: "MainScene"
    });

    this.manager = new CloudManager(this);
  }

  preload() {

  }

  create() {
    this.generateGrid();
  }

  generateGrid() {

    // Lignes verticales
    this.gridGraphics = this.add.graphics();

    let step = 25;

    let width = <number>this.scene.manager.game.config.width;
    let height = <number>this.scene.manager.game.config.height;

    for (let i = 0; i <= width; i += step) {

      if (i % 100 == 0) {
        this.gridGraphics.lineStyle(0.5, 0x000000, 0.8);
      } else {
        this.gridGraphics.lineStyle(0.5, 0x000000, 0.2);
      }

      let line = new Phaser.Geom.Line(i, 0, i, height);
      this.gridGraphics.strokeLineShape(line);
    }

    for (let i = 0; i <= height; i += step) {
      if (i % 100 == 0) {
        this.gridGraphics.lineStyle(0.5, 0x000000, 0.8);
      } else {
        this.gridGraphics.lineStyle(0.5, 0x000000, 0.2);
      }

      let line = new Phaser.Geom.Line(0, i, width, i);
      this.gridGraphics.strokeLineShape(line);
    }
  }
}