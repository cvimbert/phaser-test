import { Component, OnInit, Input } from '@angular/core';
import { Transition } from '../../game-structures/transition/transition.class';

@Component({
  selector: 'app-transition-display',
  templateUrl: './transition-display.component.html',
  styleUrls: ['./transition-display.component.scss']
})
export class TransitionDisplayComponent implements OnInit {

  @Input() transition: Transition;

  constructor() { }

  ngOnInit() {
  }

}
