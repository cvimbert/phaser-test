import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChildren, ElementRef, ViewChild } from '@angular/core';
import { BaseItemData } from '../../interfaces/base-item-data.interface';
import { Point } from 'src/app/v2/interfaces/point.interface';
import { GraphAnchorComponent } from '../graph-anchor/graph-anchor.component';
import Draggable from "gsap/Draggable";
import { TweenLite } from 'gsap';
import { GraphService } from '../../services/graph.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'base-graph-item',
  templateUrl: './base-graph-item.component.html',
  styleUrls: ['./base-graph-item.component.scss']
})
export class BaseGraphItemComponent implements OnInit, OnChanges {

  @Input() data: BaseItemData;
  @ViewChildren("anchorElem") anchorElems: GraphAnchorComponent[];
  @ViewChild("item") item: ElementRef;
  anchors: Point[];
  draggable: Draggable;
  positionSubject: BehaviorSubject<Point> = new BehaviorSubject({ x: 0, y: 0 });

  currentPos: Point;

  constructor(
    private graphservice: GraphService
  ) { }

  ngOnInit() {

    this.setPosition({
      x: this.data.position.x,
      y: this.data.position.y
    });

    this.draggable = Draggable.create(this.item.nativeElement, {
      type: "x,y",
      onDragStart: () => {
        // console.log("drag start");
      },
      onDragEnd: () => {
        // console.log("drag end");
      },
      onDrag: () => {
        // console.log("drag");
        
        let dragPos: Point = {
          x: this.draggable.x,
          y: this.draggable.y
        };

        this.currentPos = dragPos;

        this.positionSubject.next(dragPos);
      }
    })[0];

    // console.log(this.getAnchorPosition("in1"));
    this.graphservice.registerItemComponent(this.data.id, this);
  }

  setPosition(positionPoint: Point) {
    this.data.position.x = positionPoint.x;
    this.data.position.y = positionPoint.y;
     
    this.currentPos = positionPoint;

    TweenLite.set(this.item.nativeElement, {
      css: positionPoint
    });
  }

  sendPosition(positionPoint: Point) {
    this.positionSubject.next(positionPoint)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["data"]) {
      this.anchors = [];
      for (let key in this.data.anchors) {
        this.anchors.push(this.data.anchors[key]);
      }
    }

    // il doit être possible de remplacer ce setTimeout par autre chose de plus judicieux
    /* setTimeout(() => {
      console.log("elems", this.anchorElems);
    }); */
  }

  getAnchorPosition(anchorId: string): Point {
    let anchorPoint = this.data.anchors[anchorId];

    if (anchorPoint) {
      return {
        x: anchorPoint.x + this.currentPos.x,
        y: anchorPoint.y + this.currentPos.y
      }
    }
  }
}
