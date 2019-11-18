import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Point } from 'src/app/v2/interfaces/point.interface';
import { GraphService } from '../../services/graph.service';
import { BaseGraphItemComponent } from '../base-graph-item/base-graph-item.component';

@Component({
  selector: 'graph-anchor',
  templateUrl: './graph-anchor.component.html',
  styleUrls: ['./graph-anchor.component.scss']
})
export class GraphAnchorComponent implements OnInit {

  @ViewChild("banchor") bAnchor: ElementRef;
  @Input() position: Point;
  @Input() id: string;
  @Input() parentItem: BaseGraphItemComponent;

  constructor(
    public element: ElementRef,
    public graphService: GraphService
  ) { }

  ngOnInit() {
  }

  onOver() {
    this.graphService.onAnchor = this;
  }

  onOut() {
    this.graphService.onAnchor = null;
  }

  onMouseUp() {
    if (this.graphService.tempDrawing) {
      this.graphService.stopDrawTemporaryLink();
    }
  }

  onAnchorClicked() {
    // console.log(this.bAnchor.nativeElement.getBoundingClientRect());
    this.graphService.startDrawTemporaryLink(this);
  }

  getClientPosition(): Point {
    let rect: DOMRect = this.bAnchor.nativeElement.getBoundingClientRect();
    
    // Attention ! Ici le + 8 sur la position verticale est ajouté de manière complètement empirique et n'a pas de sens
    return {
      x: rect.left + rect.width / 2 - this.graphService.canvasContainerOffset.x,
      y: rect.top + rect.height / 2 - this.graphService.canvasContainerOffset.y + 8
    }
  }
}
