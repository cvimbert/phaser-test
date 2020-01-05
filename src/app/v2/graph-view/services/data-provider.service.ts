import { Injectable } from '@angular/core';
import { DataBank } from '../../data-bank.class';
import { GraphItem } from '../graph-item.class';
import { Configuration } from '../../configuration.class';
import { GraphTimer } from '../graph-timer.class';
import { GraphTrigger } from '../graph-trigger.class';
import { GraphAnchor } from '../graph-anchor.class';
import { Variable } from '../../game-structures/variable/variable.class';
import { DataProviderConfiguration } from '../interfaces/data-provider-configuration.interface';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  static GRAPH_ITEM = "graphitem";
  static TIMER = "timer";
  static TRIGGER = "trigger";
  static ANCHOR = "anchor";
  static VARIABLE = "variable";

  graphItems = new DataBank<GraphItem>(Configuration.GRAPH_ITEMS_BIS_STORAGE_KEY, GraphItem);
  graphTimerItems = new DataBank<GraphTimer>(Configuration.GRAPH_TIMERS_STORAGE_KEY, GraphTimer);
  graphTriggerItems = new DataBank<GraphTrigger>(Configuration.GRAPH_TRIGGERS_STORAGE_KEY, GraphTrigger);
  graphAnchorItems = new DataBank<GraphAnchor>(Configuration.GRAPH_ANCHORS_STORAGE_KEY, GraphAnchor);
  variableItems = new DataBank<Variable>(Configuration.VARIABLE_STORAGE_KEY, Variable);

  // la conf se fait ici, mais elle devra être déplacée
  configuration: DataProviderConfiguration = {
    [DataProviderService.GRAPH_ITEM]: {
      objectConstructor: GraphItem,
      storageKey: Configuration.GRAPH_ITEMS_BIS_STORAGE_KEY
    },
    [DataProviderService.TIMER]: {
      objectConstructor: GraphTimer,
      storageKey: Configuration.GRAPH_TIMERS_STORAGE_KEY
    },
    [DataProviderService.TRIGGER]: {
      objectConstructor: GraphTrigger,
      storageKey: Configuration.GRAPH_TRIGGERS_STORAGE_KEY
    },
    [DataProviderService.ANCHOR]: {
      objectConstructor: GraphAnchor,
      storageKey: Configuration.GRAPH_ANCHORS_STORAGE_KEY
    },
    [DataProviderService.VARIABLE]: {
      objectConstructor: Variable,
      storageKey: Configuration.VARIABLE_STORAGE_KEY
    }
  }

  constructor() {
    // this.init(this.configuration);
  }

  init(conf: DataProviderConfiguration) {
    for (let key in conf) {

    }
  }
}
