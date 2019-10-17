import { JsonCustomConvert, JsonConvert, JsonConverter, OperationMode, ValueCheckingMode } from 'json2typescript';
import { CloudNodeStatesDictionary } from '../cloud-node-states-dictionary.class';
import { CloudNodeState } from '../cloud-node-state.class';

@JsonConverter
export class CloudNodeStatesDictionaryConverter implements JsonCustomConvert<CloudNodeStatesDictionary> {

  converter: JsonConvert;

  constructor() {
    this.converter = new JsonConvert();
    this.converter.operationMode = OperationMode.ENABLE;
    this.converter.ignorePrimitiveChecks = false;
    this.converter.valueCheckingMode = ValueCheckingMode.ALLOW_OBJECT_NULL;
  }

  serialize(dic: CloudNodeStatesDictionary): any {
    let obj = {};

    for (let key in dic) {
      obj[key] = this.converter.serialize(dic[key]);
    }

    return obj;
  }

  deserialize(object: any): CloudNodeStatesDictionary {
    let dic: CloudNodeStatesDictionary = {};

    for (let key in object) {
      dic[key] = this.converter.deserializeObject(object[key], CloudNodeState);
    }

    return dic;
  }
}