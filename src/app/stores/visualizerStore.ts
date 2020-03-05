import { RootStore } from "./rootStore";
import { IStore } from "./store";
import { ISortable, SortableNumber } from "../models/sortable";
import { action, observable } from "mobx";
import { ISortingAlgorithm } from "../models/sortingAlgorithm";
import BubbleSort from "../../algorithms/bubbleSort";
import InsertionSort from "../../algorithms/insertionSort";
import { randomNumber } from "../common/utils/mathHelpers";
import {
  Algorithms,
  IAnimation,
  AnimationTypes
} from "../models/visualizerOptions";

export default class VisualizerStore implements IStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  elementsCount = 100;
  animationSpeed = 10;

  bubbleSort: ISortingAlgorithm = new BubbleSort();
  insertionSort: ISortingAlgorithm = new InsertionSort();

  @observable bubbleSortArray = this.generateSortableNumbers(
    5,
    100,
    this.elementsCount
  );
  @observable insertionSortArray = this.generateSortableNumbers(
    5,
    100,
    this.elementsCount
  );

  bubbleSortAnimations: IAnimation[] = [];
  insertionSortAnimations: IAnimation[] = [];

  bubbleSortIsAnimating = false;
  insertionSortIsAnimating = false;

  @action triggerSorting = (algorithm: Algorithms) => {
    this.triggerIsAnimating(algorithm);

    if (this.getAnimations(algorithm).length === 0) {
      let sortingAlgorithm = this.getAlgorithm(algorithm);
      let array = this.getArray(algorithm);
      let animations = this.setAnimations(
        algorithm,
        sortingAlgorithm.sort(array)
      );

      setInterval(() => {
        if (this.isAnimating(algorithm)) {
          let animation = animations.shift();
          if (animation) {
            this.animate(animation, array);
          }
        }
      }, this.animationSpeed);
    }
  };

  @action animate(animation: IAnimation, array: ISortable[]) {
    array.forEach(x => (x.color = "100"));
    switch (animation.type) {
      case AnimationTypes.Comparison:
        break;
      case AnimationTypes.Swap:
        let tmp = array[animation.index1];
        array[animation.index1] = array[animation.index2];
        array[animation.index2] = tmp;
        array[animation.index2].color = "0";
        break;
      case AnimationTypes.Move:
        array[animation.index2] = array[animation.index1];
        array[animation.index2].color = "200";
        break;
      case AnimationTypes.Set:
        if (animation.element) {
          array[animation.index2] = animation.element;
        }
        break;
    }
  }

  @action generateSortableNumbers(
    from: number,
    to: number,
    count: number
  ): ISortable[] {
    let array: ISortable[] = [];

    for (let i = 0; i < count; i++) {
      array.push(new SortableNumber(randomNumber(from, to)));
    }

    return array;
  }

  getAlgorithm = (algorithm: Algorithms): ISortingAlgorithm => {
    switch (algorithm) {
      case Algorithms.BubbleSort:
        return this.bubbleSort;
      case Algorithms.InsertionSort:
        return this.insertionSort;
    }
  };

  getArray = (algorithm: Algorithms): ISortable[] => {
    switch (algorithm) {
      case Algorithms.BubbleSort:
        return this.bubbleSortArray;
      case Algorithms.InsertionSort:
        return this.insertionSortArray;
    }
  };

  getAnimations = (algorithm: Algorithms): IAnimation[] => {
    switch (algorithm) {
      case Algorithms.BubbleSort:
        return this.bubbleSortAnimations;
      case Algorithms.InsertionSort:
        return this.insertionSortAnimations;
    }
  };

  setAnimations = (
    algorithm: Algorithms,
    animations: IAnimation[]
  ): IAnimation[] => {
    switch (algorithm) {
      case Algorithms.BubbleSort:
        this.bubbleSortAnimations = animations;
        return this.bubbleSortAnimations;
      case Algorithms.InsertionSort:
        this.insertionSortAnimations = animations;
        return this.insertionSortAnimations;
    }
  };

  isAnimating = (algorithm: Algorithms): boolean => {
    switch (algorithm) {
      case Algorithms.BubbleSort:
        return this.bubbleSortIsAnimating;
      case Algorithms.InsertionSort:
        return this.insertionSortIsAnimating;
    }
  };

  triggerIsAnimating = (algorithm: Algorithms) => {
    switch (algorithm) {
      case Algorithms.BubbleSort:
        this.bubbleSortIsAnimating = !this.bubbleSortIsAnimating;
        break;
      case Algorithms.InsertionSort:
        this.insertionSortIsAnimating = !this.insertionSortIsAnimating;
        break;
    }
  };
}
