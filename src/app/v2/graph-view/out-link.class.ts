import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject("OutLink")
export class OutLink {

    constructor() {}

    @JsonProperty("pName", String)
    propertyName = "";

    @JsonProperty("to", String)
    to = "";
}