import { SpriteDefinition } from './interfaces/sprite-definition.class';
import { BoneNode } from './bones/bone-node.class';

export class TestScene extends Phaser.Scene {

  private loadedFiles: string[] = [];

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
    let head = this.add.sprite(0, 0, "head");
    boneNode1.addChild(head);
  }
}