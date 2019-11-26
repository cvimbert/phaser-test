import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetailsData } from '../../interfaces/details-data.interface';
// import { DetailsData } from '../../interfaces/details-data.interface';
// import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'details-input',
  templateUrl: './details-input.component.html',
  styleUrls: ['./details-input.component.scss']
})
export class DetailsInputComponent implements OnInit {

  // @Output("onValidated") onValidated = new EventEmitter<DetailsData>();
  @ViewChild("firstElement") firstElement: ElementRef;

  name = "";
  description = "";

  constructor(
    private ref: MatDialogRef<DetailsInputComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DetailsData
  ) {
    this.name = data.name;
    this.description = data.description;
  }

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

    // evt.stopPropagation();
  }

  validateDetails() {
    this.ref.close(this.data);
  }

  close() {
    this.ref.close();
  }
}
