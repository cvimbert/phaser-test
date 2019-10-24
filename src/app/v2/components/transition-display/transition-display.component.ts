import { Component, OnInit, Input } from '@angular/core';
import { Transition } from '../../game-structures/transition/transition.class';
import { TransitionsService } from '../../services/transitions.service';
import { Configuration } from '../../configuration.class';
import { StateDisplayerType } from '../../enums/state-displayer-type.enum';

@Component({
  selector: 'transition-display',
  templateUrl: './transition-display.component.html',
  styleUrls: ['./transition-display.component.scss']
})
export class TransitionDisplayComponent implements OnInit {

  @Input() transition: Transition;

  constructor(
    public transitionsService: TransitionsService
  ) { }

  ngOnInit() {
  }

  deleteItem() {
    this.transitionsService.delete(this.transition);
  }

  get eases(): string[] {
    return Configuration.EASES;
  }

  playTransition() {
    this.transitionsService.initiateTween(this.transition.from, this.transition.stateId);
  }

  logTransition() {
    console.log(this.transition);
  }
}
