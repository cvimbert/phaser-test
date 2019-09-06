import { SpriteDefinition } from './interfaces/sprite-definition.class';
import { ObjectContainer } from './bones/object-container.class';

export class TestScene extends Phaser.Scene {

  private loadedFiles: string[] = [];
  // private b1: BoneNode;

  private gridSprite: Phaser.GameObjects.Graphics;

  private tween: Phaser.Tweens.Tween;

  private sprites: { [key: string]: SpriteDefinition } = {
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

  private robotStructure = {

  };

  constructor() {
    super({
      key: "MainScene"
    });
  }

  preload(): void {
    this.load.setBaseURL("./assets/");

    for (let key in this.sprites) {
      let file = this.sprites[key].file;

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
      this.add.sprite(def.x || 0, def.y || 0, def.file);
    }
  }

  generateWithContainers() {

  }

  constructRobot() {
    /* let baseScale = .4;

    let mainBone = new BoneNode(this);
    let head = this.add.sprite(0, 0, "head").setScale(baseScale);

    mainBone.addChild(head);
    mainBone.displayOrigin();

    let rightArm = new BoneNode(this, 0, 0);
    let rb2 = this.add.sprite(-14, -16, "rbone2").setScale(baseScale).setOrigin(0, 0);
    let cont = rightArm.addChild(rb2);

    mainBone.addChildNode(rightArm);
    rightArm.displayOrigin();
    rightArm.x = 70;

    let rb1 = this.add.sprite(0, 0, "rbone1").setScale(baseScale).setOrigin(0, 0);

    mainBone.x = 400;
    mainBone.y = 200;

    mainBone.render(); */
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
    
    /* if (!this.tween) {
      this.b1.rotation = 0;
      this.b1.render();
  
      this.tween = this.tweens.add({
        targets: this.b1,
        rotation: Math.PI,
        duration: 2000,
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
     */
  }
}