import { SpriteDefinition } from './interfaces/sprite-definition.class';
import { BoneNode } from './bones/bone-node.class';
import { ObjectContainer } from './bones/object-container.class';

export class TestScene extends Phaser.Scene {

  private loadedFiles: string[] = [];
  private b1: BoneNode;

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
    //this.testBones();
    // this.testContainer();
  }

  testContainer() {
    let node1 = new BoneNode(this, 0, 0);
    node1.id = "node1";

    let sprite1 = this.add.sprite(0, 0, "r1");
    let sprite2 = this.add.sprite(0, 0, "r2");
    let sprite3 = this.add.sprite(0, 0, "r3");
    let sprite4 = this.add.sprite(0, 0, "r4");

    node1.displayOrigin();

    let container1 = node1.addChild(sprite1, "container1");
    container1.x = 100;
    container1.y = 100;

    // container2.debugColor = 0x00ff00;
    // container2.displayOrigin();

    node1.x = 100;
    node1.y = 100;


    let node2 = new BoneNode(this, 0, 0);
    node2.id = "node2";

    node2.debugColor = 0x0000ff;
    node2.displayOrigin();
    node1.addChildNode(node2);


    let container3 = node2.addChild(sprite3);
    container3.x = 100;
    container3.displayOrigin();

    let container4 = node2.addChild(sprite4);
    container4.x = -100;
    container4.y = 100;

    let container2 = node2.addChild(sprite2);

    container2.x = 100;
    container2.y = 100;

    node2.x = 300;
    node2.y = 100;

    this.b1 = node1;

    node1.displayLinks();

    node1.render();
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
    let baseScale = .4;

    let mainBone = new BoneNode(this);
    let head = this.add.sprite(0, 0, "head").setScale(baseScale);

    mainBone.addChild(head);
    mainBone.displayOrigin();

    let rightArm = new BoneNode(this, 0, 0);
    let rb2 = this.add.sprite(-14, -16, "rbone2").setScale(baseScale).setOrigin(0, 0);
    rightArm.addChild(rb2);

    mainBone.addChildNode(rightArm);
    rightArm.displayOrigin();
    rightArm.x = 70;

    let rb1 = this.add.sprite(0, 0, "rbone1").setScale(baseScale).setOrigin(0, 0);
    

    // rightArm.rotation = Math.PI / 4;

    mainBone.x = 400;
    mainBone.y = 200;

    mainBone.render();
  }

  testBones() {
    let boneNode1 = new BoneNode(this);
    
    //this.b1 = boneNode1;

    let test1 = this.add.sprite(150, 0, "test1");
    boneNode1.addChild(test1);

    let test2 = this.add.sprite(0, -100, "test2");
    boneNode1.addChild(test2);

    let test3 = this.add.sprite(0, 100, "test3");
    boneNode1.addChild(test3);

    boneNode1.x = boneNode1.y = 300;
    boneNode1.displayOrigin();
    //boneNode1.rotation = Math.PI / 4;

    let boneNode2 = new BoneNode(this);
    //this.b2 = boneNode2;

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
    
    if (!this.tween) {
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
    
  }
}