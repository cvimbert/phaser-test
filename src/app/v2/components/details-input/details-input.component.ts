import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DetailsData } from '../../interfaces/details-data.interface';

@Component({
  selector: 'details-input',
  templateUrl: './details-input.component.html',
  styleUrls: ['./details-input.component.scss']
})
export class DetailsInputComponent implements OnInit {

  @Output("onValidated") onValidated = new EventEmitter<DetailsData>();

  name = "";
  description = "";

  constructor() { }

  ngOnInit() {
  }

  validateDetails() {
    this.onValidated.emit({
      name: this.name,
      description: this.description
    });
  }
}
