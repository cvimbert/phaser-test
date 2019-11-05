import { JsonConvert, OperationMode, ValueCheckingMode } from 'json2typescript';
import { Configuration } from './configuration.class';

export class DataDictionary<T> {


  items: { [key: string]: T } = {};
  private jsonConverter: JsonConvert;

  constructor(
    public storageKey: string,
    public itemClass: new () => T
  ) {
    this.jsonConverter = new JsonConvert(
      OperationMode.ENABLE,
      ValueCheckingMode.ALLOW_NULL,
      false
    );
  }

  addItem(key: string, object: T) {
    this.items[key] = object;
  }

  save() {
    let obj = {};    

    for (let key in this.items) {
      obj[key] = this.jsonConverter.serialize(this.items[key]);
    }

    localStorage[this.storageKey + Configuration.ITEMS_SUFFIX] = JSON.stringify(obj);
  }

  load() {
    let itemsStr = localStorage[this.storageKey + Configuration.ITEMS_SUFFIX];
    this.items = {};

    if (itemsStr != undefined) {
      let obj = JSON.parse(itemsStr);
      
      for (let key in obj) {
        this.items[key] = this.jsonConverter.deserializeObject(obj[key], this.itemClass);
      }
    }
  }

  clear() {
    this.items = {};
  }
}