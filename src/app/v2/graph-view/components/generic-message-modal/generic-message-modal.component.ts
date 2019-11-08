import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GenericMessageModalData } from '../../interfaces/generic-message-modal-data.interface';
import { GenericModalActions } from '../../generic-modal-actions.class';

@Component({
  selector: 'app-generic-message-modal',
  templateUrl: './generic-message-modal.component.html',
  styleUrls: ['./generic-message-modal.component.scss']
})
export class GenericMessageModalComponent implements OnInit {

  text: string;
  buttons: string[];

  constructor(
    public dialogRef: MatDialogRef<GenericMessageModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GenericMessageModalData
  ) {
    this.text = data.text;

    if (data.buttons) {
      this.buttons = data.buttons;
    } else {
      this.buttons = [
        GenericModalActions.NO,
        GenericModalActions.YES
      ];
    }
  }

  ngOnInit() {

  }

  sendAction(action: string) {
    this.dialogRef.close(action);
  }
}
