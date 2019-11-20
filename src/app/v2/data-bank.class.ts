import { JsonConvert, OperationMode, ValueCheckingMode } from 'json2typescript';
import { DetailsData } from './interfaces/details-data.interface';
import { Configuration } from './configuration.class';

export class DataBank<T> {

  items: T[] = [];
  tempId = 0;
  private jsonConverter: JsonConvert;

  constructor(
    public storageKey: string,
    public itemClass: {new (): T}
  ) {
    this.jsonConverter = new JsonConvert(
      OperationMode.ENABLE,
      ValueCheckingMode.ALLOW_NULL,
      false
    );

    this.load();
  }

  createItem(data: DetailsData): T {
    let item: T = new this.itemClass();

    // ces assignations ne sont pas hyper clean, mais bon...
    item["id"] = this.storageKey + "_" + this.tempId++;

    if (data) {
      item["name"] = data.name;
      item["description"] = data.description;
    }

    this.push(item);
    return item;
  }

  push(item: T) {
    this.items.push(item);
  }

  getItemById(id: string): T {
    return this.items.find(item => item["id"] === id);
  }

  clear() {
    this.items.length = 0;
    this.tempId = 0;
  }

  delete(item: T) {
    let index = this.items.indexOf(item);

    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  save() {
    localStorage[this.storageKey + Configuration.INDEX_SUFFIX] = this.tempId;

    let obj = this.jsonConverter.serializeArray(this.items);
    localStorage[this.storageKey + Configuration.ITEMS_SUFFIX] = JSON.stringify(obj);
  }

  load() {
    let index = localStorage[this.storageKey + Configuration.INDEX_SUFFIX];

    if (index != undefined) {
      this.tempId = index;
    }

    let itemsStr = localStorage[this.storageKey + Configuration.ITEMS_SUFFIX];

    if (itemsStr != undefined) {
      let obj = JSON.parse(itemsStr);
      this.items = this.jsonConverter.deserializeArray(obj, this.itemClass);      
    }
  }
}