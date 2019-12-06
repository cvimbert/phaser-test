import { CloudState } from '../cloud-state.class';

export interface SetData {
  state: CloudState;
  duration: number;
  easing: number;
  onStart?: Function;
  onComplete?: Function;
}