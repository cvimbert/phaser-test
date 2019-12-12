import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GraphTrigger } from '../../graph-trigger.class';
import { GraphService } from '../../services/graph.service';

@Component({
  selector: 'app-trigger-creation-modal',
  templateUrl: './trigger-creation-modal.component.html',
  styleUrls: ['./trigger-creation-modal.component.scss']
})
export class TriggerCreationModalComponent implements OnInit {

  type = "keyboard";
  key: string;

  constructor(
    private dialogRef: MatDialogRef<TriggerCreationModalComponent, GraphTrigger>,
    private graphService: GraphService
  ) { }

  ngOnInit() {
  }

  validate() {

    let trigger = this.graphService.graphTriggerItems.createItem({
      name: "Trigger: " + this.key,
      description: ""
    });

    trigger.type = this.type;
    trigger.key = this.key;

    this.dialogRef.close(trigger);
  }
}
