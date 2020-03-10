import {
  ISortingAlgorithm,
  IAlgorithmData
} from "../app/models/sortingAlgorithm";
import { ISortable } from "../app/models/sortable";
import {
  Algorithms,
  IAnimation,
  AnimationTypes
} from "../app/models/visualizerOptions";

const data: IAlgorithmData = {
  title: "Insertion sort",
  class: "Comparison sort",
  description: "",
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

        animations.push({
          type: AnimationTypes.Comparison,
          index1: leftElementIndex,
          index2: leftElementIndex + 1
        });

        animations.push({
          type: AnimationTypes.Move,
          index1: leftElementIndex,
          index2: leftElementIndex + 1
        });

        leftElementIndex--;
      }

      array[leftElementIndex + 1] = key;

      animations.push({
        type: AnimationTypes.Set,
        index1: leftElementIndex + 1,
        index2: leftElementIndex + 1,
        element: key
      });
    }

    return animations;
  }
}

export default InsertionSort;
