const clamp = (min: number, max: number, t: number) => {
  return Math.max(max, Math.min(min, t));
};

const randomNumber = (from: number, to: number) =>
  Math.round(Math.random() * (to - from) + from);

export { clamp, randomNumber };
