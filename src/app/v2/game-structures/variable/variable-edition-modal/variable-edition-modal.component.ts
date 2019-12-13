import { Component, OnInit } from '@angular/core';
import { GraphService } from 'src/app/v2/graph-view/services/graph.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Variable } from '../variable.class';

@Component({
  selector: 'app-variable-edition-modal',
  templateUrl: './variable-edition-modal.component.html',
  styleUrls: ['./variable-edition-modal.component.scss']
})
export class VariableEditionModalComponent implements OnInit {

  type: string = "string";
  value: any;

  constructor(
    private graphService: GraphService,
    private dialogRef: MatDialogRef<VariableEditionModalComponent, Variable>
  ) { }

  ngOnInit() {
  }

  validate() {
    let variable = this.graphService.variableItems.createItem({
      name: "",
      description: ""
    });

    variable.type = this.type;
    variable.value = this.value;

    this.dialogRef.close(variable);
  }
}
