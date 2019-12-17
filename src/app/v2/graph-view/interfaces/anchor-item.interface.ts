export interface AnchorItem {
  id: string;
  label: string;
  type?: string;
  callback?: Function;
  displayCondition?(): boolean;
}