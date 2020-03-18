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

const javascriptCode = `function sort(array) {
  if (array.length < 2) {
    return array;
  }

  const middle = Math.floor(array.length / 2);
  const left = array.slice(0, middle);
  const right = array.slice(middle);

  return merge(sort(left), sort(right));
}

function merge(left, right) {
  let array = [];

  while (left.length && right.length) {
    if (left[0] < right[0]) {
      array.push(left.shift());
    } else {
      array.push(right.shift());
    }
  }
  return array.concat(left.slice().concat(right.slice()));
}`;

const typescriptCode = `function sort(array: number[]) {
  if (array.length < 2) {
    return array;
  }

  const middle = Math.floor(array.length / 2);
  const left = array.slice(0, middle);
  const right = array.slice(middle);

  return merge(sort(left), sort(right));
}

function merge(left: number[], right: number[]) {
  let array: number[] = [];

  while (left.length && right.length) {
    if (left[0] < right[0]) {
      array.push(left.shift());
    } else {
      array.push(right.shift());
    }
  }
  return array.concat(left.slice().concat(right.slice()));
}`;

const javaCode = `void sort(int[] array, int l, int r) { 
  if (l < r) { 
    int m = (l + r) / 2; 

    sort(array, l, m); 
    sort(array , m + 1, r); 

    merge(array, l, m, r); 
  } 
}

void merge(int[] array, int l, int m, int r) { 
  int n1 = m - l + 1; 
  int n2 = r - m; 

  int L[] = new int [n1]; 
  int R[] = new int [n2]; 

  for (int i = 0; i < n1; ++i) 
    L[i] = array[l + i]; 
  for (int j=0; j < n2; ++j) 
    R[j] = array[m + 1+ j]; 

  int i = 0, j = 0; 

  int k = l; 
  while (i < n1 && j < n2) { 
    if (L[i] <= R[j]) { 
      array[k] = L[i]; 
      i++; 
    } 
    else { 
      array[k] = R[j]; 
      j++; 
    } 
    k++; 
  } 

  while (i < n1) { 
    array[k] = L[i]; 
    i++; 
    k++; 
  } 

  while (j < n2) { 
    array[k] = R[j]; 
    j++; 
    k++; 
  } 
}`;

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
  implementationsMap: new Map<string, string>([
    ["javascript", javascriptCode],
    ["typescript", typescriptCode],
    ["java", javaCode]
  ])
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
