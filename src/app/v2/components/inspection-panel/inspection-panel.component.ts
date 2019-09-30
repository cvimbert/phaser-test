import { Component, OnInit, Input } from '@angular/core';
import { TransformationNode } from '../../transformation-node.class';
import { TransformationMode } from '../../enums/transformation-mode.enum';

@Component({
  selector: 'app-inspection-panel',
  templateUrl: './inspection-panel.component.html',
  styleUrls: ['./inspection-panel.component.scss']
})
export class InspectionPanelComponent implements OnInit {

  @Input("node") node: TransformationNode;
  @Input("currentMode") currentMode: TransformationMode;

  constructor() { }

  ngOnInit() {
  }

}
