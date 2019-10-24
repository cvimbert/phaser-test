import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GraphScene } from '../v2/graph-view/graph-scene.class';
import { Game } from 'phaser';
import { Point } from '../v2/interfaces/point.interface';
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

  testItems: BaseItemData[] = [
    {
      position: {
        x: 100,
        y: 100
      }
    },
    {
      position: {
        x: 450,
        y: 300
      }
    }
  ];

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

    this.game = new Game(config);
    this.drawLinks();
  }

  drawLinks() {

  }
}
