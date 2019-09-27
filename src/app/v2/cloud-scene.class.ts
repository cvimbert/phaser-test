import { CloudManager } from './cloud-manager.class';
import { CloudData } from './interfaces/cloud-data.interface';
import { SquareDisplayer } from './displayers/square-displayer.class';
import { CloudNode } from './cloud-node.class';

export class CloudScene extends Phaser.Scene {

  gridGraphics: Phaser.GameObjects.Graphics;
  manager: CloudManager;

  testData: CloudData = {
    globalSpritesScale: 0.4,
    points: {
      p1: {
        x: 400,
        y: 200,
        sprites: {
          /*head: {
            file: "head"
          }*/
        }
      },
      p2: {
        x: 300,
        y: 200,
        sprites: {
          /*rb: {
            file: "rbone1",
            originX: 0,
            originY: 0
          }*/
        }
      },
      p3: {
        x: 500,
        y: 200
      },
      p4: {
        x: 600,
        y: 300
      },
      p5: {
        x: 600,
        y: 400
      },
      p6: {
        x: 200,
        y: 300
      },
      p7: {
        x: 200,
        y: 400
      },
      p8: {
        x: 600,
        y: 100
      },
      p9: {
        x: 700,
        y: 300
      }
    },
    structures: {
      struct1: {
        root: "p1",
        links: {
          p1: ["p2", "p3"],
          p2: ["p6"],
          p3: ["p4", "p8"],
          p4: ["p5", "p9"],
          p5: [],
          p6: ["p7"],
          p7: [],
          p8: [],
          p9: []
        }
      }
    }
  };

  testData2: CloudData = {
    offset: {
      x: 0,
      y: 100
    },
    points: {
      p1: {
        x: 400,
        y: 200
      },
      p2: {
        x: 400,
        y: 300
      },
      p3: {
        x: 500,
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
    this.load.setBaseURL("./assets/");
    
    let spritesToPreload = this.manager.getSpritesFileList(this.testData);
    // console.log(spritesToPreload);
    
    spritesToPreload.forEach(fileName => this.load.image(fileName, `${ fileName }.png`));
  }

  create() {
    this.generateGrid();
    this.manager.load(this.testData);
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