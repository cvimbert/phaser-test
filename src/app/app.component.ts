//declare var Phaser = require("phaser");
import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Game, Scene } from 'phaser';
import { TestScene } from './phaser/test-scene.class';
import { ObjectContainer } from './phaser/bones/object-container.class';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  
  game: Phaser.Game;
  scene:Phaser.Scene;

  private phaserSprite: Phaser.GameObjects.Sprite;
  testScene: TestScene;
  gridVisibility = true;

  @ViewChild("canvasContainer") canvasContainer: ElementRef;

  constructor(
    public ref: ElementRef
  ) {

  }

  ngOnInit() {

    this.testScene = new TestScene();

    let config: Phaser.Types.Core.GameConfig = {
      type: Phaser.WEBGL,
      width: 800,
      height: 600,
      scale: {
        mode: Phaser.Scale.NONE
      },
      scene: this.testScene,
      backgroundColor: '#ffffff',
      parent: this.canvasContainer.nativeElement
    }; 

    this.game = new Game(config);
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(evt: KeyboardEvent) {
    switch (evt.key) {
      case "a":
        this.testTween();
        break;
    }
  }


  get nodes(): ObjectContainer[] {
    if (this.testScene && this.testScene.mainManager) {
      return this.testScene.mainManager.nodeContainers;
    } else {
      return [];
    }
  }

  get sprites(): ObjectContainer[] {
    if (this.testScene && this.testScene.mainManager) {
      return this.testScene.mainManager.spriteContainers;
    } else {
      return [];
    }
  }

  testTween() {
    this.testScene.tweenAngleTest();
  }

}
