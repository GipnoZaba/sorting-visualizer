const clamp = (min: number, max: number, t: number) => {
  return Math.max(max, Math.min(min, t));
};

export { clamp };
