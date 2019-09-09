import { ObjectContainer } from './bones/object-container.class';
import { StructureData } from './interfaces/structure-data.interface';
import { StructureManager } from './bones/structure-manager.class';

export class TestScene extends Phaser.Scene {

  private loadedFiles: string[] = [];
  private b1: ObjectContainer;

  private gridSprite: Phaser.GameObjects.Graphics;

  private tween: Phaser.Tweens.Tween;

  private sprites: { [key: string]: Object } = {
    head: {
      file: "head"
    },
    lbone1: {
      file: "lbone1"
    },
    lbone2: {
      file: "lbone1"
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

  private robotStructure: StructureData = {
    globalSpritesScale: 0.4,
    nodes: {
      body: {
        sprites: {
          head: {}
        },
        nodes: {
          rightArm: {
            sprites: {
              rbone2: {

              }
            },
            nodes: {
              rightArmB: {
                sprites: {
                  rbone1: {}
                }
              }
            }
          },
          leftArm: {
            sprites: {
  
            },
            nodes: {
  
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

    let manager = new StructureManager(this, this.robotStructure);
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
    this.constructRobot();
  }

  basicGenerateSprites() {
    for (let key in this.sprites) {
      let def = this.sprites[key];
      this.add.sprite(def["x"] || 0, def["y"] || 0, def["file"]);
    }
  }

  generateWithContainers() {

  }

  constructRobot() {
    let baseScale = .4;

    let mainBone = new ObjectContainer(this);
    let head = this.add.sprite(0, 0, "head").setScale(baseScale);

    let cont = mainBone.addChild(head);
    mainBone.displayOrigin();

    let rightArm = new ObjectContainer(this, "rightArm", 0, 0);
    let rb2 = this.add.sprite(0, 0, "rbone2").setOrigin(0, 0).setDisplayOrigin(32, 36).setScale(baseScale);
    rightArm.addChild(rb2);

    mainBone.addChildContainer(rightArm);
    rightArm.displayOrigin();
    rightArm.x = 70;

    let rightArm2 = new ObjectContainer(this, "rightArm2", 0, 0);

    let rb1 = this.add.sprite(0, 0, "rbone1").setScale(baseScale).setOrigin(0, 0).setDisplayOrigin(40, 40);
    rightArm2.addChild(rb1);

    rightArm.addChildContainer(rightArm2);
    rightArm2.displayOrigin();

    rightArm2.x = 70;
    rightArm2.y = 70;

    this.b1 = rightArm;

    mainBone.x = 400;
    mainBone.y = 200;

    mainBone.displayLinks();
    mainBone.render();
  }

  generateGrid() {

    // Lignes verticales
    this.gridSprite = this.add.graphics();

    let step = 25;

    for (let i = 0; i <= 800; i += step) {

      //console.log(i);

      if (i % 100 === 0) {
        this.gridSprite.lineStyle(0.5, 0x000000, 0.8);
      } else {
        this.gridSprite.lineStyle(0.5, 0x000000, 0.2);
      }

      let line = new Phaser.Geom.Line(i, 0, i, 600);
      this.gridSprite.strokeLineShape(line);
    }

    for (let i = 0; i <= 600; i += step) {
      if (i % 100 === 0) {
        this.gridSprite.lineStyle(0.5, 0x000000, 0.8);
      } else {
        this.gridSprite.lineStyle(0.5, 0x000000, 0.2);
      }

      let line = new Phaser.Geom.Line(0, i, 800, i);
      this.gridSprite.strokeLineShape(line);
    }
  }

  tweenAngleTest() {
    
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