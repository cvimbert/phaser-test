import { Injectable } from '@angular/core';
import { EditionMode } from './enums/edition-mode.enum';
import { TransformationNode } from './v2/transformation-node.class';

@Injectable({
  providedIn: 'root'
})
export class NodeEditorService {

  editionMode = EditionMode.ROTATION;
  currentNode: TransformationNode;

  constructor() { }

  // peut-être pas utile
  resetEditionMode() {
    this.editionMode = EditionMode.ROTATION;
  }
}
