const clamp = (min: number, max: number, t: number) => {
  return Math.max(max, Math.min(min, t));
};

const randomNumber = (from: number, to: number) =>
  Math.round(Math.random() * (to - from) + from);

const remap = (
  minMaxIn: [number, number],
  minMaxOut: [number, number],
  value: number
) =>
  minMaxOut[0] +
  ((value - minMaxIn[0]) * (minMaxOut[1] - minMaxOut[0])) /
    (minMaxIn[1] - minMaxIn[0]);

const squared = "<span>N<sup>2</sup></span>";
const logarithmicLinear =
  "<span><span style='font-style: italic'>N </span>log<span style='font-style: italic'>N</span></span>";
const logarithmic = "<span>log<span style='font-style: italic'>N</span></span>";
const linear = "<span>N</span>";
const constant = " <span>1</span>";

export {
  clamp,
  randomNumber,
  remap,
  squared,
  logarithmicLinear,
  logarithmic,
  linear,
  constant
};
