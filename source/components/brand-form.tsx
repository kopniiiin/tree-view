import React, {FC, useState, useEffect, ChangeEvent, FormEvent} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Brand, State} from '../types';
import {checkIfNumberOrLetter} from '../utils';
import {AsyncActionCreator} from '../store/actions';
import Selector from '../store/selector';

interface Props {
  id: string,
  onClose: () => void,
}

const BrandForm: FC<Props> = ({id, onClose}: Props) => {
  const [title, setTitle] = useState('');
  const [main, setMain] = useState(false);
  const dispatch = useDispatch();
  const isFetching: boolean = useSelector(Selector.getFetchingStatus);

  const brand: Brand = useSelector((state: State): Brand => {
    return Selector.getBrandByID(state, id);
  });

  useEffect((): void => {
    if (brand) {
      setTitle(brand.title);
      setMain(brand.main);
    } else {
      setTitle('');
      setMain(false);
    }
  }, [brand]);

  const isTitleValid = checkIfNumberOrLetter(title[0]);

  const onTitleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.target.value);
  };

  const onMainInputChange = (): void => setMain(!main);

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const newBrand: Brand = {id, title, main};
    if (brand) dispatch(AsyncActionCreator.updateBrand(newBrand));
    else dispatch(AsyncActionCreator.createBrand(newBrand));
    onClose();
  };

  return (
    <form onSubmit={onSubmit}>
      <fieldset>

        <legend>{brand ? brand.title : 'New brand'}</legend>

        <label>
          Title
          {' '}
          <input
            type="text"
            value={title}
            autoComplete="off"
            required={true}
            disabled={isFetching}
            onChange={onTitleInputChange}/>
        </label>

        <br/>

        <label>
          <input
            type="checkbox"
            checked={main}
            disabled={isFetching}
            onChange={onMainInputChange}/>
          {' '}
          Is main?
        </label>

        <br/>

        <button
          type="reset"
          onClick={onClose}>
          Close
        </button>

        {' '}

        <button
          type="submit"
          disabled={isFetching || !isTitleValid}>
          Save
        </button>

      </fieldset>
    </form>
  );
};

export default BrandForm;
