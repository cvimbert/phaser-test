import { Argument } from './argument.interface';

export interface AnchorItem {
  id: string;
  label: string;
  type?: string;
  arguments?: { [key: string]: Argument };
  callback?: Function;
  displayCondition?(): boolean;
}