import { Injectable } from '@angular/core';
import { CloudState } from '../cloud-state.class';

@Injectable({
  providedIn: 'root'
})
export class StatesService {

  states: CloudState[] = [];

  constructor() { }
}
