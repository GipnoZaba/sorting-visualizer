export interface ISortable {
  index: number;
  isGreaterThan(other: ISortable): boolean;
  getValue(): number;
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

  toString() {
    return this.value.toString();
  }
}
