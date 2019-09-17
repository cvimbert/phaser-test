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

@NgModule({
  declarations: [
    AppComponent,
    ToDegreesPipe,
    NodeEditorComponent,
    TreeViewComponent,
    RobotViewComponent
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
    NodeEditorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
