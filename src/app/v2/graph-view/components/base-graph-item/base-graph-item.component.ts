import { Component, OnInit, Input } from '@angular/core';
import { BaseItemData } from '../../interfaces/base-item-data.interface';

@Component({
  selector: 'base-graph-item',
  templateUrl: './base-graph-item.component.html',
  styleUrls: ['./base-graph-item.component.scss']
})
export class BaseGraphItemComponent implements OnInit {

  @Input() data: BaseItemData;

  constructor() { }

  ngOnInit() {
  }

}
