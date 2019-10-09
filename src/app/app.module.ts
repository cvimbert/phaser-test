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
    DetailsInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PhaserModule,
    FormsModule
  ],
  exports: [
    ToDegreesPipe
  ],
  providers: [
    NodeEditorService,
    InspectionService,
    StatesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
