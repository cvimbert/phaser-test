import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GraphService } from '../../services/graph.service';
import { GraphTimer } from '../../graph-timer.class';

@Component({
  selector: 'app-graph-timer-modal',
  templateUrl: './graph-timer-modal.component.html',
  styleUrls: ['./graph-timer-modal.component.scss']
})
export class GraphTimerModalComponent implements OnInit {

  timerValue = 0;
  item: GraphTimer;

  constructor(
    private dialogRef: MatDialogRef<GraphTimerModalComponent>,
    private graphService: GraphService,
    @Inject(MAT_DIALOG_DATA) data: Object
  ) {
    if (data["item"]) {
      this.item = data["item"];
      this.timerValue = this.item.duration;
    }
  }

  ngOnInit() {
  }

  validate() {

    if (!this.item) {
      this.item = this.graphService.graphTimerItems.createItem({
        name: "Timer",
        description: ""
      });
    }
    

    this.item.duration = this.timerValue;

    this.dialogRef.close(this.item);
  }
}
