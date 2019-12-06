import { Injectable } from '@angular/core';
import { Transition } from '../game-structures/transition/transition.class';
import { DataBank } from '../data-bank.class';
import { Configuration } from '../configuration.class';
import { StatesService } from './states.service';
import { DiffsService } from './diffs.service';
import { StateDisplayerType } from '../enums/state-displayer-type.enum';
import { CloudState } from '../cloud-state.class';
import { CloudService } from './cloud.service';

@Injectable({
  providedIn: 'root'
})
export class TransitionsService extends DataBank<Transition> {

  constructor(
    public statesService: StatesService,
    public diffsService: DiffsService,
    public cloudService: CloudService
  ) {
    super(Configuration.TRANSITIONS_STORAGE_KEY, Transition);
  }

  initiateTween(transition: Transition, onStart?: Function, onComplete?: Function) {    
    
    if (!transition.stateId) {
      console.log(`No state id provided.`);
    }

    let targetState: CloudState;

    if (transition.from === StateDisplayerType.BASIC) {
      targetState = this.statesService.getState(transition.stateId);
    } else if (transition.from === StateDisplayerType.DIFF) {
      targetState = this.diffsService.getState(transition.stateId);
    }

    if (targetState) {

      if (!this.cloudService.cloudView) {
        console.warn("No cloud view to play transition. Using timeout instead.");
        // sinon il est possible de faire une simulation avec des timeout

        onStart();

        setTimeout(() => {
          onComplete();
        }, transition.duration * 1000);

        return;
      }

      this.cloudService.cloudView.setPosition({
        duration: transition.duration * 1000,
        easing: Number(transition.easingType),
        state: targetState,
        onComplete: () => {
          console.log("Completed 2");
          if (onComplete) {
            onComplete();
          }
        },
        onStart: () => {
          console.log("Started 2");
          if (onStart) {
            onStart();
          }
        }
      });
    }
  }
}
