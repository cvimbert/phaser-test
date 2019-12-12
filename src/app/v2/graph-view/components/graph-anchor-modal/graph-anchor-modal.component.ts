import { Component, OnInit } from '@angular/core';
import { GraphService } from '../../services/graph.service';
import { MatDialogRef } from '@angular/material/dialog';
import { GraphAnchor } from '../../graph-anchor.class';

@Component({
  selector: 'app-graph-anchor-modal',
  templateUrl: './graph-anchor-modal.component.html',
  styleUrls: ['./graph-anchor-modal.component.scss']
})
export class GraphAnchorModalComponent implements OnInit {

  type = "in";
  anchorName = "";
  anchorId = "";

  constructor(
    private graphService: GraphService,
    private dialogRef: MatDialogRef<GraphAnchorModalComponent, GraphAnchor>
  ) { }

  ngOnInit() {
  }

  validate() {
    let anchor = this.graphService.graphAnchorItems.createItem({
      name: this.anchorName
    });

    anchor.type = this.type;
    anchor.anchorId = this.anchorId;
    anchor.anchorName = this.anchorName;

    this.dialogRef.close(anchor);
  }
}
