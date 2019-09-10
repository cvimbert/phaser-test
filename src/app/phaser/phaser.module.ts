import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from './game.service';
import { ToRadiansPipe } from './pipes/to-radians.pipe';
import { ToDegreesPipe } from './pipes/to-degrees.pipe';

@NgModule({
  declarations: [
    ToRadiansPipe,
    ToDegreesPipe
  ],
  imports: [
    CommonModule
  ],
  providers: [
    GameService
  ]
})
export class PhaserModule { }
