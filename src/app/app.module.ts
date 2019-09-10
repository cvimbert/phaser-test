import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhaserModule } from './phaser/phaser.module';
import { ToDegreesPipe } from './phaser/pipes/to-degrees.pipe';
import { NodeEditorComponent } from './node-editor/node-editor.component';

import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    AppComponent,
    ToDegreesPipe,
    NodeEditorComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
