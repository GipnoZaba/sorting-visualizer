import { ISortable, SortableNumber } from "../../models/sortable";
import { randomNumber, remap } from "./mathHelpers";

function swap(array: any[], index1: number, index2: number) {
  let tmp = array[index1];
  array[index1] = array[index2];
  array[index2] = tmp;
}

function shuffle(array: ISortable[]): ISortable[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const generateSortableNumbers = (
  from: number,
  to: number,
  count: number
): ISortable[] => {
  let array: ISortable[] = [];

  for (let i = 0; i < count; i++) {
    array.push(new SortableNumber(randomNumber(0, 100)));
  }

  return array;
};

const generateSteadySortableNumbers = (count: number): ISortable[] => {
  let array: ISortable[] = [];

  for (let i = 1; i <= count; i++) {
    array.push(new SortableNumber(remap([0, count], [0, 100], i)));
  }

  return shuffle(array);
};

const generateSteppedArray = (count: number): ISortable[] => {
  let array: ISortable[] = [];

  let h = 10;
  let step = Math.floor((count - 1) / 4);
  let counter = 0;

  for (let i = 0; i < count; i++) {
    array.push(new SortableNumber(h));

    if (++counter === step) {
      counter = 0;
      h += 22;
      if (h > 76) {
        h = 100;
      }
    }
  }

  return shuffle(array);
};

export {
  swap,
  shuffle,
  generateSortableNumbers,
  generateSteadySortableNumbers,
  generateSteppedArray
};
