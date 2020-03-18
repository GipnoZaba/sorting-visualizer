import {
  ISortingAlgorithm,
  IAlgorithmData,
  Implementation
} from "../app/models/sortingAlgorithm";
import { ISortable } from "../app/models/sortable";
import {
  Algorithms,
  AnimationTypes,
  IAnimation
} from "../app/models/visualizerOptions";
import { swap } from "../app/common/utils/arrayHelpers";
import { squared, constant } from "../app/common/utils/mathHelpers";

const javascriptCode = 
`function bubble_Sort(a)
{
    var swapp;
    var n = a.length-1;
    var x=a;
    do {
        swapp = false;
        for (var i=0; i < n; i++)
        {
            if (x[i] < x[i+1])
            {
              var temp = x[i];
              x[i] = x[i+1];
              x[i+1] = temp;
              swapp = true;
            }
        }
        n--;
    } while (swapp);
return x; 
}`;

const data: IAlgorithmData = {
  title: "Bubble Sort",
  class: "Comparison sort",
  description: `<p>Bubble sort, sometimes referred to as sinking sort,
                is a simple sorting algorithm that repeatedly steps
                through the list, compares adjacent elements and swaps
                them if they are in the wrong order. The pass through
                the list is repeated until the list is sorted.</p>`,
  timeComplexity: squared,
  spaceComplexity: constant,
  implementations: [new Implementation("javascript", javascriptCode)]
};

class BubbleSort implements ISortingAlgorithm {
  type = Algorithms.BubbleSort;
  data = data;

  sort(array: ISortable[]) {
    array = array.slice();
    var animations: IAnimation[] = [];

    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - 1 - i; j++) {
        animations.push({
          type: AnimationTypes.Comparison,
          index1: j,
          index2: j + 1
        });

        if (array[j].isGreaterThan(array[j + 1])) {
          swap(array, j, j + 1);

          animations.push({
            type: AnimationTypes.Swap,
            index1: j,
            index2: j + 1
          });
        }
      }
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

export default BubbleSort;
