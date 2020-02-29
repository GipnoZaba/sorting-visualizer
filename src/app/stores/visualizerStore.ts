import { RootStore } from "./rootStore";
import { IStore } from "./store";
import { ISortable, SortableNumber } from "../models/sortable";
import { observable, action } from "mobx";
import { ISortingAlgortihm } from "../../algorithms/sortingAlgorithm";
import BubbleSort from "../../algorithms/bubbleSort";

export default class VisualizerStore implements IStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  originalArray: ISortable[] | null = null;
  currentAlgorithm: ISortingAlgortihm = new BubbleSort([
    new SortableNumber(9),
    new SortableNumber(5),
    new SortableNumber(6),
    new SortableNumber(3),
    new SortableNumber(7),
    new SortableNumber(2)
  ]);

  @action step = () => {
    this.currentAlgorithm.step();
    console.log(this.currentAlgorithm.array);
  };
}
