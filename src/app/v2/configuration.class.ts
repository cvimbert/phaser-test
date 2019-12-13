export class Configuration {
  static INDEX_SUFFIX = "-index";
  static ITEMS_SUFFIX = "-items";

  static EASES = [
    'Linear',
    'Quad.easeIn',
    'Cubic.easeIn',
    'Quart.easeIn',
    'Quint.easeIn',
    'Sine.easeIn',
    'Expo.easeIn',
    'Circ.easeIn',
    'Back.easeIn',
    'Bounce.easeIn',
    'Quad.easeOut',
    'Cubic.easeOut',
    'Quart.easeOut',
    'Quint.easeOut',
    'Sine.easeOut',
    'Expo.easeOut',
    'Circ.easeOut',
    'Back.easeOut',
    'Bounce.easeOut',
    'Quad.easeInOut',
    'Cubic.easeInOut',
    'Quart.easeInOut',
    'Quint.easeInOut',
    'Sine.easeInOut',
    'Expo.easeInOut',
    'Circ.easeInOut',
    'Back.easeInOut',
    'Bounce.easeInOut'
  ];

  static STATES_STORAGE_KEY = "state";
  static DIFFS_STORAGE_KEY = "diff";
  static TRANSITIONS_STORAGE_KEY = "transition";
  static GRAPH_ITEMS_STORAGE_KEY = "graphitems";
  static GRAPH_ITEMS_BIS_STORAGE_KEY = "graph-items-bis";
  static GRAPH_TIMERS_STORAGE_KEY = "graph-timer-items";
  static GRAPH_TRIGGERS_STORAGE_KEY = "graph-trigger-items";
  static GRAPH_ANCHORS_STORAGE_KEY = "graph-anchor-items";
  static VARIABLE_STORAGE_KEY = "variable-item";

  // temporaire ??
  static highlightingTimeoutDelay = 2000;
}