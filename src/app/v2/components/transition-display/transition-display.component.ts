import { Component, OnInit, Input } from '@angular/core';
import { Transition } from '../../game-structures/transition/transition.class';
import { TransitionsService } from '../../services/transitions.service';

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
}
