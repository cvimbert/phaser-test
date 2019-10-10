import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DetailsData } from '../../interfaces/details-data.interface';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'details-input',
  templateUrl: './details-input.component.html',
  styleUrls: ['./details-input.component.scss']
})
export class DetailsInputComponent implements OnInit {

  @Output("onValidated") onValidated = new EventEmitter<DetailsData>();

  name = "";
  description = "";

  constructor(
    public modalService: ModalService
  ) { }

  ngOnInit() {
  }

  validateDetails() {
    this.modalService.validateDetailModal({
      name: this.name,
      description: this.description
    });
  }
}
