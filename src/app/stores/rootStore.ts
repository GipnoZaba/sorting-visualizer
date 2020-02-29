import { createContext } from "react";
import { configure } from "mobx";
import { IStore } from "./store";
import VisualizerStore from "./visualizerStore";

configure({ enforceActions: "always" });

export class RootStore implements IStore {
  visualizerStore: VisualizerStore;

  constructor() {
    this.visualizerStore = new VisualizerStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
