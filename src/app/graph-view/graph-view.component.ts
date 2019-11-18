import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { GraphScene } from '../v2/graph-view/graph-scene.class';
import { Game } from 'phaser';
import { BaseItemData } from '../v2/graph-view/interfaces/base-item-data.interface';
import { GraphService } from '../v2/graph-view/services/graph.service';
import { BaseGraphItemComponent } from '../v2/graph-view/components/base-graph-item/base-graph-item.component';
import { DataDictionary } from '../v2/data-dictionary.class';
import { SerializablePoint } from '../v2/serializable-point.class';
import { Configuration } from '../v2/configuration.class';
import { Rectangle } from '../v2/rectangle.class';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GenericMessageModalData } from '../v2/graph-view/interfaces/generic-message-modal-data.interface';
import { GenericMessageModalComponent } from '../v2/graph-view/components/generic-message-modal/generic-message-modal.component';
import { GraphItemType } from '../v2/graph-view/graph-item-type.class';
import { GraphItem } from '../v2/graph-view/graph-item.class';
import { GraphTargetSelectionModalComponent } from '../v2/graph-view/components/graph-target-selection-modal/graph-target-selection-modal.component';
import { GraphTarget } from '../v2/graph-view/interfaces/graph-target.interface';
import { TransitionsService } from '../v2/services/transitions.service';

@Component({
  selector: 'app-graph-view',
  templateUrl: './graph-view.component.html',
  styleUrls: ['./graph-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphViewComponent implements OnInit {

  @ViewChild("canvasElement") canvasElement: ElementRef;
  @ViewChild("canvasContainer") canvasContainer: ElementRef;
  @ViewChildren("itemComponent") itemComponents: QueryList<BaseGraphItemComponent>;

  graphScene: GraphScene;
  game: Game;
  bounds = new Rectangle(0, 0, 1024, 600);

  positionsDictionary: DataDictionary<SerializablePoint>;
  selectedGraphItemType = GraphItemType.ITEMS_LIST[0];

  items: BaseItemData[];

  constructor(
    private graphService: GraphService,
    private transitionsService: TransitionsService,
    private dialog: MatDialog
  ) {
    this.positionsDictionary = new DataDictionary<SerializablePoint>(Configuration.GRAPH_ITEMS_STORAGE_KEY, SerializablePoint);
  }

  /* @HostListener("document:mouseup", ["$event"])
  onDocumentMouseUp() {
    this.graphService.stopDrawTemporaryLink();
  } */

  ngOnInit() {
    this.graphScene = new GraphScene();
    this.graphService.scene = this.graphScene;

    let offsetRect: DOMRect = this.canvasContainer.nativeElement.getBoundingClientRect();

    this.graphService.canvasContainerOffset = {
      x: offsetRect.left,
      y: offsetRect.top
    };

    // console.log(offsetRect, this.graphService.canvasContainerOffset);
    
    let config: Phaser.Types.Core.GameConfig = {
      type: Phaser.WEBGL,
      width: this.bounds.width,
      height: this.bounds.height,
      scale: {
        mode: Phaser.Scale.NONE
      },
      scene: this.graphScene,
      backgroundColor: '#ffffff',
      parent: this.canvasElement.nativeElement
    }; 

    this.items = [];

    /*for (let key in this.testItems) {
      let item = this.testItems[key];
      item.id = key;
      this.items.push(item);
    }*/

    this.game = new Game(config);
    
    // en attendant mieux
    setTimeout(() => {
      // attention, possibilité de fonctionnement asynchrone ici
      this.setCanvasSize();
      this.loadPositions();
    });

    // on set ici toutes les targets, à savoir si c'est une bonne idée...
    this.graphService.graphItems.items.forEach(item => {
      // en attendant mieux
      if (item.type === GraphItemType.TRANSITION) {
        item.targetItem = this.transitionsService.getItemById(item.itemId);
      }
    });

    // console.log(this.graphService.graphItems.items);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
      this.setCanvasSize();
  }

  setCanvasSize() {
    this.game.scale.resize(document.body.clientWidth, 600);
  }

  addGraphItem() {
    this.dialog.open(GraphTargetSelectionModalComponent, {
      data: {
        type: this.selectedGraphItemType
      }
    }).afterClosed().subscribe((target: GraphTarget) => {      
      if (target) {
        this.graphService.createGraphItem(this.selectedGraphItemType, target);
      }
    });
  }

  get graphItemsList(): string[] {
    return GraphItemType.ITEMS_LIST;
  }

  loadPositions() {

    // plus utile bientôt ??
    this.positionsDictionary.load();

    //this.graphService.graphItems.load();

    let comps: { [key: string]: BaseGraphItemComponent } = {};

    this.itemComponents.forEach(item => {
      comps[item.data.id] = item;
    });

    this.createLinks();
  }

  createLinks() {
    /* this.testLinks.forEach(link => {
      this.graphService.createLink(link["from"], link["to"]);
    }); */
  }

  drawAllLinks() {
    this.graphService.links.forEach(link => {
        link.drawLink();
    });
  }

  get graphItems(): GraphItem[] {
    return this.graphService.graphItems.items;
  }

  /* savePositions() {
    this.positionsDictionary.clear();

    this.itemComponents.forEach(item => {
      let pt = new SerializablePoint();
      pt.x = item.currentPos.x;
      pt.y = item.currentPos.y;
      this.positionsDictionary.addItem(item.data.id, pt);
    });

    this.positionsDictionary.save();
  } */

  saveAll() {
    // bientôt plus utile (à priori)
    // this.savePositions();

    this.graphService.saveGraphItems();
  }
}
