import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CloudScene } from '../v2/cloud-scene.class';
import { Game } from 'phaser';
import { CloudStructure } from '../v2/cloud-structure.class';
import { TransformationNode } from '../v2/transformation-node.class';
import { TransformationMode } from '../v2/enums/transformation-mode.enum';
import { Point } from '../v2/interfaces/point.interface';

@Component({
  selector: 'app-cloud-view',
  templateUrl: './cloud-view.component.html',
  styleUrls: ['./cloud-view.component.scss']
})
export class CloudViewComponent implements OnInit {

  @ViewChild("canvasContainer") canvasContainer: ElementRef;
  cloudScene: CloudScene;
  game: Game;
  selectedNode: TransformationNode;
  selectedStructure: CloudStructure;

  currentTransformationMode = TransformationMode.ROTATION;

  initNodeRotationAngle: number;
  initRotationAngle: number;
  startTranslationPoint: Point;

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
    this.selectedStructure = this.cloudScene.manager.getStructure(this.cloudScene.manager.mainStructureId);
    this.selectedNode = this.selectedStructure.rootNode;
    this.selectedNode.displayLinks();
    this.selectedNode.displayOrigin();

    this.cloudScene.input.on("pointerdown", this.onPointerDown, this);
    this.cloudScene.input.on("pointerup", this.onPointerUp, this);
  }

  onPointerDown(pointer: Phaser.Input.Pointer) {
    
    switch (this.currentTransformationMode) {
      case TransformationMode.ROTATION:
        this.initNodeRotationAngle = this.selectedNode.relativeRotation;
        this.initRotationAngle = this.calculateRotationAngle(pointer.x, pointer.y, this.selectedNode);
        break;

      case TransformationMode.TRANSLATION:
        this.startTranslationPoint = {
          x: this.selectedNode.relativePosition.x,
          y: this.selectedNode.relativePosition.y
        };
        break;
    }

    this.cloudScene.input.on("pointermove", this.onPointerMove, this);
  }

  onPointerUp() {
    this.cloudScene.input.off("pointermove", this.onPointerMove, this);
  }

  onPointerMove(pointer: Phaser.Input.Pointer) {
    
    switch (this.currentTransformationMode) {
      case TransformationMode.ROTATION:
        let angle = this.calculateRotationAngle(pointer.x, pointer.y, this.selectedNode);
        this.selectedNode.relativeRotation = this.initNodeRotationAngle + this.initRotationAngle - angle;
        this.selectedNode.applyRelativeRotation();
        this.selectedNode.render();
        break;

      case TransformationMode.TRANSLATION:
        let deltaX = pointer.position.x - pointer.prevPosition.x;
        let deltaY = pointer.position.y - pointer.prevPosition.y;

        this.selectedNode.absolutePosition.x += deltaX;
        this.selectedNode.absolutePosition.y += deltaY;   

        this.selectedNode.applyAbsoluteTranslation();
        this.selectedNode.render();
        break;
    }
  }

  private calculateRotationAngle(xPos: number, yPos: number, node: TransformationNode): number {

    let xd = xPos - node.absolutePosition.x;
    let yd = yPos - node.absolutePosition.y;

    return Math.atan2(yd, xd);
  }

  selectMode(mode: TransformationMode) {
    this.currentTransformationMode = mode;
  }

  get selectedNodeId(): string {
    return this.selectedNode.id;
  }

  set selectedNodeId(value: string) {
    this.selectedNode = this.selectedStructure.getNode(value);
    // this.selectedNode.clearOrigin();
    this.selectedStructure.clearAllNodesDisplay();
    this.selectedNode.displayOrigin();
    this.selectedNode.displayLinks();
    
    this.currentTransformationMode = TransformationMode.ROTATION;
  }

  get structuresIds(): string[] {
    return this.cloudScene.manager.structures;
  }

  get selectedStructureId(): string {
    return this.selectedStructure.id;
  }

  set selectedStructureId(value: string) {
    this.selectedStructure = this.cloudScene.manager.getStructure(value);
  }

  testTranslateWithTween() {
    let node = this.selectedNode;

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
    let node = this.selectedNode;
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
