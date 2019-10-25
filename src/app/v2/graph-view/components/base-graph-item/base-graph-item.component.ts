import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChildren, ElementRef } from '@angular/core';
import { BaseItemData } from '../../interfaces/base-item-data.interface';
import { Point } from 'src/app/v2/interfaces/point.interface';
import { GraphAnchorComponent } from '../graph-anchor/graph-anchor.component';

@Component({
  selector: 'base-graph-item',
  templateUrl: './base-graph-item.component.html',
  styleUrls: ['./base-graph-item.component.scss']
})
export class BaseGraphItemComponent implements OnInit, OnChanges {

  @Input() data: BaseItemData;
  @ViewChildren("anchorElem") anchorElems: GraphAnchorComponent[];
  anchors: Point[];

  constructor() { }

  ngOnInit() {
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
}
