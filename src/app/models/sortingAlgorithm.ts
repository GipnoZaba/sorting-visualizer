import { ISortable } from "./sortable";
import { Algorithms, IAnimation } from "./visualizerOptions";
import {
  JavascriptIcon,
  TypeScriptIcon,
  JavaIcon,
  CSharpIcon,
  CPlusPlusIcon,
  CIcon,
  PythonIcon
} from "../styling/icons";

export interface IAlgorithmData {
  title: string;
  class: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  implementationsMap: Map<string, string>;
}

export class ProgrammingLanguage {
  language: string;
  title: string;
  icon: () => JSX.Element;

  constructor(language: string, title: string, icon: () => JSX.Element) {
    this.language = language;
    this.title = title;
    this.icon = icon;
  }
}

export const languages = [
  new ProgrammingLanguage("javascript", "JavaScript", JavascriptIcon),
  new ProgrammingLanguage("typescript", "TypeScript", TypeScriptIcon),
  new ProgrammingLanguage("java", "Java", JavaIcon),
  new ProgrammingLanguage("csharp", "C#", CSharpIcon),
  new ProgrammingLanguage("cpp", "C++", CPlusPlusIcon),
  new ProgrammingLanguage("c", "C", CIcon),
  new ProgrammingLanguage("python", "Python", PythonIcon)
];

export interface ISortingAlgorithm {
  type: Algorithms;
  data: IAlgorithmData;

  sort: (array: ISortable[]) => IAnimation[];
}
