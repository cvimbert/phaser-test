import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject("OutLink")
export class OutLink {

    @JsonProperty("lProp", String)
    localProperty = "";

    @JsonProperty("tObj", String)
    targetObject = "";

    @JsonProperty("tProp", String)
    targetProperty = "";
}