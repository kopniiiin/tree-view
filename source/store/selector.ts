import {Brand, State} from '../types';
import {getFirstTitleChars, getBrandsByChar} from '../utils';

const Selector = {
  getBrandByID: ({brands}: State, id: string): Brand => brands[id],

  getFirstTitleChars: ({brands}: State): string[] => {
    return getFirstTitleChars(brands);
  },

  getBrandsByChar: ({brands}: State, char: string): Brand[] => {
    return getBrandsByChar(brands, char);
  },

  getFetchingStatus: ({isFetching}: State): boolean => isFetching,

  getError: ({error}: State): string => error,
};

export default Selector;
