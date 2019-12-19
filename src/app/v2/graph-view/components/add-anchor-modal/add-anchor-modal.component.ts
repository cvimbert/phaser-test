import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnchorItem } from '../../interfaces/anchor-item.interface';
import { SerializableAnchorItem } from '../../serializable-anchor-item.class';
import { AddAnchorModalData } from '../../interfaces/add-anchor-modal-data.interface';

@Component({
  selector: 'app-add-anchor-modal',
  templateUrl: './add-anchor-modal.component.html',
  styleUrls: ['./add-anchor-modal.component.scss']
})
export class AddAnchorModalComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AddAnchorModalComponent, SerializableAnchorItem>,
    @Inject(MAT_DIALOG_DATA) public data: AddAnchorModalData
  ) { }

  ngOnInit() {
  }

  select(item: AnchorItem) {
    let serializableItem = new SerializableAnchorItem();
    serializableItem.id = item.id + "_" + (this.data.graphItem ? String(this.data.graphItem.anchorIndex) : "0");

    if (this.data.graphItem) {
      this.data.graphItem.anchorIndex++;
    }

    serializableItem.type = item.id;
    this.dialogRef.close(serializableItem);
  }
}
