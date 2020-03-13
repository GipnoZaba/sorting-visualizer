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
import { squared, constant } from "../app/common/utils/mathHelpers";

const data: IAlgorithmData = {
  title: "Selection Sort",
  class: "Comparison sort",
  description: "",
  timeComplexity: squared,
  spaceComplexity: constant
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

    array.forEach((x, i) =>
      animations.push({
        type: AnimationTypes.Finish,
        index1: i,
        index2: i
      })
    );

    return animations;
  }
}

export default SelectionSort;
