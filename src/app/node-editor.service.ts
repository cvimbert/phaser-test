import { Injectable } from '@angular/core';
import { EditionMode } from './enums/edition-mode.enum';

@Injectable({
  providedIn: 'root'
})
export class NodeEditorService {

  editionMode = EditionMode.ROTATION;

  constructor() { }

  // peut-être pas utile
  resetEditionMode() {
    this.editionMode = EditionMode.ROTATION;
  }
}
