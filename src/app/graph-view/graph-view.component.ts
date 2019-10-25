import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GraphScene } from '../v2/graph-view/graph-scene.class';
import { Game } from 'phaser';
import { BaseItemData } from '../v2/graph-view/interfaces/base-item-data.interface';

@Component({
  selector: 'app-graph-view',
  templateUrl: './graph-view.component.html',
  styleUrls: ['./graph-view.component.scss']
})
export class GraphViewComponent implements OnInit {

  @ViewChild("canvasElement") canvasElement: ElementRef;

  graphScene: GraphScene;
  game: Game;

  testLinks = [
    {
      from: {
        item: "it1",
        anchor: "out1"
      },
      to: {
        item: "it2",
        anchor: "in1"
      }
    }
  ];

  testItems: { [key: string]: BaseItemData } = {
    it1: {
      position: {
        x: 100,
        y: 100
      },
      anchors: {
        in1: {
          x: 0,
          y: 50
        },
        out1: {
          x: 100,
          y: 20
        },
        out2: {
          x: 100,
          y: 80
        }
      }
    },
    it2: {
      position: {
        x: 450,
        y: 300
      },
      anchors: {
        in1: {
          x: 0,
          y: 50
        },
        out1: {
          x: 100,
          y: 20
        },
        out2: {
          x: 100,
          y: 80
        }
      }
    }
  };

  items: BaseItemData[];

  constructor() { }

  ngOnInit() {
    this.graphScene = new GraphScene();

    let config: Phaser.Types.Core.GameConfig = {
      type: Phaser.WEBGL,
      width: 1024,
      height: 600,
      scale: {
        mode: Phaser.Scale.NONE
      },
      scene: this.graphScene,
      backgroundColor: '#ffffff',
      parent: this.canvasElement.nativeElement
    }; 

    this.items = [];

    for (let key in this.testItems) {
      let item = this.testItems[key];
      item.id = key;
      this.items.push(item);
    }

    this.game = new Game(config);
    this.drawLinks();
  }

  drawLinks() {

  }
}
