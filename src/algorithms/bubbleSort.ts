import { ISortingAlgortihm } from "./sortingAlgorithm";
import { ISortable } from "../app/models/sortable";
import { observable, action } from "mobx";

class BubbleSort implements ISortingAlgortihm {
  @observable array: ISortable[] = [];
  algorithmIterator: Generator<
    { swapped1: ISortable; swapped2: ISortable; array: ISortable[] },
    { swapped1: null; swapped2: null; array: ISortable[] },
    unknown
  >;
  constructor(array: ISortable[]) {
    this.initArray(array);

    function* algorithmStep(array: ISortable[]) {
      for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - 1 - i; j++) {
          if (array[j].isGreaterThan(array[j + 1])) {
            let tmp = array[j];

            array[j] = array[j + 1];
            array[j].index = j;

            array[j + 1] = tmp;
            array[j + 1].index = j + 1;
            yield {
              swapped1: array[j + 1],
              swapped2: array[j],
              array: array.slice()
            };
          }
        }
      }
      return { swapped1: null, swapped2: null, array: array.slice() };
    }
    this.algorithmIterator = algorithmStep(array);
  }

  step() {
    const nextStep = this.algorithmIterator.next();
    if (!nextStep.done) {
      this.array = nextStep.value.array;
    }

    return {
      swapped1: nextStep.done ? null : nextStep.value.swapped1,
      swapped2: nextStep.done ? null : nextStep.value.swapped2,
      array: nextStep.done ? null : nextStep.value.array,
      done: nextStep.done === undefined ? true : nextStep.done
    };
  }

  @action initArray = (array: ISortable[]) => {
    for (let i = 0; i < array.length; i++) {
      array[i].index = i;
      this.array.push(array[i]);
    }
  };
}

export default BubbleSort;
