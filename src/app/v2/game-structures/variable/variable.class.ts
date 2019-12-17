import { BaseGameStructure } from '../base-game-structure.class';
import { GraphTarget } from '../../graph-view/interfaces/graph-target.interface';
import { JsonProperty, JsonObject, Any } from 'json2typescript';
import { VariableType } from './variable-type.class';

@JsonObject("Variable")
export class Variable extends BaseGameStructure implements GraphTarget {

  label = "Test";

  outAnchors = [];

  inAnchors = [
    {
      id: "set",
      label: "Set",
      callback: () => {

      }
    },
    {
      id: "increment",
      label: "Increment",
      callback: () => {
        this.increment();
      },
      displayCondition: () => {
        return this.type === VariableType.NUMBER;
      }
    },
    {
      id: "reset",
      label: "Reset",
      callback: () => {
        this.reset();
      }
    }
  ];

  currentValue: any;

  init() {
    this.currentValue = this.value;
    this.initLabel(false);
  }

  initLabel(update = false) {
    this.label = this.type + " (" + this.currentValue + ")";

    if (update) {
      this.graphService.mainView.update();
    }
  }
  
  @JsonProperty("type", String)
  type = "";

  @JsonProperty("value", Any)
  value: any = undefined;

  setValue() {

  }

  increment() {
    this.currentValue++;
    this.initLabel(true);
  }

  reset() {
    this.currentValue = this.value;
    this.initLabel(true);
  }
}