import { ArgumentValue } from '../argument-value.class';

export interface Argument {
  name: string;
  type: string | string[] | Function;
  mandatory?: boolean;
  filter?(): boolean;
  id?: string;
}