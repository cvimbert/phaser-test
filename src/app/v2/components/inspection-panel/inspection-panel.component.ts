import { Component, OnInit, Input } from '@angular/core';
import { TransformationNode } from '../../transformation-node.class';
import { TransformationMode } from '../../enums/transformation-mode.enum';
import { InspectionService } from '../../services/inspection.service';

@Component({
  selector: 'app-inspection-panel',
  templateUrl: './inspection-panel.component.html',
  styleUrls: ['./inspection-panel.component.scss']
})
export class InspectionPanelComponent implements OnInit {

  @Input("node") node: TransformationNode;
  @Input("currentMode") currentMode: TransformationMode;

  constructor(
    public inspectionService: InspectionService
  ) { }

  ngOnInit() {
  }

  // à voir
  toggleNamesVisiblity(visibility: boolean) {
    
  }

}
