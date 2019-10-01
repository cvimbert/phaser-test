import { Injectable } from '@angular/core';
import { CloudStructure } from '../cloud-structure.class';

@Injectable({
  providedIn: 'root'
})
export class InspectionService {

  selectedStructure: CloudStructure;

  constructor() { }
}
