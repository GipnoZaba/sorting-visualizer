import { ISortable } from "./sortable";
import { Algorithms, IAnimation } from "./visualizerOptions";
import {
  JavascriptIcon,
  TypeScriptIcon,
  JavaIcon,
  CSharpIcon,
  CPlusPlusIcon,
  CIcon,
  PythonIcon,
  PhpIcon
} from "../styling/icons";
import { railscast, googlecode, atomOneDark, monokai, obsidian } from "react-code-blocks";

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
  theme: any;
  icon: () => JSX.Element;

  constructor(language: string, title: string, theme: any, icon: () => JSX.Element) {
    this.language = language;
    this.title = title;
    this.theme = theme;
    this.icon = icon;
  }
}

export const languages = [
  new ProgrammingLanguage("javascript", "JavaScript", monokai, JavascriptIcon),
  new ProgrammingLanguage("typescript", "TypeScript", monokai, TypeScriptIcon),
  new ProgrammingLanguage("java", "Java", railscast, JavaIcon),
  new ProgrammingLanguage("csharp", "C#", googlecode, CSharpIcon),
  new ProgrammingLanguage("cpp", "C++", googlecode, CPlusPlusIcon),
  new ProgrammingLanguage("c", "C", googlecode, CIcon),
  new ProgrammingLanguage("python", "Python", atomOneDark, PythonIcon),
  new ProgrammingLanguage("php", "Php", obsidian, PhpIcon)
];

export interface ISortingAlgorithm {
  type: Algorithms;
  data: IAlgorithmData;

  sort: (array: ISortable[]) => IAnimation[];
}
