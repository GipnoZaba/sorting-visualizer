import {
  ISortingAlgorithm,
  IAlgorithmData
} from "../app/models/sortingAlgorithm";
import { ISortable } from "../app/models/sortable";
import {
  Algorithms,
  AnimationTypes,
  IAnimation
} from "../app/models/visualizerOptions";
import { linear, logarithmicLinear } from "../app/common/utils/mathHelpers";

const data: IAlgorithmData = {
  title: "Merge Sort",
  class: "Comparison sort",
  description: "",
  timeComplexity: logarithmicLinear,
  spaceComplexity: linear
};

class MergeSort implements ISortingAlgorithm {
  type = Algorithms.MergeSort;
  data = data;

  sort(array: ISortable[]) {
    array = array.slice();
    var animations: IAnimation[] = [];

    this.mergeSort(array, animations, 0);

    array.forEach((x, i) =>
      animations.push({
        type: AnimationTypes.Finish,
        index1: i,
        index2: i
      })
    );

    return animations;
  }

  mergeSort(
    array: ISortable[],
    animations: IAnimation[],
    startIndex: number
  ): ISortable[] {
    if (array.length <= 1) {
      return array;
    }

    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);

    return this.merge(
      this.mergeSort(left, animations, startIndex),
      this.mergeSort(right, animations, startIndex + middle),
      animations,
      startIndex,
      startIndex + middle
    );
  }

  merge(
    left: ISortable[],
    right: ISortable[],
    animations: IAnimation[],
    startIndexLeft: number,
    startIndexRight: number
  ): ISortable[] {
    let array: ISortable[] = [];
    let lCounter = 0;
    let rCounter = 0;

    while (left.length && right.length) {
      animations.push({
        type: AnimationTypes.Comparison,
        index1: startIndexLeft + lCounter,
        index2: startIndexRight + rCounter
      });

      if (left[0].isLessThan(right[0])) {
        lCounter++;
        let shifted = left.shift();
        if (shifted) {
          array.push(shifted);
        }
      } else {
        rCounter++;
        let shifted = right.shift();
        if (shifted) {
          array.push(shifted);
        }
      }
    }

    array = array.concat(left.slice().concat(right.slice()));

    for (let i = 0; i < array.length; i++) {
      animations.push({
        type: AnimationTypes.Set,
        index1: startIndexLeft + i,
        index2: startIndexLeft + i,
        element: array[i]
      });
    }

    return array;
  }
}

export default MergeSort;
