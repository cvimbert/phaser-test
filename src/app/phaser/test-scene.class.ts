import { ObjectContainer } from './bones/object-container.class';
import { StructureData } from './interfaces/structure-data.interface';
import { StructureManager } from './bones/structure-manager.class';
import { FlatStructureData } from './interfaces/flat-structure-data.interface';

export class TestScene extends Phaser.Scene {

  private loadedFiles: string[] = [];
  private b1: ObjectContainer;

  private gridSprite: Phaser.GameObjects.Graphics;

  private tween: Phaser.Tweens.Tween;

  mainManager: StructureManager;

  private sprites: { [key: string]: Object } = {
    head: {
      file: "head"
    },
    lbone1: {
      file: "lbone1"
    },
    lbone2: {
      file: "lbone2"
    },
    rbone1: {
      file: "rbone1"
    },
    rbone2: {
      file: "rbone2"
    },
    test1: {
      file: "test1"
    },
    test2: {
      file: "test2"
    },
    test3: {
      file: "test3"
    },
    r1: {
      file: "r1"
    },
    r2: {
      file: "r2"
    },
    r3: {
      file: "r3"
    },
    r4: {
      file: "r4"
    }
  };

  private flatRobotStructure: FlatStructureData = {
    rootNodeId: "body",
    globalSpritesScale: .4,
    nodes: {
      body: {
        x: 400,
        y: 100,
        sprites: [
          {
            file: "head"
          }
        ],
        nodes: [
          "rightArm",
          "leftArm"
        ]
      },
      rightArm: {
        x: 68,
        sprites: [
          {
            x: -15,
            y: -15,
            originX: 0,
            originY: 0,
            file: "rbone2"
          }
        ],
        nodes: [
          "rightArmB"
        ]
      },
      rightArmB: {
        x: 70,
        y: 68,
        sprites: [
          {
            x: -14,
            y: -14,
            originX: 0,
            originY: 0,
            file: "rbone1"
          }
        ]
      },
      leftArm: {
        x: -70,
        sprites: [
          {
            x: 18,
            y: -14,
            originX: 1,
            originY: 0,
            file: "lbone2"
          }
        ],
        nodes: [
          "leftArmB"
        ]
      },
      leftArmB: {
        x: -66,
        y: 56,
        sprites: [
          {
            x: 15,
            y: -19,
            originX: 1,
            originY: 0,
            file: "lbone1"
          }
        ]
      }
    }
  };

  private robotStructure: StructureData = {
    globalSpritesScale: 0.4,
    nodes: {
      body: {
        x: 400,
        y: 100,
        sprites: {
          head: {}
        },
        nodes: {
          rightArm: {
            x: 68,
            sprites: {
              rbone2: {
                x: -15,
                y: -15,
                originX: 0,
                originY: 0
              }
            },
            nodes: {
              rightArmB: {
                x: 70,
                y: 68,
                sprites: {
                  rbone1: {
                    x: -14,
                    y: -14,
                    originX: 0,
                    originY: 0
                  }
                }
              }
            }
          },
          leftArm: {
            x: -70,
            sprites: {
              lbone2: {
                x: 18,
                y: -14,
                originX: 1,
                originY: 0
              }
            },
            nodes: {
              leftArmB: {
                x: -66,
                y: 56,
                sprites: {
                  lbone1: {
                    x: 15,
                    y: -19,
                    originX: 1,
                    originY: 0
                  }
                }
              }
            }
          }
        }
      }
    }
  };

  constructor() {
    super({
      key: "MainScene"
    });

    
  }

  preload(): void {
    this.load.setBaseURL("./assets/");

    for (let key in this.sprites) {
      let file = this.sprites[key]["file"];

      if (this.loadedFiles.indexOf(file) === -1) {
        this.load.image(file, file + ".png");
        this.loadedFiles.push(file);
      }
    }
  }

  create(): void {
    this.generateGrid();

    let manager = new StructureManager(this, this.flatRobotStructure);
    manager.nodeContainers[0].render();

    this.mainManager = manager;
    
    this.game.events.emit("created");
  }

  generateGrid() {

    // Lignes verticales
    this.gridSprite = this.add.graphics();

    let step = 25;

    let width = <number>this.scene.manager.game.config.width;
    let height = <number>this.scene.manager.game.config.height;

    for (let i = 0; i <= width; i += step) {

      if (i % 100 == 0) {
        this.gridSprite.lineStyle(0.5, 0x000000, 0.8);
      } else {
        this.gridSprite.lineStyle(0.5, 0x000000, 0.2);
      }

      let line = new Phaser.Geom.Line(i, 0, i, height);
      this.gridSprite.strokeLineShape(line);
    }

    for (let i = 0; i <= height; i += step) {
      if (i % 100 == 0) {
        this.gridSprite.lineStyle(0.5, 0x000000, 0.8);
      } else {
        this.gridSprite.lineStyle(0.5, 0x000000, 0.2);
      }

      let line = new Phaser.Geom.Line(0, i, width, i);
      this.gridSprite.strokeLineShape(line);
    }
  }

  tweenAngleTest() {

    this.b1 = this.mainManager.nodeContainers[1];
    
    if (!this.tween) {
      this.b1.rotation = 0;
      this.b1.render();
  
      this.tween = this.tweens.add({
        targets: this.b1,
        rotation: Math.PI / 8,
        duration: 500,
        onStart: () => {
          this.b1.render();
        },
        onComplete: () => {
          console.log("finished");
          this.tween = null;
        },
        onUpdate: () => {
          this.b1.render();
        }
      });
    } else {
      this.tween.stop();
      this.tween = null;
    }
  }
}