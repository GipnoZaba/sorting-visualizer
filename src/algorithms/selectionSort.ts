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
  description: `<p>Following are the steps involved in selection sort
                    (for sorting a given array in ascending order):
                  <ol>
                    <li>
                    Starting from the first element, we search the smallest
                    element in the array, and replace it with the element
                    in the first position.
                    </li>
                    <li>
                    We then move on to the second position, and look for smallest
                    element present in the subarray, starting from index 1, till 
                    the last index.
                    </li>
                    <li>
                    We replace the element at the second position in the original 
                    array, or we can say at the first position in the subarray, 
                    with the second smallest element.
                    </li>
                    <li>
                    This is repeated, until the array is completely sorted.
                    </li>
                  </ol>
                </p>`,
  timeComplexity: squared,
  spaceComplexity: constant,
  implementations: new Map<string, string>()
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
