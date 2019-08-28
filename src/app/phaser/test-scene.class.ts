import { SpriteDefinition } from './interfaces/sprite-definition.class';

export class TestScene extends Phaser.Scene {

    private loadedFiles: string[] = [];

    private sprites: {[key: string]: SpriteDefinition} = {
      head: {
        file: "head",
        x: 0,
        y: 0
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

    private arbo = {
      head: {
        pivotX: 0,
        pivotY: 0,
        x: 0,
        y:0,
        sprites: {
          
        },
        children: {
          leftArm: {

          },
          rightArm: {

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
          let file = this.sprites[key].file;
          
          if (this.loadedFiles.indexOf(file) === -1) {
            this.load.image(file, file + ".png");
            this.loadedFiles.push(file);
          }
        }
      }
    
      create(): void {
        //this.constructRobot();
        this.generateSprites();
      }

      generateSprites() {
        for (let key in this.sprites) {
          let def = this.sprites[key];
          this.add.sprite(def.x || 0, def.y || 0, def.file);
        }
      }

      constructRobot() {

        let global = this.add.container(0, 0);
        let head = this.add.sprite(300, 200, "head");
        global.add(head);

        let arm1 = this.add.container(0, 0);
        global.add(arm1);

        global.scale = 0.5;
      }
}