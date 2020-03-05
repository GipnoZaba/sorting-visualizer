import { ISortable } from "./sortable";
import { Algorithms } from "./visualizerOptions";

export interface IAlgorithmData {
  title: string;
  class: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
}

export interface IAnimation {
  type: string;
  index1: number;
  index2: number;
}

export interface ISortingAlgorithm {
  type: Algorithms;
  data: IAlgorithmData;

  sort: (array: ISortable[]) => IAnimation[];
}
