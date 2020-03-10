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
  title: "Selection Sort",
  class: "Comparison sort",
  description: "",
  timeComplexity: "n^2",
  spaceComplexity: "1"
};

class SelectionSort implements ISortingAlgorithm {
  type = Algorithms.SelectionSort;
  data = data;

  sort(array: ISortable[]) {
    array = array.slice();
    var animations: IAnimation[] = [];

    for (let i = 0; i < array.length; i++) {
      let smallestIndex = i;
      for (let j = i + 1; j < array.length; j++) {
        animations.push({
          type: AnimationTypes.Comparison,
          index1: i,
          index2: j
        });

        if (array[j].isLessThan(array[smallestIndex])) {
          smallestIndex = j;
        }
      }

      let tmp = array[i];
      array[i] = array[smallestIndex];
      array[smallestIndex] = tmp;

      animations.push({
        type: AnimationTypes.Swap,
        index1: i,
        index2: smallestIndex
      });
    }

    return animations;
  }
}

export default SelectionSort;
