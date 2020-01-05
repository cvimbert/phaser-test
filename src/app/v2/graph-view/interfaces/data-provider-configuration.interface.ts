export interface DataProviderConfiguration {
  [key: string]: {
    objectConstructor: {new (): any};
    storageKey: string;
  };
}