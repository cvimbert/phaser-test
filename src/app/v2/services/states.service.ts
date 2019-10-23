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

  getState(id: string): CloudState {
    let state: CloudState = this.items.find(item => item.id === id);

    if (!CloudState) {
      console.warn(`No state named ${ id } found in StatesService.`);
    }

    console.log(state);

    return state;
  }
}
