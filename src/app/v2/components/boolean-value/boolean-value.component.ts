import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'boolean-value',
  templateUrl: './boolean-value.component.html',
  styleUrls: ['./boolean-value.component.scss']
})
export class BooleanValueComponent implements OnInit {

  @Input("name") name: string;
  @Input("value") value: boolean;
  @Output("change") change = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  get val(): boolean {
    return this.value;
  }

  set val(value: boolean) {
    this.value = value;
    this.change.emit(value);
  }

}
