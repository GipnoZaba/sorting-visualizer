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

const squared = "<p>N<sup>2</sup></p>";
const logarithmicLinear =
  "<p><span style='font-style: italic'>N </span>log<span style='font-style: italic'>N</span></p>";
const logarithmic = "<p>log<span style='font-style: italic'>N</span></p>";
const linear = "<p>N</p>";
const constant = " <p>1</p>";

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
