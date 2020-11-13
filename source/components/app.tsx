import React, {FC, useState} from 'react';
import {useSelector} from 'react-redux';
import Selector from '../store/selector';
import BrandForm from './brand-form';
import BrandGroup from './brand-group';
import ErrorMessage from './error-message';

interface Props {}

const App: FC<Props> = () => {
  const [editableBrandID, setEditableBrandID] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const firstTitleChars: string[] = useSelector(Selector.getFirstTitleChars);
  const isFetching: boolean = useSelector(Selector.getFetchingStatus);

  const onFormClose = (): void => {
    setEditableBrandID('');
    setIsFormOpen(false);
  };

  const onCreateButtonClick = (): void => {
    setEditableBrandID('');
    setIsFormOpen(true);
  };

  const onBrandEdit = (id: string): void => {
    setEditableBrandID(id);
    setIsFormOpen(true);
  };

  return (
    <div>

      {isFormOpen && (
        <BrandForm id={editableBrandID} onClose={onFormClose}/>
      )}

      <hr/>

      <button
        type="button"
        disabled={isFetching}
        onClick={onCreateButtonClick}>
        Create brand
      </button>

      <hr/>

      {firstTitleChars.map((char: string): JSX.Element => (
        <BrandGroup key={char} char={char} onEdit={onBrandEdit}/>
      ))}

      <hr/>

      <ErrorMessage/>

    </div>
  );
};

export default App;
