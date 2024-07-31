import { ImageSource } from '@shared/const';
import { getIdByUrl, getImageByUrl, toggle } from '../utils';

describe('Utilities:', () => {
  const endpoint = ImageSource.People;
  const id1 = '1';
  const id2 = '18';

  describe('getIdByUrl():', () => {
    const testGetIdByUrl = (id: string) => {
      const url = `${endpoint}${id}/`;
      it(`should return ${id} then input "any.url/${id}/"`, () => {
        expect(getIdByUrl(url)).toBe(id);
      });
    };
    testGetIdByUrl(id1);
    testGetIdByUrl(id2);
  });

  describe('getImageByUrl()', () => {
    const testGetImageByUrl = (id: string, shouldReturn: string | null) => {
      const url = `${endpoint}${id}/`;
      it(`should return ${shouldReturn} then input "any.url/${id}/"`, () => {
        expect(getImageByUrl(url)).toBe(shouldReturn);
      });
    };

    testGetImageByUrl(id1, `${endpoint}${id1}.jpg`);
    testGetImageByUrl(id2, `${endpoint}${id2}.jpg`);
    testGetImageByUrl('sasatb', null);
  });

  describe('toggle()', () => {
    const a = 'A';
    const b = 'B';
    const testToggle = (input: string, shouldReturn: string) => {
      it(`input "${input}" should return "${shouldReturn}"`, () => {
        expect(toggle(input, a, b)).toBe(shouldReturn);
      });
    };

    testToggle(a, b);
    testToggle(b, a);
    testToggle('C', b);
  });
});
