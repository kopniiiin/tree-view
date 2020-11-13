import React, {FC} from 'react';
import {useSelector} from 'react-redux';
import Selector from '../store/selector';

interface Props {}

const ErrorMessage: FC<Props> = () => {
  const error: string = useSelector(Selector.getError);
  return error ? <strong>{error}</strong> : null;
};

export default ErrorMessage;
