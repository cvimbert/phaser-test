import { Injectable } from '@angular/core';
import { Transition } from '../game-structures/transition/transition.class';
import { DetailsData } from '../interfaces/details-data.interface';
import { DataBank } from '../data-bank.class';
import { Configuration } from '../configuration.class';

@Injectable({
  providedIn: 'root'
})
export class TransitionsService extends DataBank<Transition> {

  constructor() {
    super(Configuration.TRANSITIONS_STORAGE_KEY, Transition);
  }
}
