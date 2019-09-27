import { CloudPointData } from './interfaces/cloud-point-data.interface';
import { CloudManager } from './cloud-manager.class';
import { Point } from './interfaces/point.interface';

export class CloudNode {

  displayer: Phaser.GameObjects.Graphics;
  x: number;
  y: number;
  rotation: number = 0;

  sprites: { [key: string]: Phaser.GameObjects.Sprite } = {};
  spritesList: Phaser.GameObjects.Sprite[] = [];

  constructor(
    public id: string,
    public scene: Phaser.Scene,
    public data: CloudPointData,
    public manager: CloudManager,
    offset: Point
  ) {
    this.x = data.x + (offset ? offset.x : 0);
    this.y = data.y + (offset ? offset.y : 0);
    this.generateSquareDisplayer(this.x, this.y);
    this.createSprites();
  }

  showDisplayer() {
    this.displayer = this.scene.add.graphics({
      fillStyle: {
        color: 0x000000
      },
      lineStyle: {
        color: 0x000000,
        width: 2
      }
    });

    this.displayer.fillCircle(0, 0, 3);
    this.displayer.setPosition(this.data.x, this.data.y);
  }

  createSprites() {
    if (this.data.sprites) {
      for (let spriteId in this.data.sprites) {
        let spriteData = this.data.sprites[spriteId];
        let spriteFileName = spriteData.file || spriteId;
  
        let sprite = this.scene.add.sprite(
          this.x,
          this.y,
          spriteFileName
        );

        sprite.scale = this.manager.globalSpritesScale;
        sprite.setOrigin(
          spriteData.originX !== null ? spriteData.originX : 0.5,
          spriteData.originY !== null ? spriteData.originY : 0.5
        );
  
        this.sprites[spriteId] = sprite;
        this.spritesList.push(sprite);
      }
    }
  }

  generateSquareDisplayer(x: number, y: number) {
    let graph = this.scene.add.graphics({
      fillStyle: {
        color: 0xeeeeee
      },
      lineStyle: {
        color: 0x000000,
        width: 1
      }
    });

    let width = 18;
    let radius = 4;

    graph.fillRoundedRect(-width, -width, width * 2, width * 2, radius);
    graph.strokeRoundedRect(-width, -width, width * 2, width * 2, radius);
    graph.fillStyle(0xff0000);
    graph.fillCircle(width, -width, 4);

    graph.x = x;
    graph.y = y;

    this.displayer = graph;
  }

  render() {
    if (this.displayer) {
      this.displayer.x = this.x;
      this.displayer.y = this.y;
      this.displayer.rotation = this.rotation;

      this.spritesList.forEach(sprite => {
        sprite.x = this.x;
        sprite.y = this.y;
        sprite.rotation = this.rotation;
      });
    }
  }
}