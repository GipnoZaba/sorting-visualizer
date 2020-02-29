import { ISortable } from "../app/models/sortable";

export interface ISortingAlgortihm {
  array: ISortable[];

  algorithmIterator: Generator<
    { swapped1: ISortable; swapped2: ISortable },
    { swapped1: null; swapped2: null },
    unknown
  >;

  step(): {
    swapped1: ISortable | null;
    swapped2: ISortable | null;
    array: ISortable[];
    done: boolean;
  };
}
