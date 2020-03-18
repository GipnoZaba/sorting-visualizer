import { ISortable } from "./sortable";
import { Algorithms, IAnimation } from "./visualizerOptions";

export interface IAlgorithmData {
  title: string;
  class: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  implementations: Implementation[];
}

export class Implementation {
  language: string;
  code: string;

  constructor(language: string, code: string) {
    this.language = language;
    this.code = code;
  }
}

export interface ISortingAlgorithm {
  type: Algorithms;
  data: IAlgorithmData;

  sort: (array: ISortable[]) => IAnimation[];
}
