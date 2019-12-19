import { Argument } from './argument.interface';
import { ArgumentValue } from '../argument-value.class';

export interface AnchorItem {
  id: string;
  label: string;
  type?: string;
  arguments?: { [key: string]: Argument };
  argumentValues?: ArgumentValue[];
  nameGetter?(args: ArgumentValue[]): string;
  callback?(args?: ArgumentValue[]): void;
  displayCondition?(): boolean;
}