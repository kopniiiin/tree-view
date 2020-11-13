import React, {FC} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Brand, State} from '../types';
import {AsyncActionCreator} from '../store/actions';
import Selector from '../store/selector';

interface Props {
  id: string,
  onEdit: (id: string) => void,
}

const BrandCard: FC<Props> = ({id, onEdit}: Props) => {
  const dispatch = useDispatch();
  const isFetching: boolean = useSelector(Selector.getFetchingStatus);

  const {title, main}: Brand = useSelector((state: State): Brand => {
    return Selector.getBrandByID(state, id);
  });

  const onEditButtonClick = (): void => onEdit(id);

  const onDeleteButtonClick = (): void => {
    dispatch(AsyncActionCreator.deleteBrand(id));
  };

  return (
    <div>

      {title} {main && '(main)'}

      {' '}

      <button
        type="button"
        disabled={isFetching}
        onClick={onEditButtonClick}>
        Edit
      </button>

      {' '}

      <button
        type="button"
        disabled={isFetching}
        onClick={onDeleteButtonClick}>
        Delete
      </button>

    </div>
  );
};

export default BrandCard;
