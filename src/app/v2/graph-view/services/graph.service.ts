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
import { AnchorItem } from '../interfaces/anchor-item.interface';

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

  getGraphItemByTarget(target: GraphTarget) {
    return this.graphItems.items.find(item => item.targetItem === target);
  }

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
    // console.log("start draw");
    this.tempDrawing = true;
    this.scene.input.on("pointerup", this.stopDrawTemporaryLink, this);
    this.initialDrawAnchor = anchor;

    // console.log(anchor.data.id);
    
    this.tempLink = new TemporaryLink(anchor.data.id, this.scene, anchor.getClientPosition());
  }

  stopDrawTemporaryLink() {
    if (this.tempLink) {
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
      if (value === GenericModalActions.YES) {
        this.deleteLink(link);
      }
    });
  }

  deleteLink(link: GraphLink) {
    let index = this.links.indexOf(link);
    this.links.splice(index, 1);
    link.destroy();
  }

  tryDeleteItem(item: BaseGraphItemComponent) {
    this.dialog.open(GenericMessageModalComponent, {
      data: {
        text: "Delete item ?"
      }
    }).afterClosed().subscribe((value: string) => {
      if (value === GenericModalActions.YES) {
        this.graphItems.delete(item.data);

        // Suppression des liens inter-objets
        
        // Attention, ces suppressions mélangent modèle et display, ce qui n'est pas très clean
        // Dans l'idéal, suppression des liens du modèle, et l'affichage doit en découler
        // mais en attendant ça fera l'affaire...

        // 1- Liens au départ de l'objet
        item.links.forEach(link => link.destroy());

        // 2- Liens arrivant à l'objet
        this.links
          .filter(link => link.linkData.targetObject === item.data.id)
          .forEach(link => link.destroy());

        this.mainView.update();
      }
    });
  }

  playAnchor(anchor: AnchorItem, graphItem: GraphItem) {
    if (anchor.callback) {
      anchor.callback();
    } else {
      this.playOut(anchor, graphItem);
    }
  }

  playOut(anchor: AnchorItem, graphItem: GraphItem) {
    console.log("play out: " + graphItem.id + "->" + anchor.id);

    // appel de la cible dans le graph
    let outLinks = graphItem.outLinks.filter(link => link.localProperty === anchor.id);

    outLinks.forEach(link => {
      let targetItem = this.graphItems.items.find(item => item.id === link.targetObject);
      let targetProp = targetItem.targetItem.outAnchors.find(anchor => anchor.id === link.targetProperty);

      console.log("targeted:", targetItem, targetProp);
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
    item.targetItem.parentGraphItem = item;
    item.graphService = this;
  }

  saveGraphItems() {
    this.graphItems.save();
  }

  
}
