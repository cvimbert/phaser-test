import { JsonCustomConvert, JsonConvert, JsonConverter } from 'json2typescript';
import { CloudNodeStatesDictionary } from '../cloud-node-states-dictionary.class';
import { CloudNodeState } from '../cloud-node-state.class';

@JsonConverter
export class CloudNodeStatesDictionaryConverter implements JsonCustomConvert<CloudNodeStatesDictionary> {

  converter: JsonConvert = new JsonConvert();

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