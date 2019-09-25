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
    //this.testStruct2 = this.cloudScene.manager.getStructure("struct2");

    this.testStruct.displayLinks();
  }

  testTranslateWithTween() {
    let node = this.testStruct.getNode("p2");

    this.cloudScene.add.tween({
      targets: node.absolutePosition,
      x: 0,
      y: 0,
      duration: 1000,
      onUpdate: () => {
        node.applyAbsoluteTranslation();
        node.render();
      },
      onComplete: () => {
        console.log("Tween complete");
      }
    });
  }

  rotationWithTween() {
    let node = this.testStruct.getNode("p4");
    console.log(node.relativeRotation);
    
    this.cloudScene.add.tween({
      targets: node,
      relativeRotation: Math.PI,
      duration: 2000,
      onUpdate: () => {
        node.applyRelativeRotation();
        node.render();
      },
      onComplete: () => {
        console.log("Tween complete");
        console.log(node.relativeRotation);
      }
    });
  }
}
