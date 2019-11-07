import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhaserModule } from './phaser/phaser.module';
import { ToDegreesPipe } from './phaser/pipes/to-degrees.pipe';
import { NodeEditorComponent } from './node-editor/node-editor.component';

import { FormsModule } from '@angular/forms'
import { NodeEditorService } from './node-editor.service';
import { TreeViewComponent } from './tree-view/tree-view.component';
import { RobotViewComponent } from './robot-view/robot-view.component';
import { CloudViewComponent } from './cloud-view/cloud-view.component';
import { InspectionPanelComponent } from './v2/components/inspection-panel/inspection-panel.component';
import { NumericValueComponent } from './v2/components/numeric-value/numeric-value.component';
import { BooleanValueComponent } from './v2/components/boolean-value/boolean-value.component';
import { InspectionService } from './v2/services/inspection.service';
import { FlooredPipe } from './v2/pipes/floored.pipe';
import { StateDisplayComponent } from './v2/components/state-display/state-display.component';
import { StatesService } from './v2/services/states.service';
import { DetailsInputComponent } from './v2/components/details-input/details-input.component';
import { ModalService } from './v2/services/modal.service';
import { TransitionDisplayComponent } from './v2/components/transition-display/transition-display.component';
import { TransitionsService } from './v2/services/transitions.service';
import { CloudService } from './v2/services/cloud.service';
import { DiffsService } from './v2/services/diffs.service';
import { GraphViewComponent } from './graph-view/graph-view.component';
import { GraphService } from './v2/graph-view/services/graph.service';
import { BaseGraphItemComponent } from './v2/graph-view/components/base-graph-item/base-graph-item.component';
import { GraphAnchorComponent } from './v2/graph-view/components/graph-anchor/graph-anchor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GenericMessageModalComponent } from './v2/graph-view/components/generic-message-modal/generic-message-modal.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    ToDegreesPipe,
    NodeEditorComponent,
    TreeViewComponent,
    RobotViewComponent,
    CloudViewComponent,
    InspectionPanelComponent,
    NumericValueComponent,
    BooleanValueComponent,
    FlooredPipe,
    StateDisplayComponent,
    DetailsInputComponent,
    TransitionDisplayComponent,
    GraphViewComponent,
    BaseGraphItemComponent,
    GraphAnchorComponent,
    GenericMessageModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PhaserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  exports: [
    ToDegreesPipe
  ],
  entryComponents: [
    GenericMessageModalComponent
  ],
  providers: [
    NodeEditorService,
    InspectionService,
    ModalService,
    StatesService,
    DiffsService,
    TransitionsService,
    CloudService,
    GraphService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
