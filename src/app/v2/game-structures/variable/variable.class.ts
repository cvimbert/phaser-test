import { BaseGameStructure } from '../base-game-structure.class';
import { GraphTarget } from '../../graph-view/interfaces/graph-target.interface';
import { JsonProperty, JsonObject, Any } from 'json2typescript';
import { VariableType } from './variable-type.class';
import { AnchorItem } from '../../graph-view/interfaces/anchor-item.interface';
import { ArgumentValue } from '../../graph-view/argument-value.class';

@JsonObject("Variable")
export class Variable extends BaseGameStructure implements GraphTarget {

  label = "Test";

  afterAnchor: AnchorItem = {
    id: "after",
    label: "After",
    callback: () => {
      this.onAfter();
    }
  };

  outAnchors: AnchorItem[] = [
    this.afterAnchor
  ];

  inAnchors: AnchorItem[] = [
    {
      id: "set",
      label: "Set",
      callback: args => {
        this.setValue(args);
      },
      arguments: {
        value: {
          name: "Value",
          type: () => this.type
        }
      },
      nameGetter: args => {
        let valueArg = this.getArg(args, "value");

        if (valueArg) {
          return "Set to " + this.getSeparatedText(valueArg.value);
        }
      }
    },
    {
      id: "increment",
      label: "Increment",
      callback: () => {
        this.increment();
      },
      displayCondition: () => this.type === VariableType.NUMBER
    },
    {
      id: "toggle",
      label: "Toggle",
      callback: () => {
        this.toggle();
      },
      displayCondition: () => this.type === VariableType.BOOLEAN
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

  getSeparatedText(str: string): string {
    let sep = this.type === VariableType.STRING ? '"' : "";
    return `<b>${sep}${str}${sep}</b>`;
  }

  initLabel(update = false) {
    this.label = this.name + " - " + this.type + " (" + this.currentValue + ")";

    if (update) {
      this.graphService.mainView.update();
    }
  }
  
  @JsonProperty("type", String)
  type = "";

  @JsonProperty("value", Any)
  value: any = undefined;

  setValue(args: ArgumentValue[]) {
    let valueArg = this.getArg(args, "value");

    // on devrait aussi vérifier le type de la variable
    
    this.currentValue = valueArg.value;
    this.initLabel(true);
    this.triggerAfter();
  }

  toggle() {
    this.currentValue = !this.currentValue;
    this.initLabel(true);
    this.triggerAfter();
  }

  triggerAfter() {
    this.graphService.playAllIn(this.afterAnchor, this.parentGraphItem);
  }

  increment() {
    this.currentValue++;
    this.initLabel(true);
    this.triggerAfter();
  }

  reset() {
    this.currentValue = this.value;
    this.initLabel(true);
    this.triggerAfter();
  }

  onAfter() {
    this.graphService.playOut(this.afterAnchor, this.parentGraphItem);
  }
}