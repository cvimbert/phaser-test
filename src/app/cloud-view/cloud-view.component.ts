import { Component, OnInit, ViewChild, ElementRef, HostListener, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CloudScene } from '../v2/cloud-scene.class';
import { Game } from 'phaser';
import { CloudStructure } from '../v2/cloud-structure.class';
import { TransformationNode } from '../v2/transformation-node.class';
import { TransformationMode } from '../v2/enums/transformation-mode.enum';
import { Point } from '../v2/interfaces/point.interface';
import { InspectionService } from '../v2/services/inspection.service';
import { CloudState } from '../v2/cloud-state.class';
import { JsonConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { StatesService } from '../v2/services/states.service';
import { DetailsData } from '../v2/interfaces/details-data.interface';
import { ModalService } from '../v2/services/modal.service';
import { SetData } from '../v2/interfaces/set-data.interface';
import { TransitionsService } from '../v2/services/transitions.service';
import { DiffsService } from '../v2/services/diffs.service';
import { CloudService } from '../v2/services/cloud.service';
import { Configuration } from '../v2/configuration.class';
import { CloudNodeState } from '../v2/cloud-node-state.class';

@Component({
  selector: 'app-cloud-view',
  templateUrl: './cloud-view.component.html',
  styleUrls: ['./cloud-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CloudViewComponent implements OnInit, OnDestroy {

  @ViewChild("canvasContainer") canvasContainer: ElementRef;
  cloudScene: CloudScene;
  game: Game;
  selectedNode: TransformationNode;
  selectedStructure: CloudStructure;

  currentTransformationMode = TransformationMode.ROTATION;

  initNodeRotationAngle: number;
  initRotationAngle: number;
  startTranslationPoint: Point;

  tempStateId = 0;
  
  constructor(
    public inspectionService: InspectionService,
    public statesService: StatesService,
    public diffsService: DiffsService,
    public modalService: ModalService,
    public transitionsService: TransitionsService,
    public cloudService: CloudService,
    public ref: ChangeDetectorRef
  ) {}

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

    this.cloudService.cloudView = this;
  }

  ngOnDestroy() {
    this.cloudService.cloudView = null;
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(evt: KeyboardEvent) {
    
    switch (evt.key) {
      case "r":
        this.selectMode(TransformationMode.ROTATION);
        break;

      case "t":
        this.selectMode(TransformationMode.TRANSLATION);
        break;

      case "s":
        this.selectMode(TransformationMode.SCALE);
        break;

      case "ArrowLeft":
        this.selectPreviousNode();
        break;

      case "ArrowRight":
        this.selectNextNode();
        break;

      case "n":
        // toggle des node names
        this.inspectionService.namesAreDisplayed = !this.inspectionService.namesAreDisplayed;
        this.selectedStructure.displayNames(this.inspectionService.namesAreDisplayed);
        break;
    }
  }

  selectPreviousNode() {
    let index = this.selectedStructure.nodesList.indexOf(this.selectedNode);
    index--;

    if (index < 0) index = this.selectedStructure.nodesList.length - 1;
    
    this.selectNodeByIndex(index);
  }

  selectNextNode() {
    let index = this.selectedStructure.nodesList.indexOf(this.selectedNode);
    index++;

    if (index >= this.selectedStructure.nodesList.length) index = 0;

    this.selectNodeByIndex(index);
  }

  selectNodeByIndex(index: number) {
    // utilisation de l'id pour le getter de combo box
    this.selectedNodeId = this.selectedStructure.nodesList[index].id;
  }

  onCreated() {
    this.selectedStructure = this.cloudScene.manager.getStructure(this.cloudScene.manager.mainStructureId);
    this.inspectionService.selectedStructure = this.selectedStructure;
    this.selectedNode = this.selectedStructure.rootNode;
    this.inspectionService.selectedNode = this.selectedNode;
    this.selectedNode.displayLinks();
    this.selectedNode.displayOrigin();

    this.cloudScene.input.on("pointerdown", this.onPointerDown, this);
    this.cloudScene.input.on("pointerup", this.onPointerUp, this);

    this.selectedStructure.displayNames(this.inspectionService.namesAreDisplayed);

    // chargement des datas depuis le localstorage
    // this.loadData();
    this.ref.detectChanges();
  }

  loadData() {
    
    /*this.statesService.load();
    this.transitionsService.load();
    this.diffsService.load();*/
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

    switch (this.currentTransformationMode) {
      case TransformationMode.TRANSLATION:        
        this.selectedNode.calculateByAbsolutePosition(false, false);
        break;
    }
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

    this.ref.detectChanges();
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
    this.inspectionService.selectedNode = this.selectedNode;
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
    this.inspectionService.selectedStructure = this.selectedStructure;
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
        node.calculateByAbsolutePosition(false, false);
        console.log("Tween complete");
      }
    });
  }

  rotationWithTween() {
    let node = this.selectedNode;
    // console.log(node.relativeRotation);
    
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
      }
    });
  }

  createState() {
    this.modalService.openDetailsModal().afterClosed().subscribe(value => {
      console.log(value);
      
      if (value) {
        let id = "state" + ++this.tempStateId;
        let state = CloudState.fromNodesList(id, this.selectedStructure, this.selectedStructure.nodesList);
        state.name = value.name;
        state.description = value.description;
        this.statesService.push(state);
      }
      
      this.ref.detectChanges();
    }); 
  }

  logStateValue(state: CloudState) {
    console.log(state);
  }

  testRelativeApply() {

  }

  isNotNullOrUndefined(value: any): boolean {
    return value !== undefined && value !== null;
  }

  isRelativeTransform(nodeState: CloudNodeState): boolean {
    for (let prop of CloudNodeState.relativeProperties) {
      if (this.isNotNullOrUndefined(nodeState[prop])) {
        return true;
      }
    }

    return false;
  }

  setPosition(data: SetData) {    

    let ct = -1;
    // Un premier cas simple de mise à jour de rotation relative

    if (!data.state.nodeStates) return;

    let propsNumber = Object.keys(data.state.nodeStates).length;
    let completedTweenPropsCount = 0; 
    
    if (data.onStart) {
      data.onStart();
    }
    
    for (let nodeId in data.state.nodeStates) {
      
      let nodeState = data.state.nodeStates[nodeId];
      let node = this.selectedStructure.getNode(nodeId);

      let updatedKeys = nodeState.getUpdatedKeys();

      if (data.duration == 1) {

        for (let key in nodeState) {
          if (nodeState.hasOwnProperty(key)) {
            if (nodeState[key] !== undefined && nodeState[key] !== null) {
              node[key] = nodeState[key];
            }
          }
        }
                
        node.ownToAbsolute([], true);
        node.render();

        console.log("set position complete");
        
      } else {

        // console.log("C'est ici que ça se passe !", nodeState);

        let pNumber = 0;
        let pCount = 0;

        let tweenParams: Object = {
          targets: node,
          duration: data.duration,
          ease: Configuration.EASES[data.easing],
          onUpdate: () => {
            
            pCount++;            

            if (pCount === pNumber) {

              if (this.isRelativeTransform(nodeState)) {
                node.ownToAbsolute(updatedKeys, true);
              } else {
                // node.calculateGeometry();
                node.applyAbsoluteTranslation();
              }

              node.render();
              pCount = 0;
            }
          },
          onComplete: () => {

            if (this.isRelativeTransform(nodeState)) {
              node.ownToAbsolute(updatedKeys, true);
            } else {
              // node.calculateGeometry();
              node.applyAbsoluteTranslation();
            }
            
            node.render();

            completedTweenPropsCount++;

            if (completedTweenPropsCount === propsNumber) {
              console.log("tween complete");

              if (data.onComplete) {
                data.onComplete();
              }

              setTimeout(() => {
                this.ref.detectChanges();
              });
            }
          }
        };        

        for (let key in nodeState) {
          if (nodeState.hasOwnProperty(key)) {
            if (nodeState[key] !== undefined && nodeState[key] !== null) {
              tweenParams[key] = nodeState[key];
              pNumber++;
            }
          }
        }
        
        this.cloudScene.add.tween(tweenParams);
      }
    }
  }

  clearAllStates() {
    this.statesService.clear();
    this.transitionsService.clear();
    this.diffsService.clear();
  }

  saveStates() {
    this.statesService.save();
    this.transitionsService.save();
    this.diffsService.save();
  }
}
