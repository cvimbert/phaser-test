//declare var Phaser = require("phaser");
import { Component, OnInit, ElementRef } from '@angular/core';
import { Game, Scene } from 'phaser';
import { TestScene } from './phaser/test-scene.class';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  
  game: Phaser.Game;
  scene:Phaser.Scene;

  private phaserSprite: Phaser.GameObjects.Sprite;
  private testScene: TestScene;

  constructor(
    public ref: ElementRef
  ) {

  }

  ngOnInit() {

    this.testScene = new TestScene();

    let config: Phaser.Types.Core.GameConfig = {
      type: Phaser.CANVAS,
      width: 800,
      height: 600,
      scene: this.testScene,
      backgroundColor: '#ffffff',
      parent: this.ref.nativeElement
    }; 

    this.game = new Game(config);
  }

  testTween() {
    this.testScene.tweenAngleTest();
  }

}
