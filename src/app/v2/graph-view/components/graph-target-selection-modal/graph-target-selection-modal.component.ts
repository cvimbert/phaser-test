import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GraphTargetModalData } from '../../interfaces/graph-target-modal-data.interface';
import { GraphTarget } from '../../interfaces/graph-target.interface';
import { DiffsService } from 'src/app/v2/services/diffs.service';
import { TransitionsService } from 'src/app/v2/services/transitions.service';
import { GraphItemType } from '../../graph-item-type.class';

@Component({
  selector: 'app-graph-target-selection-modal',
  templateUrl: './graph-target-selection-modal.component.html',
  styleUrls: ['./graph-target-selection-modal.component.scss']
})
export class GraphTargetSelectionModalComponent implements OnInit {

  selectedTargetId: string;
  graphTargets: GraphTarget[];

  constructor(
    private dialogRef: MatDialogRef<GraphTargetSelectionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GraphTargetModalData,
    public diffsService: DiffsService,
    public transitionsService: TransitionsService
  ) { }

  ngOnInit() {
    if (this.data.type === GraphItemType.TRANSITION) {
      this.graphTargets = this.transitionsService.items;

      if (this.graphTargets.length > 0) {
        this.selectedTargetId = this.graphTargets[0].id;
      }
    }
  }

  get selectedTarget(): GraphTarget {
    return this.graphTargets.find(target => target.id === this.selectedTargetId);
  }

  cancel() {
    this.dialogRef.close();
  }

  validate() {
    // valeur de retour à améliorer potentiellement
    this.dialogRef.close(this.selectedTarget);
  }

}
