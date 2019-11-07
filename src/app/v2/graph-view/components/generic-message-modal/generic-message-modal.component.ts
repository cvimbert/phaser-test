import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GenericMessageModalData } from '../../interfaces/generic-message-modal-data.interface';

@Component({
  selector: 'app-generic-message-modal',
  templateUrl: './generic-message-modal.component.html',
  styleUrls: ['./generic-message-modal.component.scss']
})
export class GenericMessageModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<GenericMessageModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GenericMessageModalData
  ) { }

  ngOnInit() {
    console.log(this.data);
  }

}
