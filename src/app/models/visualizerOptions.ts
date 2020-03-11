import { ISortable } from "./sortable";

export enum Algorithms {
  BubbleSort = "bubbleSort",
  InsertionSort = "insertionSort",
  SelectionSort = "selectionSort",
  QuickSort = "quickSort"
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
