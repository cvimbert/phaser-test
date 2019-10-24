import { Injectable } from '@angular/core';
import { Transition } from '../game-structures/transition/transition.class';
import { DataBank } from '../data-bank.class';
import { Configuration } from '../configuration.class';
import { StatesService } from './states.service';
import { DiffsService } from './diffs.service';
import { StateDisplayerType } from '../enums/state-displayer-type.enum';
import { CloudState } from '../cloud-state.class';

@Injectable({
  providedIn: 'root'
})
export class TransitionsService extends DataBank<Transition> {

  constructor(
    public statesService: StatesService,
    public diffsService: DiffsService
  ) {
    super(Configuration.TRANSITIONS_STORAGE_KEY, Transition);
  }

  initiateTween(type: StateDisplayerType, stateId: string) {
    
    if (!stateId) {
      console.log(`No state id provided.`);
    }

    let targetState: CloudState;

    if (type === StateDisplayerType.BASIC) {
      targetState = this.statesService.getState(stateId);
    } else if (type === StateDisplayerType.DIFF) {
      targetState = this.diffsService.getState(stateId);
    }

    console.log("Jusqu'ici c'est bon.", type, targetState);
  }
}
