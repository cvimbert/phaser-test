import { Point } from './interfaces/point.interface';
import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject("SerializablePoint")
export class SerializablePoint {

  @JsonProperty("x", Number)
  x = 0;

  @JsonProperty("y", Number)
  y = 0;

  constructor() {}

}