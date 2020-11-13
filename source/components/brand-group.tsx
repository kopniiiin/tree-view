import React, {FC, useState} from 'react';
import {useSelector} from 'react-redux';
import {SHORT_VIEW_LENGTH} from '../const';
import {Brand, State} from '../types';
import Selector from '../store/selector';
import BrandCard from './brand-card';

interface Props {
  char: string,
  onEdit: (id: string) => void,
}

const BrandGroup: FC<Props> = ({char, onEdit}: Props) => {
  const [isShortView, setIsShortView] = useState(true);

  const brands: Brand[] = useSelector((state: State): Brand[] => {
    return Selector.getBrandsByChar(state, char);
  });

  let brandsToRender: Brand[];

  if (isShortView) {
    const mainBrands: Brand[] = brands.filter(({main}: Brand): boolean => main);
    brandsToRender = (
      mainBrands.length ? mainBrands : brands
    ).slice(0, SHORT_VIEW_LENGTH);
  } else {
    brandsToRender = brands;
  }

  const ids: string[] = brandsToRender.map(({id}: Brand): string => id);

  const onToggleButtonClick = (): void => setIsShortView(!isShortView);

  return (
    <div>

      <button type="button" onClick={onToggleButtonClick}>
        {char.toUpperCase()}
        {' '}
        ({brands.length})
        {' '}
        {isShortView ? '>>' : '<<'}
      </button>

      <ul>
        {ids.map((id: string): JSX.Element => (
          <li key={id}><BrandCard id={id} onEdit={onEdit}/></li>
        ))}
      </ul>

    </div>
  );
};

export default BrandGroup;
