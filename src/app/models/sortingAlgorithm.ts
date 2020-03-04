import { ISortable } from "./sortable";

export interface IAlgorithmData {
  title: string;
  class: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
}

export interface ISortingAlgortihm {
  array: ISortable[];
  data: IAlgorithmData;

  algorithmIterator: Generator<
    { swapped1: ISortable; swapped2: ISortable; array: ISortable[] },
    { swapped1: null; swapped2: null; array: ISortable[] },
    unknown
  >;

  step(): {
    swapped1: ISortable | null;
    swapped2: ISortable | null;
    array: ISortable[] | null;
    done: boolean;
  };
}