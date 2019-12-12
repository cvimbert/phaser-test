import { Component, OnInit, Input, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Point } from 'src/app/v2/interfaces/point.interface';
import { GraphService } from '../../services/graph.service';
import { BaseGraphItemComponent } from '../base-graph-item/base-graph-item.component';
import { AnchorItem } from '../../interfaces/anchor-item.interface';
import { trigger, state, style } from '@angular/animations';
import { Configuration } from 'src/app/v2/configuration.class';

@Component({
  selector: 'graph-anchor',
  templateUrl: './graph-anchor.component.html',
  styleUrls: ['./graph-anchor.component.scss'],
  animations: [
    trigger('highlightable', [
      state('highlighted', style({

      })),
      state('released', style({

      }))
    ])
  ]
})
export class GraphAnchorComponent implements OnInit {

  @ViewChild("banchor") bAnchor: ElementRef;
  @Input() type: string;
  @Input() data: AnchorItem;
  @Input() id: string;
  @Input() parentItem: BaseGraphItemComponent;
  highlighted = false;
  highlightingTimeout: any;

  constructor(
    public element: ElementRef,
    public graphService: GraphService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  onOver() {
    this.graphService.targetDrawAnchor = this;
    console.log("on over");
  }

  onOut() {
    this.graphService.targetDrawAnchor = null;
  }

  onMouseUp() {
    if (this.graphService.tempDrawing) {
      this.graphService.stopDrawTemporaryLink();
    }
  }

  highlight() {
    this.highlighted = true;
    this.cdRef.detectChanges();

    this.highlightingTimeout = setTimeout(() => {
      this.highlighted = false;
      this.cdRef.detectChanges();
    }, Configuration.highlightingTimeoutDelay);
  }

  breakHighlight() {
    this.highlighted = false;
    clearTimeout(this.highlightingTimeout);
  }

  onAnchorClicked() {
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
