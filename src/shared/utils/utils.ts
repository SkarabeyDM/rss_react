import { ImageSource } from '@shared/const';

export const getIdByUrl = (url: string) => {
  const dataArray = url.split('/');
  return dataArray[dataArray.length - 2];
};

export const getImageByUrl = (url: string) => {
  const match = url.match(/(\d+)\/$/);
  if (match === null) return null;
  const id = match[1];
  return `${ImageSource.People}${id}.jpg`;
};

export const toggle = <T>(value: T, a: T, b: T) => {
  return value === b ? a : b;
};

// export const classNames = (...classes: (string | object)[]) => {
//   const classList = classes.map(() => {})
// };
