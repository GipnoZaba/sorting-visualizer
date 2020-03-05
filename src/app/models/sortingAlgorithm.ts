import { ISortable } from "./sortable";
import { Algorithms, IAnimation } from "./visualizerOptions";

export interface IAlgorithmData {
  title: string;
  class: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
}

export interface ISortingAlgorithm {
  type: Algorithms;
  data: IAlgorithmData;

  sort: (array: ISortable[]) => IAnimation[];
}
