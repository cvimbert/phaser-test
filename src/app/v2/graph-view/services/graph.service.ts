import { Injectable } from '@angular/core';
import { BaseGraphItemComponent } from '../components/base-graph-item/base-graph-item.component';
import { GraphLink } from '../graph-link.class';
import { GraphScene } from '../graph-scene.class';
import { Point } from '../../interfaces/point.interface';
import { GenericMessageModalComponent } from '../components/generic-message-modal/generic-message-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  items: { [key: string]: BaseGraphItemComponent } = {};
  links: GraphLink[] = [];
  scene: GraphScene;
  canvasContainerOffset: Point;

  constructor(
    private dialog: MatDialog
  ) { }

  registerItemComponent(id: string, item: BaseGraphItemComponent) {
    this.items[id] = item;
  }

  getItemComponent(id: string): BaseGraphItemComponent {
    return this.items[id];
  }

  createLink(from: any, to: any) {
    let link = new GraphLink(this);
    link.fromItem = this.getItemComponent(from["item"]);
    link.fromAnchor = from["anchor"];
    link.toItem = this.getItemComponent(to["item"]);
    link.toAnchor = to["anchor"];
    link.scene = this.scene;

    link.subscribeToPositions();

    this.links.push(link);
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
  
}
