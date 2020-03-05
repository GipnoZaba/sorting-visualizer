import { clamp } from "../common/utils/mathHelpers";

export interface ISortable {
  isGreaterThan(other: ISortable): boolean;
  getValue(): number;
  getColor(): string;
  toString(): string;
}

export class SortableNumber implements ISortable {
  value: number;

  constructor(value: number) {
    this.value = value;
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

  constructor(value: number) {
    this.value = clamp(0, 360, value);
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
