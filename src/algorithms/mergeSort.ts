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
  description: `<p>In merge sort we follow the following steps:
                  <ol>
                    <li>
                    We take a variable p and store the starting index 
                    of our array in this. And we take another variable 
                    r and store the last index of array in it.
                    </li>
                    <li>
                    Then we find the middle of the array using the formula 
                    (p + r)/2 and mark the middle index as q, and break the 
                    array into two subarrays, from p to q and from q + 1 to 
                    r index.
                    </li>
                    <li>
                    Then we divide these 2 subarrays again, just like we divided 
                    our main array and this continues.
                    </li>
                    <li>
                    Once we have divided the main array into subarrays with single 
                    elements, then we start merging the subarrays.
                  </ol>
                </p>`,
  timeComplexity: logarithmicLinear,
  spaceComplexity: linear,
  implementations: []
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
