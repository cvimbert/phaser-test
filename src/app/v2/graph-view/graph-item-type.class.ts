import { GraphTargetSelectionModalComponent } from './components/graph-target-selection-modal/graph-target-selection-modal.component';
import { GraphTimerModalComponent } from './components/graph-timer-modal/graph-timer-modal.component';

export class GraphItemType {
  static TRANSITION = "transition";
  static TIMER = "timer";
  static TRIGGER = "trigger";

  static ITEMS_LIST = [
    GraphItemType.TRANSITION,
    GraphItemType.TIMER,
    GraphItemType.TRIGGER
  ];

  static ITEMS_CREATION_MODAL_COMPONENT = {
    [GraphItemType.TIMER]: GraphTimerModalComponent
  }
}