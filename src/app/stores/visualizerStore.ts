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
import { green, blue, purple } from "@material-ui/core/colors";

export default class VisualizerStore implements IStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    this.initialize();
  }

  animationSpeed = 10;
  @observable speed = "average";
  @observable currentCardIndex = 1;

  algorithmsMap = new Map<Algorithms, ISortingAlgorithm>();
  @observable arraysMap = new Map<Algorithms, ISortable[]>();
  @observable elementsCountMap = new Map<Algorithms, number>();

  animationsMap = new Map<Algorithms, IAnimation[]>();
  @observable animatingMap = new Map<Algorithms, boolean>();
  @observable animationSettingsMap = new Map<AnimationTypes, boolean>();
  @observable animationColorsMap = new Map<AnimationTypes, string>();

  @action initialize = () => {
    this.animationSettingsMap.set(AnimationTypes.Swap, true);
    this.animationSettingsMap.set(AnimationTypes.Comparison, false);
    this.animationSettingsMap.set(AnimationTypes.Move, true);
    this.animationSettingsMap.set(AnimationTypes.Set, true);

    this.animationColorsMap.set(
      AnimationTypes.Swap,
      customColors.secondaryDark
    );
    this.animationColorsMap.set(
      AnimationTypes.Comparison,
      customColors.complementaryDark
    );
    this.animationColorsMap.set(AnimationTypes.Move, blue[500]);
    this.animationColorsMap.set(AnimationTypes.Set, purple[500]);
    this.animationColorsMap.set(AnimationTypes.Finish, green[500]);

    this.elementsCountMap.set(Algorithms.BubbleSort, 30);
    this.elementsCountMap.set(Algorithms.InsertionSort, 50);
    this.elementsCountMap.set(Algorithms.SelectionSort, 80);
    this.elementsCountMap.set(Algorithms.QuickSort, 100);
    this.elementsCountMap.set(Algorithms.MergeSort, 100);

    this.algorithmsMap.set(Algorithms.BubbleSort, new BubbleSort());
    this.algorithmsMap.set(Algorithms.InsertionSort, new InsertionSort());
    this.algorithmsMap.set(Algorithms.SelectionSort, new SelectionSort());
    this.algorithmsMap.set(Algorithms.QuickSort, new QuickSort());
    this.algorithmsMap.set(Algorithms.MergeSort, new MergeSort());

    this.algorithmsMap.forEach(x =>
      this.arraysMap.set(
        x.type,
        generateSortableNumbers(1, 100, this.getElementsCount(x.type))
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
        sortingAlgorithm.sort(array)
      );

      var interval = setInterval(() => {
        if (this.isAnimating(algorithm)) {
          var animation;
          while (animations.length > 0) {
            animation = animations.shift();

            if (
              animation &&
              !this.animationSettingsMap.get(animation.type) &&
              animation.type !== AnimationTypes.Finish
            ) {
              this.animate(animation, array, false);
            } else {
              break;
            }
          }

          if (animation) {
            this.animate(animation, array, true);
          } else {
            this.triggerIsAnimating(algorithm, false);
            clearInterval(interval);
          }
        }
      }, this.animationSpeed);
    }
  };

  @action handleBarsAmountChange = (value: number, algorithm: Algorithms) => {
    if (
      value < 5 ||
      value > 200 ||
      value === this.getElementsCount(algorithm)
    ) {
      return;
    }

    this.elementsCountMap.set(algorithm, value);
    this.resetAnimations(algorithm);

    this.arraysMap.set(algorithm, generateSortableNumbers(1, 100, value));
  };

  @action changeSpeed = (speed: string) => {
    this.speed = speed;
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

  @action animate(
    animation: IAnimation,
    array: ISortable[],
    animated: boolean
  ) {
    if (animated) {
      array.forEach(x => (x.color = customColors.primary));
    }

    switch (animation.type) {
      case AnimationTypes.Comparison:
        if (animated) {
          array[animation.index1].color = this.getColor(
            AnimationTypes.Comparison
          );
          array[animation.index2].color = this.getColor(
            AnimationTypes.Comparison
          );
        }
        break;
      case AnimationTypes.Swap:
        if (animated) {
          array[animation.index1].color = this.getColor(AnimationTypes.Swap);
          array[animation.index2].color = this.getColor(AnimationTypes.Swap);
        }

        let tmp = array[animation.index1];
        array[animation.index1] = array[animation.index2];
        array[animation.index2] = tmp;
        break;
      case AnimationTypes.Move:
        array[animation.index2] = array[animation.index1];

        if (animated) {
          array[animation.index2].color = this.getColor(AnimationTypes.Move);
        }
        break;
      case AnimationTypes.Set:
        if (animation.element) {
          array[animation.index2] = animation.element;

          if (animated) {
            array[animation.index2].color = this.getColor(AnimationTypes.Set);
          }
        }
        break;
      case AnimationTypes.Finish:
        for (let i = 0; i <= animation.index1; i++) {
          array[i].color = this.getColor(AnimationTypes.Finish);
        }
        break;
    }
  }

  @action getRandomArray = (algorithm: Algorithms) => {
    this.resetAnimations(algorithm);

    this.setArray(
      algorithm,
      generateSortableNumbers(0, 25, this.getElementsCount(algorithm))
    );
  };

  @action getSteadyArray = (algorithm: Algorithms) => {
    this.resetAnimations(algorithm);

    this.setArray(
      algorithm,
      generateSteadySortableNumbers(this.getElementsCount(algorithm))
    );
  };

  @action getReversedArray = (algorithm: Algorithms) => {
    this.resetAnimations(algorithm);

    let array: ISortable[] = [];
    for (let i = 1; i <= this.getElementsCount(algorithm); i++) {
      array.unshift(
        new SortableNumber(
          remap([0, this.getElementsCount(algorithm)], [0, 100], i)
        )
      );
    }

    this.setArray(algorithm, array);
  };

  @action getSteppedArray = (algorithm: Algorithms) => {
    this.resetAnimations(algorithm);

    this.setArray(
      algorithm,
      generateSteppedArray(this.getElementsCount(algorithm))
    );
  };

  @action resetAnimations(algorithm: Algorithms) {
    if (this.isAnimating(algorithm)) {
      this.triggerIsAnimating(algorithm, false);
    }
    this.setAnimations(algorithm, []);
  }

  getAlgorithm = (algorithm: Algorithms): ISortingAlgorithm => {
    return this.algorithmsMap.get(algorithm) ?? new BubbleSort();
  };

  getElementsCount = (algorithm: Algorithms): number => {
    return this.elementsCountMap.get(algorithm) ?? 50;
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

  getColor = (type: AnimationTypes): string => {
    return this.animationColorsMap.get(type) ?? customColors.grey;
  };

  @action triggerIsAnimating = (algorithm: Algorithms, value: boolean) => {
    this.animatingMap.set(algorithm, value);
  };

  @action toggleAnimationSettings = (type: AnimationTypes) => {
    let currentValue = this.animationSettingsMap.get(type);
    this.animationSettingsMap.set(type, !currentValue ?? true);
  };

  @action nextCard = () => {
    if (this.currentCardIndex >= 5) {
      this.currentCardIndex = 1;
    } else {
      this.currentCardIndex += 1;
    }
  };

  @action prevCard = () => {
    if (this.currentCardIndex <= 1) {
      this.currentCardIndex = 5;
    } else {
      this.currentCardIndex -= 1;
    }
  };

  @action setCard = (index: number) => {
    this.currentCardIndex = index;
  };
}
