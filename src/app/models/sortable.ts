import { clamp } from "../common/utils/mathHelpers";

export interface ISortable {
  index: number;
  isGreaterThan(other: ISortable): boolean;
  getValue(): number;
  getColor(): string;
  toString(): string;
}

export class SortableNumber implements ISortable {
  value: number;
  index: number;

  constructor(value: number, index: number = -1) {
    this.value = value;
    this.index = index;
  }

  isGreaterThan(other: ISortable) {
    return this.getValue() > other.getValue();
  }

  getValue() {
    return this.value;
  }

  getColor() {
    return `hsl(${this.getValue()}, 100%, 50%)`;
  }

  toString() {
    return this.value.toString();
  }
}

export class SortableColor implements ISortable {
  value: number;
  index: number;

  constructor(value: number, index: number = -1) {
    this.value = clamp(0, 360, value);
    this.index = index;
  }

  isGreaterThan(other: ISortable) {
    return this.getValue() > other.getValue();
  }

  getValue() {
    return this.value;
  }

  getColor() {
    return `hsl(${this.getValue()}, 100%, 50%)`;
  }

  toString() {
    return `hsl(${this.value.toString()}, 100%, 50%)`;
  }
}
