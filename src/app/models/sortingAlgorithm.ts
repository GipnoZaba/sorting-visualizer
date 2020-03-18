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
  title: string;
  code: string;
  icon: () => JSX.Element;

  constructor(
    language: string,
    title: string,
    code: string,
    icon: () => JSX.Element
  ) {
    this.language = language;
    this.title = title;
    this.code = code;
    this.icon = icon;
  }
}

export interface ISortingAlgorithm {
  type: Algorithms;
  data: IAlgorithmData;

  sort: (array: ISortable[]) => IAnimation[];
}
