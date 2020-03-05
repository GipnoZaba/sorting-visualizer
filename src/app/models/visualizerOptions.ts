import { ISortable } from "./sortable";

export enum Algorithms {
  BubbleSort,
  InsertionSort
}

export interface IAnimation {
  type: AnimationTypes;
  index1: number;
  index2: number;
  element?: ISortable;
}

export enum AnimationTypes {
  Swap,
  Comparison,
  Move,
  Set
}
