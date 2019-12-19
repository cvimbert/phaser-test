import { Component, OnInit, Inject } from '@angular/core';
import { GraphService } from '../../services/graph.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  item: GraphAnchor;

  constructor(
    private graphService: GraphService,
    private dialogRef: MatDialogRef<GraphAnchorModalComponent, GraphAnchor>,
    @Inject(MAT_DIALOG_DATA) data: Object
  ) {
    if (data["item"]) {
      this.item = data["item"];
      this.type = this.item.type;
      this.anchorName = this.item.anchorName;
      this.anchorId = this.item.anchorId;
    }
  }

  ngOnInit() {
    
  }

  validate() {
    if (!this.item) {
      this.item = this.graphService.graphAnchorItems.createItem({
        name: this.anchorName
      });
    } else {
      this.item.name = this.anchorName;
    }
    
    this.item.type = this.type;
    this.item.anchorId = this.anchorId;
    this.item.anchorName = this.anchorName;

    this.dialogRef.close(this.item);
  }
}
