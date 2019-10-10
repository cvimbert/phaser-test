import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CloudState } from '../../cloud-state.class';
import { StatesService } from '../../services/states.service';
import { StateDisplayerType } from '../../enums/state-displayer-type.enum';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'state-display',
  templateUrl: './state-display.component.html',
  styleUrls: ['./state-display.component.scss']
})
export class StateDisplayComponent implements OnInit {

  @Input("state") state: CloudState;
  @Input("type") type: StateDisplayerType = StateDisplayerType.BASIC;

  @Output("onSetPosition") onSetPosition = new EventEmitter<CloudState>();

  selectedDiffState: CloudState;

  constructor(
    public statesService: StatesService,
    public modalService: ModalService
  ) { }

  ngOnInit() {
  }

  selectFirstValidDiffState() {
    let targets = this.getDiffTargets();

    if (targets.length > 0) {
      this.selectedDiffState = targets[0];
    }
  }

  get selectedDiffStateId(): string {
    if (!this.selectedDiffState) {
      this.selectFirstValidDiffState();
    }

    if (this.selectedDiffState) return this.selectedDiffState.name;
  }

  setPosition() {
    this.onSetPosition.emit(this.state);
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

    let storage: CloudState[];

    if (this.type === StateDisplayerType.BASIC) {
      storage = this.statesService.states;
    } else if (this.type === StateDisplayerType.DIFF) {
      storage = this.statesService.diffs;
    }

    let index = storage.indexOf(this.state);
    
    if (index != -1) {
      storage.splice(index, 1);
    }
  }

  diffTest() {
    this.modalService.openDetailsModal().then(data => {
      if (data) {
        let state = this.state.getDiff(this.selectedDiffState);
        state.id = "diff" + ++this.statesService.tempDiffId;
        state.name = data.name;
        state.description = data.description;
        this.statesService.diffs.push(state);
      }
    });
  }

  editDetails() {
    this.modalService.openDetailsModal({
      name: this.state.name,
      description: this.state.description
    }).then(data => {
      if (data) {
        this.state.name = data.name;
        this.state.description = data.description;
      }
    });
  }
}
