import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'numeric-value',
  templateUrl: './numeric-value.component.html',
  styleUrls: ['./numeric-value.component.scss']
})
export class NumericValueComponent implements OnInit {

  @Input("value") value: number;
  @Input("name") name: string;

  constructor() { }

  ngOnInit() {
  }

}
