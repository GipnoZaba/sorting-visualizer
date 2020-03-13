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
  generateSteadySortableNumbers,
  generateSteppedArray
} from "../common/utils/arrayHelpers";
import { customColors } from "../styling/colors";
import SelectionSort from "../../algorithms/selectionSort";
import QuickSort from "../../algorithms/quickSort";
import MergeSort from "../../algorithms/mergeSort";
import { remap } from "../common/utils/mathHelpers";

export default class VisualizerStore implements IStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    this.initAlgorithms();
  }

  elementsCount = 50;
  animationSpeed = 10;
  intervalChanged = false;

  algorithmsMap = new Map<Algorithms, ISortingAlgorithm>();
  @observable arraysMap = new Map<Algorithms, ISortable[]>();
  animationsMap = new Map<Algorithms, IAnimation[]>();
  @observable animatingMap = new Map<Algorithms, boolean>();

  @action initAlgorithms = () => {
    this.algorithmsMap.set(Algorithms.BubbleSort, new BubbleSort());
    this.algorithmsMap.set(Algorithms.InsertionSort, new InsertionSort());
    this.algorithmsMap.set(Algorithms.SelectionSort, new SelectionSort());
    this.algorithmsMap.set(Algorithms.QuickSort, new QuickSort());
    this.algorithmsMap.set(Algorithms.MergeSort, new MergeSort());

    this.algorithmsMap.forEach(x =>
      this.arraysMap.set(
        x.type,
        generateSortableNumbers(1, 100, this.elementsCount)
      )
    );
  };

  @action triggerSorting = (algorithm: Algorithms) => {
    this.triggerIsAnimating(algorithm, !this.isAnimating(algorithm));

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
            this.triggerIsAnimating(algorithm, false);
            clearInterval(interval);
          }
        }
      }, this.animationSpeed);
    }
  };

  @action handleBarsAmountChange = (value: number, algorithm: Algorithms) => {
    if (value < 5 || value > 100 || value === this.elementsCount) {
      return;
    }

    this.elementsCount = value;
    this.resetAnimations(algorithm);

    this.arraysMap.set(
      algorithm,
      generateSortableNumbers(1, 100, this.elementsCount)
    );
  };

  @action changeSpeed = (speed: string) => {
    switch (speed) {
      case "slow":
        this.animationSpeed = 500;
        break;
      case "average":
        this.animationSpeed = 100;
        break;
      case "fast":
        this.animationSpeed = 1;
        break;
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
          array[animation.index2].color = customColors.secondaryDark;
        }
        break;
    }
  }

  @action getRandomArray = (algorithm: Algorithms) => {
    this.resetAnimations(algorithm);

    this.setArray(
      algorithm,
      generateSortableNumbers(0, 100, this.elementsCount)
    );
  };

  @action getSteadyArray = (algorithm: Algorithms) => {
    this.resetAnimations(algorithm);

    this.setArray(algorithm, generateSteadySortableNumbers(this.elementsCount));
  };

  @action getReversedArray = (algorithm: Algorithms) => {
    this.resetAnimations(algorithm);

    let array: ISortable[] = [];
    for (let i = 1; i <= this.elementsCount; i++) {
      array.unshift(
        new SortableNumber(remap([0, this.elementsCount], [0, 100], i))
      );
    }

    this.setArray(algorithm, array);
  };

  @action getSteppedArray = (algorithm: Algorithms) => {
    this.resetAnimations(algorithm);

    this.setArray(algorithm, generateSteppedArray(this.elementsCount));
  };

  @action resetAnimations(algorithm: Algorithms) {
    this.setAnimations(algorithm, []);
    if (this.isAnimating(algorithm)) {
      this.triggerIsAnimating(algorithm, false);
    }
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

  @action triggerIsAnimating = (algorithm: Algorithms, value: boolean) => {
    this.animatingMap.set(algorithm, value);
  };
}
