import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AnchorItem } from '../../interfaces/anchor-item.interface';

@Component({
  selector: 'app-add-anchor-modal',
  templateUrl: './add-anchor-modal.component.html',
  styleUrls: ['./add-anchor-modal.component.scss']
})
export class AddAnchorModalComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AnchorItem>
  ) { }

  ngOnInit() {
  }

}
