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
import { swap } from "../app/common/utils/arrayHelpers";
import {
  logarithmicLinear,
  logarithmic
} from "../app/common/utils/mathHelpers";

const javascriptCode = `function sort(array, leftPointer, rightPointer) {
  var index;

  if (array.length > 1) {
    index = partition(array, leftPointer, rightPointer);

    if (leftPointer < index - 1) {
      sort(array, leftPointer, index - 1);
    }

    if (rightPointer > index) {
      sort(array, index, rightPointer);
    }
  }

  return array;
}

function partition(array, leftPointer, rightPointer) {
  let pivotIndex = Math.floor((leftPointer + rightPointer) / 2);
  let pivot = array[pivotIndex];

  while (leftPointer <= rightPointer) {
    while (array[leftPointer] < pivot) {
      leftPointer++;
    }

    while (array[rightPointer] > pivot) {
      rightPointer--;
    }

    if (leftPointer <= rightPointer) {
      let tmp = array[leftPointer];
      array[leftPointer] = array[rightPointer];
      array[rightPointer] = tmp;

      leftPointer++;
      rightPointer--;
    }
  }

  return leftPointer;
}`;

const typescriptCode = `function sort(
  array: number[],
  leftPointer: number,
  rightPointer: number
  ) {
  var index;

  if (array.length > 1) {
    index = partition(array, leftPointer, rightPointer);

    if (leftPointer < index - 1) {
      sort(array, leftPointer, index - 1);
    }

    if (rightPointer > index) {
      sort(array, index, rightPointer);
    }
  }

  return array;
}

function partition(array, leftPointer, rightPointer) {
  let pivotIndex = Math.floor((leftPointer + rightPointer) / 2);
  let pivot = array[pivotIndex];

  while (leftPointer <= rightPointer) {
    while (array[leftPointer] < pivot) {
      leftPointer++;
    }

    while (array[rightPointer] > pivot) {
      rightPointer--;
    }

    if (leftPointer <= rightPointer) {
      let tmp = array[leftPointer];
      array[leftPointer] = array[rightPointer];
      array[rightPointer] = tmp;
      
      leftPointer++;
      rightPointer--;
    }
  }

  return leftPointer;
}`;

const javaCode = `void sort(int[] array, int low, int high) { 
  if (low < high) { 
    int pi = partition(array, low, high); 

    sort(array, low, pi-1); 
    sort(array, pi+1, high); 
  } 
}

int partition(int[] array, int low, int high) { 
  int pivot = array[high];  
  int i = (low - 1); // index of smaller element 
  for (int j = low; j < high; j++) { 
    if (array[j] < pivot) { 
      i++; 

      int temp = array[i]; 
      array[i] = arr[j]; 
      array[j] = temp; 
    } 
  } 

  int temp = array[i + 1]; 
  array[i + 1] = array[high]; 
  array[high] = temp; 

  return i + 1; 
}`;

const data: IAlgorithmData = {
  title: "Quick Sort",
  class: "Comparison sort",
  description: `<p>Following are the steps involved in quick sort algorithm:
                  <ol>
                    <li>
                    After selecting an element as pivot, which is the last index
                    of the array in our case, we divide the array for the first time.
                    </li>
                    <li>
                    In quick sort, we call this partitioning. It is not simple breaking 
                    down of array into 2 subarrays, but in case of partitioning, the 
                    array elements are so positioned that all the elements smaller than 
                    the pivot will be on the left side of the pivot and all the elements 
                    greater than the pivot will be on the right side of it.
                    </li>
                    <li>
                    And the pivot element will be at its final sorted position.
                    </li>
                    <li>
                    The elements to the left and right, may not be sorted.
                    </li>
                    <li>
                    Then we pick subarrays, elements on the left of pivot and elements on 
                    the right of pivot, and we perform partitioning on them by choosing a 
                    pivot in the subarrays.
                    </li>
                  </ol>
                </p>`,
  timeComplexity: logarithmicLinear,
  spaceComplexity: logarithmic,
  implementationsMap: new Map<string, string>([
    ["javascript", javascriptCode],
    ["typescript", typescriptCode],
    ["java", javaCode]
  ])
};

class QuickSort implements ISortingAlgorithm {
  type = Algorithms.QuickSort;
  data = data;

  sort(array: ISortable[]) {
    array = array.slice();
    var animations: IAnimation[] = [];

    this.quickSort(array, 0, array.length - 1, animations);

    array.forEach((x, i) =>
      animations.push({
        type: AnimationTypes.Finish,
        index1: i,
        index2: i
      })
    );

    return animations;
  }

  quickSort(
    array: ISortable[],
    leftPointer: number,
    rightPointer: number,
    animations: IAnimation[]
  ) {
    var index;

    if (array.length > 1) {
      index = this.partition(array, leftPointer, rightPointer, animations);

      if (leftPointer < index - 1) {
        this.quickSort(array, leftPointer, index - 1, animations);
      }

      if (rightPointer > index) {
        this.quickSort(array, index, rightPointer, animations);
      }
    }

    return animations;
  }

  partition(
    array: ISortable[],
    leftPointer: number,
    rightPointer: number,
    animations: IAnimation[]
  ) {
    let pivotIndex = Math.floor((leftPointer + rightPointer) / 2);
    let pivot = array[pivotIndex];

    while (leftPointer <= rightPointer) {
      while (array[leftPointer].isLessThan(pivot)) {
        animations.push({
          type: AnimationTypes.Comparison,
          index1: leftPointer,
          index2: pivotIndex
        });

        leftPointer++;
      }

      while (array[rightPointer].isGreaterThan(pivot)) {
        animations.push({
          type: AnimationTypes.Comparison,
          index1: rightPointer,
          index2: pivotIndex
        });

        rightPointer--;
      }

      if (leftPointer <= rightPointer) {
        animations.push({
          type: AnimationTypes.Swap,
          index1: leftPointer,
          index2: rightPointer
        });

        swap(array, leftPointer, rightPointer);
        leftPointer++;
        rightPointer--;
      }
    }

    return leftPointer;
  }
}

export default QuickSort;
