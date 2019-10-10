import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener } from '@angular/core';
import { DetailsData } from '../../interfaces/details-data.interface';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'details-input',
  templateUrl: './details-input.component.html',
  styleUrls: ['./details-input.component.scss']
})
export class DetailsInputComponent implements OnInit {

  @Output("onValidated") onValidated = new EventEmitter<DetailsData>();
  @ViewChild("firstElement") firstElement: ElementRef;

  name = "";
  description = "";

  constructor(
    public modalService: ModalService
  ) { }

  ngOnInit() {
    this.firstElement.nativeElement.focus();
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(evt: KeyboardEvent) {
    switch (evt.key) {
      case "Escape":
        this.close();
        break;

      case "Enter":
        this.validateDetails();
        break;
    }
  }

  validateDetails() {
    this.modalService.validateDetailModal({
      name: this.name,
      description: this.description
    });
  }

  close() {
    this.modalService.validateDetailModal(null);
  }


}
