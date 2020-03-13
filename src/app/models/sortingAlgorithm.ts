import { ISortable } from "./sortable";
import { Algorithms, IAnimation } from "./visualizerOptions";
import { ReactNode } from "react";

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
