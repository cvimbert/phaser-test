import { CloudManager } from './cloud-manager.class';
import { CloudData } from './interfaces/cloud-data.interface';
import { SquareDisplayer } from './displayers/square-displayer.class';
import { CloudNode } from './cloud-node.class';

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
      },
      p3: {
        x: 400,
        y: 400
      }
    },
    structures: {
      struct1: {
        root: "p1",
        links: {
          p1: ["p2"],
          p2: ["p3"],
          p3: []
        }
      },
      struct2: {
        root: "p3",
        links: {
          p3: ["p2"],
          p2: ["p1"],
          p1: []
        }
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
    this.manager.load(this.testData);
    // this.manager.getStructure("struct1");

    this.game.events.emit("created");
  }

  generateGrid() {

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