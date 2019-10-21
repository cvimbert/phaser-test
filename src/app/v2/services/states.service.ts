import { Injectable } from '@angular/core';
import { CloudState } from '../cloud-state.class';
import { DataBank } from '../data-bank.class';
import { Configuration } from '../configuration.class';

@Injectable({
  providedIn: 'root'
})
export class StatesService extends DataBank<CloudState> {

  constructor() {
    super(Configuration.STATES_STORAGE_KEY, CloudState);
  }
}
