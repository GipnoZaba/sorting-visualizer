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
    var animations: IAnimation[] = [];

    

    return animations;
  }
}

export default InsertionSort;
