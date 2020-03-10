import { RootStore } from "./rootStore";
import { IStore } from "./store";
import { ISortable, SortableNumber } from "../models/sortable";
import { action, observable } from "mobx";
import { ISortingAlgorithm } from "../models/sortingAlgorithm";
import BubbleSort from "../../algorithms/bubbleSort";
import InsertionSort from "../../algorithms/insertionSort";
import {
  Algorithms,
  IAnimation,
  AnimationTypes
} from "../models/visualizerOptions";
import {
  generateSortableNumbers,
  generateSteadySortableNumbers
} from "../common/utils/arrayHelpers";
import { customColors } from "../styling/colors";
import SelectionSort from "../../algorithms/selectionSort";

export default class VisualizerStore implements IStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    this.initAlgorithms();
  }

  elementsCount = 100;
  animationSpeed = 10;

  algorithmsMap = new Map<Algorithms, ISortingAlgorithm>();
  @observable arraysMap = new Map<Algorithms, ISortable[]>();
  animationsMap = new Map<Algorithms, IAnimation[]>();
  @observable animatingMap = new Map<Algorithms, boolean>();

  @action initAlgorithms = () => {
    this.algorithmsMap.set(Algorithms.BubbleSort, new BubbleSort());
    this.algorithmsMap.set(Algorithms.InsertionSort, new InsertionSort());
    this.algorithmsMap.set(Algorithms.SelectionSort, new SelectionSort());

    this.algorithmsMap.forEach(x =>
      this.arraysMap.set(
        x.type,
        generateSortableNumbers(1, 100, this.elementsCount)
      )
    );
  };

  @action triggerSorting = (algorithm: Algorithms) => {
    this.triggerIsAnimating(algorithm);

    let animations = this.getAnimations(algorithm);
    let noAnimations = false;

    if (animations !== undefined) {
      noAnimations = animations.length === 0;
    }

    if (noAnimations) {
      let sortingAlgorithm = this.getAlgorithm(algorithm);
      let array = this.getArray(algorithm);
      let animations = this.setAnimations(
        algorithm,
        sortingAlgorithm
          .sort(array)
          .filter(x => x.type !== AnimationTypes.Comparison)
      );

      var interval = setInterval(() => {
        if (this.isAnimating(algorithm)) {
          let animation = animations.shift();
          if (animation) {
            this.animate(animation, array);
          } else {
            this.triggerIsAnimating(algorithm);
            clearInterval(interval);
          }
        }
      }, this.animationSpeed);
    }
  };

  @action animate(animation: IAnimation, array: ISortable[]) {
    array.forEach(x => (x.color = customColors.primary));
    switch (animation.type) {
      case AnimationTypes.Comparison:
        array[animation.index1].color = customColors.complementaryDark;
        array[animation.index2].color = customColors.complementaryDark;
        break;
      case AnimationTypes.Swap:
        let tmp = array[animation.index1];
        array[animation.index1] = array[animation.index2];
        array[animation.index1].color = customColors.secondaryDark;
        array[animation.index2] = tmp;
        array[animation.index2].color = customColors.secondaryDark;
        break;
      case AnimationTypes.Move:
        array[animation.index2] = array[animation.index1];
        array[animation.index2].color = customColors.secondary;
        break;
      case AnimationTypes.Set:
        if (animation.element) {
          array[animation.index2] = animation.element;
        }
        break;
    }
  }

  @action getRandomArray = (algorithm: Algorithms) => {
    this.resetArray(algorithm);

    this.setArray(
      algorithm,
      generateSortableNumbers(0, 100, this.elementsCount)
    );
  };

  @action getSteadyArray = (algorithm: Algorithms) => {
    this.resetArray(algorithm);

    this.setArray(algorithm, generateSteadySortableNumbers(this.elementsCount));
  };

  @action getReversedArray = (algorithm: Algorithms) => {
    this.resetArray(algorithm);

    let array: ISortable[] = [];
    for (let i = 1; i <= this.elementsCount; i++) {
      array.unshift(new SortableNumber(i));
    }

    this.setArray(algorithm, array);
  };

  @action resetArray(algorithm: Algorithms) {
    this.setAnimations(algorithm, []);
    if (this.isAnimating(algorithm)) this.triggerIsAnimating(algorithm);
  }

  getAlgorithm = (algorithm: Algorithms): ISortingAlgorithm => {
    return this.algorithmsMap.get(algorithm) ?? new BubbleSort();
  };

  getArray = (algorithm: Algorithms): ISortable[] => {
    return this.arraysMap.get(algorithm) ?? [];
  };

  @action setArray = (algorithm: Algorithms, array: ISortable[]) => {
    this.arraysMap.set(algorithm, array);
  };

  getAnimations = (algorithm: Algorithms): IAnimation[] => {
    return this.animationsMap.get(algorithm) ?? [];
  };

  setAnimations = (
    algorithm: Algorithms,
    animations: IAnimation[]
  ): IAnimation[] => {
    this.animationsMap.set(algorithm, animations);
    return this.animationsMap.get(algorithm) ?? [];
  };

  isAnimating = (algorithm: Algorithms): boolean => {
    return this.animatingMap.get(algorithm) ?? false;
  };

  @action triggerIsAnimating = (algorithm: Algorithms) => {
    this.animatingMap.set(algorithm, !this.isAnimating(algorithm));
  };
}
