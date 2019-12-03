import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CloudState } from '../../cloud-state.class';
import { StatesService } from '../../services/states.service';
import { StateDisplayerType } from '../../enums/state-displayer-type.enum';
import { ModalService } from '../../services/modal.service';
import { SetData } from '../../interfaces/set-data.interface';
import { TransitionsService } from '../../services/transitions.service';
import { DiffsService } from '../../services/diffs.service';

@Component({
  selector: 'state-display',
  templateUrl: './state-display.component.html',
  styleUrls: ['./state-display.component.scss']
})
export class StateDisplayComponent implements OnInit {

  @Input() state: CloudState;
  @Input() type: StateDisplayerType = StateDisplayerType.BASIC;

  @Output() onSetPosition = new EventEmitter<SetData>();

  selectedDiffState: CloudState;
  displaySetOptions = false;

  setDurations = [
    "0s",
    "1s",
    "2s"
  ];

  currentSetDuration = 0;

  setEasings = [
    "eq1",
    "eq2"
  ];

  currentSetEasing = 0;

  constructor(
    public statesService: StatesService,
    public transitionsService: TransitionsService,
    public diffsService: DiffsService,
    public modalService: ModalService
  ) { }

  ngOnInit() {
  }

  toggleSetOptions() {
    this.displaySetOptions = !this.displaySetOptions;
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

    if (this.selectedDiffState) return this.selectedDiffState.id;
  }

  setPosition() {

    // à déplacer vers un service (genre TransitionsService)
    this.onSetPosition.emit({
      state: this.state,
      duration: this.currentSetDuration,
      easing: this.currentSetEasing
    });
  }

  set selectedDiffStateId(value: string) {
    this.selectedDiffState = this.statesService.items.find(state => state.id === value);
  }

  getDiffTargets(): CloudState[] {
    return this.statesService.items.filter(cstate => cstate !== this.state);
  }

  logStateValue() {
    console.log(this.state);
  }

  deleteState() {
    if (this.type === StateDisplayerType.BASIC) {
      this.statesService.delete(this.state);
    } else if (this.type === StateDisplayerType.DIFF) {
      this.diffsService.delete(this.state);
    }
  }

  diffTest() {
    this.modalService.openDetailsModal().afterClosed().subscribe(data => {
      if (data) {
        let state = this.state.getDiff(this.selectedDiffState);
        state.id = "diff" + ++this.diffsService.tempId;
        state.name = data.name;
        state.description = data.description;
        this.diffsService.push(state);
      }
    });
  }

  editDetails() {
    this.modalService.openDetailsModal({
      name: this.state.name,
      description: this.state.description
    }).afterClosed().subscribe(data => {
      if (data) {
        this.state.name = data.name;
        this.state.description = data.description;
      }
    });
  }

  createTransition() {
    this.modalService.openDetailsModal().afterClosed().subscribe(data => {
      if (data) {
        let transition = this.transitionsService.createItem(data);
        transition.from = this.type;
        transition.stateId = this.state.id;
      }
    });
  }
}
