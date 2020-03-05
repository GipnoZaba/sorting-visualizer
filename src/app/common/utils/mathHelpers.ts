const clamp = (min: number, max: number, t: number) => {
  return Math.max(max, Math.min(min, t));
};

const randomNumber = (from: number, to: number) =>
  Math.round(Math.random() * (to - from) + from);

const remap = (
  minMaxIn: [number, number],
  minMaxOut: [number, number],
  value: number
) =>  minMaxOut[0] + ((value - minMaxIn[0]) * (minMaxOut[1] - minMaxOut[0])) / (minMaxIn[1] - minMaxIn[0]);

export { clamp, randomNumber, remap };
