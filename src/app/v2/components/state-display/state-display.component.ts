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
  selectedDiffState: CloudState;

  constructor(
    public statesService: StatesService
  ) { }

  ngOnInit() {
    this.selectFirstValidState();
  }

  selectFirstValidState() {
    let targets = this.getDiffTargets();

    if (targets.length > 0) {
      this.selectedDiffState = targets[0];
    }
  }

  get selectedDiffStateId(): string {
    if (!this.selectedDiffState) {
      this.selectFirstValidState();
    }

    if (this.selectedDiffState) return this.selectedDiffState.name;
  }

  set selectedDiffStateId(value: string) {
    this.selectedDiffState = this.statesService.states.find(state => state.name === value);
  }

  getDiffTargets(): CloudState[] {
    return this.statesService.states.filter(cstate => cstate !== this.state);
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

  diffTest() {
    let state = this.state.getDiff(this.selectedDiffState);
    console.log(state);
  }
}
