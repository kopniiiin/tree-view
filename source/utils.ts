import {Brand, NormalizedBrands} from './types';

export const normalizeBrands = (brands: Brand[]): NormalizedBrands => {
  return brands.reduce((normalizedBrands: NormalizedBrands, brand: Brand) => {
    const {id} = brand;
    return {...normalizedBrands, [id]: brand};
  }, {});
};

export const updateBrand = (
    brands: NormalizedBrands,
    brand: Brand,
): NormalizedBrands => {
  const {id} = brand;
  return {...brands, [id]: brand};
};

export const deleteBrand = (
    brands: NormalizedBrands,
    id: string,
): NormalizedBrands => {
  const brandsCopy: NormalizedBrands = {...brands};
  delete brandsCopy[id];
  return brandsCopy;
};

export const getFirstTitleChars = (brands: NormalizedBrands): string[] => {
  const chars: string[] = Object.values(brands).map(({title}: Brand) => {
    return title[0].toLowerCase();
  });

  return [...new Set(chars)].sort();
};

export const getBrandsByChar = (
    brands: NormalizedBrands,
    char: string,
): Brand[] => {
  return Object.values(brands)
      .filter(({title}: Brand): boolean => {
        return title[0].toLowerCase() === char;
      })
      .sort(({title: a}: Brand, {title: b}: Brand): number => {
        return a.toLowerCase() < b.toLowerCase() ? -1 : 1;
      });
};

export const checkIfNumberOrLetter = (char: string): boolean => {
  return /^[0-9a-zA-Zа-яА-ЯёЁ]$/.test(char);
};
