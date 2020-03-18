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
import { squared, constant } from "../app/common/utils/mathHelpers";

const javascriptCode = `function sort(array) {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
        let tmp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = tmp;
      }
    }
  }

  return array;
}`;

const typescriptCode = `function sort(array: number[]) {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
        let tmp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = tmp;
      }
    }
  }

  return array;
}`;

const javaCode = `void sort(int array[]) { 
  for (int i = 0; i < array.length - 1; i++) {
    for (int j = 0; j < array.length - 1 - i; j++) {
      if (array[j] > array[j + 1]) { 
        int tmp = array[j]; 
        array[j] = array[j + 1]; 
        array[j + 1] = tmp; 
      } 
    }
  }

  return array;
} `;

const csharpCode = `void sort(int[] array) 
{ 
  for (int i = 0; i < array.Length - 1; i++) {
    for (int j = 0; j < array.Length - 1 - i; j++) {
      if (array[j] > array[j + 1]) 
      { 
        int tmp = array[j]; 
        array[j] = array[j + 1]; 
        array[j + 1] = tmp; 
      } 
    }
  }

  return array;
} `;

const cPlusPlusCode = `void swap(int *xp, int *yp)  
{  
  int temp = *xp;  
  *xp = *yp;  
  *yp = temp;  
}  
  
void sort(int array[], int n)  
{  
  int i, j;  
  for (i = 0; i < n - 1; i++) 
  {  
    for (j = 0; j < n - 1 - i; j++) 
    {
      if (array[j] > array[j + 1]) 
      {
        swap(&array[j], &array[j + 1]);  
      }
    }   
  }
}`;

const cCode = `void swap(int *xp, int *yp) 
{ 
    int temp = *xp; 
    *xp = *yp; 
    *yp = temp; 
} 
  
void sort(int array[], int n) 
{ 
  int i, j; 
  for (i = 0; i < n - 1; i++)
  {
    for (j = 0; j < n - 1 - i; j++)
    {
      if (array[j] > array[j + 1])
      {
        swap(&array[j], &array[j + 1]); 
      }
    }
  }            
} `;

const pythonCode = `def sort(array): 
  for i in range(len(array)): 
    for j in range(0, len(array) - 1 - i): 
      if array[j] > array[j + 1]: 
        array[j], array[j + 1] = array[j + 1], array[j]

  return array`;

const phpCode = `function sort(&$array) 
{ 
  $n = sizeof($array); 

  for($i = 0; $i < $n; $i++)  
  { 
    // Last i elements are already in place 
    for ($j = 0; $j < $n - $i - 1; $j++)  
    { 
      if ($array[$j] > $array[$j + 1]) 
      { 
        $t = $array[$j]; 
        $array[$j] = $array[$j + 1]; 
        $array[$j + 1] = $t; 
      } 
    } 
  } 
} `;

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
  implementationsMap: new Map<string, string>([
    ["javascript", javascriptCode],
    ["typescript", typescriptCode],
    ["java", javaCode],
    ["csharp", csharpCode],
    ["cpp", cPlusPlusCode],
    ["c", cCode],
    ["python", pythonCode],
    ["php", phpCode]
  ])
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
