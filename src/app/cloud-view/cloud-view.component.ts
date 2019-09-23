import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CloudScene } from '../v2/cloud-scene.class';
import { Game } from 'phaser';
import { CloudStructure } from '../v2/cloud-structure.class';

@Component({
  selector: 'app-cloud-view',
  templateUrl: './cloud-view.component.html',
  styleUrls: ['./cloud-view.component.scss']
})
export class CloudViewComponent implements OnInit {

  @ViewChild("canvasContainer") canvasContainer: ElementRef;
  cloudScene: CloudScene;
  game: Game;

  testStruct: CloudStructure;
  testStruct2: CloudStructure;

  constructor() { }

  ngOnInit() {
    this.cloudScene = new CloudScene();

    let config: Phaser.Types.Core.GameConfig = {
      type: Phaser.WEBGL,
      width: 800,
      height: 600,
      scale: {
        mode: Phaser.Scale.NONE
      },
      scene: this.cloudScene,
      backgroundColor: '#ffffff',
      parent: this.canvasContainer.nativeElement
    }; 

    this.game = new Game(config);
    this.game.events.on("created", this.onCreated, this);
  }

  onCreated() {
    this.testStruct = this.cloudScene.manager.getStructure("struct1");
    this.testStruct2 = this.cloudScene.manager.getStructure("struct2");

    this.testStruct2.displayLinks();
  }

  testTranslate() {
    this.testStruct.rootNode.relativePosition.x = 300;
    this.testStruct.rootNode.calculateGeometry();
    this.testStruct.rootNode.render();
  }

  testTranslateWithTween() {
    this.cloudScene.add.tween({
      targets: this.testStruct.rootNode.absolutePosition,
      x: 0,
      y: 0,
      duration: 1000,
      onUpdate: () => {
        this.testStruct.rootNode.calculateChildren();
        this.testStruct.rootNode.render();
      },
      onComplete: () => {
        console.log("Tween complete");
      }
    });
  }

  testReverted() {
    this.cloudScene.add.tween({
      targets: this.testStruct2.getNode("p2").relativePosition,
      x: 200,
      duration: 1000,
      onUpdate: () => {
        this.testStruct2.rootNode.calculateGeometry();
        this.testStruct2.rootNode.render();
      },
      onComplete: () => {
        console.log("Tween complete");
      }
    });
  }
}
