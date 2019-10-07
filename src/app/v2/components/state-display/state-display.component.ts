import { Component, OnInit, Input } from '@angular/core';
import { CloudState } from '../../cloud-state.class';
import { StatesService } from '../../services/states.service';

@Component({
  selector: 'state-display',
  templateUrl: './state-display.component.html',
  styleUrls: ['./state-display.component.scss']
})
export class StateDisplayComponent implements OnInit {

  @Input("state") state: CloudState;

  // serait plus clean dans un service
  //@Input("states") states: CloudState[];

  constructor(
    public statesService: StatesService
  ) { }

  ngOnInit() {
  }

  getDiffTargets(state: CloudState): CloudState[] {
    return this.statesService.states.filter(cstate => cstate !== state);
  }

  logStateValue() {
    console.log(this.state);
  }

  deleteState() {
    let index = this.statesService.states.indexOf(this.state);
    
    if (index != -1) {
      this.statesService.states.splice(index, 1);
    }
  }
}
