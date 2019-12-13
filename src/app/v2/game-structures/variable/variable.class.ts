import { BaseGameStructure } from '../base-game-structure.class';
import { GraphTarget } from '../../graph-view/interfaces/graph-target.interface';
import { JsonProperty, JsonObject, Any } from 'json2typescript';

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
    }
  ];
  
  @JsonProperty("type", String)
  type = "";

  @JsonProperty("value", Any)
  value: any = undefined;
}