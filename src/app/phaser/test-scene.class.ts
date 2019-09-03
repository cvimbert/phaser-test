import { SpriteDefinition } from './interfaces/sprite-definition.class';
import { BoneNode } from './bones/bone-node.class';

export class TestScene extends Phaser.Scene {

  private loadedFiles: string[] = [];
  private b1: BoneNode;
  private b2: BoneNode;

  private gridSprite: Phaser.GameObjects.Graphics;

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
    //this.constructRobot();
    this.generateGrid();
    this.testBones();
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
    let global = this.add.container(300, 300);
    let head = this.add.sprite(300, 200, "head");
    global.add(head);

    let arm1 = this.add.container(0, 0);
    global.add(arm1);

    global.scale = 0.5;
  }

  testBones() {
    let boneNode1 = new BoneNode();
    this.b1 = boneNode1;

    let test1 = this.add.sprite(150, 0, "test1");
    boneNode1.addChild(test1);

    let test2 = this.add.sprite(0, -100, "test2");
    boneNode1.addChild(test2);

    let test3 = this.add.sprite(0, 100, "test3");
    boneNode1.addChild(test3);

    boneNode1.x = boneNode1.y = 300;
    //boneNode1.rotation = Math.PI / 4;

    let boneNode2 = new BoneNode();
    this.b2 = boneNode2;

    // attention, bizarrerie à étudier un peu
    let r1 = this.add.sprite(20, 20, "r1");
    /*r1.x = 20;
    r1.y = 20;*/
    //r1.rotation = Math.PI;
    
    boneNode2.addChild(r1);
    boneNode2.x = 130;
    boneNode2.y = 130;
    //boneNode2.rotation = Math.PI / 4;

    boneNode1.addChildNode(boneNode2);

    //boneNode2.render();
    boneNode1.render();
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
    this.b1.rotation = 0;
    //this.b1.x = 300;

    this.tweens.add({
      targets: this.b1,
      rotation: Math.PI,
      duration: 2000,
      onStart: () => {
        this.b1.render();
      },
      onComplete: () => {
        console.log("finished");
      },
      onUpdate: () => {
        this.b1.render();
      }
    });
  }
}