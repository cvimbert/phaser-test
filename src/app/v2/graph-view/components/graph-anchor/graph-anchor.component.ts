import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Point } from 'src/app/v2/interfaces/point.interface';

@Component({
  selector: 'graph-anchor',
  templateUrl: './graph-anchor.component.html',
  styleUrls: ['./graph-anchor.component.scss']
})
export class GraphAnchorComponent implements OnInit {

  @ViewChild("banchor") bAnchor: ElementRef;
  @Input() position: Point;

  constructor(
    public element: ElementRef
  ) { }

  ngOnInit() {
    // console.log(this.bAnchor);
    
  }

  onAnchorClicked() {
    console.log(this.bAnchor.nativeElement.getBoundingClientRect());
  }

}
