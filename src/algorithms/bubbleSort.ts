import { ISortingAlgortihm } from "./sortingAlgorithm";
import { ISortable } from "../app/models/sortable";

class BubbleSort implements ISortingAlgortihm {
  array: ISortable[];
  algorithmIterator: Generator<
    { swapped1: ISortable; swapped2: ISortable },
    { swapped1: null; swapped2: null },
    unknown
  >;
  constructor(array: ISortable[]) {
    this.array = array;

    function* algorithmStep(array: ISortable[]) {
      for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - 1 - i; j++) {
          if (array[j].isGreaterThan(array[j + 1])) {
            let tmp = array[j];
            array[j] = array[j + 1];
            array[j + 1] = tmp;
            yield { swapped1: array[j + 1], swapped2: array[j] };
          }
        }
      }
      return { swapped1: null, swapped2: null };
    }
    this.algorithmIterator = algorithmStep(this.array);
  }

  step() {
    const nextStep = this.algorithmIterator.next();

    return {
      swapped1: nextStep.done ? null : nextStep.value.swapped1,
      swapped2: nextStep.done ? null : nextStep.value.swapped2,
      array: this.array,
      done: nextStep.done === undefined ? true : nextStep.done
    };
  }
}

export default BubbleSort;
