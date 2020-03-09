import { clamp, remap } from "../common/utils/mathHelpers";
import { customColors } from "../styling/colors";

export interface ISortable {
  isGreaterThan(other: ISortable): boolean;
  isLessThan(other: ISortable): boolean;
  getValue(): number;
  getColor(): string;
  color: string;
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

  isLessThan(other: ISortable) {
    return this.getValue() < other.getValue();
  }

  getValue() {
    return this.value;
  }

  getColor() {
    return this.color;
  }
  color = customColors.primary;

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

  isLessThan(other: ISortable) {
    return this.getValue() < other.getValue();
  }

  getValue() {
    return this.value;
  }

  getColor() {
    return `hsl(${this.getValue()}, 100%, 50%)`;
  }
  color = "0";
  toString() {
    return `hsl(${this.value.toString()}, 100%, 50%)`;
  }
}
