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

  selectedContainer: ObjectContainer;

  initContainerRotationAngle: number;
  initRotationAngle: number;
  

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
      height: 300,
      scale: {
        mode: Phaser.Scale.NONE
      },
      scene: this.testScene,
      backgroundColor: '#ffffff',
      parent: this.canvasContainer.nativeElement
    }; 

    this.game = new Game(config);

    this.game.events.on("created", () => {
      console.log("Game created");

      this.testScene.input.on("pointerdown", this.onMouseDown, this);
      this.testScene.input.on("pointerup", this.onMouseUp, this);
    });
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(evt: KeyboardEvent) {
    switch (evt.key) {
      case "a":
        this.testTween();
        break;
    }
  }

  private onMouseDown(pointer: Phaser.Input.Pointer) {

    if (this.selectedContainer) {
      this.initContainerRotationAngle = this.selectedContainer.rotation;
      this.initRotationAngle = this.calculateRotationAngle(pointer.x, pointer.y, this.selectedContainer);
    }

    this.testScene.input.on("pointermove", this.onPointerMove, this);
  }

  private onMouseUp() {
    
    this.testScene.input.off("pointermove", this.onPointerMove, this);
  }

  private onPointerMove(pointer: Phaser.Input.Pointer) {
    
    if (this.selectedContainer) {
      let angle = this.calculateRotationAngle(pointer.x, pointer.y, this.selectedContainer);

      this.selectedContainer.rotation = this.initContainerRotationAngle + this.initRotationAngle - angle;
      this.selectedContainer.render();
    }
  }

  private calculateRotationAngle(xPos: number, yPos: number, container: ObjectContainer): number {

    let xd = xPos - container.absoluteX;
    let yd = yPos - container.absoluteY;

    let angle = xd !== 0 ? Math.atan(yd / xd) : Math.PI / 2;

    if (xd < 0) {
      angle += Math.PI;
    }

    return angle;
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

  selectNode(node: ObjectContainer) {
    if (this.selectedContainer) {
      this.selectedContainer.displayOrigin(false);
      this.selectedContainer.displayLinks(false);
    }

    this.selectedContainer = node;
    node.displayOrigin(true);
    node.displayLinks(true);
  }

}
