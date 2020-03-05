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

const data: IAlgorithmData = {
  title: "Bubble Sort",
  class: "Comparison sort",
  description: `Bubble sort, sometimes referred to as sinking sort,
                is a simple sorting algorithm that repeatedly steps
                through the list, compares adjacent elements and swaps
                them if they are in the wrong order. The pass through
                the list is repeated until the list is sorted.`,
  timeComplexity: "n^2",
  spaceComplexity: "1"
};

class BubbleSort implements ISortingAlgorithm {
  type = Algorithms.BubbleSort;
  data = data;

  sort(array: ISortable[]) {
    array = array.slice();
    var animations: IAnimation[] = [];

    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - 1 - i; j++) {
        animations.push({
          type: AnimationTypes.Comparison,
          index1: j,
          index2: j + 1
        });

        if (array[j].isGreaterThan(array[j + 1])) {
          let tmp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = tmp;

          animations.push({
            type: AnimationTypes.Swap,
            index1: j,
            index2: j + 1
          });
        }
      }
    }

    return animations;
  }
}

export default BubbleSort;
