import { Injectable, HostListener } from '@angular/core';
import { BaseGraphItemComponent } from '../components/base-graph-item/base-graph-item.component';
import { GraphLink } from '../graph-link.class';
import { GraphScene } from '../graph-scene.class';
import { Point } from '../../interfaces/point.interface';
import { GenericMessageModalComponent } from '../components/generic-message-modal/generic-message-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { DataBank } from '../../data-bank.class';
import { GraphItem } from '../graph-item.class';
import { Configuration } from '../../configuration.class';
import { GenericModalActions } from '../generic-modal-actions.class';
import { GraphTarget } from '../interfaces/graph-target.interface';
import { TemporaryLink } from '../temporary-link.class';
import { GraphAnchorComponent } from '../components/graph-anchor/graph-anchor.component';
import { OutLink } from '../out-link.class';
import { GraphViewComponent } from 'src/app/graph-view/graph-view.component';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  mainView: GraphViewComponent;
  items: { [key: string]: BaseGraphItemComponent } = {};
  links: GraphLink[] = [];
  scene: GraphScene;
  canvasContainerOffset: Point;

  tempLink: TemporaryLink;
  tempDrawing = false;

  graphItems = new DataBank<GraphItem>(Configuration.GRAPH_ITEMS_BIS_STORAGE_KEY, GraphItem);

  targetDrawAnchor: GraphAnchorComponent;
  initialDrawAnchor: GraphAnchorComponent;

  constructor(
    private dialog: MatDialog
  ) {}

  registerItemComponent(id: string, item: BaseGraphItemComponent) {
    this.items[id] = item;
  }

  getItemComponent(id: string): BaseGraphItemComponent {
    return this.items[id];
  }

  createLink(from: any, to: any): GraphLink {
    let link = new GraphLink(this);
    link.fromItem = this.getItemComponent(from["item"]);
    link.fromAnchor = from["anchor"];
    link.toItem = this.getItemComponent(to["item"]);
    link.toAnchor = to["anchor"];
    link.scene = this.scene;

    link.subscribeToPositions();

    this.links.push(link);

    return link;
  }

  createLinkFromData(graphItemData: GraphItem, linkData: OutLink): GraphLink {
    let fromData: any = {
      item: graphItemData.id,
      anchor: linkData.localProperty
    };

    let toData: any = {
      item: linkData.targetObject,
      anchor: linkData.targetProperty
    };

    let link = this.createLink(fromData, toData);
    link.graphItemData = graphItemData;
    link.linkData = linkData;
    return link;
  }

  startDrawTemporaryLink(anchor: GraphAnchorComponent) {
    console.log("start draw");
    this.tempDrawing = true;
    this.scene.input.on("pointerup", this.stopDrawTemporaryLink, this);
    this.initialDrawAnchor = anchor;

    console.log(anchor.data.id);
    
    this.tempLink = new TemporaryLink(anchor.data.id, this.scene, anchor.getClientPosition());
  }

  stopDrawTemporaryLink() {
    if (this.tempLink) {
      console.log("stop draw");
      this.scene.input.off("pointerup", this.stopDrawTemporaryLink);
      this.tempLink.destroy();

      if (this.targetDrawAnchor) {
        // ajout du lien au modèle

        // se fier aux tag d'anchor, in ou out pour création des datas
        let targetProp = this.targetDrawAnchor.data.id;
        let targetObject = this.targetDrawAnchor.parentItem.data.id;
        let localProp = this.initialDrawAnchor.data.id;
        
        let link = new OutLink();
        link.localProperty = localProp;
        link.targetProperty = targetProp;
        link.targetObject = targetObject;

        this.initialDrawAnchor.parentItem.data.outLinks.push(link);
        this.initialDrawAnchor.parentItem.drawChildLink(link);
      }

      this.tempLink = null;
      this.tempDrawing = false;
    }
  }

  tryDeleteLink(link: GraphLink) {
    this.dialog.open(GenericMessageModalComponent, {
      data: {
        text: "Delete this link ?"
      }
    }).afterClosed().subscribe((value: string) => {
      console.log(value);
    });
  }

  tryDeleteItem(item: GraphItem) {
    this.dialog.open(GenericMessageModalComponent, {
      data: {
        text: "Delete item ?"
      }
    }).afterClosed().subscribe((value: string) => {
      if (value === GenericModalActions.YES) {
        this.graphItems.delete(item);
        this.mainView.update();
      }
    });
  }

  createGraphItem(type: string, target: GraphTarget) {
    let item = this.graphItems.createItem({
      description: "",
      name: ""
    });

    item.type = type;
    item.itemId = target.id;

    // Peut-être pas une bonne idée de passer la target dans l'objet... à voir
    item.targetItem = target;
  }

  saveGraphItems() {
    this.graphItems.save();
  }

  
}
