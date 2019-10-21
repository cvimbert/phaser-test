import { Injectable } from '@angular/core';
import { DataBank } from '../data-bank.class';
import { CloudState } from '../cloud-state.class';
import { Configuration } from '../configuration.class';

@Injectable({
  providedIn: 'root'
})
export class DiffsService extends DataBank<CloudState> {

  constructor() {
    super(Configuration.DIFFS_STORAGE_KEY, CloudState);
  }
}
