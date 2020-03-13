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
import { swap } from "../app/common/utils/arrayHelpers";
import { logarithmicLinear, logarithmic } from "../app/common/utils/mathHelpers";

const data: IAlgorithmData = {
  title: "Quick Sort",
  class: "Comparison sort",
  description: "",
  timeComplexity: logarithmicLinear,
  spaceComplexity: logarithmic
};

class QuickSort implements ISortingAlgorithm {
  type = Algorithms.QuickSort;
  data = data;

  sort(array: ISortable[]) {
    array = array.slice();
    var animations: IAnimation[] = [];

    this.quickSort(array, 0, array.length - 1, animations);

    array.forEach((x, i) =>
      animations.push({
        type: AnimationTypes.Finish,
        index1: i,
        index2: i
      })
    );

    return animations;
  }

  quickSort(
    array: ISortable[],
    leftPointer: number,
    rightPointer: number,
    animations: IAnimation[]
  ) {
    var index;

    if (array.length > 1) {
      index = this.partition(array, leftPointer, rightPointer, animations);

      if (leftPointer < index - 1) {
        this.quickSort(array, leftPointer, index - 1, animations);
      }

      if (rightPointer > index) {
        this.quickSort(array, index, rightPointer, animations);
      }
    }

    return animations;
  }

  partition(
    array: ISortable[],
    leftPointer: number,
    rightPointer: number,
    animations: IAnimation[]
  ) {
    let pivotIndex = Math.floor((leftPointer + rightPointer) / 2);
    let pivot = array[pivotIndex];

    while (leftPointer <= rightPointer) {
      while (array[leftPointer].isLessThan(pivot)) {
        animations.push({
          type: AnimationTypes.Comparison,
          index1: leftPointer,
          index2: pivotIndex
        });

        leftPointer++;
      }

      while (array[rightPointer].isGreaterThan(pivot)) {
        animations.push({
          type: AnimationTypes.Comparison,
          index1: rightPointer,
          index2: pivotIndex
        });

        rightPointer--;
      }

      if (leftPointer <= rightPointer) {
        animations.push({
          type: AnimationTypes.Swap,
          index1: leftPointer,
          index2: rightPointer
        });

        swap(array, leftPointer, rightPointer);
        leftPointer++;
        rightPointer--;
      }
    }

    return leftPointer;
  }
}

export default QuickSort;
