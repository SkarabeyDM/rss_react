import { lerp } from './utils';

const { round } = Math;

export const range = (min: number, max: number) => {
  return lerp(min, Math.random(), max);
};

export const dice = <T>(...args: T[]) => args[round(range(0, args.length - 1))];
