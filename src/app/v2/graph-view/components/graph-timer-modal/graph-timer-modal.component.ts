import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GraphService } from '../../services/graph.service';

@Component({
  selector: 'app-graph-timer-modal',
  templateUrl: './graph-timer-modal.component.html',
  styleUrls: ['./graph-timer-modal.component.scss']
})
export class GraphTimerModalComponent implements OnInit {

  timerValue = 0;

  constructor(
    private dialogRef: MatDialogRef<GraphTimerModalComponent>,
    private graphService: GraphService
  ) { }

  ngOnInit() {
  }

  validate() {
    let timer = this.graphService.graphTimerItems.createItem({
      name: "Timer",
      description: ""
    });

    timer.duration = this.timerValue;

    this.dialogRef.close(timer);
  }
}
