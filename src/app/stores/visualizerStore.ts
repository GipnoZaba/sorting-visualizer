import { RootStore } from "./rootStore";
import { IStore } from "./store";
import { ISortable, SortableNumber } from "../models/sortable";
import { action } from "mobx";
import { ISortingAlgortihm } from "../../algorithms/sortingAlgorithm";
import BubbleSort from "../../algorithms/bubbleSort";

export default class VisualizerStore implements IStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  originalArray: ISortable[] | null = null;
  bubbleAlgorithm: ISortingAlgortihm = new BubbleSort(
    this.generateSortableNumbers(10, 100, 100)
  );

  @action startAlgorithm = (algorithm: ISortingAlgortihm) => {
    setInterval(() => algorithm.step(), 10);
  };

  @action generateSortableNumbers(
    from: number,
    to: number,
    count: number
  ): ISortable[] {
    let array: ISortable[] = [];

    for (let i = 0; i < count; i++) {
      array.push(
        new SortableNumber(Math.round(Math.random() * (to - from) + from))
      );
    }

    return array;
  }
}
