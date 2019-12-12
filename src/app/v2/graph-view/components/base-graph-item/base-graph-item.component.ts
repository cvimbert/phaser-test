import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChildren, ElementRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { BaseItemData } from '../../interfaces/base-item-data.interface';
import { Point } from 'src/app/v2/interfaces/point.interface';
import { GraphAnchorComponent } from '../graph-anchor/graph-anchor.component';
import Draggable from "gsap/Draggable";
import { TweenLite } from 'gsap';
import { GraphService } from '../../services/graph.service';
import { BehaviorSubject, from } from 'rxjs';
import { Rectangle } from 'src/app/v2/rectangle.class';
import { GraphItem } from '../../graph-item.class';
import { AnchorItem } from '../../interfaces/anchor-item.interface';
import { GraphLink } from '../../graph-link.class';
import { OutLink } from '../../out-link.class';

@Component({
  selector: 'base-graph-item',
  templateUrl: './base-graph-item.component.html',
  styleUrls: ['./base-graph-item.component.scss']
})

// cette classe pourrait étendre un potentiel graphManager
export class BaseGraphItemComponent implements OnInit, OnChanges {

  @Input() data: GraphItem;
  @Input() pos: number;
  @ViewChildren("anchorElem") anchorElems: GraphAnchorComponent[];
  @ViewChild("item") item: ElementRef;
  @ViewChild("triggerElement") triggerElement: ElementRef;
  anchors: Point[];
  draggable: Draggable;
  positionSubject = new BehaviorSubject<Point>({ x: 0, y: 0 });

  currentPos: Point;

  // utile ou pas ?
  links: GraphLink[] = [];

  constructor(
    public graphservice: GraphService
  ) { }

  ngOnInit() {  
    
    this.data.graphService = this.graphservice;
    
    this.setPosition({
      x: this.data.x,
      y: this.data.y
    });    

    this.draggable = Draggable.create(this.item.nativeElement, {
      type: "x,y",
      trigger: this.triggerElement.nativeElement,
      onDragStart: () => {
        // console.log("drag start");
      },
      onDragEnd: () => {
        // console.log("drag end");
      },
      onDrag: () => {
        // console.log("drag");

        this.data.x = Math.floor(this.draggable.x);
        this.data.y = Math.floor(this.draggable.y);
        
        let dragPos: Point = {
          x: Math.floor(this.draggable.x),
          y: Math.floor(this.draggable.y)
        };

        this.currentPos = dragPos;
        this.positionSubject.next(dragPos);
      }
    })[0];

    this.graphservice.registerItemComponent(this.data.id, this);
  }

  // les deux méthodes suivantes peuvent être réunies en une seule
  triggerIn(anchor: AnchorItem) {
    console.log("triggered:", anchor);
    anchor.callback();

    // highlighting de l'ancre
    this.getAnchor(anchor.id).highlight();
  }

  triggerOut(anchor: AnchorItem) {

    // ces ancres là ne sont que des sorties, on n'éxécute pas de code particulier
    console.log("triggered:", anchor);
    
    // anchor.callback();
    this.graphservice.playOut(anchor, this.data);
  }

  drawChildrenLinks() {
    for (let linkData of this.data.outLinks) {
      this.drawChildLink(linkData);
    }
  }

  drawChildLink(linkData: OutLink) {
    let link = this.graphservice.createLinkFromData(this.data, linkData);
      this.links.push(link);
  }

  get inAnchors(): AnchorItem[] {
    return this.data.targetItem ? this.data.targetItem.inAnchors : [];
  }

  get outAnchors(): AnchorItem[] {
    return this.data.targetItem ? this.data.targetItem.outAnchors : [];
  }

  setPosition(positionPoint: Point) {
    this.data.x = positionPoint.x;
    this.data.y = positionPoint.y;
     
    this.currentPos = positionPoint;

    TweenLite.set(this.item.nativeElement, {
      css: positionPoint
    });

    this.sendPosition(positionPoint);
  }

  tryDeleteItem() {
    this.graphservice.tryDeleteItem(this);
  }

  sendPosition(positionPoint: Point) {
    this.positionSubject.next(positionPoint);
  }

  anchorClick(evt: MouseEvent) {
    // on commence le tracé d'un lien temporaire
    console.log(this.anchorElems);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["data"]) {
      this.anchors = [];

      // En attente
      /* for (let key in this.data.anchors) {
        this.anchors.push(this.data.anchors[key]);
      } */
    }
  }

  getAnchor(anchorId: string): GraphAnchorComponent {
    return this.anchorElems.find(comp => comp.id == anchorId);
  }

  getAnchorComponentPosition(anchorId: string): Point {
    let anchorComponent = this.getAnchor(anchorId);

    if (anchorComponent) {
      return anchorComponent.getClientPosition();
    }
  }
}
