import {Brand, BrandInServerFormat} from './types';

export const convertBrandFromServerFormat = ({
  _id,
  title,
  main,
}: BrandInServerFormat): Brand => ({id: _id, title, main});

export const convertBrandsFromServerFormat = (
    brands: BrandInServerFormat[],
): Brand[] => brands.map(convertBrandFromServerFormat);
