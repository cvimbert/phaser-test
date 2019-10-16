import { Injectable } from '@angular/core';
import { CloudStructure } from '../cloud-structure.class';
import { TransformationNode } from '../transformation-node.class';

@Injectable({
  providedIn: 'root'
})
export class InspectionService {

  selectedStructure: CloudStructure;
  selectedNode: TransformationNode;
  namesAreDisplayed = true;

  constructor() { }
}
