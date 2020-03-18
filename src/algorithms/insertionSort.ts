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
import { squared, constant } from "../app/common/utils/mathHelpers";

const javascriptCode = `function sort(array) {
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1; // left element index

    while (j >= 0 && key < array[j]) {
      array[j + 1] = array[j];
      j--;
    }

    array[j + 1] = key;
  }

  return array;
}`;

const typescriptCode = `function sort(array: number[]) {
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1; // left element index

    while (j >= 0 && array[j] > key ) {
      array[j + 1] = array[j];
      j--;
    }

    array[j + 1] = key;
  }

  return array;
}`;

const javaCode = `void sort(int[] array) { 
  for (int i = 1; i < array.length; ++i) { 
    int key = array[i]; 
    int j = i - 1; // left element index

    while (j >= 0 && array[j] > key) { 
      array[j + 1] = array[j]; 
      j--;
    } 
    array[j + 1] = key; 
  }

  return array;
} `;

const data: IAlgorithmData = {
  title: "Insertion sort",
  class: "Comparison sort",
  description: `<p>Following are the steps involved in insertion sort:
                  <ol>
                    <li>
                    We start by making the second element of the given array,
                    i.e. element at index 1, the key. The key element here is
                      the new card that we need to add to our existing sorted
                      set of cards(remember the example with cards above).
                    </li>
                    <li>
                    We compare the key element with the element(s) before it,
                    in this case, element at index 0: 
                      <ul>
                        <li>
                        If the key element is less than the first element, we
                          insert the key element before the first element.
                        </li>
                        <li>
                        If the key element is greater than the first element,
                          then we insert it after the first element.
                        </li>
                      </ul>
                    </li>
                    <li>
                    Then, we make the third element of the array as key and
                    will compare it with elements to it's left and insert
                    it at the right position.
                    </li>
                    <li>
                    And we go on repeating this, until the array is sorted.
                    </li>
                  </ol>
                </p>`,
  timeComplexity: squared,
  spaceComplexity: constant,
  implementationsMap: new Map<string, string>([
    ["javascript", javascriptCode],
    ["typescript", typescriptCode],
    ["java", javaCode]
  ])
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

export default InsertionSort;
