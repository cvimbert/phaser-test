import { Injectable } from '@angular/core';
import { BaseGraphItemComponent } from '../components/base-graph-item/base-graph-item.component';
import { GraphLink } from '../graph-link.class';
import { GraphScene } from '../graph-scene.class';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  items: { [key: string]: BaseGraphItemComponent } = {};
  links: GraphLink[] = [];
  scene: GraphScene;

  constructor() { }

  registerItemComponent(id: string, item: BaseGraphItemComponent) {
    this.items[id] = item;
  }

  getItemComponent(id: string): BaseGraphItemComponent {
    return this.items[id];
  }

  createLink(from: any, to: any) {
    let link = new GraphLink();
    link.fromItem = this.getItemComponent(from["item"]);
    link.fromAnchor = from["anchor"];
    link.toItem = this.getItemComponent(to["item"]);
    link.toAnchor = to["anchor"];
    link.scene = this.scene;

    link.subscribeToPositions();

    this.links.push(link);
  }
  
}
