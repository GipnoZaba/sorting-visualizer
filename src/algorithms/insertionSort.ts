import {
  ISortingAlgorithm,
  IAlgorithmData,
  IAnimation
} from "../app/models/sortingAlgorithm";
import { ISortable } from "../app/models/sortable";
import { Algorithms } from "../app/models/visualizerOptions";

const data: IAlgorithmData = {
  title: "Insertion sort",
  class: "Comparison sort",
  description: ``,
  timeComplexity: "n^2",
  spaceComplexity: "1"
};

class InsertionSort implements ISortingAlgorithm {
  type = Algorithms.InsertionSort;
  data = data;

  sort(array: ISortable[]) {
    array = array.slice();
    var animations: IAnimation[] = [];

    for (let i = 1; i < array.length; i++) {
      let key = array[i];
      let leftElementIndex = i - 1;

      while (leftElementIndex >= 0 && key.isLessThan(array[leftElementIndex])) {
        array[leftElementIndex + 1] = array[leftElementIndex];
        array[leftElementIndex] = key;

        animations.push({
          type: "swap",
          index1: leftElementIndex + 1,
          index2: leftElementIndex
        });

        leftElementIndex--;
      }
    }

    return animations;
  }
}

export default InsertionSort;
