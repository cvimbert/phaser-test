import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Point } from 'src/app/v2/interfaces/point.interface';

@Component({
  selector: 'graph-anchor',
  templateUrl: './graph-anchor.component.html',
  styleUrls: ['./graph-anchor.component.scss']
})
export class GraphAnchorComponent implements OnInit {

  @Input() position: Point;

  constructor(
    public element: ElementRef
  ) { }

  ngOnInit() {
  }

}
